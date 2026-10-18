import { icon } from '../lib/icons.js';

// Participants decoratius de la "videotrucada" (només inicials).
const tiles = [
  { l: 'A', tone: 'from-blush-300 to-blush-400', d: 0 },
  { l: 'M', tone: 'from-brand-400 to-brand-600', d: 2 },
  { l: 'F', tone: 'from-sun-300 to-sun-400', d: 4 },
  { l: 'S', tone: 'from-brand-200 to-brand-300', d: 6 },
];

/** Classes online per a dones: finestra de videotrucada il·lustrada en codi. */
export function renderOnline() {
  const points = ['p1', 'p2', 'p3']
    .map(
      (p, i) => `
      <li class="reveal flex items-start gap-3" style="--reveal-delay:${i * 100}ms">
        <span class="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">${icon('check', 'size-4')}</span>
        <span class="font-semibold text-brand-800" data-i18n="online.points.${p}"></span>
      </li>`,
    )
    .join('');

  const grid = tiles
    .map(
      (t) => `
      <div class="tile-speaking relative flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br ${t.tone}" style="--d:${t.d}s">
        <span class="flex size-12 items-center justify-center rounded-full bg-white/75 text-2xl font-extrabold text-brand-800 sm:size-16" dir="ltr">${t.l}</span>
        <span class="absolute bottom-2 start-2 flex size-6 items-center justify-center rounded-full bg-black/30 text-white">${icon('mic', 'size-3')}</span>
      </div>`,
    )
    .join('');

  return `
  <section id="online" class="section overflow-hidden bg-blush-50">
    <div class="pointer-events-none absolute -start-24 top-1/3 size-80 rounded-full bg-blush-200/70 blur-3xl" aria-hidden="true"></div>
    <div class="container-page relative grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
      <div>
        <p class="reveal eyebrow">${icon('wifi', 'size-4')}<span data-i18n="online.eyebrow"></span></p>
        <h2 class="reveal section-title" style="--reveal-delay:80ms" data-i18n="online.title"></h2>
        <p class="reveal mt-4 text-lg text-brand-700/90" style="--reveal-delay:160ms" data-i18n="online.lead"></p>
        <ul class="mt-6 space-y-3">${points}</ul>
        <a href="#contact" data-subject="women" class="reveal btn btn-primary mt-8" style="--reveal-delay:300ms"><span data-i18n="online.cta"></span>${icon('arrow-right', 'size-5 rtl:rotate-180')}</a>
      </div>

      <div class="reveal relative mx-auto w-full max-w-lg" data-reveal="zoom" aria-hidden="true">
        <div class="absolute inset-0 rotate-3 rounded-[2rem] bg-blush-300"></div>
        <div class="relative rounded-[2rem] bg-brand-900 p-3 shadow-2xl shadow-brand-900/30 ring-1 ring-white/10 sm:p-4">
          <div class="flex items-center justify-between px-2 py-2 text-white">
            <div class="flex gap-1.5"><span class="size-3 rounded-full bg-red-400"></span><span class="size-3 rounded-full bg-sun-300"></span><span class="size-3 rounded-full bg-green-400"></span></div>
            <span class="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-extrabold"><span class="size-2 animate-pulse rounded-full bg-red-400"></span><span data-i18n="online.live"></span></span>
          </div>
          <div class="grid grid-cols-2 gap-2.5 p-1">${grid}</div>
          <div class="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-white/10 p-3 text-white">
            <p lang="ca" class="chat-bubble min-w-0 truncate rounded-full bg-white px-4 py-1.5 text-sm font-bold text-brand-900" style="--d:0s">Bon dia a totes!</p>
            <div class="flex shrink-0 gap-2">
              <span class="flex size-9 items-center justify-center rounded-full bg-white/15">${icon('mic', 'size-4')}</span>
              <span class="flex size-9 items-center justify-center rounded-full bg-white/15">${icon('video', 'size-4')}</span>
            </div>
          </div>
        </div>
        <div class="animate-float absolute -top-4 -end-2 flex items-center gap-2 rounded-2xl bg-sun-300 px-3 py-2 text-sm font-extrabold text-brand-900 shadow-xl sm:-end-6">
          ${icon('laptop', 'size-4')}<span data-i18n="programs.online"></span>
        </div>
      </div>
    </div>
  </section>`;
}
