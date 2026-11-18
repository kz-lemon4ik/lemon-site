import { useState } from "react";

interface Props {
  id?: number | null;
  name: string;
  size: number;
  square?: boolean;
  className?: string;
}

export default function Avatar({ id, name, size, square = false, className = "" }: Props) {
  const [failed, setFailed] = useState(false);
  const shape = square ? "rounded-2xl" : "rounded-full";
  if (!id || failed) {
    return (
      <span
        aria-hidden
        className={`grid shrink-0 place-items-center bg-gradient-to-br from-[#7d6bd0] to-osu font-semibold text-white ${shape} ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.42 }}
      >
        {(name.trim()[0] ?? "?").toUpperCase()}
      </span>
    );
  }
  return (
    <img
      src={`https://a.ppy.sh/${id}`}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`shrink-0 bg-btn object-cover ${shape} ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
