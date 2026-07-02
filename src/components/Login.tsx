import { useState, useId } from "react"
import { login, register, setAuthToken } from "../services/api"

interface LoginProps {
  onLogin: (email: string) => void
}

type Mode = "signin" | "signup"

function NLogo({ className = "h-14 w-14" }: { className?: string }) {
  const gradientId = useId()
  return (
    <svg viewBox="0 0 80 80" className={className} aria-label="Nya AI">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <path d="M 16 64 L 16 18 L 64 64 L 64 18" stroke={`url(#${gradientId})`} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

export default function Login({ onLogin }: LoginProps) {
  const [mode, setMode] = useState<Mode>("signin")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!email.trim() || !password.trim()) return
    if (mode === "signup" && !name.trim()) return
    setLoading(true)
    try {
      const res = mode === "signin"
        ? await login(email.trim(), password)
        : await register(name.trim(), email.trim(), password)
      setAuthToken(res.access_token)
      onLogin(res.email)
    } catch (err: any) {
      setError(err.message || "Authentication failed")
    }
    setLoading(false)
  }

  const isSignIn = mode === "signin"

  return (
    <div className="h-full flex items-center justify-center bg-white dark:bg-neutral-950 px-4 relative overflow-hidden">
      <div className="w-full max-w-sm animate-fade-up">
        <div className="flex justify-center mb-6 sm:mb-8">
          <NLogo />
        </div>
        <h1 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white text-center mb-1">
          Welcome to Nya AI
        </h1>
        <p className="text-sm text-neutral-500 text-center mb-6 sm:mb-8">
          {isSignIn ? "Sign in to get started" : "Create your account"}
        </p>

        {error && (
          <p className="text-sm text-red-500 text-center mb-4">{error}</p>
        )}

        <div className="flex rounded-xl p-1 mb-6 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <button
            onClick={() => setMode("signin")}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
              isSignIn
                ? "bg-purple-500 text-white"
                : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
              !isSignIn
                ? "bg-purple-500 text-white"
                : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isSignIn && (
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-500 outline-none focus:border-purple-500 transition-all duration-300"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-500 outline-none focus:border-purple-500 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isSignIn ? "Enter your password" : "Create a password"}
              className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-500 outline-none focus:border-purple-500 transition-all duration-300"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-3 text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-50 ${loading ? "bg-neutral-500" : "bg-purple-500 hover:bg-purple-600"}`}
          >
            {loading
              ? isSignIn ? "Signing in..." : "Creating account..."
              : isSignIn ? "Sign in" : "Create account"
            }
          </button>
        </form>
      </div>
    </div>
  )
}
