import React from 'react';

export const Loader = ({ isLight = false }: { isLight?: boolean }) => (
  <div className="flex justify-center items-center">
    <div className={`animate-spin rounded-full h-5 w-5 border-b-2 ${isLight ? 'border-white' : 'border-[--color-text-primary]'}`}></div>
  </div>
);