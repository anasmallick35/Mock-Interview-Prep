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

  const { jobTitle, topic } = req.body.input;
  const prompt = `Job position: ${jobTitle}, job responsibility: ${topic}. Depend on this information, give me 5 questions with answers in JSON format. Remember give only question and answer and not unnecessary text`;

  console.log(req.body.input);
    if(!jobTitle || !topic){
        return;
    }
  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    const cleanedJson = responseText.replace(/^```json|```$/g, "");


    const geminiQuestions: Question[] = JSON.parse(cleanedJson);
    
    const response: InterviewResponse = { questions: geminiQuestions };
    res.status(200).json(response);
  } catch (error) {
    console.error(error)
  }
}