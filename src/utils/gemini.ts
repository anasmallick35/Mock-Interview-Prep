
  import  {
    GoogleGenerativeAI,
  } from "@google/generative-ai";
  
  const genAI = new GoogleGenerativeAI('AIzaSyDy4FRHac5CAhZBRt2G5JVx64Oet2AQ3hE');
  
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
  