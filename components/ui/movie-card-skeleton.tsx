import { Star } from "lucide-react";

export const MovieCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 py-4 rounded-xl border shadow-sm transition-all hover:shadow-lg">
      <div className="relative">
        <div className="w-full h-60 bg-muted rounded-t-xl"></div>
      </div>
      <div className="p-4">
        <h2 className="font-semibold text-foreground line-clamp-1">Movie Title</h2>
        <div className="mt-1 text-sm flex items-center justify-between">
          <p className="text-muted-foreground">Release Date</p>
          <span className="flex items-center gap-1 bg-secondary px-2 py-1 rounded">
            <Star color="#fdc700" className="fill-yellow-400" size={14} />
            <span className="text-xs">Average Rating</span>
          </span>
        </div>
      </div>
    </div>
  );
};
