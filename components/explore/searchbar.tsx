import { Search } from "lucide-react";

export const Searchbar = () => {
  return (
    <div className="relative">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        size={16}
      />
      <input
        type="text"
        placeholder="Search for movies"
        className="pl-10 pr-3 py-2 border rounded-md w-full text-sm"
      />
    </div>
  );
};
