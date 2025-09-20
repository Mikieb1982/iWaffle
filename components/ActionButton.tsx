import React, { useState } from 'react';
import DownloadIcon from './icons/DownloadIcon.tsx';
import type { PromptData } from '../types.ts';

interface ActionButtonProps {
    textToCopy: string;
    dataToDownload: PromptData;
    className?: string;
}

const ActionButton = ({ textToCopy, dataToDownload, className }: ActionButtonProps) => {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = () => {
        if (!textToCopy) return;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleDownload = () => {
        const jsonString = JSON.stringify(dataToDownload, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const date = new Date().toISOString().split('T')[0];
        a.download = `iwaffle-prompt-${date}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const CopyIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>);
    const CheckIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>);

    return (
        <div className={`flex items-center gap-2 ${className}`}>
             <button onClick={handleDownload} className="flex items-center gap-2 font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow hover:-translate-y-0.5 bg-gray-500 text-white">
                <DownloadIcon className="w-5 h-5" /> Download
            </button>
            <button onClick={handleCopy} className={`flex items-center gap-2 font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow hover:-translate-y-0.5 ${ copied ? 'bg-green-500' : 'bg-[--color-strawberry-pink]'} text-white`}>
                {copied ? <CheckIcon/> : <CopyIcon/>}
                {copied ? 'Copied!' : 'Copy Prompt'}
            </button>
        </div>
    );
};

export default ActionButton;
