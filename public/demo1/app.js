/* V's Home Care — concept demo
   Content data lives at the top; UI wiring below. No data is sent or stored. */

/* ================= CONTENT ================= */
const SERVICES = [
  {
    id: 'personal',
    title: 'Personal Care',
    icon: 'i-heart',
    img: 'img/personal.webp',
    alt: 'A caregiver in scrubs smiles at an older man seated in a wheelchair',
    short: 'Support with everyday personal activities while preserving comfort, dignity, and independence.',
    summary: 'Gentle, respectful help with the daily routines that keep a person comfortable and confident at home.',
    includes: ['Help with bathing, grooming and dressing', 'Mobility and transfer support', 'Encouragement with daily routines', 'Companionship and conversation'],
  },
  {
    id: 'nursing',
    title: 'Nursing Visits',
    icon: 'i-steth',
    img: 'img/nursing.webp',
    alt: 'A smiling caregiver stands behind an older woman in a wheelchair with her hands on her shoulders',
    short: 'Home-based nursing services according to individual needs, applicable clinical requirements, and service availability.',
    summary: "Authorized nurse visits at home, arranged around each person's needs and the clinical requirements that apply.",
    includes: ['Authorized RN visits at home', 'Medication box set-up (for example, an RN filling a weekly medicine box)', 'Check-ins and communication with the family', 'Other nursing support as authorized'],
  },
  {
    id: 'respite',
    title: 'Respite Care',
    icon: 'i-coffee',
    img: 'img/family.webp',
    alt: 'An older man, a caregiver and an elderly woman smile together outdoors',
    short: 'Support for family caregivers who need time to rest, attend to personal responsibilities, or recharge.',
    summary: 'Caring for someone you love is meaningful — and tiring. Respite care gives family caregivers time to rest and recharge.',
    includes: ['Short-term relief for family caregivers', 'Familiar routines kept in place', 'Companionship while you are away', 'Scheduling discussed with your family'],
  },
  {
    id: 'homemaker',
    title: 'Homemaker Services',
    icon: 'i-spark',
    img: null,
    alt: '',
    short: 'Assistance with household tasks to help maintain a comfortable and organized home environment.',
    summary: 'Homemaker and chore help that keeps the home clean, calm and comfortable to live in.',
    includes: ['Light cleaning and tidying', 'Cooking and simple meal preparation', 'Laundry', 'Companionship during visits'],
  },
];

const FAQS = [
  ['What services does V\'s provide?', 'V\'s offers personal care, nursing visits, respite care and homemaker services (such as cleaning, cooking, laundry and companionship). The services available to each person depend on their needs, eligibility and authorization.'],
  ['Does V\'s accept Missouri Medicaid?', 'V\'s identifies as a Medicaid-approved provider for certain home care services. Coverage depends on the program and the person\'s eligibility, so please call us and we\'ll help you check what applies.'],
  ['Which communities does V\'s serve?', 'We\'re based in Springfield, Missouri and serve nearby communities including Republic and the wider Ozarks area. Use the ZIP checker above or call us to confirm coverage for your address.'],
  ['Can I arrange care for a family member?', 'Yes. Many families reach out on behalf of a parent, spouse or relative. We\'ll talk with you, and with your loved one, about their needs and wishes.'],
  ['How do I get started?', 'Call (417) 434-3554 or send a request using the form on this page. We\'ll discuss your needs, explain the options, and walk you through the next steps.'],
  ['Is nursing care available in my home?', 'V\'s provides authorized nurse visits at home — for example, an RN setting up a medication box. What\'s available depends on individual needs, clinical requirements and authorization. Call us to discuss your situation.'],
  ['How can I discuss payment and eligibility?', 'The easiest way is a phone call to (417) 434-3554, or email vshomeinfocare@gmail.com. Please don\'t send medical details by email — we\'ll discuss them privately.'],
];

/* ================= HELPERS ================= */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const icon = (id) => `<svg class="ic" aria-hidden="true"><use href="#${id}"/></svg>`;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ================= RENDER ================= */
$('#service-cards').innerHTML = SERVICES.map((s) => `
  <article class="card reveal">
    <div class="card__img">
      ${s.img ? `<img src="${s.img}" alt="${s.alt}" loading="lazy" width="1024" height="683" />` : `<div class="card__art">${icon(s.icon)}</div>`}
      <span class="card__icon">${icon(s.icon)}</span>
    </div>
    <div class="card__body">
      <h3>${s.title}</h3>
      <p>${s.short}</p>
      <div class="card__actions">
        <button class="btn btn--ghost" type="button" data-open-service="${s.id}" aria-haspopup="dialog">Learn More</button>
        <button class="btn btn--primary" type="button" data-ask-service="${s.id}">Ask About This Service</button>
      </div>
    </div>
  </article>`).join('');

$('#faq-list').innerHTML = FAQS.map(([q, a], i) => `
  <div class="acc">
    <h3 style="margin:0"><button class="acc__btn" type="button" id="faq-b${i}" aria-expanded="false" aria-controls="faq-p${i}">${q}${icon('i-chev')}</button></h3>
    <div class="acc__panel" id="faq-p${i}" role="region" aria-labelledby="faq-b${i}" hidden><div><p>${a}</p></div></div>
  </div>`).join('');

$('#year').textContent = new Date().getFullYear();

/* ================= NAV ================= */
const nav = $('.nav');
const menu = $('#nav-menu');
const burger = $('.nav__burger');

const setMenu = (open) => {
  menu.classList.toggle('is-open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
};
burger.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); burger.focus(); } });

const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 24);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Active-section highlight
const links = $$('.nav__links > a[href^="#"]');
const spy = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
links.forEach((l) => { const t = $(l.getAttribute('href')); if (t) spy.observe(t); });

/* ================= REVEAL ================= */
if (!reduceMotion && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 70}ms`; io.observe(el); });
} else {
  $$('.reveal').forEach((el) => el.classList.add('in'));
}

/* ================= FORM FOCUS / PRESELECT ================= */
const form = $('#care-form');
const goToForm = (serviceId) => {
  if (!$('#f-name')) { $('#contact').scrollIntoView(); return; }
  if (serviceId) $('#f-service').value = serviceId;
  $('#contact').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  setTimeout(() => $('#f-name').focus({ preventScroll: true }), reduceMotion ? 0 : 600);
};
document.addEventListener('click', (e) => {
  const rc = e.target.closest('[data-request-care]');
  if (rc) { e.preventDefault(); setMenu(false); goToForm(); return; }
  const ask = e.target.closest('[data-ask-service]');
  if (ask) { closeModals(); goToForm(ask.dataset.askService); return; }
  const cov = e.target.closest('[data-ask-coverage]');
  if (cov) { e.preventDefault(); goToForm('coverage'); return; }
  const open = e.target.closest('[data-open-service]');
  if (open) { openService(open.dataset.openService); return; }
  if (e.target.closest('[data-careers]')) { $('#careers-modal').showModal(); return; }
  if (e.target.closest('[data-review-toggle]')) { toggleReview(); }
});

/* ================= SERVICE MODAL ================= */
const modal = $('#service-modal');
let currentService = null;
function openService(id) {
  const s = SERVICES.find((x) => x.id === id);
  if (!s) return;
  currentService = id;
  const img = $('#modal-img');
  img.parentElement.hidden = !s.img;
  if (s.img) { img.src = s.img; img.alt = s.alt; }
  $('#modal-title').textContent = s.title;
  $('#modal-summary').textContent = s.summary;
  $('#modal-list').innerHTML = s.includes.map((x) => `<li>${icon('i-check')}<span>${x}</span></li>`).join('');
  $('#modal-note').textContent = 'Availability depends on individual needs, eligibility, authorization and staffing. Not every service is available to every person — contact us to confirm.';
  modal.showModal();
}
$('#modal-ask').addEventListener('click', () => { modal.close(); goToForm(currentService); });
function closeModals() { $$('dialog[open]').forEach((d) => d.close()); }
$$('dialog').forEach((d) => {
  d.addEventListener('click', (e) => { if (e.target === d || e.target.closest('[data-close]')) d.close(); });
});

/* ================= REVIEW MODE ================= */
function toggleReview() {
  const on = document.body.classList.toggle('is-review');
  $$('.review-toggle').forEach((b) => b.setAttribute('aria-pressed', String(on)));
  if (on) { const first = $('[data-verify]'); first && first.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' }); }
}

/* ================= FAQ ================= */
$('#faq-list').addEventListener('click', (e) => {
  const btn = e.target.closest('.acc__btn');
  if (!btn) return;
  const item = btn.closest('.acc');
  const panel = $('#' + btn.getAttribute('aria-controls'));
  const open = btn.getAttribute('aria-expanded') !== 'true';
  btn.setAttribute('aria-expanded', String(open));
  if (open) { panel.hidden = false; requestAnimationFrame(() => item.classList.add('is-open')); }
  else { item.classList.remove('is-open'); setTimeout(() => { if (btn.getAttribute('aria-expanded') === 'false') panel.hidden = true; }, reduceMotion ? 0 : 350); }
});

/* ================= ZIP CHECKER ================= */
const ZIP_RE = /^\d{5}$/;
$('#zip-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = $('#zip-input');
  const msg = $('#zip-msg');
  const zip = input.value.trim();
  msg.className = 'zip__msg';
  if (!ZIP_RE.test(zip)) {
    msg.classList.add('is-err');
    msg.textContent = 'Please enter a valid five-digit ZIP code.';
    input.setAttribute('aria-invalid', 'true');
    input.focus();
    return;
  }
  input.removeAttribute('aria-invalid');
  const n = Number(zip.slice(0, 3));
  // Preliminary hint only — never a coverage promise.
  if (n >= 656 && n <= 658) {
    msg.classList.add('is-ok');
    msg.innerHTML = `${zip} is in southwest Missouri, near our Springfield base. <strong>Coverage still needs to be confirmed</strong> — <a href="#contact" data-zip-ask="${zip}">ask us about ${zip}</a>.`;
  } else if (n >= 630 && n <= 658) {
    msg.classList.add('is-warn');
    msg.innerHTML = `${zip} is a Missouri ZIP code that may be outside our main area. Please <a href="tel:+14174343554">call us</a> and we'll let you know.`;
  } else {
    msg.classList.add('is-warn');
    msg.textContent = `${zip} appears to be outside Missouri. V's serves the Springfield, MO area — call us if you're arranging care for someone nearby.`;
  }
});
$('#zip-input').addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 5); });
$('#zip-msg').addEventListener('click', (e) => {
  const a = e.target.closest('[data-zip-ask]');
  if (!a) return;
  e.preventDefault();
  $('#f-zip').value = a.dataset.zipAsk;
  goToForm();
});

/* ================= CONSULTATION FORM ================= */
const RULES = {
  name: (v) => (v.trim().length >= 2 ? '' : 'Please enter your full name.'),
  phone: (v) => (/^\D*(\+?1)?\D*\d{3}\D*\d{3}\D*\d{4}\D*$/.test(v) ? '' : 'Please enter a valid 10-digit US phone number.'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Please enter a valid email address.'),
  zip: (v) => (ZIP_RE.test(v.trim()) ? '' : 'Please enter a five-digit ZIP code.'),
  who: (v) => (v ? '' : 'Please tell us who needs care.'),
  service: (v) => (v ? '' : 'Please choose a type of care.'),
  consent: (_, el) => (el.checked ? '' : 'Please agree to be contacted so we can reply.'),
};

function validateField(el) {
  const rule = RULES[el.name];
  if (!rule) return true;
  const err = rule(el.value, el);
  const box = $('#e-' + el.name);
  const field = el.closest('.field');
  box.textContent = err;
  field.classList.toggle('has-err', !!err);
  if (err) { el.setAttribute('aria-invalid', 'true'); el.setAttribute('aria-describedby', box.id); }
  else { el.removeAttribute('aria-invalid'); }
  return !err;
}

$('#f-zip').addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 5); });
form.addEventListener('focusout', (e) => { if (e.target.name in RULES && e.target.value) validateField(e.target); });
form.addEventListener('input', (e) => { if (e.target.closest('.has-err')) validateField(e.target); });
form.addEventListener('change', (e) => { if (e.target.type === 'checkbox' || e.target.tagName === 'SELECT') validateField(e.target); });

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const status = $('.form__status', form);
  const fields = Object.keys(RULES).map((n) => form.elements[n]);
  const bad = fields.filter((el) => !validateField(el));
  if (bad.length) {
    status.className = 'form__status is-err';
    status.textContent = `Please fix ${bad.length} field${bad.length > 1 ? 's' : ''} highlighted above.`;
    bad[0].focus();
    return;
  }
  status.className = 'form__status';
  status.textContent = 'Submitting…';
  const btn = $('button[type=submit]', form);
  btn.disabled = true;
  btn.classList.add('is-loading');
  $('.btn__label', btn).textContent = 'Sending…';

  // MOCK submission — nothing leaves the browser.
  setTimeout(() => {
    const first = form.elements.name.value.trim().split(/\s+/)[0];
    form.reset();
    form.innerHTML = `
      <div class="form__success" tabindex="-1">
        <div class="tick">${icon('i-check')}</div>
        <h3 class="h3">Thank you, ${first.replace(/[<>&"]/g, '')}.</h3>
        <p><strong>Demo only:</strong> this form isn't connected yet, so your inquiry was <strong>not</strong> sent to V's and nothing was stored.</p>
        <p class="muted">To reach the team today, please call or email directly.</p>
        <div class="btn-row" style="justify-content:center">
          <a class="btn btn--primary" href="tel:+14174343554">${icon('i-phone')} Call Us</a>
          <a class="btn btn--ghost" href="mailto:vshomeinfocare@gmail.com">${icon('i-mail')} Email Us</a>
        </div>
      </div>`;
    $('.form__success', form).focus();
  }, 1400);
});
