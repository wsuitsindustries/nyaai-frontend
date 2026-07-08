import { useState, useEffect } from "react"
import NLogo from "./NLogo"

export default function PageLoader() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 1500)
    const t2 = setTimeout(() => setVisible(false), 2000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!visible) return null

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-neutral-950 transition-opacity duration-700 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
      <svg viewBox="0 0 80 80" className="h-20 w-auto sm:h-24 mb-6" aria-label="NyaAI">
        <defs>
          <linearGradient id="loader-nya-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <g>
          <path d="M 16 64 L 16 18 L 64 64 L 64 18" stroke="url(#loader-nya-gradient)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeDasharray="165" strokeDashoffset="165">
            <animate attributeName="stroke-dashoffset" from="165" to="0" dur="1.2s" repeatCount="indefinite" />
          </path>
          <path d="M 16 64 L 16 18 L 64 64 L 64 18" stroke="url(#loader-nya-gradient)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.15" />
        </g>
      </svg>
    </div>
  )
}
