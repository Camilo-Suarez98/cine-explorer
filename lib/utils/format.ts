export const getImageUrl = (path: string | null, size: "w500" | "w780" | "original" = "w500"): string => {
  if (!path) return "/placeholder.svg?height=750&width=500";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}