import { useState, useMemo, useRef, useEffect } from "react"
import BrandLogo from "./ui/BrandLogo"
import NLogo from "./ui/NLogo"

interface StoredConversation {
  id: string
  title: string
  timestamp: number
}

interface SidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
  onNewChat: () => void
  onUpload: (file: File) => void
  onSettings: () => void
  onNavigateKnowledge: () => void
  onSelectConversation: (id: string) => void
  onDeleteConversation: (id: string) => void
  onRenameConversation: (id: string, title: string) => void
  conversations: StoredConversation[]
  conversationsLoading?: boolean
  userEmail: string
  userName?: string
  onLogout: () => void
  activeView: "chat" | "knowledge"
}

function ConversationItem({ conv, onSelect, onDelete, onRename }: {
  conv: StoredConversation
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  onRename: (id: string, title: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(conv.title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  function handleRename() {
    if (editTitle.trim() && editTitle !== conv.title) {
      onRename(conv.id, editTitle.trim())
    }
    setEditing(false)
  }

  return editing ? (
    <div className="flex items-center gap-2 rounded-lg px-3 py-2">
      <input
        ref={inputRef}
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        onBlur={handleRename}
        onKeyDown={(e) => {
          if (e.key === "Enter") { e.preventDefault(); handleRename() }
          if (e.key === "Escape") { setEditTitle(conv.title); setEditing(false) }
        }}
        className="flex-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md px-2 py-1 text-sm text-neutral-900 dark:text-white outline-none focus:border-purple-500"
      />
    </div>
  ) : (
    <div
      onClick={() => onSelect(conv.id)}
      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-all group"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      <span className="truncate flex-1">{conv.title}</span>
      <div className="hidden group-hover:flex items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => { setEditing(true); setEditTitle(conv.title) }}
          className="p-1 rounded text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all"
          title="Rename"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(conv.id)}
          className="p-1 rounded text-neutral-400 hover:text-red-500 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all"
          title="Delete"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>
    </div>
  )
}

const SKELETON_ROWS = 8

function SkeletonRow() {
  return (
    <div className="flex items-center gap-2.5 px-3 py-2">
      <div className="w-[18px] h-[18px] rounded bg-neutral-200 dark:bg-neutral-800 animate-shimmer" />
      <div className="flex-1 h-3 rounded bg-neutral-200 dark:bg-neutral-800 animate-shimmer" />
    </div>
  )
}

function ProfileSection({ collapsed, userEmail, userName, onSettings, onLogout }: {
  collapsed: boolean
  userEmail: string
  userName?: string
  onSettings: () => void
  onLogout: () => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const initial = (userName?.charAt(0) || userEmail.charAt(0) || "U").toUpperCase()

  return (
    <div ref={ref} className="relative">
      <div
        onClick={() => { onSettings(); setOpen(false) }}
        className={`w-full flex items-center ${collapsed ? "justify-center px-0" : "gap-2.5 px-3"} py-2.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-all cursor-pointer`}
        title="Profile"
      >
        <div className="w-7 h-7 rounded-md bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center shrink-0">
          <span className="text-xs font-semibold text-purple-700 dark:text-purple-300">{initial}</span>
        </div>
        {!collapsed && (
          <>
            <span className="flex-1 text-left truncate text-sm">{userName || userEmail}</span>
            <button
              onClick={(e) => { e.stopPropagation(); setOpen(!open) }}
              className="p-1 rounded text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>
          </>
        )}
      </div>
      {open && !collapsed && (
        <div className="absolute bottom-full left-0 right-0 mb-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg overflow-hidden animate-fade-in">
          <button
            onClick={() => { onSettings(); setOpen(false) }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            Settings
          </button>
          <button
            onClick={() => { onLogout(); setOpen(false) }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-red-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Log out
          </button>
        </div>
      )}
    </div>
  )
}

export default function Sidebar({
  collapsed,
  onToggleCollapse,
  onNewChat,
  onSettings,
  onNavigateKnowledge,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation,
  conversations,
  conversationsLoading,
  userEmail,
  userName,
  onLogout,
  activeView,
}: SidebarProps) {
  const [search, setSearch] = useState("")

  const grouped = useMemo(() => {
    const now = Date.now()
    const day = 86400000
    const labels = ["Today", "Yesterday", "Previous 7 Days", "Older"] as const
    const buckets: { label: typeof labels[number]; conversations: StoredConversation[] }[] = [
      { label: "Today", conversations: [] },
      { label: "Yesterday", conversations: [] },
      { label: "Previous 7 Days", conversations: [] },
      { label: "Older", conversations: [] },
    ]
    for (const c of conversations) {
      const diff = now - c.timestamp
      const idx = diff < day ? 0 : diff < day * 2 ? 1 : diff < day * 7 ? 2 : 3
      buckets[idx].conversations.push(c)
    }
    return buckets
  }, [conversations])

  const sidebarContent = (
    <div className="flex flex-col h-full safe-top safe-bottom">
      <div className="p-3 pb-2 space-y-1">
        <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} mb-2`}>
          <div className="flex items-center gap-2.5 overflow-hidden">
            {collapsed ? <NLogo className="h-7 w-7 shrink-0" /> : <BrandLogo className="h-7 w-auto" />}
          </div>
        </div>

        <button
          onClick={onNewChat}
          className={`w-full flex items-center ${collapsed ? "justify-center px-0" : "gap-2.5 px-3"} py-2.5 text-sm text-neutral-700 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-all`}
          title="New chat"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M12 5v14M5 12h14" />
          </svg>
          {!collapsed && <span>New chat</span>}
        </button>

        {!collapsed && (
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent border-0 rounded-lg pl-9 pr-3 py-2 text-sm text-neutral-900 dark:text-white placeholder-neutral-500 outline-none"
            />
          </div>
        )}
      </div>

      {collapsed ? (
        <div className="flex-1" />
      ) : conversationsLoading ? (
        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          {Array.from({ length: SKELETON_ROWS }).map((_, i) => <SkeletonRow key={i} />)}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
          {grouped.map((group) => {
            const filtered = group.conversations.filter((c) =>
              c.title.toLowerCase().includes(search.toLowerCase())
            )
            if (filtered.length === 0) return null
            return (
              <div key={group.label}>
                <p className="px-3 py-1 text-[11px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                  {group.label}
                </p>
                {filtered.map((conv) => (
                  <ConversationItem
                    key={conv.id}
                    conv={conv}
                    onSelect={onSelectConversation}
                    onDelete={onDeleteConversation}
                    onRename={onRenameConversation}
                  />
                ))}
              </div>
            )
          })}
        </div>
      )}

      <div className="p-2 space-y-0.5">
        <button
          onClick={onNavigateKnowledge}
          className={`w-full flex items-center ${collapsed ? "justify-center px-0" : "gap-2.5 px-3"} py-2.5 text-sm rounded-lg transition-all ${
            activeView === "knowledge"
              ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10"
              : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          }`}
          title="Buckets"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            <line x1="8" y1="7" x2="16" y2="7" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          {!collapsed && <span className="flex-1 text-left">Buckets</span>}
        </button>

        <ProfileSection
          collapsed={collapsed}
          userEmail={userEmail}
          userName={userName}
          onSettings={onSettings}
          onLogout={onLogout}
        />
      </div>
    </div>
  )

  return (
    <aside className={`flex flex-col flex-shrink-0 relative z-30 bg-neutral-50 dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
      {sidebarContent}
      <button
        onClick={onToggleCollapse}
        className="absolute top-1/2 -translate-y-1/2 -right-3.5 z-40 w-7 h-7 rounded-lg flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        )}
      </button>
    </aside>
  )
}