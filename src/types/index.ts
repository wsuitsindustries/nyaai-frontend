export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  sources?: Source[]
}

export interface Source {
  title: string
  page?: string
  section?: string
  snippet?: string
  url?: string
}

export interface ChatResponse {
  answer: string
  sources: Source[]
  response?: string
}

export interface UploadResponse {
  filename: string
  chunks: number
  conversation_id: string
  error?: string
}

export interface SearchResponse {
  results: string[]
}

export type DocumentStatus = "uploading" | "extracting" | "chunking" | "embedding" | "ready" | "failed"

export interface Document {
  id: string
  filename: string
  size: number
  uploaded_at: string
  status: DocumentStatus
  chunks: number
  error?: string
}

export interface DocumentListResponse {
  documents: Document[]
}

export interface DocumentStatusResponse {
  id: string
  status: DocumentStatus
}

export interface StoredConversation {
  id: string
  title: string
  timestamp: number
}
