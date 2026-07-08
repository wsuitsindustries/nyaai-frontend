import { Link } from "react-router-dom"
import NLogo from "../components/ui/NLogo"
import BrandLogo from "../components/ui/BrandLogo"

export default function Contact() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col">
      <header className="flex items-center justify-between px-8 py-4 border-b border-neutral-200 dark:border-neutral-800">
        <Link to="/" className="flex items-center">
          <BrandLogo className="h-7 w-auto" />
        </Link>
        <Link to="/" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Back to home</Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-8 py-16">
        <div className="max-w-lg mx-auto w-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-2">Contact us</h1>
          <p className="text-base text-neutral-500 dark:text-neutral-400 mb-12">Get in touch with the NyaAI team.</p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-2">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-2">Message</label>
              <textarea
                rows={6}
                placeholder="How can we help you?"
                className="w-full bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 outline-none focus:border-purple-500 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              onClick={(e) => e.preventDefault()}
              className="px-8 py-3 text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 transition-colors rounded-lg"
            >
              Send message
            </button>
          </form>
        </div>
      </main>
      <footer className="px-8 py-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <BrandLogo className="h-5 w-auto" />
          </div>
          <p className="text-sm text-neutral-400 dark:text-neutral-500">&copy; {new Date().getFullYear()} NyaAI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-sm text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Privacy</Link>
            <Link to="/terms" className="text-sm text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Terms</Link>
            <Link to="/contact" className="text-sm text-purple-500 font-medium">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
