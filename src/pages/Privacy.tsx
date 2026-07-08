import { Link } from "react-router-dom"
import BrandLogo from "../components/ui/BrandLogo"
import LanguageSelector from "../components/ui/LanguageSelector"

export default function Privacy() {
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
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-1">Privacy Policy</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">Last updated: July 2026</p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-10">
            Also available in:{" "}
            <Link to="/privacy" className="text-purple-500 hover:text-purple-600">English</Link>{" · "}
            <Link to="/privacy" className="text-purple-500 hover:text-purple-600">Español</Link>{" · "}
            <Link to="/privacy" className="text-purple-500 hover:text-purple-600">Français</Link>{" · "}
            <Link to="/privacy" className="text-purple-500 hover:text-purple-600">Deutsch</Link>{" · "}
            <Link to="/privacy" className="text-purple-500 hover:text-purple-600">日本語</Link>{" · "}
            <Link to="/privacy" className="text-purple-500 hover:text-purple-600">한국어</Link>{" · "}
            <Link to="/privacy" className="text-purple-500 hover:text-purple-600">中文</Link>
          </p>

          <div className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-8">
            <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-xl p-4 border border-neutral-200 dark:border-neutral-800 text-xs">
              <p className="font-medium text-neutral-700 dark:text-neutral-300 mb-1">Table of Contents</p>
              <ol className="space-y-0.5 list-decimal list-inside text-neutral-500 dark:text-neutral-400">
                <li><a href="#s1" className="text-purple-500 hover:text-purple-600">Personal Data We Collect</a></li>
                <li><a href="#s2" className="text-purple-500 hover:text-purple-600">How We Use Personal Data</a></li>
                <li><a href="#s3" className="text-purple-500 hover:text-purple-600">Disclosure of Personal Data</a></li>
                <li><a href="#s4" className="text-purple-500 hover:text-purple-600">Data Retention</a></li>
                <li><a href="#s5" className="text-purple-500 hover:text-purple-600">Data Controls</a></li>
                <li><a href="#s6" className="text-purple-500 hover:text-purple-600">Your Rights</a></li>
                <li><a href="#s7" className="text-purple-500 hover:text-purple-600">Children</a></li>
                <li><a href="#s8" className="text-purple-500 hover:text-purple-600">Security</a></li>
                <li><a href="#s9" className="text-purple-500 hover:text-purple-600">Changes to This Policy</a></li>
                <li><a href="#s10" className="text-purple-500 hover:text-purple-600">Contact Us</a></li>
              </ol>
            </div>

            <section id="s1">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">1. Personal Data We Collect</h2>
              <p className="mb-3">At NyaAI, our mission is to make company knowledge accessible to everyone. We build tools to help teams upload documents, ask questions, and get source-grounded answers. We are committed to respecting your privacy and keeping secure any information we obtain from you or about you. This Privacy Policy describes our practices with respect to personal data that we collect from or about you, and how we use it when you use our website, applications, and services (collectively, "Services").</p>

              <h3 className="text-base font-medium text-neutral-900 dark:text-white mb-2 mt-5">Personal Data You Provide</h3>
              <p className="mb-2">We collect Personal Data if you create an account to use our Services or communicate with us:</p>
              <ul className="list-disc list-inside space-y-1.5 mb-3">
                <li><strong className="text-neutral-700 dark:text-neutral-300">Account Information:</strong> When you create an account, we collect your name, email address, and account credentials. This is the minimum information needed to provide our Services.</li>
                <li><strong className="text-neutral-700 dark:text-neutral-300">User Content:</strong> We collect the documents you upload, the questions you ask, and any other content you provide through our Services. This includes PDFs, Markdown files, CSV files, and any text you submit.</li>
                <li><strong className="text-neutral-700 dark:text-neutral-300">Communication Information:</strong> If you contact us via email or our contact form, we collect your name, email address, and the contents of your message.</li>
              </ul>

              <h3 className="text-base font-medium text-neutral-900 dark:text-white mb-2 mt-5">Personal Data We Collect Automatically</h3>
              <p className="mb-2">When you use our Services, we automatically collect:</p>
              <ul className="list-disc list-inside space-y-1.5 mb-3">
                <li><strong className="text-neutral-700 dark:text-neutral-300">Log Data:</strong> Your IP address, browser type, operating system, and the pages you visit.</li>
                <li><strong className="text-neutral-700 dark:text-neutral-300">Usage Data:</strong> How you interact with our Services, including features used, actions taken, and timestamps.</li>
                <li><strong className="text-neutral-700 dark:text-neutral-300">Device Information:</strong> Device type, operating system, and browser information.</li>
                <li><strong className="text-neutral-700 dark:text-neutral-300">Cookies:</strong> We use cookies and similar technologies to operate and improve our Services. See our Cookie Notice for details.</li>
              </ul>
            </section>

            <section id="s2">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">2. How We Use Personal Data</h2>
              <p className="mb-3">We use Personal Data for the following purposes:</p>
              <ul className="list-disc list-inside space-y-1.5">
                <li>To provide, maintain, and improve our Services, including answering your questions based on uploaded documents.</li>
                <li>To develop new features and conduct research to improve our AI models and knowledge retrieval.</li>
                <li>To communicate with you about your account, respond to your questions, and send service updates.</li>
                <li>To prevent fraud, abuse, and security incidents, and to protect the safety of our users and Services.</li>
                <li>To comply with legal obligations and enforce our terms of service.</li>
              </ul>
            </section>

            <section id="s3">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">3. Disclosure of Personal Data</h2>
              <p className="mb-3">We may disclose your Personal Data in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-1.5">
                <li><strong className="text-neutral-700 dark:text-neutral-300">Service Providers:</strong> We share data with vendors who help us operate our Services, such as cloud hosting providers and email services. These parties are contractually bound to protect your data.</li>
                <li><strong className="text-neutral-700 dark:text-neutral-300">Legal Requirements:</strong> We may disclose information if required by law, to protect our rights, or to prevent illegal activity.</li>
                <li><strong className="text-neutral-700 dark:text-neutral-300">Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction.</li>
              </ul>
              <p className="mt-3">We do not sell your Personal Data to third parties.</p>
            </section>

            <section id="s4">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">4. Data Retention</h2>
              <p>We retain your Personal Data for as long as your account is active or as needed to provide our Services. You can delete your conversations, uploaded documents, or entire account at any time. When you delete data, we remove it from our systems within 30 days, unless we need to retain it for legal obligations, fraud prevention, or security purposes.</p>
            </section>

            <section id="s5">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">5. Data Controls</h2>
              <p className="mb-3">You have control over your data through your account settings:</p>
              <ul className="list-disc list-inside space-y-1.5">
                <li>You can delete individual conversations or your entire chat history.</li>
                <li>You can delete uploaded documents from your knowledge base.</li>
                <li>You can update your profile information (name, preferences) in Settings.</li>
                <li>You can delete your account entirely, which removes all associated data.</li>
                <li>You can manage cookie preferences through your browser settings.</li>
              </ul>
            </section>

            <section id="s6">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">6. Your Rights</h2>
              <p className="mb-3">Depending on your location, you may have the following rights regarding your Personal Data:</p>
              <ul className="list-disc list-inside space-y-1.5">
                <li><strong className="text-neutral-700 dark:text-neutral-300">Access:</strong> Request a copy of the Personal Data we hold about you.</li>
                <li><strong className="text-neutral-700 dark:text-neutral-300">Rectification:</strong> Request correction of inaccurate or incomplete data.</li>
                <li><strong className="text-neutral-700 dark:text-neutral-300">Deletion:</strong> Request deletion of your Personal Data (subject to legal obligations).</li>
                <li><strong className="text-neutral-700 dark:text-neutral-300">Portability:</strong> Request transfer of your data to another service provider.</li>
                <li><strong className="text-neutral-700 dark:text-neutral-300">Withdraw Consent:</strong> Withdraw consent where processing is based on consent.</li>
                <li><strong className="text-neutral-700 dark:text-neutral-300">Lodge a Complaint:</strong> File a complaint with your local data protection authority.</li>
              </ul>
              <p className="mt-3">To exercise these rights, contact us at <a href="mailto:wsuits6@gmail.com" className="text-purple-500 hover:text-purple-600">wsuits6@gmail.com</a>.</p>
            </section>

            <section id="s7">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">7. Children</h2>
              <p>Our Services are not directed to children under 13. We do not knowingly collect Personal Data from children under 13. If you believe a child has provided us with Personal Data, please contact us at <a href="mailto:wsuits6@gmail.com" className="text-purple-500 hover:text-purple-600">wsuits6@gmail.com</a> and we will promptly delete the information.</p>
            </section>

            <section id="s8">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">8. Security</h2>
              <p>We implement commercially reasonable technical, administrative, and organizational measures designed to protect your Personal Data from loss, misuse, and unauthorized access, disclosure, alteration, or destruction. This includes encryption in transit (TLS) and at rest. However, no method of electronic storage or transmission is 100% secure, and we cannot guarantee absolute security.</p>
            </section>

            <section id="s9">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">9. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top of this page. If we make material changes, we will notify you through the Services or via email. Your continued use of the Services after changes constitutes acceptance of the updated policy.</p>
            </section>

            <section id="s10">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">10. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
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
            <Link to="/privacy" className="text-sm text-purple-500 font-medium">Privacy</Link>
            <Link to="/terms" className="text-sm text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Terms</Link>
            <Link to="/contact" className="text-sm text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
