import { MovieDetails } from "@/lib/types/movie";
import { Card } from "../ui/card";
import { CardSection } from "../ui/card-section";
import { getImageUrl } from "@/lib/utils/format";
import Image from "next/image";

export const MovieInfo = ({ movie }: { movie: MovieDetails }) => {
  return (
    <section className="py-12 bg-muted-foreground/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Production Details">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90">{movie.status}</span>
            </div>

            <CardSection title="Budget">
              <p className="font-bold">{movie.budget.toLocaleString()}</p>
            </CardSection>

            <CardSection title="Revenue">
              <p className="font-bold">{movie.revenue.toLocaleString()}</p>
            </CardSection>

            <CardSection title="Original Language">
              <p className="font-medium">{movie.original_language.toUpperCase()}</p>
            </CardSection>
          </Card>

          <Card title="Production Companies">
            <div className="flex flex-col gap-2">
              <div className="space-y-3">
                {movie.production_companies.map((company) => (
                  <div className="flex items-center gap-3" key={company.id}>
                    <div className="relative h-8 w-16 shrink-0">
                      <Image
                        src={getImageUrl(company.logo_path) || "/placeholder.svg"}
                        alt={`${company.name} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm text-foreground">{company.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
