import { Searchbar } from "@/components/explore/searchbar";

export default function Explore() {
  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Searchbar />
        </div>
      </div>
    </section>
  );
}