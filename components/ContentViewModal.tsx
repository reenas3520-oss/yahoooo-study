

import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { XIcon } from './icons/XIcon';
import { FileTextIcon } from './icons/FileTextIcon';
import { Volume2Icon } from './icons/Volume2Icon';
import { StopCircleIcon } from './icons/StopCircleIcon';
import type { PlaybackState } from '../types';

interface ContentViewModalProps {
  title: string;
  content: string;
  onClose: () => void;
  onPlayAudio: (text: string) => void;
  playbackState: PlaybackState;
}

export const ContentViewModal: React.FC<ContentViewModalProps> = ({ title, content, onClose, onPlayAudio, playbackState }) => {
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

  const isPlaying = playbackState.isPlaying && playbackState.text === content;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="content-view-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-gray-800/80 rounded-lg shadow-2xl flex flex-col border border-gray-700/50"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
          <h2 id="content-view-title" className="text-xl font-bold text-white flex items-center">
            <FileTextIcon className="w-6 h-6 mr-3 text-sky-400" />
            {title}
          </h2>
          <div className="flex items-center space-x-2">
            <button
                onClick={() => onPlayAudio(content)}
                className="text-gray-300 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
                aria-label={isPlaying ? "Stop speaking" : "Read text aloud"}
              >
                {isPlaying ? <StopCircleIcon className="w-6 h-6 text-red-400" /> : <Volume2Icon className="w-6 h-6" />}
              </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1"
              aria-label="Close content viewer"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>
        </header>

        <div className="p-6 overflow-y-auto">
          <div className="prose prose-invert prose-sm sm:prose-base max-w-none prose-h1:text-xl prose-h2:text-lg prose-h3:text-md prose-p:text-gray-300 prose-strong:text-white prose-li:text-gray-300">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};
