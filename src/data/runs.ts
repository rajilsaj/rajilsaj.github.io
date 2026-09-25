/**
 * 100 Days Challenge log, shown at /run.
 * Three logs, each keyed by ISO date: runs, weigh-ins, push-ups.
 * Add entries in any order — the page sorts by date.
 */

/** Day 1 of the challenge. */
export const CHALLENGE_START = '2026-09-23'
export const CHALLENGE_DAYS = 100

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
  notes?: string
}

/** Zone boundaries shown in Apple Fitness (bpm). */
export const HR_ZONES = ['<132', '133–145', '146–157', '158–170', '171+']

/** One entry per run. Values are copied from the Apple Fitness workout summary. */
export const runs: Run[] = [
  {
    date: '2026-09-23',
    time: '5:32 AM – 6:42 AM',
    location: 'Fayetteville',
    workoutTime: '1:03:26',
    elapsedTime: '1:09:33',
    distanceMi: 6.3,
    activeCal: 714,
    totalCal: 809,
    elevationFt: 415,
    avgPowerW: 194,
    avgCadenceSpm: 164,
    avgPace: '10:04',
    avgHrBpm: 166,
  },
  {
    // Day 3 — heart rate screen logged first; distance/pace to be added from the workout summary
    date: '2026-09-25',
    time: '5:35 AM – 6:42 AM',
    location: 'Fayetteville',
    workoutTime: '57:45', // sum of the five zone times
    avgHrBpm: 163,
    hrZones: ['0:25', '1:49', '8:38', '34:25', '12:28'],
    recoveryHr: { end: 152, min1: 123, min2: 119 },
  },
]

/** Weight log. One entry per weigh-in (run days or rest days). Weight in pounds. */
export type Weight = { date: string; lb: number }

export const weights: Weight[] = [
  { date: '2026-09-24', lb: 150.7 },
  { date: '2026-09-25', lb: 152.1 },
]

/** Push-up log. One entry per day, total push-ups done that day. */
export type Pushups = { date: string; count: number }

export const pushups: Pushups[] = []

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

/** Challenge day number for a date: Day 1 = CHALLENGE_START. */
export const dayNumber = (date: string) => Math.round((utc(date) - utc(CHALLENGE_START)) / DAY_MS) + 1

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

/** Latest date with anything logged (run, weigh-in or push-ups), or CHALLENGE_START. */
export const latestLoggedDate = () =>
  [CHALLENGE_START, ...runs.map((r) => r.date), ...weights.map((w) => w.date), ...pushups.map((p) => p.date)].sort().pop()!

export type ChallengeDay = { day: number; date: string; run?: DayRun; weight?: number; pushups?: number }

/**
 * Every calendar day from CHALLENGE_START through the latest logged date,
 * oldest → newest, with whatever was logged that day. Rest days have no `run`.
 */
export const challengeDays = (): ChallengeDay[] => {
  const byDate = new Map(runsByDay().map((r) => [r.date, r]))
  const last = Math.min(CHALLENGE_DAYS, dayNumber(latestLoggedDate()))
  return Array.from({ length: last }, (_, i) => {
    const date = addDays(CHALLENGE_START, i)
    return { day: i + 1, date, run: byDate.get(date), weight: weightOn(date), pushups: pushupsOn(date) }
  })
}

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
