import { brandIcon, icon } from '../lib/icons.js';

/** Banda final de crida a l'acció. */
export function renderCta() {
  return `
  <section id="cta" class="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 py-16 text-white sm:py-20">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="dots-light absolute inset-0 opacity-50"></div>
      <div class="animate-blob absolute -top-24 -start-16 size-96 rounded-full bg-blush-300/25 blur-3xl"></div>
      <div class="animate-blob-slow absolute -bottom-28 -end-10 size-96 rounded-full bg-sun-300/20 blur-3xl"></div>
      <span class="animate-wiggle absolute start-[8%] top-[18%] hidden rounded-2xl rounded-es-sm bg-white/10 px-4 py-2 text-lg font-extrabold text-white/70 backdrop-blur md:block" lang="ca">Hola!</span>
      <span class="animate-wiggle absolute end-[9%] top-[26%] hidden rounded-2xl rounded-ee-sm bg-blush-300/20 px-4 py-2 text-lg font-extrabold text-blush-200 backdrop-blur md:block" lang="ar" dir="rtl">مرحبًا</span>
      <span class="animate-float absolute start-[12%] bottom-[16%] hidden rounded-2xl rounded-ee-sm bg-white/10 px-4 py-2 text-lg font-extrabold text-white/70 backdrop-blur md:block" lang="en">Hello!</span>
      <span class="animate-float-slow absolute end-[14%] bottom-[14%] hidden rounded-2xl rounded-es-sm bg-sun-300/20 px-4 py-2 text-lg font-extrabold text-sun-200 backdrop-blur md:block" lang="es">¡Hola!</span>
    </div>
    <div class="container-page relative text-center">
      <span class="reveal mx-auto flex size-16 items-center justify-center rounded-3xl bg-blush-300 text-brand-900 shadow-xl" data-reveal="zoom">${icon('messages-square', 'size-8')}</span>
      <h2 class="reveal mx-auto mt-6 max-w-3xl text-3xl font-extrabold tracking-tight text-balance sm:text-5xl" style="--reveal-delay:80ms" data-i18n="cta.title"></h2>
      <p class="reveal mx-auto mt-5 max-w-2xl text-lg text-brand-100 sm:text-xl" style="--reveal-delay:160ms" data-i18n="cta.text"></p>
      <div class="reveal mt-9 flex flex-wrap items-center justify-center gap-3" style="--reveal-delay:240ms">
        <a href="#" data-whatsapp target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp !px-7 !py-3.5 text-lg">${brandIcon('whatsapp', 'size-6')}<span data-i18n="cta.whatsapp"></span></a>
        <a href="#contact" class="btn btn-soft !px-7 !py-3.5 text-lg"><span data-i18n="cta.form"></span>${icon('send', 'size-5 rtl:-scale-x-100')}</a>
      </div>
    </div>
  </section>`;
}
