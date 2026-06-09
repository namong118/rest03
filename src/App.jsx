import React, { createContext, useContext, useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import ScrollToTopButton from './components/ScrollToTopButton.jsx'
import Home from './pages/Home.jsx'
import Videos from './pages/Videos.jsx'
import About from './pages/About.jsx'
import SimplePage from './pages/SimplePage.jsx'

export const ThemeContext = createContext({
  dark: false,
  toggleDark: () => {},
  palette: 'sky',
  setPalette: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export default function App() {
  const [dark, setDark] = useState(() => {
    try {
      const stored = localStorage.getItem('econlab-dark-mode')
      if (stored !== null) return stored === 'true'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch {
      return false
    }
  })

  const [palette, setPaletteState] = useState(() => {
    try { return localStorage.getItem('econlab-palette') || 'sky' } catch { return 'sky' }
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
    try { localStorage.setItem('econlab-dark-mode', String(dark)) } catch {}
  }, [dark])

  useEffect(() => {
    document.documentElement.setAttribute('data-palette', palette)
    try { localStorage.setItem('econlab-palette', palette) } catch {}
  }, [palette])

  const toggleDark = () => setDark((prev) => !prev)
  const setPalette = (p) => setPaletteState(p)

  return (
    <ThemeContext.Provider value={{ dark, toggleDark, palette, setPalette }}>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/videos" element={<Navigate to="/videos/all" replace />} />
            <Route path="/videos/:category" element={<Videos />} />
            <Route path="/about" element={<Navigate to="/about/intro" replace />} />
            <Route path="/about/:tab" element={<About />} />
            <Route path="/support" element={<SimplePage title="고객센터" />} />
            <Route path="/terms" element={<SimplePage title="이용약관" />} />
            <Route path="/privacy" element={<SimplePage title="개인정보처리방침" />} />
            <Route path="*" element={<SimplePage title="페이지를 찾을 수 없습니다" />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </ThemeContext.Provider>
  )
}
