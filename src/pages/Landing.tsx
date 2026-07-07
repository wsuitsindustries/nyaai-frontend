import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import NLogo from "../components/ui/NLogo"

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
  const [showTyping, setShowTyping] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

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
    <div className="h-full overflow-y-auto bg-white dark:bg-neutral-950">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-10 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <Link to="/" className="flex items-center gap-2.5">
          <NLogo className="h-7 w-7" />
          <span className="font-semibold text-neutral-900 dark:text-white text-base">Nya</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">How it works</a>
          <a href="#features" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Features</a>
          <Link to="/contact" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Contact</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Sign In</Link>
          <Link to="/login" className="text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors px-4 py-2 rounded-lg">Get Started</Link>
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

          <div className="hidden lg:block">
            <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-lg bg-white dark:bg-neutral-950 flex" style={{ height: '420px' }}>
              <div className="w-14 flex flex-col bg-neutral-50 dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 shrink-0">
                <div className="flex flex-col items-center pt-3 pb-1 space-y-0.5">
                  <div className="p-1.5">
                    <NLogo className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center pt-2 space-y-0.5 px-1.5">
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all cursor-default">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col items-center pb-2 space-y-0.5 px-1.5">
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all cursor-default">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      <line x1="8" y1="7" x2="16" y2="7" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </div>
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all cursor-default">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                  </div>
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg text-neutral-400 hover:text-red-500 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all cursor-default">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-neutral-950">
                <div className="flex-1 overflow-hidden">
                  <div className="h-full overflow-y-auto p-4 space-y-5">
                    <div className="flex justify-end px-4 animate-fade-up">
                      <div className="max-w-[75%] w-fit">
                        <div className="flex items-center gap-2 mb-1 justify-end">
                          <div className="w-7 h-7 rounded-md bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center">
                            <span className="text-xs font-semibold text-purple-700 dark:text-purple-300">U</span>
                          </div>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-500/10 rounded-xl rounded-tr-sm px-4 py-2.5 border border-purple-100 dark:border-purple-500/20">
                          <p className="text-sm text-neutral-900 dark:text-white leading-relaxed">What's our remote work policy?</p>
                        </div>
                      </div>
                    </div>
                    {showTyping && (
                      <div className="px-4 animate-fade-in">
                        <div className="flex items-center gap-2">
                          <NLogo className="h-5 w-5" />
                          <div className="flex items-center gap-1 py-1">
                            <span className="text-xs text-neutral-400">Searching company knowledge</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 typing-dot" />
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 typing-dot" />
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 typing-dot" />
                          </div>
                        </div>
                      </div>
                    )}
                    {showAnswer && (
                      <div className="px-4 animate-fade-up">
                        <div className="max-w-[75%]">
                          <div className="mb-1.5">
                            <NLogo className="h-7 w-7" />
                          </div>
                          <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
                            Based on your company handbook, remote work is allowed on Tuesdays and Thursdays. Core hours are 10am–3pm EST.
                          </p>
                          <div className="mt-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                            <p className="text-xs text-neutral-400 flex items-center gap-1.5">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                <div className="px-4 pb-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-end gap-2 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 bg-white dark:bg-neutral-900 transition-all shadow-sm">
                    <div className="p-1 rounded-md text-neutral-400">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                      </svg>
                    </div>
                    <div className="flex-1 text-sm text-neutral-400">Ask about your organization's knowledge...</div>
                    <div className="p-1.5 rounded-md bg-neutral-200 dark:bg-neutral-700 text-neutral-400">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="19" x2="12" y2="5" />
                        <polyline points="5 12 12 5 19 12" />
                      </svg>
                    </div>
                  </div>
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
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-6">Trusted by teams that value their time</h2>
              <p className="text-base text-neutral-500 dark:text-neutral-400 mb-8 leading-relaxed">
                Nya helps organizations reduce the time spent searching for information across documents, wikis, and knowledge bases.
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
                  "We used to spend hours digging through Slack threads and Google Docs. Now we just ask Nya and get the answer in seconds."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-200 dark:bg-purple-500/30 flex items-center justify-center text-xs font-semibold text-purple-700 dark:text-purple-300">JD</div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">Jane Doe</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Engineering Lead, TechCorp</p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                <div className="text-purple-500 mb-3"><QuoteIcon /></div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                  "Onboarding new team members used to take weeks of shadowing. With Nya, they can find answers independently on day one."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-200 dark:bg-purple-500/30 flex items-center justify-center text-xs font-semibold text-purple-700 dark:text-purple-300">MS</div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">Mike Smith</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Operations Director, Startup Inc.</p>
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

      <footer className="px-6 lg:px-10 py-8 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <NLogo className="h-5 w-5" />
            <span className="text-sm text-neutral-500 dark:text-neutral-400">Nya</span>
          </div>
          <p className="text-sm text-neutral-400 dark:text-neutral-500">&copy; {new Date().getFullYear()} Nya AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-sm text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Privacy</Link>
            <Link to="/terms" className="text-sm text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Terms</Link>
            <Link to="/contact" className="text-sm text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
