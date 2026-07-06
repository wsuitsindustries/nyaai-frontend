import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"
import { AuthProvider } from "./context/AuthContext"
import ErrorBoundary from "./components/ui/ErrorBoundary"
import PageLoader from "./components/ui/PageLoader"
import Dashboard from "./pages/Dashboard"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Privacy from "./pages/Privacy"
import Terms from "./pages/Terms"
import Contact from "./pages/Contact"

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/privacy" element={<ErrorBoundary><Privacy /></ErrorBoundary>} />
            <Route path="/terms" element={<ErrorBoundary><Terms /></ErrorBoundary>} />
            <Route path="/contact" element={<ErrorBoundary><Contact /></ErrorBoundary>} />
            <Route path="/login" element={<ErrorBoundary><Login /></ErrorBoundary>} />
            <Route path="/*" element={<ErrorBoundary><PageLoader /><Dashboard /></ErrorBoundary>} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
