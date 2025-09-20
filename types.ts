export interface InterviewLogItem {
  question: string;
  answer: string;
}

export interface PromptData {
  prompt: string;
  best_practices_summary: string;
  targetAI: string;
  metadata: {
    date: string;
    description: string;
  };
  interview_log?: InterviewLogItem[];
}

export interface ErrorData {
    error: true;
    message: string;
    suggestions: string[];
}

export type AppMode = 'simple' | 'interview';

export interface StartConfig {
    mode: AppMode;
    targetAI: string;
}
