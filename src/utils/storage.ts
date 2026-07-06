import type { StoredConversation, Message } from "../types"

export function loadConversations(): StoredConversation[] {
  try { return JSON.parse(localStorage.getItem("nya-conversations") || "[]") } catch { return [] }
}

export function loadMessages(id: string): Message[] | null {
  try { return JSON.parse(localStorage.getItem(`nya-msg-${id}`) || "null") } catch { return null }
}

export function saveConversation(id: string, title: string, messages: Message[]) {
  const all = loadConversations().filter((c) => c.id !== id)
  all.unshift({ id, title, timestamp: Date.now() })
  localStorage.setItem("nya-conversations", JSON.stringify(all))
  localStorage.setItem(`nya-msg-${id}`, JSON.stringify(messages))
}
