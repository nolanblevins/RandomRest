import { Button } from "./Button";

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

const ErrorDisplay = ({ message, onRetry }: ErrorDisplayProps) => {
  return (
    <div
      className="bg-red-900/20 border border-red-500/30 text-red-300 p-4 rounded-lg text-center"
      role="alert"
    >
      <p className="font-semibold mb-2">Something went wrong</p>
      <p className="text-sm">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="secondary" className="mt-4">
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorDisplay;
