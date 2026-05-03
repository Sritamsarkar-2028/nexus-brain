import { useState, useEffect } from 'react'

export default function NudgeBanner({ nudge, onDismiss }) {
  const [visible, setVisible] = useState(false)
  const [minutes] = useState(nudge?.minutesUntil ?? 18)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400)
    return () => clearTimeout(t)
  }, [])

  const handleDismiss = () => {
    setVisible(false)
    setTimeout(onDismiss, 300)
  }

  return (
    <div className={`
      relative rounded-xl border border-amber-200 dark:border-amber-800
      bg-amber-50 dark:bg-amber-950 mb-4
      transition-all duration-300 ease-out
      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
    `}>
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400 rounded-l-xl" />
      <div className="flex items-start gap-3 px-4 py-3 pl-5">
        <div className="relative flex-shrink-0 mt-0.5">
          <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 border border-amber-300 dark:border-amber-700 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="#92400e" strokeWidth="1.2"/>
              <path d="M8 5v3l2 1.5" stroke="#92400e" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-500" />
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-xs font-semibold text-amber-800 dark:text-amber-300 uppercase tracking-wide">
              Proactive nudge
            </span>
            <span className="text-xs bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-full font-medium">
              {minutes} min
            </span>
          </div>
          <p className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-0.5">
            Meeting with {nudge.person} — context ready
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
            {nudge.context}
          </p>
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            {nudge.sources.map((src) => (
              <span key={src} className="text-xs bg-white dark:bg-gray-900 border border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full">
                {src}
              </span>
            ))}
            <span className="text-xs text-amber-600 dark:text-amber-500 ml-1">auto-linked</span>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors mt-0.5"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}