import { site } from '../config/site.js';

/** Dades estructurades (schema.org) perquè Google entengui qui som i on som. */
export function injectStructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: site.name,
    url: location.origin + location.pathname,
    logo: new URL(`${import.meta.env.BASE_URL}logo.svg`, location.href).href,
    email: site.contact.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city.name,
      addressRegion: site.city.region,
      addressCountry: site.city.country,
      ...(site.city.address ? { streetAddress: site.city.address } : {}),
    },
    areaServed: site.city.name,
    sameAs: site.social.filter((s) => s.url).map((s) => s.url),
  };
  const el = document.createElement('script');
  el.type = 'application/ld+json';
  el.textContent = JSON.stringify(data);
  document.head.appendChild(el);
}
