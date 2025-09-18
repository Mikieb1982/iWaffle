import React, { useState } from 'react';

interface JsonDisplayProps {
  jsonObject: object;
  title: string;
}

const CopyIcon = () => (
    <svg xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);


const syntaxHighlight = (jsonString: string) => {
    jsonString = jsonString.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return jsonString.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'json-number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'json-key';
            } else {
                cls = 'json-string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'json-boolean';
        } else if (/null/.test(match)) {
            cls = 'json-null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}


export const JsonDisplay: React.FC<JsonDisplayProps> = ({ jsonObject, title }) => {
  const [copied, setCopied] = useState(false);
  
  const jsonString = JSON.stringify(jsonObject, null, 2);
  const highlightedJson = syntaxHighlight(jsonString);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="rounded-lg overflow-hidden my-4 border-2" style={{ borderColor: 'var(--color-border)' }}>
      <div className="px-4 py-2 flex justify-between items-center" style={{ backgroundColor: 'var(--color-heading)'}}>
        <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-on-heading)'}}>{title}</h3>
        <button
          onClick={handleCopy}
          className="text-xs font-semibold py-1 px-3 rounded-md transition-all flex items-center gap-1.5"
          style={{ 
            backgroundColor: copied ? '#4ade80' : 'rgba(255,255,255,0.2)', 
            color: copied ? 'var(--color-text-on-heading)' : 'white'
          }}
        >
          {copied ? <CheckIcon/> : <CopyIcon/>}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto" style={{ backgroundColor: 'var(--color-subtle-background)', color: 'var(--color-text-primary)'}}>
        <code dangerouslySetInnerHTML={{ __html: highlightedJson }} />
      </pre>
    </div>
  );
};