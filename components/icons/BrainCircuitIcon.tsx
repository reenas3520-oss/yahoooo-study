import React from 'react';

export const BrainCircuitIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M12 5V3" />
    <path d="M12 13v-2" />
    <path d="M9 8V6" />
    <path d="M15 8V6" />
    <path d="M12 21a9 9 0 0 0-4.63-8.12" />
    <path d="M16.63 12.88A9 9 0 0 0 12 3" />
    <path d="M12 21a9 9 0 0 1 4.63-8.12" />
    <path d="M7.37 12.88A9 9 0 0 1 12 3" />
    <path d="M12 3a9 9 0 0 0 0 18" />
    <circle cx="12" cy="13" r="1" />
    <circle cx="9" cy="8" r="1" />
    <circle cx="15" cy="8" r="1" />
  </svg>
);
