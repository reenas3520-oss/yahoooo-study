

import React, { useState } from 'react';
import type { Flashcard, PlaybackState } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { CopyStackIcon } from './icons/CopyStackIcon';
import { Volume2Icon } from './icons/Volume2Icon';
import { StopCircleIcon } from './icons/StopCircleIcon';

interface FlashcardViewProps {
  flashcards: Flashcard[];
  onClose: () => void;
  onPlayAudio: (text: string) => void;
  playbackState: PlaybackState;
}

export const FlashcardView: React.FC<FlashcardViewProps> = ({ flashcards, onClose, onPlayAudio, playbackState }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    if (isFlipped) {
      setIsFlipped(false);
      setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % flashcards.length);
      }, 150)
    } else {
        setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }
  };

  const handlePrev = () => {
    if (isFlipped) {
      setIsFlipped(false);
      setTimeout(() => {
          setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
      }, 150)
    } else {
      setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }
  };

  const currentCard = flashcards[currentIndex];
  const isQuestionPlaying = playbackState.isPlaying && playbackState.text === currentCard.question;
  const isAnswerPlaying = playbackState.isPlaying && playbackState.text === currentCard.answer;

  const handleAudio = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    onPlayAudio(text);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center animate-fade-in">
        <div className="flex justify-between items-center w-full mb-4 px-2">
            <h2 className="text-xl font-bold text-white flex items-center">
                <CopyStackIcon className="w-6 h-6 mr-2 text-purple-400" />
                Flashcards
            </h2>
            <button onClick={onClose} className="text-indigo-400 hover:text-indigo-300 font-semibold">
                Done
            </button>
        </div>
      
      <div className="w-full h-80 perspective-1000">
        <div 
          className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front of Card */}
          <div className="absolute w-full h-full backface-hidden bg-gray-700 rounded-2xl shadow-lg border border-gray-600 flex flex-col items-center justify-center p-6 text-center cursor-pointer">
            <p className="text-2xl font-semibold text-white mb-4">{currentCard.question}</p>
            <button onClick={(e) => handleAudio(e, currentCard.question)} className="absolute bottom-4 right-4 text-gray-300 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-600/50" aria-label={isQuestionPlaying ? "Stop speaking question" : "Read question aloud"}>
              {isQuestionPlaying ? <StopCircleIcon className="w-6 h-6 text-red-400"/> : <Volume2Icon className="w-6 h-6" />}
            </button>
          </div>
          {/* Back of Card */}
          <div className="absolute w-full h-full backface-hidden bg-indigo-700 rounded-2xl shadow-lg border border-indigo-500 flex flex-col items-center justify-center p-6 text-center rotate-y-180 cursor-pointer">
            <p className="text-xl text-white mb-4">{currentCard.answer}</p>
             <button onClick={(e) => handleAudio(e, currentCard.answer)} className="absolute bottom-4 right-4 text-gray-200 hover:text-white transition-colors p-2 rounded-full hover:bg-indigo-600/50" aria-label={isAnswerPlaying ? "Stop speaking answer" : "Read answer aloud"}>
              {isAnswerPlaying ? <StopCircleIcon className="w-6 h-6"/> : <Volume2Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full mt-6">
        <button onClick={handlePrev} className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <div className="text-white font-mono text-sm">
          {currentIndex + 1} / {flashcards.length}
        </div>
        <button onClick={handleNext} className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors">
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="text-sm text-gray-400 mt-4">Click card to flip</div>
    </div>
  );
};
