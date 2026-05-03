import { useState } from 'react'
import { ACTIONS, NUDGE } from '../../data/mockData'
import NudgeBanner from './NudgeBanner'
import ActionCard from './ActionCard'

const FILTERS = ['All', 'Today', 'Later', 'FYI', 'Done']

function StatsBar({ actions }) {
  const todayCount = actions.filter(a => a.urgency === 'today').length
  const doneCount = actions.filter(a => a.urgency === 'done').length
  const total = actions.length
  const pct = total ? Math.round((doneCount / total) * 100) : 0

  return (
    <div className="flex items-center gap-4 mb-5">
      <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-gray-500 whitespace-nowrap">
        <span className="font-semibold text-gray-700 dark:text-gray-200">{todayCount}</span> need action ·{' '}
        <span className="font-semibold text-emerald-600">{doneCount}</span> done
      </span>
    </div>
  )
}

export default function ActionsPanel() {
  const [actions, setActions] = useState(ACTIONS)
  const [nudge, setNudge] = useState(NUDGE)
  const [filter, setFilter] = useState('All')

  const markDone = (id) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, urgency: 'done' } : a))
  }

  const archiveAction = (id) => {
    setActions(prev => prev.filter(a => a.id !== id))
  }

  const filtered = actions.filter(a => {
    if (filter === 'All')   return a.urgency !== 'done'
    if (filter === 'Today') return a.urgency === 'today'
    if (filter === 'Later') return a.urgency === 'later'
    if (filter === 'FYI')   return a.urgency === 'fyi'
    if (filter === 'Done')  return a.urgency === 'done'
    return true
  })

  return (
    <div>
      {nudge && <NudgeBanner nudge={nudge} onDismiss={() => setNudge(null)} />}

      <StatsBar actions={actions} />

      <div className="flex items-center gap-1 mb-4 border-b border-gray-100 dark:border-gray-800 pb-3">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`
              text-xs px-3 py-1.5 rounded-lg transition-colors font-medium
              ${filter === f
                ? 'bg-indigo-600 text-white'
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300'
              }
            `}
          >
            {f}
            {f === 'Today' && actions.filter(a => a.urgency === 'today').length > 0 && (
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                filter === f
                  ? 'bg-indigo-500 text-white'
                  : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300'
              }`}>
                {actions.filter(a => a.urgency === 'today').length}
              </span>
            )}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-gray-400">Live sync</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-100 dark:border-emerald-900 flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 10l5 5 9-9" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">All clear</p>
            <p className="text-xs text-gray-400 mt-1">Nexus will surface the next item when it matters.</p>
          </div>
        ) : (
          filtered.map(action => (
            <ActionCard
              key={action.id}
              action={action}
              onMarkDone={markDone}
              onArchive={archiveAction}
            />
          ))
        )}
      </div>

      <div className="mt-6 flex items-center justify-center gap-1.5">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5" stroke="#6366f1" strokeWidth="1"/>
          <path d="M4 6l1.5 1.5L8 4" stroke="#6366f1" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-xs text-indigo-400 font-medium">
          Powered by Nexus Brain · RAG + entity graph
        </span>
      </div>
    </div>
  )
}