import { Searchbar } from "@/components/explore/searchbar";
import { MovieSection } from "@/components/home/movie-section";
import { tmdbServices } from "@/lib/services/tmdb";
import { Metadata } from "next";
import { EmptyState } from "@/components/ui/empty-movies";
import { Pagination } from "@/components/ui/pagination";

export const metadata: Metadata = {
  title: "Explore Movies",
  description: "Search and filter thousands of movies. Find your next favorite film.",
}

interface ExploreMoviesParams {
  searchParams: {
    query?: string;
    page?: string;
    genre?: string;
    sort_by?: string;
    year?: string;
  }
}

async function MovieResults({
  query,
  genre,
  sort_by,
  year,
  page
}: {
  query?: string;
  genre?: string;
  sort_by?: string;
  year?: string;
  page: string;
}) {
  try {
    const currentPage = Number.parseInt(page || '1', 10);
    const data = query
      ? await tmdbServices.searchMovie(query, currentPage)
      : await tmdbServices.getExploreMovies({
        page: currentPage,
        genre: genre || '',
        sort_by: sort_by || 'popularity.desc',
        year: year || '',
      });
    if (data.results.length === 0) {
      return (
        <div className="container mx-auto px-4">
          <EmptyState
            title="No movies found"
            description="Try a different search or filter."
            actionLabel="Clear filters"
            actionHref="?"
          />
        </div>
      );
    } else {
      return (
        <>
          <MovieSection
            id="explore"
            movies={data.results}
            title="Explore"
            description={`Found ${data.total_results.toLocaleString() || 0} movies`}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={data.total_pages > 500 ? 500 : data.total_pages} // TMDB API limits to 500 pages
          />
        </>
      );
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

export default async function Explore({ searchParams }: ExploreMoviesParams) {
  const params = await searchParams;
  const { genre, year, sort_by, query, page } = params;

  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Searchbar />
        </div>
        <MovieResults
          page={page || '1'}
          genre={genre || ''}
          year={year || ''}
          sort_by={sort_by || ''}
          query={query || ''}
        />
      </div>
    </section>
  );
};
