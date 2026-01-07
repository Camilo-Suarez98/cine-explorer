# CineExplorer - Movie Discovery Platform

A modern, high-performance movie exploration platform built with **Next.js 16 App Router** and **TypeScript**. This project demonstrates advanced Next.js patterns, optimal data fetching strategies, and production-ready architecture.

![CineExplorer](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwindcss)

## 🚀 Features

### Core Functionality
- **Movie Discovery**: Browse thousands of movies from The Movie Database (TMDB) API
- **Advanced Search**: Real-time search with debouncing for optimal performance
- **Smart Filters**: Filter by genre, year, and multiple sort options
- **Detailed Views**: Rich movie detail pages with comprehensive information
- **Responsive Design**: Fully responsive UI that works on all devices

### Technical Highlights
- ⚡ **Hybrid Rendering**: SSG, ISR, and SSR strategically used for optimal performance
- 🔍 **SEO Optimized**: Dynamic metadata, Open Graph tags, and automatic sitemaps
- 🎨 **Modern UI**: Built with shadcn/ui and Tailwind CSS v4
- 🧩 **Component Architecture**: Clean separation of Server and Client Components
- 📱 **Progressive Loading**: Suspense boundaries and skeleton loaders
- 🔄 **URL State Management**: Search params for shareable URLs
- 🎯 **Type Safety**: Full TypeScript coverage with strict mode

## 📁 Project Architecture

```
├── app/                          # Next.js App Router
│   ├── (routes)/
│   │   ├── page.tsx             # Homepage (SSG/ISR)
│   │   ├── explore/             # Search & Filter page
│   │   └── movie/[id]/          # Dynamic movie details (SSG)
│   ├── layout.tsx               # Root layout with metadata
│   ├── sitemap.ts               # Dynamic sitemap generation
│   └── robots.ts                # SEO robots.txt
│
├── components/                   # React components
│   ├── ui/                      # Base UI components (shadcn)
│   ├── layout/                  # Layout components (Header, Footer)
│   ├── movie/                   # Movie-specific components
│   ├── home/                    # Homepage sections
│   └── explore/                 # Search & filter components
│
├── lib/                         # Core business logic
│   ├── services/                # API services
│   │   └── tmdb.ts             # TMDB API client
│   ├── types/                   # TypeScript definitions
│   │   └── movie.ts            # Movie-related types
│   ├── utils/                   # Utility functions
│   │   └── format.ts           # Data formatting helpers
│   └── constants/               # App constants
│       └── filters.ts          # Filter options
│
└── hooks/                       # Custom React hooks
    ├── use-debounce.ts         # Search debouncing
    └── use-movie-filters.ts    # Filter state management
```

## 🏗️ Technical Decisions

### 1. **Rendering Strategy**

#### Static Site Generation (SSG) with ISR
- **Homepage**: Pre-rendered at build time, revalidated every hour
- **Popular Movies**: Ensures fast initial load times
- **Benefit**: Near-instant page loads, reduced API calls

#### Dynamic SSG with Fallback
- **Movie Detail Pages**: Top 20 movies pre-rendered at build
- **generateStaticParams**: Pre-generates most viewed pages
- **Fallback**: On-demand generation for other movies
- **Benefit**: Balance between build time and performance

#### Server-Side Rendering (SSR)
- **Explore/Search Page**: Dynamic content based on user filters
- **Real-time Results**: Always fresh search results
- **Benefit**: SEO-friendly search pages with dynamic content

### 2. **Data Fetching**

#### Server Components (Default)
- All data fetching in Server Components
- Direct API calls without client-side overhead
- Automatic request deduplication via React Cache

```typescript
// Example: Server Component data fetching
async function PopularMovies() {
  const data = await tmdbService.getPopularMovies()
  return <MovieSection movies={data.results} />
}
```

#### Client Components (Selective)
- Only for interactive features: search, filters, pagination
- URL-based state management for shareability
- Custom hooks for reusable logic

```typescript
// Example: Client Component for search
"use client"
export function SearchBar() {
  const debouncedSearch = useDebounce(searchValue, 500)
  // ... search logic
}
```

### 3. **Performance Optimizations**

#### Image Optimization
- Next.js Image component with automatic optimization
- Responsive image sizing with `sizes` prop
- Lazy loading for off-screen images

#### Code Splitting
- Automatic route-based code splitting
- Dynamic imports for heavy components
- Client components only when necessary

#### Caching Strategy
```typescript
// ISR: Revalidate every hour
export const revalidate = 3600

// SSG: Cache for 24 hours
next: { revalidate: 86400, tags: [`movie-${id}`] }

// SSR: No cache for search
cache: "no-store"
```

### 4. **SEO Implementation**

#### Dynamic Metadata
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const movie = await getMovieDetails(params.id)
  return {
    title: movie.title,
    description: movie.overview,
    openGraph: { /* ... */ },
    twitter: { /* ... */ }
  }
}
```

#### Structured Data
- Sitemap.xml with top movies
- Robots.txt for crawler control
- Open Graph and Twitter Card tags

### 5. **Type Safety**

- Strict TypeScript configuration
- API response types from TMDB
- Props validation with interfaces
- Utility function type inference

### 6. **Error Handling**

- Error boundaries at route level
- Graceful fallbacks with user actions
- Loading states with Suspense
- Empty states with helpful CTAs

## 🛠️ Tech Stack

### Core
- **Next.js 16**: React framework with App Router
- **TypeScript 5**: Type-safe development
- **React 19**: Latest React features

### Styling
- **Tailwind CSS v4**: Utility-first CSS
- **shadcn/ui**: High-quality component library
- **Lucide Icons**: Beautiful icons

### Data & API
- **TMDB API**: Movie database
- **Fetch API**: Native HTTP client with caching

### Development
- **ESLint**: Code linting
- **Prettier**: Code formatting

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cineexplorer.git
cd cineexplorer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Learning Outcomes

This project demonstrates:

1. **Advanced Next.js Patterns**
   - Hybrid rendering strategies (SSG/ISR/SSR)
   - Server and Client Component composition
   - Dynamic route generation

2. **Modern React Practices**
   - Suspense for data fetching
   - Custom hooks for logic reuse
   - Proper component architecture

3. **Production-Ready Code**
   - Comprehensive error handling
   - Loading states and skeletons
   - SEO optimization
   - Type safety

4. **Performance Optimization**
   - Smart caching strategies
   - Image optimization
   - Code splitting

## 📝 API Documentation

### TMDB Service

All API calls are centralized in `lib/services/tmdb.ts`:

- `getPopularMovies(page)`: Fetch popular movies
- `getTopRatedMovies(page)`: Fetch top-rated movies
- `getNowPlayingMovies(page)`: Fetch movies in theaters
- `searchMovies(query, page)`: Search movies by title
- `discoverMovies(params)`: Filter movies by criteria
- `getMovieDetails(id)`: Get detailed movie information
- `getGenres()`: Fetch all movie genres

## 🙏 Acknowledgments

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

Built with ❤️ using Next.js 16 and TypeScript
```

```json file="" isHidden