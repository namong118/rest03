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

function PaletteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.16-.688-.3-1.746-.063-2.504.216-.69 1.418-5.524 1.418-5.524s-.362-.724-.362-1.796c0-1.683.977-2.942 2.19-2.942 1.034 0 1.534.776 1.534 1.706 0 1.04-.663 2.597-.005 4.057.57 1.283 1.926 1.61 3.085.76 2.31-1.697 3.869-4.41 3.869-7.569C20 6.477 16.523 2 12 2z" />
      <circle cx="8.5" cy="11.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="8.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="14" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

const PALETTES = [
  { key: 'sky',     label: '스카이',    hex: '#4DBBDB' },
  { key: 'rose',    label: '로즈',      hex: '#FB7185' },
  { key: 'emerald', label: '에메랄드',  hex: '#34D399' },
  { key: 'violet',  label: '바이올렛',  hex: '#A78BFA' },
  { key: 'amber',   label: '앰버',      hex: '#FBBF24' },
]

function PalettePicker() {
  const { palette, setPalette } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  const current = PALETTES.find((p) => p.key === palette) || PALETTES[0]

  return (
    <div ref={ref} className="relative">
      {/* 팔레트 토글 버튼 — 현재 컬러 원 + 아이콘 */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="컬러 테마 변경"
        title="컬러 테마"
        className="flex h-9 w-9 items-center justify-center rounded-xl text-ink-300 dark:text-slate-400 hover:bg-brand-50 dark:hover:bg-ink-800 hover:text-brand-500 dark:hover:text-brand-300 transition-colors relative"
      >
        <PaletteIcon />
        {/* 현재 팔레트 색상 인디케이터 (우하단 점) */}
        <span
          className="absolute bottom-1 right-1 h-2 w-2 rounded-full ring-1 ring-white dark:ring-ink-900"
          style={{ backgroundColor: current.hex }}
        />
      </button>

      {/* 팔레트 팝오버 */}
      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 rounded-2xl bg-white dark:bg-ink-800 border border-neutral-100 dark:border-ink-700 shadow-xl p-3">
          {/* 제목 */}
          <p className="text-[11px] font-semibold text-ink-300 dark:text-slate-500 uppercase tracking-wider mb-2.5 px-0.5">
            컬러 테마
          </p>
          {/* 컬러 스와치 */}
          <div className="flex gap-2">
            {PALETTES.map((p) => (
              <button
                key={p.key}
                onClick={() => { setPalette(p.key); setOpen(false) }}
                title={p.label}
                aria-label={`${p.label} 테마 적용`}
                className="group relative flex flex-col items-center gap-1.5"
              >
                <span
                  className={[
                    'flex h-8 w-8 items-center justify-center rounded-full transition-all duration-150',
                    'ring-2 ring-offset-2 dark:ring-offset-ink-800',
                    palette === p.key
                      ? 'ring-current scale-110'
                      : 'ring-transparent hover:scale-110',
                  ].join(' ')}
                  style={{
                    backgroundColor: p.hex,
                    color: p.hex,
                  }}
                >
                  {palette === p.key && (
                    <svg className="h-3.5 w-3.5 text-white drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span className="text-[10px] font-medium text-ink-300 dark:text-slate-500 group-hover:text-ink-800 dark:group-hover:text-slate-300 transition-colors">
                  {p.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
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
  const { dark, toggleDark, palette, setPalette } = useTheme()
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
            <div className="flex items-center gap-1">
              {/* 컬러 팔레트 선택기 */}
              <PalettePicker />

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
            <div className="border-t border-brand-100 dark:border-ink-700 px-5 py-4 space-y-3">
              {/* 다크모드 토글 */}
              <button
                onClick={toggleDark}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-ink-700 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-ink-800 transition-colors"
              >
                {dark ? <SunIcon /> : <MoonIcon />}
                {dark ? '라이트 모드로 전환' : '다크 모드로 전환'}
              </button>

              {/* 모바일 컬러 팔레트 */}
              <div className="px-4 pb-1">
                <p className="text-[11px] font-semibold text-ink-300 dark:text-slate-500 uppercase tracking-wider mb-2">
                  컬러 테마
                </p>
                <div className="flex gap-3">
                  {PALETTES.map((p) => (
                    <button
                      key={p.key}
                      onClick={() => { setPalette(p.key); setMobileOpen(false) }}
                      title={p.label}
                      aria-label={`${p.label} 테마 적용`}
                      className="flex flex-col items-center gap-1"
                    >
                      <span
                        className={[
                          'flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-offset-2 dark:ring-offset-ink-900 transition-all',
                          palette === p.key ? 'ring-current scale-110' : 'ring-transparent',
                        ].join(' ')}
                        style={{ backgroundColor: p.hex, color: p.hex }}
                      >
                        {palette === p.key && (
                          <svg className="h-3.5 w-3.5 text-white drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                      <span className="text-[10px] font-medium text-ink-300 dark:text-slate-500">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
