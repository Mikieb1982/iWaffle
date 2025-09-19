import React from 'react';
import { CopyButton } from './CopyButton';

export const JsonDisplay = ({ jsonData }) => {
  const prettyJson = JSON.stringify(jsonData, null, 2);
  return (
    <div className="bg-code-bg text-code-text rounded-lg p-4 my-4 relative text-sm font-mono border border-border-color">
      <pre><code>{prettyJson}</code></pre>
      <div className="absolute top-2 right-2">
        <CopyButton textToCopy={prettyJson} />
      </div>
    </div>
  );
};
