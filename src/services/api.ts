import type { ChatResponse, UploadResponse, SearchResponse, DocumentListResponse, DocumentStatusResponse } from "../types"

const API_BASE = import.meta.env.VITE_API_URL || "/api"

let authToken: string | null = localStorage.getItem("nya-token")

export function setAuthToken(token: string | null) {
  authToken = token
  if (token) localStorage.setItem("nya-token", token)
  else localStorage.removeItem("nya-token")
}

export function getAuthToken() {
  return authToken
}

function authHeaders(): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" }
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`
  return headers
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { ...authHeaders(), ...options?.headers },
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(body || `API error: ${res.status}`)
  }
  return res.json()
}

export async function login(email: string, password: string): Promise<{ access_token: string; email: string; name: string }> {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
}

export async function register(name: string, email: string, password: string): Promise<{ access_token: string; email: string; name: string }> {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  })
}

export async function sendChatMessage(message: string, conversationId: string, signal?: AbortSignal): Promise<ChatResponse> {
  return request<ChatResponse>("/chat", {
    method: "POST",
    body: JSON.stringify({ message, conversation_id: conversationId }),
    signal,
  })
}

export async function streamChatMessage(
  message: string,
  conversationId: string,
  onToken: (token: string) => void,
  onDone: (sources: any[]) => void,
  onError: (err: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  const headers: Record<string, string> = { "Content-Type": "application/json" }
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`
  const res = await fetch(`${API_BASE}/chat/stream`, {
    method: "POST",
    headers,
    body: JSON.stringify({ message, conversation_id: conversationId }),
    signal,
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(body || `Stream error: ${res.status}`)
  }
  const reader = res.body!.getReader()
  const decoder = new TextDecoder()
  let buffer = ""

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split("\n")
    buffer = lines.pop() || ""
    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.slice(6).trim()
        if (data === "[DONE]") continue
        try {
          const parsed = JSON.parse(data)
          if (parsed.token) {
            onToken(parsed.token)
          }
          if (parsed.done) {
            onDone(parsed.sources || [])
          }
        } catch { /* skip malformed */ }
      }
    }
  }
}

export async function uploadFile(file: File, conversationId: string): Promise<UploadResponse> {
  const form = new FormData()
  form.append("file", file)
  form.append("conversation_id", conversationId)
  const headers: Record<string, string> = {}
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`
  const res = await fetch(`${API_BASE}/upload`, { method: "POST", body: form, headers })
  if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`)
  return res.json()
}

export async function searchQuery(query: string, topK = 5): Promise<SearchResponse> {
  return request<SearchResponse>("/search", {
    method: "POST",
    body: JSON.stringify({ query, top_k: topK }),
  })
}

export async function healthCheck(): Promise<{ status: string }> {
  return request<{ status: string }>("/health")
}

export async function listDocuments(): Promise<DocumentListResponse> {
  return request<DocumentListResponse>("/documents")
}

export async function deleteDocument(id: string): Promise<{ ok: boolean }> {
  return request<{ ok: boolean }>(`/documents/${id}`, { method: "DELETE" })
}

export async function reindexDocument(id: string): Promise<DocumentStatusResponse> {
  return request<DocumentStatusResponse>(`/documents/${id}/reindex`, { method: "POST" })
}

export async function getDocumentStatus(id: string): Promise<DocumentStatusResponse> {
  return request<DocumentStatusResponse>(`/documents/${id}/status`)
}
