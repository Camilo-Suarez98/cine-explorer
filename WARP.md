# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Run Development Server
```bash
npm run dev
```
Development server runs on http://localhost:3000

### Build for Production
```bash
npm run build
```
Creates optimized production build using Next.js 16 with Turbopack

### Start Production Server
```bash
npm run start
```
Runs the production build locally

### Linting
```bash
npm run lint
```
Runs ESLint with Next.js configuration

## Environment Setup

Required environment variables (see `.env.example`):
- `TMDB_API_KEY` - The Movie Database API key (required for all movie data)
- `OPENAI_API_KEY` - OpenAI API for AI-powered movie search
- `GEMINI_API_KEY` - Google Gemini API (alternative to OpenAI)
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret

Copy `.env.example` to `.env` and populate with actual values before running the app.

## Architecture Overview

### Rendering Strategy
This project uses **hybrid rendering** strategically:
- **Homepage** (`app/page.tsx`): Server-side rendered with data from multiple TMDB endpoints (popular, upcoming, top-rated, now-playing). Each section uses Suspense boundaries with skeleton loaders.
- **Movie Details** (`app/movie/[id]/page.tsx`): Server-side rendered per request. Movie data is cached for 24 hours (`revalidate: 86400`).
- **Explore/Search** (`app/explore/page.tsx`): Server-side rendered with `cache: 'no-store'` for real-time search results. Uses URL-based state via search params for shareability.

### Data Fetching Pattern
All API calls are centralized in `lib/services/tmdb.ts` using a custom `tmdbFetch` wrapper that:
- Handles authentication via Bearer token
- Supports Next.js cache configuration (`revalidate`, `tags`)
- Uses cache tags for granular revalidation (e.g., `movie-${id}`, `popular-movies`)

Revalidation times:
- Popular/Upcoming/Top-rated/Now-playing movies: 1 hour (3600s)
- Individual movie details: 24 hours (86400s)
- Genres: 1 week (604800s)
- Search/Explore: No cache (`cache: 'no-store'`)

### Server vs Client Components
- **Server Components** (default): All data fetching, movie sections, detail pages. Keep data fetching on the server to avoid client-side overhead.
- **Client Components**: Only for interactivity - search bars, filters, pagination. Marked with `"use client"` directive.

When adding new features:
- Start with Server Components by default
- Only use Client Components when you need browser APIs, event handlers, or state management
- Use URL search params for shareable state instead of client state when possible

### AI Integration
The app has dual AI providers for movie search by description:
- **OpenAI** (`lib/openai/client.ts`): Uses `gpt-4o-mini` model
- **Gemini** (`lib/gemini/client.ts`): Uses `gemini-2.0-flash` model

Both implement `searchMovieByUserDescription(description: string)` function. The active implementation is selected in `app/actions.ts` via the `getMovieTitleFromDescription` server action.

### Authentication
Uses NextAuth.js with Google OAuth provider. Configuration in `lib/auth.ts`:
- Session strategy: JWT
- Custom sign-in page: `/login`
- Protected routes should use `getServerSession(authOptions)`

### Type System
Full TypeScript coverage with strict mode enabled. Core types in `lib/types/movie.ts`:
- `Movie` - Basic movie data from TMDB lists
- `MovieDetails` - Extended movie data with genres, runtime, budget, etc.
- `MoviesResponse` - Paginated API response wrapper
- `Genre`, `ProductionCompany`, `Language` - Related entity types

When working with TMDB API responses, always use these defined types instead of `any`.

### Component Organization
```
components/
├── ui/           # Base reusable components (buttons, cards, pagination, skeletons)
├── layout/       # Header, footer, navigation
├── home/         # Homepage-specific sections
├── explore/      # Search and filter components
├── movie/        # Movie detail page components
├── auth/         # Authentication-related components
└── providers/    # Context providers (SessionProvider)
```

Keep components focused and single-purpose. Extract shared UI patterns to `components/ui/`.

### Styling
Uses Tailwind CSS v4 with custom configuration. Utility-first approach with shadcn/ui components as base. Icons from `lucide-react`.

When styling:
- Use Tailwind utilities first
- Responsive design with mobile-first breakpoints
- Dark/light mode support via CSS variables
- Use shadcn/ui components for consistency

## Common Patterns

### Adding a New Movie List Section
1. Add new service method in `lib/services/tmdb.ts` with appropriate caching
2. Create Server Component that fetches data
3. Wrap in Suspense boundary with MovieCardSkeleton fallback
4. Pass results to MovieSection component

### Adding a New Filter to Explore Page
1. Filters are URL-based via search params
2. Update `ExploreMoviesParams` interface in `app/explore/page.tsx`
3. Add filter UI to `components/explore/searchbar.tsx` (Client Component)
4. Update `tmdbServices.getExploreMovies()` to handle new param
5. Ensure filter state persists in URL for shareability

### Working with TMDB API
All endpoints use Bearer token authentication (set in `tmdbFetch` wrapper). Common gotchas:
- TMDB limits pagination to 500 pages max
- Image paths from API need `https://image.tmdb.org` base URL (configured in `next.config.ts`)
- Always handle empty results gracefully with EmptyState component

## Path Alias
Import from root using `@/*` alias (configured in `tsconfig.json`):
```typescript
import { tmdbServices } from "@/lib/services/tmdb"
import { MovieCard } from "@/components/ui/movie-card"
```

## Notes
- No test framework currently configured
- Deployed on Vercel (see README for production URL)
- Uses Next.js Image component with TMDB domain whitelisted for automatic optimization
