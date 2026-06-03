// Shared interactive-terminal engine.
// Mounts onto a root element containing elements marked with:
//   [data-term-output] [data-term-form] [data-term-input] [data-term-prompt] [data-term-hint]
// Reads site data from a <script id="terminal-data" type="application/json"> in the document.
// Maps the whole site to a virtual filesystem so every page is reachable.

type Post = { slug: string; title: string; tags: string[] }
type TermData = {
  author: string
  title: string
  posts: Post[]
  tags: string[]
  pages: { name: string; path: string }[]
}

export type TerminalApi = {
  printWelcome: () => void
  focus: () => void
  clear: () => void
}

export function mountTerminal(
  root: HTMLElement,
  opts: { host?: string } = {},
): TerminalApi | null {
  if (root.dataset.termReady === '1') return null

  const dataEl = document.getElementById('terminal-data')
  // The scrollable region. New command output is appended to the console
  // element if present (so server-rendered page content above it is kept),
  // otherwise straight into the scroll region.
  const scrollEl = root.querySelector<HTMLElement>('[data-term-output]')
  const consoleEl = root.querySelector<HTMLElement>('[data-term-console]')
  const out = consoleEl || scrollEl
  const form = root.querySelector<HTMLFormElement>('[data-term-form]')
  const input = root.querySelector<HTMLInputElement>('[data-term-input]')
  const promptEl = root.querySelector<HTMLElement>('[data-term-prompt]')
  const hintEl = root.querySelector<HTMLElement>('[data-term-hint]')
  const sugEl = root.querySelector<HTMLElement>('[data-term-suggestions]')
  if (!dataEl || !scrollEl || !out || !form || !input || !promptEl) return null

  root.dataset.termReady = '1'

  const DATA: TermData = JSON.parse(dataEl.textContent || '{}')
  const host = opts.host || 'rajil@web'
  const history: string[] = []
  let histIdx = -1
  let cwd: string[] = pathToCwd(location.pathname)
  let currentHint = 'help'

  function pathToCwd(pathname: string): string[] {
    const parts = pathname.replace(/^\/|\/$/g, '').split('/').filter(Boolean)
    if (parts.length === 2 && parts[0] === 'posts' && /^\d+$/.test(parts[1])) {
      return ['posts']
    }
    return parts.map((p) => decodeURIComponent(p))
  }

  function cwdString(): string {
    return cwd.length ? '~/' + cwd.join('/') : '~'
  }

  function refreshPrompt() {
    promptEl!.textContent = `${host}:${cwdString()}$`
  }

  function scrollDown() {
    scrollEl!.scrollTop = scrollEl!.scrollHeight
  }

  function print(text: string, cls = '') {
    const div = document.createElement('div')
    if (cls) div.className = cls
    div.textContent = text
    out!.appendChild(div)
    scrollDown()
  }

  function printHTML(html: string) {
    const div = document.createElement('div')
    div.innerHTML = html
    out!.appendChild(div)
    scrollDown()
  }

  function escapeHTML(s: string) {
    return s.replace(
      /[&<>"]/g,
      (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] || c,
    )
  }

  function echoCommand(cmd: string) {
    printHTML(
      `<span class="text-green">${escapeHTML(promptEl!.textContent || '$')}</span> ${escapeHTML(cmd)}`,
    )
  }

  function setHint(cmd: string, note = 'Tab to autofill · Enter to run') {
    currentHint = cmd
    input!.placeholder = cmd
    if (hintEl) {
      hintEl.innerHTML = `<span class="text-accent">hint:</span> type <span class="text-foreground">${escapeHTML(cmd)}</span> · <span class="text-foreground/40">${note}</span>`
    }
  }

  function computeHint(): string {
    if (cwd.length === 0) return 'cd posts'
    if (cwd[0] === 'posts' && cwd.length === 1) {
      const first = DATA.posts[0]
      return first ? `cat ${first.slug}` : 'cd ~'
    }
    if (cwd[0] === 'posts' && cwd.length >= 2) return 'cd ~'
    if (cwd[0] === 'tags' && cwd.length === 1) {
      const first = DATA.tags[0]
      return first ? `cd ${first}` : 'cd ~'
    }
    if (cwd[0] === 'tags' && cwd.length >= 2) return 'cd ~'
    return 'cd ~'
  }

  function go(url: string) {
    print(`navigating to ${url} …`, 'text-foreground/50')
    sessionStorage.setItem('term-open', '1')
    window.location.href = url
  }

  function listing(items: { label: string; cls?: string }[]) {
    const wrap = document.createElement('div')
    wrap.className = 'flex flex-wrap gap-x-5 gap-y-0.5'
    for (const it of items) {
      const span = document.createElement('span')
      span.className = it.cls || 'text-foreground/90'
      span.textContent = it.label
      wrap.appendChild(span)
    }
    out!.appendChild(wrap)
    scrollDown()
  }

  function doLs(arg?: string) {
    let scope = cwd
    if (arg) scope = pathToCwd('/' + arg.replace(/^[~/]+/, ''))
    if (scope.length === 0) {
      listing([
        { label: 'posts/', cls: 'text-accent' },
        { label: 'tags/', cls: 'text-accent' },
        ...DATA.pages.map((p) => ({ label: p.name, cls: 'text-link' })),
      ])
      return
    }
    if (scope[0] === 'posts' && scope.length === 1) {
      DATA.posts.forEach((p, i) =>
        printHTML(
          `<span class="text-foreground/40">${String(i + 1).padStart(2, ' ')}</span>  <span class="text-link">${escapeHTML(p.slug)}</span>  <span class="text-foreground/50">— ${escapeHTML(p.title)}</span>`,
        ),
      )
      return
    }
    if (scope[0] === 'tags' && scope.length === 1) {
      listing(DATA.tags.map((t) => ({ label: t, cls: 'text-accent' })))
      return
    }
    if (scope[0] === 'tags' && scope.length === 2) {
      const tag = scope[1]
      const tagged = DATA.posts.filter((p) =>
        p.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()),
      )
      if (!tagged.length) print(`no posts tagged "${tag}"`, 'text-warning')
      tagged.forEach((p) =>
        printHTML(
          `<span class="text-link">${escapeHTML(p.slug)}</span>  <span class="text-foreground/50">— ${escapeHTML(p.title)}</span>`,
        ),
      )
      return
    }
    print('not a directory', 'text-warning')
  }

  function doTree() {
    printHTML(`<span class="text-accent">~</span>  <span class="text-foreground/50">(home)</span>`)
    printHTML(`├── <span class="text-accent">posts/</span>`)
    DATA.posts.forEach((p, i) => {
      const branch = i === DATA.posts.length - 1 ? '│   └──' : '│   ├──'
      printHTML(
        `${branch} <span class="text-link">${escapeHTML(p.slug)}</span>`,
      )
    })
    printHTML(`├── <span class="text-accent">tags/</span>`)
    DATA.tags.forEach((t, i) => {
      const branch = i === DATA.tags.length - 1 ? '│   └──' : '│   ├──'
      printHTML(`${branch} <span class="text-accent">${escapeHTML(t)}</span>`)
    })
    DATA.pages.forEach((p, i) => {
      const branch = i === DATA.pages.length - 1 ? '└──' : '├──'
      printHTML(`${branch} <span class="text-link">${escapeHTML(p.name)}</span>`)
    })
  }

  function findPost(name: string): Post | undefined {
    const n = name.toLowerCase()
    return (
      DATA.posts.find((p) => p.slug.toLowerCase() === n) ||
      DATA.posts.find((p) => p.slug.toLowerCase().includes(n))
    )
  }

  function doCd(target?: string) {
    if (!target || target === '~' || target === '/') return go('/')
    let segs: string[]
    if (target.startsWith('~') || target.startsWith('/')) {
      segs = target.replace(/^[~/]+/, '').split('/').filter(Boolean)
    } else {
      segs = [...cwd]
      for (const part of target.split('/').filter(Boolean)) {
        if (part === '.') continue
        else if (part === '..') segs.pop()
        else segs.push(part)
      }
    }
    if (segs.length === 0) return go('/')
    const page = DATA.pages.find((p) => p.name === segs[0])
    if (page && segs.length === 1) return go(page.path)
    if (segs[0] === 'posts' && segs.length === 1) return go('/posts')
    if (segs[0] === 'posts' && segs.length === 2) {
      const post = findPost(segs[1])
      if (post) return go(`/posts/${post.slug}`)
      return print(`cd: no such post: ${segs[1]}`, 'text-warning')
    }
    if (segs[0] === 'tags' && segs.length === 1) {
      cwd = ['tags']
      refreshPrompt()
      print('tags/ (pick one to open)', 'text-foreground/50')
      doLs()
      return
    }
    if (segs[0] === 'tags' && segs.length === 2) {
      const tag = DATA.tags.find((t) => t.toLowerCase() === segs[1].toLowerCase())
      if (tag) return go(`/tags/${encodeURIComponent(tag)}`)
      return print(`cd: no such tag: ${segs[1]}`, 'text-warning')
    }
    if (cwd[0] === 'tags' && segs.length === 1) {
      const tag = DATA.tags.find((t) => t.toLowerCase() === segs[0].toLowerCase())
      if (tag) return go(`/tags/${encodeURIComponent(tag)}`)
    }
    print(`cd: no such directory: ${target}`, 'text-warning')
  }

  function doHelp() {
    const rows: [string, string][] = [
      ['ls [path]', 'list what is here (or at path)'],
      ['cd <dir>', 'go somewhere — posts, tags, about, ~, ..'],
      ['cat <post>', 'open a post by its slug'],
      ['tree', 'show the whole site map'],
      ['posts', 'jump to the post archive'],
      ['tags', 'list all tags'],
      ['whoami', 'about the author'],
      ['pwd', 'print current location'],
      ['open <url>', 'open an external link'],
      ['clear', 'clear the screen'],
      ['help', 'show this help'],
    ]
    print('Available commands:', 'text-accent')
    for (const [cmd, desc] of rows)
      printHTML(
        `  <span class="text-link">${cmd.padEnd(12)}</span><span class="text-foreground/60">${escapeHTML(desc)}</span>`,
      )
  }

  type Suggestion = { label: string; desc: string; cmd: string }

  function cap(s: string) {
    if (s.length <= 2) return s.toUpperCase() // e.g. "cv" -> "CV"
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  // Context-aware list of "where to next" destinations for the current location.
  function computeSuggestions(): Suggestion[] {
    const s: Suggestion[] = []
    const at = cwd
    if (at.length === 0) {
      s.push({ label: 'Posts', desc: 'All articles', cmd: 'cd posts' })
      if (DATA.tags.length)
        s.push({ label: 'Tags', desc: 'Browse by topic', cmd: 'cd tags' })
      for (const p of DATA.pages)
        s.push({ label: cap(p.name), desc: '', cmd: `cd ${p.name}` })
      s.push({ label: 'Site map', desc: 'Everything at a glance', cmd: 'tree' })
      DATA.posts.slice(0, 3).forEach((p) =>
        s.push({ label: p.title, desc: 'read', cmd: `cat ${p.slug}` }),
      )
    } else if (at[0] === 'posts' && at.length === 1) {
      DATA.posts.slice(0, 6).forEach((p) =>
        s.push({
          label: p.title,
          desc: p.tags[0] ? '#' + p.tags[0] : 'read',
          cmd: `cat ${p.slug}`,
        }),
      )
      s.push({ label: 'Home', desc: '', cmd: 'cd ~' })
    } else if (at[0] === 'posts' && at.length >= 2) {
      s.push({ label: 'All posts', desc: '', cmd: 'cd posts' })
      if (DATA.tags.length) s.push({ label: 'Tags', desc: '', cmd: 'cd tags' })
      s.push({ label: 'Home', desc: '', cmd: 'cd ~' })
      DATA.posts
        .filter((p) => p.slug !== at[1])
        .slice(0, 3)
        .forEach((p) =>
          s.push({ label: p.title, desc: 'read next', cmd: `cat ${p.slug}` }),
        )
    } else if (at[0] === 'tags' && at.length === 1) {
      DATA.tags.slice(0, 8).forEach((t) =>
        s.push({ label: '#' + t, desc: '', cmd: `cd ${t}` }),
      )
      s.push({ label: 'Home', desc: '', cmd: 'cd ~' })
    } else if (at[0] === 'tags' && at.length >= 2) {
      const tag = at[1]
      DATA.posts
        .filter((p) => p.tags.map((x) => x.toLowerCase()).includes(tag.toLowerCase()))
        .slice(0, 6)
        .forEach((p) =>
          s.push({ label: p.title, desc: 'read', cmd: `cat ${p.slug}` }),
        )
      s.push({ label: 'All tags', desc: '', cmd: 'cd tags' })
      s.push({ label: 'Home', desc: '', cmd: 'cd ~' })
    } else {
      s.push({ label: 'Posts', desc: '', cmd: 'cd posts' })
      if (DATA.tags.length) s.push({ label: 'Tags', desc: '', cmd: 'cd tags' })
      s.push({ label: 'Home', desc: '', cmd: 'cd ~' })
    }
    return s
  }

  function renderSuggestions() {
    if (!sugEl) return
    sugEl.innerHTML = ''
    const wrap = document.createElement('div')
    wrap.className = 'flex flex-wrap items-center gap-1.5'

    const lead = document.createElement('span')
    lead.className = 'mr-0.5 select-none text-xs text-foreground/35'
    lead.textContent = 'go:'
    wrap.appendChild(lead)

    for (const it of computeSuggestions()) {
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.title = it.cmd
      btn.className =
        'max-w-[11rem] truncate rounded-full border border-accent/25 px-2.5 py-0.5 text-xs text-accent transition-colors hover:border-accent/60 hover:bg-accent/10 focus-visible:bg-accent/10'
      btn.textContent = it.label
      btn.addEventListener('click', () => run(it.cmd))
      wrap.appendChild(btn)
    }
    sugEl.appendChild(wrap)
  }

  function run(raw: string) {
    const line = raw.trim()
    echoCommand(line)
    if (line) {
      history.push(line)
      if (history.length > 50) history.shift()
    }
    histIdx = history.length
    const [cmd, ...rest] = line.split(/\s+/)
    const arg = rest.join(' ')
    switch (cmd) {
      case '':
        break
      case 'help':
      case '?':
        doHelp()
        break
      case 'ls':
      case 'dir':
        doLs(arg)
        break
      case 'tree':
      case 'sitemap':
        doTree()
        break
      case 'cd':
        doCd(arg)
        break
      case 'cat':
      case 'open': {
        if (cmd === 'open' && /^https?:\/\//.test(arg)) {
          print(`opening ${arg} …`, 'text-foreground/50')
          window.open(arg, '_blank', 'noopener')
          break
        }
        const post = findPost(arg)
        if (post) go(`/posts/${post.slug}`)
        else print(`${cmd}: not found: ${arg}`, 'text-warning')
        break
      }
      case 'posts':
        go('/posts')
        break
      case 'tags':
        doCd('tags')
        break
      case 'about':
        doCd('about')
        break
      case 'home':
        go('/')
        break
      case 'pwd':
        print(cwdString())
        break
      case 'whoami':
        print(DATA.author, 'text-accent')
        print(`Maintainer of ${DATA.title}. Try 'cd about' for more.`, 'text-foreground/60')
        break
      case 'clear':
        out!.innerHTML = ''
        break
      case 'sudo':
        print('nice try 😏 — you already have root here.', 'text-magenta')
        break
      default:
        print(`command not found: ${cmd}. Type 'help'.`, 'text-warning')
    }
    setHint(computeHint())
    renderSuggestions()
  }

  function printWelcome() {
    print(`${DATA.title} — terminal navigator`, 'text-accent')
    print("Type a command to move around. 'help' lists them all.", 'text-foreground/60')
    if (cwd.length) print(`You are in ${cwdString()}`, 'text-foreground/50')
  }

  // --- Wire up events ---
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const val = input.value
    input.value = ''
    run(val)
  })

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      input.value = currentHint
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (histIdx > 0) {
        histIdx--
        input.value = history[histIdx] || ''
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIdx < history.length - 1) {
        histIdx++
        input.value = history[histIdx] || ''
      } else {
        histIdx = history.length
        input.value = ''
      }
    }
  })

  // Clicking the prompt line focuses the input (without hijacking page clicks)
  form.addEventListener('click', () => input.focus())

  refreshPrompt()
  setHint(computeHint())
  renderSuggestions()

  return {
    printWelcome,
    focus: () => input.focus(),
    clear: () => {
      out.innerHTML = ''
    },
  }
}
