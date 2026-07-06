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

export async function sendChatMessage(message: string, conversationId: string): Promise<ChatResponse> {
  return request<ChatResponse>("/chat", {
    method: "POST",
    body: JSON.stringify({ message, conversation_id: conversationId }),
  })
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

export async function deleteDocument(id: string): Promise<void> {
  await fetch(`${API_BASE}/documents/${id}`, { method: "DELETE", headers: authHeaders() })
}

export async function reindexDocument(id: string): Promise<DocumentStatusResponse> {
  return request<DocumentStatusResponse>(`/documents/${id}/reindex`, { method: "POST" })
}

export async function getDocumentStatus(id: string): Promise<DocumentStatusResponse> {
  return request<DocumentStatusResponse>(`/documents/${id}/status`)
}
