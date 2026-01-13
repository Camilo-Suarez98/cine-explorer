export const getImageUrl = (path: string | null, size: "w500" | "w780" | "original" = "w500"): string => {
  if (!path) return "/placeholder.svg?height=750&width=500";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function formatDate(dateString: string): string {
  if (!dateString) return "N/A"
  const date = new Date(dateString)
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount)
}

export function getYear(dateString: string): string {
  if (!dateString) return ""
  return new Date(dateString).getFullYear().toString()
}