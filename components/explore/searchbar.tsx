"use client";

import { useEffect, useState } from "react";
import { Search, X, Sparkles, Loader2 } from "lucide-react";
import { useMovieFilter } from "@/hooks/use-movie-filter";
import { useDebounce } from "@/hooks/use-debounce";
import { getMovieTitleFromDescription } from "@/app/actions";
import { cn } from "@/lib/utils/cn";

export const Searchbar = () => {
  const { updateFilters, query } = useMovieFilter();
  const [searchValue, setSearchValue] = useState(query);
  const [isAiSearching, setIsAiSearching] = useState(false);
  const debounceSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debounceSearch !== query && !isAiSearching) {
      updateFilters({ query: debounceSearch || '', page: '1' });
    }
  }, [debounceSearch]);

  const handleClearBar = () => {
    updateFilters({ query: '', page: '1' });
    setSearchValue('');
  };

  const handleAiSearch = async () => {
    if (!searchValue) return;

    setIsAiSearching(true);
    try {
      const title = await getMovieTitleFromDescription(searchValue);
      if (title) {
        setSearchValue(title);
        updateFilters({ query: title, page: '1' });
      }
    } catch (error) {
      console.error("AI Search failed", error);
    } finally {
      setIsAiSearching(false);
    }
  };

  return (
    <div className="relative flex gap-2 w-full">
      <div className="relative w-full">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={16}
        />
        <input
          type="text"
          placeholder="Search for movies..."
          className="pl-10 pr-3 py-2 border rounded-md w-full text-sm"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.metaKey) {
              handleAiSearch();
            }
          }}
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

      <button
        onClick={handleAiSearch}
        disabled={isAiSearching || !searchValue}
        className={cn(
          "px-3 py-2 border rounded-md bg-background cursor-pointer hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed group relative",
          isAiSearching && "animate-pulse"
        )}
        title="AI Search (Describe the movie)"
      >
        {isAiSearching ? (
          <Loader2 className="animate-spin text-primary" size={18} />
        ) : (
          <Sparkles className={cn("text-muted-foreground group-hover:text-primary transition-colors", searchValue && "text-primary")} size={18} />
        )}
      </button>
    </div>
  );
};
