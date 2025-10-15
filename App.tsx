

import React, { useState, useEffect, useRef } from 'react';
import { AuthPage } from './components/AuthPage';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { ChatWindow } from './components/ChatWindow';
import { FlashcardView } from './components/FlashcardView';
import { TestView } from './components/TestView';
import { ContentViewModal } from './components/ContentViewModal';
import { ImageGalleryModal } from './components/ImageGalleryModal';
import { ImageModal } from './components/ImageModal';
import { StudyPlanModal } from './components/StudyPlanModal';
import { ProfileModal } from './components/ProfileModal';
import { VoiceSettingsModal } from './components/VoiceSettingsModal';
import { ReminderModal } from './components/ReminderModal';
import { TimetableModal } from './components/TimetableModal';
import { OfflineBanner } from './components/OfflineBanner';
import { SparklesIcon } from './components/icons/SparklesIcon';
import type { StudyTopic, Flashcard, Test, StudyPlan, UserProfile, PlaybackState, TTSConfig } from './types';
import * as geminiService from './services/geminiService';
import { DEFAULT_AVATAR_URL } from './constants';
import { decode, decodeAudioData, sanitizeTextForTTS } from './utils/audio';

type View = 'controls' | 'chat' | 'flashcards' | 'test';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [currentView, setCurrentView] = useState<View>('controls');
  const [currentTopic, setCurrentTopic] = useState<StudyTopic | null>(null);

  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [quiz, setQuiz] = useState<Test>([]);
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  
  const [modalContent, setModalContent] = useState<{title: string, content: string} | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isTimetableModalOpen, setIsTimetableModalOpen] = useState(false);

  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [ttsConfig, setTtsConfig] = useState<TTSConfig>({ language: 'en', voice: 'Kore' });
  
  // New centralized audio state management
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [playbackState, setPlaybackState] = useState<PlaybackState>({ isPlaying: false, text: null });
  const [audioCache, setAudioCache] = useState<Record<string, AudioBuffer>>({});
  const currentAudioSource = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      handleLoginSuccess(loggedInUser);
    }
    
    setAudioContext(new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 }));

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (currentAudioSource.current) {
        currentAudioSource.current.stop();
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  const handleLoginSuccess = (email: string) => {
    setCurrentUser(email);
    localStorage.setItem('currentUser', email);
    const savedProfile = localStorage.getItem(`profile_${email}`);
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    } else {
      const defaultProfile = { displayName: email.split('@')[0], avatarUrl: DEFAULT_AVATAR_URL };
      setUserProfile(defaultProfile);
      localStorage.setItem(`profile_${email}`, JSON.stringify(defaultProfile));
    }
    const savedTtsConfig = localStorage.getItem('ttsConfig');
    if (savedTtsConfig) {
      setTtsConfig(JSON.parse(savedTtsConfig));
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserProfile(null);
    localStorage.removeItem('currentUser');
  };

  const handleSaveProfile = (updatedProfile: UserProfile) => {
    if (currentUser) {
      setUserProfile(updatedProfile);
      localStorage.setItem(`profile_${currentUser}`, JSON.stringify(updatedProfile));
    }
  };

  const handleSaveTtsConfig = (config: TTSConfig) => {
    setTtsConfig(config);
    localStorage.setItem('ttsConfig', JSON.stringify(config));
  };

  const handleAction = async <T,>(action: () => Promise<T | null>, onSuccess: (result: T) => void, loadingMessage?: string) => {
    setIsBusy(true);
    const result = await action();
    setIsBusy(false);
    if (result) {
      onSuccess(result);
    } else {
      alert(`Could not generate content. Please check your API key and network connection.`);
    }
  };

  // Centralized Audio Logic
  const stopSpeech = () => {
    if (currentAudioSource.current) {
      currentAudioSource.current.stop();
      currentAudioSource.current.onended = null;
      currentAudioSource.current = null;
    }
    setPlaybackState({ isPlaying: false, text: null });
  };
  
  const playTextAsSpeech = async (rawText: string) => {
    const text = sanitizeTextForTTS(rawText);
    if (!text) return;
  
    if (currentAudioSource.current && playbackState.text === text) {
      stopSpeech();
      return;
    }
  
    if (currentAudioSource.current) {
      stopSpeech();
    }
  
    if (!audioContext) return;
  
    setPlaybackState({ isPlaying: true, text });
  
    const playBuffer = (buffer: AudioBuffer) => {
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start();
      source.onended = () => {
        currentAudioSource.current = null;
        setPlaybackState(prev => (prev.text === text ? { isPlaying: false, text: null } : prev));
      };
      currentAudioSource.current = source;
    };
  
    if (audioCache[text]) {
      playBuffer(audioCache[text]);
    } else {
      setIsBusy(true);
      const audioData = await geminiService.textToSpeech(text, ttsConfig);
      setIsBusy(false);
      if (audioData) {
        try {
          const decodedBytes = decode(audioData);
          const audioBuffer = await decodeAudioData(decodedBytes, audioContext, 24000, 1);
          setAudioCache(prev => ({ ...prev, [text]: audioBuffer }));
          playBuffer(audioBuffer);
        } catch (e) {
          console.error("Error decoding audio:", e);
          stopSpeech();
          alert("Sorry, there was an error playing the audio.");
        }
      } else {
        stopSpeech();
        alert("Sorry, could not generate audio for this text.");
      }
    }
  };


  const onStartChat = (topic: StudyTopic) => {
    setCurrentTopic(topic);
    setCurrentView('chat');
  };

  const onGenerateFlashcards = (topic: StudyTopic) => handleAction(() => geminiService.generateFlashcards(topic), (result) => {
    setFlashcards(result);
    setCurrentView('flashcards');
  });

  const onGenerateTest = (topic: StudyTopic) => handleAction(() => geminiService.generateTest(topic), (result) => {
    setQuiz(result);
    setCurrentView('test');
  });

  const onGenerateSummary = (topic: StudyTopic) => handleAction(() => geminiService.generateSummary(topic), (result) => {
    setModalContent({ title: `Summary: ${topic.chapter}`, content: result });
  });

  const onGenerateNotes = (topic: StudyTopic) => handleAction(() => geminiService.generateNotes(topic), (result) => {
    setModalContent({ title: `Notes: ${topic.chapter}`, content: result });
  });
  
  const onGenerateHomework = (topic: StudyTopic) => handleAction(() => geminiService.generateHomework(topic), (result) => {
    setModalContent({ title: `Homework: ${topic.chapter}`, content: result });
  });

  const onGenerateDiagram = (topic: StudyTopic, count: number) => handleAction(() => geminiService.generateDiagrams(topic, count), (result) => {
    setGeneratedImages(result.map(img => `data:image/png;base64,${img}`));
  });
  
  const onGenerateStudyPlan = () => handleAction(geminiService.generateStudyPlan, setStudyPlan);
  
  const handleGenerateAvatar = (prompt: string): Promise<string | null> => {
    return geminiService.generateAvatar(prompt);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'chat':
        return <ChatWindow topic={currentTopic!} onClose={() => setCurrentView('controls')} onPlayAudio={playTextAsSpeech} playbackState={playbackState} ttsConfig={ttsConfig} />;
      case 'flashcards':
        return <FlashcardView flashcards={flashcards} onClose={() => setCurrentView('controls')} onPlayAudio={playTextAsSpeech} playbackState={playbackState} />;
      case 'test':
        return <TestView test={quiz} onClose={() => setCurrentView('controls')} onPlayAudio={playTextAsSpeech} playbackState={playbackState} />;
      case 'controls':
      default:
        return (
          <ControlPanel
            onStartChat={onStartChat}
            onGenerateFlashcards={onGenerateFlashcards}
            onGenerateTest={onGenerateTest}
            onGenerateSummary={onGenerateSummary}
            onGenerateNotes={onGenerateNotes}
            onGenerateHomework={onGenerateHomework}
            onGenerateDiagram={onGenerateDiagram}
            onGenerateStudyPlan={onGenerateStudyPlan}
            isBusy={isBusy}
          />
        );
    }
  };

  if (!currentUser || !userProfile) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }
  
  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
        <div className="absolute inset-0 h-full w-full bg-transparent bg-[radial-gradient(#2d3748_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative z-10">
            <OfflineBanner isOffline={isOffline} />
            <Header 
                userProfile={userProfile} 
                onLogout={handleLogout} 
                onOpenProfile={() => setIsProfileModalOpen(true)}
                onOpenTimetable={() => setIsTimetableModalOpen(true)}
                onOpenReminders={() => setIsReminderModalOpen(true)}
                onOpenVoiceSettings={() => setIsVoiceModalOpen(true)}
            />
            <main className="container mx-auto px-4 pb-8">
                {renderCurrentView()}
            </main>

            {isBusy && (
                <div className="fixed bottom-6 right-6 bg-purple-600 text-white py-2 px-4 rounded-full shadow-lg flex items-center animate-pulse z-50">
                    <SparklesIcon className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                </div>
            )}
            
            {modalContent && <ContentViewModal {...modalContent} onClose={() => { setModalContent(null); stopSpeech(); }} onPlayAudio={playTextAsSpeech} playbackState={playbackState} />}
            {generatedImages.length > 0 && <ImageGalleryModal images={generatedImages} onClose={() => setGeneratedImages([])} onSelectImage={setSelectedImage} />}
            {selectedImage && <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />}
            {studyPlan && <StudyPlanModal plan={studyPlan} onClose={() => setStudyPlan(null)} />}
            {isProfileModalOpen && <ProfileModal profile={userProfile} onClose={() => setIsProfileModalOpen(false)} onSave={handleSaveProfile} onGenerateAvatar={handleGenerateAvatar} />}
            {isVoiceModalOpen && <VoiceSettingsModal currentConfig={ttsConfig} onClose={() => setIsVoiceModalOpen(false)} onSave={handleSaveTtsConfig} />}
            {isReminderModalOpen && <ReminderModal onClose={() => setIsReminderModalOpen(false)} />}
            {isTimetableModalOpen && <TimetableModal onClose={() => setIsTimetableModalOpen(false)} />}
        </div>
    </div>
  );
};

export default App;