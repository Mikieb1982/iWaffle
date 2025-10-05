import React from 'react';
import MoonIcon from './icons/MoonIcon.tsx';
import SunIcon from './icons/SunIcon.tsx';
import { useTranslations } from '../hooks/useTranslations.tsx';

interface ThemeToggleProps {
    theme: string;
    onToggle: () => void;
}

const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  const { t } = useTranslations();
  return (
    <button onClick={onToggle} className="p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--color-strawberry-pink]" style={{ backgroundColor: 'var(--color-subtle-background)', color: 'var(--color-heading)', '--ring-offset-color': 'var(--color-background)' } as React.CSSProperties} aria-label={theme === 'light' ? t('switchToDark') : t('switchToLight')}>
      {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
    </button>
  );
};

export default ThemeToggle;
