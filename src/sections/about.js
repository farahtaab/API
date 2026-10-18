import { site } from '../config/site.js';
import { icon } from '../lib/icons.js';

export function renderAbout() {
  const points = ['p1', 'p2', 'p3']
    .map(
      (p, i) => `
      <li class="reveal flex items-start gap-3" style="--reveal-delay:${i * 100}ms">
        <span class="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">${icon('check', 'size-4')}</span>
        <span class="font-semibold text-brand-800" data-i18n="about.points.${p}"></span>
      </li>`,
    )
    .join('');

  const values = site.values
    .map(
      (v, i) => `
      <article class="reveal card spotlight group" style="--reveal-delay:${i * 100}ms">
        <span class="icon-badge transition duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white">${icon(v.icon, 'size-6')}</span>
        <h3 class="mt-4 text-lg font-extrabold text-brand-800" data-i18n="about.values.${v.id}.title"></h3>
        <p class="mt-2 text-brand-700/85" data-i18n="about.values.${v.id}.text"></p>
      </article>`,
    )
    .join('');

  return `
  <section id="about" class="section overflow-hidden bg-white">
    <div class="pointer-events-none absolute -start-32 top-20 size-80 rounded-full bg-blush-100 blur-3xl" aria-hidden="true"></div>
    <div class="container-page relative">
      <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <p class="reveal eyebrow" data-i18n="about.eyebrow"></p>
          <h2 class="reveal section-title" style="--reveal-delay:80ms" data-i18n="about.title"></h2>
          <p class="reveal mt-5 text-lg text-brand-700/90" style="--reveal-delay:160ms" data-i18n="about.text1"></p>
          <p class="reveal mt-4 text-lg text-brand-700/90" style="--reveal-delay:220ms" data-i18n="about.text2"></p>
          <ul class="mt-7 space-y-3">${points}</ul>
        </div>

        <figure class="reveal relative" data-reveal="zoom">
          <div class="absolute -top-8 -end-8 size-40 animate-spin-slow rounded-full border-2 border-dashed border-blush-400/70" aria-hidden="true"></div>
          <div class="absolute -bottom-6 -start-6 size-28 rounded-full bg-sun-300/80" aria-hidden="true"></div>
          <div class="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 p-8 text-white shadow-2xl shadow-brand-900/25 sm:p-12">
            <div class="dots-light absolute inset-0 opacity-60" aria-hidden="true"></div>
            <span class="relative flex size-14 items-center justify-center rounded-2xl bg-blush-300 text-brand-900">${icon('quote', 'size-7')}</span>
            <blockquote class="relative mt-6 text-2xl leading-snug font-extrabold text-balance sm:text-3xl" data-i18n="about.quote.text"></blockquote>
            <figcaption class="relative mt-6 flex items-center gap-3 text-sm font-bold text-blush-200">
              <span class="h-0.5 w-10 rounded bg-blush-300"></span><span data-i18n="about.quote.label"></span>
            </figcaption>
          </div>
        </figure>
      </div>

      <div class="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">${values}</div>
    </div>
  </section>`;
}
