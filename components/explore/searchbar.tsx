"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { useMovieFilter } from "@/hooks/use-movie-filter";
import { useDebounce } from "@/hooks/use-debounce";

export const Searchbar = () => {
  const { updateFilters, query } = useMovieFilter();
  const [searchValue, setSearchValue] = useState(query);
  const debounceSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debounceSearch !== query) {
      updateFilters({ query: debounceSearch || '', page: '1' });
    }
  }, [debounceSearch]);

  const handleClearBar = () => {
    updateFilters({ query: '', page: '1' });
    setSearchValue('');
  };

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
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
      {searchValue && (
        <button
          onClick={handleClearBar}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer hover:bg-muted-foreground/20 rounded-sm"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
