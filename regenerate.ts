import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/genai";

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = process.env.VITE_GEMINI_API_KEY || "";

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  if (!API_KEY) {
    return new Response(JSON.stringify({ error: 'Server configuration error: Missing API Key.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.7,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
    response_mime_type: "application/json",
  };

  const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  ];

  try {
    const { section, prompt } = await req.json();

    const parts = [
      { text: `You are a web design assistant. Your task is to refine a specific JSON section of a website based on user instructions.
      
      Current Section JSON:
      ${JSON.stringify(section, null, 2)}

      User's instruction: "${prompt}"

      Your task is to return a new JSON object for this section that incorporates the user's instruction.
      - The 'id' and 'type' of the section must remain the same.
      - Only modify the 'content' object.
      - Ensure the output is a single, valid JSON object representing the updated section, and nothing else.` },
    ];

    const result = await model.generateContent({ contents: [{ role: "user", parts }], generationConfig, safetySettings });
    const jsonResponse = result.response.text();
    
    return new Response(jsonResponse, { headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error("Gemini API Error (regenerate):", error);
    return new Response(JSON.stringify({ error: 'Failed to regenerate section content.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}