import { GoogleGenerativeAI } from "@google/generative-ai";

const geminKey = process.env.GEMINI_API_KEY;
if (!geminKey) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(geminKey);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

interface RequestBody {
  input: {
    jobTitle: string;
    topic: string;
  };
}

interface Question {
  question: string;
  answer: string;
}

interface InterviewResponse {
  questions: Question[];
}

export default async function handler(
  req: { method: string; body: RequestBody },
  res: { status: (code: number) => { json: (body: any) => void } }
) {
  console.log("Request received:", req.method, req.body); // Log the incoming request

  if (req.method !== "POST") {
    console.error("Method not allowed:", req.method); // Log the error
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { jobTitle, topic } = req.body.input;

  if (!jobTitle || !topic) {
    console.error("Missing jobTitle or topic:", { jobTitle, topic }); // Log the error
    return res.status(400).json({ message: "Job title and topic are required." });
  }

  const prompt = `Job position: ${jobTitle}, job responsibility: ${topic}. Depend on this information, give me 5 questions with answers in JSON format. Remember give only question and answer and not unnecessary text`;

  console.log("Prompt sent to Gemini:", prompt); // Log the prompt

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    console.log("Raw response from Gemini:", responseText); // Log the raw response

    const cleanedJson = responseText.replace(/^```json|```$/g, "");
    console.log("Cleaned JSON response:", cleanedJson); // Log the cleaned JSON

    const geminiQuestions: Question[] = JSON.parse(cleanedJson);
    console.log("Parsed questions:", geminiQuestions); // Log the parsed questions

    // Return the response in the correct format
    res.status(200).json({ questions: geminiQuestions });
  } catch (error) {
    console.error("Gemini API error:", error); // Log the error
    res.status(500).json({ message: "Failed to generate interview from Gemini." });
  }
}