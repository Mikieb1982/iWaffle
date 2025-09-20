import React from 'react';
import type { PromptData } from '../types.ts';
import TrashIcon from './icons/TrashIcon.tsx';
import ActionButton from './ActionButton.tsx';
import JsonDisplay from './JsonDisplay.tsx';

interface ResultCardProps {
    data: PromptData;
    onReset: () => void;
}

const ResultCard = ({ data, onReset }: ResultCardProps) => {
    const isComplex = 'interview_log' in data;
    return (
        <div className="fade-in space-y-6 p-4 sm:p-8 rounded-2xl shadow-lg border" style={{ backgroundColor: 'var(--color-card-background)', borderColor: 'var(--color-border)' }}>
            <div className="flex justify-between items-center pb-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--color-heading)' }}>Your Recipe is Ready!</h2>
                <button onClick={onReset} className="flex items-center gap-2 font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow hover:-translate-y-0.5 bg-[--color-subtle-background] hover:bg-[--color-border]">
                    <TrashIcon className="w-5 h-5"/> Cook Another
                </button>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-heading)'}}>{isComplex ? 'Initial Goal:' : 'Your Goal:'}</h3>
                    <p className="p-3 rounded-lg border" style={{ backgroundColor: 'var(--color-subtle-background)', borderColor: 'var(--color-border)'}}>{data.metadata.description}</p>
                </div>
                
                <div className="text-sm text-center font-semibold p-2 rounded-lg border" style={{ backgroundColor: 'var(--color-subtle-background)', borderColor: 'var(--color-border)'}}>
                    Prompt cooked for: <span className="font-bold" style={{color: 'var(--color-strawberry-pink)'}}>{data.targetAI}</span>
                </div>

                {isComplex && data.interview_log && (
                    <div>
                        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-heading)'}}>Your Conversation:</h3>
                        <div className="space-y-4 p-3 rounded-lg border max-h-48 overflow-y-auto" style={{ backgroundColor: 'var(--color-subtle-background)', borderColor: 'var(--color-border)'}}>
                            {data.interview_log.map((item, index) => (
                                <div key={index}>
                                    <p className="font-semibold" style={{ color: 'var(--color-heading)'}}>Q: {item.question}</p>
                                    <p className="ml-4 pl-2 border-l-2" style={{borderColor: 'var(--color-border)'}}>A: {item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-heading)'}}>Chef's Notes (Best Practices):</h3>
                    <p className="p-3 rounded-lg border" style={{ backgroundColor: 'var(--color-subtle-background)', borderColor: 'var(--color-border)'}}>{data.best_practices_summary}</p>
                </div>
                
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold" style={{ color: 'var(--color-heading)'}}>Your Custom-Cooked Prompt</h3>
                        <ActionButton textToCopy={data.prompt} dataToDownload={data} />
                    </div>
                    <JsonDisplay title="Prompt" jsonObject={{ prompt: data.prompt }} />
                </div>
            </div>
        </div>
    );
};

export default ResultCard;
