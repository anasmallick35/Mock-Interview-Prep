const { GoogleGenerativeAI } = require("@google/generative-ai");

const geminiKey = import.meta.env.VITE_GEMINI_API; 
const genAI = new GoogleGenerativeAI(geminiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

interface RequestBody {
    input: {
        question: string;
        userAnswer: string;
    };
}

interface FeedbackResponse {
    rating: number;
    feedback: string;
}

module.exports = async (req: { method: string; body: RequestBody }, res: { status: (code: number) => { json: (body: any) => void } }) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { question, userAnswer } = req.body.input;

    if (!question || !userAnswer) {
        return res.status(400).json({ error: "Question and user answer are required." });
    }

    const feedbackPrompt = `
        Question: ${question}, 
        User Answer: ${userAnswer}. 
        Please provide a rating (integer) and feedback (3-5 lines) in JSON format with "rating" and "feedback" fields.
    `;

    try {
        const result = await model.generateContent(feedbackPrompt);
        const responseText = result.response.text().trim();
        const cleanedJson = responseText.replace(/^```json|```$/g, "");
        const jsonFeedbackResp: FeedbackResponse = JSON.parse(cleanedJson);

        res.status(200).json(jsonFeedbackResp);
    } catch (error) {
        console.error("Gemini API error:", error);
        res.status(500).json({ error: "Failed to fetch feedback from Gemini." });
    }
};