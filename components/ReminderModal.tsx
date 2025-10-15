
import React, { useEffect } from 'react';
import { XIcon } from './icons/XIcon';
import { BellIcon } from './icons/BellIcon';

interface ReminderModalProps {
  onClose: () => void;
}

export const ReminderModal: React.FC<ReminderModalProps> = ({ onClose }) => {
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
      aria-labelledby="reminder-modal-title"
    >
      <div
        className="relative w-full max-w-md bg-gray-800/80 rounded-lg shadow-2xl flex flex-col border border-gray-700/50"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 id="reminder-modal-title" className="text-xl font-bold text-white flex items-center">
            <BellIcon className="w-6 h-6 mr-3 text-yellow-400" />
            Set a Study Reminder
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1"
            aria-label="Close reminder setup"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </header>
        <div className="p-6 text-center text-gray-300">
          <p>This feature is coming soon!</p>
          <p className="text-sm text-gray-400">You'll be able to set reminders to help you stick to your study plan.</p>
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
