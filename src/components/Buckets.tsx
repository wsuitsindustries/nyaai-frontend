import { useState, useRef, useEffect } from "react"
import type { Document, DocumentStatus } from "../types"
import { listDocuments, deleteDocument, getDocumentStatus } from "../services/api"

interface BucketsProps {
  onUpload: (file: File) => void
}

function StatusPill({ status }: { status: DocumentStatus }) {
  const colors: Record<DocumentStatus, string> = {
    uploading: "bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
    extracting: "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    chunking: "bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400",
    embedding: "bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400",
    ready: "bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400",
    failed: "bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400",
  }
  const labels: Record<DocumentStatus, string> = {
    uploading: "Uploading",
    extracting: "Extracting",
    chunking: "Chunking",
    embedding: "Embedding",
    ready: "Ready",
    failed: "Failed",
  }
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium ${colors[status]}`}>
      {status === "extracting" || status === "chunking" || status === "embedding" || status === "uploading" ? (
        <span className="flex items-center gap-1">
          <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {labels[status]}
        </span>
      ) : (
        labels[status]
      )}
    </span>
  )
}

export default function Buckets({ onUpload }: BucketsProps) {
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

  useEffect(() => {
    const pending = documents.filter((d) =>
      d.status === "uploading" || d.status === "extracting" || d.status === "chunking" || d.status === "embedding"
    )
    if (pending.length === 0) return

    const interval = setInterval(async () => {
      let updated = false
      const next = await Promise.all(
        documents.map(async (doc) => {
          if (doc.status === "uploading" || doc.status === "extracting" || doc.status === "chunking" || doc.status === "embedding") {
            try {
              const statusRes = await getDocumentStatus(doc.id)
              if (statusRes.status !== doc.status) {
                updated = true
                return { ...doc, status: statusRes.status }
              }
            } catch { /* ignore */ }
          }
          return doc
        })
      )
      if (updated) setDocuments(next)
    }, 2000)

    return () => clearInterval(interval)
  }, [documents])

  async function handleDelete(id: string) {
    try {
      await deleteDocument(id)
      setDocuments((prev) => prev.filter((d) => d.id !== id))
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

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-neutral-950">
      <div className="h-4 w-full shrink-0" />
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
          <div className="h-full flex flex-col items-center justify-center px-4">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-300 dark:text-neutral-700 mb-4">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <h2 className="text-base font-medium text-neutral-900 dark:text-white mb-1">No documents yet</h2>
            <p className="text-sm text-neutral-500 text-center max-w-sm mb-5">
              Upload company documents, policies, and reports to build your knowledge base.
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 rounded-lg transition-all"
            >
              Upload your first document
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.md,.csv,.json,.pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        ) : (
          <div className="mx-auto max-w-5xl py-6 px-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-neutral-900 dark:text-white">Documents</h2>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 text-xs font-medium text-white bg-purple-500 hover:bg-purple-600 rounded-lg transition-all"
              >
                + Upload
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md,.csv,.json,.pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="aspect-square rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 p-3 flex flex-col hover:border-purple-300 dark:hover:border-purple-700 transition-all group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="p-1 rounded text-neutral-300 opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                      title="Delete"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <p className="text-xs font-medium text-neutral-900 dark:text-white truncate leading-tight">{doc.filename}</p>
                    <p className="text-[10px] text-neutral-400 mt-0.5">{formatSize(doc.size)}</p>
                  </div>
                  <div className="mt-auto pt-2">
                    <StatusPill status={doc.status} />
                  </div>
                  {doc.error && (
                    <p className="mt-1 text-[10px] text-red-500 truncate">{doc.error}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}