import React from 'react';
import { ChatInterface } from './ChatInterface';

export const SimpleMode = () => {
  return (
    <div className="w-full h-full flex-grow flex flex-col">
      <ChatInterface />
    </div>
  );
};
