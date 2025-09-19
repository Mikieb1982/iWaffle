import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-2 h-2 rounded-full animate-pulse bg-blue-600"></div>
      <div className="w-2 h-2 rounded-full animate-pulse bg-blue-600" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-2 h-2 rounded-full animate-pulse bg-blue-600" style={{ animationDelay: '0.4s' }}></div>
      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">Generating...</span>
    </div>
  );
};

export default Loader;
