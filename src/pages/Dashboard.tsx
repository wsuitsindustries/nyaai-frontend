import { useState, useCallback, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import { useChat } from "../hooks/useApi"
import Sidebar from "../components/Sidebar"
import Chat from "../components/Chat"
import Buckets from "../components/Buckets"
import Settings from "../components/Settings"
import SearchMessages from "../components/SearchMessages"
import type { StoredConversation, Message } from "../types"
import { loadConversations, loadMessages, saveConversation, deleteConversation, renameConversation } from "../utils/storage"

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout: authLogout } = useAuth()
  const { theme, setTheme } = useTheme()

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeView, setActiveView] = useState<"chat" | "knowledge">("chat")
  const [conversationId, setConversationId] = useState<string>(crypto.randomUUID())
  const [conversations, setConversations] = useState<StoredConversation[]>(() => loadConversations())
  const [enterToSend, setEnterToSend] = useState(() => localStorage.getItem("nya-enter-send") !== "false")
  const [showSuggestions, setShowSuggestions] = useState(() => localStorage.getItem("nya-suggestions") !== "false")

  useEffect(() => { localStorage.setItem("nya-enter-send", String(enterToSend)) }, [enterToSend])
  useEffect(() => { localStorage.setItem("nya-suggestions", String(showSuggestions)) }, [showSuggestions])

  useEffect(() => {
    if (!user) navigate("/login", { replace: true })
  }, [user, navigate])

  const chat = useChat(conversationId)

  const toggleCollapse = useCallback(() => setSidebarCollapsed((prev) => !prev), [])

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

  const deleteConv = useCallback((id: string) => {
    deleteConversation(id)
    if (id === conversationId) {
      setConversationId(crypto.randomUUID())
      chat.setMessages([])
    }
    setConversations(loadConversations())
  }, [conversationId, chat])

  const renameConv = useCallback((id: string, title: string) => {
    renameConversation(id, title)
    setConversations(loadConversations())
  }, [])

  const selectSearchResult = useCallback((convId: string) => {
    syncConversation()
    const msgs = loadMessages(convId)
    if (msgs) chat.setMessages(msgs)
    setConversationId(convId)
    setActiveView("chat")
  }, [chat, syncConversation])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (searchOpen) { setSearchOpen(false); return }
        if (settingsOpen) { setSettingsOpen(false); return }
        return
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "n") {
        e.preventDefault()
        newChat()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [settingsOpen, searchOpen, newChat])

  return (
    <div className="h-full flex bg-white dark:bg-neutral-950 overflow-hidden">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={toggleCollapse}
        onNewChat={newChat}
        onUpload={chat.upload}
        onSettings={() => setSettingsOpen(true)}
        onNavigateKnowledge={navigateKnowledge}
        onSelectConversation={selectConversation}
        onDeleteConversation={deleteConv}
        onRenameConversation={renameConv}
        conversations={conversations}
        conversationsLoading={false}
        userEmail={user || ""}
        onLogout={logout}
        activeView={activeView}
      />

      {activeView === "chat" ? (
        <Chat
          messages={chat.messages}
          loading={chat.loading}
          onSend={chat.sendMessage}
          onEdit={chat.editMessage}
          onRegenerate={chat.regenerate}
          onAttach={chat.upload}
          onCancel={chat.cancel}
          enterToSend={enterToSend}
          showSuggestions={showSuggestions}
          userEmail={user || ""}
        />
      ) : (
        <Buckets onUpload={chat.upload} />
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

      <SearchMessages
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectMessage={selectSearchResult}
      />
    </div>
  )
}
