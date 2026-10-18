import { site } from '../config/site.js';
import { icon } from '../lib/icons.js';

/** "El camí": 4 etapes en una línia de temps que s'omple en fer scroll. */
export function renderJourney() {
  const items = site.journey
    .map(
      (j, i) => `
      <li class="relative ps-20 lg:ps-0 lg:pt-20">
        <span class="journey-node absolute start-0 top-0 flex size-14 items-center justify-center rounded-full bg-blush-300 text-brand-900 shadow-lg shadow-black/20 ring-8 ring-brand-900" style="--d:${0.5 + i * 0.45}s">${icon(j.icon, 'size-6')}</span>
        <p class="text-sm font-extrabold tracking-widest text-blush-300" dir="ltr">0${i + 1}</p>
        <h3 class="mt-1 text-2xl font-extrabold text-white" data-i18n="journey.items.${j.id}.title"></h3>
        <p class="mt-3 text-brand-100" data-i18n="journey.items.${j.id}.text"></p>
      </li>`,
    )
    .join('');

  return `
  <section id="journey" class="section overflow-hidden bg-brand-900 text-white">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="dots-light absolute inset-0 opacity-50"></div>
      <div class="animate-blob absolute -top-32 start-1/4 size-96 rounded-full bg-blush-300/15 blur-3xl"></div>
      <div class="animate-blob-slow absolute -bottom-32 end-0 size-96 rounded-full bg-brand-500/30 blur-3xl"></div>
    </div>
    <div class="container-page relative">
      <div class="mx-auto max-w-3xl text-center">
        <p class="reveal eyebrow eyebrow-dark" data-i18n="journey.eyebrow"></p>
        <h2 class="reveal section-title !text-white" style="--reveal-delay:80ms" data-i18n="journey.title"></h2>
        <p class="reveal section-lead mx-auto !text-brand-100" style="--reveal-delay:160ms" data-i18n="journey.lead"></p>
      </div>

      <ol class="reveal relative mt-12 grid gap-10 lg:grid-cols-4 lg:gap-8" data-reveal="fade">
        <span class="absolute inset-y-0 start-7 w-0.5 -translate-x-1/2 rounded bg-white/15 lg:inset-y-auto lg:start-0 lg:top-7 lg:h-0.5 lg:w-full lg:translate-x-0" aria-hidden="true">
          <span class="journey-fill absolute inset-0 rounded bg-gradient-to-b from-blush-300 to-sun-300 lg:bg-gradient-to-r"></span>
        </span>
        ${items}
      </ol>
    </div>
  </section>`;
}
