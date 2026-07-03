import { useState, useEffect, useCallback, useId } from "react"

function NLogo({ className = "h-8 w-8" }: { className?: string }) {
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

function GlowOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-3xl" />
    </div>
  )
}

function ChatMockup() {
  return (
    <div className="relative w-full max-w-lg mx-auto rounded-2xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-sm shadow-2xl shadow-purple-500/5 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-neutral-700" />
          <div className="w-3 h-3 rounded-full bg-neutral-700" />
          <div className="w-3 h-3 rounded-full bg-neutral-700" />
        </div>
        <div className="flex-1 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs text-neutral-400">
            <NLogo className="h-3.5 w-3.5" />
            <span>Nya AI Chat</span>
          </div>
        </div>
      </div>
      <div className="p-5 space-y-4">
        <div className="flex justify-start">
          <div className="max-w-[80%]">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-5 h-5 rounded bg-purple-500/20 flex items-center justify-center">
                <NLogo className="h-3 w-3" />
              </div>
              <span className="text-[10px] text-neutral-500">Assistant</span>
            </div>
            <div className="bg-neutral-900 rounded-xl rounded-tl-sm px-3.5 py-2.5 border border-neutral-800">
              <p className="text-xs text-neutral-300 leading-relaxed">Hello! I can help you find information from your organization's knowledge base. What would you like to know?</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[80%]">
            <div className="flex items-center gap-2 mb-1.5 justify-end">
              <span className="text-[10px] text-neutral-500">You</span>
              <div className="w-5 h-5 rounded bg-purple-500/20 flex items-center justify-center">
                <span className="text-[9px] font-semibold text-purple-300">U</span>
              </div>
            </div>
            <div className="bg-purple-500/10 rounded-xl rounded-tr-sm px-3.5 py-2.5 border border-purple-500/20">
              <p className="text-xs text-neutral-200 leading-relaxed">What is our remote work policy?</p>
            </div>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[80%]">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-5 h-5 rounded bg-purple-500/20 flex items-center justify-center">
                <NLogo className="h-3 w-3" />
              </div>
              <span className="text-[10px] text-neutral-500">Assistant</span>
            </div>
            <div className="bg-neutral-900 rounded-xl rounded-tl-sm px-3.5 py-2.5 border border-neutral-800">
              <p className="text-xs text-neutral-300 leading-relaxed">Based on the company handbook:</p>
              <ul className="mt-1.5 space-y-1">
                <li className="text-[11px] text-purple-300">• Remote work allowed Tue/Thu</li>
                <li className="text-[11px] text-purple-300">• Core hours 10am-3pm EST</li>
                <li className="text-[11px] text-purple-300">• Hybrid team meetings Wed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 border-t border-neutral-800">
        <div className="flex items-center gap-2 border border-neutral-700 rounded-lg px-3 py-2 bg-neutral-900/50">
          <div className="w-4 h-4 rounded bg-neutral-800" />
          <div className="flex-1 h-3 rounded bg-neutral-800" />
          <div className="w-6 h-6 rounded-md bg-purple-500/30" />
        </div>
      </div>
    </div>
  )
}

function BucketsMockup() {
  return (
    <div className="relative w-full max-w-lg mx-auto rounded-2xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-sm shadow-2xl shadow-purple-500/5 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-neutral-700" />
          <div className="w-3 h-3 rounded-full bg-neutral-700" />
          <div className="w-3 h-3 rounded-full bg-neutral-700" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-neutral-400">Knowledge Base</span>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900 border border-neutral-800">
          <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-neutral-200">Company Handbook.pdf</div>
            <div className="text-[11px] text-neutral-500">245 KB • 47 chunks</div>
          </div>
          <div className="px-2 py-0.5 text-[10px] text-green-400 bg-green-500/10 rounded-full">Indexed</div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900 border border-neutral-800">
          <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-neutral-200">Onboarding Guide.md</div>
            <div className="text-[11px] text-neutral-500">12 KB • 8 chunks</div>
          </div>
          <div className="px-2 py-0.5 text-[10px] text-green-400 bg-green-500/10 rounded-full">Indexed</div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/50 border border-dashed border-neutral-700">
          <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          <span className="text-sm text-neutral-500">Upload new document...</span>
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    id: "chat",
    title: "Natural Conversations",
    description: "Ask questions in plain English and get precise answers from your organization's knowledge base. No complex queries, just talk.",
    mockup: <ChatMockup />,
  },
  {
    id: "knowledge",
    title: "Smart Knowledge Base",
    description: "Upload PDFs, Markdown, CSV, and more. Your documents are automatically chunked, indexed, and ready to query.",
    mockup: <BucketsMockup />,
  },
  {
    id: "search",
    title: "Powered by RAG",
    description: "Retrieval-Augmented Generation ensures every answer is grounded in your actual documents, not hallucinations.",
    mockup: (
      <div className="relative w-full max-w-lg mx-auto rounded-2xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-sm shadow-2xl shadow-purple-500/5 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <div className="flex-1 text-center">
            <span className="text-xs text-neutral-400">RAG Pipeline</span>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <div className="flex-1 h-2 rounded-full bg-neutral-800 overflow-hidden">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-purple-500 to-violet-600" />
            </div>
            <span className="text-[11px] text-purple-400">Retrieval</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 3 21 3 21 8" />
                <line x1="4" y1="20" x2="21" y2="3" />
                <polyline points="21 16 21 21 16 21" />
                <line x1="15" y1="15" x2="21" y2="21" />
                <line x1="4" y1="4" x2="9" y2="9" />
              </svg>
            </div>
            <div className="flex-1 h-2 rounded-full bg-neutral-800 overflow-hidden">
              <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-purple-500 to-violet-600" />
            </div>
            <span className="text-[11px] text-purple-400">Embedding</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div className="flex-1 h-2 rounded-full bg-neutral-800 overflow-hidden">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-purple-500 to-violet-600" />
            </div>
            <span className="text-[11px] text-purple-400">Generation</span>
          </div>
          <div className="mt-3 p-3 rounded-xl bg-neutral-900 border border-neutral-800">
            <div className="flex items-start gap-2">
              <NLogo className="h-4 w-4 mt-0.5 shrink-0" />
              <p className="text-xs text-neutral-300 leading-relaxed">Answers are generated from your indexed documents, not generic AI. Every response cites its sources.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
]

const steps = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
    title: "Upload Documents",
    description: "Drag and drop your PDFs, Markdown files, or CSVs. We handle the rest.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: "Ask Anything",
    description: "Type natural language questions. Our RAG engine searches your knowledge base for the most relevant content.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    title: "Get Accurate Answers",
    description: "Receive precise answers with source citations. Every response is grounded in your actual documents.",
  },
]

function FeaturesCarousel() {
  const [active, setActive] = useState(0)
  const total = features.length

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % total)
    }, 5000)
    return () => clearInterval(timer)
  }, [total])

  const goTo = useCallback((i: number) => setActive(i), [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 snap-start bg-neutral-950">
      <GlowOrbs />
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Everything you need in one place
          </h2>
          <p className="text-neutral-400 text-sm md:text-base max-w-xl mx-auto">
            From natural conversations to document management, Nya AI brings your organization's knowledge together.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <div className="space-y-4">
              {features.map((f, i) => (
                <button
                  key={f.id}
                  onClick={() => goTo(i)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                    i === active
                      ? "bg-purple-500/10 border-purple-500/30 shadow-lg shadow-purple-500/5"
                      : "bg-neutral-900/50 border-neutral-800 hover:border-neutral-700"
                  }`}
                >
                  <div className={`text-sm font-semibold mb-1 transition-colors ${
                    i === active ? "text-white" : "text-neutral-400"
                  }`}>
                    {f.title}
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed">{f.description}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative">
              {features.map((f, i) => (
                <div
                  key={f.id}
                  className={`transition-all duration-500 ${
                    i === active ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute inset-0 pointer-events-none"
                  }`}
                >
                  {f.mockup}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {features.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-purple-500" : "w-1.5 bg-neutral-700 hover:bg-neutral-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Landing({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="h-full overflow-y-auto snap-y snap-mandatory scroll-smooth bg-neutral-950">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 snap-start bg-neutral-950 overflow-hidden">
        <GlowOrbs />
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-neutral-950/60 border-b border-neutral-800/50">
          <div className="flex items-center gap-2">
            <NLogo className="h-6 w-6" />
            <span className="font-semibold text-white text-sm">Nya AI</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onGetStarted}
              className="text-xs text-neutral-400 hover:text-white transition-colors px-3 py-1.5"
            >
              Sign In
            </button>
            <button
              onClick={onGetStarted}
              className="text-xs font-medium text-white bg-purple-500 hover:bg-purple-600 transition-all px-4 py-1.5 rounded-lg"
            >
              Get Started
            </button>
          </div>
        </nav>

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="mb-6 p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 animate-float">
            <NLogo className="h-14 w-14 md:h-16 md:w-16" />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            <span className="gradient-text">Your knowledge,</span>
            <br />
            <span className="text-white">supercharged by AI</span>
          </h1>
          <p className="text-neutral-400 text-sm md:text-base lg:text-lg max-w-xl mb-8 leading-relaxed">
            Upload your organization's documents and ask questions in natural language. 
            Nya AI gives you precise answers grounded in your data — not generic AI guesses.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onGetStarted}
              className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 rounded-xl transition-all shadow-lg shadow-purple-500/25 animate-glow"
            >
              Get Started Free
            </button>
            <button
              onClick={() => {
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="px-6 py-3 text-sm font-medium text-neutral-300 border border-neutral-700 hover:border-neutral-500 hover:text-white rounded-xl transition-all"
            >
              See How It Works
            </button>
          </div>
          <div className="mt-12 flex items-center gap-6 text-xs text-neutral-500">
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              No training on your data
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              SOC 2 compliant
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              Enterprise-grade security
            </span>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* Features Carousel */}
      <div id="features">
        <FeaturesCarousel />
      </div>

      {/* How It Works */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 snap-start bg-neutral-950">
        <GlowOrbs />
        <div className="relative z-10 w-full max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              How it works
            </h2>
            <p className="text-neutral-400 text-sm md:text-base max-w-lg mx-auto">
              Three simple steps to transform your documents into an intelligent knowledge base.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group">
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-5 group-hover:bg-purple-500/20 transition-all">
                  {step.icon}
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[calc(100%-4rem)] h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
                )}
                <div className="text-xs text-purple-400 font-medium mb-2">Step {i + 1}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-neutral-400 max-w-xs leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / CTA */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 snap-start bg-neutral-950">
        <GlowOrbs />
        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="mb-8 p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20">
            <NLogo className="h-10 w-10" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-neutral-400 text-sm md:text-base mb-8 leading-relaxed max-w-md">
            Join your team's knowledge base today. Upload documents, ask questions, and get answers in seconds.
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-3.5 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 rounded-xl transition-all shadow-lg shadow-purple-500/25 animate-glow"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 snap-start bg-neutral-950 border-t border-neutral-800/50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <NLogo className="h-5 w-5" />
            <span className="text-sm text-neutral-300">Nya AI</span>
          </div>
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Nya AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">Privacy</button>
            <button className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">Terms</button>
            <button onClick={onGetStarted} className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
