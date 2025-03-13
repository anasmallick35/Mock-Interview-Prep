import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiKey = import.meta.env.VITE_GEMINI_API;
const genAI = new GoogleGenerativeAI(geminiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig,
});
