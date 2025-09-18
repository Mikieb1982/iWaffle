import React from 'react';
import type { ComplexOutput } from '../types';
import { JsonDisplay } from './JsonDisplay';
import { CopyButton } from './CopyButton';

interface ComplexModeProps {
  data: ComplexOutput;
}

export const ComplexMode: React.FC<ComplexModeProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-heading)'}}>Initial Goal:</h3>
        <p className="p-3 rounded-lg border" style={{ backgroundColor: 'var(--color-subtle-background)', borderColor: 'var(--color-border)'}}>{data.metadata.description}</p>
      </div>

      <div className="text-sm text-center font-semibold p-2 rounded-lg border" style={{ backgroundColor: 'var(--color-subtle-background)', borderColor: 'var(--color-border)'}}>
        Prompt cooked for: <span className="font-bold" style={{color: 'var(--color-strawberry-pink)'}}>{data.targetAI}</span>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-heading)'}}>Your Conversation:</h3>
        <div className="space-y-4 p-3 rounded-lg border max-h-60 overflow-y-auto" style={{ backgroundColor: 'var(--color-subtle-background)', borderColor: 'var(--color-border)'}}>
          {data.interview_log.map((item, index) => (
            <div key={index}>
              <p className="font-semibold" style={{ color: 'var(--color-heading)'}}>Q: {item.question}</p>
              <p className="ml-4" style={{ color: 'var(--color-text-primary)'}}>A: {item.answer}</p>
            </div>
          ))}
        </div>
      </div>

       <div>
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-heading)'}}>Chef's Notes (Best Practices):</h3>
        <p className="p-3 rounded-lg border" style={{ backgroundColor: 'var(--color-subtle-background)', borderColor: 'var(--color-border)'}}>{data.best_practices_summary}</p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold" style={{ color: 'var(--color-heading)'}}>Your Custom-Cooked Prompt</h3>
            <CopyButton textToCopy={data.prompt} />
        </div>
        <JsonDisplay 
          title="Prompt"
          jsonObject={{ prompt: data.prompt }}
        />
      </div>
    </div>
  );
};
