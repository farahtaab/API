import { site } from '../config/site.js';
import { icon } from '../lib/icons.js';

export function renderFaq() {
  const items = site.faq
    .map(
      (id, i) => `
      <details class="reveal group rounded-3xl border border-brand-100 bg-white shadow-sm transition open:border-brand-300 open:shadow-lg open:shadow-brand-900/5" style="--reveal-delay:${i * 60}ms">
        <summary class="flex cursor-pointer list-none items-center justify-between gap-4 rounded-3xl px-6 py-5 text-start text-lg font-extrabold text-brand-800 marker:content-none [&::-webkit-details-marker]:hidden">
          <span data-i18n="faq.items.${id}.q"></span>
          <span class="faq-chevron flex size-9 shrink-0 items-center justify-center rounded-full bg-blush-200 text-brand-700 transition duration-300 group-open:bg-brand-600 group-open:text-white">${icon('chevron-down', 'size-5')}</span>
        </summary>
        <p class="px-6 pb-6 text-brand-700/90" data-i18n="faq.items.${id}.a"></p>
      </details>`,
    )
    .join('');

  return `
  <section id="faq" class="section bg-brand-50">
    <div class="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
      <div class="lg:sticky lg:top-28 lg:self-start">
        <p class="reveal eyebrow" data-i18n="faq.eyebrow"></p>
        <h2 class="reveal section-title" style="--reveal-delay:80ms" data-i18n="faq.title"></h2>
        <p class="reveal section-lead" style="--reveal-delay:160ms" data-i18n="faq.lead"></p>
        <a href="#contact" class="reveal btn btn-soft mt-7" style="--reveal-delay:220ms"><span data-i18n="faq.cta"></span>${icon('arrow-right', 'size-5 rtl:rotate-180')}</a>
      </div>
      <div class="space-y-3">${items}</div>
    </div>
  </section>`;
}
