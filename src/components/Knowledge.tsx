import { useState, useRef, useId, useEffect } from "react"
import type { Document, DocumentStatus } from "../services/types"
import { listDocuments, deleteDocument, reindexDocument } from "../services/api"

interface KnowledgeProps {
  onUpload: (file: File) => void
}

const statusSteps: { status: DocumentStatus; label: string }[] = [
  { status: "uploading", label: "Uploading..." },
  { status: "extracting", label: "Extracting text..." },
  { status: "chunking", label: "Creating chunks..." },
  { status: "embedding", label: "Generating embeddings..." },
  { status: "ready", label: "Ready" },
]

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function StatusBadge({ status }: { status: DocumentStatus }) {
  const colors: Record<DocumentStatus, string> = {
    uploading: "bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
    extracting: "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    chunking: "bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400",
    embedding: "bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400",
    ready: "bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400",
    failed: "bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400",
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${colors[status]}`}>
      {status === "uploading" && (
        <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {status === "failed" && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      )}
      {statusSteps.find((s) => s.status === status)?.label || status}
    </span>
  )
}

function UploadProgress({ status }: { status: DocumentStatus }) {
  const currentIdx = statusSteps.findIndex((s) => s.status === status)
  if (status === "ready" || status === "failed") return null

  return (
    <div className="space-y-1.5 mt-2">
      {statusSteps.slice(0, -1).map((step, i) => {
        const done = i < currentIdx
        const active = i === currentIdx
        return (
          <div key={step.status} className="flex items-center gap-2 text-xs">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
              done ? "bg-green-500" : active ? "bg-purple-500 animate-pulse" : "bg-neutral-300 dark:bg-neutral-700"
            }`}>
              {done ? (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <div className={`w-1.5 h-1.5 rounded-full ${active ? "bg-white" : "bg-neutral-500"}`} />
              )}
            </div>
            <span className={`${done ? "text-green-600 dark:text-green-400" : active ? "text-purple-600 dark:text-purple-400 font-medium" : "text-neutral-400 dark:text-neutral-500"}`}>
              {step.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function NLogo({ className = "h-7 w-7" }: { className?: string }) {
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

export default function Knowledge({ onUpload }: KnowledgeProps) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function loadDocs() {
    try {
      const data = await listDocuments()
      setDocuments(data.documents)
    } catch {
      setDocuments([])
    }
    setLoading(false)
  }

  useEffect(() => { loadDocs() }, [])

  async function handleDelete(id: string) {
    try {
      await deleteDocument(id)
      setDocuments((prev) => prev.filter((d) => d.id !== id))
    } catch { /* noop */ }
  }

  async function handleReindex(id: string) {
    try {
      await reindexDocument(id)
      setDocuments((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status: "embedding" as DocumentStatus } : d))
      )
    } catch { /* noop */ }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const doc: Document = {
      id: crypto.randomUUID(),
      filename: file.name,
      size: file.size,
      uploaded_at: new Date().toISOString(),
      status: "uploading",
      chunks: 0,
    }
    setDocuments((prev) => [doc, ...prev])
    onUpload(file)
    e.target.value = ""
  }

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-neutral-950 relative min-w-0">
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200/50 dark:border-neutral-800/50">
        <div className="flex items-center gap-3">
          <NLogo />
          <h1 className="text-sm font-semibold text-neutral-900 dark:text-white">Knowledge</h1>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all hover:opacity-90 btn-active"
          style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Upload
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.md,.csv,.json,.pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Loading documents...
            </div>
          </div>
        ) : documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <NLogo className="h-14 w-14 mb-4" />
            <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-1">No documents yet</h2>
            <p className="text-sm text-neutral-500 text-center max-w-sm mb-6">
              Upload company documents, policies, reports, and guides to build your organization's knowledge base.
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90 btn-active"
              style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Upload your first document
            </button>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl py-6 px-4 space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 px-4 py-3.5 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-neutral-400">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">{doc.filename}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                      <StatusBadge status={doc.status} />
                      <span className="text-xs text-neutral-400">{formatSize(doc.size)}</span>
                      <span className="text-xs text-neutral-400">{formatDate(doc.uploaded_at)}</span>
                      {doc.chunks > 0 && (
                        <span className="text-xs text-neutral-400">{doc.chunks} chunks</span>
                      )}
                    </div>
                    <UploadProgress status={doc.status} />
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {doc.status === "ready" && (
                      <button
                        onClick={() => handleReindex(doc.id)}
                        className="p-1.5 rounded-md text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                        title="Re-index"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="23 4 23 10 17 10" />
                          <polyline points="1 20 1 14 7 14" />
                          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="p-1.5 rounded-md text-neutral-400 hover:text-red-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                      title="Delete"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
                {doc.error && (
                  <p className="mt-2 text-xs text-red-500">{doc.error}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}