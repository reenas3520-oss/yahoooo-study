
import React, { useEffect } from 'react';
import { XIcon } from './icons/XIcon';
import { GalleryHorizontalIcon } from './icons/GalleryHorizontalIcon';

interface ImageGalleryModalProps {
  images: string[];
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
}

export const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({ images, onClose, onSelectImage }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-gray-800/80 rounded-lg shadow-2xl flex flex-col border border-gray-700/50"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
          <h2 id="gallery-title" className="text-xl font-bold text-white flex items-center">
            <GalleryHorizontalIcon className="w-6 h-6 mr-3 text-cyan-400" />
            Generated Diagrams
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1" aria-label="Close gallery">
            <XIcon className="w-6 h-6" />
          </button>
        </header>

        <div className="p-6 overflow-y-auto">
          {images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((imageSrc, index) => (
                <div 
                  key={index} 
                  className="aspect-square bg-gray-700 rounded-lg overflow-hidden cursor-pointer group relative transform transition-transform hover:scale-105"
                  onClick={() => onSelectImage(imageSrc)}
                >
                  <img src={imageSrc} alt={`Generated diagram ${index + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white font-bold">View Larger</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-10">
              <p>No images were generated. Please try again.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
