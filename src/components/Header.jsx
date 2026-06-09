import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useTheme } from '../App.jsx'
import { nav } from '../data/site.js'

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-9H20M4 12H3m15.07-6.07l-.71.71M6.64 17.36l-.71.71M17.66 17.66l-.71-.71M6.64 6.64l-.71-.71M12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  )
}

function HamburgerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function ChevronDownIcon({ className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function DesktopNavItem({ item }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!item.children) {
    return (
      <NavLink
        to={item.to}
        className={({ isActive }) =>
          `px-3 py-2 text-sm font-semibold transition-colors rounded-lg ${
            isActive
              ? 'text-brand-500 dark:text-brand-300'
              : 'text-ink-800 dark:text-slate-200 hover:text-brand-500 dark:hover:text-brand-300'
          }`
        }
      >
        {item.label}
      </NavLink>
    )
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-ink-800 dark:text-slate-200 hover:text-brand-500 dark:hover:text-brand-300 transition-colors rounded-lg"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {item.label}
        <ChevronDownIcon className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[180px] rounded-2xl border border-brand-100 bg-white py-2 shadow-xl dark:border-ink-700 dark:bg-ink-800">
          {item.children.map((child) => (
            <NavLink
              key={child.to}
              to={child.to}
              className={({ isActive }) =>
                `block px-4 py-2 text-sm transition-colors ${
                  isActive
                    ? 'font-semibold text-brand-500 bg-brand-50 dark:text-brand-300 dark:bg-ink-700'
                    : 'text-ink-800 dark:text-slate-200 hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-ink-700 dark:hover:text-brand-300'
                }`
              }
              onClick={() => setOpen(false)}
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

function MobileNavItem({ item, onClose }) {
  const [expanded, setExpanded] = useState(false)

  if (!item.children) {
    return (
      <NavLink
        to={item.to}
        className={({ isActive }) =>
          `block px-4 py-3 text-base font-semibold rounded-xl transition-colors ${
            isActive
              ? 'text-brand-500 bg-brand-50 dark:text-brand-300 dark:bg-ink-800'
              : 'text-ink-900 dark:text-slate-100 hover:bg-brand-50 dark:hover:bg-ink-800'
          }`
        }
        onClick={onClose}
      >
        {item.label}
      </NavLink>
    )
  }

  return (
    <div>
      <button
        className="flex w-full items-center justify-between px-4 py-3 text-base font-semibold text-ink-900 dark:text-slate-100 hover:bg-brand-50 dark:hover:bg-ink-800 rounded-xl transition-colors"
        onClick={() => setExpanded((v) => !v)}
      >
        {item.label}
        <ChevronDownIcon className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
      </button>
      {expanded && (
        <div className="ml-4 mt-1 space-y-1 border-l-2 border-brand-100 dark:border-ink-700 pl-4">
          {item.children.map((child) => (
            <NavLink
              key={child.to}
              to={child.to}
              className={({ isActive }) =>
                `block py-2 text-sm transition-colors ${
                  isActive
                    ? 'font-semibold text-brand-500 dark:text-brand-300'
                    : 'text-ink-700 dark:text-slate-300 hover:text-brand-500 dark:hover:text-brand-300'
                }`
              }
              onClick={onClose}
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const { dark, toggleDark } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-ink-900/95 backdrop-blur-sm shadow-sm border-b border-brand-100 dark:border-ink-700'
            : 'bg-white dark:bg-ink-900 border-b border-brand-100/50 dark:border-ink-700/50'
        }`}
      >
        <div className="container-max section-x">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-400 text-white font-black text-sm shadow-sm group-hover:bg-brand-500 transition-colors">
                E
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-black tracking-tight text-brand-500 dark:text-brand-300 group-hover:text-brand-600 dark:group-hover:text-brand-200 transition-colors">
                  ECONLAB
                </span>
                <span className="text-[10px] font-medium text-ink-300 dark:text-slate-400 tracking-widest">
                  이콘랩
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {nav.map((item) => (
                <DesktopNavItem key={item.to} item={item} />
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Dark mode toggle */}
              <button
                onClick={toggleDark}
                aria-label={dark ? '라이트 모드로 전환' : '다크 모드로 전환'}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-ink-300 dark:text-slate-400 hover:bg-brand-50 dark:hover:bg-ink-800 hover:text-brand-500 dark:hover:text-brand-300 transition-colors"
              >
                {dark ? <SunIcon /> : <MoonIcon />}
              </button>

              {/* Hamburger (mobile) */}
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="메뉴 열기"
                className="flex md:hidden h-9 w-9 items-center justify-center rounded-xl text-ink-800 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-ink-800 transition-colors"
              >
                <HamburgerIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Panel */}
          <div className="relative ml-auto flex h-full w-[85vw] max-w-sm flex-col bg-white dark:bg-ink-900 shadow-2xl">
            {/* Panel header */}
            <div className="flex items-center justify-between border-b border-brand-100 dark:border-ink-700 px-5 py-4">
              <Link
                to="/"
                className="flex items-center gap-2"
                onClick={() => setMobileOpen(false)}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-400 text-white font-black text-sm">
                  E
                </div>
                <span className="text-base font-black text-brand-500 dark:text-brand-300">
                  ECONLAB
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="메뉴 닫기"
                className="flex h-9 w-9 items-center justify-center rounded-xl text-ink-800 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-ink-800 transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              {nav.map((item) => (
                <MobileNavItem
                  key={item.to}
                  item={item}
                  onClose={() => setMobileOpen(false)}
                />
              ))}
            </nav>

            {/* Panel footer */}
            <div className="border-t border-brand-100 dark:border-ink-700 px-5 py-4">
              <button
                onClick={toggleDark}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-ink-700 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-ink-800 transition-colors"
              >
                {dark ? <SunIcon /> : <MoonIcon />}
                {dark ? '라이트 모드로 전환' : '다크 모드로 전환'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
