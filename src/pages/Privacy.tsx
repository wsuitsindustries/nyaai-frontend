import { Link } from "react-router-dom"
import NLogo from "../components/ui/NLogo"

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <header className="flex items-center justify-between px-6 py-3 border-b border-neutral-200 dark:border-neutral-800">
        <Link to="/" className="flex items-center gap-2">
          <NLogo className="h-6 w-6" />
          <span className="font-semibold text-neutral-900 dark:text-white text-sm">Nya</span>
        </Link>
        <Link to="/" className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Back to home</Link>
      </header>
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          <p>Last updated: {new Date().getFullYear()}</p>

          <section>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, including account information (name, email address, password), documents you upload for knowledge base indexing, and any messages or queries you submit through our services.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-3">2. How We Use Your Information</h2>
            <p>We use the collected information to provide, maintain, and improve our services; to process your queries and generate responses based on your uploaded documents; to communicate with you about your account and service updates; and to ensure the security and integrity of our platform.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-3">3. Data Storage and Security</h2>
            <p>Your data is stored securely using industry-standard encryption at rest and in transit. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-3">4. Data Sharing</h2>
            <p>We do not sell your personal information. We may share data with trusted service providers who assist in operating our platform, subject to strict confidentiality agreements. We may also disclose information if required by law or to protect our rights.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-3">5. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. You can manage your account settings or contact us to exercise these rights. We will respond to your request within a reasonable timeframe.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-3">6. Contact</h2>
            <p>If you have questions about this Privacy Policy, please contact us through our <Link to="/contact" className="text-purple-500 hover:text-purple-600 transition-colors">Contact page</Link>.</p>
          </section>
        </div>
      </div>
      <footer className="px-6 py-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <NLogo className="h-4 w-4" />
            <span className="text-xs text-neutral-500 dark:text-neutral-400">Nya</span>
          </div>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">&copy; {new Date().getFullYear()} Nya.</p>
          <div className="flex items-center gap-3">
            <Link to="/privacy" className="text-xs text-purple-500 font-medium">Privacy</Link>
            <Link to="/terms" className="text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Terms</Link>
            <Link to="/contact" className="text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
