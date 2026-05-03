import { useState } from 'react'
import Sidebar from './Sidebar'

export default function Shell({ children, activeTab, onTabChange }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">

      {/* Topbar */}
      <header className="h-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center px-4 gap-3 flex-shrink-0">

        <button
          onClick={() => setSidebarOpen(v => !v)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
              <circle cx="6" cy="6" r="1.5" fill="white"/>
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">Nexus</span>
          <span className="text-xs text-gray-400 font-normal">Brain</span>
        </div>

        <div className="flex items-center gap-1.5 ml-2 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 border border-emerald-100 dark:border-emerald-900">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">3 sources syncing</span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs font-semibold text-indigo-700 dark:text-indigo-300">
            SS
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        <aside className={`
          flex-shrink-0 bg-white dark:bg-gray-900
          border-r border-gray-200 dark:border-gray-800
          transition-all duration-200 overflow-hidden
          ${sidebarOpen ? 'w-52' : 'w-0'}
        `}>
          <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
        </aside>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-6 py-6">
            {children}
          </div>
        </main>

      </div>
    </div>
  )
}