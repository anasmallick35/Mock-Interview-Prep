import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiKey = process.env.GEMINI_API_KEY;
if (!geminiKey) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(geminiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

interface RequestBody {
  input: {
    input: {
      question: string;
      userAnswer: string;
    };
  };
}

interface FeedbackResponse {
  rating: number;
  feedback: string;
}

export default async function handler(
  req: { method: string; body: RequestBody },
  res: { status: (code: number) => { json: (body: any) => void } }
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { question, userAnswer } = req.body.input.input;

  console.log("Received request body:", req.body);
  console.log("Extracted question:", question);
  console.log("Extracted userAnswer:", userAnswer);

  if (!question ) {
    return res.status(400).json({ message: "Question is missing" });
  }

  const feedbackPrompt = `
    Question: ${question}, 
    User Answer: ${userAnswer}. 
    Please provide a rating out of 5 (integer) and feedback (2-3 lines) in JSON format with "rating" and "feedback" fields.
  `;

  try {
    const result = await model.generateContent(feedbackPrompt);
    const responseText = result.response.text().trim();

   
    const cleanedJson = responseText.replace(/^```json|```$/g, "").trim();

    const jsonFeedbackResp: FeedbackResponse = JSON.parse(cleanedJson);


    res.status(200).json(jsonFeedbackResp);
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ message: "Failed to fetch feedback from Gemini." });
  }
}
