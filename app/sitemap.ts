import { MetadataRoute } from "next";
import { tmdbServices } from "@/lib/services/tmdb";

type MoviesUrl = MetadataRoute.Sitemap[number];

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://cine-explorer-six.vercel.app/";

  const popularMovies = await tmdbServices.getPopularMovies();
  const upcomingMovies = await tmdbServices.getUpcomingMovies();
  const topRatedMovies = await tmdbServices.getTopRatedMovies();
  const nowPlayingMovies = await tmdbServices.getNowPlayingMovies();

  const allMovies = [...popularMovies.results, ...upcomingMovies.results, ...topRatedMovies.results, ...nowPlayingMovies.results];
  const uniqueMovies = Array.from(new Map(allMovies.map(movie => [movie.id, movie])).values()).slice(0, 50);

  const moviesUrl: MoviesUrl[] = uniqueMovies.map(movie => ({
    url: `${baseUrl}/movie/${movie.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: "/",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "/explore",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    ...moviesUrl,
  ];
}