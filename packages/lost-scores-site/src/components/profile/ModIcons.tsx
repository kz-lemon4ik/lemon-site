interface ModIconsProps {
  mods: string[];
  size?: number;
  spacing?: number;
  className?: string;
}

export default function ModIcons({
  mods,
  size = 38,
  spacing = 5,
  className = "",
}: ModIconsProps) {
  const filteredMods = mods.filter(
    (mod) => mod.toUpperCase() !== "CL" && mod.toUpperCase() !== "NM"
  );

  if (filteredMods.length === 0) {
    return null;
  }

  return (
    <div className={`flex items-center flex-row-reverse ${className}`}>
      {filteredMods.reverse().map((mod, index) => {
        const modPath = `/assets/mod-icons/${mod.toUpperCase()}.png`;

        return (
          <img
            key={`${mod}-${index}`}
            src={modPath}
            alt={mod}
            width={size}
            height={size}
            className="object-contain"
            style={{
              marginLeft: index === 0 ? 0 : `${spacing}px`,
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
        );
      })}
    </div>
  );
}
