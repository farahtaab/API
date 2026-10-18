import { site } from '../config/site.js';
import { icon } from '../lib/icons.js';

const tones = {
  dark: { card: 'bg-gradient-to-br from-brand-600 to-brand-800 text-white', title: 'text-white', text: 'text-brand-100', badge: 'bg-white/15 text-white', tag: 'bg-white/15 text-white ring-white/20', num: 'text-white/10' },
  pink: { card: 'bg-blush-300', title: 'text-brand-900', text: 'text-brand-800/85', badge: 'bg-white/60 text-brand-800', tag: 'bg-white/60 text-brand-800 ring-white/50', num: 'text-brand-900/10' },
  mint: { card: 'bg-brand-100', title: 'text-brand-800', text: 'text-brand-700/90', badge: 'bg-white/70 text-brand-700', tag: 'bg-white/70 text-brand-700 ring-brand-200', num: 'text-brand-900/10' },
  sun: { card: 'bg-sun-200', title: 'text-brand-900', text: 'text-brand-800/85', badge: 'bg-white/60 text-brand-800', tag: 'bg-white/60 text-brand-800 ring-white/50', num: 'text-brand-900/10' },
};

export function renderPrograms() {
  const cards = site.programs
    .map((p, i) => {
      const c = tones[p.tone];
      const tags = [
        ...p.for.map((f) => `<span class="rounded-full px-3 py-1 text-xs font-extrabold ring-1 ${c.tag}" data-i18n="programs.for.${f}"></span>`),
        ...(p.online
          ? [`<span class="inline-flex items-center gap-1.5 rounded-full bg-brand-900 px-3 py-1 text-xs font-extrabold text-white">${icon('wifi', 'size-3.5')}<span data-i18n="programs.online"></span></span>`]
          : []),
      ].join('');
      return `
      <article class="reveal spotlight group relative flex flex-col overflow-hidden rounded-[1.75rem] p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-900/15 sm:p-8 ${p.span} ${c.card}" style="--reveal-delay:${(i % 2) * 100}ms">
        <span class="pointer-events-none absolute -top-5 -end-1 text-[7rem] leading-none font-extrabold select-none sm:text-[8rem] ${c.num}" dir="ltr" aria-hidden="true">0${i + 1}</span>
        <span class="relative inline-flex size-14 items-center justify-center rounded-2xl transition duration-300 group-hover:-rotate-6 group-hover:scale-110 ${c.badge}">${icon(p.icon, 'size-7')}</span>
        <h3 class="relative mt-5 text-xl font-extrabold sm:text-2xl ${c.title}" data-i18n="programs.items.${p.id}.title"></h3>
        <p class="relative mt-3 max-w-xl ${c.text}" data-i18n="programs.items.${p.id}.text"></p>
        <div class="relative mt-5 flex flex-wrap gap-2 pt-1">${tags}</div>
      </article>`;
    })
    .join('');

  return `
  <section id="programs" class="section bg-brand-50">
    <div class="container-page">
      <div class="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div class="max-w-2xl">
          <p class="reveal eyebrow" data-i18n="programs.eyebrow"></p>
          <h2 class="reveal section-title" style="--reveal-delay:80ms" data-i18n="programs.title"></h2>
          <p class="reveal section-lead" style="--reveal-delay:160ms" data-i18n="programs.lead"></p>
        </div>
        <a href="#contact" class="reveal btn btn-primary shrink-0 self-start lg:self-auto" style="--reveal-delay:200ms"><span data-i18n="programs.cta"></span>${icon('arrow-right', 'size-5 rtl:rotate-180')}</a>
      </div>
      <div class="mt-9 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-6">${cards}</div>
    </div>
  </section>`;
}
