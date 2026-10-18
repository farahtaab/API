import { site } from '../config/site.js';
import { sections } from '../sections/index.js';
import { brandIcon, icon } from '../lib/icons.js';
import { wordmark } from './wordmark.js';

export function renderFooter() {
  const links = sections
    .filter((s) => s.footer && s.enabled !== false)
    .map((s) => `<li><a href="#${s.id}" class="text-brand-100 transition hover:text-white" data-i18n="nav.${s.id}"></a></li>`)
    .join('');

  const socials = site.social
    .filter((s) => s.url)
    .map(
      (s) => `<a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${s.label}"
        class="inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-blush-300 hover:text-brand-900">${brandIcon(s.id, 'size-5')}</a>`,
    )
    .join('');

  return `
  <footer class="relative overflow-hidden bg-brand-900 text-brand-100">
    <div class="pointer-events-none absolute -top-24 -end-24 size-72 rounded-full bg-blush-300/10 blur-3xl"></div>
    <div class="container-page relative grid gap-10 py-14 md:grid-cols-3">
      <div>
        <a href="#home" class="flex items-center gap-3">
          <span class="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5">
            <img src="${import.meta.env.BASE_URL}logo.svg" alt="" class="size-full object-contain" width="48" height="48" />
          </span>
          ${wordmark({ cls: 'text-2xl', tone: 'dark' })}
        </a>
        <p class="mt-4 max-w-xs text-sm leading-relaxed" data-i18n="footer.about"></p>
      </div>

      <div>
        <h2 class="text-sm font-extrabold tracking-wide text-blush-300 uppercase" data-i18n="footer.navigation"></h2>
        <ul class="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">${links}</ul>
      </div>

      <div>
        <h2 class="text-sm font-extrabold tracking-wide text-blush-300 uppercase" data-i18n="footer.contact"></h2>
        <ul class="mt-4 space-y-3 text-sm">
          <li class="flex items-center gap-2">${icon('map-pin', 'size-4 text-blush-300')}${site.city.name}, ${site.city.region}</li>
          <li><a href="mailto:${site.contact.email}" class="flex items-center gap-2 break-all transition hover:text-white">${icon('mail', 'size-4 shrink-0 text-blush-300')}${site.contact.email}</a></li>
          <li><a href="#" data-whatsapp target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 transition hover:text-white">${brandIcon('whatsapp', 'size-4 text-blush-300')}WhatsApp</a></li>
        </ul>
        ${socials ? `<div class="mt-5 flex flex-wrap gap-2">${socials}</div>` : ''}
      </div>
    </div>
    <div class="relative border-t border-white/10 py-5 text-center text-xs text-brand-300">
      &copy; ${new Date().getFullYear()} ${site.name}. <span data-i18n="footer.rights"></span>
      <span class="mx-1" aria-hidden="true">·</span>
      <a href="#privacy" data-privacy class="underline underline-offset-4 transition hover:text-white" data-i18n="privacy.link"></a>
    </div>
  </footer>`;
}
