import { useState, useRef, useEffect, type KeyboardEvent, type ChangeEvent } from "react"
import { LuArrowUp, LuSquare } from "react-icons/lu"
import type { Message } from "../types"
import NLogo from "./ui/NLogo"

interface ChatProps {
  messages: Message[]
  loading: boolean
  onSend: (text: string) => void
  onEdit: (messageId: string, newText: string) => void
  onRegenerate: () => void
  onAttach: (file: File) => void
  enterToSend: boolean
  showSuggestions: boolean
  onCancel?: () => void
  userEmail?: string
}

function renderContent(text: string) {
  const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  let html = escaped
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const safeCode = code.replace(/</g, "&lt;").replace(/>/g, "&gt;")
      const langLabel = lang || "code"
      return `<div class="my-3 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
        <div class="bg-neutral-100 dark:bg-neutral-900 px-4 py-1.5 text-xs text-neutral-500 flex items-center justify-between">${langLabel}</div>
        <pre class="bg-neutral-50 dark:bg-neutral-950 p-4 overflow-x-auto text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">${safeCode}</pre>
      </div>`
    })
    .replace(/^### (.+)$/gm, "<h3 class='text-sm font-semibold text-neutral-900 dark:text-white mt-4 mb-1'>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2 class='text-base font-semibold text-neutral-900 dark:text-white mt-5 mb-1.5'>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1 class='text-lg font-bold text-neutral-900 dark:text-white mt-5 mb-2'>$1</h1>")
    .replace(/^- (.+)$/gm, "<li class='ml-4 list-disc text-neutral-800 dark:text-neutral-200'>$1</li>")
    .replace(/^\d+\. (.+)$/gm, "<li class='ml-4 list-decimal text-neutral-800 dark:text-neutral-200'>$1</li>")
    .replace(/\*\*(.+?)\*\*/g, "<strong class='font-semibold text-neutral-900 dark:text-white'>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code class='bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-xs text-purple-700 dark:text-purple-300'>$1</code>")
    .replace(/\n/g, "<br/>")
    .replace(/(<li.*<\/li>)\s*<br\/>/g, "$1")
  return html
}

function formatDateLabel(ts: number): string {
  const now = Date.now()
  const day = 86400000
  const diff = now - ts
  const date = new Date(ts)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) return "Today"
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday"
  if (diff < day * 7) {
    return date.toLocaleDateString(undefined, { weekday: "long" })
  }
  const thisYear = today.getFullYear()
  if (date.getFullYear() === thisYear) {
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
  }
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* noop */ }
  }

  return (
    <button onClick={handleCopy} className="p-1.5 rounded text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all" title="Copy">
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
      )}
    </button>
  )
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })
}

function UserMessage({ msg, onEdit, userEmail, showDate }: { msg: Message; onEdit: (id: string, text: string) => void; userEmail?: string; showDate?: boolean }) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(msg.content)
  const editRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (editing && editRef.current) {
      editRef.current.focus()
      editRef.current.setSelectionRange(editText.length, editText.length)
    }
  }, [editing])

  function handleEditSave() {
    if (!editText.trim()) return
    onEdit(msg.id, editText.trim())
    setEditing(false)
  }

  function handleEditCancel() {
    setEditText(msg.content)
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="flex justify-end px-4 message-enter">
        <div className="w-full max-w-lg">
          <textarea
            ref={editRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleEditSave() }
              if (e.key === "Escape") handleEditCancel()
            }}
            className="w-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-neutral-900 dark:text-white outline-none focus:border-purple-500 resize-none min-h-[60px] transition-colors"
          />
          <div className="flex gap-2 mt-2 justify-end">
            <button onClick={handleEditCancel} className="px-3 py-1.5 text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all">Cancel</button>
            <button onClick={handleEditSave} className="px-3 py-1.5 text-xs text-white rounded-lg bg-purple-500 hover:bg-purple-600 transition-all">Save & Submit</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-end px-4 message-enter">
      <div className="max-w-lg w-fit group">
        {showDate && msg.timestamp && (
          <p className="text-[10px] text-neutral-400 text-right mb-1">{formatDateLabel(msg.timestamp)}</p>
        )}
        <div className="flex items-center gap-2 mb-1 justify-end">
          <div className="w-6 h-6 rounded-md bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center">
            <span className="text-[10px] font-semibold text-purple-700 dark:text-purple-300">
              {(userEmail?.charAt(0) || "U").toUpperCase()}
            </span>
          </div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-500/10 rounded-xl rounded-tr-sm px-3.5 py-2 border border-purple-100 dark:border-purple-500/20">
          <p className="text-sm text-neutral-900 dark:text-white leading-relaxed">{msg.content}</p>
        </div>
        <div className="flex items-center gap-0.5 mt-0.5 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[9px] text-neutral-400 mr-1">{msg.timestamp ? formatTime(msg.timestamp) : ""}</span>
          <CopyButton text={msg.content} />
          <button
            onClick={() => { setEditing(true); setEditText(msg.content) }}
            className="p-1.5 rounded text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all"
            title="Edit"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            onClick={() => onEdit(msg.id, msg.content)}
            className="p-1.5 rounded text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all"
            title="Resend"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function SourcesSection({ sources }: { sources: NonNullable<Message["sources"]> }) {
  const [expanded, setExpanded] = useState(false)

  if (sources.length === 0) return null

  return (
    <div className="mt-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        {sources.length} source{sources.length > 1 ? "s" : ""}
        <svg
          width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`transition-transform ${expanded ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {expanded && (
        <div className="mt-1.5 space-y-2">
          {sources.map((s, i) => (
            <div key={i} className="text-xs">
              <div className="flex items-start gap-1.5">
                <span className="shrink-0 w-3.5 h-3.5 rounded bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-[9px] text-purple-600 dark:text-purple-400 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <span className="text-neutral-600 dark:text-neutral-300 font-medium">{s.title}</span>
                  {(s.page || s.section) && (
                    <span className="text-neutral-400"> — {s.page && `p.${s.page}`}{s.page && s.section && " · "}{s.section}</span>
                  )}
                </div>
              </div>
              {s.snippet && (
                <p className="mt-1 ml-5 text-neutral-400 dark:text-neutral-500 leading-relaxed line-clamp-2">{s.snippet}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function AssistantMessage({ msg, onRegenerate, isLatest, loading, showDate }: {
  msg: Message
  onRegenerate: () => void
  isLatest: boolean
  loading: boolean
  showDate?: boolean
}) {
  return (
    <div className="px-4 py-0.5 message-enter">
      <div className="max-w-3xl">
        {showDate && msg.timestamp && (
          <p className="text-[10px] text-neutral-400 mb-1">{formatDateLabel(msg.timestamp)}</p>
        )}
        <div className="mb-1">
          <NLogo className="h-6 w-6" />
        </div>
        <div
          className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed message-content"
          dangerouslySetInnerHTML={{ __html: renderContent(msg.content) }}
        />
        {msg.sources && msg.sources.length > 0 && <SourcesSection sources={msg.sources} />}
        <div className="flex items-center gap-0.5 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[9px] text-neutral-400 mr-1">{msg.timestamp ? formatTime(msg.timestamp) : ""}</span>
          <CopyButton text={msg.content} />
          {isLatest && (
            <button
              onClick={onRegenerate}
              disabled={loading}
              className="p-1 rounded text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title="Regenerate"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const inputSuggestions = [
  "What is our leave policy?",
  "Summarize the latest report",
  "Show onboarding docs",
  "Explain cloud architecture",
]

function ChatInput({ onSend, onAttach, onCancel, disabled, enterToSend, showSuggestions, centered }: {
  onSend: (text: string) => void
  onAttach: (file: File) => void
  onCancel?: () => void
  disabled: boolean
  enterToSend: boolean
  showSuggestions: boolean
  centered?: boolean
}) {
  const [text, setText] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const ta = textareaRef.current
    if (ta) {
      ta.style.height = "auto"
      ta.style.height = Math.min(ta.scrollHeight, 150) + "px"
    }
  }, [text])

  function handleSubmit() {
    if (!text.trim() || disabled) return
    onSend(text.trim())
    setText("")
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (disabled) return
    if (enterToSend) {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit() }
    } else {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); handleSubmit() }
    }
  }

  const canSend = text.trim().length > 0

  return (
    <div className={`px-4 safe-bottom ${centered ? "pb-0 pt-0" : "pb-20 pt-2"}`}>
      <div className="mx-auto max-w-2xl">
        <div className="flex items-end gap-1.5 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-3 bg-white dark:bg-neutral-900 transition-all focus-within:border-purple-500 shadow-sm">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all shrink-0"
            title="Attach file"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.md,.csv,.json,.pdf"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) onAttach(file)
              e.target.value = ""
            }}
            className="hidden"
          />
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your organization's knowledge..."
            rows={1}
            disabled={disabled}
            className="flex-1 bg-transparent border-none outline-none resize-none text-sm text-neutral-900 dark:text-white placeholder-neutral-500 font-sans py-2 max-h-[150px]"
          />
          <button
            onClick={disabled ? onCancel : handleSubmit}
            className={`p-1.5 rounded-lg shrink-0 transition-all flex items-center justify-center ${
              disabled
                ? "bg-neutral-300 dark:bg-neutral-700 text-neutral-500"
                : canSend
                  ? "bg-purple-500 text-white hover:bg-purple-600"
                  : "bg-neutral-200 dark:bg-neutral-700 text-neutral-400 cursor-not-allowed"
            }`}
            title={disabled ? "Stop generating" : "Send"}
          >
            {disabled ? (
                <LuSquare size={18} />
              ) : (
                <LuArrowUp size={20} />
              )}
          </button>
        </div>
        {showSuggestions && (
          <div className="flex flex-wrap justify-center gap-1.5 mt-2">
            {inputSuggestions.map((s) => (
              <button
                key={s}
                onClick={() => onSend(s)}
                className="px-2 py-0.5 text-[10px] text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-full hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}



export default function Chat({ messages, loading, onSend, onEdit, onRegenerate, onAttach, enterToSend, showSuggestions, onCancel = () => {}, userEmail }: ChatProps) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [inputText, setInputText] = useState("")

  useEffect(() => {
    const ta = inputRef.current
    if (ta) {
      ta.style.height = "auto"
      ta.style.height = Math.min(ta.scrollHeight, 150) + "px"
    }
  }, [inputText])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const canSend = inputText.trim().length > 0

  function handleSend() {
    if (!inputText.trim() || loading) return
    if (inputText.trim().length > 10000) return
    onSend(inputText.trim())
    setInputText("")
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (loading) return
    if (enterToSend) {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend() }
    } else {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); handleSend() }
    }
  }

  function handleFilePick(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) onAttach(file)
    e.target.value = ""
  }

  const hasMessages = messages.length > 0
  const lastAssistantId = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant") return messages[i].id
    }
    return null
  })()

  function handleExport() {
    const text = messages.map((m) => `[${m.role === "user" ? "You" : "NyaAI"}]\n${m.content}\n`).join("\n")
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `nya-chat-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="h-4 w-full shrink-0" />

      {!hasMessages ? (
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-white dark:bg-neutral-950">
          <div className="flex flex-col items-center gap-4 w-full max-w-xl">

            <h1 className="text-xl font-semibold text-neutral-900 dark:text-white text-center">
              What can I help with?
            </h1>
            <ChatInput onSend={onSend} onAttach={onAttach} disabled={loading} enterToSend={enterToSend} showSuggestions={showSuggestions} centered />
          </div>
        </div>
      ) : (
        <div className="flex-1 relative bg-white dark:bg-neutral-950">
          <div className="absolute inset-0 overflow-y-auto py-2 scroll-smooth" style={{ paddingBottom: "160px" }}>
            {messages.length > 0 && (
              <div className="mx-auto max-w-3xl flex justify-end px-4 mb-1">
                <button
                  onClick={handleExport}
                  className="flex items-center gap-1 px-2 py-0.5 text-[10px] text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-all"
                  title="Export conversation"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Export
                </button>
              </div>
            )}
            <div className="mx-auto max-w-3xl space-y-2">
              {messages.map((msg, idx, arr) => {
                const showDate = idx === 0 || new Date(msg.timestamp || 0).toDateString() !== new Date(arr[idx - 1].timestamp || 0).toDateString()
                return msg.role === "user" ? (
                  <UserMessage key={msg.id} msg={msg} onEdit={onEdit} userEmail={userEmail} showDate={showDate} />
                ) : (
                  <AssistantMessage
                    key={msg.id}
                    msg={msg}
                    onRegenerate={onRegenerate}
                    isLatest={msg.id === lastAssistantId}
                    loading={loading}
                    showDate={showDate}
                  />
                )
              })}
              {loading && messages.length === 0 && (
                <div className="flex gap-2 px-4 py-1 animate-fade-up">
                  <NLogo className="h-5 w-5" />
                  <div className="flex items-center gap-1.5 py-1">
                    <span className="text-xs text-neutral-400">Searching company knowledge</span>
                    <span className="w-1 h-1 rounded-full bg-purple-500 typing-dot" />
                    <span className="w-1 h-1 rounded-full bg-purple-500 typing-dot" />
                    <span className="w-1 h-1 rounded-full bg-purple-500 typing-dot" />
                  </div>
                </div>
              )}
              {loading && messages.length > 0 && (messages[messages.length - 1].role === "user" || (messages[messages.length - 1].role === "assistant" && !messages[messages.length - 1].content)) && (
                <div className="px-4 py-1 animate-fade-up">
                  <div className="max-w-3xl">
                    <div className="mb-1">
                      <NLogo className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-1.5 py-1">
                      <span className="text-xs text-neutral-400">Thinking</span>
                      <span className="w-1 h-1 rounded-full bg-purple-500 typing-dot" />
                      <span className="w-1 h-1 rounded-full bg-purple-500 typing-dot" />
                      <span className="w-1 h-1 rounded-full bg-purple-500 typing-dot" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
            <div className="mx-auto max-w-2xl">
              <div className="flex items-end gap-1.5 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-3 bg-white dark:bg-neutral-900 transition-all focus-within:border-purple-500 shadow-sm">
                <button
                  onClick={() => fileRef.current?.click()}
                  className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all shrink-0 self-end mb-0.5"
                  title="Attach file"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                </button>
                <input ref={fileRef} type="file" accept=".txt,.md,.csv,.json,.pdf" onChange={handleFilePick} className="hidden" />
                <textarea
                  ref={inputRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={loading ? "Generating..." : "Ask anything..."}
                  rows={1}
                  disabled={loading}
                  className="flex-1 bg-transparent border-none outline-none resize-none text-sm text-neutral-900 dark:text-white placeholder-neutral-500 font-sans py-1 max-h-[120px]"
                />
                <button
                  onClick={loading ? onCancel : handleSend}
                  className={`p-1.5 rounded-lg shrink-0 transition-all flex items-center justify-center ${
                    loading
                      ? "bg-neutral-300 dark:bg-neutral-700 text-neutral-500"
                      : canSend
                        ? "bg-purple-500 text-white hover:bg-purple-600"
                        : "bg-neutral-200 dark:bg-neutral-700 text-neutral-400 cursor-not-allowed"
                  }`}
                  title={loading ? "Stop" : "Send"}
                >
                  {loading ? (
                      <LuSquare size={18} />
                    ) : (
                      <LuArrowUp size={20} />
                    )}
                </button>
              </div>
            </div>
          </div>
          <p className="text-center text-[10px] text-neutral-400 pb-1">
            NyaAI can make mistakes.
          </p>
        </div>
      )}
    </div>
  )
}