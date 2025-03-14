import { GoogleGenerativeAI } from "@google/generative-ai";

const geminKey = process.env.GEMINI_API_KEY;
if(!geminKey){
    throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(geminKey);
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

interface RequestBody{
    input : {
        jobTitle: string,
        topic: string
    }
}

interface InterviewResponse {
    questions: string;
}


export default async function handler(req:{method:string; body: RequestBody}, res: {status:(code:number) => {json: (body:any) => void}}){
    if(req.method !== "POST"){
        return res.status(405).json({message:"Method not allowed"});
    }

    const {jobTitle , topic} = req.body.input;

    const prompt = `Job position: ${jobTitle}, job responsibility: ${topic}. Depend on this information, give me 5 questions with answers in JSON format. Remember give only question and answer and not unnecessary text`;
    try{
        const result = await model.generateContent(prompt);
          const responseText = result.response.text().trim();
          const cleanedJson = responseText.replace(/^```json|```$/g, "");
          const geminiQuestions: InterviewResponse = JSON.parse(cleanedJson);

          res.status(200).json(geminiQuestions);
    }catch(error){
        console.error("Gemini API error:", error);
    res.status(500).json({ message: "Failed to generate interview from Gemini." });
    } 
}