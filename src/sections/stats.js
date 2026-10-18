import { site } from '../config/site.js';

export function renderStats() {
  const items = site.stats.items
    .map(
      (s) => `
      <div class="reveal text-center">
        <p class="text-5xl font-extrabold text-blush-300" dir="ltr" data-count="${s.value}" data-suffix="${s.suffix}">${s.value}${s.suffix}</p>
        <p class="mt-2 text-sm font-bold text-brand-100" data-i18n="stats.items.${s.id}"></p>
      </div>`,
    )
    .join('');

  return `
  <section id="stats" class="bg-brand-700 py-16">
    <div class="container-page grid grid-cols-2 gap-8 lg:grid-cols-4">${items}</div>
  </section>`;
}
