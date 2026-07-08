import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { login, register, setAuthToken } from "../services/api"
import { useAuth } from "../context/AuthContext"
import NLogo from "../components/ui/NLogo"
import BrandLogo from "../components/ui/BrandLogo"

type Mode = "signin" | "signup"

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function EyeIcon({ on }: { on: boolean }) {
  return on ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function UploadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  )
}

function BrainIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
    </svg>
  )
}

function MessageIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="6" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function passwordStrength(pw: string): { label: string; color: string; width: string } {
  if (!pw) return { label: "", color: "", width: "0%" }
  if (pw.length < 6) return { label: "Weak", color: "bg-red-400", width: "25%" }
  if (pw.length < 10) return { label: "Fair", color: "bg-yellow-400", width: "50%" }
  if (/(?=.*[A-Z])(?=.*[0-9])/.test(pw)) return { label: "Strong", color: "bg-green-400", width: "100%" }
  return { label: "Good", color: "bg-blue-400", width: "75%" }
}

export default function Login() {
  const navigate = useNavigate()
  const { login: authLogin } = useAuth()
  const [mode, setMode] = useState<Mode>("signin")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const isSignIn = mode === "signin"
  const strength = passwordStrength(password)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!email.trim() || !password.trim()) { setError("Please fill in all fields"); return }
    if (!isSignIn && !name.trim()) { setError("Please fill in all fields"); return }
    setLoading(true)
    try {
      const res = isSignIn
        ? await login(email.trim(), password)
        : await register(name.trim(), email.trim(), password)
      setAuthToken(res.access_token)
      authLogin(res.email, res.name)
      navigate("/dashboard", { replace: true })
    } catch (err: any) {
      setError(err.message || "Authentication failed")
    }
    setLoading(false)
  }

  return (
    <div className="h-full flex bg-white dark:bg-neutral-950">
      <div className="hidden lg:flex w-[480px] xl:w-[520px] bg-purple-600 flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 16 64 L 16 18 L 64 64 L 64 18' stroke='%23ffffff' stroke-width='10' stroke-linecap='round' stroke-linejoin='round' fill='none' opacity='0.06' /%3E%3C/svg%3E")`, backgroundSize: '120px 120px' }} />
        <div className="relative z-10 text-center px-14">
          <div className="flex justify-center mb-6">
            <BrandLogo className="h-14 w-auto" />
          </div>
          <h2 className="text-3xl font-bold text-neutral-900 mb-3">AI knowledge base<br />for your team</h2>
          <p className="text-neutral-700 text-sm leading-relaxed max-w-sm mx-auto">
            Stop digging through documents. Upload once, ask anything, and get source-cited answers in seconds.
          </p>
          <div className="mt-12 space-y-4 text-left max-w-xs mx-auto">
            {[
              { icon: <UploadIcon />, text: "Upload PDFs, Markdown, CSV, Word files" },
              { icon: <BrainIcon />, text: "Automatic indexing with vector search" },
              { icon: <MessageIcon />, text: "Ask questions in plain English" },
              { icon: <SearchIcon />, text: "Every answer cites its source" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-black/10 flex items-center justify-center text-neutral-800 shrink-0">
                  {item.icon}
                </div>
                <span className="text-sm text-neutral-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-8 overflow-y-auto">
        <div className="w-full max-w-sm">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors mb-8">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to home
          </Link>

          <div className="flex items-center justify-center gap-3 mb-1">
            <Link to="/" className="block">
              <BrandLogo className="h-8 w-auto" />
            </Link>
            <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">
              {isSignIn ? "Welcome back" : "Create your account"}
            </h1>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center mb-8">
            {isSignIn ? "Sign in to NyaAI" : "Get started with NyaAI"}
          </p>

          {error && (
            <div className="flex items-start gap-2 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg px-4 py-3 mb-6">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500 shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-sm text-red-600 dark:text-red-400 flex-1">{error}</p>
              <button onClick={() => setError("")} className="text-red-400 hover:text-red-600 dark:hover:text-red-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
          )}

          <div className="flex rounded-lg p-0.5 mb-8 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => { setMode("signin"); setError("") }}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${isSignIn ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode("signup"); setError("") }}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${!isSignIn ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isSignIn && (
              <div>
                <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-1.5">Name</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 pointer-events-none">
                    <UserIcon />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    className="w-full bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg pl-9 pr-4 py-2.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-1.5">Email</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 pointer-events-none">
                  <MailIcon />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg pl-9 pr-4 py-2.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 pointer-events-none">
                  <LockIcon />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isSignIn ? "Enter your password" : "Create a password"}
                  autoComplete={isSignIn ? "current-password" : "new-password"}
                  className="w-full bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg pl-9 pr-10 py-2.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 outline-none focus:border-purple-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                >
                  <EyeIcon on={showPassword} />
                </button>
              </div>
              {!isSignIn && password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-300 ${strength.color}`} style={{ width: strength.width }} />
                    </div>
                    <span className="text-[11px] text-neutral-400 w-10 text-right">{strength.label}</span>
                  </div>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg py-2.5 text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Spinner />}
              {loading ? (isSignIn ? "Signing in..." : "Creating account...") : (isSignIn ? "Sign in" : "Create account")}
            </button>
          </form>

          <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center mt-8">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={() => { setMode(isSignIn ? "signup" : "signin"); setError("") }} className="text-purple-500 hover:text-purple-600 transition-colors underline">
              {isSignIn ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
