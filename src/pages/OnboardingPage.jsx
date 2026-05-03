import { useState } from 'react'

const SOURCES = [
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Emails, threads, attachments',
    color: 'bg-rose-50 dark:bg-rose-950 border-rose-100 dark:border-rose-900',
    iconColor: 'text-rose-500',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Messages, threads, channels',
    color: 'bg-violet-50 dark:bg-violet-950 border-violet-100 dark:border-violet-900',
    iconColor: 'text-violet-500',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M7 2a2 2 0 100 4 2 2 0 000-4zM7 6v3M13 9a2 2 0 100 4 2 2 0 000 0zM13 13v3M18 7a2 2 0 10-4 0 2 2 0 004 0zM14 7h-3M2 13a2 2 0 104 0 2 2 0 00-4 0zM6 13h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Docs, wikis, databases',
    color: 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700',
    iconColor: 'text-gray-600 dark:text-gray-300',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M6 6h8M6 10h8M6 14h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'drive',
    name: 'Google Drive',
    description: 'Files, spreadsheets, slides',
    color: 'bg-emerald-50 dark:bg-emerald-950 border-emerald-100 dark:border-emerald-900',
    iconColor: 'text-emerald-500',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3L3 15h14L10 3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M3 15l4-7M17 15l-4-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
]

function SourceCard({ source, connected, onConnect }) {
  return (
    <div className={`
      flex items-center gap-4 p-4 rounded-xl border
      transition-all duration-200
      ${connected
        ? 'bg-white dark:bg-gray-900 border-indigo-200 dark:border-indigo-800'
        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'
      }
    `}>
      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${source.color} ${source.iconColor}`}>
        {source.icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{source.name}</p>
        <p className="text-xs text-gray-400">{source.description}</p>
      </div>

      {connected ? (
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Connected</span>
        </div>
      ) : (
        <button
          onClick={() => onConnect(source.id)}
          className="flex-shrink-0 text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Connect
        </button>
      )}
    </div>
  )
}

export default function OnboardingPage({ onComplete }) {
  const [connected, setConnected] = useState([])
  const [syncing, setSyncing] = useState(false)

  const handleConnect = (id) => {
    setConnected(prev => [...prev, id])
  }

  const handleContinue = () => {
    setSyncing(true)
    setTimeout(onComplete, 2500)
  }

  if (syncing) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center px-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center mb-6 animate-pulse">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="12" r="3" fill="white"/>
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Building your brain...
        </h2>
        <div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
          {[
            'Reading emails...',
            'Indexing Slack threads...',
            'Extracting entities...',
            'Connecting the dots...',
          ].map((step, i) => (
            <div key={step} className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
              <span className="text-xs text-gray-500 dark:text-gray-400">{step}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center px-4">

      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto mb-4">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            <circle cx="10" cy="10" r="2.5" fill="white"/>
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
          Connect your workspace
        </h1>
        <p className="text-sm text-gray-400 max-w-xs">
          Nexus learns from your sources. Connect at least one to get started.
        </p>
      </div>

      {/* Progress */}
      <div className="w-full max-w-sm mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400">{connected.length} of {SOURCES.length} connected</span>
          {connected.length > 0 && (
            <span className="text-xs text-indigo-500 font-medium">Good to go!</span>
          )}
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
          <div
            className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${(connected.length / SOURCES.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Source cards */}
      <div className="w-full max-w-sm flex flex-col gap-3 mb-6">
        {SOURCES.map(source => (
          <SourceCard
            key={source.id}
            source={source}
            connected={connected.includes(source.id)}
            onConnect={handleConnect}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="w-full max-w-sm flex flex-col gap-2">
        <button
          onClick={handleContinue}
          disabled={connected.length === 0}
          className="w-full py-3 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-40"
        >
          Continue — build my brain
        </button>
        <button
          onClick={onComplete}
          className="w-full py-2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          Skip for now
        </button>
      </div>

    </div>
  )
}