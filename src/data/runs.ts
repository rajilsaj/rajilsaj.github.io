/**
 * Day by Day Challenge log, shown at /run. No finish line: it counts up for good.
 * Five logs, each keyed by ISO date: runs, weigh-ins, push-ups, sleep, rest days.
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
  /** Workout time, 'h:mm:ss' or 'mm:ss' (omit when the summary screen wasn't captured) */
  workoutTime?: string
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
  /** Zone bpm ranges shown next to the zones that day, when they differ from HR_ZONES */
  hrZoneRanges?: [string, string, string, string, string]
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
  {
    date: '2026-10-01',
    time: '8:10 PM – 8:45 PM',
    location: 'Fayetteville',
    workoutTime: '34:38',
    elapsedTime: '34:39',
    distanceMi: 2.66,
    activeCal: 301,
    totalCal: 353,
    elevationFt: 142,
    avgPowerW: 162,
    avgCadenceSpm: 152,
    avgPace: '13:01',
    avgHrBpm: 149,
    hrZones: ['1:24', '3:23', '12:22', '11:59', '0:00'],
    recoveryHr: { end: 134, min1: 122, min2: 108 },
    effort: 5,
    tempF: 76,
    humidityPct: 68,
    splits: [{ time: '12:07', hr: 150 }], // only mile 1 visible in the screenshots
    notes: 'Recovery run. Award: 7-Workout Week',
  },
  {
    date: '2026-10-03',
    time: '5:36 AM – 7:28 AM',
    location: 'Fayetteville',
    workoutTime: '1:30:40',
    elapsedTime: '1:51:51',
    distanceMi: 8.48,
    activeCal: 782,
    totalCal: 917,
    elevationFt: 304,
    avgCadenceSpm: 153,
    avgPace: '10:42',
    avgHrBpm: 157,
    tempF: 71,
    humidityPct: 94,
    splits: [
      { time: '10:18', hr: 157 },
      { time: '9:58', hr: 162 },
      { time: '10:12', hr: 162 },
      { time: '10:23', hr: 157 },
      { time: '10:02', hr: 156 },
    ], // only miles 1–5 visible in the screenshots
    notes: 'Award: 10K Run. Air quality 51',
  },
  {
    date: '2026-10-08',
    time: '6:14 AM – 6:59 AM',
    location: 'Fayetteville',
    workoutTime: '45:35',
    elapsedTime: '45:48',
    distanceMi: 4.07,
    activeCal: 387,
    totalCal: 455,
    elevationFt: 175,
    avgPowerW: 168,
    avgCadenceSpm: 166,
    avgPace: '11:11',
    avgHrBpm: 148,
    hrZones: ['2:37', '8:23', '31:26', '3:08', '0:00'],
    recoveryHr: { end: 140, min1: 110, min2: 113 },
    tempF: 53,
    humidityPct: 89,
    splits: [
      { time: '10:41', hr: 146 },
      { time: '10:54', hr: 152 },
      { time: '11:50', hr: 146 },
      { time: '11:12', hr: 148 },
      { time: '11:36', hr: 150 }, // last 0.07 mi in 0:54, stored as its per-mile pace
    ],
    notes: 'Air quality 58',
  },
  {
    date: '2026-10-09',
    time: '5:30 AM – 6:44 AM',
    location: 'Fayetteville',
    workoutTime: '1:04:51',
    elapsedTime: '1:13:50',
    distanceMi: 6.49,
    activeCal: 633,
    totalCal: 729,
    elevationFt: 220,
    avgPowerW: 189,
    avgCadenceSpm: 171,
    avgPace: '9:59',
    avgHrBpm: 160,
    hrZones: ['1:59', '7:48', '13:48', '25:01', '16:09'],
    hrZoneRanges: ['<132', '133–144', '145–157', '158–169', '170+'],
    recoveryHr: { end: 154, min1: 137, min2: 122 },
    effort: 7,
    tempF: 63,
    humidityPct: 79,
    splits: [
      { time: '10:05', hr: 147 },
      { time: '8:54', hr: 172 },
      { time: '9:07', hr: 170 },
      { time: '9:09', hr: 170 },
      { time: '12:00', hr: 156 },
    ], // only miles 1–5 visible in the screenshots
    notes: 'Air quality 67',
  },
  {
    date: '2026-10-10',
    time: '5:35 AM – 7:43 AM',
    location: 'Fayetteville',
    workoutTime: '1:47:37',
    elapsedTime: '2:07:10',
    distanceMi: 10.08,
    activeCal: 1002,
    totalCal: 1160,
    elevationFt: 452,
    avgPowerW: 183,
    avgCadenceSpm: 168,
    avgPace: '10:40',
    avgHrBpm: 153,
    hrZones: ['3:05', '6:08', '1:07:21', '27:17', '0:11'],
    hrZoneRanges: ['<132', '133–144', '145–157', '158–169', '170+'],
    recoveryHr: { end: 137, min1: 116, min2: 111 },
    effort: 7,
    tempF: 63,
    humidityPct: 87,
    splits: [
      { time: '9:48', hr: 158 },
      { time: '9:43', hr: 159 },
      { time: '9:16', hr: 157 },
      { time: '10:03', hr: 154 },
      { time: '11:11', hr: 151 },
    ], // only miles 1–5 visible in the screenshots
    notes: 'Awards: 10K Run, Longest Running Workout (10.09 mi). Air quality 52',
  },  {
    date: '2026-10-12',
    time: '5:11 AM – 6:36 AM',
    location: 'Fayetteville',
    workoutTime: '1:07:55',
    elapsedTime: '1:25:18',
    distanceMi: 6.51,
    activeCal: 633,
    totalCal: 733,
    elevationFt: 237,
    avgPowerW: 181,
    avgCadenceSpm: 163,
    avgPace: '10:25',
    avgHrBpm: 149,
    hrZones: ['8:40', '10:27', '21:04', '16:59', '10:42'],
    hrZoneRanges: ['<131', '132–144', '145–156', '157–169', '170+'],
    recoveryHr: { end: 104, min1: 102, min2: 99 },
    effort: 6,
    tempF: 64,
    humidityPct: 90,
    splits: [
      { time: '11:22', hr: 131 },
      { time: '10:20', hr: 151 },
    ], // only miles 1–2 readable in the screenshots
    notes: 'Award: 10K Run. Air quality 42',
  },
  {
    date: '2026-10-13',
    time: '10:51 PM – 11:42 PM',
    location: 'Fayetteville',
    workoutTime: '51:52',
    distanceMi: 4.13,
    activeCal: 396,
    totalCal: 472,
    elevationFt: 180,
    avgPowerW: 154,
    avgCadenceSpm: 160,
    avgPace: '12:32',
    avgHrBpm: 142,
    hrZones: ['1:07', '36:55', '13:49', '0:00', '0:00'],
    hrZoneRanges: ['<131', '132–144', '145–156', '157–169', '170+'],
    recoveryHr: { end: 132, min1: 110, min2: 108 },
    effort: 4,
    tempF: 68,
    humidityPct: 84,
    splits: [
      { time: '12:56', hr: 139 },
      { time: '12:26', hr: 143 },
      { time: '12:15', hr: 141 },
      { time: '12:28', hr: 144 },
      { time: '12:53', hr: 139 }, // last 0.13 mi in 1:45, stored as its per-mile pace
    ],
    notes: 'Late-night run. Award: 5K Run. Air quality 50',
  },
  {
    date: '2026-10-14',
    time: '5:17 AM – 6:40 AM',
    location: 'Fayetteville',
    workoutTime: '1:09:47',
    elapsedTime: '1:22:42',
    distanceMi: 7.11,
    activeCal: 693,
    totalCal: 796,
    elevationFt: 245,
    avgPowerW: 191,
    avgCadenceSpm: 167,
    avgPace: '9:48',
    avgHrBpm: 162,
    hrZones: ['1:19', '4:10', '18:30', '20:56', '24:50'],
    hrZoneRanges: ['<131', '132–144', '145–156', '157–169', '170+'],
    recoveryHr: { end: 153, min1: 123, min2: 116 },
    effort: 7,
    tempF: 62,
    humidityPct: 91,
    splits: [
      { time: '11:40', hr: 147 },
      { time: '9:58', hr: 161 },
      { time: '8:23', hr: 175 },
      { time: '8:32', hr: 175 },
      { time: '8:51', hr: 175 },
    ], // only miles 1–5 visible in the screenshots
    notes: 'Awards: Fastest 5K, 10K Run. Air quality 68',
  },
  {
    date: '2026-10-16',
    time: '5:17 AM – 6:48 AM',
    location: 'Fayetteville',
    workoutTime: '1:13:47',
    elapsedTime: '1:30:34',
    distanceMi: 6.81,
    activeCal: 716,
    totalCal: 824,
    elevationFt: 286,
    avgPowerW: 172,
    avgCadenceSpm: 162,
    avgPace: '10:50',
    avgHrBpm: 145,
    hrZones: ['19:03', '10:00', '11:54', '25:06', '7:39'],
    hrZoneRanges: ['<131', '132–144', '145–156', '157–169', '170+'],
    recoveryHr: { end: 106, min1: 105, min2: 95 },
    effort: 6,
    tempF: 66,
    humidityPct: 97,
    splits: [
      { time: '13:09', hr: 127 },
      { time: '9:31', hr: 153 },
      { time: '9:02', hr: 163 },
      { time: '8:19', hr: 171 },
      { time: '9:10', hr: 168 },
    ], // only miles 1–5 visible in the screenshots
    notes: 'Air quality 74',
  },
  {
    date: '2026-10-17',
    time: '5:34 AM – 7:03 AM',
    location: 'Fayetteville',
    workoutTime: '1:16:59',
    elapsedTime: '1:28:48',
    distanceMi: 7.1,
    activeCal: 684,
    totalCal: 797,
    elevationFt: 359,
    avgPowerW: 174,
    avgCadenceSpm: 175,
    avgPace: '10:50',
    avgHrBpm: 156,
    hrZones: ['2:28', '5:57', '27:55', '8:50', '20:15'],
    hrZoneRanges: ['<131', '132–144', '145–156', '157–169', '170+'],
    recoveryHr: { end: 109, min1: 101, min2: 100 },
    effort: 6,
    tempF: 62,
    humidityPct: 74,
    splits: [
      { time: '10:22', hr: 137 },
      { time: '10:07', hr: 153 },
      { time: '10:00', hr: 148 },
      { time: '11:05', hr: 149 },
      { time: '10:50', hr: 151 },
    ], // only miles 1–5 visible in the screenshots
    notes: 'Intense run in the rain. Award: 7-Workout Week. Air quality 71',
  },
]

/**
 * Cross-training: a bike ride or a walk, on top of (or instead of) the day's run.
 * Copied from the Apple Fitness Outdoor Cycle / Outdoor Walk summary.
 */
export type Activity = {
  kind: 'bike' | 'walk'
  date: string
  /** Card heading in the day's details (a default per kind is used when omitted) */
  title?: string
  time?: string
  location?: string
  /** Where the route went, a few words */
  route?: string
  workoutTime: string
  elapsedTime?: string
  distanceMi: number
  activeCal?: number
  totalCal?: number
  elevationFt?: number
  /** Average speed in mph (rides) */
  avgMph?: number
  /** Average pace, 'mm:ss' per mile (walks) */
  avgPace?: string
  avgHrBpm?: number
  hrZones?: [string, string, string, string, string]
  hrZoneRanges?: [string, string, string, string, string]
  recoveryHr?: { end: number; min1: number; min2: number }
  effort?: number
  tempF?: number
  humidityPct?: number
  /**
   * Splits as recorded by the watch: every 5 mi on a ride (with distance and mph),
   * every mile on a walk (time per mile). Average heart rate for each.
   */
  splits?: { time: string; mi?: number; mph?: number; hr?: number }[]
  notes?: string
}

export const activities: Activity[] = [
  {
    kind: 'bike',
    date: '2026-10-12',
    time: '5:32 PM – 6:49 PM',
    location: 'Fayetteville',
    route: 'downtown, out along the Cape Fear River and back',
    workoutTime: '1:09:03',
    elapsedTime: '1:17:31',
    distanceMi: 10.15,
    activeCal: 289,
    totalCal: 388,
    elevationFt: 213,
    avgMph: 8.8,
    avgHrBpm: 127,
    hrZones: ['44:47', '17:17', '4:59', '2:00', '0:00'],
    hrZoneRanges: ['<131', '132–144', '145–156', '157–169', '170+'],
    recoveryHr: { end: 103, min1: 91, min2: 91 },
    tempF: 81,
    humidityPct: 56,
    splits: [
      { time: '35:52', mi: 5, mph: 8.3, hr: 124 },
      { time: '31:11', mi: 5, mph: 9.6, hr: 130 },
      { time: '1:58', mi: 0.15, mph: 4.6, hr: 113 },
    ],
    notes: 'Same day as the morning run. Air quality 22',
  },
  {
    kind: 'walk',
    date: '2026-10-15',
    title: 'Midnight walk',
    time: '10:32 PM – 1:03 AM',
    location: 'Fayetteville',
    route: 'out along Morganton Rd past the All American Fwy and back',
    workoutTime: '2:31:15',
    distanceMi: 8.04,
    activeCal: 578,
    totalCal: 801,
    elevationFt: 349,
    avgPace: '18:48',
    avgHrBpm: 96,
    hrZones: ['2:30:04', '1:10', '0:00', '0:00', '0:00'],
    hrZoneRanges: ['<131', '132–144', '145–156', '157–169', '170+'],
    recoveryHr: { end: 81, min1: 78, min2: 83 },
    effort: 4,
    tempF: 72,
    humidityPct: 84,
    splits: [
      { time: '18:12', hr: 101 },
      { time: '17:24', hr: 99 },
      { time: '16:40', hr: 102 },
      { time: '18:42', hr: 96 },
      { time: '18:50', hr: 94 },
    ], // only miles 1–5 visible in the screenshots
    notes: 'Award: Walking Workout Record (579 cal). Air quality 60',
  },
]

/** Weight log. One entry per weigh-in (run days or rest days). Weight in pounds. */
export type Weight = { date: string; lb: number }

export const weights: Weight[] = [
  { date: '2026-09-29', lb: 150.7 },
  { date: '2026-09-30', lb: 149.8 },
  { date: '2026-10-01', lb: 150.7 },
  { date: '2026-10-03', lb: 150.7 },
  { date: '2026-10-04', lb: 150.7 },
  { date: '2026-10-05', lb: 150.7 },
  { date: '2026-10-06', lb: 150.7 },
  { date: '2026-10-08', lb: 150.7 },
  { date: '2026-10-09', lb: 149.7 },
  { date: '2026-10-10', lb: 150 },
  { date: '2026-10-12', lb: 150 },
]

/** Push-up log. One entry per day, total push-ups done that day. */
export type Pushups = { date: string; count: number }

export const pushups: Pushups[] = [
  { date: '2026-09-29', count: 21 },
  { date: '2026-09-30', count: 22 },
  { date: '2026-10-08', count: 22 },
]

/** Sleep log. One entry per day: hours slept the night before. */
export type Sleep = { date: string; hours: number }

export const sleep: Sleep[] = []

/**
 * Rest days with nothing else logged. Every day through today is listed anyway,
 * so this is only a record of days that were deliberately skipped.
 */
export const restDays: string[] = ['2026-10-11', '2026-10-18', '2026-10-19']

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

/** Sleep entries sorted oldest → newest. */
export const sleepByDate = (): Sleep[] => [...sleep].sort((a, b) => a.date.localeCompare(b.date))

/** Weight logged on a given day, if any. */
export const weightOn = (date: string): number | undefined => weights.find((w) => w.date === date)?.lb

/** Push-ups logged on a given day, if any. */
export const pushupsOn = (date: string): number | undefined => pushups.find((p) => p.date === date)?.count

/** Hours of sleep logged on a given day, if any. */
export const sleepOn = (date: string): number | undefined => sleep.find((s) => s.date === date)?.hours

/** Latest date with anything logged (run, weigh-in, push-ups, sleep or rest day), or CHALLENGE_START. */
export const latestLoggedDate = () =>
  [CHALLENGE_START, ...runs.map((r) => r.date), ...weights.map((w) => w.date), ...pushups.map((p) => p.date), ...sleep.map((s) => s.date), ...restDays].sort().pop()!

/** Today as an ISO date (at build time; the browser adds any days that pass before the next build). */
export const todayIso = () => new Date().toISOString().slice(0, 10)

/** Cross-training (ride or walk) logged on a given day, if any. */
export const activityOn = (date: string): Activity | undefined => activities.find((a) => a.date === date)

/** Cross-training totals: miles and count overall and per kind. */
export const activityTotals = () => {
  const sum = (kind?: Activity['kind']) => {
    const list = activities.filter((a) => !kind || a.kind === kind)
    return { count: list.length, totalMi: list.reduce((n, a) => n + a.distanceMi, 0), totalSec: list.reduce((n, a) => n + toSec(a.workoutTime), 0) }
  }
  return { ...sum(), bike: sum('bike'), walk: sum('walk') }
}

export type ChallengeDay = { day: number; date: string; run?: DayRun; activity?: Activity; weight?: number; pushups?: number; sleep?: number; rest?: boolean }

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
    return { day: i, date, run: byDate.get(date), activity: activityOn(date), weight: weightOn(date), pushups: pushupsOn(date), sleep: sleepOn(date), rest: restDays.includes(date) }
  })
}

/** ISO date `n` calendar months after `iso`, clamped to the month's last day (Jan 31 + 1 month = Feb 28). */
export const addMonths = (iso: string, n: number) => {
  const [y, m, d] = iso.split('-').map(Number)
  const lastOfMonth = new Date(Date.UTC(y, m - 1 + n + 1, 0)).getUTCDate()
  return new Date(Date.UTC(y, m - 1 + n, Math.min(d, lastOfMonth))).toISOString().slice(0, 10)
}

/** Birthday as 'MM-DD': celebrated on /run every year. */
export const BIRTHDAY = '10-08'

/** True when an ISO date falls on the birthday. */
export const isBirthday = (iso: string) => iso.slice(5) === BIRTHDAY

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
  const measured = all.filter((r) => r.distanceMi != null && r.workoutTime) // runs with a logged distance and time
  const totalMi = measured.reduce((a, r) => a + r.distanceMi!, 0)
  const totalSec = all.reduce((a, r) => a + (r.workoutTime ? toSec(r.workoutTime) : 0), 0)
  const measuredSec = measured.reduce((a, r) => a + toSec(r.workoutTime!), 0)
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
