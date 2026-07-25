/**
 * rajil-benchmark-upload — Cloudflare Worker
 * ------------------------------------------------------------------
 * Receives a model file from the public /benchmark page (multipart
 * form-data, field name "model") and commits it into
 * `benchmark-models/` in the GitHub repo via the Contents API.
 *
 * The GitHub token lives ONLY here, as a Worker secret (GITHUB_TOKEN),
 * so it never reaches the browser. All limits are re-enforced here
 * because the browser-side checks can be bypassed.
 *
 * Config (wrangler.toml [vars] + secrets):
 *   GITHUB_TOKEN     (secret)  fine-grained PAT, Contents: read+write on the repo
 *   GH_OWNER         repo owner, e.g. "rajilsaj"
 *   GH_REPO          repo name, e.g. "rajilsaj.github.io"
 *   GH_BRANCH        branch to commit to, e.g. "main"
 *   ALLOWED_ORIGINS  comma-separated origins allowed to call this Worker
 */

const MAX_BYTES = 100 * 1024 * 1024 // GitHub Contents API hard limit

const ACCEPTED = [
  '.pt',
  '.pth',
  '.onnx',
  '.safetensors',
  '.gguf',
  '.h5',
  '.keras',
  '.pb',
  '.tflite',
  '.pkl',
  '.joblib',
  '.ckpt',
  '.bin',
  '.mar',
  '.zip',
]

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || ''
    const cors = corsHeaders(origin, env)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors })
    }
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed. POST a model file.' }, 405, cors)
    }

    // --- Rate limit (per client IP) ------------------------------------
    if (env.UPLOAD_LIMIT) {
      const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
      const { success } = await env.UPLOAD_LIMIT.limit({ key: ip })
      if (!success) {
        return json({ error: 'Too many uploads. Please wait a moment and retry.' }, 429, cors)
      }
    }

    // --- Cheap pre-check on Content-Length before reading the body -----
    const declared = Number(request.headers.get('Content-Length') || '0')
    if (declared && declared > MAX_BYTES + 2 * 1024 * 1024) {
      return json({ error: 'File too large. Max 100 MB.' }, 413, cors)
    }

    // --- Parse the upload ----------------------------------------------
    let form
    try {
      form = await request.formData()
    } catch {
      return json({ error: 'Expected multipart/form-data with a "model" field.' }, 400, cors)
    }

    const file = form.get('model')
    if (!file || typeof file === 'string') {
      return json({ error: 'Missing "model" file field.' }, 400, cors)
    }

    const name = sanitizeName(file.name || 'model.bin')
    const ext = name.includes('.') ? name.slice(name.lastIndexOf('.')).toLowerCase() : ''
    if (!ACCEPTED.includes(ext)) {
      return json({ error: `Unsupported file type "${ext || '(none)'}".` }, 415, cors)
    }
    if (file.size === 0) {
      return json({ error: 'That file is empty.' }, 400, cors)
    }
    if (file.size > MAX_BYTES) {
      return json({ error: 'File too large. Max 100 MB.' }, 413, cors)
    }

    // --- Encode + commit to GitHub -------------------------------------
    let content
    try {
      content = arrayBufferToBase64(await file.arrayBuffer())
    } catch {
      return json(
        { error: 'File too large to process in the Worker. Try a smaller model (<~25 MB).' },
        413,
        cors,
      )
    }

    const path = `benchmark-models/${timestamp()}-${crypto.randomUUID().slice(0, 8)}-${name}`
    const apiUrl =
      `https://api.github.com/repos/${env.GH_OWNER}/${env.GH_REPO}/contents/` +
      path.split('/').map(encodeURIComponent).join('/')

    const ghRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'rajil-benchmark-upload-worker',
      },
      body: JSON.stringify({
        message: `benchmark: upload ${name}`,
        content,
        branch: env.GH_BRANCH || 'main',
      }),
    })

    if (!ghRes.ok) {
      const detail = await ghRes.text()
      return json(
        { error: 'GitHub rejected the upload.', status: ghRes.status, detail },
        502,
        cors,
      )
    }

    const data = await ghRes.json()
    return json({ ok: true, path, url: data?.content?.html_url ?? null }, 201, cors)
  },
}

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------

function corsHeaders(origin, env) {
  const allowed = (env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const allow = allowed.includes(origin) ? origin : allowed[0] || '*'
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
}

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors },
  })
}

/** Strip any path, keep a safe basename, cap length. */
function sanitizeName(raw) {
  const base = raw.split(/[\\/]/).pop() || 'model.bin'
  const cleaned = base.replace(/[^A-Za-z0-9._-]/g, '_').replace(/^\.+/, '')
  return (cleaned || 'model.bin').slice(0, 128)
}

/** ISO timestamp, filesystem-safe. */
function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-')
}

/** Chunked base64 so large buffers don't blow the call stack. */
function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer)
  const chunk = 0x8000
  let binary = ''
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk))
  }
  return btoa(binary)
}
