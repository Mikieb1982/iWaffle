import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../types';
import { streamChat, resetChatSession } from '../services/geminiService';
import { ChatInterface } from './ChatInterface';

export const SimpleMode = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { id: uuidv4(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        const modelMessageId = uuidv4();
        // Add a placeholder for the model's response
        setMessages(prev => [...prev, { id: modelMessageId, text: '', sender: 'model', isTyping: true }]);
        
        try {
            let fullResponse = "";
            const stream = streamChat(currentInput);

            for await (const chunk of stream) {
                fullResponse += chunk;
                setMessages(prev => prev.map(msg => 
                    msg.id === modelMessageId ? { ...msg, text: fullResponse, isTyping: true } : msg
                ));
            }
            
            // Final update to remove typing indicator
            setMessages(prev => prev.map(msg => 
                msg.id === modelMessageId ? { ...msg, text: fullResponse, isTyping: false } : msg
            ));

        } catch (error) {
            console.error("Error in chat stream:", error);
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
            setMessages(prev => prev.map(msg => 
                msg.id === modelMessageId ? { ...msg, text: `Sorry, something went wrong: ${errorMessage}`, isTyping: false } : msg
            ));
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleReset = () => {
        resetChatSession();
        setMessages([]);
        setIsLoading(false);
    };

    return (
        <ChatInterface
            messages={messages}
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            handleReset={handleReset}
            isLoading={isLoading}
        />
    );
};
