import { useState, useCallback } from "react"
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
            <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-neutral-950">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="text-[11px] text-neutral-400 ml-2">Nya AI</span>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex justify-end">
                  <div className="max-w-[80%] flex flex-col items-end">
                    <div className="bg-purple-50 dark:bg-purple-500/10 rounded-xl rounded-tr-sm px-4 py-2.5 border border-purple-100 dark:border-purple-500/20">
                      <p className="text-sm text-neutral-900 dark:text-white">What's our remote work policy?</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[80%]">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-md bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                        <NLogo className="h-3.5 w-3.5 text-neutral-600 dark:text-neutral-400" />
                      </div>
                    </div>
                    <div className="bg-neutral-100 dark:bg-neutral-900 rounded-xl rounded-tl-sm px-4 py-2.5 border border-neutral-200 dark:border-neutral-800">
                      <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
                        Based on your company handbook, remote work is allowed on Tuesdays and Thursdays. Core hours are 10am–3pm EST.
                      </p>
                      <div className="mt-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                        <p className="text-[11px] text-neutral-400">Source: Employee Handbook 2024 (p. 12)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-3 border-t border-neutral-200 dark:border-neutral-800">
                <button className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                </button>
                <div className="flex-1 text-sm text-neutral-400">Ask about your organization's knowledge...</div>
                <div className="w-7 h-7 rounded-md bg-purple-500 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="19" x2="12" y2="5" />
                    <polyline points="5 12 12 5 19 12" />
                  </svg>
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
                  <div className="lg:w-1/2">
                    <div className={`p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 ${item.side === "right" ? "lg:ml-auto" : ""} max-w-lg`}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-neutral-900 dark:text-white">{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
                      <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-3 flex items-center gap-1.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-500"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                        {item.detail}
                      </p>
                    </div>
                  </div>
                  <div className="flex lg:w-1/2 items-center justify-center lg:justify-center mt-4 lg:mt-0">
                    <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs lg:text-sm font-bold relative z-10">
                      {item.step}
                    </div>
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

      <section className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-10 py-16 bg-purple-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-base text-purple-100 mb-10 max-w-md mx-auto leading-relaxed">
            Sign up free and start building your knowledge base in minutes. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium text-purple-600 bg-white hover:bg-purple-50 transition-colors rounded-lg"
            >
              Create your free account
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium text-white border border-purple-400 hover:bg-purple-700 transition-colors rounded-lg"
            >
              Learn more
            </a>
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
