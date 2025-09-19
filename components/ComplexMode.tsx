import React, { useState } from 'react';
import { generateJsonWithSchema } from '../services/geminiService';
import { JsonDisplay } from './JsonDisplay';
import { Loader } from './Loader';
import { Type } from '@google/genai';

const defaultSchema = {
    type: Type.OBJECT,
    properties: {
      "recipeName": { "type": Type.STRING, "description": "The name of the cookie recipe." },
      "prepTime": { "type": Type.STRING, "description": "Preparation time, e.g., '20 minutes'." },
      "ingredients": {
        "type": Type.ARRAY,
        "items": { "type": Type.STRING },
        "description": "A list of ingredients for the recipe."
      }
    }
  };

export const ComplexMode = () => {
    const [prompt, setPrompt] = useState('Give me a classic chocolate chip cookie recipe.');
    const [schema, setSchema] = useState(JSON.stringify(defaultSchema, null, 2));
    const [result, setResult] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const parsedSchema = JSON.parse(schema);
            const jsonResponse = await generateJsonWithSchema(prompt, parsedSchema);
            const parsedResult = JSON.parse(jsonResponse);
            if (parsedResult.error) {
              setError(parsedResult.error);
            } else {
              setResult(parsedResult);
            }
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
            setError(`Error: ${errorMessage}. Check if your schema is valid JSON.`);
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="flex flex-col h-full">
            <header className="p-4 border-b border-[--color-border] bg-[--color-foreground] rounded-t-xl">
                <h1 className="text-xl font-semibold">Structured Mode</h1>
            </header>
            <div className="flex-grow p-4 overflow-y-auto bg-[--color-foreground] rounded-b-xl border border-t-0 border-[--color-border]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
                    <div className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="prompt" className="block text-sm font-medium mb-1 text-[--color-text-secondary]">Prompt</label>
                            <textarea
                                id="prompt"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="w-full p-2 border rounded-lg bg-[--color-input-background] border-[--color-border] focus:ring-2 focus:ring-[--color-button-primary] focus:outline-none transition"
                                rows={4}
                            />
                        </div>
                        <div>
                            <label htmlFor="schema" className="block text-sm font-medium mb-1 text-[--color-text-secondary]">Response Schema (JSON)</label>
                            <textarea
                                id="schema"
                                value={schema}
                                onChange={(e) => setSchema(e.target.value)}
                                className="w-full p-2 border rounded-lg font-mono text-sm bg-[--color-input-background] border-[--color-border] focus:ring-2 focus:ring-[--color-button-primary] focus:outline-none transition"
                                rows={10}
                            />
                        </div>
                        <button onClick={handleGenerate} disabled={isLoading} className="px-4 py-2 text-white bg-[--color-button-primary] rounded-lg hover:bg-[--color-button-primary-hover] disabled:bg-opacity-50 disabled:cursor-not-allowed h-10 flex items-center justify-center font-semibold transition-colors">
                            {isLoading ? <Loader isLight={true} /> : 'Generate JSON'}
                        </button>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-medium mb-2">Result</h2>
                        <div className="flex-grow p-4 border rounded-lg bg-[--color-subtle-background] border-[--color-border] h-full min-h-[200px]">
                            {isLoading && <div className="flex justify-center items-center h-full"><Loader /></div>}
                            {error && <div className="text-red-500 whitespace-pre-wrap">{error}</div>}
                            {result && <JsonDisplay jsonData={result} />}
                            {!isLoading && !error && !result && <div className="text-[--color-text-secondary]">JSON output will appear here.</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
