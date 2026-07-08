import { Link } from "react-router-dom"
import BrandLogo from "../components/ui/BrandLogo"
import LanguageSelector from "../components/ui/LanguageSelector"

export default function Terms() {
  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-neutral-950">
      <header className="flex items-center justify-between px-6 lg:px-10 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <Link to="/" className="flex items-center">
          <BrandLogo className="h-7 w-auto" />
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <Link to="/" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Back to home</Link>
        </div>
      </header>
      <main className="px-6 lg:px-10 py-12">
        <div className="max-w-3xl mx-auto w-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-1">Terms of Service</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-10">Last updated: July 2026</p>

          <div className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-8">
            <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-xl p-4 border border-neutral-200 dark:border-neutral-800 text-xs">
              <p className="font-medium text-neutral-700 dark:text-neutral-300 mb-1">Table of Contents</p>
              <ol className="space-y-0.5 list-decimal list-inside text-neutral-500 dark:text-neutral-400">
                <li><a href="#s1" className="text-purple-500 hover:text-purple-600">Acceptance of Terms</a></li>
                <li><a href="#s2" className="text-purple-500 hover:text-purple-600">Service Description</a></li>
                <li><a href="#s3" className="text-purple-500 hover:text-purple-600">Account Registration and Security</a></li>
                <li><a href="#s4" className="text-purple-500 hover:text-purple-600">User Responsibilities</a></li>
                <li><a href="#s5" className="text-purple-500 hover:text-purple-600">Data Ownership and Content</a></li>
                <li><a href="#s6" className="text-purple-500 hover:text-purple-600">Acceptable Use Policy</a></li>
                <li><a href="#s7" className="text-purple-500 hover:text-purple-600">Intellectual Property</a></li>
                <li><a href="#s8" className="text-purple-500 hover:text-purple-600">Limitation of Liability</a></li>
                <li><a href="#s9" className="text-purple-500 hover:text-purple-600">Termination</a></li>
                <li><a href="#s10" className="text-purple-500 hover:text-purple-600">Governing Law</a></li>
                <li><a href="#s11" className="text-purple-500 hover:text-purple-600">Changes to Terms</a></li>
                <li><a href="#s12" className="text-purple-500 hover:text-purple-600">Contact</a></li>
              </ol>
            </div>

            <section id="s1">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using NyaAI ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Service. These Terms apply to all visitors, users, and others who access or use the Service.</p>
            </section>

            <section id="s2">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">2. Service Description</h2>
              <p className="mb-3">NyaAI provides an AI-powered knowledge management platform that allows users to:</p>
              <ul className="list-disc list-inside space-y-1.5">
                <li>Upload documents (PDFs, Markdown, CSV, and other supported formats)</li>
                <li>Query uploaded documents using natural language questions</li>
                <li>Receive AI-generated answers with source citations from uploaded documents</li>
                <li>Manage and organize their document knowledge base</li>
              </ul>
              <p className="mt-3">The Service uses retrieval-augmented generation (RAG) to provide answers grounded in your uploaded documents. While we strive for accuracy, AI-generated responses may contain errors and should not be relied upon as the sole source of truth.</p>
            </section>

            <section id="s3">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">3. Account Registration and Security</h2>
              <ul className="list-disc list-inside space-y-1.5">
                <li>You must provide accurate, current, and complete information during registration.</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                <li>You must notify us immediately of any unauthorized use of your account.</li>
                <li>You are responsible for all activities that occur under your account.</li>
                <li>We reserve the right to refuse service, terminate accounts, or remove content for any violation of these Terms.</li>
              </ul>
            </section>

            <section id="s4">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">4. User Responsibilities</h2>
              <p className="mb-3">You agree that you will not:</p>
              <ul className="list-disc list-inside space-y-1.5">
                <li>Use the Service for any unlawful purpose or in violation of any applicable laws or regulations.</li>
                <li>Upload documents that contain malware, viruses, or harmful code.</li>
                <li>Upload documents that violate intellectual property rights, privacy rights, or any other third-party rights.</li>
                <li>Attempt to reverse engineer, decompile, or extract the source code of the Service.</li>
                <li>Use the Service to generate harmful, abusive, or misleading content.</li>
                <li>Interfere with or disrupt the integrity or performance of the Service.</li>
                <li>Attempt to gain unauthorized access to the Service or its related systems.</li>
              </ul>
            </section>

            <section id="s5">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">5. Data Ownership and Content</h2>
              <ul className="list-disc list-inside space-y-1.5">
                <li><strong className="text-neutral-700 dark:text-neutral-300">Your Content:</strong> You retain full ownership of the documents you upload and the content you create using the Service. We do not claim any intellectual property rights over your data.</li>
                <li><strong className="text-neutral-700 dark:text-neutral-300">License to Operate:</strong> You grant us a limited, worldwide, non-exclusive license to process, store, and analyze your content solely for the purpose of providing and improving the Service.</li>
                <li><strong className="text-neutral-700 dark:text-neutral-300">Data Processing:</strong> We process your uploaded documents to generate vector embeddings and facilitate search and retrieval. This processing is automated and does not involve human review of your specific content.</li>
                <li><strong className="text-neutral-700 dark:text-neutral-300">Data Deletion:</strong> You may delete your documents or entire account at any time. Upon deletion, we will remove your data from our active systems within 30 days.</li>
              </ul>
            </section>

            <section id="s6">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">6. Acceptable Use Policy</h2>
              <p className="mb-3">When using NyaAI, you agree to:</p>
              <ul className="list-disc list-inside space-y-1.5">
                <li>Not upload sensitive personal data, financial information, or government-issued identifiers unless explicitly agreed upon.</li>
                <li>Not use the Service to generate content that is harassing, threatening, or discriminatory.</li>
                <li>Not attempt to manipulate or exploit the Service for competitive intelligence or unauthorized data extraction.</li>
                <li>Comply with all applicable export control and trade sanctions laws.</li>
              </ul>
            </section>

            <section id="s7">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">7. Intellectual Property</h2>
              <ul className="list-disc list-inside space-y-1.5">
                <li><strong className="text-neutral-700 dark:text-neutral-300">Service IP:</strong> The NyaAI name, logo, branding, and the underlying technology (including the AI models, algorithms, and software) are the exclusive property of NyaAI and its licensors.</li>
                <li><strong className="text-neutral-700 dark:text-neutral-300">Feedback:</strong> If you provide feedback or suggestions about the Service, we may use them without obligation to you.</li>
              </ul>
            </section>

            <section id="s8">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">8. Limitation of Liability</h2>
              <p className="mb-3">To the maximum extent permitted by law:</p>
              <ul className="list-disc list-inside space-y-1.5">
                <li>The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied.</li>
                <li>We do not warrant that the Service will be uninterrupted, timely, secure, or error-free.</li>
                <li>AI-generated responses may contain inaccuracies. You should independently verify critical information.</li>
                <li>We are not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.</li>
                <li>Our total liability for any claim arising from these Terms or the Service shall not exceed the amount paid by you (if any) in the 12 months preceding the claim.</li>
              </ul>
            </section>

            <section id="s9">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">9. Termination</h2>
              <ul className="list-disc list-inside space-y-1.5">
                <li>You may terminate your account at any time through your account settings or by contacting us.</li>
                <li>We may suspend or terminate your access to the Service for violation of these Terms.</li>
                <li>Upon termination, your right to use the Service will immediately cease. Provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.</li>
              </ul>
            </section>

            <section id="s10">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">10. Governing Law</h2>
              <p>These Terms shall be governed by and construed in accordance with the laws, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>
            </section>

            <section id="s11">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">11. Changes to Terms</h2>
              <p>We reserve the right to modify these Terms at any time. We will notify you of material changes via email or through the Service. Your continued use of the Service after changes become effective constitutes your acceptance of the new Terms. If you do not agree to the changes, you must stop using the Service.</p>
            </section>

            <section id="s12">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">12. Contact</h2>
              <p>If you have any questions about these Terms, please contact us:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Email: <a href="mailto:wsuits6@gmail.com" className="text-purple-500 hover:text-purple-600">wsuits6@gmail.com</a></li>
                <li>Contact form: <Link to="/contact" className="text-purple-500 hover:text-purple-600">Contact page</Link></li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <footer className="px-6 lg:px-10 py-8 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <BrandLogo className="h-5 w-auto" />
          </div>
          <p className="text-sm text-neutral-400 dark:text-neutral-500">&copy; {new Date().getFullYear()} NyaAI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <LanguageSelector />
            <Link to="/privacy" className="text-sm text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Privacy</Link>
            <Link to="/terms" className="text-sm text-purple-500 font-medium">Terms</Link>
            <Link to="/contact" className="text-sm text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
