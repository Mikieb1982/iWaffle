import React from 'react';
import type { ErrorData } from '../types.ts';

interface ErrorDisplayProps {
    data: ErrorData;
    onReset: () => void;
}

const ErrorDisplay = ({ data, onReset }: ErrorDisplayProps) => (
  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md my-8 fade-in" role="alert">
    <p className="font-bold">{data.message}</p>
    <ul className="mt-2 list-disc list-inside">
      {data.suggestions.map((suggestion, index) => ( <li key={index}>{suggestion}</li> ))}
    </ul>
    <button onClick={onReset} className="mt-4 font-semibold py-2 px-4 rounded-lg bg-red-200 hover:bg-red-300 transition-colors">Try Again</button>
  </div>
);

export default ErrorDisplay;
