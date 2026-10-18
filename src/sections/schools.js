import { site } from '../config/site.js';
import { icon } from '../lib/icons.js';

const offsets = ['', 'sm:ms-8', 'sm:ms-16'];

/** Serveis de reforç i idiomes per a escoles i centres. */
export function renderSchools() {
  const cards = site.schoolServices
    .map(
      (s, i) => `
      <article class="reveal spotlight group flex gap-4 rounded-3xl bg-white p-5 shadow-lg shadow-brand-900/5 ring-1 ring-sun-300/60 transition duration-300 hover:-translate-y-1 sm:p-6 ${offsets[i % 3]}" style="--reveal-delay:${i * 120}ms">
        <span class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-sun-200 text-brand-800 transition duration-300 group-hover:-rotate-6 group-hover:scale-110">${icon(s.icon, 'size-6')}</span>
        <div>
          <h3 class="text-lg font-extrabold text-brand-800" data-i18n="schools.items.${s.id}.title"></h3>
          <p class="mt-1 text-brand-700/85" data-i18n="schools.items.${s.id}.text"></p>
        </div>
      </article>`,
    )
    .join('');

  return `
  <section id="schools" class="section overflow-hidden bg-sun-100">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="absolute -end-16 -top-16 size-72 rounded-full bg-sun-300/50"></div>
      <div class="absolute -bottom-20 -start-16 size-64 rounded-full bg-blush-300/50"></div>
      <span class="absolute end-6 bottom-4 text-brand-900/5">${icon('school', 'size-48 sm:size-64')}</span>
    </div>
    <div class="container-page relative grid items-center gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
      <div>
        <p class="reveal eyebrow !bg-white/80">${icon('school', 'size-4')}<span data-i18n="schools.eyebrow"></span></p>
        <h2 class="reveal section-title" style="--reveal-delay:80ms" data-i18n="schools.title"></h2>
        <p class="reveal section-lead" style="--reveal-delay:160ms" data-i18n="schools.lead"></p>
        <a href="#contact" data-subject="school" class="reveal btn btn-primary mt-7" style="--reveal-delay:240ms"><span data-i18n="schools.cta"></span>${icon('arrow-right', 'size-5 rtl:rotate-180')}</a>
      </div>
      <div class="space-y-4">${cards}</div>
    </div>
  </section>`;
}
