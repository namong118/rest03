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
            <span className="h-2 w-2 rounded-full bg-sage-300 animate-pulse" />
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
    <section className="bg-white dark:bg-ink-950 -mt-1">
      <div className="container-max section-x py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {company.stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center py-6 rounded-2xl bg-brand-50 dark:bg-ink-800 border border-brand-100 dark:border-ink-700 hover:shadow-md transition-shadow"
            >
              <div className="text-3xl md:text-4xl font-black text-brand-500 dark:text-brand-300">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-ink-300 dark:text-slate-400 mt-1">
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
    <section className="bg-white dark:bg-ink-950 py-16 md:py-20">
      <div className="container-max section-x">
        {/* Section header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-ink-800 px-4 py-1.5 text-sm font-semibold text-brand-500 dark:text-brand-300 mb-4">
            주제별 학습
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-ink-900 dark:text-white mb-3">
            원하는 주제를 선택하세요
          </h2>
          <p className="text-ink-300 dark:text-slate-400 max-w-xl mx-auto">
            체계적으로 구성된 6가지 카테고리로 경제 지식을 쌓아보세요
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {displayCategories.map((cat) => (
            <Link
              key={cat.key}
              to={`/videos/${cat.key}`}
              className={`group flex items-center gap-4 rounded-2xl border p-5 ${cat.colorClass} hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
            >
              <span className="text-3xl flex-shrink-0">{cat.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-base">{cat.label}</div>
                <div className="text-sm opacity-75 mt-0.5 truncate">{cat.desc}</div>
              </div>
              <ArrowRightIcon />
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
