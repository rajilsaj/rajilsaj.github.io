/* DBS Congo — concept demo. Vanilla JS, no build step. Nothing is sent or stored. */

/* =============== CONTENT (DBS Congo brochure + letterhead) =============== */
/* Core business: petroleum trading. Copy is draft, to be validated by DBS Congo. */
const TRADING = [
  { id: 'negoce', n: '01', title: 'Négoce', img: 'img/map.webp', alt: 'Carte du monde stylisée',
    text: "Achat et revente de produits pétroliers, en lien avec un réseau de fournisseurs et partenaires internationaux (Europe, Turquie, Émirats Arabes Unis, Inde, Chine, Afrique du Sud).",
    items: ['Sourcing auprès de partenaires internationaux', 'Négociation et contractualisation', 'Suivi des commandes et des cargaisons', 'Conformité aux standards internationaux'] },
  { id: 'import', n: '02', title: 'Import-Export', img: 'img/logistique.webp', alt: 'Agents logistiques devant un camion porte-conteneur',
    text: "Gestion des flux d'importation et d'exportation : formalités, dédouanement et coordination avec les autorités et les transitaires.",
    items: ['Formalités import / export', 'Dédouanement', 'Coordination portuaire', 'Documentation commerciale'] },
  { id: 'transport', n: '03', title: 'Transport', img: 'img/proj-equipements.webp', alt: 'Camion de transport lourd sur un site',
    text: "Acheminement sécurisé des produits sur l'ensemble du territoire national, avec une logistique maîtrisée du point de chargement jusqu'au client.",
    items: ['Transport de marchandises', 'Couverture nationale', 'Respect des normes HSE', 'Suivi des livraisons'] },
  { id: 'logistique', n: '04', title: 'Logistique', img: 'img/proj-entrepot.webp', alt: 'Entrepôt avec rayonnages et chariots élévateurs',
    text: "Stockage, manutention et gestion des stocks pour garantir la disponibilité des produits, jusqu'à la livraison du dernier kilomètre.",
    items: ['Entreposage sécurisé', 'Manutention portuaire', 'Gestion de stocks', 'Livraison dernier kilomètre'] },
];

const SERVICES = [
  { id: 'fourniture', n: '01', title: 'Fourniture de biens', img: 'img/fourniture.webp', alt: 'Deux agents en gilet de sécurité vérifient un stock en entrepôt',
    text: "Approvisionnement en matériels, équipements et consommables pour les secteurs industriels, miniers et institutionnels. Sélection, acheminement et livraison de produits conformes aux standards internationaux.",
    items: ['Mobilier de bureau', 'Consommables industriels', 'Équipements de sécurité', 'Pièces détachées', 'Fournitures médicales'] },
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
  ['Pg', 'Pétrole & Gaz', 'Notre cœur de métier : trading, transport et logistique pétrolière.', true],
  ['Mi', 'Mines', 'Équipements, pièces et logistique pour sites miniers.'],
  ['En', 'Énergie', 'Solaire, groupes électrogènes, réseaux BT/MT.'],
  ['Bt', 'BTP', 'Bâtiments, routes et ouvrages d\'art.'],
  ['In', 'Industrie', 'Équipements lourds et de précision.'],
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

$('#ptable').innerHTML = SECTORS.map(([sym, name, desc, star], i) => `
  <li class="el rv${star ? ' el--star' : ''}" tabindex="0" aria-label="${name} : ${desc}">
    <span class="el__z"><span>${String(i + 1).padStart(2, '0')}</span><span>${star ? '★ DBS' : 'DBS'}</span></span>
    <span class="el__sym" aria-hidden="true">${sym}</span>
    <span class="el__name" aria-hidden="true">${name}</span>
    <span class="el__desc" aria-hidden="true">${desc}</span>
  </li>`).join('');

$('#stack').innerHTML = PROJECTS.map(([tag, title, img, alt], i) => `
  <article class="pcard" style="--i:${i}">
    <img src="${img}" alt="${alt}" loading="lazy" width="1312" height="816" />
    <div class="pcard__body">
      <div><span class="pcard__tag">${tag}</span><h3>${title}</h3><p class="pcard__by mono">Projet réalisé par DBS Congo</p></div>
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
        <g class="stamp__ring"><text font-family="JetBrains Mono, monospace" font-size="13" font-weight="600" letter-spacing="3.2" fill="currentColor"><textPath href="#c${i}">DBS CONGO ★ ENGAGEMENT ★ BRAZZAVILLE ★ </textPath></text></g>
      </svg>
      <b>${name}</b>
    </div>
    <ul>${lines.map((l) => `<li>${l}</li>`).join('')}</ul>
  </div>`).join('');

$('#picks').innerHTML = [{ id: 'trading', title: 'Trading pétrolier' }, ...SERVICES].map((s) => `<label><input type="checkbox" name="svc" value="${s.id}" /><span>${s.title}</span></label>`).join('');
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

/* =============== HERO: drop parallax =============== */
(() => {
  const hero = $('.hero'), drop = $('.drop');
  if (RM || !drop) return;
  hero.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    const r = hero.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5, dy = (e.clientY - r.top) / r.height - 0.5;
    drop.style.transform = `translate3d(${dx * -24}px, ${dy * -18}px, 0) rotate(${dx * 6}deg)`;
  });
  hero.addEventListener('pointerleave', () => { drop.style.transform = ''; });
})();

/* =============== TRADING PIPELINE =============== */
(() => {
  const pipe = $('#pipe'), stations = $('.pipe__stations'), panel = $('#pipe-panel');
  stations.innerHTML = TRADING.map((t, i) => `
    <button class="station" type="button" role="tab" id="tab-${t.id}" aria-controls="pipe-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-i="${i}">
      <span class="station__valve" aria-hidden="true"></span>
      <span class="station__n mono">${t.n}</span>
      <span class="station__t">${t.title}</span>
    </button>`).join('');
  const tabs = $$('.station', stations);
  let cur = 0, timer = null, userTook = false;
  const show = (i, focus) => {
    cur = (i + TRADING.length) % TRADING.length;
    const t = TRADING[cur];
    tabs.forEach((b, k) => { b.setAttribute('aria-selected', String(k === cur)); b.tabIndex = k === cur ? 0 : -1; b.classList.toggle('done', k < cur); });
    pipe.style.setProperty('--k', cur / (TRADING.length - 1));
    panel.setAttribute('aria-labelledby', 'tab-' + t.id);
    panel.innerHTML = `
      <div class="pp__img"><img src="${t.img}" alt="${t.alt}" loading="lazy" /></div>
      <div class="pp__body">
        <span class="mono">Étape ${t.n} / 0${TRADING.length}</span>
        <h3>${t.title}</h3>
        <p>${t.text}</p>
        <ul>${t.items.map((x) => `<li>${x}</li>`).join('')}</ul>
      </div>`;
    panel.classList.remove('swap'); void panel.offsetWidth; panel.classList.add('swap');
    if (focus) tabs[cur].focus();
  };
  const stop = () => { userTook = true; clearInterval(timer); };
  stations.addEventListener('click', (e) => { const b = e.target.closest('.station'); if (b) { stop(); show(+b.dataset.i); } });
  stations.addEventListener('keydown', (e) => {
    const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (d) { e.preventDefault(); stop(); show(cur + d, true); }
    if (e.key === 'Home') { e.preventDefault(); stop(); show(0, true); }
    if (e.key === 'End') { e.preventDefault(); stop(); show(TRADING.length - 1, true); }
  });
  show(0);
  if (!RM) {
    new IntersectionObserver(([en]) => {
      clearInterval(timer);
      if (en.isIntersecting && !userTook) timer = setInterval(() => show(cur + 1), 5000);
    }, { threshold: 0.4 }).observe(pipe);
  }
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
        <p style="color:#b8c5db">*Démonstration uniquement : ce formulaire n'est relié à aucun serveur. <strong>Votre demande n'a pas été transmise</strong> à DBS Congo et rien n'a été enregistré.</p>
        <p style="color:#b8c5db">Pour joindre DBS Congo : <a href="mailto:contact@dbscongo.co" style="color:var(--gold)">contact@dbscongo.co</a> · <a href="tel:+242066757171" style="color:var(--gold)">+242 06 675 71 71</a></p>
      </div>`;
    $('.ok', form).focus();
  }, 1300);
});

/* =============== BRAND: logo waves + scroll gauge =============== */
(() => {
  // the logo's wave in the Congolese flag colours (green / yellow / red) on every dark → light edge
  const svg = (n2) => `<svg class="bwave${n2 ? ' bwave--n2' : ''}" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
    <path class="bwave__band" d="M0,0 H1440 V38 C1260,64 1080,14 900,34 C700,58 520,74 300,46 C180,30 80,30 0,40 Z" />
    <path class="bwave__line bwave__line--g" transform="translate(0 0)" d="M0,58 C80,48 180,48 300,64 C520,92 700,76 900,52 C1080,32 1260,82 1440,56" />
    <path class="bwave__line bwave__line--y" transform="translate(0 6)" d="M0,58 C80,48 180,48 300,64 C520,92 700,76 900,52 C1080,32 1260,82 1440,56" />
    <path class="bwave__line bwave__line--r" transform="translate(0 12)" d="M0,58 C80,48 180,48 300,64 C520,92 700,76 900,52 C1080,32 1260,82 1440,56" />
  </svg>`;
  ['.about', '.sectors', '.process', '.stamps', '.contact'].forEach((sel) => {
    const el = $(sel); if (el) el.insertAdjacentHTML('afterbegin', svg(sel === '.contact'));
  });
  // scroll gauge
  const g = $('.gauge'), pct = $('.gauge__pct');
  const upd = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? clamp(scrollY / max, 0, 1) : 0;
    g.style.setProperty('--sp', p.toFixed(3));
    pct.textContent = Math.round(p * 100) + '%';
    g.classList.toggle('on', scrollY > innerHeight * 0.6);
  };
  addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
})();
