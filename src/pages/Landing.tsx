import { useState, type KeyboardEvent, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import NLogo from "../components/ui/NLogo"

const MAX_DEMO_MSGS = 3
const DEMO_RESPONSES = [
  "Based on your company handbook, remote work is allowed on Tuesdays and Thursdays. Core hours are 10am–3pm EST.",
  "Our onboarding guide covers setting up your dev environment. You'll need Node.js 18+ and Docker installed.",
  "The Q3 roadmap includes platform migration, API v2 launch, and performance optimization.",
  "According to security policy, all passwords must be 12+ characters with MFA enabled.",
  "The vacation policy allows 15 days of PTO per year, accrued monthly. Manager approval required.",
]

export default function Landing() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [demoActive, setDemoActive] = useState(false)
  const [showLimitModal, setShowLimitModal] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages])

  const userCount = messages.filter((m) => m.role === "user").length
  const limitReached = userCount >= MAX_DEMO_MSGS

  useEffect(() => {
    if (limitReached && messages.length > 0) setShowLimitModal(true)
  }, [limitReached, messages.length])

  function send(text?: string) {
    const msg = (text ?? input).trim()
    if (!msg || loading || limitReached) return
    if (!demoActive) setDemoActive(true)
    setInput("")
    setMessages((p) => [...p, { role: "user", text: msg }])
    setLoading(true)
    setTimeout(() => {
      setMessages((p) => [...p, { role: "assistant", text: DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)] }])
      setLoading(false)
    }, 800 + Math.random() * 600)
  }

  function keydown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() }
  }

  function resetDemo() {
    setDemoActive(false)
    setMessages([])
    setInput("")
  }

  if (demoActive) {
    return (
      <div className="h-full flex flex-col bg-white dark:bg-neutral-950">
        <header className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 shrink-0">
          <button onClick={resetDemo} className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </button>
          <div className="flex items-center gap-2">
            <NLogo className="h-5 w-5" />
            <span className="text-sm font-semibold text-neutral-900 dark:text-white">Nya AI Demo</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-full">Sample data</span>
            <Link to="/login" className="text-xs font-medium text-white bg-purple-500 hover:bg-purple-600 transition-colors px-3 py-1.5 rounded-lg">Get Started</Link>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-2xl mx-auto space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2 pt-12 pb-4">
                <button onClick={() => send("What is your remote work policy?")} className="text-xs text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 rounded-full px-3 py-1.5 hover:border-neutral-300 dark:hover:border-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">Talk with Nya</button>
                <button onClick={() => send("How do I set up my development environment?")} className="text-xs text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 rounded-full px-3 py-1.5 hover:border-neutral-300 dark:hover:border-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">Upload Documents</button>
                <button onClick={() => send("What's coming in the Q3 roadmap?")} className="text-xs text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 rounded-full px-3 py-1.5 hover:border-neutral-300 dark:hover:border-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">How it works</button>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.role === "user" ? "bg-purple-500 text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200"}`}>{msg.text}</div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
        </div>

        <div className="border-t border-neutral-200 dark:border-neutral-800 px-4 py-4 shrink-0">
          <div className="max-w-2xl mx-auto">
            {limitReached ? (
              <div className="text-center py-3">
                <Link to="/login" className="text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 transition-colors px-5 py-2 rounded-xl inline-block">Sign up to continue</Link>
              </div>
            ) : (
              <div className="border border-neutral-300 dark:border-neutral-700 rounded-2xl bg-white dark:bg-neutral-900 p-3 transition-shadow focus-within:shadow-md focus-within:border-purple-400 dark:focus-within:border-purple-500">
                <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={keydown} placeholder="Message Nya..." rows={2} className="w-full resize-none bg-transparent text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 outline-none" />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-neutral-400 dark:text-neutral-500">{userCount} of {MAX_DEMO_MSGS} messages</span>
                  <button onClick={() => send()} disabled={!input.trim() || loading} className="p-1.5 rounded-lg bg-purple-500 text-white hover:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polyline points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {showLimitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={() => setShowLimitModal(false)}>
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl max-w-sm w-full p-8 text-center" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-center mb-4"><NLogo className="h-10 w-10" /></div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">You've reached the demo limit</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">Sign up to continue using Nya AI with unlimited messages.</p>
              <Link to="/login" className="block w-full text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 transition-colors py-2.5 rounded-xl mb-3 text-center">Sign up free</Link>
              <Link to="/login" className="block w-full text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors py-2 text-center">Already have an account? Sign in</Link>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-neutral-950">
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-2.5 backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <NLogo className="h-6 w-6" />
          <span className="font-semibold text-neutral-900 dark:text-white text-sm">Nya</span>
        </div>
        <div className="hidden sm:flex items-center gap-5">
          <Link to="/privacy" className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Privacy</Link>
          <Link to="/terms" className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Terms</Link>
          <Link to="/contact" className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Contact</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Sign In</Link>
          <Link to="/login" className="text-xs font-medium text-white bg-purple-500 hover:bg-purple-600 transition-colors px-3 py-1.5 rounded-lg">Get Started</Link>
        </div>
      </header>

      <section className="px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500 mb-4">Nya AI</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white mb-8">What can I help with?</h1>

          <div className="relative mb-6">
            <div className="border border-neutral-300 dark:border-neutral-700 rounded-2xl shadow-sm bg-white dark:bg-neutral-900 p-3 transition-shadow focus-within:shadow-md focus-within:border-purple-400 dark:focus-within:border-purple-500">
              <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={keydown} placeholder="Message Nya..." rows={2} className="w-full resize-none bg-transparent text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 outline-none" />
              <div className="flex items-center justify-between mt-2">
                <button className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </button>
                <button onClick={() => send()} disabled={!input.trim() || loading} className="p-1.5 rounded-lg bg-purple-500 text-white hover:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polyline points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <button onClick={() => send("What is your remote work policy?")} className="text-xs text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 rounded-full px-3 py-1.5 hover:border-neutral-300 dark:hover:border-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">Talk with Nya</button>
            <button onClick={() => send("How do I set up my development environment?")} className="text-xs text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 rounded-full px-3 py-1.5 hover:border-neutral-300 dark:hover:border-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">Upload Documents</button>
            <button onClick={() => send("What's coming in the Q3 roadmap?")} className="text-xs text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 rounded-full px-3 py-1.5 hover:border-neutral-300 dark:hover:border-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">How it works</button>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: "Natural Conversations", desc: "Ask questions in plain English and get precise answers from your knowledge base." },
              { title: "Smart Knowledge Base", desc: "Upload PDFs, Markdown, CSV, and more. Automatically indexed and ready to query." },
              { title: "Powered by RAG", desc: "Every answer is grounded in your actual documents with source citations." },
            ].map((f) => (
              <div key={f.title} className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1.5">{f.title}</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-6 py-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <NLogo className="h-4 w-4" />
            <span className="text-xs text-neutral-500 dark:text-neutral-400">Nya</span>
          </div>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">&copy; {new Date().getFullYear()} Nya.</p>
          <div className="flex items-center gap-3">
            <Link to="/privacy" className="text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Privacy</Link>
            <Link to="/terms" className="text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Terms</Link>
            <Link to="/contact" className="text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
