/**
 * Small hand-drawn SVG icons (24×24 viewBox), one per level in `LEVELS`.
 * Keyed by `Level.icon`. Render with `<svg viewBox="0 0 24 24" set:html={ICONS[key]} />`.
 */
const star = 'M0-2.6l.8 1.6 1.8.3-1.3 1.3.3 1.8L0 1.6l-1.6.8.3-1.8-1.3-1.3 1.8-.3z'

export const ICONS: Record<string, string> = {
  scouter: `<ellipse cx="13.5" cy="12" rx="9.5" ry="7" fill="#3ddc84" stroke="#0b6b3a" stroke-width="1.6"/><path d="M8 9.5h7" stroke="#0b6b3a" stroke-width="1.4" stroke-linecap="round" opacity=".75"/><path d="M8 12.5h4" stroke="#0b6b3a" stroke-width="1.4" stroke-linecap="round" opacity=".75"/><rect x="1" y="9.5" width="4.5" height="5" rx="1.4" fill="#6b7280"/>`,
  dragonball: `<circle cx="12" cy="12" r="10" fill="#ff9f1a"/><circle cx="9" cy="8.5" r="2.2" fill="#fff" opacity=".35"/>${[[9, 9], [15, 9], [9, 15], [15, 15]].map(([x, y]) => `<path d="${star}" transform="translate(${x} ${y})" fill="#e5261b"/>`).join('')}`,
  pokeball: `<circle cx="12" cy="12" r="10" fill="#fff" stroke="#22252b" stroke-width="2"/><path d="M2 12a10 10 0 0 1 20 0z" fill="#e3350d"/><path d="M2 12h20" stroke="#22252b" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="#fff" stroke="#22252b" stroke-width="2"/>`,
  spiral: `<circle cx="12" cy="12" r="10" fill="#fff3e6"/><path d="M12 12a1 1 0 0 1 2 0a2 2 0 0 1-4 0a3 3 0 0 1 6 0a4 4 0 0 1-8 0a5 5 0 0 1 10 0a6 6 0 0 1-12 0" fill="none" stroke="#ff5e7e" stroke-width="1.8" stroke-linecap="round"/>`,
  saber: `<path d="M7.5 16.5 20 4" stroke="#4ad6ff" stroke-width="6.5" stroke-linecap="round" opacity=".35"/><path d="M7.5 16.5 20 4" stroke="#e8fbff" stroke-width="2.6" stroke-linecap="round"/><path d="M2.5 21.5 6.5 17.5" stroke="#9aa3ad" stroke-width="4.2" stroke-linecap="round"/><path d="M4 20 5.2 18.8" stroke="#3b4048" stroke-width="1.4"/>`,
  ring: `<circle cx="12" cy="12" r="7.5" fill="none" stroke="#e8b923" stroke-width="4"/><circle cx="12" cy="12" r="7.5" fill="none" stroke="#fff3b0" stroke-width="1" opacity=".8"/>`,
  bolt: `<path d="M13.5 1.5 5 13.5h5.5L9.5 22.5 19 10h-5.5z" fill="#f5c518" stroke="#b8860b" stroke-width=".8" stroke-linejoin="round"/>`,
}

/** Open book icon for the Bingo Book button. */
export const BOOK_ICON = `<path d="M3 5.5A1.5 1.5 0 0 1 4.5 4H9a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4.5A1.5 1.5 0 0 1 3 16.5z" fill="#c8f22b"/><path d="M21 5.5A1.5 1.5 0 0 0 19.5 4H15a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h5.5a1.5 1.5 0 0 0 1.5-1.5z" fill="#a4cc12"/><path d="M5.5 8h4M5.5 11h4M14.5 8h4M14.5 11h4" stroke="#0b0e13" stroke-width="1.2" stroke-linecap="round" opacity=".55"/>`
