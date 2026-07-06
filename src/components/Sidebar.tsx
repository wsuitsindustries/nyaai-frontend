import { useState, useMemo } from "react"
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
  conversations: StoredConversation[]
  userEmail: string
  onLogout: () => void
  activeView: "chat" | "knowledge"
}

export default function Sidebar({
  collapsed,
  onToggleCollapse,
  onNewChat,
  onSettings,
  onNavigateKnowledge,
  onSelectConversation,
  conversations,
  userEmail,
  onLogout,
  activeView
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
      <div className="p-4 pb-3 space-y-1.5">
        <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} mb-3`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <NLogo className="h-9 w-9 shrink-0" />
            {!collapsed && (
              <span className="text-base font-semibold text-neutral-900 dark:text-white truncate">
                Nya <span className="gradient-text">AI</span>
              </span>
            )}
          </div>
        </div>

        <button
          onClick={onNewChat}
          className={`w-full flex items-center ${collapsed ? "justify-center px-0" : "gap-3 px-4"} py-4 text-base text-neutral-700 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all`}
          title="New chat"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M12 5v14M5 12h14" />
          </svg>
          {!collapsed && <span>New chat</span>}
        </button>

        {!collapsed && (
          <div className="relative">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search conversations..."
              className="w-full bg-transparent border-0 rounded-lg pl-11 pr-4 py-3.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-500 outline-none"
            />
          </div>
        )}
      </div>

      {collapsed ? (
        <div className="flex-1" />
      ) : (
        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          {grouped.map((group) => {
            const filtered = group.conversations.filter((c) =>
              c.title.toLowerCase().includes(search.toLowerCase())
            )
            if (filtered.length === 0) return null
            return (
              <div key={group.label}>
                <p className="px-2 py-1 text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                  {group.label}
                </p>
                {filtered.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => onSelectConversation(conv.id)}
                    className="flex items-center gap-3 rounded-lg px-4 py-3.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-all group"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span className="truncate flex-1">{conv.title}</span>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      )}

      <div className="p-2 space-y-1">
        <button
          onClick={onNavigateKnowledge}
          className={`w-full flex items-center ${collapsed ? "justify-center px-0" : "gap-3 px-4"} py-4 text-base transition-all ${
            activeView === "knowledge"
              ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10"
              : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          }`}
          title="Buckets"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            <line x1="8" y1="7" x2="16" y2="7" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          {!collapsed && <span className="flex-1 text-left">Buckets</span>}
        </button>
        <button
          onClick={onSettings}
          className={`w-full flex items-center ${collapsed ? "justify-center px-0" : "gap-3 px-4"} py-4 text-base text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all`}
          title="Settings"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          {!collapsed && <span className="flex-1 text-left">Settings</span>}
        </button>
        <button
          onClick={onLogout}
          className={`w-full flex items-center ${collapsed ? "justify-center px-0" : "gap-3 px-4"} py-4 text-base text-neutral-600 dark:text-neutral-400 hover:text-red-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all`}
          title={userEmail}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          {!collapsed && <span className="flex-1 text-left truncate">{userEmail}</span>}
        </button>
      </div>
    </div>
  )

  return (
    <aside className={`flex flex-col flex-shrink-0 relative z-30 bg-neutral-50 dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 transition-all duration-300 ${collapsed ? "w-16" : "w-72"}`}>
      {sidebarContent}
      <button
        onClick={onToggleCollapse}
        className="absolute top-1/2 -translate-y-1/2 -right-4 z-40 w-8 h-8 rounded-lg flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        )}
      </button>
    </aside>
  )
}