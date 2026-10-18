import { site } from '../config/site.js';
import { getLanguage } from '../i18n/index.js';
import { setLanguage } from '../i18n/index.js';
import { icon } from '../lib/icons.js';

export function renderLanguageSwitcher() {
  const items = site.languages
    .map(
      (l) => `
      <li role="none">
        <button type="button" role="menuitem" data-lang="${l.code}" lang="${l.code}" dir="${l.dir}"
          class="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-start text-sm font-semibold text-brand-800 transition hover:bg-blush-100">
          <span>${l.label}</span>
          <span data-lang-check class="invisible text-brand-600">${icon('check', 'size-4')}</span>
        </button>
      </li>`,
    )
    .join('');

  return `
    <div class="relative" data-lang-switcher>
      <button type="button" data-lang-toggle aria-haspopup="true" aria-expanded="false" data-i18n-aria-label="lang.label"
        class="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-2.5 text-sm font-bold text-brand-700 transition hover:border-brand-400 hover:bg-brand-50 max-[400px]:px-3">
        ${icon('globe', 'size-5')}
        <span data-lang-current class="hidden sm:inline"></span>
        <span data-lang-code class="uppercase sm:hidden max-[400px]:hidden"></span>
        ${icon('chevron-down', 'size-4 max-[400px]:hidden')}
      </button>
      <ul hidden role="menu" data-lang-menu
        class="absolute end-0 z-50 mt-2 w-48 rounded-2xl border border-brand-100 bg-white p-1.5 shadow-xl shadow-brand-900/10">
        ${items}
      </ul>
    </div>`;
}

export function initLanguageSwitcher() {
  const root = document.querySelector('[data-lang-switcher]');
  if (!root) return;
  const toggle = root.querySelector('[data-lang-toggle]');
  const menu = root.querySelector('[data-lang-menu]');

  const setOpen = (open) => {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  };

  const sync = () => {
    const code = getLanguage();
    const meta = site.languages.find((l) => l.code === code);
    root.querySelector('[data-lang-current]').textContent = meta.label;
    root.querySelector('[data-lang-code]').textContent = code;
    root.querySelectorAll('[data-lang]').forEach((btn) => {
      const active = btn.dataset.lang === code;
      btn.querySelector('[data-lang-check]').classList.toggle('invisible', !active);
      active ? btn.setAttribute('aria-current', 'true') : btn.removeAttribute('aria-current');
    });
  };

  toggle.addEventListener('click', () => setOpen(menu.hidden));
  menu.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-lang]');
    if (!btn) return;
    setOpen(false);
    await setLanguage(btn.dataset.lang);
    toggle.focus();
  });
  document.addEventListener('click', (e) => {
    if (!root.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('languagechange', sync);
}
