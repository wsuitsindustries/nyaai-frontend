import { useState, useEffect, useCallback, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import NLogo from "../components/ui/NLogo"
import BrandLogo from "../components/ui/BrandLogo"
import LanguageSelector from "../components/ui/LanguageSelector"
import { useAuth } from "../context/AuthContext"

function UploadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function MessageIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function DocIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}

function BrainIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
    </svg>
  )
}

function SparkleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z" />
    </svg>
  )
}

function QuoteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  )
}

export default function Landing() {
  const { user, userName, logout } = useAuth()
  const navigate = useNavigate()
  const [showTyping, setShowTyping] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  useEffect(() => {
    let mounted = true
    let t1: ReturnType<typeof setTimeout>
    let t2: ReturnType<typeof setTimeout>
    let t3: ReturnType<typeof setTimeout>

    function schedule() {
      setShowAnswer(false)
      t1 = setTimeout(() => { if (mounted) setShowTyping(true) }, 900)
      t2 = setTimeout(() => { if (mounted) { setShowTyping(false); setShowAnswer(true) } }, 2400)
      t3 = setTimeout(() => { if (mounted) { setShowAnswer(false); schedule() } }, 7000)
    }

    schedule()
    return () => { mounted = false; clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-neutral-950 pb-16 sm:pb-0">
          <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-10 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <Link to="/" className="flex items-center">
          <BrandLogo className="h-7 w-auto" />
        </Link>
        <nav className="hidden sm:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">How it works</a>
          <a href="#features" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Features</a>
          <Link to="/contact" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Contact</Link>
          <LanguageSelector />
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-8 h-8 rounded-md bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center hover:ring-2 hover:ring-purple-400 transition-all"
              >
                <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                  {(userName?.charAt(0) || user.charAt(0) || "U").toUpperCase()}
                </span>
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg overflow-hidden animate-fade-in z-50">
                  <div className="px-3 py-2.5 border-b border-neutral-100 dark:border-neutral-800">
                    <p className="text-xs font-medium text-neutral-900 dark:text-white truncate">{userName || user}</p>
                    <p className="text-[10px] text-neutral-400 truncate">{user}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                    </svg>
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { logout(); navigate("/"); setProfileOpen(false) }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-red-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Sign In</Link>
              <Link to="/login" className="text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors px-4 py-2 rounded-lg">Get started</Link>
            </>
          )}
        </div>
      </header>

      <section className="min-h-screen flex items-center px-6 lg:px-10 pt-24 pb-16 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-lg">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6 leading-none">
              Ask your<br />company docs
            </h1>
            <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-8 leading-relaxed">
              Upload documents. Ask questions in plain English. Get answers with source citations.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Link
                to="/login"
                className="px-7 py-3 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors rounded-lg"
              >
                Get started free
              </Link>
              <a
                href="#how-it-works"
                className="px-7 py-3 text-sm font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors rounded-lg"
              >
                See how it works
              </a>
            </div>
          </div>

          <div className="hidden lg:flex justify-center" style={{ perspective: '1200px' }}>
            <div className="relative" style={{ transform: 'rotateY(-14deg) rotateX(3deg)', transformStyle: 'preserve-3d' }}>
              {/* Phone body with glossy bevel */}
              <div className="absolute -inset-[3px] rounded-[44px] bg-gradient-to-b from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-800" />
              <div className="absolute -inset-[1px] rounded-[42px] bg-gradient-to-b from-neutral-100 to-neutral-300 dark:from-neutral-600 dark:to-neutral-800" />
              {/* Side buttons */}
              <div className="absolute -right-[3px] top-24 w-[3px] h-8 rounded-r bg-neutral-400 dark:bg-neutral-600" />
              <div className="absolute -right-[3px] top-36 w-[3px] h-12 rounded-r bg-neutral-400 dark:bg-neutral-600" />
              <div className="absolute -right-[3px] top-52 w-[3px] h-12 rounded-r bg-neutral-400 dark:bg-neutral-600" />
              <div className="absolute -left-[3px] top-36 w-[3px] h-10 rounded-l bg-neutral-400 dark:bg-neutral-600" />
              {/* Screen */}
              <div className="relative rounded-[36px] overflow-hidden bg-black flex flex-col shadow-2xl" style={{ width: '250px', height: '500px', boxShadow: '0 8px 40px rgba(0,0,0,0.18), 8px 16px 60px rgba(0,0,0,0.1), -2px 4px 20px rgba(0,0,0,0.06)' }}>
                {/* Glass reflection overlay */}
                <div className="absolute inset-0 rounded-[36px] pointer-events-none z-10" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.03) 100%)' }} />
                {/* Dynamic Island */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
                  <div className="w-[90px] h-[26px] bg-black rounded-full flex items-center justify-center gap-2 px-3">
                    <div className="w-2 h-2 rounded-full bg-neutral-800 border border-neutral-700" />
                  </div>
                </div>
                <div className="h-10 bg-white dark:bg-neutral-950 flex items-center justify-between px-6 text-[10px] shrink-0 relative">
                  <span className="font-semibold text-neutral-900 dark:text-white z-10">9:41</span>
                  <div className="flex items-center gap-1.5 z-10">
                    <svg width="14" height="10" viewBox="0 0 20 12" fill="none">
                      <rect x="0.5" y="1.5" width="17" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" className="text-neutral-900 dark:text-white" fill="none" />
                      <rect x="3" y="4" width="3" height="4" rx="0.5" className="fill-neutral-900 dark:fill-white" />
                      <rect x="7" y="4" width="3" height="4" rx="0.5" className="fill-neutral-900 dark:fill-white" />
                      <rect x="11" y="4" width="3" height="4" rx="0.5" className="fill-neutral-900 dark:fill-white" />
                      <rect x="18" y="4" width="1.5" height="4" rx="0.75" className="fill-neutral-500" />
                    </svg>
                    <span className="text-[8px] font-medium text-neutral-900 dark:text-white">96%</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-neutral-950">
                  <div className="flex-1 overflow-hidden">
                    <div className="h-full overflow-y-auto px-3 pt-3 pb-2 space-y-4">
                      <div className="flex justify-end animate-fade-up">
                        <div className="max-w-[85%] w-fit">
                          <div className="flex items-center gap-2 mb-1 justify-end">
                            <div className="w-6 h-6 rounded-md bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center">
                              <span className="text-[10px] font-semibold text-purple-700 dark:text-purple-300">U</span>
                            </div>
                          </div>
                          <div className="bg-purple-50 dark:bg-purple-500/10 rounded-xl rounded-tr-sm px-3.5 py-2 border border-purple-100 dark:border-purple-500/20">
                            <p className="text-xs text-neutral-900 dark:text-white leading-relaxed">What's our remote work policy?</p>
                          </div>
                        </div>
                      </div>
                      {showTyping && (
                        <div className="animate-fade-in">
                          <div className="flex items-center gap-2">
                            <NLogo className="h-4 w-4" />
                            <div className="flex items-center gap-1 py-1">
                              <span className="text-[10px] text-neutral-400">Searching company knowledge</span>
                              <span className="w-1 h-1 rounded-full bg-purple-500 typing-dot" />
                              <span className="w-1 h-1 rounded-full bg-purple-500 typing-dot" />
                              <span className="w-1 h-1 rounded-full bg-purple-500 typing-dot" />
                            </div>
                          </div>
                        </div>
                      )}
                      {showAnswer && (
                        <div className="animate-fade-up">
                          <div className="max-w-[85%]">
                            <div className="mb-1">
                              <NLogo className="h-5 w-5" />
                            </div>
                            <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed">
                              Based on your company handbook, remote work is allowed on Tuesdays and Thursdays. Core hours are 10am–3pm EST.
                            </p>
                            <div className="mt-2 pt-1.5 border-t border-neutral-200 dark:border-neutral-800">
                              <p className="text-[10px] text-neutral-400 flex items-center gap-1">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                  <polyline points="14 2 14 8 20 8" />
                                </svg>
                                1 source
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="px-3 pb-3 pt-1.5">
                    <div className="flex items-end gap-1.5 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 bg-white dark:bg-neutral-900">
                      <div className="p-1 rounded text-neutral-400">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                        </svg>
                      </div>
                      <div className="flex-1 text-xs text-neutral-400">Ask about your organization's knowledge...</div>
                      <div className="p-1 rounded-md bg-neutral-200 dark:bg-neutral-700 text-neutral-400">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="19" x2="12" y2="5" />
                          <polyline points="5 12 12 5 19 12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-1 rounded-full bg-neutral-300 dark:bg-neutral-700 mx-auto mb-1.5" style={{ width: '120px' }} />
                {/* Home indicator */}
                <div className="pb-1 flex justify-center">
                  <div className="w-[100px] h-[4px] rounded-full bg-neutral-300 dark:bg-neutral-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-10 py-16 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-3 uppercase tracking-wider">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">Get started in three steps</h2>
            <p className="text-base text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto">No setup, no configuration. Just upload and ask.</p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800 -translate-x-1/2" />
            <div className="space-y-12 lg:space-y-0 relative">
              {[
                { side: "left", step: "01", icon: <UploadIcon />, title: "Upload documents", desc: "Drag and drop PDFs, Markdown, CSV, or Word files. We support all common formats.", detail: "Files are automatically parsed and prepared for indexing." },
                { side: "right", step: "02", icon: <BrainIcon />, title: "Automatic indexing", desc: "Your documents are parsed, chunked, and indexed for fast retrieval. No manual setup needed.", detail: "Each document is broken into searchable chunks with vector embeddings." },
                { side: "left", step: "03", icon: <MessageIcon />, title: "Ask anything", desc: "Ask questions in natural language and get answers with direct source citations.", detail: "Answers include the exact document, page, and section for verification." },
              ].map((item) => (
                <div key={item.step} className={`lg:flex items-center ${item.side === "right" ? "lg:flex-row-reverse" : ""} gap-8 lg:gap-16`}>
                  <div className={`lg:w-1/2 ${item.side === "right" ? "lg:ml-auto" : ""} ${item.side === "left" ? "lg:mr-auto" : ""}`}>
                    <div className="relative p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
                      <span className="absolute right-3 top-3 text-4xl sm:text-5xl font-bold text-purple-100 dark:text-purple-500/[0.07] select-none leading-none">
                        {item.step}
                      </span>
                      <div className="flex items-center gap-4 mb-4 relative">
                        <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-neutral-900 dark:text-white">{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed relative">{item.desc}</p>
                      <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-3 flex items-center gap-1.5 relative">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-500"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                        {item.detail}
                      </p>
                    </div>
                  </div>
                  <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-purple-600 ring-4 ring-purple-100 dark:ring-purple-500/20 relative z-10" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-10 py-16 relative">
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-3 uppercase tracking-wider">Features</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">Built for teams that need answers fast</h2>
            <p className="text-base text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto">Everything you need to manage company knowledge in one place.</p>
          </div>

          {(() => {
            const items = [
              { icon: <MessageIcon />, title: "Natural conversations", desc: "Ask questions the same way you'd ask a colleague. No special syntax or commands needed." },
              { icon: <DocIcon />, title: "Smart knowledge base", desc: "Upload PDFs, Markdown, CSV, and more. Automatically indexed and ready to query in seconds." },
              { icon: <SearchIcon />, title: "Source-grounded answers", desc: "Every response cites the exact documents used so you can verify the original source." },
              { icon: <ShieldIcon />, title: "Enterprise security", desc: "Your data is encrypted at rest and in transit. We never share or sell your information." },
              { icon: <BrainIcon />, title: "RAG-powered accuracy", desc: "Retrieval-augmented generation ensures every answer is factual and grounded in your data." },
              { icon: <SparkleIcon />, title: "Continuous learning", desc: "Add documents anytime. Your knowledge base grows and improves with your organization." },
            ]
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [idx, setIdx] = useState(0)
            const prev = useCallback(() => setIdx((i) => (i - 1 + items.length) % items.length), [items.length])
            const next = useCallback(() => setIdx((i) => (i + 1) % items.length), [items.length])
            const f = items[idx]
            return (
              <div className="w-full max-w-3xl mx-auto">
                <div className="relative">
                  <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                    <div className="p-10 sm:p-14 lg:p-16 flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
                        {f.icon}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-4">{f.title}</h3>
                      <p className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-lg">{f.desc}</p>
                      <div className="mt-8 flex items-center gap-2">
                        {items.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setIdx(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${i === idx ? "w-8 bg-purple-500" : "w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={prev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 transition-all shadow-sm"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 transition-all shadow-sm"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>
            )
          })()}
        </div>
      </section>

      <section className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-10 py-16 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-3 uppercase tracking-wider">Testimonials</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-6">Built for real teams</h2>
              <p className="text-base text-neutral-500 dark:text-neutral-400 mb-8 leading-relaxed">
                NyaAI helps organizations reduce the time spent searching for information across documents, wikis, and knowledge bases.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors rounded-lg"
              >
                Start building your knowledge base
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
            <div className="space-y-6">
              <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                <div className="text-purple-500 mb-3"><QuoteIcon /></div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                  "We reduced our onboarding time by 60% using NyaAI. New hires can now find answers to company policies instantly without shadowing senior team members."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-200 dark:bg-purple-500/30 flex items-center justify-center text-xs font-semibold text-purple-700 dark:text-purple-300">SK</div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">Sarah Kim</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">HR Director, CloudScale Inc.</p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                <div className="text-purple-500 mb-3"><QuoteIcon /></div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                  "What used to take hours of digging through shared drives and Slack history now takes seconds. The source citations give us confidence in every answer."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-200 dark:bg-purple-500/30 flex items-center justify-center text-xs font-semibold text-purple-700 dark:text-purple-300">MR</div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">Marcus Rivera</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Engineering Manager, DataSync</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-10 py-16 bg-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 16 64 L 16 18 L 64 64 L 64 18' stroke='%23ffffff' stroke-width='10' stroke-linecap='round' stroke-linejoin='round' fill='none' opacity='0.06' /%3E%3C/svg%3E")`, backgroundSize: '120px 120px' }} />
        <div className="max-w-xl mx-auto w-full relative">
          <div className="bg-white dark:bg-neutral-950 rounded-2xl border border-purple-500/20 p-10 sm:p-14 text-center shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">Ready to get started?</h2>
            <p className="text-base text-neutral-500 dark:text-neutral-400 mb-10 max-w-md mx-auto leading-relaxed">
              Sign up free and start building your knowledge base in minutes. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors rounded-lg"
              >
                Create your free account
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors rounded-lg"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile bottom nav */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-4 py-2 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 safe-bottom">
        <a href="#how-it-works" className="flex flex-col items-center gap-0.5 px-3 py-1 text-neutral-400 dark:text-neutral-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="text-[9px] font-medium">How it works</span>
        </a>
        <a href="#features" className="flex flex-col items-center gap-0.5 px-3 py-1 text-neutral-400 dark:text-neutral-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span className="text-[9px] font-medium">Features</span>
        </a>
        <Link to="/contact" className="flex flex-col items-center gap-0.5 px-3 py-1 text-neutral-400 dark:text-neutral-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="text-[9px] font-medium">Contact</span>
        </Link>
        <div className="flex flex-col items-center gap-0.5 px-3 py-1">
          <LanguageSelector />
        </div>
      </nav>

      <footer className="px-6 lg:px-10 py-8 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <BrandLogo className="h-5 w-auto" />
          </div>
          <p className="text-sm text-neutral-400 dark:text-neutral-500">&copy; {new Date().getFullYear()} NyaAI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <LanguageSelector />
            <Link to="/privacy" className="text-sm text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Privacy</Link>
            <Link to="/terms" className="text-sm text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Terms</Link>
            <Link to="/contact" className="text-sm text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
