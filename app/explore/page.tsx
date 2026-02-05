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

type ExploreProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
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
  }

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
        totalPages={data.total_pages > 500 ? 500 : data.total_pages}
      />
    </>
  );
}

export default async function Explore(props: ExploreProps) {
  const searchParams = await props.searchParams;
  const { genre, year, sort_by, query, page } = searchParams;

  const genreStr = typeof genre === 'string' ? genre : undefined;
  const yearStr = typeof year === 'string' ? year : undefined;
  const sortByStr = typeof sort_by === 'string' ? sort_by : undefined;
  const queryStr = typeof query === 'string' ? query : undefined;
  const pageStr = typeof page === 'string' ? page : '1';

  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Searchbar />
        </div>
        <MovieResults
          page={pageStr}
          genre={genreStr}
          year={yearStr}
          sort_by={sortByStr}
          query={queryStr}
        />
      </div>
    </section>
  );
};
