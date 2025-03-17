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
  res: { status: (code: number) => { json: (body: InterviewResponse) => void } }
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ questions: [] });
  }

  const { jobTitle, topic } = req.body.input;

  console.log("Received request body:", req.body);
  console.log("Extracted jobTitle:", jobTitle);
  console.log("Extracted topic:", topic);

  if (!jobTitle || !topic) {
    return res.status(400).json({ questions: [] });
  }

  const prompt = `Job position: ${jobTitle}, job responsibility: ${topic}. Depend on this information, give me 5 questions with answers in JSON format. Remember give only question and answer and not unnecessary text`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    const cleanedJson = responseText.replace(/^```json|```$/g, "");

    const geminiQuestions: Question[] = JSON.parse(cleanedJson);

    const response: InterviewResponse = { questions: geminiQuestions };
    res.status(200).json(response);
  } catch (error) {
    console.error("Error generating questions:", error);
    res.status(500).json({ questions: [] });
  }
}