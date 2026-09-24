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
