import React from 'react';
import CopyButton from './CopyButton';

interface JsonDisplayProps {
  jsonData: string;
}

const JsonDisplay: React.FC<JsonDisplayProps> = ({ jsonData }) => {
  let parsedJson;
  let isError = false;
  try {
    parsedJson = JSON.parse(jsonData);
  } catch (e) {
    isError = true;
  }

  return (
    <div className="relative p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
        <div className="absolute top-2 right-2">
            <CopyButton textToCopy={jsonData} />
        </div>
        <pre className="whitespace-pre-wrap break-all text-sm">
            {isError ? jsonData : JSON.stringify(parsedJson, null, 2)}
        </pre>
    </div>
  );
};

export default JsonDisplay;
