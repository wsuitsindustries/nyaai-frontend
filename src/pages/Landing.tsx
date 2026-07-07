import { Link } from "react-router-dom"
import NLogo from "../components/ui/NLogo"

function UploadIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function MessageIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function DocIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}

function BrainIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
    </svg>
  )
}

function SparkleIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

export default function Landing() {
  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-neutral-950">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-white/90 dark:bg-neutral-950/90">
        <Link to="/" className="flex items-center gap-2.5">
          <NLogo className="h-7 w-7" />
          <span className="font-semibold text-neutral-900 dark:text-white text-base">Nya</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-8">
          <Link to="/privacy" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Privacy</Link>
          <Link to="/terms" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Terms</Link>
          <Link to="/contact" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Sign In</Link>
          <Link to="/login" className="text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 transition-colors px-4 py-2 rounded-lg">Get Started</Link>
        </div>
      </header>

      <section className="min-h-screen flex flex-col items-center justify-center px-8 pt-24 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <SparkleIcon />
            <span className="text-sm font-medium text-purple-500 dark:text-purple-400">AI-powered knowledge management</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6 leading-tight">
            Your company knowledge,<br />instantly accessible
          </h1>
          <p className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Upload your documents and ask questions in plain English. Nya delivers precise answers grounded in your organization's knowledge base.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            <span className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500 shrink-0"><polyline points="20 6 9 17 4 12" /></svg>
              No training required
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500 shrink-0"><polyline points="20 6 9 17 4 12" /></svg>
              Source citations included
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500 shrink-0"><polyline points="20 6 9 17 4 12" /></svg>
              Your data stays private
            </span>
          </div>

          <Link
            to="/login"
            className="inline-flex items-center gap-2.5 px-8 py-4 text-base font-medium text-white bg-purple-500 hover:bg-purple-600 transition-colors rounded-lg"
          >
            Get started free
            <ArrowRight />
          </Link>
        </div>
      </section>

      <section className="min-h-screen flex flex-col items-center justify-center px-8 py-12 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-purple-500 dark:text-purple-400 mb-3">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">Three simple steps</h2>
            <p className="text-base text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto">Get your knowledge base up and running in minutes.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: "01", icon: <UploadIcon />, title: "Upload documents", desc: "Drag and drop PDFs, Markdown, CSV, or Word files. We support all common formats." },
              { step: "02", icon: <BrainIcon />, title: "Automatic indexing", desc: "Your documents are parsed, chunked, and indexed for fast retrieval. No manual setup needed." },
              { step: "03", icon: <MessageIcon />, title: "Ask anything", desc: "Ask questions in natural language. Get answers with direct citations to your source documents." },
            ].map((item) => (
              <div key={item.step} className="p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 text-center hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    {item.icon}
                  </div>
                </div>
                <span className="text-sm font-semibold text-purple-500 dark:text-purple-400">{item.step}</span>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mt-3 mb-3">{item.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="min-h-screen flex flex-col items-center justify-center px-8 py-12">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-purple-500 dark:text-purple-400 mb-3">Features</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">Built for teams</h2>
            <p className="text-base text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto">Everything you need to manage company knowledge in one place.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <MessageIcon />, title: "Natural conversations", desc: "Ask questions the same way you'd ask a colleague. No special syntax or commands needed." },
              { icon: <DocIcon />, title: "Smart knowledge base", desc: "Upload PDFs, Markdown, CSV, and more. Automatically indexed and ready to query in seconds." },
              { icon: <SearchIcon />, title: "Source-grounded answers", desc: "Every response cites the exact documents used. Verify answers by reviewing the original sources." },
              { icon: <ShieldIcon />, title: "Enterprise security", desc: "Your data is encrypted at rest and in transit. We never share or sell your information." },
              { icon: <BrainIcon />, title: "RAG-powered accuracy", desc: "Retrieval-augmented generation ensures answers are factual and grounded in your documents." },
              { icon: <SparkleIcon />, title: "Continuous learning", desc: "Add documents anytime. Your knowledge base grows with your organization." },
            ].map((f) => (
              <div key={f.title} className="p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-5">
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="min-h-screen flex flex-col items-center justify-center px-8 py-12 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-2xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mx-auto mb-8">
            <SparkleIcon />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">Ready to get started?</h2>
          <p className="text-base text-neutral-500 dark:text-neutral-400 mb-10 max-w-md mx-auto">
            Sign up free and start building your knowledge base in minutes. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="inline-flex items-center gap-2.5 px-8 py-4 text-base font-medium text-white bg-purple-500 hover:bg-purple-600 transition-colors rounded-lg"
            >
              Create your account
              <ArrowRight />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2.5 px-8 py-4 text-base font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors rounded-lg"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-8 py-8 bg-white dark:bg-neutral-950">
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
