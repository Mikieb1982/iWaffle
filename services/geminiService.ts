import { GoogleGenAI, Type } from "@google/genai";
import type { InterviewLogItem, PromptData, ErrorData } from '../types.ts';
import { translations } from '../i18n/index.ts';
import type { Locale } from '../i18n/index.ts';


if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable is not set. The application will not function without it.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const simplePromptSchema = {
    type: Type.OBJECT,
    properties: {
        final_prompt: { type: Type.STRING, description: "The final, detailed, and expertly crafted system prompt." },
        best_practices_summary: { type: Type.STRING, description: "A summary of the prompt engineering best practices applied." },
    },
    required: ["final_prompt", "best_practices_summary"]
};

const interviewSchema = {
    type: Type.OBJECT,
    properties: {
        next_question: { type: Type.STRING, description: "The single, most important clarifying question to ask the user." },
        final_prompt: { type: Type.STRING, description: "The final, detailed prompt. Only provide when the interview is complete." },
        best_practices_summary: { type: Type.STRING, description: "A summary of best practices. Only provide with the final prompt." }
    }
};

type GeneratePromptResult = { type: 'success', content: PromptData } | { type: 'error', content: ErrorData };

export const generatePrompt = async (userGoal: string, targetAI: string, language: Locale): Promise<GeneratePromptResult> => {
    try {
        const systemInstruction = `You are a world-class 'prompt chef' at iWaffle, an expert in crafting high-quality system prompts for large language models. Your task is to take a user's goal and immediately generate the most detailed and effective prompt possible, specifically optimized for ${targetAI}. Do not ask clarifying questions. Anticipate the user's needs. Your response must be a single JSON object conforming to the provided schema.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `User's Goal: "${userGoal}"`,
            config: { systemInstruction, responseMimeType: 'application/json', responseSchema: simplePromptSchema }
        });

        const result = JSON.parse(response.text);
        return { type: 'success', content: { prompt: result.final_prompt, best_practices_summary: result.best_practices_summary, targetAI, metadata: { date: new Date().toISOString(), description: userGoal } } };

    } catch (error) {
        console.error("Error in generatePrompt:", error);
        return { type: 'error', content: { error: true, message: translations[language].errorRecipe, suggestions: [translations[language].errorSuggestion1, translations[language].errorSuggestion2] } };
    }
};

type InterviewResult = { type: 'final', content: PromptData } | { type: 'question', question: string } | { type: 'error', content: ErrorData };

export const startOrContinueInterview = async (interviewLog: InterviewLogItem[], targetAI: string, language: Locale): Promise<InterviewResult> => {
    try {
        const systemInstruction = `You are a 'prompt chef' at iWaffle. Your goal is to help a user build a detailed prompt by conducting a brief, interactive interview (2-3 questions max). Analyze the user's initial goal and the conversation history. If you have enough information to create a stellar prompt for ${targetAI}, generate the 'final_prompt' and 'best_practices_summary'. Otherwise, ask the single most important 'next_question'. Your response must be a single JSON object.`;
        const history = interviewLog.map(item => `Q: ${item.question}\nA: ${item.answer}`).join('\n\n');
        const userGoal = interviewLog[0]?.answer || "N/A";

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `**Initial User Goal:**\n${userGoal}\n\n**Conversation History:**\n${history}\n\nBased on this, what is the next step?`,
            config: { systemInstruction, responseMimeType: 'application/json', responseSchema: interviewSchema }
        });

        const result = JSON.parse(response.text);

        if (result.final_prompt && result.best_practices_summary) {
            return { type: 'final', content: { prompt: result.final_prompt, best_practices_summary: result.best_practices_summary, targetAI, interview_log: interviewLog, metadata: { date: new Date().toISOString(), description: userGoal } } };
        } else if (result.next_question) {
            return { type: 'question', question: result.next_question };
        }
        throw new Error("Model returned an invalid interview response.");
    } catch (error) {
        console.error("Error in startOrContinueInterview:", error);
        return { type: 'error', content: { error: true, message: translations[language].errorConversation, suggestions: [translations[language].errorSuggestion3, translations[language].errorSuggestion4] } };
    }
};
