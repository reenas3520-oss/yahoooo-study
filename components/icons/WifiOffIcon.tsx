import React from 'react';

export const WifiOffIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="2" y1="2" x2="22" y2="22" />
    <path d="M8.5 16.5a5 5 0 0 1 7 0" />
    <path d="M2 8.82a15 15 0 0 1 4.17-2.65" />
    <path d="M10.66 5.19a15 15 0 0 1 11.34 3.63" />
    <path d="M5 12.55a10 10 0 0 1 3.24-2.2" />
    <path d="M12.34 10.34a10 10 0 0 1 5.42 2.21" />
  </svg>
);
