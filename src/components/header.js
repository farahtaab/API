import { site } from '../config/site.js';
import { sections } from '../sections/index.js';
import { renderLanguageSwitcher, initLanguageSwitcher } from './languageSwitcher.js';
import { brandIcon, icon } from '../lib/icons.js';
import { wordmark } from './wordmark.js';

const navSections = () => sections.filter((s) => s.nav && s.enabled !== false);

/** Franja superior fina (només escriptori). */
export function renderTopBar() {
  const ig = site.social.find((s) => s.id === 'instagram' && s.url);
  return `
  <div class="hidden bg-brand-900 text-sm text-brand-100 lg:block">
    <div class="container-page flex items-center justify-between gap-6 py-2">
      <p class="flex items-center gap-2">${icon('map-pin', 'size-4 text-blush-300')}<span>${site.city.name}, ${site.city.region}</span></p>
      <div class="flex items-center gap-6">
        <a href="mailto:${site.contact.email}" class="flex items-center gap-2 transition hover:text-white">${icon('mail', 'size-4 text-blush-300')}${site.contact.email}</a>
        ${ig ? `<a href="${ig.url}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 transition hover:text-white">${brandIcon('instagram', 'size-4 text-blush-300')}${ig.handle}</a>` : ''}
        <a href="#" data-whatsapp target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 font-bold text-white transition hover:text-blush-300">${brandIcon('whatsapp', 'size-4 text-blush-300')}WhatsApp</a>
      </div>
    </div>
  </div>`;
}

export function renderHeader() {
  const links = navSections()
    .map(
      (s) => `<a href="#${s.id}" data-nav-link="${s.id}" class="rounded-full px-2.5 py-2 text-sm font-bold whitespace-nowrap text-brand-700 transition hover:bg-blush-100 aria-[current=true]:bg-blush-200 aria-[current=true]:text-brand-900" data-i18n="nav.${s.id}"></a>`,
    )
    .join('');
  const mobileLinks = navSections()
    .map(
      (s) => `<a href="#${s.id}" data-mobile-link class="rounded-2xl px-4 py-3 text-lg font-extrabold text-brand-800 transition hover:bg-blush-100" data-i18n="nav.${s.id}"></a>`,
    )
    .join('');

  return `
  <header data-header data-scrolled="false" class="sticky top-0 z-40 border-b border-brand-100/70 bg-white/85 backdrop-blur-xl transition-shadow">
    <div data-scroll-progress class="scroll-progress pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-brand-500 via-blush-400 to-sun-400"></div>
    <div class="container-page flex items-center justify-between gap-3 py-2.5 sm:py-3">
      <a href="#home" class="flex shrink-0 items-center gap-2 sm:gap-2.5" aria-label="${site.name}">
        <img src="${import.meta.env.BASE_URL}logo.svg" alt="" class="size-9 shrink-0 min-[400px]:size-10 sm:size-11" width="44" height="44" />
        <span class="min-w-0">${wordmark({ cls: 'text-base min-[400px]:text-[1.05rem] sm:text-xl' })}</span>
      </a>

      <nav class="hidden items-center gap-0.5 xl:flex" data-i18n-aria-label="nav.label">${links}</nav>

      <div class="flex items-center gap-2">
        ${renderLanguageSwitcher()}
        <a href="#contact" class="btn btn-primary hidden !py-2.5 whitespace-nowrap lg:inline-flex xl:hidden 2xl:inline-flex"><span data-i18n="nav.cta"></span>${icon('arrow-right', 'size-4 rtl:rotate-180')}</a>
        <button type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-menu" data-i18n-aria-label="nav.menu"
          class="inline-flex size-11 items-center justify-center rounded-full border border-brand-200 text-brand-700 transition hover:bg-brand-50 xl:hidden">
          <span data-menu-open>${icon('menu', 'size-6')}</span>
          <span data-menu-close hidden>${icon('x', 'size-6')}</span>
        </button>
      </div>
    </div>

    <div id="mobile-menu" hidden class="border-t border-brand-100 bg-white xl:hidden">
      <nav class="container-page flex flex-col gap-1 py-4" data-i18n-aria-label="nav.label">
        ${mobileLinks}
        <a href="#contact" data-mobile-link class="btn btn-primary mt-3"><span data-i18n="nav.cta"></span></a>
      </nav>
    </div>
  </header>`;
}

export function initHeader() {
  initLanguageSwitcher();

  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.getElementById('mobile-menu');
  const iconOpen = toggle.querySelector('[data-menu-open]');
  const iconClose = toggle.querySelector('[data-menu-close]');

  const setMenu = (open) => {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    iconOpen.hidden = open;
    iconClose.hidden = !open;
  };
  toggle.addEventListener('click', () => setMenu(menu.hidden));
  menu.addEventListener('click', (e) => {
    if (e.target.closest('[data-mobile-link]')) setMenu(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      setMenu(false);
      toggle.focus();
    }
  });
  matchMedia('(min-width: 1280px)').addEventListener('change', (e) => e.matches && setMenu(false));

  // Scroll-spy: marca l'enllaç de la secció visible.
  const links = new Map([...document.querySelectorAll('[data-nav-link]')].map((a) => [a.dataset.navLink, a]));
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach((a, id) => a.setAttribute('aria-current', String(id === entry.target.id)));
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  links.forEach((_, id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}
