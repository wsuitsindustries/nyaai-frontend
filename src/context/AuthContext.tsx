import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { setAuthToken } from "../services/api"

interface AuthContextValue {
  user: string | null
  login: (email: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(() => {
    const token = localStorage.getItem("nya-token")
    const email = localStorage.getItem("nya-email")
    return token && email ? email : null
  })

  const login = useCallback((email: string) => {
    setUser(email)
    localStorage.setItem("nya-email", email)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setAuthToken(null)
    localStorage.removeItem("nya-email")
    localStorage.removeItem("nya-token")
  }, [])

  return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
