interface CountryFlagProps {
  countryCode: string;
  className?: string;
  title?: string;
}

const countryCodeToEmoji: Record<string, string> = {
  KZ: "1f1f0-1f1ff",
  US: "1f1fa-1f1f8",
  RU: "1f1f7-1f1fa",
  GB: "1f1ec-1f1e7",
  DE: "1f1e9-1f1ea",
  FR: "1f1eb-1f1f7",
  JP: "1f1ef-1f1f5",
  CN: "1f1e8-1f1f3",
  KR: "1f1f0-1f1f7",
  PL: "1f1f5-1f1f1",
  CA: "1f1e8-1f1e6",
  AU: "1f1e6-1f1fa",
  BR: "1f1e7-1f1f7",
  ES: "1f1ea-1f1f8",
  IT: "1f1ee-1f1f9",
  NL: "1f1f3-1f1f1",
  SE: "1f1f8-1f1ea",
  NO: "1f1f3-1f1f4",
  FI: "1f1eb-1f1ee",
  DK: "1f1e9-1f1f0",
  BE: "1f1e7-1f1ea",
  AT: "1f1e6-1f1f9",
  CH: "1f1e8-1f1ed",
  CZ: "1f1e8-1f1ff",
  GR: "1f1ec-1f1f7",
  PT: "1f1f5-1f1f9",
  TR: "1f1f9-1f1f7",
  UA: "1f1fa-1f1e6",
  BY: "1f1e7-1f1fe",
  LT: "1f1f1-1f1f9",
  LV: "1f1f1-1f1fb",
  EE: "1f1ea-1f1ea",
  RO: "1f1f7-1f1f4",
  BG: "1f1e7-1f1ec",
  HU: "1f1ed-1f1fa",
  SK: "1f1f8-1f1f0",
  SI: "1f1f8-1f1ee",
  HR: "1f1ed-1f1f7",
  RS: "1f1f7-1f1f8",
  BA: "1f1e7-1f1e6",
  MK: "1f1f2-1f1f0",
  AL: "1f1e6-1f1f1",
  ME: "1f1f2-1f1ea",
  IS: "1f1ee-1f1f8",
  IE: "1f1ee-1f1ea",
  TH: "1f1f9-1f1ed",
  VN: "1f1fb-1f1f3",
  MY: "1f1f2-1f1fe",
  SG: "1f1f8-1f1ec",
  ID: "1f1ee-1f1e9",
  PH: "1f1f5-1f1ed",
  TW: "1f1f9-1f1fc",
  HK: "1f1ed-1f1f0",
  IN: "1f1ee-1f1f3",
  PK: "1f1f5-1f1f0",
  BD: "1f1e7-1f1e9",
  NZ: "1f1f3-1f1ff",
  AR: "1f1e6-1f1f7",
  CL: "1f1e8-1f1f1",
  CO: "1f1e8-1f1f4",
  MX: "1f1f2-1f1fd",
  PE: "1f1f5-1f1ea",
  VE: "1f1fb-1f1ea",
  ZA: "1f1ff-1f1e6",
  EG: "1f1ea-1f1ec",
  IL: "1f1ee-1f1f1",
  SA: "1f1f8-1f1e6",
  AE: "1f1e6-1f1ea",
};

function getEmojiCode(countryCode: string): string {
  const upperCode = countryCode.toUpperCase();

  if (countryCodeToEmoji[upperCode]) {
    return countryCodeToEmoji[upperCode];
  }

  const charA = 0x1f1e6;
  const first = upperCode.charCodeAt(0) - 65;
  const second = upperCode.charCodeAt(1) - 65;
  const firstHex = (charA + first).toString(16);
  const secondHex = (charA + second).toString(16);

  return `${firstHex}-${secondHex}`;
}

export default function CountryFlag({
  countryCode,
  className = "",
  title,
}: CountryFlagProps) {
  const emojiCode = getEmojiCode(countryCode);
  const flagUrl = `https://osu.ppy.sh/assets/images/flags/${emojiCode}.svg`;

  return (
    <span
      className={`inline-block bg-cover bg-center ${className}`}
      style={{
        backgroundImage: `url("${flagUrl}")`,
        width: "1.5em",
        height: "1em",
        borderRadius: "2px",
      }}
      title={title || countryCode}
      aria-label={`${countryCode} flag`}
    />
  );
}
