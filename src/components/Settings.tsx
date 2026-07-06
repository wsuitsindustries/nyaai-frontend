import { useEffect, useRef } from "react"
import Toggle from "./ui/Toggle"
 
interface SettingsProps {
  open: boolean
  onClose: () => void
  theme: "dark" | "light" | "system"
  onThemeChange: (theme: "dark" | "light" | "system") => void
  enterToSend: boolean
  onEnterToSendChange: (v: boolean) => void
  showSuggestions: boolean
  onShowSuggestionsChange: (v: boolean) => void
}

const themeOptions = [
  { value: "dark" as const, label: "Dark", icon: "moon" },
  { value: "light" as const, label: "Light", icon: "sun" },
  { value: "system" as const, label: "System", icon: "monitor" },
]

function ThemeIcon({ type }: { type: string }) {
  if (type === "moon") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    )
  }
  if (type === "sun") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    )
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  )
}

export default function Settings({ open, onClose, theme, onThemeChange, enterToSend, onEnterToSendChange, showSuggestions, onShowSuggestionsChange }: SettingsProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 overlay-fade-in" onClick={onClose}>
      <div
        ref={dialogRef}
        className="w-full sm:max-w-lg bg-white dark:bg-neutral-900 rounded-t-2xl sm:rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl animate-scale-in sm:mx-4 max-h-[85vh] sm:max-h-[90vh] overflow-y-auto my-0 sm:my-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Settings</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-500 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="px-5 sm:px-6 py-5 space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">Theme</label>
            <div className="grid grid-cols-3 gap-2">
              {themeOptions.map((opt) => {
                const isActive = theme === opt.value
                return (
                  <button
                    key={opt.value}
                    onClick={() => onThemeChange(opt.value)}
                    className={`flex flex-col items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-purple-500 text-white"
                        : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }`}
                  >
                    <ThemeIcon type={opt.icon} />
                    <span>{opt.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Send messages with Enter</p>
              <p className="text-xs text-neutral-500 mt-0.5">Shift + Enter for new line</p>
            </div>
            <Toggle checked={enterToSend} onChange={onEnterToSendChange} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Show suggestions on new chat</p>
              <p className="text-xs text-neutral-500 mt-0.5">Display prompt suggestions</p>
            </div>
            <Toggle checked={showSuggestions} onChange={onShowSuggestionsChange} />
          </div>
        </div>
      </div>
    </div>
  )
}
