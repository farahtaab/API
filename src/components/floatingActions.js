import { brandIcon, icon } from '../lib/icons.js';

/** Botons flotants: WhatsApp (sempre) i "tornar a dalt" (apareix en fer scroll). */
export function renderFloatingActions() {
  return `
  <div class="fixed bottom-5 end-5 z-40 flex flex-col items-center gap-3">
    <button type="button" data-back-to-top hidden data-i18n-aria-label="nav.top" data-i18n-title="nav.top"
      class="inline-flex size-11 items-center justify-center rounded-full bg-white text-brand-700 shadow-lg shadow-brand-900/20 ring-1 ring-brand-100 transition hover:bg-blush-100">
      ${icon('arrow-up', 'size-5')}
    </button>
    <a data-whatsapp href="#" target="_blank" rel="noopener noreferrer"
      data-i18n-aria-label="whatsapp.label" data-i18n-title="whatsapp.label"
      class="inline-flex size-14 items-center justify-center rounded-full bg-green-700 text-white shadow-xl shadow-green-900/30 transition hover:scale-110 hover:bg-green-800 sm:size-16">
      ${brandIcon('whatsapp', 'size-7 sm:size-8')}
    </a>
  </div>`;
}

export function initBackToTop() {
  const btn = document.querySelector('[data-back-to-top]');
  if (!btn) return;
  const update = () => {
    btn.hidden = window.scrollY < 600;
  };
  window.addEventListener('scroll', update, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  update();
}
