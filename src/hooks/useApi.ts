import { useState, useCallback, useRef, useEffect } from "react"
import { uploadFile, streamChatMessage, healthCheck } from "../services/api"
import type { Message, Source } from "../types"

function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

export function useChat(conversationId: string) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const assistantIdRef = useRef<string | null>(null)
  const convIdRef = useRef(conversationId)
  convIdRef.current = conversationId

  useEffect(() => {
    return () => {
      abortRef.current?.abort()
      abortRef.current = null
    }
  }, [])

  const appendAssistantResponse = useCallback(async (text: string) => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    assistantIdRef.current = generateId()
    const msgId = assistantIdRef.current
    const ts = Date.now()
    setMessages((prev) => [
      ...prev,
      { id: msgId, role: "assistant", content: "", timestamp: ts },
    ])

    setLoading(true)
    try {
      await streamChatMessage(
        text,
        conversationId,
        (token) => {
          if (convIdRef.current !== conversationId) return
          setMessages((prev) =>
            prev.map((m) =>
              m.id === msgId ? { ...m, content: m.content + token } : m
            )
          )
        },
        (sources) => {
          if (convIdRef.current !== conversationId) return
          setMessages((prev) =>
            prev.map((m) =>
              m.id === msgId ? { ...m, sources: sources as Source[] } : m
            )
          )
        },
        controller.signal,
      )
    } catch (err: any) {
      if (err?.name === "AbortError") {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId ? { ...m, content: "Generation cancelled." } : m
          )
        )
      } else {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId
              ? { ...m, content: "Sorry, I couldn't reach the backend. Make sure the server is running." }
              : m
          )
        )
      }
    }
    setLoading(false)
    abortRef.current = null
    assistantIdRef.current = null
  }, [conversationId])

  const cancel = useCallback(() => {
    abortRef.current?.abort()
  }, [])

  const sendMessage = useCallback(async (text: string) => {
    const ts = Date.now()
    const userMsg: Message = { id: generateId(), role: "user", content: text, timestamp: ts }
    setMessages((prev) => [...prev, userMsg])
    await appendAssistantResponse(text)
  }, [appendAssistantResponse])

  const editMessage = useCallback(async (messageId: string, newText: string) => {
    setMessages((prev) => {
      const idx = prev.findIndex((m) => m.id === messageId)
      if (idx === -1) return prev
      return prev.slice(0, idx).concat({ ...prev[idx], content: newText })
    })
    await appendAssistantResponse(newText)
  }, [appendAssistantResponse])

  const regenerate = useCallback(async () => {
    const lastMsg = messages[messages.length - 1]
    if (!lastMsg || lastMsg.role !== "assistant") return
    const lastUserMsg = messages.slice(0, -1).reverse().find((m) => m.role === "user")
    if (!lastUserMsg) return
    setMessages((prev) => prev.slice(0, -1))
    await appendAssistantResponse(lastUserMsg.content)
  }, [messages, appendAssistantResponse])

  const upload = useCallback(async (file: File) => {
    const ts = Date.now()
    const userMsg: Message = {
      id: generateId(),
      role: "user",
      content: `**${file.name}** — Uploading...`,
      timestamp: ts,
    }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)

    const stepMsgId = generateId()
    setMessages((prev) => [
      ...prev,
      {
        id: stepMsgId,
        role: "assistant",
        content: `**${file.name}** — Uploading...`,
        timestamp: ts + 1,
      } as Message,
    ])

    try {
      const data = await uploadFile(file, conversationId)
      const finalMsg: Message = {
        id: generateId(),
        role: "assistant",
        content: data.error
          ? `Upload failed: ${data.error}`
          : `**${file.name}** indexed successfully (${data.chunks} chunks)`,
        timestamp: Date.now(),
      }
      setMessages((prev) => [...prev.filter((m) => m.id !== stepMsgId), finalMsg])
    } catch {
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== stepMsgId),
        {
          id: generateId(),
          role: "assistant",
          content: `Upload failed — is the backend running?`,
          timestamp: Date.now(),
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