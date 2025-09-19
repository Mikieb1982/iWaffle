import React, { useState } from 'react';
import { generateWithSchema, getSampleJsonSchema } from '../services/geminiService';
import Loader from './Loader';
import JsonDisplay from './JsonDisplay';
import SparklesIcon from './icons/SparklesIcon';

const ComplexMode: React.FC = () => {
  const [prompt, setPrompt] = useState('List two popular cookie recipes, and include the ingredients and steps.');
  const [schema, setSchema] = useState(JSON.stringify(getSampleJsonSchema(), null, 2));
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUseSampleSchema = () => {
    setSchema(JSON.stringify(getSampleJsonSchema(), null, 2));
    setError('');
  };

  const handleSubmit = async () => {
    if (!prompt.trim() || !schema.trim() || isLoading) return;

    let parsedSchema;
    try {
      parsedSchema = JSON.parse(schema);
      setError('');
    } catch (e) {
      setError('Invalid JSON schema.');
      return;
    }

    setIsLoading(true);
    setResponse('');
    const result = await generateWithSchema(prompt, parsedSchema);
    setResponse(result);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">JSON Output Mode</h2>
        <p className="text-gray-500 dark:text-gray-400">Provide a prompt and a JSON schema for a structured response.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="prompt-complex" className="font-medium">Your Prompt</label>
          <textarea
            id="prompt-complex"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., List a few popular cookie recipes..."
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            rows={6}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="schema" className="font-medium">Response JSON Schema</label>
            <button onClick={handleUseSampleSchema} className="text-sm text-blue-600 hover:underline">
              Use Sample
            </button>
          </div>
          <textarea
            id="schema"
            value={schema}
            onChange={(e) => setSchema(e.target.value)}
            placeholder="Enter your JSON schema here"
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            rows={16}
            disabled={isLoading}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={isLoading || !prompt.trim() || !schema.trim()}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        <SparklesIcon className="w-5 h-5 mr-2" />
        {isLoading ? 'Generating...' : 'Generate JSON'}
      </button>

      {isLoading && (
        <div className="p-4 rounded-md bg-gray-50 dark:bg-gray-800 flex justify-center">
            <Loader />
        </div>
      )}

      {response && (
        <div className="space-y-2">
          <h3 className="font-medium">Response JSON</h3>
          <JsonDisplay jsonData={response} />
        </div>
      )}
    </div>
  );
};

export default ComplexMode;
