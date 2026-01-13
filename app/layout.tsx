import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { ScrollToTop } from "@/components/scroll-to-top";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CineExplorer - Discover Movies",
    template: "%s | CineExplorer",
  },
  description:
    "Explore thousands of movies, discover new releases, and find your next favorite film with CineExplorer.",
  keywords: ["movies", "films", "cinema", "entertainment", "movie database", "movie search"],
  authors: [{ name: "CineExplorer" }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://cine-explorer-six.vercel.app/",
    title: "CineExplorer - Discover Movies",
    description: "Explore thousands of movies, discover new releases, and find your next favorite film.",
    siteName: "CineExplorer",
  },
  twitter: {
    card: "summary_large_image",
    title: "CineExplorer - Discover Movies",
    description: "Explore thousands of movies and discover new releases.",
  },
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScrollToTop />
        <Header />
        {children}
      </body>
    </html>
  );
}
