import React from 'react';

export const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        width="40" 
        height="40" 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <rect width="40" height="40" rx="12" fill="var(--color-button-secondary)"/>
        <rect x="13" y="13" width="14" height="14" rx="3" fill="#FAF8F4"/>
        <path d="M18.5 22C17.6716 22 17 22.6716 17 23.5V23.5C17 24.3284 17.6716 25 18.5 25H20V26.5C20 27.3284 20.6716 28 21.5 28V28C22.3284 28 23 27.3284 23 26.5V20C23 16.6863 20.3137 14 17 14V14C15.8954 14 15 14.8954 15 16V16C15 17.1046 15.8954 18 17 18H20V22H18.5Z" fill="#2C2A28"/>
    </svg>
);
