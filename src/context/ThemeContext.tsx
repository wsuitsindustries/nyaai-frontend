import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Theme = "dark" | "light" | "system"

interface ThemeContextValue {
  theme: Theme
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("nya-theme") as Theme) || "dark"
  })

  useEffect(() => {
    localStorage.setItem("nya-theme", theme)
    const root = document.documentElement
    if (theme === "dark") root.classList.add("dark")
    else if (theme === "light") root.classList.remove("dark")
    else {
      const mq = window.matchMedia("(prefers-color-scheme: dark)")
      root.classList.toggle("dark", mq.matches)
      const handler = (e: MediaQueryListEvent) => root.classList.toggle("dark", e.matches)
      mq.addEventListener("change", handler)
      return () => mq.removeEventListener("change", handler)
    }
  }, [theme])

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
