import { GoogleGenAI, GenerateContentResponse, Chat, Type, Content } from "@google/genai";

// Fix: Initialize GoogleGenAI with a named apiKey parameter.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Fix: Use the recommended 'gemini-2.5-flash' model.
const textModel = 'gemini-2.5-flash';

export async function generateSimple(prompt: string): Promise<string> {
  try {
    // Fix: Use ai.models.generateContent instead of deprecated methods.
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: textModel,
      contents: prompt,
    });
    // Fix: Correctly access the text response using response.text.
    return response.text;
  } catch (error) {
    console.error("Error in generateSimple:", error);
    return "Sorry, I couldn't process your request. Please try again.";
  }
}

export async function generateWithSchema(prompt: string, schema: any): Promise<string> {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: textModel,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });
    
    // Fix: Correctly access the text response and trim potential markdown code fences.
    let jsonStr = response.text.trim();
    if (jsonStr.startsWith("```json")) {
        jsonStr = jsonStr.substring(7, jsonStr.length - 3).trim();
    } else if (jsonStr.startsWith("```")) {
        jsonStr = jsonStr.substring(3, jsonStr.length - 3).trim();
    }
    return jsonStr;
  } catch (error) {
    console.error("Error in generateWithSchema:", error);
    return JSON.stringify({ error: "Sorry, I couldn't process your request. The provided schema might be invalid." });
  }
}

// Fix: Use ai.chats.create for chat sessions.
export function createChat(history: Content[]): Chat {
    return ai.chats.create({
        model: textModel,
        history: history,
    });
}

export function getSampleJsonSchema() {
  return {
    type: Type.OBJECT,
    properties: {
      "recipes": {
        type: Type.ARRAY,
        description: "A list of recipes.",
        items: {
          type: Type.OBJECT,
          properties: {
            "recipeName": {
              type: Type.STRING,
              description: "The name of the recipe."
            },
            "ingredients": {
              type: Type.ARRAY,
              description: "The ingredients for the recipe.",
              items: {
                type: Type.STRING
              }
            },
            "steps": {
              type: Type.ARRAY,
              description: "The steps to prepare the recipe.",
              items: {
                type: Type.STRING
              }
            }
          },
          required: ["recipeName", "ingredients", "steps"]
        }
      }
    }
  };
}
