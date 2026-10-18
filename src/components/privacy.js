import { site } from '../config/site.js';
import { icon } from '../lib/icons.js';

const SECTIONS = ['s1', 's2', 's3', 's4', 's5', 's6', 's7'];

/** Política de privacitat i avís legal: finestra modal traduïda (#privacy). */
export function renderPrivacy() {
  const sections = SECTIONS.map(
    (id) => `
        <section>
          <h3 class="text-lg font-extrabold text-brand-900" data-i18n="privacy.${id}.title"></h3>
          <p class="mt-1.5" data-i18n="privacy.${id}.text"></p>
          ${
            id === 's1'
              ? `<p class="mt-1.5 font-bold" dir="ltr">${site.legal.nif ? `NIF: ${site.legal.nif} · ` : ''}<a href="mailto:${site.contact.email}" class="underline decoration-blush-400 decoration-2 underline-offset-4">${site.contact.email}</a></p>`
              : ''
          }
        </section>`,
  ).join('');

  return `
  <dialog id="privacy-dialog" aria-labelledby="privacy-title" class="privacy-dialog">
    <div class="flex items-start justify-between gap-4 border-b border-brand-100 bg-brand-50 px-5 py-4 sm:px-8">
      <div>
        <h2 id="privacy-title" class="text-xl font-extrabold text-brand-900 sm:text-2xl" data-i18n="privacy.title"></h2>
        <p class="mt-0.5 text-sm text-brand-700" data-i18n="privacy.updated"></p>
      </div>
      <button type="button" data-privacy-close class="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-700 ring-1 ring-brand-100 transition hover:bg-brand-100" data-i18n-aria-label="privacy.close">
        ${icon('x', 'size-5')}
      </button>
    </div>
    <div data-privacy-body class="space-y-5 overflow-y-auto px-5 py-6 text-base leading-relaxed text-brand-800 sm:px-8">
      <p data-i18n="privacy.intro"></p>${sections}
    </div>
  </dialog>`;
}

export function initPrivacy() {
  const dialog = document.getElementById('privacy-dialog');
  if (!dialog) return;

  const open = () => {
    if (!dialog.open) dialog.showModal();
    dialog.querySelector('[data-privacy-body]').scrollTop = 0;
  };
  const clearHash = () => {
    if (location.hash === '#privacy') history.replaceState(null, '', location.pathname + location.search);
  };

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-privacy]')) {
      e.preventDefault();
      open();
    } else if (e.target.closest('[data-privacy-close]')) {
      dialog.close();
    } else if (e.target === dialog) {
      dialog.close(); // clic al fons enfosquit
    }
  });
  dialog.addEventListener('close', clearHash);
  window.addEventListener('hashchange', () => location.hash === '#privacy' && open());
  if (location.hash === '#privacy') open();
}
