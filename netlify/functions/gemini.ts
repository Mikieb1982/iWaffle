import { GoogleGenAI, Type } from "@google/genai";
import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

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

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    if (!process.env.API_KEY) {
        console.error("API_KEY environment variable is not set.");
        return { statusCode: 500, body: JSON.stringify({ type: 'error', content: { error: true, message: "Server configuration error: API key not found." } }) };
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        const { mode, payload } = JSON.parse(event.body || '{}');
        if (!mode || !payload) {
            return { statusCode: 400, body: JSON.stringify({ type: 'error', content: { error: true, message: 'Invalid request: Missing mode or payload.' } }) };
        }

        if (mode === 'simple') {
            const { userGoal, targetAI } = payload;
            const systemInstruction = `You are a world-class 'prompt chef' at iWaffle, an expert in crafting high-quality system prompts for large language models. Your task is to take a user's goal and immediately generate the most detailed and effective prompt possible, specifically optimized for ${targetAI}. Do not ask clarifying questions. Anticipate the user's needs. Your response must be a single JSON object conforming to the provided schema.`;
    
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `User's Goal: "${userGoal}"`,
                config: { systemInstruction, responseMimeType: 'application/json', responseSchema: simplePromptSchema }
            });
    
            const result = JSON.parse(response.text);
            const content = { prompt: result.final_prompt, best_practices_summary: result.best_practices_summary, targetAI, metadata: { date: new Date().toISOString(), description: userGoal } };
            return { statusCode: 200, body: JSON.stringify({ type: 'success', content }) };
        }
        
        if (mode === 'interview') {
            const { interviewLog, targetAI } = payload;
            const systemInstruction = `You are a 'prompt chef' at iWaffle. Your goal is to help a user build a detailed prompt by conducting a brief, interactive interview (2-3 questions max). Analyze the user's initial goal and the conversation history. If you have enough information to create a stellar prompt for ${targetAI}, generate the 'final_prompt' and 'best_practices_summary'. Otherwise, ask the single most important 'next_question'. Your response must be a single JSON object.`;
            const history = interviewLog.map((item: {question: string; answer: string}) => `Q: ${item.question}\nA: ${item.answer}`).join('\n\n');
            const userGoal = interviewLog[0]?.answer || "N/A";
    
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `**Initial User Goal:**\n${userGoal}\n\n**Conversation History:**\n${history}\n\nBased on this, what is the next step?`,
                config: { systemInstruction, responseMimeType: 'application/json', responseSchema: interviewSchema }
            });
    
            const result = JSON.parse(response.text);
    
            if (result.final_prompt && result.best_practices_summary) {
                const content = { prompt: result.final_prompt, best_practices_summary: result.best_practices_summary, targetAI, interview_log: interviewLog, metadata: { date: new Date().toISOString(), description: userGoal } };
                return { statusCode: 200, body: JSON.stringify({ type: 'final', content }) };
            } else if (result.next_question) {
                return { statusCode: 200, body: JSON.stringify({ type: 'question', question: result.next_question }) };
            }
            throw new Error("Model returned an invalid interview response.");
        }

        return { statusCode: 400, body: JSON.stringify({ type: 'error', content: { error: true, message: `Unknown mode: ${mode}` } }) };

    } catch (error) {
        console.error("Error in Netlify function:", error);
        return { statusCode: 500, body: JSON.stringify({ type: 'error', content: { error: true, message: "The prompt chef had trouble with this recipe.", suggestions: ["Try rephrasing your goal.", "The server might be busy."] } }) };
    }
};

export { handler };
