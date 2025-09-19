// This service file centralizes data-fetching logic.

/**
 * Dummy stream for demonstration without a real API key.
 * In a real application, this would be replaced by the call to the Gemini API.
 */
export async function* streamMockResponse(prompt: string) {
    const response = `This is a simulated response for your prompt: "${prompt}". In a real application, this text would stream in from the Gemini API. The iWaffle interface is designed to be a cozy and creative playground for prompt engineering.`;
    const words = response.split(' ');
    for (const word of words) {
        await new Promise(resolve => setTimeout(resolve, 50));
        yield word + ' ';
    }
}


/*
// Example implementation for when a build system and API key are in place:
import { GoogleGenAI } from "@google/genai";

let ai;

const getAiClient = () => {
  if (!ai) {
    // IMPORTANT: In a real client-side app, the API key should be handled
    // securely, often by making requests to your own server backend that
    // then calls the Gemini API. Exposing API keys in the browser is risky.
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API_KEY environment variable not set");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export async function* streamChatResponse(prompt: string) {
  try {
    const aiClient = getAiClient();
    const model = 'gemini-2.5-flash';

    const stream = await aiClient.models.generateContentStream({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    for await (const chunk of stream) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error("Error streaming response from Gemini:", error);
    yield "Sorry, I ran into a waffle of a problem. Please try again.";
  }
}
*/
