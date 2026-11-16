/* DB Services — concept demo. Vanilla JS, no build step. Nothing is sent or stored. */

/* =============== CONTENT (from the DB Services brochure) =============== */
const SERVICES = [
  { id: 'fourniture', n: '01', title: 'Fourniture de biens', img: 'img/fourniture.webp', alt: 'Deux agents en gilet de sécurité vérifient un stock en entrepôt',
    text: "Approvisionnement en matériels, équipements et consommables pour les secteurs industriels, miniers et institutionnels. Sélection, acheminement et livraison de produits conformes aux standards internationaux.",
    items: ['Matériels informatiques', 'Mobilier de bureau', 'Consommables industriels', 'Équipements de sécurité', 'Pièces détachées', 'Fournitures médicales'] },
  { id: 'equipements', n: '02', title: 'Équipements industriels', img: 'img/equipements.webp', alt: 'Techniciens casqués autour d\'une machine industrielle',
    text: "Fourniture, installation et maintenance d'équipements industriels lourds et de précision, avec des solutions adaptées aux exigences techniques de chaque secteur.",
    items: ['Groupes électrogènes', 'Compresseurs industriels', 'Pompes et stations', 'Transformateurs', 'Équipements miniers', 'Systèmes de filtration'] },
  { id: 'solutions', n: '03', title: 'Solutions techniques', img: 'img/solutions.webp', alt: 'Équipe d\'ingénieurs étudiant des plans autour d\'une table',
    text: "Conception et mise en œuvre de solutions techniques sur mesure : études de faisabilité, ingénierie, supervision de travaux et assistance technique pour des projets complexes.",
    items: ['Études de faisabilité', 'Ingénierie de projet', 'Supervision de travaux', 'Assistance technique', 'Audit et diagnostic', 'Formation technique'] },
  { id: 'btp', n: '04', title: 'BTP', img: 'img/btp.webp', alt: 'Équipe en gilets et casques sur un chantier de construction',
    text: "Construction, réhabilitation et aménagement d'infrastructures : bâtiments, routes, ouvrages d'art et travaux publics, sur des chantiers de toute envergure.",
    items: ['Construction de bâtiments', "Réhabilitation d'ouvrages", 'Voirie et assainissement', 'Aménagement intérieur', 'Travaux de génie civil', 'Clôtures et espaces verts'] },
  { id: 'logistique', n: '05', title: 'Logistique', img: 'img/logistique.webp', alt: 'Agents logistiques devant un camion porte-conteneur',
    text: "Transport, manutention, entreposage et gestion de la chaîne d'approvisionnement. Livraison sécurisée de matériels et équipements sur l'ensemble du territoire.",
    items: ['Transport de marchandises', 'Manutention portuaire', 'Entreposage sécurisé', 'Gestion de stocks', 'Dédouanement', 'Livraison dernier kilomètre'] },
  { id: 'energie', n: '06', title: 'Énergie', img: 'img/energie.webp', alt: 'Techniciens installant des panneaux solaires sur un toit',
    text: "Solutions énergétiques complètes : groupes électrogènes, installations solaires, réseaux électriques et maintenance. Nous accompagnons la transition énergétique de nos clients.",
    items: ['Installations solaires', 'Groupes électrogènes', 'Réseaux électriques BT/MT', 'Maintenance préventive', 'Éclairage public', 'Audit énergétique'] },
];

const SECTORS = [
  ['Mi', 'Mines', 'Équipements, pièces et logistique pour sites miniers.'],
  ['Pg', 'Pétrole & Gaz', 'Fournitures et maintenance pour l\'amont et l\'aval.'],
  ['En', 'Énergie', 'Solaire, groupes électrogènes, réseaux BT/MT.'],
  ['Bt', 'BTP', 'Bâtiments, routes et ouvrages d\'art.'],
  ['In', 'Industrie', 'Équipements lourds et de précision.'],
  ['Sa', 'Santé', 'Centres de santé et fournitures médicales.'],
  ['Ap', 'Administrations publiques', 'Projets institutionnels et marchés publics.'],
  ['Tc', 'Télécommunications', 'Infrastructures et équipements techniques.'],
  ['Ba', 'Banques & Assurances', 'Mobilier, informatique et aménagement.'],
  ['Ho', 'Hôtellerie', 'Aménagement, énergie et équipements.'],
];

const PROJECTS = [
  ['BTP', "Construction d'un centre de santé", 'img/proj-sante.webp', 'Bâtiment blanc et bleu d\'un centre de santé neuf'],
  ['Énergie', 'Installation solaire industrielle', 'img/proj-solaire.webp', 'Panneaux solaires sur la toiture d\'un bâtiment industriel'],
  ['Fourniture', "Livraison d'équipements lourds", 'img/proj-equipements.webp', 'Une grue décharge des groupes électrogènes d\'un camion'],
  ['BTP', 'Réhabilitation de route nationale', 'img/proj-route.webp', 'Route nationale asphaltée bordée de végétation tropicale'],
  ['Logistique', "Aménagement d'entrepôt logistique", 'img/proj-entrepot.webp', 'Entrepôt avec rayonnages et chariots élévateurs'],
];

const STAMPS = [
  ['Qualité', ['Conformité aux normes ISO 9001', "Processus d'amélioration continue"]],
  ['Sécurité', ['Respect des normes HSE', 'Formation continue du personnel']],
  ['Environ­nement', ['Gestion responsable des déchets', "Réduction de l'empreinte carbone"]],
  ['Éthique', ['Politique anti-corruption', 'Transparence des opérations']],
  ['Durable', ['Investissement communautaire', 'Partenariats locaux durables']],
];

/* Map pins in the map image's pixel space (1101 × 615) */
const HOME = { name: 'Brazzaville', x: 598, y: 405 };
const PARTNERS = [
  { name: 'Europe', x: 548, y: 215 },
  { name: 'Turquie', x: 640, y: 262 },
  { name: 'Émirats Arabes Unis', x: 735, y: 318, below: true },
  { name: 'Inde', x: 800, y: 312 },
  { name: 'Chine', x: 870, y: 255 },
  { name: 'Afrique du Sud', x: 640, y: 478 },
];

/* =============== HELPERS =============== */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* =============== RENDER =============== */
$('#track').innerHTML = SERVICES.map((s) => `
  <article class="panel" id="svc-${s.id}">
    <div class="panel__img"><img src="${s.img}" alt="${s.alt}" loading="lazy" width="1383" height="620" /><span class="panel__n" aria-hidden="true">${s.n}</span></div>
    <div class="panel__body">
      <span class="mono">Prestation ${s.n} / 06</span>
      <h3>${s.title}</h3>
      <p>${s.text}</p>
      <ul>${s.items.map((i) => `<li>${i}</li>`).join('')}</ul>
    </div>
  </article>`).join('') + `
  <div class="panel panel--end">
    <span class="mono">FIN DU PLAN</span>
    <h3>Un besoin qui combine plusieurs métiers ?</h3>
    <p>C'est exactement notre spécialité.</p>
    <div><a class="btn btn--gold" href="#contact">Parlons-en <span class="arr">→</span></a></div>
  </div>`;

$('#ptable').innerHTML = SECTORS.map(([sym, name, desc], i) => `
  <li class="el rv" tabindex="0" aria-label="${name} : ${desc}">
    <span class="el__z"><span>${String(i + 1).padStart(2, '0')}</span><span>DB</span></span>
    <span class="el__sym" aria-hidden="true">${sym}</span>
    <span class="el__name" aria-hidden="true">${name}</span>
    <span class="el__desc" aria-hidden="true">${desc}</span>
  </li>`).join('');

$('#stack').innerHTML = PROJECTS.map(([tag, title, img, alt], i) => `
  <article class="pcard" style="--i:${i}">
    <img src="${img}" alt="${alt}" loading="lazy" width="1312" height="816" />
    <div class="pcard__body">
      <div><span class="pcard__tag">${tag}</span><h3>${title}</h3><p class="pcard__by mono">Projet réalisé par DB Services</p></div>
      <span class="pcard__n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
    </div>
  </article>`).join('');

$('#stamps').innerHTML = STAMPS.map(([name, lines], i) => `
  <div class="stamp rv">
    <div class="stamp__seal">
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <defs><path id="c${i}" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" /></defs>
        <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" stroke-width="3" />
        <circle cx="100" cy="100" r="54" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 4" />
        <g class="stamp__ring"><text font-family="JetBrains Mono, monospace" font-size="13" font-weight="600" letter-spacing="3.2" fill="currentColor"><textPath href="#c${i}">DB SERVICES ★ ENGAGEMENT ★ BRAZZAVILLE ★ </textPath></text></g>
      </svg>
      <b>${name}</b>
    </div>
    <ul>${lines.map((l) => `<li>${l}</li>`).join('')}</ul>
  </div>`).join('');

$('#picks').innerHTML = SERVICES.map((s) => `<label><input type="checkbox" name="svc" value="${s.id}" /><span>${s.title}</span></label>`).join('');
$('#yr').textContent = new Date().getFullYear();

/* =============== MAP ARCS =============== */
(() => {
  const svg = $('#mapsvg');
  const NS = 'http://www.w3.org/2000/svg';
  const mk = (tag, attrs) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };
  PARTNERS.forEach((p, i) => {
    const mx = (HOME.x + p.x) / 2, my = (HOME.y + p.y) / 2 - Math.hypot(p.x - HOME.x, p.y - HOME.y) * 0.35;
    const path = mk('path', { d: `M${HOME.x},${HOME.y} Q${mx},${my} ${p.x},${p.y}`, class: 'arc' });
    svg.appendChild(path);
    const len = path.getTotalLength();
    path.style.setProperty('--len', len);
    path.style.animationDelay = `${0.2 + i * 0.18}s`;
    svg.appendChild(mk('circle', { cx: p.x, cy: p.y, r: 9, class: 'pin-ring', style: `animation-delay:${i * .3}s` }));
    svg.appendChild(mk('circle', { cx: p.x, cy: p.y, r: 4.5, class: 'pin' }));
    const left = p.x < HOME.x;
    const t = p.below ? mk('text', { x: p.x, y: p.y + 30, class: 'pin-label', 'text-anchor': 'middle' }) : mk('text', { x: p.x + (left ? -12 : 12), y: p.y - 10, class: 'pin-label', 'text-anchor': left ? 'end' : 'start' });
    t.textContent = p.name; svg.appendChild(t);
  });
  svg.appendChild(mk('circle', { cx: HOME.x, cy: HOME.y, r: 12, class: 'pin-ring' }));
  svg.appendChild(mk('circle', { cx: HOME.x, cy: HOME.y, r: 6, class: 'pin-home' }));
  const h = mk('text', { x: HOME.x - 14, y: HOME.y + 26, class: 'pin-label pin-label--home', 'text-anchor': 'end' });
  h.textContent = '★ Brazzaville'; svg.appendChild(h);
  $('#maplegend').innerHTML = PARTNERS.map((p) => `<li>${p.name}</li>`).join('');
})();

/* =============== LOADER =============== */
(() => {
  const counter = $('.loader__count');
  const start = performance.now(), dur = RM ? 0 : 1100;
  const tick = (t) => {
    const k = dur ? clamp((t - start) / dur, 0, 1) : 1;
    counter.textContent = String(Math.round(k * 100)).padStart(3, '0');
    if (k < 1) requestAnimationFrame(tick);
    else setTimeout(() => document.documentElement.classList.add('is-loaded'), RM ? 0 : 150);
  };
  requestAnimationFrame(tick);
  setTimeout(() => document.documentElement.classList.add('is-loaded'), 2500); // safety net
})();

/* =============== HEADER + MENU =============== */
const hdr = $('.hdr'), nav = $('#nav'), burger = $('.burger');
const setMenu = (open) => {
  nav.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  document.body.style.overflow = open ? 'hidden' : '';
};
burger.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); burger.focus(); } });

const navLinks = $$('#nav a');
const spy = new IntersectionObserver((es) => es.forEach((en) => {
  if (en.isIntersecting) navLinks.forEach((a) => a.classList.toggle('on', a.hash === '#' + en.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
navLinks.forEach((a) => { const t = $(a.hash); t && spy.observe(t); });

/* =============== HERO LENS =============== */
(() => {
  const hero = $('.hero');
  let tx = 0.7, ty = innerWidth < 640 ? 0.2 : 0.45, cx = tx, cy = ty, auto = true, t0 = performance.now(), visible = true;
  const set = () => { hero.style.setProperty('--x', (cx * 100).toFixed(2) + '%'); hero.style.setProperty('--y', (cy * 100).toFixed(2) + '%'); };
  hero.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    const r = hero.getBoundingClientRect();
    tx = (e.clientX - r.left) / r.width; ty = (e.clientY - r.top) / r.height; auto = false;
  });
  hero.addEventListener('pointerleave', () => { auto = true; });
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(hero);
  if (RM) { set(); return; }
  const loop = (t) => {
    if (visible) {
      if (auto) { const s = (t - t0) / 1000, m = innerWidth < 640; tx = (m ? 0.55 : 0.62) + Math.sin(s * 0.45) * (m ? 0.3 : 0.22); ty = (m ? 0.2 : 0.42) + Math.sin(s * 0.7) * (m ? 0.05 : 0.14); }
      cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12; set();
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
})();

/* =============== REVEAL + COUNTERS + MAP =============== */
const countUp = (el) => {
  const end = +el.dataset.count, dur = RM ? 0 : 1600, s = performance.now();
  const step = (t) => { const k = dur ? clamp((t - s) / dur, 0, 1) : 1; el.textContent = Math.round(end * (1 - Math.pow(1 - k, 4))); if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
};
const io = new IntersectionObserver((es) => es.forEach((en) => {
  if (!en.isIntersecting) return;
  en.target.classList.add('in');
  $$('[data-count]', en.target).forEach(countUp);
  io.unobserve(en.target);
}), { rootMargin: '0px 0px -10% 0px' });
$$('.rv, .map').forEach((el, i) => { el.style.transitionDelay = `${(i % 3) * 90}ms`; io.observe(el); });

/* =============== SCROLL-DRIVEN: horizontal services, process rail, header =============== */
const hs = $('.hscroll'), track = $('#track'), bar = $('.hscroll__progress');
const steps = $('#steps'), stepItems = $$('#steps li');
const useH = () => !RM && innerWidth > 900;

function layoutH() {
  if (useH()) {
    hs.classList.remove('is-static');
    const dist = track.scrollWidth - innerWidth;
    hs.style.height = `${innerHeight + dist}px`;
  } else {
    hs.classList.add('is-static');
    hs.style.height = '';
    track.style.transform = '';
  }
}

function onScroll() {
  hdr.classList.toggle('is-solid', scrollY > 40);
  if (useH()) {
    const r = hs.getBoundingClientRect();
    const dist = track.scrollWidth - innerWidth;
    const p = clamp(-r.top / (hs.offsetHeight - innerHeight || 1), 0, 1);
    track.style.transform = `translate3d(${-p * dist}px,0,0)`;
    bar.style.setProperty('--p', p);
  }
  const sr = steps.getBoundingClientRect();
  const sp = clamp((innerHeight * 0.6 - sr.top) / sr.height, 0, 1);
  steps.style.setProperty('--p', sp.toFixed(3));
  stepItems.forEach((li) => li.classList.toggle('on', li.getBoundingClientRect().top < innerHeight * 0.62));
}

let ticking = false;
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { onScroll(); ticking = false; }); } }, { passive: true });
addEventListener('resize', () => { layoutH(); onScroll(); });
addEventListener('load', () => { layoutH(); onScroll(); });
layoutH(); onScroll();

/* =============== BENTO spotlight =============== */
$$('.bento__i').forEach((el) => el.addEventListener('pointermove', (e) => {
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`); el.style.setProperty('--my', `${e.clientY - r.top}px`);
}));

/* =============== QUOTE FORM (mock) =============== */
const form = $('#quote');
const RULES = {
  name: (f) => (f.name.value.trim().length >= 2 ? '' : 'Indiquez votre nom complet.'),
  email: (f) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.value.trim()) ? '' : 'Adresse email invalide.'),
  tel: (f) => (f.tel.value.replace(/\D/g, '').length >= 8 ? '' : 'Numéro de téléphone invalide (8 chiffres minimum).'),
  svc: (f) => ($$('input[name=svc]:checked', f).length ? '' : 'Choisissez au moins une prestation.'),
  msg: (f) => (f.msg.value.trim().length >= 10 ? '' : 'Décrivez votre projet en quelques mots (10 caractères min.).'),
};
const check = (key) => {
  const msg = RULES[key](form);
  const box = $('#err-' + key);
  box.textContent = msg;
  const fld = box.closest('.fld');
  fld.classList.toggle('bad', !!msg);
  const input = key === 'svc' ? null : form[key];
  if (input) { input.setAttribute('aria-invalid', String(!!msg)); input.setAttribute('aria-describedby', box.id); }
  return !msg;
};
form.addEventListener('focusout', (e) => { const k = e.target.name; if (RULES[k] && k !== 'svc' && e.target.value) check(k); });
form.addEventListener('input', (e) => { const k = e.target.name; if (RULES[k] && e.target.closest('.bad')) check(k); });
form.addEventListener('change', (e) => { if (e.target.name === 'svc') check('svc'); });

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const status = $('.form__status', form);
  const bad = Object.keys(RULES).filter((k) => !check(k));
  if (bad.length) {
    status.className = 'form__status bad';
    status.textContent = `${bad.length} champ${bad.length > 1 ? 's' : ''} à corriger.`;
    const first = bad[0] === 'svc' ? $('input[name=svc]', form) : form[bad[0]];
    first.focus();
    return;
  }
  const btn = $('button[type=submit]', form);
  btn.disabled = true; btn.classList.add('busy'); $('.lbl', btn).textContent = 'Envoi en cours…';
  status.className = 'form__status'; status.textContent = '';
  const name = esc(form.name.value.trim().split(/\s+/)[0]);
  setTimeout(() => {
    form.innerHTML = `
      <div class="ok" tabindex="-1">
        <div class="ok__stamp">REÇU*</div>
        <h3 style="font-size:1.8rem;margin-bottom:.5em">Merci, ${name} !</h3>
        <p style="color:#b8c5db">*Démonstration uniquement : ce formulaire n'est relié à aucun serveur. <strong>Votre demande n'a pas été transmise</strong> à DB Services et rien n'a été enregistré.</p>
        <p style="color:#b8c5db">Pour les joindre : <a href="mailto:contact@dbscongo.co" style="color:var(--gold)">contact@dbscongo.co</a> · <a href="tel:+242066757171" style="color:var(--gold)">+242 06 675 71 71</a></p>
      </div>`;
    $('.ok', form).focus();
  }, 1300);
});
