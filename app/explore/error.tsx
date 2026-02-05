"use client";

import { useEffect } from "react";
import { ErrorSection } from "@/components/error/error-section";

export default function ExploreError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[v0] Error in explore page:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 flex items-center justify-center">
        <ErrorSection reset={reset} title="Error Loading Movies" />
      </main>
    </div>
  );
};
