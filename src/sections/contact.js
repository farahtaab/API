import { site } from '../config/site.js';
import { brandIcon, icon } from '../lib/icons.js';

/** Pregunta de detall: píndoles (una opció) o un camp de text. */
function detailField(f) {
  if (f.type === 'text') {
    return `
        <div>
          <label for="d-${f.id}" class="label" data-i18n="form.details.${f.id}.label"></label>
          <input id="d-${f.id}" name="d-${f.id}" type="text" maxlength="120" class="input" data-i18n-placeholder="form.details.${f.id}.placeholder" />
        </div>`;
  }
  const options = f.options
    .map(
      (o) => `
          <label class="choice">
            <input type="radio" name="d-${f.id}" value="${o}" />
            <span class="choice-chip" data-i18n="form.details.${f.id}.options.${o}"></span>
          </label>`,
    )
    .join('');
  return `
        <fieldset>
          <legend class="label" data-i18n="form.details.${f.id}.label"></legend>
          <div class="flex flex-wrap gap-2">${options}</div>
        </fieldset>`;
}

export function renderContact() {
  const ig = site.social.find((s) => s.id === 'instagram' && s.url);

  const intents = site.subjects
    .map(
      (s, i) => `
        <label class="choice ${site.subjects.length % 2 && i === site.subjects.length - 1 ? 'min-[420px]:col-span-2' : ''}">
          <input type="radio" name="intent" value="${s.id}" ${i === 0 ? 'checked' : ''} />
          <span class="choice-card"><span class="icon-badge">${icon(s.icon, 'size-5')}</span><span data-i18n="subjects.${s.id}"></span></span>
        </label>`,
    )
    .join('');

  const details = Object.entries(site.formDetails)
    .map(
      ([id, fields]) => `
      <div data-details="${id}" hidden class="mt-4 space-y-4 rounded-2xl bg-brand-50 p-4 ring-1 ring-brand-100">${fields.map(detailField).join('')}
      </div>`,
    )
    .join('');

  const row = (iconHtml, labelKey, valueHtml) => `
    <li class="flex items-center gap-4">
      <span class="icon-badge">${iconHtml}</span>
      <div class="min-w-0">
        <p class="text-sm font-bold text-brand-600" data-i18n="${labelKey}"></p>
        <p class="font-extrabold break-words text-brand-800">${valueHtml}</p>
      </div>
    </li>`;

  return `
  <section id="contact" class="section bg-white">
    <div class="pointer-events-none absolute -end-24 top-10 size-96 rounded-full bg-blush-100 blur-3xl" aria-hidden="true"></div>
    <div class="container-page relative">
      <div class="mx-auto max-w-3xl text-center">
        <p class="reveal eyebrow" data-i18n="contact.eyebrow"></p>
        <h2 class="reveal section-title" style="--reveal-delay:80ms" data-i18n="contact.title"></h2>
        <p class="reveal section-lead mx-auto" style="--reveal-delay:160ms" data-i18n="contact.lead"></p>
      </div>

      <div class="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
        <div class="reveal space-y-6" data-reveal="left">
          <ul class="space-y-5 rounded-[2rem] bg-brand-50 p-6 ring-1 ring-brand-100 sm:p-7">
            ${row(icon('map-pin', 'size-6'), 'contact.info.city', `<span data-i18n="contact.info.cityValue"></span>`)}
            ${row(icon('mail', 'size-6'), 'contact.info.email', `<a href="mailto:${site.contact.email}" class="underline decoration-blush-400 decoration-2 underline-offset-4 hover:text-brand-600">${site.contact.email}</a>`)}
            ${ig ? row(brandIcon('instagram', 'size-6'), 'contact.info.instagram', `<a href="${ig.url}" target="_blank" rel="noopener noreferrer" class="underline decoration-blush-400 decoration-2 underline-offset-4 hover:text-brand-600">${ig.handle}</a>`) : ''}
          </ul>

          <div class="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-green-700 to-green-900 p-6 text-white shadow-xl sm:p-7">
            <span class="absolute -end-6 -top-6 size-28 rounded-full bg-white/10"></span>
            <span class="relative flex size-12 items-center justify-center rounded-2xl bg-white/15">${brandIcon('whatsapp', 'size-7')}</span>
            <h3 class="relative mt-4 text-xl font-extrabold" data-i18n="contact.whatsappBox.title"></h3>
            <p class="relative mt-2 text-green-50" data-i18n="contact.whatsappBox.text"></p>
            <a href="#" data-whatsapp target="_blank" rel="noopener noreferrer" class="relative mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-extrabold text-green-900 transition hover:-translate-y-0.5 hover:bg-green-50">
              ${brandIcon('whatsapp', 'size-5')}<span data-i18n="contact.whatsappBox.button"></span>
            </a>
          </div>
        </div>

        <form id="contact-form" novalidate class="reveal order-first rounded-[2rem] border border-brand-100 bg-white p-5 shadow-xl shadow-brand-900/5 sm:p-8 lg:order-none" data-reveal="right">
          <div data-form-body>
            <h3 class="text-2xl font-extrabold text-brand-900 sm:text-3xl" data-i18n="form.title"></h3>
            <p class="mt-1.5 text-brand-700" data-i18n="form.subtitle"></p>

            <!-- Pas 1: què t'interessa -->
            <fieldset class="mt-7">
              <legend class="mb-3 flex items-center gap-2.5 text-lg font-extrabold text-brand-900"><span class="step-num">1</span><span data-i18n="form.step1"></span></legend>
              <div class="grid gap-2.5 min-[420px]:grid-cols-2">${intents}</div>
              ${details}
            </fieldset>

            <!-- Pas 2: contacte -->
            <fieldset class="mt-8">
              <legend class="mb-3 flex items-center gap-2.5 text-lg font-extrabold text-brand-900"><span class="step-num">2</span><span data-i18n="form.step2"></span></legend>
              <div>
                <label for="f-name" class="label" data-i18n="form.name"></label>
                <input id="f-name" name="name" type="text" autocomplete="name" maxlength="80" class="input" required />
                <p class="field-error empty:hidden" data-error-for="name" role="alert"></p>
              </div>
              <div class="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label for="f-phone" class="label" data-i18n="form.phone"></label>
                  <input id="f-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" maxlength="30" dir="ltr" class="input text-start" />
                  <p class="field-error empty:hidden" data-error-for="phone" role="alert"></p>
                </div>
                <div>
                  <label for="f-email" class="label" data-i18n="form.email"></label>
                  <input id="f-email" name="email" type="email" autocomplete="email" maxlength="120" dir="ltr" class="input text-start" />
                  <p class="field-error empty:hidden" data-error-for="email" role="alert"></p>
                </div>
              </div>
              <p class="mt-2 text-sm text-brand-600" data-i18n="form.contactHint"></p>
              <p class="field-error empty:hidden" data-error-for="contact" role="alert"></p>
            </fieldset>

            <!-- Pas 3: missatge opcional -->
            <div class="mt-8">
              <label for="f-message" class="mb-3 flex items-center gap-2.5 text-lg font-extrabold text-brand-900"><span class="step-num">3</span><span><span data-i18n="form.step3"></span> <span class="text-base font-semibold text-brand-500" data-i18n="form.optional"></span></span></label>
              <textarea id="f-message" name="message" rows="3" maxlength="1500" class="input resize-y" data-i18n-placeholder="form.messagePlaceholder"></textarea>
            </div>

            <!-- Honeypot anti-spam (ocult) -->
            <div class="absolute -start-[9999px]" aria-hidden="true">
              <label>Website <input type="text" name="website" tabindex="-1" autocomplete="off" /></label>
            </div>

            <div class="mt-6">
              <label class="flex items-start gap-3 text-sm text-brand-700">
                <input type="checkbox" name="consent" class="mt-0.5 size-5 shrink-0 rounded border-brand-300 accent-brand-600" />
                <span><span data-i18n="form.consent"></span> <a href="#privacy" data-privacy class="font-bold underline decoration-blush-400 decoration-2 underline-offset-4 hover:text-brand-900" data-i18n="privacy.link"></a></span>
              </label>
              <p class="field-error empty:hidden" data-error-for="consent" role="alert"></p>
            </div>

            <p data-form-status hidden role="status" class="mt-5"></p>

            <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button type="submit" class="btn btn-primary group w-full sm:w-auto sm:min-w-56 disabled:cursor-wait disabled:opacity-70">
                <span data-i18n="form.send"></span>${icon('send', 'size-5 rtl:-scale-x-100')}
              </button>
              <button type="button" data-form-whatsapp class="btn btn-outline w-full sm:w-auto">${brandIcon('whatsapp', 'size-5 text-green-700')}<span data-i18n="form.whatsapp"></span></button>
            </div>
          </div>

          <!-- Missatge d'èxit -->
          <div data-form-success hidden tabindex="-1" class="py-6 text-center outline-none sm:py-10">
            <span class="mx-auto flex size-20 items-center justify-center rounded-full bg-brand-600 text-white shadow-xl shadow-brand-600/30">${icon('check', 'size-10')}</span>
            <h3 class="mt-6 text-2xl font-extrabold text-brand-900 sm:text-3xl" data-i18n="form.successTitle"></h3>
            <p class="mx-auto mt-3 max-w-md text-lg text-brand-700" data-i18n="form.successText"></p>
            <button type="button" data-form-again class="btn btn-outline mt-7"><span data-i18n="form.again"></span></button>
          </div>
        </form>
      </div>
    </div>
  </section>`;
}
