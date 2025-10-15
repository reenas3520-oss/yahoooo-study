

import React, { useState } from 'react';
import type { Test, QuizQuestion, PlaybackState } from '../types';
import { ClipboardCheckIcon } from './icons/ClipboardCheckIcon';
import { Volume2Icon } from './icons/Volume2Icon';
import { StopCircleIcon } from './icons/StopCircleIcon';


interface TestViewProps {
  test: Test;
  onClose: () => void;
  onPlayAudio: (text: string) => void;
  playbackState: PlaybackState;
}

export const TestView: React.FC<TestViewProps> = ({ test, onClose, onPlayAudio, playbackState }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(Array(test.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswerSelect = (option: string) => {
    if (isSubmitted) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = option;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < test.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const score = selectedAnswers.reduce((acc, answer, index) => {
    return answer === test[index].correctAnswer ? acc + 1 : acc;
  }, 0);

  const currentQuestion: QuizQuestion = test[currentQuestionIndex];
  const isPlaying = playbackState.isPlaying && playbackState.text === currentQuestion.question;

  if (isSubmitted) {
    return (
      <div className="bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700/50 flex flex-col items-center animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-4">Test Results</h2>
        <div className="text-5xl font-bold text-indigo-400 mb-2">{score} / {test.length}</div>
        <p className="text-lg text-gray-300 mb-6">You scored {((score / test.length) * 100).toFixed(0)}%</p>
        <button onClick={onClose} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-transform transform active:scale-95 shadow-md">
          Back to Main
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700/50 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <ClipboardCheckIcon className="w-6 h-6 mr-2 text-teal-400" />
          Take a Test
        </h2>
        <span className="text-gray-400 font-mono text-sm">Question {currentQuestionIndex + 1} of {test.length}</span>
      </div>
      
      <div className="bg-gray-900/50 p-4 rounded-lg mb-6 min-h-[6rem] flex items-center justify-between gap-4">
        <p className="text-lg text-gray-200">{currentQuestion.question}</p>
        <button onClick={() => onPlayAudio(currentQuestion.question)} className="flex-shrink-0 p-2 text-gray-400 hover:text-white transition-colors rounded-full" aria-label={isPlaying ? "Stop reading question" : "Read question aloud"}>
            {isPlaying ? <StopCircleIcon className="w-6 h-6 text-red-400"/> : <Volume2Icon className="w-6 h-6"/>}
        </button>
      </div>

      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswers[currentQuestionIndex] === option;
          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                isSelected 
                  ? 'bg-indigo-500/30 border-indigo-500 ring-2 ring-indigo-500 text-white' 
                  : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700 text-gray-300'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center">
        <button onClick={handlePrev} disabled={currentQuestionIndex === 0} className="disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-lg transition-colors bg-gray-600 hover:bg-gray-500">
          Previous
        </button>
        {currentQuestionIndex === test.length - 1 ? (
          <button onClick={handleSubmit} disabled={selectedAnswers[currentQuestionIndex] === null} className="disabled:opacity-50 text-white font-semibold py-2 px-6 rounded-lg transition-colors bg-green-600 hover:bg-green-700">
            Submit
          </button>
        ) : (
          <button onClick={handleNext} disabled={currentQuestionIndex === test.length - 1} className="disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-lg transition-colors bg-indigo-600 hover:bg-indigo-700">
            Next
          </button>
        )}
      </div>
    </div>
  );
};
