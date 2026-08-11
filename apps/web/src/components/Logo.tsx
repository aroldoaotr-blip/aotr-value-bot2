import { cn } from "@/lib/format";

/**
 * Logo orb animado (identidad AOTR Values):
 * - Círculo con gradiente interno que late (SVG <animate>).
 * - Anillo rombo que rota lentamente.
 * - Colores vía CSS vars (--logo-a/b/c) → se adapta a los 2 temas.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block", className ?? "h-10 w-10")}
      style={{ filter: "drop-shadow(0 0 14px var(--logo-glow))" }}
      aria-hidden
    >
      <defs>
        <radialGradient id="logo-glow-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--logo-glow)" />
          <stop offset="100%" stopColor="var(--logo-glow)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="logo-orb-grad" cx="32%" cy="30%" r="80%">
          <stop offset="0%" stopColor="var(--logo-a)" />
          <stop offset="45%" stopColor="var(--logo-b)" />
          <stop offset="100%" stopColor="var(--logo-c)" />
        </radialGradient>
      </defs>

      {/* Halo pulsante */}
      <circle cx="50" cy="50" r="20" fill="url(#logo-glow-grad)">
        <animate
          attributeName="r"
          dur="3s"
          repeatCount="indefinite"
          values="15;25;15"
        />
        <animate
          attributeName="opacity"
          dur="3s"
          repeatCount="indefinite"
          values="0.6;1;0.6"
        />
      </circle>

      {/* Anillo rombo giratorio */}
      <g style={{ transformOrigin: "50px 50px" }}>
        <animateTransform
          attributeName="transform"
          dur="10s"
          from="0 50 50"
          to="360 50 50"
          type="rotate"
          repeatCount="indefinite"
        />
        <path
          d="M50 28 L72 50 L50 72 L28 50 Z"
          fill="none"
          stroke="var(--logo-ring)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          opacity="0.85"
        />
      </g>

      {/* Núcleo */}
      <circle cx="50" cy="50" r="15" fill="url(#logo-orb-grad)" />
      <circle
        cx="42"
        cy="42"
        r="5"
        fill="rgba(255,255,255,0.35)"
      />
    </svg>
  );
}
