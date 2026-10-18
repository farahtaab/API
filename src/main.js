import '@fontsource-variable/nunito';
import '@fontsource-variable/noto-kufi-arabic';
import './styles/main.css';

import { sections } from './sections/index.js';
import { renderTopBar, renderHeader, initHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderFloatingActions, initBackToTop } from './components/floatingActions.js';
import { renderPrivacy, initPrivacy } from './components/privacy.js';
import { initHero } from './sections/hero.js';
import { initScenarios } from './sections/scenarios.js';
import { initContactForm } from './lib/contactForm.js';
import { refreshWhatsappLinks } from './lib/whatsapp.js';
import { refreshIcons } from './lib/icons.js';
import { initReveal, initCounters, initSpotlight, initScrollEffects } from './lib/effects.js';
import { injectStructuredData } from './lib/seo.js';
import { setLanguage, detectInitialLanguage } from './i18n/index.js';

const app = document.getElementById('app');

app.innerHTML = `
  <a href="#main" class="sr-only z-50 rounded-full bg-brand-900 px-4 py-2 font-bold text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4" data-i18n="nav.skip"></a>
  ${renderTopBar()}
  ${renderHeader()}
  <main id="main">
    ${sections.filter((s) => s.enabled !== false).map((s) => s.render()).join('')}
  </main>
  ${renderFooter()}
  ${renderFloatingActions()}
  ${renderPrivacy()}
`;

initHeader();
initHero();
initScenarios();
initContactForm();
initPrivacy();
initBackToTop();
initSpotlight();
initScrollEffects();
injectStructuredData();

// Cada vegada que canvia l'idioma, els enllaços de WhatsApp porten el missatge traduït.
document.addEventListener('languagechange', refreshWhatsappLinks);

setLanguage(detectInitialLanguage(), { persist: false }).then(() => {
  refreshIcons();
  initReveal();
  initCounters();
  app.classList.remove('app-loading');

  // Si algú arriba amb #seccio a la URL, assegura el scroll un cop pintat.
  if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
});
