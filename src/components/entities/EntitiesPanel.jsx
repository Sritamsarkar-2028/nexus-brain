const ENTITIES = [
  {
    id: 'e1',
    name: 'Project Atlas',
    type: 'Project',
    sources: [
      { label: 'Gmail', count: 4 },
      { label: 'Slack', count: 11 },
      { label: 'Notion', count: 2 },
    ],
    lastMention: 'Priya\'s email 9:14am — "final sign-off on auth flow"',
    urgent: true,
  },
  {
    id: 'e2',
    name: 'Priya Sharma',
    type: 'Person',
    sources: [
      { label: 'Gmail', count: 7 },
      { label: 'Slack', count: 23 },
    ],
    lastMention: 'Meeting in 18 min. Last Slack: "atlas api spec looks good"',
    urgent: true,
  },
  {
    id: 'e3',
    name: 'Q2 Metrics',
    type: 'Topic',
    sources: [
      { label: 'Gmail', count: 2 },
      { label: 'Slack', count: 5 },
      { label: 'Notion', count: 3 },
    ],
    lastMention: 'CEO requested retention slide. Data in Notion Q2 Analytics.',
    urgent: false,
  },
  {
    id: 'e4',
    name: 'Sprint #18',
    type: 'Project',
    sources: [
      { label: 'Slack', count: 18 },
      { label: 'Notion', count: 4 },
    ],
    lastMention: 'Deadline May 9. 3 blockers flagged by Ankit. No owner yet.',
    urgent: false,
  },
  {
    id: 'e5',
    name: 'Rahul Mehta',
    type: 'Person',
    sources: [
      { label: 'Gmail', count: 3 },
      { label: 'Slack', count: 6 },
    ],
    lastMention: 'Requested Q2 retention slide this morning via email.',
    urgent: false,
  },
  {
    id: 'e6',
    name: 'Onboarding Flow',
    type: 'Topic',
    sources: [
      { label: 'Gmail', count: 2 },
      { label: 'Notion', count: 3 },
    ],
    lastMention: 'Design review rescheduled — new slot not confirmed.',
    urgent: false,
  },
]

const TYPE_COLORS = {
  Project: 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 border-indigo-100 dark:border-indigo-900',
  Person:  'bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-300 border-violet-100 dark:border-violet-900',
  Topic:   'bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-300 border-teal-100 dark:border-teal-900',
}

const SOURCE_COLORS = {
  Gmail:  'bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400',
  Slack:  'bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400',
  Notion: 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
}

function EntityCard({ entity }) {
  const totalMentions = entity.sources.reduce((acc, s) => acc + s.count, 0)
  return (
    <div className={`
      bg-white dark:bg-gray-900 rounded-xl
      border border-gray-200 dark:border-gray-700
      p-4 transition-all duration-200
      hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm cursor-pointer
      ${entity.urgent ? 'border-l-4 border-l-indigo-400' : ''}
    `}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">{entity.name}</h3>
          <span className={`inline-block text-xs px-2 py-0.5 rounded-full border mt-1 ${TYPE_COLORS[entity.type]}`}>
            {entity.type}
          </span>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-lg font-semibold text-gray-700 dark:text-gray-200">{totalMentions}</div>
          <div className="text-xs text-gray-400">mentions</div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 flex-wrap mb-3">
        {entity.sources.map(src => (
          <span key={src.label} className={`text-xs px-2 py-0.5 rounded-full font-medium ${SOURCE_COLORS[src.label] || 'bg-gray-50 text-gray-500'}`}>
            {src.label} ×{src.count}
          </span>
        ))}
        <span className="text-xs text-gray-400 ml-1">auto-linked</span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-2">
        {entity.lastMention}
      </p>
    </div>
  )
}

export default function EntitiesPanel() {
  const urgent = ENTITIES.filter(e => e.urgent)
  const rest   = ENTITIES.filter(e => !e.urgent)
  return (
    <div>
      <div className="flex items-center gap-2 mb-5 px-3 py-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6" stroke="#6366f1" strokeWidth="1.2"/>
          <path d="M7 6v4M7 4.5v.5" stroke="#6366f1" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        <p className="text-xs text-indigo-700 dark:text-indigo-300">
          Entities auto-extracted and linked across all sources — zero manual tagging.
        </p>
      </div>
      {urgent.length > 0 && (
        <>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Needs attention</p>
          <div className="grid grid-cols-1 gap-3 mb-6 sm:grid-cols-2">
            {urgent.map(e => <EntityCard key={e.id} entity={e} />)}
          </div>
        </>
      )}
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">All entities</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {rest.map(e => <EntityCard key={e.id} entity={e} />)}
      </div>
      <div className="mt-6 flex items-center justify-center gap-1.5">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5" stroke="#6366f1" strokeWidth="1"/>
          <path d="M4 6l1.5 1.5L8 4" stroke="#6366f1" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-xs text-indigo-400 font-medium">Powered by Nexus Brain · entity graph</span>
      </div>
    </div>
  )
}