import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Waffling on it...",
  "Stirring the batter...",
  "Preheating the waffle iron...",
  "Consulting the recipe book...",
  "Adding a dash of creativity...",
  "Getting the syrup ready...",
];

export const Loader: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <div className="w-3 h-3 rounded-sm animate-active-bounce" style={{ backgroundColor: 'var(--color-strawberry-pink)', animationDelay: '0s' }}></div>
      <div className="w-3 h-3 rounded-sm animate-active-bounce" style={{ backgroundColor: 'var(--color-butter-yellow)', animationDelay: '0.2s' }}></div>
      <div className="w-3 h-3 rounded-sm animate-active-bounce" style={{ backgroundColor: 'var(--color-blueberry-purple)', animationDelay: '0.4s' }}></div>
      <span className="text-sm ml-2 transition-opacity duration-500" style={{ color: 'var(--color-text-secondary)' }}>
        {loadingMessages[messageIndex]}
      </span>
    </div>
  );
};