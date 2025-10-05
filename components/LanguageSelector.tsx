import React from 'react';
import { useTranslations } from '../hooks/useTranslations.tsx';

const LanguageSelector = () => {
  const { language, setLanguage } = useTranslations();

  return (
    <div className="flex bg-[--color-subtle-background] rounded-full p-1 border" style={{ borderColor: 'var(--color-border)' }}>
      <button 
        onClick={() => setLanguage('en')} 
        className={`w-1/2 px-3 py-1 rounded-full text-sm font-bold transition-colors ${language === 'en' ? 'bg-[--color-butter-yellow] text-black shadow' : 'hover:bg-[--color-input-background]'}`}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
      <button 
        onClick={() => setLanguage('de')} 
        className={`w-1/2 px-3 py-1 rounded-full text-sm font-bold transition-colors ${language === 'de' ? 'bg-[--color-butter-yellow] text-black shadow' : 'hover:bg-[--color-input-background]'}`}
        aria-pressed={language === 'de'}
      >
        DE
      </button>
    </div>
  );
};

export default LanguageSelector;
