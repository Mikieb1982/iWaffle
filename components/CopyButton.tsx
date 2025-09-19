import React, { useState } from 'react';

interface CopyButtonProps {
    textToCopy: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <button
            onClick={handleCopy}
            className="px-2 py-1 text-xs font-semibold text-[--color-text-secondary] bg-[--color-subtle-background] rounded-md hover:bg-[--color-border] transition-colors"
        >
            {copied ? 'Copied!' : 'Copy'}
        </button>
    );
};
