import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const ComplexMode = () => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center text-center p-8 bg-bg-secondary rounded-2xl border border-border-color shadow-sm">
      <div className="p-4 bg-accent/20 rounded-full mb-4">
        <SparklesIcon />
      </div>
      <h2 className="text-xl font-bold text-text-primary mb-2">Complex Mode is Coming Soon!</h2>
      <p className="text-text-secondary max-w-sm">
        Get ready to build highly-structured prompts with fine-tuned controls. We're still cooking this feature up in the iWaffle kitchen!
      </p>
    </div>
  );
};
