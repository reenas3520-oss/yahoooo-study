import React, { useEffect } from 'react';
import type { StudyPlan } from '../types';
import { XIcon } from './icons/XIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { RefreshCwIcon } from './icons/RefreshCwIcon';

interface StudyPlanModalProps {
  plan: StudyPlan | null;
  onClose: () => void;
}

export const StudyPlanModal: React.FC<StudyPlanModalProps> = ({ plan, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="study-plan-title"
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-gray-800/80 rounded-lg shadow-2xl flex flex-col border border-gray-700/50"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
          <h2 id="study-plan-title" className="text-xl font-bold text-white">
            Your Personalized Study Plan
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1"
            aria-label="Close study plan viewer"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </header>

        <div className="p-6 overflow-y-auto">
          {plan && plan.length > 0 ? (
            <div className="space-y-6">
              {plan.map((day) => (
                <div key={day.day} className="bg-gray-700/50 p-4 rounded-lg border border-gray-600/50">
                  <h3 className="text-lg font-semibold text-indigo-400 mb-3 border-b border-gray-600 pb-2">
                    Day {day.day}
                  </h3>
                  <div className="space-y-3">
                    <div>
                        <h4 className="font-semibold text-gray-200 flex items-center mb-2">
                            <BookOpenIcon className="w-5 h-5 mr-2 text-green-400" />
                            Main Focus: <span className="font-normal text-gray-300 ml-2">{day.topic}</span>
                        </h4>
                         <ul className="list-none space-y-1 pl-7">
                            {day.tasks.map((task, i) => (
                            <li key={i} className="text-gray-300 flex items-start">
                                <CheckCircleIcon className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                                <span>{task}</span>
                            </li>
                            ))}
                        </ul>
                    </div>
                    {day.review && day.review.length > 0 && (
                       <div>
                            <h4 className="font-semibold text-gray-200 flex items-center mb-2">
                                <RefreshCwIcon className="w-5 h-5 mr-2 text-yellow-400" />
                                Review Session
                            </h4>
                            <ul className="list-none space-y-1 pl-7">
                                {day.review.map((rev, i) => (
                                <li key={i} className="text-gray-300 flex items-start">
                                    <CheckCircleIcon className="w-4 h-4 mr-2 mt-1 text-yellow-500 flex-shrink-0" />
                                    <span>{rev}</span>
                                </li>
                                ))}
                            </ul>
                       </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-10">
              <p>Could not generate a study plan. Please try again.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BookOpenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const RefreshCwIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
);