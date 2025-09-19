
export type Theme = 'light' | 'dark';

export interface ChatMessage {
  id: number | string;
  role: 'user' | 'model';
  content: string;
}

export interface PromptHistoryItem {
  id: string;
  prompt: string;
  timestamp: number;
}
