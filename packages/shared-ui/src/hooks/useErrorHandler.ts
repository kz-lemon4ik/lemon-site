import { useCallback, useState } from "react";

export interface ErrorState {
  hasError: boolean;
  error: Error | null;
  retryCount: number;
}

interface UseErrorHandlerOptions {
  maxRetries?: number;
  onError?: (error: Error) => void;
  onRetry?: () => void;
}

export const useErrorHandler = (options: UseErrorHandlerOptions = {}) => {
  const { maxRetries = 3, onError, onRetry } = options;

  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    error: null,
    retryCount: 0,
  });

  const handleError = useCallback(
    (error: Error) => {
      console.error("Error caught by useErrorHandler:", error);
      setErrorState((prev) => ({
        hasError: true,
        error,
        retryCount: prev.retryCount,
      }));
      onError?.(error);
    },
    [onError]
  );

  const retry = useCallback(() => {
    if (errorState.retryCount < maxRetries) {
      setErrorState((prev) => ({
        hasError: false,
        error: null,
        retryCount: prev.retryCount + 1,
      }));
      onRetry?.();
    }
  }, [errorState.retryCount, maxRetries, onRetry]);

  const reset = useCallback(() => {
    setErrorState({
      hasError: false,
      error: null,
      retryCount: 0,
    });
  }, []);

  const canRetry = errorState.retryCount < maxRetries;

  return {
    errorState,
    handleError,
    retry,
    reset,
    canRetry,
  };
};
