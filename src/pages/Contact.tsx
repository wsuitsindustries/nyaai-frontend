import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import BrandLogo from "../components/ui/BrandLogo"
import LanguageSelector from "../components/ui/LanguageSelector"

export default function Contact() {
  const [sent, setSent] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const form = formRef.current
    if (!form) return
    const name = (form.elements.namedItem("name") as HTMLInputElement).value
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value
    if (!name || !email || !message) return

    const subject = encodeURIComponent(`Contact from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)
    window.location.href = `mailto:wsuits6@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-neutral-950">
      <header className="flex items-center justify-between px-6 lg:px-10 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <Link to="/" className="flex items-center">
          <BrandLogo className="h-7 w-auto" />
        </Link>
        <Link to="/" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Back to home</Link>
      </header>
      <main className="px-6 lg:px-10 py-16">
        <div className="max-w-lg mx-auto w-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-2">Contact us</h1>
          <p className="text-base text-neutral-500 dark:text-neutral-400 mb-12">Get in touch with the NyaAI team.</p>

          {sent ? (
            <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl p-8 text-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500 mx-auto mb-3">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-1">Message sent!</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">We'll get back to you as soon as possible.</p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 rounded-lg transition-all"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-2">Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  className="w-full bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-2">Message</label>
                <textarea
                  name="message"
                  rows={6}
                  placeholder="How can we help you?"
                  required
                  className="w-full bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 outline-none focus:border-purple-500 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 transition-colors rounded-lg"
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </main>
      <footer className="px-6 lg:px-10 py-8 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
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
