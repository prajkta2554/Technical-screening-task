import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import ScanDetail from './Pages/ScanDetail' 

// We need useNavigate inside a component, so we wrap it
function AppRoutes() {
  const navigate = useNavigate()
  const [authed, setAuthed] = useState(false)
  const [theme, setTheme] = useState('light')

  function toggleTheme() {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <Routes>

      {/* Screen 1 — Login */}
      <Route
        path="/"
        element={
          authed
            ? <Navigate to="/dashboard" />
            : <Login
                theme={theme}
                toggleTheme={toggleTheme}
                onAuth={() => setAuthed(true)}
              />
        }
      />

      {/* Screen 2 — Dashboard */}
      <Route
        path="/dashboard"
        element={
          authed
            ? <Dashboard
                theme={theme}
                toggleTheme={toggleTheme}
                onScanClick={(id) => navigate(`/scans/${id}`)}
              />
            : <Navigate to="/" />
        }
      />

      {/* /scans goes to same ScanDetail page */}
      <Route
        path="/scan/:id"
        element={
          authed
            ? <ScanDetail theme={theme} toggleTheme={toggleTheme} />
            : <Navigate to="/" />
        }
      />

      {/* /scans from sidebar click */}
      <Route
        path="/scans"
        element={
          authed
            ? <ScanDetail theme={theme} toggleTheme={toggleTheme} />
            : <Navigate to="/" />
        }
      />
    </Routes>
  )
}

// BrowserRouter must wrap everything, but useNavigate only works INSIDE it
export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
