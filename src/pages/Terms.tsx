import { Link } from "react-router-dom"
import NLogo from "../components/ui/NLogo"
import BrandLogo from "../components/ui/BrandLogo"

export default function Terms() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col">
      <header className="flex items-center justify-between px-8 py-4 border-b border-neutral-200 dark:border-neutral-800">
        <Link to="/" className="flex items-center">
          <BrandLogo className="h-7 w-auto" />
        </Link>
        <Link to="/" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Back to home</Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-8 py-16">
        <div className="max-w-2xl mx-auto w-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-2">Terms of Service</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-10">Last updated: {new Date().getFullYear()}</p>
          <div className="space-y-8 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using NyaAI, you agree to be bound by these Terms of Service. If you do not agree, you may not use the service. We reserve the right to update these terms at any time, and continued use constitutes acceptance of changes.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">2. Service Description</h2>
              <p>NyaAI provides an AI-powered knowledge management platform that allows users to upload documents and query their contents using natural language. The service uses retrieval-augmented generation to provide accurate, source-grounded responses based on your uploaded documents.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">3. User Responsibilities</h2>
              <p>You are responsible for maintaining the confidentiality of your account credentials. You agree not to use the service for any unlawful purpose or to upload content that violates intellectual property rights, contains malware, or is otherwise harmful.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">4. Data Ownership</h2>
              <p>You retain full ownership of the documents you upload and the content you create. We do not claim any intellectual property rights over your data. You grant us a limited license to process your data solely for the purpose of providing the service.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">5. Limitation of Liability</h2>
              <p>NyaAI is provided "as is" without warranties of any kind. We are not liable for damages arising from your use of the service, including but not limited to data loss, service interruptions, or inaccuracies in AI-generated responses.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">6. Contact</h2>
              <p>For questions about these terms, please reach out through our <Link to="/contact" className="text-purple-500 hover:text-purple-600 transition-colors">Contact page</Link>.</p>
            </section>
          </div>
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
            <Link to="/terms" className="text-sm text-purple-500 font-medium">Terms</Link>
            <Link to="/contact" className="text-sm text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
