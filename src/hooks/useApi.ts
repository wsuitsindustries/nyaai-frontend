import { useState, useCallback, useRef } from "react"
import { sendChatMessage, uploadFile, searchQuery, healthCheck } from "../services/api"
import type { Message, Source } from "../types"

export function useChat(conversationId: string) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const appendAssistantResponse = useCallback(async (text: string) => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    try {
      const data = await sendChatMessage(text, conversationId, controller.signal)
      const sources: Source[] = (data.sources || []).map((s: any) =>
        typeof s === "string" ? { title: s } : s
      )
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.answer || data.response || "No response.",
          sources,
        },
      ])
    } catch (err: any) {
      const aborted = err?.name === "AbortError"
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: aborted ? "Generation cancelled." : "Sorry, I couldn't reach the backend. Make sure the server is running.",
        },
      ])
    }
    setLoading(false)
    abortRef.current = null
  }, [conversationId])

  const cancel = useCallback(() => {
    abortRef.current?.abort()
  }, [])

  const sendMessage = useCallback(async (text: string) => {
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text }
    setMessages((prev) => [...prev, userMsg])
    await appendAssistantResponse(text)
  }, [appendAssistantResponse])

  const editMessage = useCallback(async (messageId: string, newText: string) => {
    const idx = messages.findIndex((m) => m.id === messageId)
    if (idx === -1) return
    const edited = messages.slice(0, idx).concat({ ...messages[idx], content: newText })
    setMessages(edited)
    await appendAssistantResponse(newText)
  }, [messages, appendAssistantResponse])

  const regenerate = useCallback(async () => {
    const lastMsg = messages[messages.length - 1]
    if (!lastMsg || lastMsg.role !== "assistant") return
    const lastUserMsg = messages.slice(0, -1).reverse().find((m) => m.role === "user")
    if (!lastUserMsg) return
    setMessages((prev) => prev.slice(0, -1))
    await appendAssistantResponse(lastUserMsg.content)
  }, [messages, appendAssistantResponse])

  const upload = useCallback(async (file: File) => {
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: `**${file.name}** — Uploading...`,
    }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)

    const stepMsgId = crypto.randomUUID()
    setMessages((prev) => [
      ...prev,
      {
        id: stepMsgId,
        role: "assistant",
        content: `**${file.name}** — Uploading...`,
      } as Message,
    ])

    try {
      const data = await uploadFile(file, conversationId)
      const finalMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.error
          ? `Upload failed: ${data.error}`
          : `**${file.name}** indexed successfully (${data.chunks} chunks)`,
      }
      setMessages((prev) => [...prev.filter((m) => m.id !== stepMsgId), finalMsg])
    } catch {
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== stepMsgId),
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `Upload failed — is the backend running?`,
        },
      ])
    }
    setLoading(false)
  }, [conversationId])

  return { messages, setMessages, loading, sendMessage, editMessage, regenerate, upload, cancel }
}

export function useBackendHealth() {
  const [healthy, setHealthy] = useState<boolean | null>(null)

  const check = useCallback(async () => {
    try {
      await healthCheck()
      setHealthy(true)
    } catch {
      setHealthy(false)
    }
  }, [])

  return { healthy, check }
}