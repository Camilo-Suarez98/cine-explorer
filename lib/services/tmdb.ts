import { Genre, MovieDetails, MoviesResponse } from "../types/movie";

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

  async getMovieById(id: number) {
    return tmdbFetch<MovieDetails>(`/movie/${id}`,
      {
        next: {
          revalidate: 86400,
          tags: [`movie-${id}`]
        },
      });
  },

  async searchMovie(query: string, page = 1) {
    return tmdbFetch<MoviesResponse>(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
      {
        next: {
          revalidate: 3600,
          tags: ['search-movies']
        },
      });
  },

  async getExploreMovies(
    params: {
      page?: number,
      genre?: string,
      sort_by?: string,
      year?: string
    }
  ) {
    const { page = 1, genre, sort_by = 'popularity.desc', year } = params;
    let endpoint = `/discover/movie?page=${page}&sort_by=${sort_by}`;
    if (genre) {
      endpoint += `&with_genres=${genre}`;
    }
    if (year) {
      endpoint += `&primary_release_year=${year}`;
    }
    return tmdbFetch<MoviesResponse>(endpoint,
      {
        cache: 'no-store'
      });
  },

  async getGenres() {
    return tmdbFetch<Genre[]>(`/genre/movie/list`,
      {
        next: {
          revalidate: 604800,
          tags: ['genres']
        },
      });
  },
}