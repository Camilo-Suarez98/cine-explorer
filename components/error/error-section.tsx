import { AlertCircle } from "lucide-react";
import { ErrorButtonsSection } from "./error-buttons-section";

export const ErrorSection = ({ reset, title }: { reset: () => void, title: string }) => {
  return (
    <div className="text-center space-y-6 p-8 max-w-md">
      <div className="flex justify-center">
        <AlertCircle className="h-24 w-24 text-destructive" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      </div>
      <ErrorButtonsSection reset={reset} />
    </div>
  );
};
