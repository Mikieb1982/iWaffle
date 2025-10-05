import React, { useState, useEffect } from 'react';
import { useTranslations } from '../hooks/useTranslations.tsx';

const Loader = () => {
  const { t } = useTranslations();
  const loadingMessages = [
    t('loaderWaffling'),
    t('loaderStirring'),
    t('loaderPreheating'),
    t('loaderConsulting'),
    t('loaderAdding'),
    t('loaderSyrup'),
  ];
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [loadingMessages.length]);
  
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

export default Loader;
