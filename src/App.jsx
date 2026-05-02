import { useState } from 'react'
import Shell from './components/layout/Shell'
import ActionsPanel from './components/actions/ActionsPanel'

function App() {
  const [activeTab, setActiveTab] = useState('actions')

  return (
    <Shell activeTab={activeTab} onTabChange={setActiveTab}>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 capitalize">
          {activeTab === 'actions' && 'Actions'}
          {activeTab === 'digest' && 'Smart digest'}
          {activeTab === 'entities' && 'Entity graph'}
          {activeTab === 'chat' && 'Ask anything'}
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          {activeTab === 'actions' && 'Items that need your attention, ranked by urgency.'}
          {activeTab === 'digest' && 'Your smart daily briefing.'}
          {activeTab === 'entities' && 'Auto-linked entities across all sources.'}
          {activeTab === 'chat' && 'Ask anything across Gmail, Slack and Notion.'}
        </p>
      </div>

      {activeTab === 'actions' && <ActionsPanel />}

      {activeTab !== 'actions' && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900 flex items-center justify-center mb-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 3v7l4 4" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="10" cy="10" r="8" stroke="#6366f1" strokeWidth="1.5"/>
            </svg>
          </div>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 capitalize">{activeTab} — coming next</p>
          <p className="text-xs text-gray-400 mt-1">Building this panel in the next sprint.</p>
        </div>
      )}

    </Shell>
  )
}

export default App