import { useState, useEffect, useRef } from "react";

interface BeatmapCoverProps {
  beatmapsetId?: number;
  width?: number;
  height?: number;
  className?: string;
}

export default function BeatmapCover({
  beatmapsetId,
  width = 200,
  height = 60,
  className = "",
}: BeatmapCoverProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = imgRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  const coverUrl = beatmapsetId
    ? `https://assets.ppy.sh/beatmaps/${beatmapsetId}/covers/cover.jpg`
    : null;

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {!loaded && !error && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-700 to-purple-900 animate-pulse"
          style={{
            background: "linear-gradient(135deg, #505050 0%, #3d3550 100%)",
          }}
        />
      )}

      {inView && coverUrl && (
        <>
          <img
            src={coverUrl}
            alt="Beatmap cover"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setLoaded(true)}
            onError={() => {
              setError(true);
              setLoaded(false);
            }}
          />
          <div className="absolute inset-0 bg-black/30 theme-is-light:bg-transparent" />
        </>
      )}

      {error && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-700 to-purple-900"
          style={{
            background: "linear-gradient(135deg, #505050 0%, #3d3550 100%)",
          }}
        />
      )}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.05) 25%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.7) 75%, rgba(0, 0, 0, 0.95) 100%)",
        }}
      />
    </div>
  );
}
