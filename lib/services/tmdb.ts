import { MoviesResponse } from "../types/movie";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

interface FetchOptions {
  cache?: RequestCache;
  next?: {
    revalidate?: number;
    tags?: string[];
  };
}

async function tmdbFetch<T>(endpoint: string, options: FetchOptions = {}) {
  const url = `${TMDB_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_API_KEY}`,
      "Content-Type": "application/json",
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const tmdbServices = {
  async getPopularMovies(page = 1) {
    return tmdbFetch<MoviesResponse>(`/movie/popular?page=${page}`,
      {
        next: {
          revalidate: 3600,
          tags: ['popular-movies']
        },
      });
  },

  async getUpcomingMovies(page = 1) {
    return tmdbFetch<MoviesResponse>(`/movie/upcoming?page=${page}`,
      {
        next: {
          revalidate: 3600,
          tags: ['upcoming-movies']
        },
      }
    )
  },

  async getTopRatedMovies(page = 1) {
    return tmdbFetch<MoviesResponse>(`/movie/top_rated?page=${page}`,
      {
        next: {
          revalidate: 3600,
          tags: ['top-rated-movies']
        },
      });
  },

  async getNowPlayingMovies(page = 1) {
    return tmdbFetch<MoviesResponse>(`/movie/now_playing?page=${page}`,
      {
        next: {
          revalidate: 3600,
          tags: ['now-playing-movies']
        },
      });
  },
}