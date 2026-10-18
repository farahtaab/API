import { site } from '../config/site.js';
import { icon } from '../lib/icons.js';

const tones = [
  'bg-gradient-to-br from-blush-300 to-blush-200 text-brand-900',
  'bg-gradient-to-br from-brand-600 to-brand-800 text-white',
  'bg-gradient-to-br from-sun-300 to-sun-200 text-brand-900',
];

export function renderHelp() {
  const cards = site.help
    .map((h, i) => {
      const dark = i === 1;
      return `
      <article class="reveal spotlight group flex flex-col rounded-[2rem] p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-900/15 ${tones[i % tones.length]}" style="--reveal-delay:${i * 120}ms">
        <span class="inline-flex size-14 items-center justify-center rounded-2xl ${dark ? 'bg-white/15' : 'bg-white/60'} transition duration-300 group-hover:rotate-6 group-hover:scale-110">${icon(h.icon, 'size-7')}</span>
        <h3 class="mt-6 text-2xl font-extrabold" data-i18n="help.items.${h.id}.title"></h3>
        <p class="mt-3 flex-1 ${dark ? 'text-brand-100' : 'text-brand-800/85'}" data-i18n="help.items.${h.id}.text"></p>
        <a href="#contact" data-subject="${h.subject}" class="mt-7 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 font-extrabold transition group-hover:gap-3 ${dark ? 'bg-white text-brand-800 hover:bg-blush-200' : 'bg-brand-900 text-white hover:bg-brand-700'}">
          <span data-i18n="help.items.${h.id}.cta"></span>${icon('arrow-right', 'size-4 rtl:rotate-180')}
        </a>
      </article>`;
    })
    .join('');

  return `
  <section id="help" class="section bg-blush-50">
    <div class="container-page">
      <div class="mx-auto max-w-3xl text-center">
        <p class="reveal eyebrow" data-i18n="help.eyebrow"></p>
        <h2 class="reveal section-title" style="--reveal-delay:80ms" data-i18n="help.title"></h2>
        <p class="reveal section-lead mx-auto" style="--reveal-delay:160ms" data-i18n="help.lead"></p>
      </div>
      <div class="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2 md:gap-6">${cards}</div>
    </div>
  </section>`;
}
