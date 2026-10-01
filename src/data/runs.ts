/**
 * Day by Day Challenge log, shown at /run. No finish line: it counts up for good.
 * Four logs, each keyed by ISO date: runs, weigh-ins, push-ups, rest days.
 * Add entries in any order — the page sorts by date.
 */

/** Day 0 of the challenge (restarted from zero). */
export const CHALLENGE_START = '2026-09-29'

export type Run = {
  /** ISO date, e.g. '2026-09-23' */
  date: string
  /** Start–end time as shown on the watch, e.g. '5:32 AM – 6:42 AM' */
  time?: string
  location?: string
  /** Workout time, 'h:mm:ss' or 'mm:ss' */
  workoutTime: string
  /** Elapsed time incl. pauses, 'h:mm:ss' or 'mm:ss' */
  elapsedTime?: string
  /** Distance in miles (omit until the workout summary is logged) */
  distanceMi?: number
  activeCal?: number
  totalCal?: number
  /** Elevation gain in feet */
  elevationFt?: number
  /** Average power in watts */
  avgPowerW?: number
  /** Average cadence in steps per minute */
  avgCadenceSpm?: number
  /** Average pace, 'mm:ss' per mile (omit until the workout summary is logged) */
  avgPace?: string
  /** Average heart rate in bpm */
  avgHrBpm?: number
  /** Time in heart rate zones 1–5, 'mm:ss' each, from the Heart Rate detail screen */
  hrZones?: [string, string, string, string, string]
  /** Post-workout heart rate: at the end, after 1 min, after 2 min (bpm) */
  recoveryHr?: { end: number; min1: number; min2: number }
  /** Apple Fitness effort rating, 1–10 */
  effort?: number
  /** Weather at the start of the run */
  tempF?: number
  humidityPct?: number
  /** Per-mile splits from the Splits screen: time for that mile ('mm:ss') and average heart rate */
  splits?: { time: string; hr?: number }[]
  notes?: string
}

/** Zone boundaries shown in Apple Fitness (bpm). */
export const HR_ZONES = ['<132', '133–145', '146–157', '158–170', '171+']

/** One entry per run. Values are copied from the Apple Fitness workout summary. */
export const runs: Run[] = [
  {
    date: '2026-09-29',
    time: '5:36 AM – 6:53 AM',
    location: 'Fayetteville',
    workoutTime: '1:17:39',
    distanceMi: 7.09,
    activeCal: 795,
    totalCal: 911,
    elevationFt: 394,
    avgPowerW: 181,
    avgCadenceSpm: 163,
    avgPace: '10:57',
    avgHrBpm: 146,
    hrZones: ['1:58', '35:01', '38:42', '1:57', '0:00'],
    effort: 5,
    tempF: 59,
    humidityPct: 92,
    splits: [
      { time: '10:36', hr: 138 },
      { time: '10:30', hr: 147 },
      { time: '10:57', hr: 144 },
      { time: '11:35', hr: 147 },
      { time: '11:11', hr: 146 },
    ],
    notes: '10K Run award',
  },
  {
    date: '2026-09-30',
    time: '5:05 AM – 6:43 AM',
    location: 'Fayetteville',
    workoutTime: '1:17:53',
    elapsedTime: '1:37:29',
    distanceMi: 7.78,
    activeCal: 835,
    totalCal: 952,
    elevationFt: 276,
    avgPowerW: 197,
    avgCadenceSpm: 168,
    avgPace: '10:00',
    avgHrBpm: 155,
    hrZones: ['7:39', '12:20', '13:20', '30:45', '13:46'],
    recoveryHr: { end: 132, min1: 127, min2: 113 },
    effort: 6,
    tempF: 62,
    humidityPct: 94,
    splits: [
      { time: '11:11', hr: 131 },
      { time: '9:36', hr: 149 },
      { time: '8:55', hr: 167 },
      { time: '9:07', hr: 168 },
      { time: '8:52', hr: 170 },
      { time: '10:57' },
      { time: '11:21' },
      { time: '10:03' }, // last 0.78 mi in 7:54, stored as its per-mile pace
    ],
    notes: 'Awards: 10K Run, Fastest 5K (27:45), Fastest 10K (1:03:27), Longest Running Workout (7.79 mi), Running Workout Record (836 cal)',
  },
]

/** Weight log. One entry per weigh-in (run days or rest days). Weight in pounds. */
export type Weight = { date: string; lb: number }

export const weights: Weight[] = [
  { date: '2026-09-29', lb: 150.7 },
  { date: '2026-09-30', lb: 149.8 },
]

/** Push-up log. One entry per day, total push-ups done that day. */
export type Pushups = { date: string; count: number }

export const pushups: Pushups[] = [
  { date: '2026-09-29', count: 21 },
  { date: '2026-09-30', count: 22 },
]

/**
 * Rest days with nothing else logged. Every day through today is listed anyway,
 * so this is only a record of days that were deliberately skipped.
 */
export const restDays: string[] = []

// ---------- helpers shared by /run and the homepage ----------

export const toSec = (t: string) => t.split(':').map(Number).reduce((a, b) => a * 60 + b, 0)

export const fmtDuration = (s: number) => {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = Math.round(s % 60)
  return h > 0
    ? `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
    : `${m}:${String(sec).padStart(2, '0')}`
}

export const fmtPace = (secPerMi: number) => {
  const m = Math.floor(secPerMi / 60)
  const s = Math.round(secPerMi % 60)
  return `${m}'${String(s).padStart(2, '0')}"`
}

export const fmtDate = (iso: string, opts: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('en-US', opts)

const DAY_MS = 86400000
const utc = (iso: string) => Date.parse(iso + 'T00:00:00Z')

/** ISO date `n` days after `iso`. */
export const addDays = (iso: string, n: number) => new Date(utc(iso) + n * DAY_MS).toISOString().slice(0, 10)

/** Challenge day number for a date: Day 0 = CHALLENGE_START. */
export const dayNumber = (date: string) => Math.round((utc(date) - utc(CHALLENGE_START)) / DAY_MS)

export type DayRun = Run & { day: number }

/** Runs sorted oldest → newest, each tagged with its challenge day number. */
export const runsByDay = (): DayRun[] =>
  [...runs].sort((a, b) => a.date.localeCompare(b.date)).map((r) => ({ ...r, day: dayNumber(r.date) }))

/** Weigh-ins sorted oldest → newest. */
export const weightsByDate = (): Weight[] => [...weights].sort((a, b) => a.date.localeCompare(b.date))

/** Push-up entries sorted oldest → newest. */
export const pushupsByDate = (): Pushups[] => [...pushups].sort((a, b) => a.date.localeCompare(b.date))

/** Weight logged on a given day, if any. */
export const weightOn = (date: string): number | undefined => weights.find((w) => w.date === date)?.lb

/** Push-ups logged on a given day, if any. */
export const pushupsOn = (date: string): number | undefined => pushups.find((p) => p.date === date)?.count

/** Latest date with anything logged (run, weigh-in, push-ups or rest day), or CHALLENGE_START. */
export const latestLoggedDate = () =>
  [CHALLENGE_START, ...runs.map((r) => r.date), ...weights.map((w) => w.date), ...pushups.map((p) => p.date), ...restDays].sort().pop()!

/** Today as an ISO date (at build time; the browser adds any days that pass before the next build). */
export const todayIso = () => new Date().toISOString().slice(0, 10)

export type ChallengeDay = { day: number; date: string; run?: DayRun; weight?: number; pushups?: number }

/**
 * Every calendar day from CHALLENGE_START through today (or the latest logged
 * date, whichever is later), oldest → newest, with whatever was logged that day.
 * Days with nothing logged are still included, so the list grows by one every day.
 */
export const challengeDays = (): ChallengeDay[] => {
  const byDate = new Map(runsByDay().map((r) => [r.date, r]))
  const lastDate = [latestLoggedDate(), todayIso()].sort().pop()!
  const last = Math.max(0, dayNumber(lastDate))
  return Array.from({ length: last + 1 }, (_, i) => {
    const date = addDays(CHALLENGE_START, i)
    return { day: i, date, run: byDate.get(date), weight: weightOn(date), pushups: pushupsOn(date) }
  })
}

/** ISO date `n` calendar months after `iso`, clamped to the month's last day (Jan 31 + 1 month = Feb 28). */
export const addMonths = (iso: string, n: number) => {
  const [y, m, d] = iso.split('-').map(Number)
  const lastOfMonth = new Date(Date.UTC(y, m - 1 + n + 1, 0)).getUTCDate()
  return new Date(Date.UTC(y, m - 1 + n, Math.min(d, lastOfMonth))).toISOString().slice(0, 10)
}

/** First big goal: reaching Day 90 marks "Challenge 90 achieved" on /run. */
export const GOAL_DAY = 90

/** Day counts worth celebrating; past the last one, every 500 days. */
const MILESTONES = [7, 30, 50, GOAL_DAY, 100, 150, 200, 250, 300, 365, 500, 750, 1000]

const daysBetween = (a: string, b: string) => Math.round((utc(b) - utc(a)) / DAY_MS)
const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

export type Progress = {
  /** Current day number (Day 0 = CHALLENGE_START) */
  day: number
  /** Next day milestone and how far along the way there (0–1) */
  milestone: number
  milestonePct: number
  /** Whole months / years completed, and progress (0–1) through the current one */
  months: number
  monthPct: number
  daysToNextMonth: number
  years: number
  yearPct: number
  daysToNextYear: number
}

/** Where the challenge stands on a given date: days, months and years completed. */
export const progressOn = (today: string): Progress => {
  const day = Math.max(0, dayNumber(today))
  const prevMilestone = [...MILESTONES].reverse().find((m) => m <= day) ?? (day >= 1000 ? Math.floor(day / 500) * 500 : 0)
  const milestone = MILESTONES.find((m) => m > day) ?? (Math.floor(day / 500) + 1) * 500
  let months = 0
  while (addMonths(CHALLENGE_START, months + 1) <= today) months++
  const years = Math.floor(months / 12)
  const monthFrom = addMonths(CHALLENGE_START, months)
  const monthTo = addMonths(CHALLENGE_START, months + 1)
  const yearFrom = addMonths(CHALLENGE_START, years * 12)
  const yearTo = addMonths(CHALLENGE_START, (years + 1) * 12)
  const from = today < CHALLENGE_START ? CHALLENGE_START : today
  return {
    day,
    milestone,
    milestonePct: clamp01((day - prevMilestone) / (milestone - prevMilestone)),
    months,
    monthPct: clamp01(daysBetween(monthFrom, from) / daysBetween(monthFrom, monthTo)),
    daysToNextMonth: daysBetween(from, monthTo),
    years,
    yearPct: clamp01(daysBetween(yearFrom, from) / daysBetween(yearFrom, yearTo)),
    daysToNextYear: daysBetween(from, yearTo),
  }
}

export type ChallengeMonth = { month: number; from: string; dates: string[] }

/** The 12 challenge months of challenge year `year` (0-based), each with its calendar dates. */
export const challengeYear = (year: number): ChallengeMonth[] =>
  Array.from({ length: 12 }, (_, i) => {
    const month = year * 12 + i
    const from = addMonths(CHALLENGE_START, month)
    const len = daysBetween(from, addMonths(CHALLENGE_START, month + 1))
    return { month: month + 1, from, dates: Array.from({ length: len }, (_, d) => addDays(from, d)) }
  })

/** Apple Fitness effort scale: 1–3 easy, 4–6 moderate, 7–8 hard, 9–10 all out. */
export const effortLabel = (n: number) => (n <= 3 ? 'Easy' : n <= 6 ? 'Moderate' : n <= 8 ? 'Hard' : 'All out')

/** Aggregate totals across all runs. */
export const runTotals = () => {
  const all = runsByDay()
  const measured = all.filter((r) => r.distanceMi != null) // runs with a logged distance
  const totalMi = measured.reduce((a, r) => a + r.distanceMi!, 0)
  const totalSec = all.reduce((a, r) => a + toSec(r.workoutTime), 0)
  const measuredSec = measured.reduce((a, r) => a + toSec(r.workoutTime), 0)
  const totalElev = all.reduce((a, r) => a + (r.elevationFt ?? 0), 0)
  const totalCal = all.reduce((a, r) => a + (r.totalCal ?? 0), 0)
  const hrRuns = all.filter((r) => r.avgHrBpm)
  const avgHr = hrRuns.length ? Math.round(hrRuns.reduce((a, r) => a + r.avgHrBpm!, 0) / hrRuns.length) : null
  const avgPaceSec = totalMi > 0 ? measuredSec / totalMi : 0
  const longest = measured.length ? Math.max(...measured.map((r) => r.distanceMi!)) : 0
  const paced = all.filter((r) => r.avgPace)
  const fastest = paced.length ? paced.reduce((b, r) => (toSec(r.avgPace!) < toSec(b.avgPace!) ? r : b), paced[0]) : null
  return { count: all.length, measured: measured.length, totalMi, totalSec, totalElev, totalCal, avgHr, avgPaceSec, longest, fastest, latest: all[all.length - 1] ?? null, first: all[0] ?? null }
}
