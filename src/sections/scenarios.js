import { site } from '../config/site.js';
import { icon } from '../lib/icons.js';

export function renderScenarios() {
  const tabs = site.scenarios
    .map(
      (s, i) => `
      <button type="button" role="tab" id="tab-${s.id}" aria-controls="panel-${s.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-tab="${s.id}" class="scenario-tab">
        <span class="icon-badge !size-11">${icon(s.icon, 'size-5')}</span>
        <span data-i18n="scenarios.tabs.${s.id}"></span>
      </button>`,
    )
    .join('');

  const panels = site.scenarios
    .map((s, i) => {
      const lines = s.lines
        .map((l, n) => {
          const me = l.who === 'me';
          return `
          <div class="chat-in flex ${me ? 'justify-end' : 'justify-start'}" style="--d:${n * 0.75}s">
            <div class="max-w-[88%] rounded-3xl px-5 py-3.5 ${me ? 'rounded-ee-md bg-brand-600 text-white' : 'rounded-es-md bg-white text-brand-900 shadow-md shadow-brand-900/5 ring-1 ring-brand-100'}">
              <p lang="ca" dir="ltr" class="text-start text-lg font-extrabold">${l.text}</p>
              <p class="mt-1 text-sm italic ${me ? 'text-brand-100' : 'text-brand-700/80'} empty:hidden" data-i18n="scenarios.items.${s.id}.t${n + 1}"></p>
            </div>
          </div>`;
        })
        .join('');
      return `<div role="tabpanel" id="panel-${s.id}" aria-labelledby="tab-${s.id}" data-panel="${s.id}" ${i ? 'hidden' : ''} class="space-y-4">${lines}</div>`;
    })
    .join('');

  return `
  <section id="scenarios" class="section overflow-hidden bg-white">
    <div class="pointer-events-none absolute -end-24 top-1/4 size-96 rounded-full bg-brand-100/70 blur-3xl" aria-hidden="true"></div>
    <div class="container-page relative">
      <div class="mx-auto max-w-3xl text-center">
        <p class="reveal eyebrow" data-i18n="scenarios.eyebrow"></p>
        <h2 class="reveal section-title" style="--reveal-delay:80ms" data-i18n="scenarios.title"></h2>
        <p class="reveal section-lead mx-auto" style="--reveal-delay:160ms" data-i18n="scenarios.lead"></p>
      </div>

      <div class="mt-9 grid items-start gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
        <div role="tablist" aria-orientation="vertical" data-scenario-tabs class="reveal grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-1" data-reveal="left">${tabs}</div>

        <div class="reveal overflow-hidden rounded-[2rem] bg-blush-50 shadow-2xl shadow-brand-900/10 ring-1 ring-brand-100" data-reveal="right">
          <div class="flex items-center gap-3 bg-brand-700 px-5 py-4 text-white">
            <span class="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5">
              <img src="${import.meta.env.BASE_URL}logo.svg" alt="" class="size-full object-contain" width="44" height="44" />
            </span>
            <div class="min-w-0">
              <p class="font-extrabold" data-i18n="scenarios.chatTitle"></p>
              <p class="truncate text-sm text-brand-200" data-i18n="scenarios.chatSub"></p>
            </div>
          </div>
          <div class="min-h-[20rem] p-4 sm:p-8">${panels}</div>
        </div>
      </div>
    </div>
  </section>`;
}

export function initScenarios() {
  const list = document.querySelector('[data-scenario-tabs]');
  if (!list) return;
  const tabs = [...list.querySelectorAll('[role="tab"]')];

  const activate = (tab, focus = false) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
  };

  list.addEventListener('click', (e) => {
    const tab = e.target.closest('[role="tab"]');
    if (tab) activate(tab);
  });
  list.addEventListener('keydown', (e) => {
    const i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (e.key in keys) {
      e.preventDefault();
      activate(tabs[(i + keys[e.key] + tabs.length) % tabs.length], true);
    } else if (e.key === 'Home') {
      e.preventDefault();
      activate(tabs[0], true);
    } else if (e.key === 'End') {
      e.preventDefault();
      activate(tabs.at(-1), true);
    }
  });
}
