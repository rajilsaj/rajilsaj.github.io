# rajil-benchmark-upload (Cloudflare Worker)

The upload backend for the public **/benchmark** page. It holds the GitHub
token (as a Worker secret, never in the browser), validates each upload, and
commits it into `benchmark-models/` in the repo via the GitHub Contents API.

```
browser (/benchmark) ──POST multipart "model"──► this Worker ──PUT──► GitHub repo
                                                   (token hidden here)
```

## One-time setup

### 1. Create a fine-grained GitHub token (least privilege)

GitHub → **Settings → Developer settings → Fine-grained personal access tokens → Generate new token**

- **Repository access:** *Only select repositories* → pick `rajilsaj.github.io`
- **Permissions → Repository permissions → Contents:** **Read and write**
- (everything else: No access)
- Copy the token (starts with `github_pat_...`).

> This token can only write files to this one repo — the smallest scope that still works. Treat it as a secret; it never leaves the Worker.

### 2. Install wrangler & log in

```bash
cd worker
npm install
npx wrangler login
```

### 3. Check `wrangler.toml`

Confirm `GH_OWNER`, `GH_REPO`, `GH_BRANCH`, and `ALLOWED_ORIGINS` match your site.
`ALLOWED_ORIGINS` must include the exact origin the page is served from
(e.g. `https://rajil.me`).

### 4. Store the token as a secret and deploy

```bash
npx wrangler secret put GITHUB_TOKEN   # paste the github_pat_... token
npx wrangler deploy
```

Deploy prints your Worker URL, e.g.
`https://rajil-benchmark-upload.<your-subdomain>.workers.dev`.

### 5. Wire the page to the Worker

In `src/pages/benchmark.astro`, set:

```ts
const UPLOAD_ENDPOINT = 'https://rajil-benchmark-upload.<your-subdomain>.workers.dev'
```

Rebuild/redeploy the site. Uploads now commit into `benchmark-models/`.

## Test it

```bash
# from anywhere, replace the URL:
curl -X POST -F "model=@some-model.onnx" \
  https://rajil-benchmark-upload.<your-subdomain>.workers.dev
# → {"ok":true,"path":"benchmark-models/...","url":"https://github.com/..."}
```

## Limits enforced server-side

| Check | Value | Why |
|---|---|---|
| Max file size | 100 MB | GitHub Contents API hard limit |
| Allowed extensions | `.pt .pth .onnx .safetensors .gguf .h5 .keras .pb .tflite .pkl .joblib .ckpt .bin .mar .zip` | reject junk |
| Rate limit | 5 uploads / 60s per IP | basic abuse protection |
| CORS | `ALLOWED_ORIGINS` only | only your site can call it |

## Caveats (read these)

- **Worker memory (~128 MB):** the file is base64-encoded in memory, so uploads
  approaching 100 MB can exceed the Worker's memory and fail. Comfortable
  ceiling is roughly **~25 MB**. For genuinely large models use object storage
  (Cloudflare R2 / Vercel Blob) instead of committing into git.
- **Every accepted upload = one commit**, which triggers your GitHub Pages
  rebuild/deploy and permanently grows the repo's git history.
- The rate limit is per Cloudflare edge/IP and best-effort; it's a speed bump,
  not a wall. Consider adding a CAPTCHA/Turnstile if abuse becomes a problem.
