import { Button } from "@/components/ui/button";
import Link from "next/link";

export const ErrorButtonsSection = ({ reset }: { reset: () => void }) => {
  return (
    <div className="flex gap-4 justify-center">
      <Button
        onClick={reset}
      >
        Try Again
      </Button>
      <Link
        href="/"
      >
        <Button
          variant="outline"
        >
          Go Home
        </Button>
      </Link>
    </div>
  );
};
