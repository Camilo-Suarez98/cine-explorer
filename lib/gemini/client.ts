import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const searchMovieByUserDescription = async (description: string) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const result = await model.generateContent(`You are a movie search assistant. Search for a movie based on the description provided. Return only the movie title. Description: ${description}`);

  return result.response.text();
};
