import { site } from '../config/site.js';
import { icon } from '../lib/icons.js';
import { wordmark } from '../components/wordmark.js';
import { t } from '../i18n/index.js';

// Converses decoratives (no es tradueixen: mostren la diversitat d'idiomes).
const bubbles = [
  { who: 'them', text: 'Bon dia! Com estàs?', lang: 'ca', dir: 'ltr' },
  { who: 'me', text: '¡Muy bien, gracias!', lang: 'es', dir: 'ltr' },
  { who: 'them', text: 'Welcome! Nice to meet you.', lang: 'en', dir: 'ltr' },
  { who: 'me', text: 'شكرًا لكم!', lang: 'ar', dir: 'rtl' },
];

const pathTones = {
  pink: 'from-blush-300 to-blush-200 text-brand-900',
  green: 'from-brand-600 to-brand-800 text-white',
  sun: 'from-sun-300 to-sun-200 text-brand-900',
};

export function renderHero() {
  const chat = bubbles
    .map(
      (b, i) => `
      <div class="chat-bubble flex ${b.who === 'me' ? 'justify-end' : 'justify-start'}" style="--d:${i * 1.7}s">
        <p lang="${b.lang}" dir="${b.dir}" class="max-w-[85%] rounded-3xl px-4 py-2.5 text-base font-bold sm:px-5 sm:py-3 ${
          b.who === 'me'
            ? 'rounded-ee-md bg-brand-600 text-white'
            : 'rounded-es-md bg-white text-brand-900 shadow-md shadow-brand-900/5 ring-1 ring-brand-100'
        }">${b.text}</p>
      </div>`,
    )
    .join('');

  const paths = site.paths
    .map(
      (p, i) => `
      <div class="reveal" style="--reveal-delay:${300 + i * 110}ms">
        <a href="${p.href}" class="group flex h-full items-center gap-4 rounded-3xl bg-gradient-to-br ${pathTones[p.tone]} p-4 shadow-lg shadow-brand-900/10 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-5">
          <span class="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/30 transition duration-300 group-hover:-rotate-6 group-hover:scale-110">${icon(p.icon, 'size-7')}</span>
          <span class="min-w-0 flex-1">
            <span class="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span class="text-lg font-extrabold" data-i18n="hero.paths.${p.id}.title"></span>
              <span class="rounded-full bg-white/35 px-2.5 py-0.5 text-xs font-extrabold" data-i18n="hero.paths.${p.id}.tag"></span>
            </span>
            <span class="mt-0.5 block text-sm opacity-90" data-i18n="hero.paths.${p.id}.text"></span>
          </span>
          ${icon('arrow-right', 'size-5 shrink-0 transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1')}
        </a>
      </div>`,
    )
    .join('');

  return `
  <section id="home" class="relative isolate overflow-hidden bg-gradient-to-b from-blush-50 via-white to-white">
    <!-- Fons viu: taques de color i trama de punts -->
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div class="animate-blob absolute -top-24 -start-24 size-80 rounded-full bg-blush-300/55 blur-3xl sm:size-[28rem]"></div>
      <div class="animate-blob-slow absolute top-1/3 -end-32 size-80 rounded-full bg-brand-200/70 blur-3xl sm:size-[30rem]"></div>
      <div class="animate-blob absolute -bottom-24 start-1/3 size-72 rounded-full bg-sun-200/60 blur-3xl"></div>
      <div class="dots absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"></div>
    </div>

    <div class="container-page grid items-center gap-12 pt-8 pb-10 sm:pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pt-16 lg:pb-14">
      <div>
        <p class="reveal eyebrow" data-reveal="fade">
          <span class="relative flex size-2.5"><span class="absolute inline-flex size-full animate-ping rounded-full bg-blush-500 opacity-70"></span><span class="relative inline-flex size-2.5 rounded-full bg-blush-500"></span></span>
          <span data-i18n="hero.badge"></span>
        </p>

        <h1 class="reveal mt-5 text-[2.15rem] leading-[1.1] font-extrabold tracking-tight text-brand-800 sm:text-5xl lg:text-6xl" style="--reveal-delay:100ms">
          <span data-i18n="hero.lead"></span>
          <span class="mt-1 block"><span class="rotator" data-rotator></span></span>
        </h1>

        <p class="reveal mt-5 max-w-xl text-base text-brand-700/85 sm:text-xl" style="--reveal-delay:200ms" data-i18n="hero.subtitle"></p>

        <div class="reveal mt-7 flex flex-wrap gap-3" style="--reveal-delay:300ms">
          <a href="#contact" class="btn btn-primary"><span data-i18n="hero.ctaPrimary"></span>${icon('arrow-right', 'size-5 rtl:rotate-180')}</a>
          <a href="#programs" class="btn btn-outline" data-i18n="hero.ctaSecondary"></a>
        </div>

        <ul class="reveal mt-7 flex flex-wrap gap-2" style="--reveal-delay:400ms">
          <li class="chip">${icon('laptop', 'size-3.5 text-blush-600')}<span data-i18n="hero.chips.welcome"></span></li>
          <li class="chip">${icon('graduation-cap', 'size-3.5 text-blush-600')}<span data-i18n="hero.chips.levels"></span></li>
          <li class="chip">${icon('school', 'size-3.5 text-blush-600')}<span data-i18n="hero.chips.local"></span></li>
        </ul>
      </div>

      <!-- Il·lustració en codi: xat multilingüe + segell giratori -->
      <div class="reveal relative mx-auto w-full max-w-sm sm:max-w-md" data-reveal="zoom" style="--reveal-delay:250ms" aria-hidden="true">
        <div class="absolute inset-0 rotate-6 rounded-[2.25rem] bg-blush-300/70"></div>
        <div class="absolute inset-0 -rotate-3 rounded-[2.25rem] bg-brand-500/90"></div>

        <div class="relative rounded-[2.25rem] bg-gradient-to-b from-white to-blush-50 p-4 shadow-2xl shadow-brand-900/20 ring-1 ring-brand-100 sm:p-7">
          <div class="flex items-center gap-3 border-b border-brand-100 pb-4">
            <img src="${import.meta.env.BASE_URL}logo.svg" alt="" class="size-11 sm:size-12" width="48" height="48" />
            <div>
              ${wordmark({ cls: 'text-lg' })}
              <p class="text-sm text-brand-600" data-i18n="hero.card.text"></p>
            </div>
          </div>
          <div class="space-y-3 py-5 sm:space-y-3.5 sm:py-6">${chat}</div>
          <div class="typing flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-3 shadow ring-1 ring-brand-100"><span></span><span></span><span></span></div>
        </div>

        <div class="animate-float absolute -top-4 -end-2 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm font-extrabold text-brand-800 shadow-xl ring-1 ring-brand-100 sm:-end-8 sm:px-4 sm:py-2.5">
          <span class="flex size-8 items-center justify-center rounded-xl bg-brand-100 text-brand-700">${icon('graduation-cap', 'size-4')}</span><span data-i18n="hero.float.f1"></span>
        </div>

        <!-- Segell giratori "online" -->
        <div class="absolute -bottom-8 -start-3 size-24 sm:-start-10 sm:size-32">
          <div class="relative size-full rounded-full bg-sun-300 text-brand-900 shadow-xl">
            <svg viewBox="0 0 120 120" class="animate-spin-slow absolute inset-0 size-full">
              <defs><path id="sticker-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
              <text font-size="12" font-weight="800" fill="currentColor"><textPath href="#sticker-circle" textLength="283" lengthAdjust="spacing">CLASSES ONLINE • ONLINE CLASSES • CLASES ONLINE •</textPath></text>
            </svg>
            <span class="absolute inset-0 flex items-center justify-center">${icon('laptop', 'size-7 sm:size-9')}</span>
          </div>
        </div>

        <div class="animate-float-slow absolute -bottom-4 end-4 flex items-center gap-2 rounded-2xl bg-brand-900 px-3 py-2 text-sm font-extrabold text-white shadow-xl sm:px-4 sm:py-2.5">
          ${icon('map-pin', 'size-4 text-blush-300')}<span data-i18n="hero.float.f3"></span>
        </div>
      </div>
    </div>

    <div class="container-page pb-10 sm:pb-14">
      <div class="grid gap-3 sm:gap-4 md:grid-cols-3">${paths}</div>
    </div>
  </section>`;
}

/** Paraula rotatòria del títol: es reconstrueix quan canvia l'idioma. */
export function initHero() {
  const box = document.querySelector('[data-rotator]');
  if (!box) return;
  let timer;
  let current = 0;

  const build = () => {
    clearInterval(timer);
    const words = t('hero.words').split('|').filter(Boolean);
    current = 0;
    box.innerHTML = words
      .map(
        (w, i) =>
          `<span class="rotator-word" data-state="${i === 0 ? 'in' : ''}" aria-hidden="${i !== 0}"><span class="marker text-brand-600">${w}</span></span>`,
      )
      .join('');
    if (words.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const els = [...box.children];
    timer = setInterval(() => {
      const prev = els[current];
      current = (current + 1) % els.length;
      const next = els[current];
      prev.dataset.state = 'out';
      prev.setAttribute('aria-hidden', 'true');
      next.dataset.state = 'in';
      next.setAttribute('aria-hidden', 'false');
      // Deixa la paraula anterior preparada per tornar a entrar per sota.
      setTimeout(() => {
        if (prev !== els[current]) prev.dataset.state = '';
      }, 700);
    }, 2800);
  };

  build();
  document.addEventListener('languagechange', build);
}
