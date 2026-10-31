# kprep backend (Google Apps Script)

`Code.gs` is the backend for [rajil.me/kprep](https://rajil.me/kprep). It stores the
tracker's progress in a Google Sheet. It is **not** deployed by the site build; you
paste it into Apps Script yourself.

## Setup

1. Create a new Google Sheet (any name, e.g. "kprep").
2. In the Sheet, open **Extensions → Apps Script**.
3. Replace the contents of `Code.gs` in the editor with the contents of
   [`Code.gs`](./Code.gs) from this folder, then save.
4. Add the token: **Project Settings** (gear icon) → **Script properties** →
   **Add script property**.
   - Property: `TOKEN`
   - Value: a long random string. For example, run this in a terminal and copy the
     output: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - Keep it somewhere safe (a password manager). Never commit it.
5. **Deploy → New deployment** → gear icon → **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy** and approve the permissions prompt (Google warns that the app
     is unverified because it's your own script: **Advanced → Go to … (unsafe)**).
6. Copy the **Web app URL** (it ends in `/exec`). That is `PUBLIC_KPREP_API`.

The `days` and `meta` tabs are created on the first request. You can test it by
opening the `/exec` URL in a browser; it should show `{"days":{},"meta":null}`.

## After every change to Code.gs

**Deploy → Manage deployments** → pencil (Edit) → Version: **New version** →
**Deploy**. This keeps the same `/exec` URL. Saving alone does not update the live
web app.

## Wiring it to the site

- GitHub: repo **Settings → Secrets and variables → Actions → Variables** tab →
  **New repository variable**, name `PUBLIC_KPREP_API`, value the `/exec` URL. The
  deploy workflow passes it into `astro build`. It's a variable, not a secret: the
  URL ends up in the public page anyway, and reads are public by design.
- Local dev: copy `.env.example` to `.env` and fill in the same URL.
- On the page, open **Settings → Unlock editing** and paste the `TOKEN` once per
  device. It's stored in that browser's localStorage only. **Lock** clears it.

Without the token the page is read-only: anyone can see the progress, only the
token holder can write. If `PUBLIC_KPREP_API` is empty, the page runs entirely on
localStorage.

## Data format

| Tab    | Column A            | Column B                                              |
| ------ | ------------------- | ----------------------------------------------------- |
| `days` | `2026-11-02`        | `["Take a full timed practice test", …]`              |
| `meta` | `state`             | `{"testDate":"2027-07-01","target":80,"vocabGoal":1500,"scores":[…]}` |

Both columns are stored as plain text. Editing the Sheet by hand works as long as
column B stays valid JSON.
