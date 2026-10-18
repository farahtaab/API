import { site } from '../config/site.js';

// Cada idioma és un JSON a ./locales i es carrega només quan cal.
const loaders = import.meta.glob('./locales/*.json');
const cache = {};
const STORAGE_KEY = 'pi-lang';

let currentLang = site.defaultLanguage;

const isSupported = (code) => site.languages.some((l) => l.code === code);

async function load(code) {
  if (cache[code]) return cache[code];
  const loader = loaders[`./locales/${code}.json`];
  if (!loader) throw new Error(`Idioma no trobat: ${code}`);
  cache[code] = (await loader()).default;
  return cache[code];
}

function resolve(obj, key) {
  return key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

/** Tradueix una clau. Si falta en l'idioma actual, cau al per defecte (català). */
export function t(key, params = {}) {
  let value = resolve(cache[currentLang], key) ?? resolve(cache[site.defaultLanguage], key) ?? key;
  for (const [name, val] of Object.entries(params)) {
    value = value.replaceAll(`{${name}}`, val);
  }
  return value;
}

export const getLanguage = () => currentLang;

/** Tradueix sempre al català (idioma de l'associació), p. ex. per als correus que rep. */
export const tDefault = (key) => resolve(cache[site.defaultLanguage], key) ?? key;
export const getLanguageMeta = () => site.languages.find((l) => l.code === currentLang);

/** Aplica les traduccions als elements amb atributs data-i18n*. */
export function applyTranslations(root = document) {
  root.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  // Només per a textos propis (de confiança) que continguin HTML.
  root.querySelectorAll('[data-i18n-html]').forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  for (const attr of ['placeholder', 'aria-label', 'title', 'alt']) {
    const dataName = `data-i18n-${attr}`;
    root.querySelectorAll(`[${dataName}]`).forEach((el) => {
      el.setAttribute(attr, t(el.getAttribute(dataName)));
    });
  }
}

export function detectInitialLanguage() {
  const fromUrl = new URLSearchParams(location.search).get('lang');
  if (fromUrl && isSupported(fromUrl)) return fromUrl;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && isSupported(stored)) return stored;
  } catch {
    /* localStorage no disponible */
  }
  return site.defaultLanguage; // Català per defecte
}

/** Carrega l'idioma i actualitza tota la pàgina. */
export async function setLanguage(code, { persist = true } = {}) {
  if (!isSupported(code)) code = site.defaultLanguage;
  await load(site.defaultLanguage); // fallback sempre disponible
  await load(code);
  currentLang = code;

  const meta = getLanguageMeta();
  document.documentElement.lang = code;
  document.documentElement.dir = meta.dir;

  applyTranslations();
  document.title = t('meta.title');
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'));
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', t('meta.title'));
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', t('meta.description'));

  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignora */
    }
  }
  document.dispatchEvent(new CustomEvent('languagechange', { detail: { code } }));
}
