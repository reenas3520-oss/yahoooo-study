

import React, { useEffect, useState } from 'react';
import { XIcon } from './icons/XIcon';
import { Volume2Icon } from './icons/Volume2Icon';
import { LANGUAGES, VOICE_OPTIONS } from '../constants';
import { VoiceOption, LanguageOption, TTSConfig } from '../types';

interface VoiceSettingsModalProps {
  onClose: () => void;
  onSave: (config: TTSConfig) => void;
  currentConfig: TTSConfig;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({ onClose, onSave, currentConfig }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(currentConfig.language);
  const [selectedVoice, setSelectedVoice] = useState(currentConfig.voice);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSave = () => {
    onSave({ language: selectedLanguage, voice: selectedVoice });
    onClose();
  };

  const selectClasses = "w-full bg-gray-700 border border-gray-600 text-white rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-inner";

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-settings-title"
    >
      <div
        className="relative w-full max-w-md bg-gray-800/80 rounded-lg shadow-2xl flex flex-col border border-gray-700/50"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 id="voice-settings-title" className="text-xl font-bold text-white flex items-center">
            <Volume2Icon className="w-6 h-6 mr-3 text-sky-400" />
            Voice Settings
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1" aria-label="Close voice settings">
            <XIcon className="w-6 h-6" />
          </button>
        </header>

        <div className="p-6 space-y-6">
          <div>
            <label htmlFor="language-select" className="block text-sm font-medium text-gray-300 mb-2">
              Language
            </label>
            <select
              id="language-select"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className={selectClasses}
            >
              {LANGUAGES.map((lang: LanguageOption) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="voice-select" className="block text-sm font-medium text-gray-300 mb-2">
              Voice
            </label>
            <select
              id="voice-select"
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className={selectClasses}
            >
              {VOICE_OPTIONS.map((voice: VoiceOption) => (
                <option key={voice.name} value={voice.name}>
                  {voice.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-2">The selected voice will be used for reading text in your chosen language.</p>
          </div>
        </div>

        <footer className="flex justify-end p-4 border-t border-gray-700 bg-gray-800/50 rounded-b-lg space-x-3">
          <button onClick={onClose} className="px-4 py-2 rounded-md text-gray-200 bg-gray-600 hover:bg-gray-500 transition-colors transform active:scale-95 shadow-md">
            Cancel
          </button>
          <button onClick={handleSave} className="px-6 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors transform active:scale-95 shadow-md">
            Save
          </button>
        </footer>
      </div>
    </div>
  );
};