export interface PromptOutput {
  prompt: string;
  best_practices_summary: string;
  targetAI: 'Gemini AI' | 'ChatGPT-5';
  metadata: {
    date: string;
    description: string;
  };
}

export interface InterviewLogItem {
  question: string;
  answer: string;
}

export interface ComplexOutput {
  prompt: string;
  interview_log: InterviewLogItem[];
  targetAI: 'Gemini AI' | 'ChatGPT-5';
  metadata: {
    date: string;
    description: string;
  };
  best_practices_summary: string;
}

export interface ErrorOutput {
  error: true;
  message: string;
  suggestions: string[];
}

export type AppOutput = PromptOutput | ComplexOutput | ErrorOutput;
