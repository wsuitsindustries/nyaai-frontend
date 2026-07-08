import { useState, useEffect, useRef } from "react"
import Toggle from "./ui/Toggle"
import { updateProfile, setAuthToken } from "../services/api"

interface SettingsProps {
  open: boolean
  onClose: () => void
  theme: "dark" | "light" | "system"
  onThemeChange: (theme: "dark" | "light" | "system") => void
  enterToSend: boolean
  onEnterToSendChange: (v: boolean) => void
  showSuggestions: boolean
  onShowSuggestionsChange: (v: boolean) => void
  userEmail?: string
  userName?: string
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

export default function Settings({ open, onClose, theme, onThemeChange, enterToSend, onEnterToSendChange, showSuggestions, onShowSuggestionsChange, userEmail, userName }: SettingsProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const [tab, setTab] = useState<"profile" | "preferences">("profile")
  const [editName, setEditName] = useState(userName || "")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (open) {
      setEditName(userName || "")
      setCurrentPassword("")
      setNewPassword("")
      setMessage("")
    }
  }, [open, userName])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, onClose])

  async function handleSaveProfile() {
    if (!editName.trim()) return
    setSaving(true)
    setMessage("")
    try {
      const data: any = { name: editName.trim() }
      if (newPassword) {
        data.current_password = currentPassword
        data.new_password = newPassword
      }
      const res = await updateProfile(data)
      setAuthToken(res.access_token)
      localStorage.setItem("nya-email", res.email)
      if (res.name) localStorage.setItem("nya-username", res.name)
      setMessage("Profile updated successfully")
      setCurrentPassword("")
      setNewPassword("")
    } catch (err: any) {
      setMessage(err.message || "Failed to update profile")
    }
    setSaving(false)
  }

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

        <div className="flex border-b border-neutral-200 dark:border-neutral-800 px-5 sm:px-6">
          <button
            onClick={() => setTab("profile")}
            className={`py-3 text-sm font-medium border-b-2 transition-all ${
              tab === "profile"
                ? "text-purple-600 dark:text-purple-400 border-purple-500"
                : "text-neutral-500 dark:text-neutral-400 border-transparent hover:text-neutral-700 dark:hover:text-neutral-300"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setTab("preferences")}
            className={`py-3 text-sm font-medium border-b-2 transition-all ml-6 ${
              tab === "preferences"
                ? "text-purple-600 dark:text-purple-400 border-purple-500"
                : "text-neutral-500 dark:text-neutral-400 border-transparent hover:text-neutral-700 dark:hover:text-neutral-300"
            }`}
          >
            Preferences
          </button>
        </div>

        <div className="px-4 sm:px-5 py-4 space-y-5">
          {tab === "profile" ? (
            <>
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email</label>
                <input
                  type="email"
                  value={userEmail || ""}
                  disabled
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-neutral-500 dark:text-neutral-400 outline-none cursor-not-allowed"
                />
                <p className="text-[10px] text-neutral-400 mt-1">Email cannot be changed</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">Display name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4">
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-3">Change password (optional)</label>
                <div className="space-y-3">
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Current password"
                    className="w-full bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 outline-none focus:border-purple-500 transition-colors"
                  />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password (min 6 characters)"
                    className="w-full bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>
              {message && (
                <p className={`text-xs ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
                  {message}
                </p>
              )}
              <button
                onClick={handleSaveProfile}
                disabled={saving || !editName.trim()}
                className="w-full py-2.5 text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">Theme</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {themeOptions.map((opt) => {
                    const isActive = theme === opt.value
                    return (
                      <button
                        key={opt.value}
                        onClick={() => onThemeChange(opt.value)}
                        className={`flex flex-col items-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-medium transition-all ${
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
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Enter to send</p>
                  <p className="text-xs text-neutral-500 mt-0.5">Shift + Enter for new line</p>
                </div>
                <Toggle checked={enterToSend} onChange={onEnterToSendChange} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Suggestions</p>
                  <p className="text-xs text-neutral-500 mt-0.5">Show prompts on new chat</p>
                </div>
                <Toggle checked={showSuggestions} onChange={onShowSuggestionsChange} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
