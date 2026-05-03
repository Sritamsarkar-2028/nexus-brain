export const CURRENT_USER = {
  name: 'Sritam Sarkar',
  initials: 'SS',
  role: 'Frontend Lead',
}

export const NUDGE = {
  id: 'nudge-1',
  type: 'meeting',
  minutesUntil: 18,
  person: 'Priya Sharma',
  context:
    'She asked about the Atlas API spec 2 days ago on Slack. The spec doc was updated yesterday. 2 open sign-off items.',
  sources: ['Slack', 'Notion'],
}

export const ACTIONS = [
  {
    id: 'act-1',
    urgency: 'today',
    from: 'Priya Sharma',
    role: 'Design Lead',
    initials: 'PS',
    subject: 'Re: Atlas API spec — final sign-off needed before sprint',
    receivedAt: '9:14 AM',
    source: 'Gmail',
    aiSummary:
      'Needs approval on 2 open endpoints: auth flow + rate limits. Related Notion spec updated Apr 29. Sprint blocked until confirmed.',
    linkedSources: ['Slack x11', 'Notion x2'],
    draftReady: true,
    draft:
      'Hi Priya, approved both endpoints — auth flow looks solid, rate limits set to 100 req/min per client. Good to go for sprint!',
  },
  {
    id: 'act-2',
    urgency: 'today',
    from: 'Rahul Mehta',
    role: 'CEO',
    initials: 'RM',
    subject: 'Q2 metrics deck — can you add the retention slide?',
    receivedAt: '7:52 AM',
    source: 'Gmail',
    aiSummary:
      'Retention data lives in Notion Q2 Analytics page (updated May 1). Slack thread with Ankit Apr 30 has the chart export.',
    linkedSources: ['Notion x3', 'Slack x5'],
    draftReady: true,
    draft:
      'Hi Rahul, on it. Found the retention data in Q2 Analytics Notion doc — will add the slide and share updated deck by 5 PM today.',
  },
  {
    id: 'act-3',
    urgency: 'later',
    from: 'Ankit Verma',
    role: 'Backend Lead',
    initials: 'AV',
    subject: 'Sprint #18 blockers — need frontend input on 2 items',
    receivedAt: 'Yesterday',
    source: 'Slack',
    aiSummary:
      'Two Slack threads unresolved: loading state on entity graph, and API error boundary design. No deadline set yet.',
    linkedSources: ['Slack x18'],
    draftReady: false,
    draft: '',
  },
  {
    id: 'act-4',
    urgency: 'fyi',
    from: 'GitHub CI',
    role: 'Automated',
    initials: 'GH',
    subject: 'Build #412 passed — staging deploy complete',
    receivedAt: '6:30 AM',
    source: 'GitHub',
    aiSummary: 'No action needed. All checks passed. Auto-archived.',
    linkedSources: [],
    draftReady: false,
    draft: '',
  },
]