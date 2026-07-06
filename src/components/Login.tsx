import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { login, register, setAuthToken } from "../services/api"
import NLogo from "./NLogo"

type Mode = "signin" | "signup"

export default function Login({ onLogin: onLoginProp }: { onLogin?: (email: string) => void }) {
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>("signin")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showOAuthModal, setShowOAuthModal] = useState(false)
  const [oauthProvider, setOAuthProvider] = useState("")
  const isSignIn = mode === "signin"

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
      if (onLoginProp) onLoginProp(res.email)
      navigate("/", { replace: true })
    } catch (err: any) {
      setError(err.message || "Authentication failed")
    }
    setLoading(false)
  }

  function handleOAuth(provider: string) {
    setOAuthProvider(provider)
    setShowOAuthModal(true)
  }

  return (
    <div className="h-full flex bg-white dark:bg-neutral-950">
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-violet-900 items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(124,58,237,0.2),transparent_50%)]" />
        <div className="relative z-10 text-center px-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <NLogo className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Welcome to Nya</h2>
          <p className="text-purple-200 text-base leading-relaxed max-w-sm mx-auto">
            Your AI-powered knowledge base. Upload documents, ask questions, and get instant answers grounded in your data.
          </p>
          <div className="mt-10 flex justify-center gap-3">
            {["Upload", "Ask", "Get Answers"].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-xs font-semibold text-white">{i + 1}</div>
                <span className="text-xs text-purple-200">{step}</span>
                {i < 2 && <div className="w-6 h-px bg-white/10 mx-1" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-8 overflow-y-auto">
        <div className="w-full max-w-sm">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to home
          </Link>

          <div className="flex justify-center mb-6 lg:hidden">
            <Link to="/">
              <NLogo className="h-10 w-10" />
            </Link>
          </div>

          <h1 className="text-xl font-semibold text-neutral-900 dark:text-white text-center mb-1">
            {isSignIn ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center mb-8">
            {isSignIn ? "Sign in to Nya AI" : "Get started with Nya AI"}
          </p>

          {error && (
            <p className="text-sm text-red-500 text-center mb-4">{error}</p>
          )}

          <div className="space-y-3 mb-6">
            <button onClick={() => handleOAuth("Google")} className="w-full flex items-center justify-center gap-2.5 border border-neutral-300 dark:border-neutral-700 rounded-xl py-2.5 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
            <button onClick={() => handleOAuth("GitHub")} className="w-full flex items-center justify-center gap-2.5 border border-neutral-300 dark:border-neutral-700 rounded-xl py-2.5 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Continue with GitHub
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200 dark:border-neutral-800" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white dark:bg-neutral-950 px-2 text-neutral-400 dark:text-neutral-500">or</span>
            </div>
          </div>

          <div className="flex rounded-xl p-0.5 mb-8 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <button onClick={() => setMode("signin")} className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${isSignIn ? "bg-purple-500 text-white shadow-sm" : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"}`}>
              Sign In
            </button>
            <button onClick={() => setMode("signup")} className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${!isSignIn ? "bg-purple-500 text-white shadow-sm" : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"}`}>
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isSignIn && (
              <div>
                <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-1.5">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 outline-none focus:border-purple-500 transition-colors" />
              </div>
            )}
            <div>
              <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 outline-none focus:border-purple-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-1.5">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={isSignIn ? "Enter your password" : "Create a password"} className="w-full bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 outline-none focus:border-purple-500 transition-colors" />
            </div>
            <button type="submit" disabled={loading} className="w-full rounded-xl py-2.5 text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (isSignIn ? "Signing in..." : "Creating account...") : (isSignIn ? "Sign in" : "Create account")}
            </button>
          </form>

          <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center mt-8">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={() => setMode(isSignIn ? "signup" : "signin")} className="text-purple-500 hover:text-purple-600 transition-colors underline">
              {isSignIn ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>

      {showOAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={() => setShowOAuthModal(false)}>
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl max-w-sm w-full p-8 text-center" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
            </div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Coming soon</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">Sign in with {oauthProvider} is not available yet. Please use email and password to sign in.</p>
            <button onClick={() => setShowOAuthModal(false)} className="w-full text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 transition-colors py-2.5 rounded-xl">Got it</button>
          </div>
        </div>
      )}
    </div>
  )
}
