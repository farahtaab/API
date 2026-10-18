# Associació Parla i Integra — Web

Web de l'associació (català per defecte, castellà, anglès i àrab estàndard amb RTL).
Estàtica, sense backend: **Vite + Tailwind CSS v4 + JavaScript modular**. Es publica a GitHub Pages.

## Començar

```bash
npm install
npm run dev       # servidor local
npm run build     # genera /dist
npm run preview   # prova la build
```

## Estructura

```
public/logo.svg            Logo (també és el favicon)
src/config/site.js         Configuració central: contacte, idiomes, programes, FAQ, formulari
src/i18n/locales/*.json    Textos per idioma (ca, es, en, ar)
src/i18n/index.js          Motor de traducció (càrrega lazy, RTL, fallback a català)
src/sections/*.js          Cada secció de la pàgina; l'ordre es defineix a sections/index.js
src/components/*.js        Capçalera, selector d'idioma, peu, botó flotant de WhatsApp
src/lib/*.js               Formulari, WhatsApp, icones, animacions
src/styles/main.css        Paleta (tokens del logo) i components CSS reutilitzables
```

## Tasques habituals

- **Dades de contacte / WhatsApp / xarxes:** `src/config/site.js` (ara hi ha valors de prova).
- **Nou programa:** afegeix-lo a `programs` a `site.js` i afegeix `programs.items.<id>` als 4 JSON.
- **Nova pregunta FAQ:** afegeix l'id a `faq` i `faq.items.<id>.q/.a` als JSON.
- **Nou idioma:** afegeix-lo a `languages` i copia `ca.json` a `<codi>.json`. Les claus que falten cauen al català.
- **Nova secció:** crea `src/sections/<nom>.js` i registra-la a `src/sections/index.js`.
- **Estadístiques:** `site.stats.enabled = true` amb xifres reals.
- **Colors:** `@theme` a `src/styles/main.css`.

## Formulari de contacte

Per defecte obre el correu de l'usuari (`mailto`). Per enviar-lo sense obrir res, a `site.form`:
- `web3forms`: crea una clau gratuïta a web3forms.com i posa-la a `accessKey`.
- `formspree`: posa `endpoint: 'https://formspree.io/f/xxxx'`.
- `custom`: qualsevol endpoint que accepti POST JSON.

## Publicar a GitHub Pages

1. Crea un repositori a GitHub i puja el codi a la branca `main`.
2. A **Settings → Pages → Source** tria **GitHub Actions**.
3. Cada `push` a `main` desplega automàticament (`.github/workflows/deploy.yml`).

Per a un domini propi, afegeix un fitxer `public/CNAME` amb el domini.
