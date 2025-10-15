import React, { useEffect } from 'react';
import { XIcon } from './icons/XIcon';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
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
      aria-label="Image viewer"
    >
      <div
        className="relative max-w-4xl max-h-[90vh] bg-gray-900/50 rounded-lg shadow-2xl overflow-hidden border border-gray-700/50"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image itself
      >
        <img
          src={imageUrl}
          alt="Full-screen diagram"
          className="object-contain w-full h-full"
        />
      </div>
       <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Close image viewer"
      >
        <XIcon className="w-6 h-6" />
      </button>
    </div>
  );
};