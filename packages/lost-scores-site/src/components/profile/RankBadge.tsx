interface RankBadgeProps {
  rank: string;
  size?: number;
  className?: string;
}

export default function RankBadge({
  rank,
  size = 45,
  className = "",
}: RankBadgeProps) {
  const normalizedRank = rank === "X" ? "SS" : rank === "XH" ? "SSH" : rank;

  const gradePath = `/assets/grades/${normalizedRank}.png`;

  return (
    <div className={`flex-shrink-0 ${className}`}>
      <img
        src={gradePath}
        alt={`${rank} rank`}
        width={size}
        height={size}
        className="object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `<div class="flex items-center justify-center w-[${size}px] h-[${size}px] bg-purple-700 rounded-lg text-white font-bold text-xl">${rank}</div>`;
          }
        }}
      />
    </div>
  );
}
