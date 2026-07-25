# benchmark-models

This folder is the destination for ML model files uploaded through the
unlisted **/benchmark** page (`src/pages/benchmark.astro`).

## How it fills up

The `/benchmark` page is a static page served by GitHub Pages, which **cannot
write files to the repository on its own**. Uploads reach this folder only once
a server-side proxy is wired up:

```
browser (/benchmark)  ──upload──►  serverless proxy (holds a GitHub token)
                                        │ validates size (≤100 MB) + type
                                        └─ commits file here via the
                                           GitHub Contents API
```

Until that proxy exists, the page validates and previews uploads client-side but
has nowhere to send them (`UPLOAD_ENDPOINT` in `benchmark.astro` is empty).

## Notes

- GitHub rejects any single file larger than **100 MB** via the Contents API,
  so the page caps uploads at 100 MB. Larger models need object storage
  (Cloudflare R2 / Vercel Blob), not this folder.
- Because the page is public, whatever proxy you deploy **must** enforce size,
  file-type, and rate limits server-side — client-side checks are only a UX
  convenience and can be bypassed.
