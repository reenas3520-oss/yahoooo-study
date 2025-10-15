
import React, { useEffect } from 'react';
import { XIcon } from './icons/XIcon';
import { CalendarDaysIcon } from './icons/CalendarDaysIcon';

interface TimetableModalProps {
  onClose: () => void;
}

export const TimetableModal: React.FC<TimetableModalProps> = ({ onClose }) => {
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
      aria-labelledby="timetable-modal-title"
    >
      <div
        className="relative w-full max-w-lg bg-gray-800/80 rounded-lg shadow-2xl flex flex-col border border-gray-700/50"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 id="timetable-modal-title" className="text-xl font-bold text-white flex items-center">
            <CalendarDaysIcon className="w-6 h-6 mr-3 text-indigo-400" />
            Your Study Timetable
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1"
            aria-label="Close timetable"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </header>
        <div className="p-6 text-center text-gray-300">
          <p>This feature is coming soon!</p>
          <p className="text-sm text-gray-400">Soon you will be able to view and manage your study schedule here.</p>
        </div>
         <footer className="flex justify-end p-4 border-t border-gray-700">
            <button
                onClick={onClose}
                className="px-4 py-2 rounded-md text-gray-200 bg-gray-600 hover:bg-gray-500 transition-colors"
            >
                Close
            </button>
        </footer>
      </div>
    </div>
  );
};
