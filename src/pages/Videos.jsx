import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { videoCategories, videos } from '../data/site.js'
import VideoCard from '../components/VideoCard.jsx'

const VIDEOS_PER_PAGE = 6

function ChevronLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages = []
    const delta = 2

    const rangeStart = Math.max(2, currentPage - delta)
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta)

    pages.push(1)

    if (rangeStart > 2) {
      pages.push('...')
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i)
    }

    if (rangeEnd < totalPages - 1) {
      pages.push('...')
    }

    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <nav className="flex items-center justify-center gap-1 mt-10" aria-label="페이지 탐색">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-100 dark:border-ink-700 bg-white dark:bg-ink-800 text-ink-700 dark:text-slate-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-brand-50 dark:hover:enabled:bg-ink-700 hover:enabled:text-brand-500 dark:hover:enabled:text-brand-300"
      >
        <ChevronLeftIcon />
      </button>

      {/* Page numbers */}
      {getPageNumbers().map((page, idx) =>
        page === '...' ? (
          <span
            key={`ellipsis-${idx}`}
            className="flex h-10 w-10 items-center justify-center text-ink-300 dark:text-slate-500 text-sm"
          >
            &hellip;
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition-colors ${
              page === currentPage
                ? 'bg-brand-400 text-white shadow-sm dark:bg-brand-500'
                : 'border border-brand-100 dark:border-ink-700 bg-white dark:bg-ink-800 text-ink-700 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-ink-700 hover:text-brand-500 dark:hover:text-brand-300'
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-100 dark:border-ink-700 bg-white dark:bg-ink-800 text-ink-700 dark:text-slate-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-brand-50 dark:hover:enabled:bg-ink-700 hover:enabled:text-brand-500 dark:hover:enabled:text-brand-300"
      >
        <ChevronRightIcon />
      </button>
    </nav>
  )
}

export default function Videos() {
  const { category = 'all' } = useParams()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [category])

  const activeCat = videoCategories.find((c) => c.key === category) || videoCategories[0]

  const filteredVideos =
    category === 'all'
      ? videos
      : videos.filter((v) => v.category === category)

  const totalPages = Math.ceil(filteredVideos.length / VIDEOS_PER_PAGE)
  const startIdx = (currentPage - 1) * VIDEOS_PER_PAGE
  const pageVideos = filteredVideos.slice(startIdx, startIdx + VIDEOS_PER_PAGE)

  const handleCategoryChange = (key) => {
    navigate(`/videos/${key}`)
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-ink-950">
      {/* Page header */}
      <div className="bg-gradient-to-br from-brand-50 to-sage-50 dark:from-ink-900 dark:to-ink-800 border-b border-brand-100 dark:border-ink-700">
        <div className="container-max section-x py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-ink-300 dark:text-slate-500 mb-4">
            <Link to="/" className="hover:text-brand-500 dark:hover:text-brand-300 transition-colors">
              홈
            </Link>
            <span>/</span>
            <span className="text-ink-800 dark:text-slate-200 font-medium">동영상</span>
            {category !== 'all' && (
              <>
                <span>/</span>
                <span className="text-brand-500 dark:text-brand-300 font-semibold">
                  {activeCat?.label}
                </span>
              </>
            )}
          </nav>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{activeCat?.icon || '📺'}</span>
            <h1 className="text-2xl md:text-3xl font-black text-ink-900 dark:text-white">
              {activeCat?.label || '전체 영상'}
            </h1>
          </div>
          {activeCat?.desc && (
            <p className="text-ink-300 dark:text-slate-400 ml-[52px]">{activeCat.desc}</p>
          )}
        </div>
      </div>

      <div className="container-max section-x py-8">
        {/* Category tab bar */}
        <div className="relative mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {videoCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCategoryChange(cat.key)}
                className={`flex-shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  category === cat.key
                    ? 'bg-brand-400 text-white shadow-sm dark:bg-brand-500'
                    : 'bg-brand-50 dark:bg-ink-800 text-ink-700 dark:text-slate-300 hover:bg-brand-100 dark:hover:bg-ink-700 border border-brand-100 dark:border-ink-600'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results info */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-ink-300 dark:text-slate-400">
            총{' '}
            <span className="font-bold text-brand-500 dark:text-brand-300">
              {filteredVideos.length}
            </span>
            개 영상
            {totalPages > 1 && (
              <span className="ml-2">
                ({currentPage}/{totalPages} 페이지)
              </span>
            )}
          </p>
        </div>

        {/* Videos grid or empty state */}
        {filteredVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-6xl mb-4">📭</span>
            <h3 className="text-xl font-bold text-ink-900 dark:text-white mb-2">
              아직 영상이 없습니다
            </h3>
            <p className="text-ink-300 dark:text-slate-400 mb-6">
              이 카테고리의 영상을 곧 업로드할 예정입니다.
            </p>
            <button
              onClick={() => handleCategoryChange('all')}
              className="btn-primary"
            >
              전체 영상 보기
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {pageVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  )
}
