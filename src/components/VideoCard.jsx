import { useState } from 'react'
import { videoCategories } from '../data/site.js'

const categoryGradients = {
  basic: 'from-sage-300 to-sage-500',
  terms: 'from-iris-300 to-iris-500',
  invest: 'from-sol-300 to-sol-500',
  current: 'from-brand-300 to-brand-500',
  finance: 'from-sage-300 to-sage-500',
}

function PlayIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-12 w-12">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

export default function VideoCard({ video }) {
  const { id, title, category, youtubeId, desc, duration, date } = video
  const [playing, setPlaying] = useState(false)

  const isDemo = youtubeId.startsWith('DEMO_')
  const catData = videoCategories.find((c) => c.key === category)
  const gradient = categoryGradients[category] || 'from-brand-300 to-brand-500'
  const faIcon = catData?.icon || 'fa-regular fa-circle-play'

  const formattedDate = date
    ? new Date(date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <article className="card group flex flex-col overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 dark:bg-ink-800 dark:border-ink-700">
      {/* Video area */}
      <div className="relative w-full overflow-hidden" style={{ paddingBottom: '56.25%' }}>
        <div className="absolute inset-0">
          {isDemo ? (
            /* Refined placeholder */
            <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradient} relative overflow-hidden`}>
              <div
                className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)', backgroundSize: '18px 18px' }}
              />
              <div className="relative flex flex-col items-center gap-3 px-5 text-white">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 border border-white/30">
                  <i className={`${faIcon} text-xl`} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest opacity-80 text-center">
                  {catData?.label || category}
                </span>
                <span className="text-sm font-semibold text-center leading-tight line-clamp-2 opacity-90 max-w-[200px]">
                  {title}
                </span>
              </div>
            </div>
          ) : playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            /* YouTube thumbnail with play overlay */
            <button
              className="relative h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
              onClick={() => setPlaying(true)}
              aria-label={`${title} 재생`}
            >
              <img
                src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
                alt={title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-lg group-hover:scale-110 transition-transform">
                  <PlayIcon />
                </div>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Card content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category badge + duration */}
        <div className="flex items-center justify-between mb-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${catData?.colorClass || ''}`}
          >
            <i className={`${faIcon} text-[10px]`} />
            {catData?.label || category}
          </span>
          {duration && (
            <span className="text-xs font-mono text-ink-300 dark:text-slate-500 bg-brand-50 dark:bg-ink-700 px-2 py-0.5 rounded-full">
              {duration}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-ink-900 dark:text-slate-100 leading-snug line-clamp-2 mb-1 flex-1">
          {title}
        </h3>

        {/* Desc */}
        {desc && (
          <p className="text-xs text-ink-300 dark:text-slate-500 leading-relaxed line-clamp-2 mt-1">
            {desc}
          </p>
        )}

        {/* Date */}
        {formattedDate && (
          <p className="mt-2 text-[11px] text-ink-300 dark:text-slate-600">
            {formattedDate}
          </p>
        )}
      </div>
    </article>
  )
}
