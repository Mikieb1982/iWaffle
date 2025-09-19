// services/geminiService.ts
import { GoogleGenAI, Type, Chat, GenerateContentResponse } from "@google/genai";

// fix: Per guidelines, API_KEY is assumed to be available from process.env. The key name is also updated to API_KEY.
// Initialize the GoogleGenAI client with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const textModel = 'gemini-2.5-flash';

let chatSession: Chat | null = null;

// Creates and retrieves a singleton chat session.
const getChatSession = () => {
    if (!chatSession) {
        chatSession = ai.chats.create({
            model: textModel,
        });
    }
    return chatSession;
}

/**
 * Sends a message to the Gemini model and streams the response.
 * @param message The user's message.
 * @returns An async generator that yields response chunks.
 */
export const streamChat = async function* (message: string) {
    try {
        const chat = getChatSession();
        // Use sendMessageStream for streaming responses.
        const result = await chat.sendMessageStream({ message });
        for await (const chunk of result) {
            // Yield the text from each chunk.
            yield chunk.text;
        }
    } catch (error) {
        console.error("Error streaming message from Gemini:", error);
        if (error instanceof Error) {
            yield `Error: ${error.message}`;
        } else {
            yield "An unknown error occurred while streaming.";
        }
    }
};

/**
 * Generates a JSON response from the Gemini model based on a prompt and a schema.
 * @param prompt The user's prompt.
 * @param schema The desired JSON schema for the response.
 * @returns A string containing the JSON response.
 */
export const generateJsonWithSchema = async (prompt: string, schema: any): Promise<string> => {
    try {
        // Use generateContent for a single, non-chat request.
        const response = await ai.models.generateContent({
            model: textModel,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema
            }
        });
        // Return the text part of the response, which will be a JSON string.
        return response.text;
    } catch (error) {
        console.error("Error generating JSON from Gemini:", error);
        if (error instanceof Error) {
            return JSON.stringify({ error: error.message });
        }
        return JSON.stringify({ error: "An unknown error occurred." });
    }
};

/**
 * Resets the current chat session.
 */
export const resetChatSession = () => {
    chatSession = null;
}