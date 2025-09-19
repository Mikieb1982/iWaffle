import React, { useRef, useEffect } from 'react';
import { Message as MessageType } from '../types';
import { Message } from './Message';
import { PromptExamples } from './PromptExamples';
import { TrashIcon } from './icons/TrashIcon';

interface ChatInterfaceProps {
    messages: MessageType[];
    input: string;
    setInput: (value: string) => void;
    handleSend: () => void;
    handleReset: () => void;
    isLoading: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
    messages,
    input,
    setInput,
    handleSend,
    handleReset,
    isLoading,
}) => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full bg-foreground rounded-xl border border-border-color shadow-sm">
            <div className="flex-grow overflow-y-auto p-4 md:p-6">
                {messages.length === 0 ? (
                    <PromptExamples onExampleClick={(prompt) => setInput(prompt)} />
                ) : (
                    <div className="flex flex-col">
                        {messages.map((msg) => (
                            <Message key={msg.id} message={msg} />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>
            <div className="p-4 md:p-6 border-t border-border-color bg-foreground rounded-b-xl">
                <div className="relative">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask iWaffle anything..."
                        className="w-full p-3 pr-32 border rounded-lg bg-input-background border-border-color focus:ring-2 focus:ring-button-primary focus:outline-none resize-none transition-shadow"
                        rows={1}
                        disabled={isLoading}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                         {messages.length > 0 && !isLoading && (
                            <button onClick={handleReset} className="p-2 rounded-full text-text-secondary hover:bg-subtle-background transition-colors" aria-label="Reset chat">
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        )}
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="px-4 py-2 text-sm font-semibold text-white bg-button-primary rounded-lg hover:bg-button-primary-hover disabled:bg-opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
