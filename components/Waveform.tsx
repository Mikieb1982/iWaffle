import React from 'react';

export const Waveform: React.FC = () => {
    return (
        <div className="flex items-end justify-center gap-1 h-6 w-full" aria-hidden="true">
            <span className="w-1 h-2 bg-[--color-strawberry-pink] rounded-full animate-waveform" style={{ animationDelay: '-0.4s' }}></span>
            <span className="w-1 h-4 bg-[--color-strawberry-pink] rounded-full animate-waveform" style={{ animationDelay: '-0.2s' }}></span>
            <span className="w-1 h-5 bg-[--color-strawberry-pink] rounded-full animate-waveform" style={{ animationDelay: '0s' }}></span>
            <span className="w-1 h-3 bg-[--color-strawberry-pink] rounded-full animate-waveform" style={{ animationDelay: '-0.3s' }}></span>
            <span className="w-1 h-4 bg-[--color-strawberry-pink] rounded-full animate-waveform" style={{ animationDelay: '-0.1s' }}></span>
        </div>
    );
};
