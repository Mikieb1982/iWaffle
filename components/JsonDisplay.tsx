import React from 'react';
import { CopyButton } from './CopyButton';

interface JsonDisplayProps {
  jsonData: any;
}

export const JsonDisplay: React.FC<JsonDisplayProps> = ({ jsonData }) => {
  let jsonString: string;
  try {
    jsonString = JSON.stringify(jsonData, null, 2);
  } catch (e) {
    jsonString = "Invalid JSON object";
    if (typeof jsonData === 'string') {
        jsonString = jsonData;
    }
  }

  return (
    <div className="bg-[--color-background] rounded-md relative text-sm">
      <div className="absolute top-2 right-2">
        <CopyButton textToCopy={jsonString} />
      </div>
      <pre className="overflow-x-auto p-4">
        <code>{jsonString}</code>
      </pre>
    </div>
  );
};
