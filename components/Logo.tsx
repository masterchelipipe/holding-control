// Logo Nexus Holding — hexágono con "N", azul oscuro + dorado.
// SVG inline, sin dependencias externas.
export function NexusLogo({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Logo Nexus Holding"
    >
      <defs>
        <linearGradient id="nexus-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f5d678" />
          <stop offset="0.5" stopColor="#d4af37" />
          <stop offset="1" stopColor="#a8841c" />
        </linearGradient>
        <linearGradient id="nexus-goldstroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e9c76b" />
          <stop offset="1" stopColor="#c19a2e" />
        </linearGradient>
      </defs>

      {/* hexágono exterior (azul oscuro) */}
      <polygon
        points="32,4 55,17 55,47 32,60 9,47 9,17"
        fill="#0b1633"
        stroke="url(#nexus-goldstroke)"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />

      {/* hexágono interior sutil */}
      <polygon
        points="32,10 51,21 51,43 32,54 13,43 13,21"
        fill="none"
        stroke="#22386c"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* letra N en dorado */}
      <path
        d="M20 42 V22 L32 34.5 L44 22 V42"
        stroke="url(#nexus-gold)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}