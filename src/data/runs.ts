/**
 * Day-by-day running log, shown at /run.
 * Add one entry per run (any order — the page sorts by date, newest first).
 * Values are copied from the Apple Fitness workout summary.
 */
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
  /** Distance in miles */
  distanceMi: number
  activeCal?: number
  totalCal?: number
  /** Elevation gain in feet */
  elevationFt?: number
  /** Average power in watts */
  avgPowerW?: number
  /** Average cadence in steps per minute */
  avgCadenceSpm?: number
  /** Average pace, 'mm:ss' per mile */
  avgPace: string
  /** Average heart rate in bpm */
  avgHrBpm?: number
  notes?: string
}

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
]

/**
 * Weight log, shown at /run. One entry per weigh-in (run days or rest days).
 * Weight in pounds.
 */
export type Weight = { date: string; lb: number }

export const weights: Weight[] = [
  // { date: '2026-09-23', lb: 170 },
]

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

export type DayRun = Run & { day: number }

/** Runs sorted oldest → newest, numbered Day 1, Day 2, … */
export const runsByDay = (): DayRun[] =>
  [...runs].sort((a, b) => a.date.localeCompare(b.date)).map((r, i) => ({ ...r, day: i + 1 }))

/** Weigh-ins sorted oldest → newest. */
export const weightsByDate = (): Weight[] => [...weights].sort((a, b) => a.date.localeCompare(b.date))

/** Weight logged on a given day, if any. */
export const weightOn = (date: string): number | undefined => weights.find((w) => w.date === date)?.lb

/** Aggregate totals across all runs. */
export const runTotals = () => {
  const all = runsByDay()
  const totalMi = all.reduce((a, r) => a + r.distanceMi, 0)
  const totalSec = all.reduce((a, r) => a + toSec(r.workoutTime), 0)
  const totalElev = all.reduce((a, r) => a + (r.elevationFt ?? 0), 0)
  const totalCal = all.reduce((a, r) => a + (r.totalCal ?? 0), 0)
  const hrRuns = all.filter((r) => r.avgHrBpm)
  const avgHr = hrRuns.length ? Math.round(hrRuns.reduce((a, r) => a + r.avgHrBpm!, 0) / hrRuns.length) : null
  const avgPaceSec = totalMi > 0 ? totalSec / totalMi : 0
  const longest = all.length ? Math.max(...all.map((r) => r.distanceMi)) : 0
  const fastest = all.length ? all.reduce((b, r) => (toSec(r.avgPace) < toSec(b.avgPace) ? r : b), all[0]) : null
  return { count: all.length, totalMi, totalSec, totalElev, totalCal, avgHr, avgPaceSec, longest, fastest, latest: all[all.length - 1] ?? null, first: all[0] ?? null }
}
