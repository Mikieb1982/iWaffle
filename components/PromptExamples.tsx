import React from 'react';
import { LogoIcon } from './icons/LogoIcon';

interface PromptExamplesProps {
    onExampleClick: (prompt: string) => void;
}

const examples = [
    "Draft a tweet about the launch of a new waffle-themed productivity app",
    "Write a short, playful poem about prompt engineering",
    "Give me 3 creative names for a new coffee blend",
    "Explain the concept of 'mise en place' for software development"
];

export const PromptExamples: React.FC<PromptExamplesProps> = ({ onExampleClick }) => {
    return (
        <div className="text-center flex flex-col items-center justify-center h-full pt-8">
            <LogoIcon className="w-20 h-20 mb-4" />
            <h2 className="text-2xl font-bold mb-6 text-[--color-heading]">Ready to start cooking?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                {examples.map((prompt) => (
                    <button
                        key={prompt}
                        onClick={() => onExampleClick(prompt)}
                        className="p-4 border rounded-lg text-left text-sm hover:bg-[--color-subtle-background] border-[--color-border] transition-colors"
                    >
                        {prompt}
                    </button>
                ))}
            </div>
        </div>
    );
};
