import { useRef, useEffect, useState, type KeyboardEvent } from "react"
import NLogo from "./ui/NLogo"
import type { Message } from "../types"

const inputSuggestions = [
  "What are our company policies?",
  "Summarize recent documents",
  "Find information about our products",
  "Help me understand this topic",
]

interface ChatProps {
  messages: Message[]
  loading: boolean
  onSend: (text: string) => void
  onEdit: (id: string, text: string) => void
  onRegenerate: (id: string) => void
  onAttach: (file: File) => void
  onCancel?: () => void
  enterToSend: boolean
  showSuggestions: boolean
  userEmail: string
}

function UserMessage({ msg, onEdit, userEmail, showDate }: {
  msg: Message
  onEdit: (id: string, text: string) => void
  userEmail: string
  showDate: boolean
}) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(msg.content)

  function handleSave() {
    if (editText.trim() && editText !== msg.content) {
      onEdit(msg.id, editText.trim())
    }
    setEditing(false)
  }

  return (
    <div className="flex justify-end px-4">
      <div className="max-w-[85%] sm:max-w-[75%]">
        {showDate && (
          <p className="text-[10px] text-neutral-400 text-right mb-1">
            {new Date(msg.timestamp || Date.now()).toLocaleDateString()}
          </p>
        )}
        <div className="flex items-start gap-2 flex-row-reverse">
          <div className="w-7 h-7 rounded-lg bg-purple-500/20 dark:bg-purple-500/30 flex items-center justify-center text-xs font-semibold text-purple-600 dark:text-purple-400 shrink-0">
            {(userEmail || "U")[0].toUpperCase()}
          </div>
          <div
            className="group relative bg-neutral-100 dark:bg-neutral-800 rounded-2xl rounded-tr-md px-3.5 py-2.5 cursor-pointer"
            onClick={() => setEditing(true)}
          >
            {editing ? (
              <div className="flex flex-col gap-1.5">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full bg-transparent text-sm text-neutral-900 dark:text-white outline-none resize-none"
                  rows={2}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSave() }
                    if (e.key === "Escape") { setEditText(msg.content); setEditing(false) }
                  }}
                />
                <div className="flex gap-1.5 justify-end">
                  <button onClick={() => { setEditText(msg.content); setEditing(false) }} className="text-[11px] text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 px-2 py-0.5 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">Cancel</button>
                  <button onClick={handleSave} className="text-[11px] text-white bg-purple-500 hover:bg-purple-600 px-2 py-0.5 rounded-md transition-colors">Save</button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-neutral-900 dark:text-white whitespace-pre-wrap break-words">{msg.content}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function AssistantMessage({ msg, onRegenerate, isLatest, loading, showDate }: {
  msg: Message
  onRegenerate: (id: string) => void
  isLatest: boolean
  loading: boolean
  showDate: boolean
}) {
  return (
    <div className="flex px-4">
      <div className="max-w-[85%] sm:max-w-[75%]">
        {showDate && (
          <p className="text-[10px] text-neutral-400 mb-1">
            {new Date(msg.timestamp || Date.now()).toLocaleDateString()}
          </p>
        )}
        <div className="flex items-start gap-2">
          <NLogo className="w-7 h-7 shrink-0 mt-0.5" />
          <div className="min-w-0">
            {msg.content ? (
              <div className="bg-transparent rounded-2xl rounded-tl-md px-0.5 py-0.5">
                <p className="text-sm text-neutral-900 dark:text-white whitespace-pre-wrap break-words leading-relaxed">{msg.content}</p>
              </div>
            ) : loading && isLatest ? (
              <div className="flex items-center gap-1.5 py-2">
                <span className="text-xs text-neutral-400">Thinking</span>
                <span className="w-1 h-1 rounded-full bg-purple-500 typing-dot" />
                <span className="w-1 h-1 rounded-full bg-purple-500 typing-dot" />
                <span className="w-1 h-1 rounded-full bg-purple-500 typing-dot" />
              </div>
            ) : null}
            {msg.sources && msg.sources.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {msg.sources.map((src, i) => (
                  <span key={i} className="text-[10px] text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-700">
                    {src.title}{src.page ? ` p.${src.page}` : ""}
                  </span>
                ))}
              </div>
            )}
            {isLatest && !loading && msg.content && (
              <button
                onClick={() => onRegenerate(msg.id)}
                className="mt-1 flex items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 px-2 py-0.5 rounded-lg transition-all"
                title="Regenerate"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                Regenerate
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ChatInputBar({
  value,
  onChange,
  onSend,
  onAttach,
  onCancel,
  disabled,
  placeholder,
  enterToSend,
}: {
  value: string
  onChange: (v: string) => void
  onSend: () => void
  onAttach: (file: File) => void
  onCancel?: () => void
  disabled: boolean
  placeholder: string
  enterToSend: boolean
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const ta = textareaRef.current
    if (ta) {
      ta.style.height = "auto"
      ta.style.height = Math.min(ta.scrollHeight, 200) + "px"
    }
  }, [value])

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (disabled) return
    if (enterToSend) {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend() }
    } else {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); onSend() }
    }
  }

  const canSend = value.trim().length > 0

  return (
    <div
      className="w-full rounded-[26px] border border-neutral-200 dark:border-neutral-700/80
        bg-white dark:bg-neutral-800
        shadow-[0_2px_14px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_14px_rgba(0,0,0,0.35)]
        transition-all
        focus-within:border-purple-400 dark:focus-within:border-purple-500/60
        focus-within:shadow-[0_2px_18px_rgba(168,85,247,0.18)]"
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={1}
        disabled={disabled}
        className="w-full bg-transparent border-none outline-none resize-none
          text-[15px] leading-6 text-neutral-900 dark:text-white
          placeholder-neutral-400 dark:placeholder-neutral-500 font-sans
          px-4 pt-3.5 pb-1 max-h-[200px]"
      />

      <div className="flex items-center justify-between px-2.5 pb-2.5 pt-1">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center w-8 h-8 rounded-full
            text-neutral-500 dark:text-neutral-400
            hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          title="Attach file"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

        <button
          onClick={disabled ? onCancel : onSend}
          disabled={!disabled && !canSend}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${
            disabled
              ? "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900"
              : canSend
                ? "bg-purple-500 text-white hover:bg-purple-600"
                : "bg-neutral-200 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500 cursor-not-allowed"
          }`}
          title={disabled ? "Stop generating" : "Send"}
        >
          {disabled ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="1" /></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

export default function Chat({ messages, loading, onSend, onEdit, onRegenerate, onAttach, enterToSend, showSuggestions, onCancel = () => {}, userEmail }: ChatProps) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const [inputText, setInputText] = useState("")

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  function handleSend() {
    if (!inputText.trim() || loading) return
    if (inputText.trim().length > 10000) return
    onSend(inputText.trim())
    setInputText("")
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
            <ChatInputBar
              value={inputText}
              onChange={setInputText}
              onSend={handleSend}
              onAttach={onAttach}
              disabled={loading}
              enterToSend={enterToSend}
              placeholder="Ask about your organization's knowledge..."
            />
            {showSuggestions && (
              <div className="flex flex-wrap justify-center gap-1.5 mt-1">
                {inputSuggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => onSend(s)}
                    className="px-2.5 py-1 text-[11px] text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-full hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
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
              <div ref={bottomRef} />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
            <div className="mx-auto max-w-2xl">
              <ChatInputBar
                value={inputText}
                onChange={setInputText}
                onSend={handleSend}
                onAttach={onAttach}
                onCancel={onCancel}
                disabled={loading}
                enterToSend={enterToSend}
                placeholder={loading ? "Generating..." : "Ask anything..."}
              />
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