/**
 * Backend for rajil.me/kprep: a Google Apps Script web app bound to a Google Sheet.
 * Not deployed by the site. Paste this into Extensions → Apps Script of the Sheet
 * (see README.md next to it).
 *
 * Tabs (created if missing):
 *   days  A = date key YYYY-MM-DD, B = JSON array of checked task texts
 *   meta  A = "state",             B = JSON { testDate, target, vocabGoal, scores }
 *
 * GET  → { days: { "2026-11-02": [...] }, meta: {...} | null }   (public)
 * POST → body is a JSON string with { token, type, ... }:
 *   { type: "day", date, done }   upsert one day
 *   { type: "meta", meta }        upsert the state row
 *   { type: "ping" }              check the token, write nothing
 * Returns { ok: true } or { error }.
 */

var DAYS = 'days'
var META = 'meta'
var DATE_RE = /^\d{4}-\d{2}-\d{2}$/

function doGet() {
  try {
    var days = {}
    readRows_(sheet_(DAYS)).forEach(function (row) {
      if (!DATE_RE.test(row[0])) return
      var done = parse_(row[1])
      if (Array.isArray(done)) days[row[0]] = done
    })
    var meta = null
    readRows_(sheet_(META)).forEach(function (row) {
      if (row[0] === 'state') meta = parse_(row[1])
    })
    return json_({ days: days, meta: meta })
  } catch (err) {
    return json_({ error: String(err) })
  }
}

function doPost(e) {
  var body
  try {
    body = JSON.parse(e.postData.contents)
  } catch (err) {
    return json_({ error: 'bad json' })
  }
  var token = PropertiesService.getScriptProperties().getProperty('TOKEN')
  if (!token || !body || body.token !== token) return json_({ error: 'unauthorized' })
  if (body.type === 'ping') return json_({ ok: true })

  var lock = LockService.getScriptLock()
  if (!lock.tryLock(15000)) return json_({ error: 'busy' })
  try {
    if (body.type === 'day') {
      if (!DATE_RE.test(body.date)) return json_({ error: 'bad date' })
      var done = Array.isArray(body.done) ? body.done.filter(function (x) { return typeof x === 'string' }) : []
      upsert_(sheet_(DAYS), body.date, JSON.stringify(done))
    } else if (body.type === 'meta') {
      if (!body.meta || typeof body.meta !== 'object') return json_({ error: 'bad meta' })
      upsert_(sheet_(META), 'state', JSON.stringify(body.meta))
    } else {
      return json_({ error: 'unknown type' })
    }
    SpreadsheetApp.flush()
    return json_({ ok: true })
  } catch (err) {
    return json_({ error: String(err) })
  } finally {
    lock.releaseLock()
  }
}

// ---------- helpers ----------

function sheet_(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  return ss.getSheetByName(name) || ss.insertSheet(name)
}

// Display values, so date keys stay exactly as written.
function readRows_(sh) {
  var n = sh.getLastRow()
  return n ? sh.getRange(1, 1, n, 2).getDisplayValues() : []
}

// Find the row whose column A equals key, or append one. Cells are forced to plain
// text first so Sheets never turns "2026-11-02" into a date.
function upsert_(sh, key, value) {
  var rows = readRows_(sh)
  var row = rows.length + 1
  for (var i = 0; i < rows.length; i++) {
    if (rows[i][0] === key) {
      row = i + 1
      break
    }
  }
  var range = sh.getRange(row, 1, 1, 2)
  range.setNumberFormat('@')
  range.setValues([[key, value]])
}

function parse_(s) {
  try {
    return JSON.parse(s)
  } catch (err) {
    return null
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}
