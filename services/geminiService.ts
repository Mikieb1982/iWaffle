import { GoogleGenAI, Type } from "@google/genai";
import type { PromptOutput, ErrorOutput, ComplexOutput, InterviewLogItem } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const simplePromptSchema = {
    type: Type.OBJECT,
    properties: {
        final_prompt: {
            type: Type.STRING,
            description: "The final, detailed, and expertly crafted system prompt. This prompt should be comprehensive and ready to use."
        },
        best_practices_summary: {
            type: Type.STRING,
            description: "A summary of the prompt engineering best practices applied to create the final prompt. Explain why the prompt is structured the way it is."
        },
    },
    required: ["final_prompt", "best_practices_summary"]
};

const interviewSchema = {
    type: Type.OBJECT,
    properties: {
        next_question: {
            type: Type.STRING,
            description: "The single, most important clarifying question to ask the user to better understand their goal. If enough information has been gathered to create a high-quality prompt, this field should be omitted."
        },
        final_prompt: {
            type: Type.STRING,
            description: "The final, detailed prompt. This should only be provided when the interview is complete."
        },
        best_practices_summary: {
            type: Type.STRING,
            description: "A summary of the prompt engineering best practices applied. This should only be provided when the final prompt is generated."
        }
    }
};


export type GeneratePromptResponse = 
    | { type: 'success', content: PromptOutput }
    | { type: 'error', content: ErrorOutput };

export const generatePrompt = async (userGoal: string, targetAI: 'Gemini AI' | 'ChatGPT-5'): Promise<GeneratePromptResponse> => {
    try {
        const systemInstruction = `You are a world-class 'prompt chef' at iWaffle, an expert in crafting high-quality system prompts for large language models. Your task is to take a user's goal and immediately generate the most detailed and effective prompt possible, specifically optimized for ${targetAI}. Do not ask clarifying questions. Instead, anticipate the user's needs and build a comprehensive prompt that includes structure, constraints, examples, and any other relevant best practices. After creating the prompt, provide a summary of the techniques you used. Your response must be a single JSON object conforming to the provided schema.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `User's Goal: "${userGoal}"`,
            config: {
                systemInstruction,
                responseMimeType: 'application/json',
                responseSchema: simplePromptSchema,
            }
        });

        const result = JSON.parse(response.text);

        if (result.final_prompt && result.best_practices_summary) {
            const finalOutput: PromptOutput = {
                prompt: result.final_prompt,
                best_practices_summary: result.best_practices_summary,
                targetAI: targetAI,
                metadata: {
                    date: new Date().toISOString(),
                    description: userGoal
                }
            };
            return { type: 'success', content: finalOutput };
        }
        
        throw new Error("Model returned an invalid or incomplete response structure.");

    } catch (error) {
        console.error("Error in generatePrompt:", error);
        const errorOutput: ErrorOutput = {
            error: true,
            message: "The prompt chef had trouble with this recipe. The model's response may have been invalid.",
            suggestions: ["Try rephrasing your goal to be more specific.", "Ensure your goal is clearly stated in one or two sentences."]
        };
        return { type: 'error', content: errorOutput };
    }
};

export type InterviewResponse =
    | { type: 'question', question: string }
    | { type: 'final', content: ComplexOutput }
    | { type: 'error', content: ErrorOutput };

export const startOrContinueInterview = async (
    interviewLog: InterviewLogItem[],
    targetAI: 'Gemini AI' | 'ChatGPT-5'
): Promise<InterviewResponse> => {
    try {
        const systemInstruction = `You are a 'prompt chef' at iWaffle. Your goal is to help a user build a detailed prompt by conducting a brief, interactive interview (2-3 questions max). Analyze the user's initial goal and the conversation history. If you have enough information to create a stellar prompt for ${targetAI}, generate the 'final_prompt' and 'best_practices_summary'. Otherwise, ask the single most important 'next_question' to clarify their needs. Never generate both a question and a final prompt. Your response must be a single JSON object.`;

        const history = interviewLog.map(item => `Q: ${item.question}\nA: ${item.answer}`).join('\n\n');
        const userGoal = interviewLog.length > 0 ? interviewLog[0].answer : "The user hasn't stated their goal yet.";

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `**Initial User Goal:**\n${userGoal}\n\n**Conversation History:**\n${history}\n\nBased on this, what is the next step?`,
            config: {
                systemInstruction,
                responseMimeType: 'application/json',
                responseSchema: interviewSchema,
            }
        });

        const result = JSON.parse(response.text);

        if (result.final_prompt && result.best_practices_summary) {
            const finalOutput: ComplexOutput = {
                prompt: result.final_prompt,
                best_practices_summary: result.best_practices_summary,
                targetAI: targetAI,
                interview_log: interviewLog,
                metadata: {
                    date: new Date().toISOString(),
                    description: userGoal
                }
            };
            return { type: 'final', content: finalOutput };
        } else if (result.next_question) {
            return { type: 'question', question: result.next_question };
        }

        throw new Error("Model returned an invalid or incomplete interview response.");

    } catch (error) {
        console.error("Error in startOrContinueInterview:", error);
        return {
            type: 'error',
            content: {
                error: true,
                message: "The prompt chef got confused during the conversation.",
                suggestions: ["Try rephrasing your last answer.", "Consider restarting if the issue persists."]
            }
        };
    }
};
