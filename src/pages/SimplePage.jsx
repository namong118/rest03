export default function SimplePage({ title }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-ink-900 dark:text-white mb-4">{title}</h1>
        <p className="text-gray-500 dark:text-gray-400">준비 중입니다.</p>
      </div>
    </div>
  )
}
