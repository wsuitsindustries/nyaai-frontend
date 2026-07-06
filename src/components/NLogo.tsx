import { useId } from "react"

export default function NLogo({ className = "h-7 w-7" }: { className?: string }) {
  const gradientId = useId()
  return (
    <svg viewBox="0 0 80 80" className={className} aria-label="Nya AI">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <path
        d="M 16 64 L 16 18 L 64 64 L 64 18"
        stroke={`url(#${gradientId})`}
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
