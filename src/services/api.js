const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

async function get(path) {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) throw new Error(`API error ${res.status}`)
  return res.json()
}

async function post(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`API error ${res.status}`)
  return res.json()
}

export async function getActions() {
  return get('/api/actions')
}

export async function getNudge() {
  return get('/api/nudge/active')
}

export async function getDigest() {
  return get('/api/digest')
}

export async function getEntities() {
  return get('/api/entities')
}

export async function chat(query) {
  return post('/api/chat', { query })
}

export function chatStream(query, onChunk, onDone) {
  fetch(`${BASE_URL}/api/chat/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  }).then(res => {
    const reader = res.body.getReader()
    const decoder = new TextDecoder()

    function read() {
      reader.read().then(({ done, value }) => {
        if (done) { onDone(); return }
        const text = decoder.decode(value)
        const lines = text.split('\n').filter(l => l.startsWith('data: '))
        lines.forEach(line => {
          try {
            const data = JSON.parse(line.replace('data: ', ''))
            if (data.chunk) onChunk(data.chunk)
            if (data.done) onDone()
          } catch {}
        })
        read()
      })
    }
    read()
  }).catch(err => {
    console.error('Stream error:', err)
    onDone()
  })
}

export async function healthCheck() {
  return get('/api/health')
}