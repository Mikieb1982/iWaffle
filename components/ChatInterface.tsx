import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LogoIcon } from './icons/LogoIcon';
import { UserIcon } from './icons/UserIcon';
import { Loader } from './Loader';
import { PromptExamples } from './PromptExamples';
import { MicrophoneIcon } from './icons/MicrophoneIcon';
import { MessageIcon } from './icons/MessageIcon';
import { streamMockResponse } from '../services/geminiService';
import type { ChatMessage } from '../types';

interface MessageProps {
  msg: ChatMessage;
}

const Message = ({ msg }: MessageProps) => {
    const isModel = msg.role === 'model';
    return (
      <div className={`flex gap-3 my-4 ${isModel ? '' : 'justify-end'}`}>
        {isModel && <div className="w-8 h-8 flex-shrink-0"><LogoIcon isSmall={true} /></div>}
        <div className={`p-3 rounded-2xl max-w-lg break-words ${isModel ? 'bg-bg-secondary border border-border-color text-text-primary' : 'bg-accent text-white'}`}>
          <div className="whitespace-pre-wrap">{isModel && msg.content === '' ? <Loader /> : msg.content}</div>
        </div>
        {!isModel && <div className="w-8 h-8 flex-shrink-0"><UserIcon /></div>}
      </div>
    );
};

export const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPromptBox, setShowPromptBox] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => setShowPromptBox(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [input]);

  const handleSend = useCallback(async (promptText: string) => {
    if (!promptText.trim()) return;

    const userMessage: ChatMessage = { id: Date.now(), role: 'user', content: promptText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const modelMessageId = Date.now() + 1;
    setMessages(prev => [...prev, { id: modelMessageId, role: 'model', content: '' }]);
    
    const stream = streamMockResponse(promptText);
    for await (const chunk of stream) {
        setMessages(prev => prev.map(msg => 
            msg.id === modelMessageId 
                ? { ...msg, content: msg.content + chunk }
                : msg
        ));
    }

    setIsLoading(false);
  }, []);

  const handleExampleClick = (prompt: string) => {
    setInput(prompt);
    textareaRef.current?.focus();
  };
  
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-grow overflow-y-auto pr-2">
        {messages.length === 0 && <PromptExamples onExampleClick={handleExampleClick} />}
        {messages.map(msg => <Message key={msg.id} msg={msg} />)}
        <div ref={messagesEndRef} />
      </div>

      {showPromptBox && (
        <div className={`mt-4 animate-emerge animate-expandShadow`}>
          <div className="relative bg-bg-secondary rounded-2xl border border-border-color shadow-sm p-2 flex items-center gap-2">
             <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(input);
                  }
                }}
                placeholder="Start cooking your prompt..."
                className="flex-grow bg-transparent focus:outline-none resize-none p-2 text-text-primary placeholder-text-secondary opacity-0 animate-fadeIn-input max-h-40"
                style={{ animationFillMode: 'forwards' }}
                rows={1}
                disabled={isLoading}
             />
             <div className="flex self-end items-center gap-1 opacity-0 animate-fadeIn-buttons" style={{ animationFillMode: 'forwards' }}>
                 <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-text-secondary transition-colors" aria-label="Use Microphone">
                    <MicrophoneIcon />
                 </button>
                 <button 
                    onClick={() => handleSend(input)} 
                    disabled={isLoading || !input.trim()}
                    className="p-2 bg-accent rounded-full text-white hover:bg-accent-hover disabled:bg-accent/50 transition-colors"
                    aria-label="Send Message"
                  >
                    <MessageIcon />
                 </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
