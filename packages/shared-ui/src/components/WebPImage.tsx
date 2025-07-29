import React from 'react';

interface WebPImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback?: string;
  alt: string;
}

export default function WebPImage({ src, fallback, alt, ...props }: WebPImageProps) {
  // If src already ends with .webp, use it as is
  // Otherwise, generate both webp and fallback paths
  const webpSrc = src.endsWith('.webp') ? src : src.replace(/\.(png|jpg|jpeg)$/, '.webp');
  const fallbackSrc = fallback || (src.endsWith('.webp') ? src.replace('.webp', '.png') : src);

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img src={fallbackSrc} alt={alt} {...props} />
    </picture>
  );
}