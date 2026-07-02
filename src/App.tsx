import { useState, useCallback, useEffect } from "react"
import PageLoader from "./components/PageLoader"
import Sidebar from "./components/Sidebar"
import Chat from "./components/Chat"
import Buckets from "./components/Buckets"
import Settings from "./components/Settings"
import Login from "./components/Login"
import { useChat } from "./hooks/useApi"
import { setAuthToken } from "./services/api"
import type { Message } from "./services/types"

function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light" | "system">(() => {
    const saved = localStorage.getItem("nya-theme") as "dark" | "light" | "system" | null
    return saved || "dark"
  })

  useEffect(() => {
    localStorage.setItem("nya-theme", theme)
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else if (theme === "light") {
      root.classList.remove("dark")
    } else {
      const mq = window.matchMedia("(prefers-color-scheme: dark)")
      root.classList.toggle("dark", mq.matches)
      const handler = (e: MediaQueryListEvent) => root.classList.toggle("dark", e.matches)
      mq.addEventListener("change", handler)
      return () => mq.removeEventListener("change", handler)
    }
  }, [theme])

  return { theme, setTheme }
}

interface StoredConversation {
  id: string
  title: string
  timestamp: number
}

function loadConversations(): StoredConversation[] {
  try { return JSON.parse(localStorage.getItem("nya-conversations") || "[]") } catch { return [] }
}

function loadMessages(id: string) {
  try { return JSON.parse(localStorage.getItem(`nya-msg-${id}`) || "null") } catch { return null }
}

function saveConversation(id: string, title: string, messages: Message[]) {
  const all = loadConversations().filter((c) => c.id !== id)
  all.unshift({ id, title, timestamp: Date.now() })
  localStorage.setItem("nya-conversations", JSON.stringify(all))
  localStorage.setItem(`nya-msg-${id}`, JSON.stringify(messages))
}

export default function App() {
  const [user, setUser] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [activeView, setActiveView] = useState<"chat" | "knowledge">("chat")
  const [conversationId, setConversationId] = useState<string>(crypto.randomUUID())
  const [conversations, setConversations] = useState<StoredConversation[]>(() => loadConversations())
  const { theme, setTheme } = useTheme()
  const [enterToSend, setEnterToSend] = useState(() => localStorage.getItem("nya-enter-send") !== "false")
  const [showSuggestions, setShowSuggestions] = useState(() => localStorage.getItem("nya-suggestions") !== "false")

  useEffect(() => { localStorage.setItem("nya-enter-send", String(enterToSend)) }, [enterToSend])
  useEffect(() => { localStorage.setItem("nya-suggestions", String(showSuggestions)) }, [showSuggestions])

  const chat = useChat(conversationId)

  useEffect(() => {
    if (user) setSidebarOpen(true)
  }, [user])

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev)
  }, [])

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false)
  }, [])

  const openSidebar = useCallback(() => {
    setSidebarOpen(true)
  }, [])

  const syncConversation = useCallback(() => {
    if (chat.messages.length === 0) return
    const title = chat.messages[0].content.slice(0, 60) || "New chat"
    saveConversation(conversationId, title, chat.messages)
    setConversations(loadConversations())
  }, [conversationId, chat.messages])

  const logout = useCallback(() => {
    syncConversation()
    setUser(null)
    setAuthToken(null)
    chat.setMessages([])
    setConversationId(crypto.randomUUID())
    setActiveView("chat")
  }, [chat, syncConversation])

  const newChat = useCallback(() => {
    syncConversation()
    setConversationId(crypto.randomUUID())
    chat.setMessages([])
    setActiveView("chat")
  }, [chat, syncConversation])

  const selectConversation = useCallback((id: string) => {
    syncConversation()
    const msgs = loadMessages(id)
    if (msgs) chat.setMessages(msgs)
    setConversationId(id)
    setActiveView("chat")
  }, [chat, syncConversation])

  const navigateKnowledge = useCallback(() => {
    setActiveView("knowledge")
  }, [])

  return (
    <>
      <PageLoader />
      {!user ? (
        <Login onLogin={(email) => setUser(email)} />
      ) : (
        <div className="h-full flex bg-white dark:bg-neutral-950 overflow-hidden">
          <Sidebar
            open={sidebarOpen}
            onClose={closeSidebar}
            onNewChat={newChat}
            onUpload={chat.upload}
            onSettings={() => setSettingsOpen(true)}
            onNavigateKnowledge={navigateKnowledge}
            onSelectConversation={selectConversation}
            conversations={conversations}
            userEmail={user}
            onLogout={logout}
            activeView={activeView}
          />

          {sidebarOpen && (
            <div
              className="fixed inset-0 z-20 bg-black/20 dark:bg-black/40 overlay-fade-in md:hidden"
              onClick={closeSidebar}
            />
          )}

          {activeView === "chat" ? (
            <Chat
              messages={chat.messages}
              loading={chat.loading}
              onSend={chat.sendMessage}
              onEdit={chat.editMessage}
              onRegenerate={chat.regenerate}
              onAttach={chat.upload}
              onToggleSidebar={toggleSidebar}
              sidebarOpen={sidebarOpen}
              enterToSend={enterToSend}
              showSuggestions={showSuggestions}
              userEmail={user}
            />
          ) : (
            <Buckets onUpload={chat.upload} onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
          )}

          <Settings
            open={settingsOpen}
            onClose={() => setSettingsOpen(false)}
            theme={theme}
            onThemeChange={setTheme}
            enterToSend={enterToSend}
            onEnterToSendChange={setEnterToSend}
            showSuggestions={showSuggestions}
            onShowSuggestionsChange={setShowSuggestions}
          />
        </div>
      )}
    </>
  )
}