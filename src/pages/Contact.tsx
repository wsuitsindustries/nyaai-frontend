import { Link } from "react-router-dom"
import NLogo from "../components/NLogo"

export default function Contact() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <header className="flex items-center justify-between px-6 py-3 border-b border-neutral-200 dark:border-neutral-800">
        <Link to="/" className="flex items-center gap-2">
          <NLogo className="h-6 w-6" />
          <span className="font-semibold text-neutral-900 dark:text-white text-sm">Nya</span>
        </Link>
        <Link to="/" className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Back to home</Link>
      </header>
      <div className="max-w-xl mx-auto px-6 py-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-2">Contact us</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-10">Get in touch with the Nya team.</p>

        <form className="space-y-5">
          <div>
            <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-1.5">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-1.5">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-1.5">Message</label>
            <textarea
              rows={5}
              placeholder="How can we help you?"
              className="w-full bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 outline-none focus:border-purple-500 transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            onClick={(e) => e.preventDefault()}
            className="px-6 py-2.5 text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 transition-colors rounded-xl"
          >
            Send message
          </button>
        </form>
      </div>
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
            <Link to="/contact" className="text-xs text-purple-500 font-medium">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
