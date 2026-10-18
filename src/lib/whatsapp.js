import { site } from '../config/site.js';
import { t } from '../i18n/index.js';

/** URL de WhatsApp amb un missatge predefinit. */
export function whatsappUrl(text) {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** Actualitza tots els enllaços [data-whatsapp] amb el missatge de l'idioma actual. */
export function refreshWhatsappLinks() {
  document.querySelectorAll('[data-whatsapp]').forEach((a) => {
    a.href = whatsappUrl(t('whatsapp.message'));
  });
}
