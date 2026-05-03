import { useState, useRef, useEffect } from 'react'

const SUGGESTED = [
  'What did Priya last say about the Atlas API?',
  'What are the Sprint #18 blockers?',
  'Where is the Q2 retention data?',
  'Summarize my last 3 emails from Rahul',
]

const INITIAL_MESSAGES = [
  {
    id: 'm0',
    role: 'ai',
    text: 'Hi! Ask me anything about your emails, Slack messages, or docs. I search across all sources simultaneously.',
  },
]

const MOCK_RESPONSES = {
  'What did Priya last say about the Atlas API?':
    'Priya\'s last message was on Slack (Apr 30, 4:12pm) — she said the spec looks good overall but needs confirmation on the auth endpoint and rate limits before the sprint starts. She also emailed this morning flagging the same two items for sign-off.',
  'What are the Sprint #18 blockers?':
    'Ankit flagged 3 blockers on Slack (Apr 30): loading state design on the entity graph, API error boundary UI, and the auth redirect flow. None have an assigned owner yet. Deadline is May 9.',
  'Where is the Q2 retention data?':
    'The retention data lives in the "Q2 Analytics" Notion page, last updated May 1 by Ankit. There\'s also a chart export in the Slack thread between you and Ankit from Apr 30.',
  'Summarize my last 3 emails from Rahul':
    'Rahul\'s last 3 emails: (1) Today 7:52am — requesting the retention slide for Q2 deck by EOD. (2) Apr 29 — asked for sprint status update before board meeting. (3) Apr 27 — shared investor deck draft for review.',
}

function Message({ message }) {
  if (message.role === 'ai') {
    return (
      <div className="flex items-start gap-2.5">
        <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="#6366f1" strokeWidth="1.2" strokeLinecap="round"/>
            <circle cx="6" cy="6" r="1.5" fill="#6366f1"/>
          </svg>
        </div>
        <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-700 dark:text-gray-200 leading-relaxed max-w-prose">
          {message.text}
          {message.sources && (
            <div className="flex gap-1.5 flex-wrap mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              {message.sources.map(s => (
                <span key={s} className="text-xs bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
  return (
    <div className="flex justify-end">
      <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed max-w-prose">
        {message.text}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="#6366f1" strokeWidth="1.2" strokeLinecap="round"/>
          <circle cx="6" cy="6" r="1.5" fill="#6366f1"/>
        </svg>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1 items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}

export default function ChatPanel() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = (text) => {
    if (!text.trim()) return
    const userMsg = { id: Date.now(), role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const response = MOCK_RESPONSES[text] ||
        'I searched across Gmail, Slack, and Notion. Let me surface the most relevant context for that query — connecting to your sources now.'
      const aiMsg = {
        id: Date.now() + 1,
        role: 'ai',
        text: response,
        sources: ['Gmail', 'Slack', 'Notion'],
      }
      setTyping(false)
      setMessages(prev => [...prev, aiMsg])
    }, 1200)
  }

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-4">
        {messages.map(m => <Message key={m.id} message={m} />)}
        {typing && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {messages.length === 1 && (
        <div className="mb-3">
          <p className="text-xs text-gray-400 mb-2">Suggested</p>
          <div className="flex flex-col gap-1.5">
            {SUGGESTED.map(q => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-left text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900 px-3 py-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
          placeholder="Ask across all your sources..."
          className="flex-1 text-sm px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-indigo-300 dark:focus:border-indigo-700 transition-colors"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim()}
          className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-40"
        >
          Ask
        </button>
      </div>
    </div>
  )
}