import { tmdbServices } from "@/lib/services/tmdb";

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await tmdbServices.getMovieById(Number(id));

  return (
    <div>
      <h1>{data.title}</h1>
    </div>
  );
};
