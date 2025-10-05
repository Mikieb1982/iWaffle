import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { translations, Locale } from '../i18n/index.ts';

type LanguageContextType = {
  language: Locale;
  setLanguage: (language: Locale) => void;
  t: (key: keyof typeof translations.en) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Locale>(() => {
    const savedLang = localStorage.getItem('language');
    return (savedLang === 'de' || savedLang === 'en') ? savedLang : 'en';
  });

  const setLanguage = (lang: Locale) => {
    localStorage.setItem('language', lang);
    setLanguageState(lang);
    document.documentElement.lang = lang;
  };
  
  const t = useCallback((key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key];
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslations = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslations must be used within a LanguageProvider');
  }
  return context;
};
