import { useState, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import { useChat } from "../hooks/useApi"
import Sidebar from "../components/Sidebar"
import Chat from "../components/Chat"
import Buckets from "../components/Buckets"
import Settings from "../components/Settings"
import type { StoredConversation, Message } from "../types"
import { loadConversations, loadMessages, saveConversation } from "../utils/storage"

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout: authLogout } = useAuth()
  const { theme, setTheme } = useTheme()

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [activeView, setActiveView] = useState<"chat" | "knowledge">("chat")
  const [conversationId, setConversationId] = useState<string>(crypto.randomUUID())
  const [conversations, setConversations] = useState<StoredConversation[]>(() => loadConversations())
  const [enterToSend, setEnterToSend] = useState(() => localStorage.getItem("nya-enter-send") !== "false")
  const [showSuggestions, setShowSuggestions] = useState(() => localStorage.getItem("nya-suggestions") !== "false")

  useEffect(() => { localStorage.setItem("nya-enter-send", String(enterToSend)) }, [enterToSend])
  useEffect(() => { localStorage.setItem("nya-suggestions", String(showSuggestions)) }, [showSuggestions])

  useEffect(() => {
    if (!user) navigate("/", { replace: true })
  }, [user, navigate])

  const chat = useChat(conversationId)

  useEffect(() => { if (user) setSidebarOpen(true) }, [user])

  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  const syncConversation = useCallback(() => {
    if (chat.messages.length === 0) return
    const title = chat.messages[0].content.slice(0, 60) || "New chat"
    saveConversation(conversationId, title, chat.messages)
    setConversations(loadConversations())
  }, [conversationId, chat.messages])

  const logout = useCallback(() => {
    syncConversation()
    authLogout()
    chat.setMessages([])
    setConversationId(crypto.randomUUID())
    setActiveView("chat")
  }, [chat, syncConversation, authLogout])

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

  const navigateKnowledge = useCallback(() => setActiveView("knowledge"), [])

  return (
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
        userEmail={user || ""}
        onLogout={logout}
        activeView={activeView}
      />

      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/20 dark:bg-black/40 overlay-fade-in md:hidden" onClick={closeSidebar} />
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
          userEmail={user || ""}
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
  )
}
