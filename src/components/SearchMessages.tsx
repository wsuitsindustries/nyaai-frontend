import { useState, useEffect, useRef, useMemo } from "react"
import type { StoredConversation, Message } from "../types"
import { loadConversations, loadMessages } from "../utils/storage"

interface SearchResult {
  conversationId: string
  conversationTitle: string
  message: Message
}

export default function SearchMessages({ open, onClose, onSelectMessage }: {
  open: boolean
  onClose: () => void
  onSelectMessage: (convId: string) => void
}) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedIdx, setSelectedIdx] = useState(0)

  const allConversations = useMemo(() => loadConversations(), [open])

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    const res: SearchResult[] = []
    for (const conv of allConversations) {
      const msgs = loadMessages(conv.id) || []
      for (const msg of msgs) {
        if (msg.content.toLowerCase().includes(q)) {
          res.push({ conversationId: conv.id, conversationTitle: conv.title, message: msg })
          if (res.length >= 20) break
        }
      }
      if (res.length >= 20) break
    }
    return res
  }, [query, allConversations])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery("")
      setSelectedIdx(0)
    }
  }, [open])

  useEffect(() => {
    setSelectedIdx(0)
  }, [results.length])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") onClose()
    if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIdx((i) => Math.min(i + 1, results.length - 1)) }
    if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIdx((i) => Math.max(i - 1, 0)) }
    if (e.key === "Enter" && results[selectedIdx]) {
      onSelectMessage(results[selectedIdx].conversationId)
      onClose()
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-neutral-200 dark:border-neutral-800">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400 shrink-0">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search messages across conversations..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-neutral-900 dark:text-white placeholder-neutral-500"
          />
          <div className="flex items-center gap-1.5">
            <kbd className="hidden sm:inline-flex px-1.5 py-0.5 text-[10px] font-medium text-neutral-400 bg-neutral-100 dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
              ESC
            </kbd>
          </div>
        </div>
        <div className="max-h-[50vh] overflow-y-auto">
          {query.trim() && results.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm text-neutral-500">
              No messages found for "<span className="text-neutral-700 dark:text-neutral-300">{query}</span>"
            </div>
          ) : !query.trim() ? (
            <div className="px-5 py-8 text-center text-sm text-neutral-400">
              Type to search across all conversations
            </div>
          ) : (
            <div className="py-2">
              {results.map((r, i) => (
                <button
                  key={`${r.conversationId}-${r.message.id}`}
                  onClick={() => { onSelectMessage(r.conversationId); onClose() }}
                  onMouseEnter={() => setSelectedIdx(i)}
                  className={`w-full text-left px-5 py-3 flex flex-col gap-0.5 transition-colors ${
                    i === selectedIdx
                      ? "bg-purple-50 dark:bg-purple-500/10"
                      : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-purple-600 dark:text-purple-400 truncate max-w-[200px]">
                      {r.conversationTitle}
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      {r.message.role === "user" ? "You" : "Assistant"}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-1">
                    {r.message.content}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
        {results.length > 0 && (
          <div className="px-5 py-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-3 text-[10px] text-neutral-400">
            <span>↑↓ Navigate</span>
            <span>↵ Open</span>
            <span>⎋ Close</span>
          </div>
        )}
      </div>
    </div>
  )
}
