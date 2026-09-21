/**
 * Filtre & Sélection — v2 : connexion Google, évaluateurs autorisés, deux onglets de décision
 * -------------------------------------------------------------------------------------------
 * - Login: the web app runs as the visiting Google account, so Google's own sign-in is the login.
 *   Only the e-mails listed by an admin (Réglages > Personnes autorisées) get in.
 * - Decisions are written to the destination spreadsheet in two tabs:
 *     « Sélectionnés »      : chosen columns + Ligne source, Avis, Évalué par, Date de décision
 *     « Non sélectionnés »  : same + Motif de non-sélection
 *   One decision per candidate: deciding again moves the row from one tab to the other.
 *   Only the person who took a decision can change or remove it (see ADMINS_CAN_OVERRIDE).
 * - « Commentaires » tab: any authorised person can comment any candidate; comments are never overwritten.
 * - Excel: the app offers a one-click .xlsx download of the decisions spreadsheet (all three tabs).
 *
 * Deploy > New deployment > Web app
 *     Execute as      : User accessing the web app      (REQUIRED to know who is signed in)
 *     Who has access  : Anyone with a Google account
 */

/* Accounts that are always administrators (cannot be locked out). CHANGE IF NEEDED. */
const ADMIN_EMAILS = ['svembe@gmail.com'];

/* People allowed in from the start (evaluators). Admins can add / remove people later in Réglages; this list
 * is only the starting point. Both files are shared with them automatically:
 *   - the original list of candidates  -> read access
 *   - the decisions workbook (results) -> edit access (the app writes in it under their own account) */
const DEFAULT_REVIEWERS = ['perseval@gmail.com', 'guytiburce2007@gmail.com', 'fabimay@gmail.com'];

/* true  = an administrator may also change / remove a decision taken by someone else (avoids dead ends
 *         when a reviewer is unavailable).   false = strictly the author only. */
const ADMINS_CAN_OVERRIDE = true;

/* The list of candidates. It is copied ONCE into the « Candidats » tab of the decisions spreadsheet the first
 * time an administrator opens the app; afterwards everybody works from that copy (admins can re-import). */
const DEFAULT_SOURCE_URL = 'https://docs.google.com/spreadsheets/d/1bDNHIaswXofSMkQfF4ZwBAbVJ-KCLMC-x1RkpNznZeg/edit?usp=sharing';

/* How many people the programme wants to select (shown as the objective in the results meter and the dashboard). */
const DEFAULT_TARGET = 500;

const APP_TITLE = 'Filtre & Sélection';
const TAB_SELECTED = 'Sélectionnés';
const TAB_REJECTED = 'Non sélectionnés';
const TAB_COMMENTS = 'Commentaires';
const TAB_LIST = 'Candidats';
const COMMENT_HEADERS = ['Clé', 'Ligne source', 'Candidat', 'Commentaire', 'Auteur', 'Date'];
const COL_ROW = 'Ligne source';
const COL_REASON = 'Motif de non-sélection';
const COL_AVIS = 'Avis';
const COL_BY = 'Évalué par';
const COL_DATE = 'Date de décision';
const DEFAULT_REASONS = [
  'Hors tranche d'âge (18–40 ans)',
  'Dossier incomplet',
  'CV manquant ou illisible',
  'Hors zone de formation',
  'Doublon de candidature',
  'Profil non prioritaire pour cette session'
];

/* ---------- Entry point ---------- */

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle(APP_TITLE)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/* ---------- Who is connected ---------- */

function currentUser_() {
  const email = String(Session.getActiveUser().getEmail() || '').toLowerCase().trim();
  let role = null;
  if (email) {
    if (ADMIN_EMAILS.map(function (e) { return e.toLowerCase(); }).indexOf(email) !== -1) role = 'admin';
    else {
      const u = getUsers_().filter(function (x) { return x.email === email; })[0];
      if (u) role = u.role === 'admin' ? 'admin' : 'reviewer';
    }
  }
  return { email: email, role: role };
}

function requireUser_(adminOnly) {
  const u = currentUser_();
  if (!u.email) throw new Error('Compte Google non identifié. Vérifiez le mode de déploiement de l'application.');
  if (!u.role) throw new Error('Le compte ' + u.email + ' n'est pas autorisé à utiliser cet outil.');
  if (adminOnly && u.role !== 'admin') throw new Error('Action réservée aux administrateurs.');
  return u;
}

/** First call made by the page. Never throws for an unknown user: the page shows the "no access" screen. */
function bootstrap() {
  const u = currentUser_();
  const out = { email: u.email, role: u.role, appUrl: ScriptApp.getService().getUrl(),
                adminOverride: ADMINS_CAN_OVERRIDE && u.role === 'admin' };
  if (u.role) out.config = getConfig_();
  if (u.role === 'admin') out.users = getUsers_();
  if (u.role) out.views = getViews_();
  return out;
}

/* ---------- Saved views (per person: the app runs as the visitor, so User Properties are theirs) ---------- */

function getViews_() {
  try { return JSON.parse(PropertiesService.getUserProperties().getProperty('VIEWS') || '[]'); }
  catch (e) { return []; }
}

/** Replaces the caller's list of saved views (name + filters + sort). */
function saveViews(views) {
  requireUser_(false);
  const clean = (views || []).slice(0, 20).map(function (v) {
    return { name: String(v.name || '').trim().substring(0, 40) || 'Vue', status: v.status || 'all', q: String(v.q || ''),
             join: v.join === 'or' ? 'or' : 'and', items: v.items || [], sort: v.sort || null };
  });
  const json = JSON.stringify(clean);
  if (json.length > 8500) throw new Error('Trop de vues enregistrées : supprimez-en une avant d'en ajouter.');
  PropertiesService.getUserProperties().setProperty('VIEWS', json);
  return clean;
}

/* ---------- Settings (Script Properties, shared by everyone) ---------- */

function getConfig_() {
  let c = {};
  try { c = JSON.parse(PropertiesService.getScriptProperties().getProperty('CONFIG') || '{}'); } catch (e) {}
  return {
    sourceUrl: c.sourceUrl || DEFAULT_SOURCE_URL,
    sourceSheet: c.sourceSheet || '',
    headerRow: c.headerRow || 1,
    destUrl: c.destUrl || '',
    keyHeader: c.keyHeader || '',
    exportHeaders: c.exportHeaders || [],
    target: c.target || DEFAULT_TARGET,
    reasons: (c.reasons && c.reasons.length) ? c.reasons : DEFAULT_REASONS
  };
}

function getUsers_() {
  const raw = PropertiesService.getScriptProperties().getProperty('USERS');
  if (raw === null || raw === undefined) {
    return DEFAULT_REVIEWERS.map(function (e) { return { email: e.toLowerCase().trim(), role: 'reviewer' }; });
  }
  try { return JSON.parse(raw); } catch (e) { return []; }
}

/**
 * Shares the two files with the authorised people (results = editor, original list = viewer).
 * Runs under the admin's account. Returns human-readable warnings instead of failing.
 */
function shareWith_(cfg, dest, emails) {
  const warnings = [];
  let source = null, sourceTried = false;
  emails.forEach(function (email) {
    try { dest.addEditor(email); }
    catch (e) { warnings.push('Partage du classeur des décisions impossible pour ' + email + ' : ajoutez-le à la main.'); }
    if (!sourceTried) {
      sourceTried = true;
      try { const ref = parseSheetUrl_(cfg.sourceUrl); if (!ref.published) source = SpreadsheetApp.openById(ref.id); } catch (e) {}
    }
    if (source) {
      try { source.addViewer(email); }
      catch (e) { if (warnings.join(' ').indexOf('liste d'origine') === -1) warnings.push('Partage de la liste d'origine impossible (vous devez en être propriétaire ou éditeur) : partagez-la à la main.'); }
    }
  });
  PropertiesService.getScriptProperties().setProperty('SHARED', shareSignature_(cfg, emails));
  return warnings;
}
function shareSignature_(cfg, emails) { return emails.slice().sort().join(',') + '|' + cfg.destUrl + '|' + cfg.sourceUrl; }

/** Admin runs only: shares again when the people or the files changed since the last time. */
function ensureSharing_(cfg, dest) {
  const emails = getUsers_().map(function (u) { return u.email; });
  if (PropertiesService.getScriptProperties().getProperty('SHARED') === shareSignature_(cfg, emails)) return [];
  return shareWith_(cfg, dest, emails);
}

/**
 * Admin only. Saves the settings and the list of authorised people, creates the destination
 * spreadsheet if none is given, and shares it (edit) with every authorised person.
 */
function saveSettings(payload) {
  requireUser_(true);
  payload = payload || {};
  const warnings = [];

  parseSheetUrl_(payload.sourceUrl || DEFAULT_SOURCE_URL);      // throws if not a Sheets link
  const cfg = {
    sourceUrl: String(payload.sourceUrl || DEFAULT_SOURCE_URL).trim(),
    sourceSheet: String(payload.sourceSheet || '').trim(),
    headerRow: Math.max(1, parseInt(payload.headerRow, 10) || 1),
    destUrl: String(payload.destUrl || '').trim(),
    keyHeader: String(payload.keyHeader || ''),
    exportHeaders: (payload.exportHeaders || []).map(String),
    target: Math.max(1, parseInt(payload.target, 10) || DEFAULT_TARGET),
    reasons: (payload.reasons || []).map(function (r) { return String(r).trim(); }).filter(Boolean)
  };

  // People
  const seen = {};
  const users = (payload.users || []).map(function (u) {
    return { email: String(u.email || '').toLowerCase().trim(), role: u.role === 'admin' ? 'admin' : 'reviewer' };
  }).filter(function (u) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u.email) || seen[u.email]) return false;
    seen[u.email] = true;
    return true;
  });

  // Destination (created when empty)
  const before = getConfig_();
  const dest = ensureDest_(cfg);

  // Sharing: the app runs as each visitor, so each visitor must be able to edit the destination.
  const previous = getUsers_().map(function (u) { return u.email; });
  shareWith_(cfg, dest, users.map(function (u) { return u.email; })).forEach(function (w) { warnings.push(w); });
  previous.forEach(function (email) {
    if (seen[email]) return;
    try { dest.removeEditor(email); } catch (e) {}
    try { const r = parseSheetUrl_(cfg.sourceUrl); if (!r.published) SpreadsheetApp.openById(r.id).removeViewer(email); } catch (e) {}
  });

  const props = PropertiesService.getScriptProperties();
  props.setProperty('CONFIG', JSON.stringify(cfg));
  props.setProperty('USERS', JSON.stringify(users));

  // Copy the list again only if it is missing or if the source settings changed.
  const listTab = dest.getSheetByName(TAB_LIST);
  const changed = before.sourceUrl !== cfg.sourceUrl || before.sourceSheet !== cfg.sourceSheet ||
                  String(before.headerRow) !== String(cfg.headerRow) || before.destUrl !== cfg.destUrl;
  if (changed || !listTab || listTab.getLastRow() < 2) importList_(cfg, dest);
  return { config: getConfig_(), users: users, warnings: warnings };
}

/* ---------- The list: imported once, then read from the « Candidats » tab ---------- */

/** Opens the decisions spreadsheet (creates it when cfg.destUrl is empty) and makes sure its tabs exist. */
function ensureDest_(cfg) {
  let dest;
  if (cfg.destUrl) {
    const ref = parseSheetUrl_(cfg.destUrl);
    if (ref.published) throw new Error('Le classeur de destination doit être un lien d'édition, pas un lien « publié sur le Web ».');
    try { dest = SpreadsheetApp.openById(ref.id); }
    catch (e) { throw new Error('Impossible d'ouvrir le classeur de destination : vous devez pouvoir le modifier.'); }
  } else {
    dest = SpreadsheetApp.create('Présélection — décisions');
    dest.getSheets()[0].setName(TAB_SELECTED);
  }
  cfg.destUrl = dest.getUrl();
  if (!dest.getSheetByName(TAB_SELECTED)) dest.insertSheet(TAB_SELECTED);
  if (!dest.getSheetByName(TAB_REJECTED)) dest.insertSheet(TAB_REJECTED);
  commentsSheet_(dest);
  return dest;
}

/** Admin, first opening: creates the decisions spreadsheet, copies the list into it. Nothing to fill in. */
function initialize() {
  requireUser_(true);
  const cfg = getConfig_();
  const dest = ensureDest_(cfg);
  PropertiesService.getScriptProperties().setProperty('CONFIG', JSON.stringify(cfg));
  const tab = dest.getSheetByName(TAB_LIST);
  if (!tab || tab.getLastRow() < 2) importList_(cfg, dest);
  const warnings = ensureSharing_(cfg, dest);
  return { config: getConfig_(), users: getUsers_(), warnings: warnings };
}

/** Admin: copies the list again from the source (new applications). Decisions and comments are untouched. */
function reimportList() {
  requireUser_(true);
  const cfg = getConfig_();
  return importList_(cfg, ensureDest_(cfg));
}

function importList_(cfg, dest) {
  const user = currentUser_();
  const ref = parseSheetUrl_(cfg.sourceUrl);
  let src = null, apiError = null;
  if (!ref.published) {
    try {
      const ss = SpreadsheetApp.openById(ref.id);
      const sheets = ss.getSheets();
      let sheet = cfg.sourceSheet ? ss.getSheetByName(cfg.sourceSheet) : null;
      if (!sheet && ref.gid !== null) sheet = sheets.filter(function (x) { return String(x.getSheetId()) === String(ref.gid); })[0];
      if (!sheet) sheet = sheets[0];
      src = tableFromSheet_(sheet, cfg.headerRow, ss.getSpreadsheetTimeZone());
      src.title = ss.getName() + ' › ' + sheet.getName();
    } catch (e) { apiError = e; }
  }
  if (!src) {
    try { src = loadViaCsv_(ref, cfg.sourceSheet, cfg.headerRow); src.dates = {}; }
    catch (e2) {
      throw new Error('Lecture de la liste impossible. Le classeur source doit être partagé avec vous ou en « Tous les utilisateurs disposant du lien ». ' +
        'Détail : ' + (apiError ? apiError.message + ' / ' : '') + e2.message);
    }
  }
  if (!src.rows.length) throw new Error('La liste source ne contient aucune ligne sous la ligne des titres.');

  const lock = LockService.getScriptLock();
  lock.waitLock(25000);
  try {
    let sh = dest.getSheetByName(TAB_LIST);
    if (!sh) sh = dest.insertSheet(TAB_LIST, 0);
    sh.clear();
    const out = [[COL_ROW].concat(src.headers)].concat(src.rows.map(function (r, i) { return [String(src.rowNums[i])].concat(r); }));
    sh.getRange(1, 1, out.length, out[0].length).setNumberFormat('@').setValues(out);      // text: keeps 0 / + of phone numbers
    Object.keys(src.dates || {}).forEach(function (c) {                                     // real dates stay real dates
      const rng = sh.getRange(2, +c + 2, src.rows.length, 1);
      rng.setNumberFormat('dd/MM/yyyy');
      rng.setValues(src.dates[c].map(function (v) { return [v]; }));
    });
    sh.getRange(1, 1, 1, out[0].length).setFontWeight('bold');
    sh.setFrozenRows(1);
  } finally {
    lock.releaseLock();
  }
  const meta = { date: Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm'),
                 count: src.rows.length, by: user.email, title: src.title || 'Liste' };
  PropertiesService.getScriptProperties().setProperty('IMPORT', JSON.stringify(meta));
  return meta;
}

/** Everybody: reads the copied list + decisions + comments, all from the decisions spreadsheet. */
function loadData() {
  const user = requireUser_(false);
  const cfg = getConfig_();
  if (!cfg.destUrl) throw new Error('L'outil n'est pas encore initialisé : un administrateur doit l'ouvrir une première fois.');
  let dest;
  try { dest = SpreadsheetApp.openById(parseSheetUrl_(cfg.destUrl).id); }
  catch (e) { throw new Error('Vous n'avez pas accès au classeur des décisions. Demandez à un administrateur de le partager avec ' + user.email + '.'); }

  let sh = dest.getSheetByName(TAB_LIST);
  if (!sh || sh.getLastRow() < 2) {
    if (user.role !== 'admin') throw new Error('La liste n'a pas encore été importée : un administrateur doit ouvrir l'outil une première fois.');
    importList_(cfg, dest);
    sh = dest.getSheetByName(TAB_LIST);
  }
  const t = tableFromSheet_(sh, 1, dest.getSpreadsheetTimeZone());

  // First column of the copy = row number in the original list.
  const hasRow = t.headers[0] === COL_ROW;
  const iso = {};
  Object.keys(t.iso).forEach(function (c) { iso[hasRow ? +c - 1 : +c] = t.iso[c]; });
  let meta = {};
  try { meta = JSON.parse(PropertiesService.getScriptProperties().getProperty('IMPORT') || '{}'); } catch (e) {}

  const out = {
    title: meta.title || 'Liste', imported: meta,
    headers: hasRow ? t.headers.slice(1) : t.headers,
    rows: hasRow ? t.rows.map(function (r) { return r.slice(1); }) : t.rows,
    rowNums: hasRow ? t.rows.map(function (r, i) { return parseInt(r[0], 10) || t.rowNums[i]; }) : t.rowNums,
    iso: iso, decisions: {}, comments: {}, warning: '', config: cfg
  };
  // Admin runs: make sure both files are shared with the authorised people (only does work when something changed).
  if (user.role === 'admin') {
    try { const w = ensureSharing_(cfg, dest); if (w.length) out.warning = w.join(' '); } catch (e) {}
  }

  // Every time the app runs: the two decision tabs exist and already carry their column titles.
  out.prepared = [];
  try { out.prepared = prepareDecisionTabs_(cfg, dest, out.headers); }
  catch (e) { out.warning = 'Préparation des onglets de décision impossible : ' + e.message; }

  try { out.decisions = readDecisions_(cfg, dest); out.comments = readComments_(dest); }
  catch (e) { out.warning = 'Décisions déjà enregistrées illisibles : ' + e.message; }
  return out;
}

/** Column titles of a decision tab: the copied columns (name, phone…), then the decision columns. */
function decisionHeaders_(cfg, listHeaders, rejected) {
  let cols = ((cfg.exportHeaders && cfg.exportHeaders.length) ? cfg.exportHeaders : listHeaders)
    .filter(function (h) { return listHeaders.indexOf(h) !== -1; });
  if (!cols.length) cols = listHeaders.slice();
  if (cfg.keyHeader && listHeaders.indexOf(cfg.keyHeader) !== -1 && cols.indexOf(cfg.keyHeader) === -1) cols.push(cfg.keyHeader);
  return cols.concat([COL_ROW], rejected ? [COL_REASON] : [], [COL_AVIS, COL_BY, COL_DATE]);
}

/**
 * Creates « Sélectionnés » / « Non sélectionnés » / « Commentaires » when missing and writes their title row,
 * so the file is ready before the first decision. Existing titles and rows are never moved or erased:
 * missing titles are only added on the right. Returns the names of the tabs it had to create or complete.
 */
function prepareDecisionTabs_(cfg, dest, listHeaders) {
  const done = [];
  [[TAB_SELECTED, false], [TAB_REJECTED, true]].forEach(function (t) {
    let sh = dest.getSheetByName(t[0]);
    let touched = false;
    if (!sh) { sh = dest.insertSheet(t[0]); touched = true; }
    const lr = sh.getLastRow(), lc = sh.getLastColumn();
    const have = (lr > 0 && lc > 0)
      ? sh.getRange(1, 1, 1, lc).getDisplayValues()[0].map(function (h) { return String(h).trim(); })
      : [];
    const merged = have.slice();
    decisionHeaders_(cfg, listHeaders, t[1]).forEach(function (h) { if (merged.indexOf(h) === -1) merged.push(h); });
    if (merged.length !== have.length) {
      sh.getRange(1, 1, 1, merged.length).setNumberFormat('@').setValues([merged]).setFontWeight('bold');
      sh.setFrozenRows(1);
      touched = true;
    }
    if (touched) done.push(t[0]);
  });
  commentsSheet_(dest);
  return done;
}

/** headers + non-empty rows of a sheet; date columns also as ISO strings (iso) and as Date values (dates). */
function tableFromSheet_(sheet, headerRow, tz) {
  const range = sheet.getDataRange();
  const values = range.getValues();
  const table = buildTable_(range.getDisplayValues(), headerRow);
  const iso = {}, dates = {};
  for (let c = 0; c < table.headers.length; c++) {
    let nDates = 0, filled = 0;
    table.rowNums.forEach(function (r) {
      const v = values[r - 1][c];
      if (v !== '' && v !== null) { filled++; if (v instanceof Date) nDates++; }
    });
    if (filled > 0 && nDates / filled >= 0.6) {
      iso[c] = []; dates[c] = [];
      table.rowNums.forEach(function (r, i) {
        const v = values[r - 1][c];
        iso[c].push(v instanceof Date ? Utilities.formatDate(v, tz, 'yyyy-MM-dd') : '');
        dates[c].push(v instanceof Date ? v : table.rows[i][c]);
      });
    }
  }
  return { headers: table.headers, rows: table.rows, rowNums: table.rowNums, iso: iso, dates: dates };
}

/** Fallback for "published to the web" links or files that SpreadsheetApp cannot open. */
function loadViaCsv_(ref, sheetName, headerRow) {
  let csvUrl;
  if (ref.published) {
    csvUrl = 'https://docs.google.com/spreadsheets/d/e/' + ref.id + '/pub?output=csv' +
      (ref.gid !== null ? '&single=true&gid=' + ref.gid : '');
  } else if (sheetName) {
    csvUrl = 'https://docs.google.com/spreadsheets/d/' + ref.id + '/gviz/tq?tqx=out:csv&headers=0&sheet=' +
      encodeURIComponent(sheetName);
  } else {
    csvUrl = 'https://docs.google.com/spreadsheets/d/' + ref.id + '/export?format=csv' +
      (ref.gid !== null ? '&gid=' + ref.gid : '');
  }
  const res = UrlFetchApp.fetch(csvUrl, { muteHttpExceptions: true, followRedirects: true });
  const type = String(res.getHeaders()['Content-Type'] || '');
  if (res.getResponseCode() !== 200 || type.indexOf('text/html') !== -1) {
    throw new Error('le lien n'est pas public (HTTP ' + res.getResponseCode() + ')');
  }
  const table = buildTable_(Utilities.parseCsv(res.getContentText('UTF-8')), headerRow);
  return { title: 'Classeur public', headers: table.headers, rows: table.rows, rowNums: table.rowNums, iso: {} };
}

function buildTable_(display, headerRow) {
  if (!display || display.length < headerRow) throw new Error('la feuille est vide ou la ligne des titres n'existe pas');
  const width = display.reduce(function (m, r) { return Math.max(m, r.length); }, 0);
  const seen = {};
  const headers = [];
  for (let c = 0; c < width; c++) {
    let h = String(display[headerRow - 1][c] || '').replace(/\s+/g, ' ').trim() || 'Colonne ' + (c + 1);
    if (seen[h]) { seen[h]++; h = h + ' (' + seen[h] + ')'; } else { seen[h] = 1; }
    headers.push(h);
  }
  const rows = [], rowNums = [];
  for (let r = headerRow; r < display.length; r++) {
    const row = [];
    let empty = true;
    for (let c = 0; c < width; c++) {
      const v = display[r][c] === undefined || display[r][c] === null ? '' : String(display[r][c]);
      if (v.trim() !== '') empty = false;
      row.push(v);
    }
    if (!empty) { rows.push(row); rowNums.push(r + 1); }
  }
  return { headers: headers, rows: rows, rowNums: rowNums };
}

/** { key: {d:'S'|'N', motif, avis, by, date} } read from the two destination tabs. */
function readDecisions_(cfg, ss) {
  const map = {};
  [[TAB_SELECTED, 'S'], [TAB_REJECTED, 'N']].forEach(function (t) {
    const sheet = ss.getSheetByName(t[0]);
    if (!sheet || sheet.getLastRow() < 2) return;
    const data = sheet.getDataRange().getDisplayValues();
    const hdr = data[0].map(function (h) { return String(h).trim(); });
    const kc = cfg.keyHeader ? hdr.indexOf(cfg.keyHeader) : -1;
    const ix = { row: hdr.indexOf(COL_ROW), motif: hdr.indexOf(COL_REASON), avis: hdr.indexOf(COL_AVIS),
                 by: hdr.indexOf(COL_BY), date: hdr.indexOf(COL_DATE) };
    const at = function (r, i) { return i > -1 ? r[i] : ''; };
    for (let i = 1; i < data.length; i++) {
      const r = data[i];
      if (r.join('').trim() === '') continue;
      map[rowKey_(at(r, kc), at(r, ix.row))] = { d: t[1], motif: at(r, ix.motif), avis: at(r, ix.avis),
                                                 by: at(r, ix.by), date: at(r, ix.date) };
    }
  });
  return map;
}

/* ---------- Writing decisions ---------- */

/**
 * @param {{decision:'S'|'N'|'R', motif:string, avis:string, headers:string[],
 *          items:Array<{rowNum:number, values:string[]}>}} payload
 *        S = sélectionné, N = non sélectionné, R = remettre « à traiter » (removes the decision).
 */
function saveDecisions(payload) {
  const user = requireUser_(false);
  const cfg = getConfig_();
  if (!cfg.destUrl) throw new Error('Le classeur de destination n'est pas configuré (Réglages).');
  if (!payload || ['S', 'N', 'R'].indexOf(payload.decision) === -1) throw new Error('Décision inconnue.');
  if (!payload.items || !payload.items.length) throw new Error('Aucune ligne cochée.');
  const motif = String(payload.motif || '').trim();
  const avis = String(payload.avis || '').trim();
  if (payload.decision === 'N' && !motif) throw new Error('Indiquez le motif de non-sélection.');
  const headers = (payload.headers || []).map(String);
  const keyIdx = cfg.keyHeader ? headers.indexOf(cfg.keyHeader) : -1;

  const lock = LockService.getScriptLock();
  lock.waitLock(25000);
  try {
    let ss;
    try { ss = SpreadsheetApp.openById(parseSheetUrl_(cfg.destUrl).id); }
    catch (e) { throw new Error('Vous n'avez pas accès au classeur de destination. Demandez à un administrateur de le partager avec ' + user.email + '.'); }

    // Unique keys of this batch
    const keys = {};
    let items = payload.items.filter(function (it) {
      const k = rowKey_(keyIdx > -1 ? it.values[keyIdx] : '', it.rowNum);
      if (keys[k]) return false;
      keys[k] = true;
      it.key = k;
      return true;
    });

    // Only the author of a decision (or an admin, if allowed) may change or remove it.
    const existing = readDecisions_(cfg, ss);
    const override = ADMINS_CAN_OVERRIDE && user.role === 'admin';
    const blocked = [];
    items = items.filter(function (it) {
      const prev = existing[it.key];
      if (prev && !override && String(prev.by || '').toLowerCase().trim() !== user.email) {
        blocked.push({ key: it.key, by: prev.by });
        delete keys[it.key];
        return false;
      }
      return true;
    });
    if (!items.length) {
      throw new Error('Décision non modifiée : elle a été prise par ' + blocked[0].by + '. Seule cette personne peut la changer ou la retirer.');
    }

    // A candidate lives in one tab only: remove any earlier decision first.
    [TAB_SELECTED, TAB_REJECTED].forEach(function (name) {
      const sh = ss.getSheetByName(name);
      if (sh) removeKeys_(sh, cfg.keyHeader, keys);
    });

    const now = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm');
    if (payload.decision !== 'R' && items.length) {
      const tab = payload.decision === 'S' ? TAB_SELECTED : TAB_REJECTED;
      const sheet = ss.getSheetByName(tab) || ss.insertSheet(tab);
      const extra = [COL_ROW].concat(payload.decision === 'N' ? [COL_REASON] : [], [COL_AVIS, COL_BY, COL_DATE]);
      const outHeaders = headers.concat(extra);

      const lastRow = sheet.getLastRow(), lastCol = sheet.getLastColumn();
      const destHeaders = (lastRow > 0 && lastCol > 0)
        ? sheet.getRange(1, 1, 1, lastCol).getDisplayValues()[0].map(function (h) { return String(h).trim(); })
        : [];
      const before = destHeaders.length;
      const colOf = {};
      outHeaders.forEach(function (h) {
        let i = destHeaders.indexOf(h);
        if (i === -1) { destHeaders.push(h); i = destHeaders.length - 1; }
        colOf[h] = i;
      });
      if (destHeaders.length !== before || lastRow === 0) {
        sheet.getRange(1, 1, 1, destHeaders.length).setValues([destHeaders]).setFontWeight('bold');
        sheet.setFrozenRows(1);
      }

      const lines = items.map(function (it) {
        const line = new Array(destHeaders.length).fill('');
        headers.forEach(function (h, j) { line[colOf[h]] = it.values[j] === undefined ? '' : String(it.values[j]); });
        line[colOf[COL_ROW]] = String(it.rowNum);
        if (payload.decision === 'N') line[colOf[COL_REASON]] = motif;
        line[colOf[COL_AVIS]] = avis;
        line[colOf[COL_BY]] = user.email;
        line[colOf[COL_DATE]] = now;
        return line;
      });
      // Plain text so that phone numbers keep their leading 0 / "+".
      const target = sheet.getRange(sheet.getLastRow() + 1, 1, lines.length, destHeaders.length);
      target.setNumberFormat('@');
      target.setValues(lines);
    }

    return { count: items.length, keys: Object.keys(keys), blocked: blocked, decision: payload.decision,
             motif: payload.decision === 'N' ? motif : '', avis: avis, by: user.email, date: now };
  } finally {
    lock.releaseLock();
  }
}

/* ---------- Comments ---------- */

function commentsSheet_(ss) {
  let sh = ss.getSheetByName(TAB_COMMENTS);
  if (!sh) sh = ss.insertSheet(TAB_COMMENTS);
  if (sh.getLastRow() === 0) {
    sh.getRange(1, 1, 1, COMMENT_HEADERS.length).setValues([COMMENT_HEADERS]).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

/** { key: [{text, by, date}, ...] } oldest first. */
function readComments_(ss) {
  const map = {};
  const sh = ss.getSheetByName(TAB_COMMENTS);
  if (!sh || sh.getLastRow() < 2) return map;
  sh.getRange(2, 1, sh.getLastRow() - 1, COMMENT_HEADERS.length).getDisplayValues().forEach(function (r) {
    if (!r[0] || !String(r[3]).trim()) return;
    (map[r[0]] = map[r[0]] || []).push({ text: r[3], by: r[4], date: r[5] });
  });
  return map;
}

/** Any authorised person can comment. @param {{key:string, rowNum:number, label:string, text:string}} payload */
function addComment(payload) {
  const user = requireUser_(false);
  const cfg = getConfig_();
  if (!cfg.destUrl) throw new Error('Le classeur de destination n'est pas configuré (Réglages).');
  const text = String((payload && payload.text) || '').trim().substring(0, 2000);
  const key = String((payload && payload.key) || '');
  if (!text) throw new Error('Écrivez votre commentaire.');
  if (!/^[kr]:.+/.test(key)) throw new Error('Candidat non identifié.');

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    let ss;
    try { ss = SpreadsheetApp.openById(parseSheetUrl_(cfg.destUrl).id); }
    catch (e) { throw new Error('Vous n'avez pas accès au classeur de destination. Demandez à un administrateur de le partager avec ' + user.email + '.'); }
    const sh = commentsSheet_(ss);
    const now = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm');
    const line = [key, String(payload.rowNum || ''), String(payload.label || '').substring(0, 200), text, user.email, now];
    const target = sh.getRange(sh.getLastRow() + 1, 1, 1, line.length);
    target.setNumberFormat('@');
    target.setValues([line]);
    return { key: key, comment: { text: text, by: user.email, date: now } };
  } finally {
    lock.releaseLock();
  }
}

/** Removes the data rows whose key is in keySet (rewrites the block: safe even if every row goes). */
function removeKeys_(sheet, keyHeader, keySet) {
  const lr = sheet.getLastRow(), lc = sheet.getLastColumn();
  if (lr < 2 || lc < 1) return 0;
  const hdr = sheet.getRange(1, 1, 1, lc).getDisplayValues()[0].map(function (h) { return String(h).trim(); });
  const kc = keyHeader ? hdr.indexOf(keyHeader) : -1;
  const rc = hdr.indexOf(COL_ROW);
  const range = sheet.getRange(2, 1, lr - 1, lc);
  const data = range.getDisplayValues();
  const keep = data.filter(function (r) { return !keySet[rowKey_(kc > -1 ? r[kc] : '', rc > -1 ? r[rc] : '')]; });
  if (keep.length === data.length) return 0;
  range.clearContent();
  if (keep.length) sheet.getRange(2, 1, keep.length, lc).setNumberFormat('@').setValues(keep);
  return data.length - keep.length;
}

/* ---------- Helpers ---------- */

function parseSheetUrl_(url) {
  url = String(url || '').trim();
  if (!url) throw new Error('Collez le lien du classeur Google Sheets à analyser.');
  const gidMatch = url.match(/[#&?]gid=(\d+)/);
  const gid = gidMatch ? gidMatch[1] : null;
  const pub = url.match(/\/spreadsheets\/d\/e\/([a-zA-Z0-9_-]+)/);
  if (pub) return { id: pub[1], gid: gid, published: true };
  const std = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  if (std) return { id: std[1], gid: gid, published: false };
  if (/^[a-zA-Z0-9_-]{25,}$/.test(url)) return { id: url, gid: null, published: false };
  throw new Error('Ce lien ne ressemble pas à un lien Google Sheets.');
}

/** Same person = same key column value ("06 655 00 77" = "066550077"); otherwise the source row number. */
function rowKey_(keyValue, rowNum) {
  const k = normalizeKey_(keyValue);
  return k ? 'k:' + k : 'r:' + String(rowNum).trim();
}

/** Must stay identical to normKey() in Index.html. */
function normalizeKey_(v) {
  return String(v === undefined || v === null ? '' : v)
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[\s.\-()_/]/g, '');
}
