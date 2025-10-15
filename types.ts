export interface StudyTopic {
  class: string;
  subject: string;
  book: string;
  chapter: string;
}

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  parts: { text: string }[];
  image?: string;
  isStreaming?: boolean;
}

export interface Flashcard {
  question: string;
  answer: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export type Test = QuizQuestion[];

export interface StudyDay {
    day: number;
    topic: string;
    tasks: string[];
    review: string[];
}

export type StudyPlan = StudyDay[];

export interface UserProfile {
    displayName: string;
    avatarUrl: string;
}

export interface LanguageOption {
    code: string;
    label: string;
}

export interface VoiceOption {
    name: string;
    label: string;
}

export interface TTSConfig {
    language: string;
    voice: string;
}

export interface PlaybackState {
  isPlaying: boolean;
  text: string | null;
}