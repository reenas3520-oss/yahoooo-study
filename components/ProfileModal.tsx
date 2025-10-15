
import React, { useState, useEffect } from 'react';
import type { UserProfile } from '../types';
import { XIcon } from './icons/XIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface ProfileModalProps {
  profile: UserProfile;
  onClose: () => void;
  onSave: (updatedProfile: UserProfile) => void;
  onGenerateAvatar: (prompt: string) => Promise<string | null>;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ profile, onClose, onSave, onGenerateAvatar }) => {
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [avatarPrompt, setAvatarPrompt] = useState('a friendly blue robot, digital art');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

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

  const handleGenerate = async () => {
    if (!avatarPrompt.trim()) {
        setError('Please enter a prompt for your avatar.');
        return;
    }
    setError('');
    setIsGenerating(true);
    const newAvatarBytes = await onGenerateAvatar(avatarPrompt);
    if (newAvatarBytes) {
      setAvatarUrl(`data:image/jpeg;base64,${newAvatarBytes}`);
    } else {
      setError('Could not generate a new avatar. Please try again.');
    }
    setIsGenerating(false);
  };

  const handleSave = () => {
    onSave({ displayName, avatarUrl });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
    >
      <div
        className="relative w-full max-w-lg bg-gray-800/80 rounded-lg shadow-2xl flex flex-col border border-gray-700/50"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
          <h2 id="profile-modal-title" className="text-xl font-bold text-white">
            Edit Your Profile
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1"
            aria-label="Close profile editor"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </header>

        <div className="p-6 space-y-6">
            <div className="flex items-center space-x-6">
                <div className="relative">
                    <img src={avatarUrl} alt="Current Avatar" className="w-24 h-24 rounded-full bg-gray-700 object-cover border-2 border-indigo-400 shadow-lg" />
                    {isGenerating && (
                        <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                            <div className="w-8 h-8 border-4 border-t-indigo-400 border-gray-600 rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>
                <div className="flex-grow space-y-2">
                    <label htmlFor="display-name" className="block text-sm font-medium text-gray-300">Display Name</label>
                    <input
                        id="display-name"
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-inner"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="avatar-prompt" className="block text-sm font-medium text-gray-300">Generate a New Avatar</label>
                <div className="flex space-x-2">
                    <input
                        id="avatar-prompt"
                        type="text"
                        value={avatarPrompt}
                        onChange={(e) => setAvatarPrompt(e.target.value)}
                        placeholder="e.g., a wise owl with glasses"
                        className="flex-grow w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-inner"
                    />
                    <button 
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="flex-shrink-0 flex items-center bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900/70 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition transform active:scale-95 shadow-md"
                    >
                       <SparklesIcon className="w-5 h-5 mr-2" />
                        {isGenerating ? 'Creating...' : 'Generate'}
                    </button>
                </div>
                {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
            </div>

        </div>

        <footer className="flex justify-end p-4 border-t border-gray-700 bg-gray-800/50 rounded-b-lg space-x-3">
            <button
                onClick={onClose}
                className="px-4 py-2 rounded-md text-gray-200 bg-gray-600 hover:bg-gray-500 transition-colors transform active:scale-95 shadow-md"
            >
                Cancel
            </button>
            <button
                onClick={handleSave}
                className="px-6 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors transform active:scale-95 shadow-md"
            >
                Save
            </button>
        </footer>

      </div>
    </div>
  );
};
