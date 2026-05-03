import { useState } from 'react'

const URGENCY = {
  today: {
    label: 'Respond today',
    badge: 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800',
    border: 'border-l-red-400',
  },
  later: {
    label: 'Later',
    badge: 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
    border: 'border-l-amber-300',
  },
  fyi: {
    label: 'FYI',
    badge: 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700',
    border: 'border-l-gray-200',
  },
  done: {
    label: 'Done',
    badge: 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
    border: 'border-l-emerald-300',
  },
}

const AVATAR_COLORS = {
  PS: 'bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300',
  RM: 'bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300',
  AV: 'bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300',
  GH: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
}

function DraftPanel({ draft, onSend, onCancel }) {
  const [text, setText] = useState(draft)
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    setSent(true)
    setTimeout(onSend, 800)
  }

  if (sent) {
    return (
      <div className="mt-3 flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Reply sent
      </div>
    )
  }

  return (
    <div className="mt-3 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          AI draft — edit before sending
        </span>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        className="w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 resize-none focus:outline-none"
      />
      <div className="flex items-center justify-end gap-2 px-3 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <button
          onClick={onCancel}
          className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSend}
          disabled={!text}
          className="text-xs bg-indigo-600 text-white px-4 py-1.5 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-40 font-medium"
        >
          Send reply
        </button>
      </div>
    </div>
  )
}

export default function ActionCard({ action, onMarkDone, onArchive }) {
  const [expanded, setExpanded] = useState(action.urgency === 'today')
  const [showDraft, setShowDraft] = useState(false)
  const cfg = URGENCY[action.urgency] || URGENCY.fyi

  return (
    <div className={`
      rounded-xl border border-gray-200 dark:border-gray-700
      bg-white dark:bg-gray-900
      border-l-4 ${cfg.border}
      transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600
      hover:shadow-sm
      ${action.urgency === 'done' ? 'opacity-60' : ''}
    `}>

      {/* Card header — always visible */}
      <div
        className="flex items-start gap-3 px-4 py-3 cursor-pointer"
        onClick={() => setExpanded(v => !v)}
      >
        {/* Avatar */}
        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${AVATAR_COLORS[action.initials] || 'bg-indigo-100 text-indigo-700'}`}>
          {action.initials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              {action.from}
            </span>
            <span className="text-xs text-gray-400">{action.role}</span>
            <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${cfg.badge}`}>
              {cfg.label}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {action.subject}
          </p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 px-1.5 py-0.5 rounded">
              {action.source}
            </span>
            {action.linkedSources.map((s) => (
              <span key={s} className="text-xs text-gray-400">+ {s}</span>
            ))}
            <span className="ml-auto text-xs text-gray-400">{action.receivedAt}</span>
          </div>
        </div>

        {/* Chevron */}
        <svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          className={`flex-shrink-0 mt-1 text-gray-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        >
          <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Expanded body */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-800">

          {/* AI summary */}
          <div className="mt-3 rounded-lg bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900 px-3 py-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="#4f46e5" strokeWidth="1.2"/>
                <path d="M4 6l1.5 1.5L8 4" stroke="#4f46e5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                Nexus analysis
              </span>
            </div>
            <p className="text-xs text-indigo-800 dark:text-indigo-300 leading-relaxed">
              {action.aiSummary}
            </p>
          </div>

          {/* Draft panel or action buttons */}
          {showDraft ? (
            <DraftPanel
              draft={action.draft}
              onSend={() => { setShowDraft(false); onMarkDone(action.id) }}
              onCancel={() => setShowDraft(false)}
            />
          ) : (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {action.draftReady && (
                <button
                  onClick={() => setShowDraft(true)}
                  className="flex items-center gap-1.5 text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Draft reply
                </button>
              )}
              <button
                onClick={() => onMarkDone(action.id)}
                className="text-xs text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Mark done
              </button>
              <button
                onClick={() => onArchive(action.id)}
                className="text-xs text-gray-400 px-3 py-1.5 rounded-lg hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                Archive
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}