import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { setAuthToken } from "../services/api"

interface AuthContextValue {
  user: string | null
  userName: string | null
  login: (email: string, name?: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(() => {
    const token = localStorage.getItem("nya-token")
    const email = localStorage.getItem("nya-email")
    return token && email ? email : null
  })
  const [userName, setUserName] = useState<string | null>(() => {
    return localStorage.getItem("nya-username") || null
  })

  const login = useCallback((email: string, name?: string) => {
    setUser(email)
    setUserName(name || null)
    localStorage.setItem("nya-email", email)
    if (name) localStorage.setItem("nya-username", name)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setUserName(null)
    setAuthToken(null)
    localStorage.removeItem("nya-email")
    localStorage.removeItem("nya-username")
    localStorage.removeItem("nya-token")
  }, [])

  return <AuthContext value={{ user, userName, login, logout }}>{children}</AuthContext>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
