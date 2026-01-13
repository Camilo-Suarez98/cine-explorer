import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const searchMovieByUserDescription = async (description: string) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a movie search assistant. Search for a movie based on the description provided. Return only the movie title.",
      },
      {
        role: "user",
        content: description,
      },
    ],
  });

  return response.choices[0].message.content;
};
