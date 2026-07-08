import { useId } from "react"

export default function BrandLogo({ className = "h-7" }: { className?: string }) {
  const gradientId = useId()
  return (
    <svg viewBox="0 0 200 56" className={className} aria-label="NyaAI">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <path
        d="M 10 44 L 10 12 L 36 44 L 36 12"
        stroke={`url(#${gradientId})`}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text
        x="46"
        y="44"
        fill={`url(#${gradientId})`}
        fontFamily="'Inter', system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="38"
        letterSpacing="1"
      >
        yaAI
      </text>
    </svg>
  )
}
