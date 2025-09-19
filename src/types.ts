import { Part } from "@google/genai";

export type Message = {
  role: 'user' | 'model';
  parts: Part[];
};

export type ChatEntry = {
  role: 'user' | 'model';
  text: string;
};

export type GenerationMode = 'simple' | 'complex' | 'chat';
