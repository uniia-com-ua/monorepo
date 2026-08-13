"use client";

import { isDevelopment } from "@/lib/helpers";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";
import { Button } from "@workspace/ui/components/base/button";
import { AlertTriangleIcon, XIcon } from "lucide-react";
import { type FC, useState } from "react";
import { ErrorBoundary as ErrorBoundaryActual } from "react-error-boundary";

interface ErrorBoundryFallbackProps {
  error: unknown;
  resetErrorBoundary: () => void;
  customErrorTitle?: string;
  hideReset?: boolean;
  showErrorMessage?: boolean;
}

const ErrorBoundryFallback: FC<ErrorBoundryFallbackProps> = ({
  error,
  resetErrorBoundary,
  customErrorTitle,
  hideReset,
  showErrorMessage,
}) => {
  const [hidden, setHidden] = useState(false);

  if (hidden) {
    return null;
  }

  const handleTryAgain = () => {
    resetErrorBoundary();
  };
  const isDev = isDevelopment();
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : undefined;

  return (
    <Alert variant="destructive" className="relative">
      <AlertTriangleIcon className="s-4" />
      <AlertTitle>{customErrorTitle || "Something went wrong"}</AlertTitle>
      <AlertDescription>
        {(showErrorMessage || isDev) && (
          <p className="mt-1 text-sm text-black">{errorMessage}</p>
        )}

        {isDev && (
          <div className="mt-2 w-full overflow-x-auto bg-gray-100 p-3 text-xs">
            <pre>{errorStack?.split("\n").slice(0, 5).join("\n")}</pre>
          </div>
        )}

        {!hideReset && (
          <Button
            type="button"
            size="sm"
            variant="destructive"
            onClick={handleTryAgain}
            className="mt-2"
          >
            Try again
          </Button>
        )}

        <span className="absolute right-2 top-2 block">
          <XIcon
            className="size-4 cursor-pointer"
            onClick={() => setHidden(true)}
          />
        </span>
      </AlertDescription>
    </Alert>
  );
};

interface ErrorBoundryProps {
  children?: React.ReactNode;

  hideReset?: boolean;
  hideFallback?: boolean;

  customErrorTitle?: string;
  showErrorMessage?: boolean;

  onReset?: () => void;
  onError?: (error: unknown, info: { componentStack?: string | null }) => void;
}

const ErrorBoundry: FC<ErrorBoundryProps> = ({
  children,
  hideReset,
  hideFallback,
  customErrorTitle,
  onError,
  onReset,
  showErrorMessage,
}) => {
  const handleError = (
    error: unknown,
    info: { componentStack?: string | null },
  ) => {
    const errorDigest =
      error instanceof Error
        ? (error as Error & { digest?: string }).digest
        : undefined;
    const infoDigest = (info as { digest?: string }).digest;

    const digest = errorDigest ?? infoDigest ?? "unknown";

    if (digest === "NEXT_NOT_FOUND" || digest.includes("404")) {
      throw error; // Let Next.js handle 404 errors
    }

    if (onError) {
      onError(error, info);
    }
  };

  return (
    <ErrorBoundaryActual
      fallbackRender={(props) =>
        hideFallback ? null : (
          <ErrorBoundryFallback
            {...props}
            hideReset={hideReset}
            customErrorTitle={customErrorTitle}
            showErrorMessage={showErrorMessage}
          />
        )
      }
      onError={handleError}
      onReset={onReset}
    >
      {children}
    </ErrorBoundaryActual>
  );
};

export default ErrorBoundry;
