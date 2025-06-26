import clsx from "clsx";
import React, { useCallback, useState } from "react";

interface SafeImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "onError"> {
  src: string;
  fallbackSrc?: string;
  fallbackText?: string;
  showErrorState?: boolean;
  errorClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallbackSrc,
  fallbackText,
  showErrorState = true,
  errorClassName,
  className,
  alt,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = useCallback(() => {
    if (currentSrc === src && fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
    setIsLoading(false);
  }, [currentSrc, src, fallbackSrc]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  if (hasError && showErrorState) {
    return (
      <div
        className={clsx(
          "flex items-center justify-center bg-slate-200 text-slate-500 text-sm",
          errorClassName,
          className
        )}
        role="img"
        aria-label={alt}
      >
        {fallbackText || alt || "Image not available"}
      </div>
    );
  }

  if (hasError && !showErrorState) {
    return null;
  }

  return (
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      className={clsx(
        className,
        isLoading && "opacity-0 transition-opacity duration-300",
        !isLoading && "opacity-100 transition-opacity duration-300"
      )}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
};

export default SafeImage;
