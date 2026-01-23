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

export const getMovieRecommendations = async (favoriteMovies: string[]) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a movie recommendation expert. Based on the list of favorite movies provided by the user, suggest 5 similar movies that they might like. 
        Return ONLY a JSON array of strings, where each string is the exact title of a recommended movie. 
        Do not include the movies from the user's list.
        Example response: ["Inception", "The Dark Knight", "Interstellar"]`,
      },
      {
        role: "user",
        content: `My favorite movies are: ${favoriteMovies.join(", ")}`,
      },
    ],
    response_format: { type: "json_object" },
  });

  try {
    const content = response.choices[0].message.content;
    if (!content) return [];
    const result = JSON.parse(content);
    return result.movies || result.recommendations || Object.values(result)[0] || [];
  } catch (error) {
    console.error("Error parsing OpenAI response:", error);
    return [];
  }
};
