import { site } from '../config/site.js';

/**
 * Nom de l'entitat com a logotip tipogràfic:
 *   [associació]        <- píndola rosa
 *   Parla (i) Integra   <- verd fosc, amb la "i" en un cercle rosa
 * La mida es controla amb la classe de text de `cls` (tot va en "em").
 * `tone: 'dark'` és per a fons foscos (el nom passa a blanc).
 */
export function wordmark({ cls = 'text-lg', tone = 'light' } = {}) {
  return `<span class="wordmark ${cls}" data-tone="${tone}" dir="ltr" lang="ca" role="img" aria-label="${site.name}">
    <span class="wm-assoc" aria-hidden="true">associació</span>
    <span class="wm-name" aria-hidden="true"><span>Parla</span><span class="wm-i">i</span><span>Integra</span></span>
  </span>`;
}
