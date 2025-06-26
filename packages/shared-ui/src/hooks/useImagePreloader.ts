import { useEffect, useState } from "react";

export const useImagePreloader = (imagePaths: string[]) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages((prev) => new Set([...prev, src]));
          resolve();
        };
        img.onerror = reject;
        img.src = src;
      });
    };

    const preloadAll = async () => {
      try {
        await Promise.all(imagePaths.map(preloadImage));
      } catch (error) {
        console.warn("Failed to preload some background images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (imagePaths.length > 0) {
      preloadAll();
    }
  }, [imagePaths]);

  const isImageLoaded = (src: string) => loadedImages.has(src);

  return { isLoading, isImageLoaded, loadedImages };
};
