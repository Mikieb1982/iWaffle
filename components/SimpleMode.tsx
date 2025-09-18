import React from 'react';
import type { PromptOutput } from '../types';
import { JsonDisplay } from './JsonDisplay';
import { CopyButton } from './CopyButton';

interface SimpleModeProps {
  data: PromptOutput;
}

export const SimpleMode: React.FC<SimpleModeProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-heading)'}}>Your Goal:</h3>
        <p className="p-3 rounded-lg border" style={{ backgroundColor: 'var(--color-subtle-background)', borderColor: 'var(--color-border)'}}>{data.metadata.description}</p>
      </div>

      <div className="text-sm text-center font-semibold p-2 rounded-lg border" style={{ backgroundColor: 'var(--color-subtle-background)', borderColor: 'var(--color-border)'}}>
        Prompt cooked for: <span className="font-bold" style={{color: 'var(--color-strawberry-pink)'}}>{data.targetAI}</span>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-heading)'}}>Chef's Notes (Best Practices):</h3>
        <p className="p-3 rounded-lg border" style={{ backgroundColor: 'var(--color-subtle-background)', borderColor: 'var(--color-border)'}}>{data.best_practices_summary}</p>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold" style={{ color: 'var(--color-heading)'}}>Your Freshly Made Prompt</h3>
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
