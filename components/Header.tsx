
import React from 'react';
import type { UserProfile } from '../types';
import { BrainCircuitIcon } from './icons/BrainCircuitIcon';
import { LogOutIcon } from './icons/LogOutIcon';
import { CalendarDaysIcon } from './icons/CalendarDaysIcon';
import { BellIcon } from './icons/BellIcon';
import { SettingsIcon } from './icons/SettingsIcon';

interface HeaderProps {
  userProfile: UserProfile;
  onLogout: () => void;
  onOpenProfile: () => void;
  onOpenTimetable: () => void;
  onOpenReminders: () => void;
  onOpenVoiceSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ userProfile, onLogout, onOpenProfile, onOpenTimetable, onOpenReminders, onOpenVoiceSettings }) => {
  return (
    <header className="bg-gray-800/30 backdrop-blur-lg p-4 rounded-b-2xl shadow-lg border-b border-x border-gray-700/50 mb-8 sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg shadow-md">
                <BrainCircuitIcon className="w-8 h-8 text-white" />
            </div>
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Germ Study AI</h1>
                <p className="text-xs text-gray-400">Your Personalized Learning Companion</p>
            </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
            <button onClick={onOpenTimetable} className="hidden sm:block p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors" aria-label="Open Timetable">
                <CalendarDaysIcon className="w-6 h-6" />
            </button>
            <button onClick={onOpenReminders} className="hidden sm:block p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors" aria-label="Set Reminder">
                <BellIcon className="w-6 h-6" />
            </button>
            <button onClick={onOpenVoiceSettings} className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors" aria-label="Voice Settings">
                <SettingsIcon className="w-6 h-6" />
            </button>
            <button onClick={onLogout} className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors" aria-label="Log out">
                <LogOutIcon className="w-6 h-6" />
            </button>
            <div className="cursor-pointer" onClick={onOpenProfile}>
                <img 
                    src={userProfile.avatarUrl} 
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-400 hover:ring-2 hover:ring-offset-2 hover:ring-offset-gray-800 hover:ring-indigo-400 transition-all"
                />
            </div>
        </div>
      </div>
    </header>
  );
};
