import React, { useState } from 'react';
import { generateSimple } from '../services/geminiService';
import Loader from './Loader';
import SparklesIcon from './icons/SparklesIcon';
import CopyButton from './CopyButton';
import PromptExamples from './PromptExamples';

const SimpleMode: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setResponse('');
    const result = await generateSimple(prompt);
    setResponse(result);
    setIsLoading(false);
  };
  
  const handlePromptExample = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Simple Mode</h2>
        <p className="text-gray-500 dark:text-gray-400">Enter a prompt to get a text response from Gemini.</p>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="prompt-simple" className="font-medium">Your Prompt</label>
        <textarea
          id="prompt-simple"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Explain quantum computing in simple terms"
          className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={4}
          disabled={isLoading}
        />
      </div>

      <PromptExamples onExampleClick={handlePromptExample} />

      <button
        onClick={handleSubmit}
        disabled={isLoading || !prompt.trim()}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        <SparklesIcon className="w-5 h-5 mr-2" />
        {isLoading ? 'Generating...' : 'Generate'}
      </button>

      {isLoading && (
        <div className="p-4 rounded-md bg-gray-50 dark:bg-gray-800 flex justify-center">
            <Loader />
        </div>
      )}

      {response && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Response</h3>
            <CopyButton textToCopy={response} />
          </div>
          <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-800 whitespace-pre-wrap">
            {response}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleMode;
