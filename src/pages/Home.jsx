import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { company, videoCategories, videos } from '../data/site.js'
import VideoCard from '../components/VideoCard.jsx'

// ── 파티클 키워드 풀 ──────────────────────────────────────────
const KEYWORDS = [
  'GDP', '금리', '환율', 'CPI', '인플레이션', 'ETF',
  '주식', '채권', '부동산', '투자', '디플레이션', 'QE',
  '테이퍼링', '경기', '수익률', '자산', '금융', '경제',
  'ROI', '복리', '포트폴리오', '금융시장',
]

function HeroParticles() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const particles = useRef([])
  const raf = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const section = canvas.parentElement

    function resize() {
      canvas.width = section.offsetWidth
      canvas.height = section.offsetHeight
    }

    function mkParticle(i) {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        text: KEYWORDS[i % KEYWORDS.length],
        fontSize: Math.floor(Math.random() * 7 + 10),
        opacity: Math.random() * 0.35 + 0.12,
      }
    }

    function initParticles() {
      const textCount = Math.min(KEYWORDS.length, Math.max(10, Math.floor(canvas.width / 70)))
      const dotCount = 24
      particles.current = [
        ...Array.from({ length: textCount }, (_, i) => mkParticle(i)),
        ...Array.from({ length: dotCount }, () => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          text: null,
          dotR: Math.random() * 2.5 + 1,
          opacity: Math.random() * 0.25 + 0.08,
        })),
      ]
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x: mx, y: my } = mouse.current

      particles.current.forEach((p) => {
        // 마우스 반발
        const dx = p.x - mx
        const dy = p.y - my
        const dist2 = dx * dx + dy * dy
        const R = 140
        if (dist2 < R * R && dist2 > 0) {
          const dist = Math.sqrt(dist2)
          const force = ((R - dist) / R) * 0.65
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        // 감쇠 + 미세 브라운 운동
        p.vx = p.vx * 0.96 + (Math.random() - 0.5) * 0.025
        p.vy = p.vy * 0.96 + (Math.random() - 0.5) * 0.025

        // 속도 상한
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (spd > 2.8) {
          p.vx = (p.vx / spd) * 2.8
          p.vy = (p.vy / spd) * 2.8
        }

        p.x += p.vx
        p.y += p.vy

        // 화면 밖으로 나가면 반대편으로 래핑
        const pad = 60
        if (p.x < -pad) p.x = canvas.width + pad
        else if (p.x > canvas.width + pad) p.x = -pad
        if (p.y < -pad) p.y = canvas.height + pad
        else if (p.y > canvas.height + pad) p.y = -pad

        // 그리기
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = '#ffffff'
        if (p.text) {
          ctx.font = `600 ${p.fontSize}px Pretendard, sans-serif`
          ctx.fillText(p.text, p.x, p.y)
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.dotR, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      ctx.globalAlpha = 1
      raf.current = requestAnimationFrame(draw)
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    function onMouseLeave() {
      mouse.current = { x: -9999, y: -9999 }
    }

    const ro = new ResizeObserver(() => { resize(); initParticles() })
    ro.observe(section)

    resize()
    initParticles()
    draw()

    section.addEventListener('mousemove', onMouseMove)
    section.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(raf.current)
      ro.disconnect()
      section.removeEventListener('mousemove', onMouseMove)
      section.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

function ArrowRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-400 via-brand-500 to-sage-400 dark:from-ink-900 dark:via-ink-800 dark:to-brand-900" />

      {/* 파티클 캔버스 — 마우스를 올리면 키워드들이 흩어집니다 */}
      <HeroParticles />

      {/* Decorative blur circles */}
      <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-[350px] w-[350px] rounded-full bg-white/8 blur-2xl" />

      <div className="relative container-max section-x w-full py-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full bg-white/15 dark:bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm border border-white/20 mb-8"
            style={{ animation: 'heroFadeUp 0.6s ease both' }}
          >
            <i className="fa-solid fa-circle-dot text-sage-300 text-xs animate-pulse" />
            경제 교육 플랫폼 No.1
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6"
            style={{ animation: 'heroFadeUp 0.6s ease 0.15s both' }}
          >
            경제를 쉽게
            <br />
            <span className="text-sol-300 dark:text-sol-200">미래를 바르게</span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl text-white/80 dark:text-slate-300 mb-10 leading-relaxed max-w-xl"
            style={{ animation: 'heroFadeUp 0.6s ease 0.3s both' }}
          >
            {company.subTagline}
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap gap-4"
            style={{ animation: 'heroFadeUp 0.6s ease 0.45s both' }}
          >
            <Link
              to="/videos/all"
              className="inline-flex items-center gap-2 rounded-full bg-white text-brand-500 dark:text-brand-600 px-7 py-3.5 font-bold shadow-lg hover:shadow-xl hover:bg-brand-50 transition-all active:scale-95"
            >
              동영상 보기
              <ArrowRightIcon />
            </Link>
            <Link
              to="/about/intro"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 text-white px-7 py-3.5 font-bold hover:bg-white/15 backdrop-blur-sm transition-all active:scale-95"
            >
              회사 소개
            </Link>
          </div>
        </div>

        {/* Hero stats (right side, desktop only) */}
        <div
          className="hidden lg:grid absolute right-0 top-1/2 -translate-y-1/2 grid-cols-2 gap-4 w-72 xl:w-80 pr-4"
          style={{ animation: 'heroFadeUp 0.6s ease 0.6s both' }}
        >
          {company.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white/15 dark:bg-white/8 backdrop-blur-sm border border-white/20 p-5 text-white text-center hover:bg-white/20 transition-colors"
            >
              <div className="text-2xl font-black text-sol-200 dark:text-sol-300">{stat.value}</div>
              <div className="text-xs font-medium opacity-80 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60 C360 0 1080 0 1440 60 L1440 60 L0 60 Z" className="fill-white dark:fill-ink-950" />
        </svg>
      </div>
    </section>
  )
}

function StatsBar() {
  return (
    <section className="bg-white dark:bg-ink-950 -mt-1 border-b border-neutral-100 dark:border-ink-800">
      <div className="container-max section-x">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-neutral-100 dark:divide-ink-800">
          {company.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center gap-2 py-10 px-6">
              <i className={`${stat.icon} text-lg text-brand-300 dark:text-brand-700`} />
              <div className="text-3xl md:text-4xl font-black text-ink-900 dark:text-white tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-ink-300 dark:text-slate-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CategorySection() {
  const displayCategories = videoCategories.filter((c) => c.key !== 'all')

  return (
    <section className="bg-white dark:bg-ink-950 py-20 md:py-28">
      <div className="container-max section-x">
        {/* Section header — editorial left-aligned */}
        <div className="mb-14">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-brand-400 dark:text-brand-400">
            주제별 학습
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black text-ink-900 dark:text-white leading-tight">
            원하는 주제를 선택하세요
          </h2>
          <div className="mt-4 h-px w-14 bg-brand-400" />
        </div>

        {/* Magazine-grid: gap-px creates thin dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-100 dark:bg-ink-700 rounded-2xl overflow-hidden shadow-sm">
          {displayCategories.map((cat, i) => (
            <Link
              key={cat.key}
              to={`/videos/${cat.key}`}
              className="group relative bg-white dark:bg-ink-900 p-8 flex flex-col gap-5 hover:bg-brand-50/60 dark:hover:bg-ink-800 transition-colors duration-200"
            >
              {/* Background ordinal number */}
              <span
                aria-hidden="true"
                className="absolute top-5 right-6 text-6xl font-black leading-none select-none pointer-events-none text-brand-100 dark:text-ink-800"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Icon container */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 dark:bg-ink-800 border border-brand-100 dark:border-ink-700 flex-shrink-0">
                <i className={`${cat.icon} text-brand-500 dark:text-brand-400`} />
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="text-base font-bold text-ink-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                  {cat.label}
                </h3>
                <p className="text-sm text-ink-300 dark:text-slate-500 mt-1.5 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              {/* Arrow */}
              <i className="fa-solid fa-arrow-right text-xs text-brand-200 dark:text-ink-600 group-hover:text-brand-400 dark:group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function LatestVideosSection() {
  const latestVideos = [...videos]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6)

  return (
    <section className="bg-brand-50 dark:bg-ink-900 py-16 md:py-20">
      <div className="container-max section-x">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-ink-800 px-4 py-1.5 text-sm font-semibold text-brand-500 dark:text-brand-300 mb-3">
              최신 영상
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-ink-900 dark:text-white">
              새로 올라온 강의
            </h2>
          </div>
          <Link
            to="/videos/all"
            className="btn-outline text-sm self-start sm:self-center flex-shrink-0"
          >
            전체 보기
            <ArrowRightIcon />
          </Link>
        </div>

        {/* Videos grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {latestVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutTeaserSection() {
  return (
    <section className="relative overflow-hidden bg-ink-900 dark:bg-ink-950 py-20 md:py-24">
      {/* Background accents */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-400 via-sage-400 to-iris-400" />
      <div className="absolute -right-24 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-sage-500/10 blur-3xl" />

      <div className="relative container-max section-x">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-400/20 px-4 py-1.5 text-sm font-semibold text-brand-300 mb-6">
            이콘랩 소개
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
            경제 교육의 새로운 기준을
            <br />
            <span className="text-brand-300">이콘랩이 제시합니다</span>
          </h2>
          <div className="space-y-3 mb-10">
            {company.intro.map((text, i) => (
              <p key={i} className="text-slate-300 leading-relaxed">
                {text}
              </p>
            ))}
          </div>
          <Link
            to="/about/intro"
            className="btn-primary text-base px-8 py-4"
          >
            더 알아보기
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <CategorySection />
      <LatestVideosSection />
      <AboutTeaserSection />
    </>
  )
}
