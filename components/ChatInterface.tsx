import React, { useState, useRef, useEffect } from 'react';
import { Loader } from './Loader';
import { SparklesIcon } from './icons/SparklesIcon';
import { MicrophoneIcon } from './icons/MicrophoneIcon';
import { UserIcon } from './icons/UserIcon';
import { Waveform } from './Waveform';
import type { InterviewLogItem } from '../types';

// Declare SpeechRecognition types for browsers that support it.
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const useTypewriter = (text: string, speed: number = 30) => {
    const [displayText, setDisplayText] = useState('');
    
    useEffect(() => {
        setDisplayText(''); // Reset on new text
        if (text) {
            let i = 0;
            const typingInterval = setInterval(() => {
                if (i < text.length) {
                    setDisplayText(prev => prev + text.charAt(i));
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, speed);
            return () => clearInterval(typingInterval);
        }
    }, [text, speed]);
    
    return displayText;
};

interface ChatInterfaceProps {
  isInterviewMode: boolean;
  currentQuestion: string;
  interviewLog: InterviewLogItem[];
  isLoading: boolean;
  onSubmit: (userAnswer: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  isInterviewMode,
  currentQuestion,
  interviewLog,
  isLoading,
  onSubmit,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState('');
  const recognitionRef = useRef<any>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const displayedQuestion = useTypewriter(currentQuestion);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech Recognition API not supported in this browser.");
      setMicError("Voice input not supported.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false; // Stop listening when user pauses.
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
           transcript += event.results[i][0].transcript;
        } else {
           setInputValue(event.results[i][0].transcript);
        }
      }
      setInputValue(prev => prev + transcript);
    };
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      let errorMessage;
      switch (event.error) {
        case 'not-allowed':
        case 'service-not-allowed':
          errorMessage = 'Microphone access denied.';
          break;
        case 'network':
          errorMessage = 'Network error.';
          break;
        case 'no-speech':
          errorMessage = "Didn't quite catch that.";
          break;
        case 'audio-capture':
          errorMessage = 'Microphone not found.';
          break;
        default:
          errorMessage = 'A listening error occurred.';
      }
      setMicError(errorMessage);
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const handleMicClick = () => {
    if (!recognitionRef.current || isLoading) {
      return;
    }
    setMicError(''); 

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setInputValue(''); 
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue('');
  };
  
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedQuestion, isLoading, interviewLog]);


  return (
    <div className="backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg border-2 h-full flex flex-col max-h-[60vh]" style={{ backgroundColor: 'var(--color-card-background)', borderColor: 'rgba(255,255,255,0.1)'}}>
      <div className="flex-1 overflow-y-auto pr-4 -mr-4 mb-4 space-y-6">
        
        {isInterviewMode && interviewLog.map((item, index) => (
          <React.Fragment key={index}>
            {/* Past AI Question */}
            <div className="flex items-start gap-3">
              <div className="bg-white p-2 rounded-full shadow-md">
                <SparklesIcon className="w-6 h-6" style={{ color: 'var(--color-butter-yellow)'}} />
              </div>
              <div className="rounded-lg p-3 max-w-xl shadow" style={{ backgroundColor: 'var(--color-butter-yellow)', color: 'var(--color-charcoal)'}}>
                <p>{item.question}</p>
              </div>
            </div>
            {/* Past User Answer */}
            <div className="flex items-start gap-3 justify-end">
              <div className="rounded-lg p-3 max-w-xl shadow" style={{ backgroundColor: 'var(--color-strawberry-pink)'}}>
                <p className="text-white">{item.answer}</p>
              </div>
               <div className="p-2 rounded-full shadow-md" style={{backgroundColor: 'var(--color-subtle-background)'}}>
                <UserIcon className="w-6 h-6" style={{ color: 'var(--color-text-secondary)'}} />
              </div>
            </div>
          </React.Fragment>
        ))}

        {/* Current AI Question */}
        {!isLoading && (
            <div className="flex items-start gap-3">
            <div className="bg-white p-2 rounded-full shadow-md">
                <SparklesIcon className="w-6 h-6" style={{ color: 'var(--color-butter-yellow)'}} />
            </div>
            <div className="rounded-lg p-3 max-w-xl shadow" style={{ backgroundColor: 'var(--color-butter-yellow)', color: 'var(--color-charcoal)'}}>
                <p>{displayedQuestion}<span className="typewriter-cursor"></span></p>
            </div>
            </div>
        )}

        {/* Loading Indicator */}
        {isLoading && (
        <div className="flex items-start gap-3">
            <div className="bg-white p-2 rounded-full shadow-md">
                <SparklesIcon className="w-6 h-6" style={{ color: 'var(--color-butter-yellow)'}} />
            </div>
            <div className="rounded-lg p-3 max-w-xl shadow" style={{ backgroundColor: 'var(--color-butter-yellow)'}}>
                <Loader />
            </div>
            </div>
        )}

        <div ref={endOfMessagesRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="mt-auto pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <div className="relative">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder={isLoading ? "Waiting for the chef..." : isListening ? "" : "Type your ingredients here..."}
            disabled={isLoading}
            className={`w-full p-3 pr-28 rounded-xl focus:ring-2 focus:ring-[--color-strawberry-pink] focus:outline-none resize-none shadow-inner border border-transparent focus:border-[--color-strawberry-pink] transition-all ${isListening ? 'pl-16' : ''}`}
            style={{ backgroundColor: 'var(--color-input-background)', color: 'var(--color-text-primary)' }}
            rows={2}
          />
          {isListening && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none w-12">
                <Waveform />
            </div>
           )}
          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            <div className="flex flex-col items-center">
              <div className="h-6 w-16 flex items-center justify-center">
                {/* This div is now a spacer */}
              </div>
              <button
                  type="button"
                  onClick={handleMicClick}
                  disabled={isLoading || !recognitionRef.current}
                  className={`p-2 rounded-lg transform transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ${
                    isListening 
                      ? 'bg-[--color-strawberry-pink] text-white' 
                      : 'bg-[var(--color-button-inactive-bg)] text-[var(--color-button-inactive-text)]'
                  }`}
                  aria-label={isListening ? 'Stop listening' : 'Start listening'}
                >
                  <MicrophoneIcon className="w-6 h-6" />
              </button>
              <div className="h-4 mt-1 text-center w-24">
                {micError ? (
                  <span className="text-xs text-red-500">{micError}</span>
                ) : isListening ? (
                  <span className="text-xs text-[--color-strawberry-pink]">Listening...</span>
                ) : null}
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 self-end"
              style={{ backgroundColor: 'var(--color-strawberry-pink)', color: 'white', height: '44px' }}
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};