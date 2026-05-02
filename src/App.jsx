import { useState } from 'react'
import Shell from './components/layout/Shell'

function App() {
  const [activeTab, setActiveTab] = useState('actions')

  return (
    <Shell activeTab={activeTab} onTabChange={setActiveTab}>
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 capitalize">
        {activeTab}
      </h1>
      <p className="text-sm text-gray-400 mt-1">
        {activeTab === 'actions' && 'Items that need your attention.'}
        {activeTab === 'digest' && 'Your smart daily briefing.'}
        {activeTab === 'entities' && 'Auto-linked entities across all sources.'}
        {activeTab === 'chat' && 'Ask anything across Gmail, Slack and Notion.'}
      </p>
    </Shell>
  )
}

export default App