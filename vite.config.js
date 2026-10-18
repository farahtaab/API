import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// URL pública del web (ex.: SITE_URL=https://parlaintegra.cat/). Les xarxes socials i WhatsApp
// necessiten una URL absoluta per mostrar la imatge de previsualització (og-image.png).
const siteUrl = (process.env.SITE_URL || '').replace(/\/?$/, process.env.SITE_URL ? '/' : '');

const siteUrlPlugin = {
  name: 'site-url',
  transformIndexHtml: (html) => {
    const canonical = siteUrl ? `<link rel="canonical" href="${siteUrl}" />\n    <meta property="og:url" content="${siteUrl}" />\n    ` : '';
    return html.replaceAll('%SITE_URL%', siteUrl || './').replace('<meta property="og:type"', `${canonical}<meta property="og:type"`);
  },
};

// base './' => funciona a GitHub Pages (qualsevol nom de repo) i amb domini propi.
export default defineConfig({
  base: './',
  plugins: [tailwindcss(), siteUrlPlugin],
  build: {
    target: 'es2020',
  },
});
