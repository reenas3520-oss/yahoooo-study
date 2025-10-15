import React from 'react';
import { WifiOffIcon } from './icons/WifiOffIcon';

interface OfflineBannerProps {
  isOffline: boolean;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ isOffline }) => {
  if (!isOffline) {
    return null;
  }

  return (
    <div className="bg-yellow-600 text-white text-sm text-center p-2 flex items-center justify-center shadow-lg" role="status">
      <WifiOffIcon className="w-4 h-4 mr-2" />
      You are currently offline. Some features are disabled, but you can review any cached content.
    </div>
  );
};
