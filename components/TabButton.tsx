import React from 'react';

interface TabButtonProps {
  id: string;
  label: string;
  activeTab: string;
  onClick: (id: string) => void;
}

export const TabButton = React.memo(({ id, label, activeTab, onClick }: TabButtonProps) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
        activeTab === id
          ? 'bg-accent text-white'
          : 'text-text-secondary hover:bg-black/5 dark:hover:bg-white/5'
      }`}
    >
      {label}
    </button>
  );
});
