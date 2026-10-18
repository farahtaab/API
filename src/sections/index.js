import { renderHero } from './hero.js';
import { renderMarquee } from './marquee.js';
import { renderAbout } from './about.js';
import { renderPrograms } from './programs.js';
import { renderOnline } from './online.js';
import { renderSchools } from './schools.js';
import { renderScenarios } from './scenarios.js';
import { renderJourney } from './journey.js';
import { renderStats } from './stats.js';
import { renderHelp } from './help.js';
import { renderFaq } from './faq.js';
import { renderCta } from './cta.js';
import { renderContact } from './contact.js';
import { site } from '../config/site.js';

/**
 * REGISTRE DE SECCIONS (l'ordre és l'ordre a la pàgina)
 *  - nav:     apareix al menú de dalt
 *  - footer:  apareix als enllaços del peu
 *  - enabled: false per amagar-la sense esborrar-la
 * Les claus de text són nav.<id> a locales/*.json.
 */
export const sections = [
  { id: 'home', render: renderHero },
  { id: 'marquee', render: renderMarquee },
  { id: 'about', render: renderAbout, nav: true },
  { id: 'programs', render: renderPrograms, nav: true },
  { id: 'online', render: renderOnline, nav: true },
  { id: 'schools', render: renderSchools, nav: true },
  { id: 'scenarios', render: renderScenarios, footer: true },
  { id: 'journey', render: renderJourney, footer: true },
  { id: 'stats', render: renderStats, enabled: site.stats.enabled },
  { id: 'help', render: renderHelp, nav: true },
  { id: 'faq', render: renderFaq, footer: true },
  { id: 'cta', render: renderCta },
  { id: 'contact', render: renderContact, nav: true },
];
