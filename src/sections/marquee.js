import { site } from '../config/site.js';
import { icon } from '../lib/icons.js';

/** Franja animada amb la benvinguda en molts idiomes. */
export function renderMarquee() {
  const word = (w) => `
    <li class="flex items-center gap-8 pe-8 sm:gap-12 sm:pe-12">
      <span lang="${w.lang}" class="text-3xl font-extrabold tracking-tight text-brand-900 sm:text-5xl">${w.text}</span>
      <span class="text-brand-700/70">${icon('sparkles', 'size-6 sm:size-8')}</span>
    </li>`;
  const list = site.marquee.map(word).join('');

  return `
  <section id="marquee" class="marquee overflow-hidden bg-blush-300 py-5 sm:py-7" dir="ltr" data-i18n-aria-label="marquee.label" role="region">
    <ul class="marquee-track items-center" aria-hidden="true">${list}${list}</ul>
  </section>`;
}
