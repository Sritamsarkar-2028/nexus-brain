import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenerativeAI } from '@google/generative-ai'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const MODEL = 'gemini-2.0-flash'

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Nexus Brain API', version: '1.0.0' })
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', llm: !!process.env.GEMINI_API_KEY, version: '1.0.0' })
})

app.post('/api/process', async (req, res) => {
  try {
    const { inputs } = req.body
    if (!inputs || inputs.length === 0) return res.status(400).json({ error: 'No inputs provided' })

    const model = genAI.getGenerativeModel({ model: MODEL })
    const inputText = inputs.map(i => `[${i.source.toUpperCase()}]: ${i.content}`).join('\n\n')

    const prompt = `You are Nexus Brain, an AI second brain for knowledge workers.
Analyze these inputs and extract actionable items:

${inputText}

Respond ONLY with valid JSON, no markdown:
{
  "processed_items": [
    {
      "id": "unique-id",
      "source": "gmail",
      "title": "brief title",
      "content": "full content",
      "sender": "sender name",
      "is_task": true,
      "priority": "High",
      "urgency": "today",
      "ai_summary": "1-2 sentence analysis",
      "draft": "suggested reply",
      "draft_ready": true,
      "linked_sources": [],
      "received_at": "9:00 AM"
    }
  ],
  "intelligence": { "priorities": ["priority 1", "priority 2"] },
  "daily_summary": "2-3 sentence summary",
  "context_clusters": {}
}`

    const result = await model.generateContent(prompt)
    const text = result.response.text().replace(/```json|```/g, '').trim()
    const data = JSON.parse(text)
    res.json({ ...data, input_count: inputs.length })
  } catch (error) {
    console.error('Process error:', error)
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/chat', async (req, res) => {
  try {
    const { query } = req.body
    if (!query?.trim()) return res.status(400).json({ error: 'Query cannot be empty' })

    const model = genAI.getGenerativeModel({ model: MODEL })
    const prompt = `You are Nexus Brain, an AI assistant helping knowledge workers find information across Gmail, Slack, and Notion.

User query: ${query}

Answer helpfully and concisely. Reference specific sources when relevant.`

    const result = await model.generateContent(prompt)
    const answer = result.response.text()
    res.json({ answer, sources: [{ source: 'Gmail' }, { source: 'Slack' }, { source: 'Notion' }] })
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/chat/stream', async (req, res) => {
  try {
    const { query } = req.body
    if (!query?.trim()) return res.status(400).json({ error: 'Query cannot be empty' })

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    const model = genAI.getGenerativeModel({ model: MODEL })
    const prompt = `You are Nexus Brain, an AI assistant helping knowledge workers find information across Gmail, Slack, and Notion.

User query: ${query}

Answer helpfully and concisely. Reference specific sources when relevant.`

    const result = await model.generateContentStream(prompt)

    for await (const chunk of result.stream) {
      const text = chunk.text()
      if (text) res.write(`data: ${JSON.stringify({ chunk: text })}\n\n`)
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`)
    res.end()
  } catch (error) {
    console.error('Stream error:', error)
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`)
    res.end()
  }
})

app.get('/api/actions', (req, res) => {
  res.json([
    {
      id: 'act-1', urgency: 'today', from: 'Priya Sharma', role: 'Design Lead', initials: 'PS',
      subject: 'Re: Atlas API spec — final sign-off needed before sprint',
      receivedAt: '9:14 AM', source: 'Gmail',
      aiSummary: 'Needs approval on 2 open endpoints: auth flow + rate limits. Sprint blocked until confirmed.',
      linkedSources: ['Slack x11', 'Notion x2'], draftReady: true,
      draft: 'Hi Priya, approved both endpoints — auth flow looks solid, rate limits set to 100 req/min. Good to go!',
    },
    {
      id: 'act-2', urgency: 'today', from: 'Rahul Mehta', role: 'CEO', initials: 'RM',
      subject: 'Q2 metrics deck — can you add the retention slide?',
      receivedAt: '7:52 AM', source: 'Gmail',
      aiSummary: 'Retention data in Notion Q2 Analytics page. Slack thread with Ankit has the chart export.',
      linkedSources: ['Notion x3', 'Slack x5'], draftReady: true,
      draft: 'Hi Rahul, on it. Found the data in Q2 Analytics — will share updated deck by 5 PM.',
    },
    {
      id: 'act-3', urgency: 'later', from: 'Ankit Verma', role: 'Backend Lead', initials: 'AV',
      subject: 'Sprint #18 blockers — need frontend input on 2 items',
      receivedAt: 'Yesterday', source: 'Slack',
      aiSummary: 'Two unresolved threads: loading state on entity graph, API error boundary design.',
      linkedSources: ['Slack x18'], draftReady: false, draft: '',
    },
    {
      id: 'act-4', urgency: 'fyi', from: 'GitHub CI', role: 'Automated', initials: 'GH',
      subject: 'Build #412 passed — staging deploy complete',
      receivedAt: '6:30 AM', source: 'GitHub',
      aiSummary: 'No action needed. All checks passed.',
      linkedSources: [], draftReady: false, draft: '',
    },
  ])
})

app.get('/api/nudge/active', (req, res) => {
  res.json({
    id: 'nudge-1', type: 'meeting', minutesUntil: 18, person: 'Priya Sharma',
    context: 'She asked about the Atlas API spec 2 days ago on Slack. The spec doc was updated yesterday.',
    sources: ['Slack', 'Notion'],
  })
})

app.get('/api/digest', (req, res) => {
  res.json({
    stats: { processed: 23, actionNeeded: 2, savedMinutes: 87 },
    mustAct: [
      { id: 'd1', text: 'Approve Atlas API auth flow — sprint blocked', source: 'Gmail + Slack + Notion' },
      { id: 'd2', text: 'Send retention slide to CEO by EOD', source: 'Gmail — data in Notion' },
    ],
    radar: [
      { id: 'd3', text: 'Sprint #18 has 3 unresolved blockers', source: 'Slack — Ankit, Apr 30' },
      { id: 'd4', text: 'Design review rescheduled — no new slot', source: 'Gmail — Rohan, May 1' },
    ],
    fyi: [
      { id: 'd5', text: 'Build #412 passed, staging deploy complete', source: 'GitHub CI' },
      { id: 'd6', text: 'Monthly infra cost — within budget', source: 'Gmail — finance' },
    ],
  })
})

app.get('/api/entities', (req, res) => {
  res.json([
    {
      id: 'e1', name: 'Project Atlas', type: 'Project', urgent: true,
      sources: [{ label: 'Gmail', count: 4 }, { label: 'Slack', count: 11 }, { label: 'Notion', count: 2 }],
      lastMention: 'Priya\'s email 9:14am — "final sign-off on auth flow"',
    },
    {
      id: 'e2', name: 'Priya Sharma', type: 'Person', urgent: true,
      sources: [{ label: 'Gmail', count: 7 }, { label: 'Slack', count: 23 }],
      lastMention: 'Meeting in 18 min. Last Slack: "atlas api spec looks good"',
    },
    {
      id: 'e3', name: 'Q2 Metrics', type: 'Topic', urgent: false,
      sources: [{ label: 'Gmail', count: 2 }, { label: 'Slack', count: 5 }, { label: 'Notion', count: 3 }],
      lastMention: 'CEO requested retention slide. Data in Notion Q2 Analytics.',
    },
    {
      id: 'e4', name: 'Sprint #18', type: 'Project', urgent: false,
      sources: [{ label: 'Slack', count: 18 }, { label: 'Notion', count: 4 }],
      lastMention: 'Deadline May 9. 3 blockers flagged. No owner yet.',
    },
  ])
})

app.listen(PORT, () => {
  console.log(`Nexus Brain server running on http://localhost:${PORT}`)
})