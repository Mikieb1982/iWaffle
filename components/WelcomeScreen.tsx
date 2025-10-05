import React, { useState } from 'react';
import type { AppMode, StartConfig } from '../types.ts';
import SparklesIcon from './icons/SparklesIcon.tsx';
import MessageIcon from './icons/MessageIcon.tsx';
import { useTranslations } from '../hooks/useTranslations.tsx';

interface WelcomeScreenProps {
    onStart: (config: StartConfig) => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
    const { t } = useTranslations();
    const [mode, setMode] = useState<AppMode | null>(null);
    const [targetAI, setTargetAI] = useState('Gemini AI');

    interface ModeCardProps {
        title: string;
        description: string;
        icon: React.ReactNode;
        value: AppMode;
    }

    const ModeCard = ({ title, description, icon, value }: ModeCardProps) => (
        <button onClick={() => setMode(value)} className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 w-full hover:shadow-xl hover:-translate-y-1 ${mode === value ? 'border-[--color-strawberry-pink] shadow-lg' : 'border-[--color-border]'}`} style={{ backgroundColor: 'var(--color-subtle-background)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--color-strawberry-pink)' }}>{icon}</div>
            <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--color-heading)' }}>{title}</h3>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{description}</p>
        </button>
    );

    return (
        <div className="text-center max-w-3xl mx-auto py-12 px-4 fade-in">
            <h1 className="text-5xl md:text-6xl mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-heading)' }}>iWaffle</h1>
            <p className="text-lg mb-10" style={{ color: 'var(--color-text-secondary)' }}>{t('tagline')}</p>
            
            <div className="p-6 rounded-2xl shadow-lg border space-y-8" style={{ backgroundColor: 'var(--color-card-background)', borderColor: 'var(--color-border)' }}>
                <div>
                    <h2 className="text-xl font-bold mb-4 text-left" style={{ color: 'var(--color-heading)'}}>{t('chooseRecipe')}</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <ModeCard title={t('quickBakeTitle')} description={t('quickBakeDescription')} icon={<SparklesIcon className="w-6 h-6 text-white"/>} value="simple"/>
                        <ModeCard title={t('guidedRecipeTitle')} description={t('guidedRecipeDescription')} icon={<MessageIcon className="w-6 h-6 text-white"/>} value="interview"/>
                    </div>
                </div>
                
                <div>
                     <h2 className="text-xl font-bold mb-4 text-left" style={{ color: 'var(--color-heading)'}}>{t('optimizeFor')}</h2>
                     <div className="flex bg-[--color-subtle-background] rounded-lg p-1 border" style={{ borderColor: 'var(--color-border)' }}>
                        <button onClick={() => setTargetAI('Gemini AI')} className={`w-1/2 p-2 rounded-md text-sm font-semibold transition-colors ${targetAI === 'Gemini AI' ? 'bg-[--color-butter-yellow] text-black shadow' : 'hover:bg-[--color-input-background]'}`}>Gemini AI</button>
                        <button onClick={() => setTargetAI('ChatGPT-5')} className={`w-1/2 p-2 rounded-md text-sm font-semibold transition-colors ${targetAI === 'ChatGPT-5' ? 'bg-[--color-butter-yellow] text-black shadow' : 'hover:bg-[--color-input-background]'}`}>ChatGPT-5</button>
                     </div>
                </div>

                <button onClick={() => onStart({ mode, targetAI } as StartConfig)} disabled={!mode} className="w-full font-bold text-lg py-4 px-8 rounded-lg transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 bg-[--color-strawberry-pink] text-white">
                    {t('startCooking')}
                </button>
            </div>
        </div>
    );
};

export default WelcomeScreen;
