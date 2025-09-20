import React from 'react';

interface JsonDisplayProps {
    jsonObject: object;
    title: string;
}

const JsonDisplay = ({ jsonObject, title }: JsonDisplayProps) => {
  const jsonString = JSON.stringify(jsonObject, null, 2);

  const syntaxHighlight = (json: string) => {
      json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
          let cls = 'json-number';
          if (/^"/.test(match)) { cls = /:$/.test(match) ? 'json-key' : 'json-string'; }
          else if (/true|false/.test(match)) { cls = 'json-boolean'; }
          else if (/null/.test(match)) { cls = 'json-null'; }
          return '<span class="' + cls + '">' + match + '</span>';
      });
  }
  return (
    <div className="rounded-lg overflow-hidden my-4 border-2" style={{ borderColor: 'var(--color-border)' }}>
      <div className="px-4 py-2" style={{ backgroundColor: 'var(--color-subtle-background)'}}>
        <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-secondary)'}}>{title}</h3>
      </div>
      <pre className="p-4 text-sm overflow-x-auto" style={{ backgroundColor: 'var(--color-input-background)', color: 'var(--color-text-primary)'}}>
        <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(jsonString) }} />
      </pre>
    </div>
  );
};

export default JsonDisplay;
