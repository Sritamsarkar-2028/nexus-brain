import { useState } from 'react'
import Shell from './components/layout/Shell'
import ActionsPanel from './components/actions/ActionsPanel'
import DigestPanel from './components/digest/DigestPanel'
import EntitiesPanel from './components/entities/EntitiesPanel'
import ChatPanel from './components/chat/ChatPanel'
import LoginPage from './pages/LoginPage'
import OnboardingPage from './pages/OnboardingPage'

// app states: 'login' → 'onboarding' → 'app'
function App() {
  const [appState, setAppState] = useState('login')
  const [activeTab, setActiveTab] = useState('actions')

  if (appState === 'login') {
    return <LoginPage onLogin={() => setAppState('onboarding')} />
  }

  if (appState === 'onboarding') {
    return <OnboardingPage onComplete={() => setAppState('app')} />
  }

  return (
    <Shell activeTab={activeTab} onTabChange={setActiveTab}>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          {activeTab === 'actions'  && 'Actions'}
          {activeTab === 'digest'   && 'Smart digest'}
          {activeTab === 'entities' && 'Entity graph'}
          {activeTab === 'chat'     && 'Ask anything'}
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          {activeTab === 'actions'  && 'Items that need your attention, ranked by urgency.'}
          {activeTab === 'digest'   && 'Your smart daily briefing — synthesized from all sources.'}
          {activeTab === 'entities' && 'Auto-linked entities across all sources — zero manual tagging.'}
          {activeTab === 'chat'     && 'Ask anything across Gmail, Slack and Notion.'}
        </p>
      </div>

      {activeTab === 'actions'  && <ActionsPanel />}
      {activeTab === 'digest'   && <DigestPanel />}
      {activeTab === 'entities' && <EntitiesPanel />}
      {activeTab === 'chat'     && <ChatPanel />}

    </Shell>
  )
}

export default App