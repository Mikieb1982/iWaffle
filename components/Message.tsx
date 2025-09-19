import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message as MessageType } from '../types';
import { UserIcon } from './icons/UserIcon';
import { LogoIcon } from './icons/LogoIcon';
import { JsonDisplay } from './JsonDisplay';
import { Loader } from './Loader';

interface MessageProps {
    message: MessageType;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
    const isModel = message.sender === 'model';

    return (
        <div className={`flex w-full items-start gap-3 my-2 ${!isModel ? 'flex-row-reverse' : ''}`}>
             <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isModel ? 'bg-subtle-background' : 'bg-accent'}`}>
                {isModel ? <LogoIcon className="w-8 h-8 p-1" /> : <UserIcon className="w-5 h-5 text-white" />}
            </div>
            <div className={`flex-grow p-3 rounded-lg max-w-[85%] prose prose-sm dark:prose-invert max-w-none break-words ${isModel ? 'bg-subtle-background text-text-primary' : 'bg-accent text-accent-text'}`}>
                {message.isTyping && !message.text ? (
                    <div className="flex items-center gap-2">
                        <Loader isLight={!isModel} />
                        <span>Thinking...</span>
                    </div>
                ) : message.json ? (
                    <JsonDisplay jsonData={message.json} />
                ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
                )}
            </div>
        </div>
    );
};
