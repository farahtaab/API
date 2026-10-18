/**
 * CONFIGURACIÓ CENTRAL DE LA WEB
 * ------------------------------------------------------------------
 * Tot el que canvia d'una entitat a una altra (dades de contacte,
 * idiomes, programes, preguntes...) viu aquí. Els TEXTOS es tradueixen
 * a src/i18n/locales/<idioma>.json.
 *
 * Com afegir...
 *  - un programa nou:   afegeix-lo a `programs` + les seves claus a cada JSON
 *                       (programs.items.<id>.title / .text).
 *  - una pregunta:      afegeix l'id a `faq` + faq.items.<id>.q / .a
 *  - un idioma:         afegeix-lo a `languages` + crea locales/<codi>.json
 *  - una secció nova:   crea src/sections/<nom>.js i registra-la a sections/index.js
 */
export const site = {
  name: 'Associació Parla i Integra',
  shortName: 'Parla i Integra',

  // ---- Ubicació ----------------------------------------------------
  city: {
    name: 'Reus',
    region: 'Tarragona',
    country: 'ES',
    lat: 41.1561,
    lng: 1.1069,
    address: '',
  },

  // ---- Idiomes ----------------------------------------------------
  defaultLanguage: 'ca',
  languages: [
    { code: 'ca', label: 'Català', dir: 'ltr' },
    { code: 'es', label: 'Castellano', dir: 'ltr' },
    { code: 'en', label: 'English', dir: 'ltr' },
    { code: 'ar', label: 'العربية', dir: 'rtl' },
  ],

  // ---- Contacte ----------------------------------------------------
  contact: {
    email: 'associacioparlaintegra@gmail.com',
    // Número de WhatsApp en format internacional, sense "+" ni espais.
    // (No es mostra enlloc com a telèfon: només s'usa per als enllaços de WhatsApp.)
    whatsapp: '34602196260',
  },

  // ---- Dades legals (política de privacitat) -----------------------
  // Omple el NIF/CIF de l'associació perquè aparegui a la política de privacitat.
  legal: {
    nif: '',
  },

  // ---- Xarxes socials (només es mostren les que tenen URL) ---------
  social: [
    {
      id: 'instagram',
      label: 'Instagram',
      handle: '@associacioparlaintegra',
      url: 'https://www.instagram.com/associacioparlaintegra/',
    },
    { id: 'facebook', label: 'Facebook', handle: '', url: '' },
    { id: 'youtube', label: 'YouTube', handle: '', url: '' },
    { id: 'tiktok', label: 'TikTok', handle: '', url: '' },
  ],

  // ---- Formulari de contacte ---------------------------------------
  // provider: 'formsubmit' | 'mailto' | 'web3forms' | 'formspree' | 'custom'
  // 'formsubmit' envia el missatge a contact.email. La 1a vegada rebràs un correu d'activació.
  form: {
    provider: 'formsubmit',
    endpoint: '',
    accessKey: '',
  },

  // ---- Paraules de benvinguda de la franja animada -----------------
  marquee: [
    { text: 'Benvinguda', lang: 'ca' },
    { text: 'Bienvenida', lang: 'es' },
    { text: 'Welcome', lang: 'en' },
    { text: 'أهلاً وسهلاً', lang: 'ar' },
    { text: 'Bienvenue', lang: 'fr' },
    { text: 'Bun venit', lang: 'ro' },
    { text: 'خوش آمدید', lang: 'ur' },
    { text: 'Benvenuta', lang: 'it' },
  ],

  // ---- Seccions amb dades ------------------------------------------
  // Els 3 camins d'entrada (targetes sota el títol). tone: pink | green | sun
  paths: [
    { id: 'women', icon: 'laptop', href: '#online', tone: 'pink' },
    { id: 'children', icon: 'graduation-cap', href: '#programs', tone: 'green' },
    { id: 'schools', icon: 'school', href: '#schools', tone: 'sun' },
  ],

  // Situacions reals (pestanyes interactives). Les frases són en català i la traducció
  // és a locales/*.json -> scenarios.items.<id>.t1..t3. who: 'me' | 'them'
  scenarios: [
    {
      id: 'school',
      icon: 'school',
      lines: [
        { who: 'me', text: 'Bon dia, vinc a recollir la meva filla.' },
        { who: 'them', text: 'Bon dia! Com es diu?' },
        { who: 'me', text: 'Es diu Amina. Moltes gràcies!' },
      ],
    },
    {
      id: 'health',
      icon: 'stethoscope',
      lines: [
        { who: 'me', text: 'Bon dia, tinc hora amb la doctora a les cinc.' },
        { who: 'them', text: "Perfecte. Segui un moment, de seguida l'atendran." },
        { who: 'me', text: 'Gràcies, molt amable!' },
      ],
    },
    {
      id: 'work',
      icon: 'briefcase',
      lines: [
        { who: 'me', text: "Bon dia, vinc per l'entrevista de feina." },
        { who: 'them', text: 'Benvinguda! Passi per aquí, si us plau.' },
        { who: 'me', text: 'Moltes gràcies. Estic una mica nerviosa!' },
      ],
    },
    {
      id: 'city',
      icon: 'building-2',
      lines: [
        { who: 'me', text: "Disculpi, per anar a l'Ajuntament?" },
        { who: 'them', text: 'Segueixi aquest carrer i giri a la dreta.' },
        { who: 'me', text: 'Ho he entès! Moltes gràcies!' },
      ],
    },
  ],

  // `for` = públic (programs.for.<x>) | online = mostra l'etiqueta Online
  // span = columnes a pantalles grans (graella de 6) | tone = color
  programs: [
    { id: 'reinforcement', icon: 'graduation-cap', for: ['children'], span: 'sm:col-span-2 lg:col-span-4', tone: 'dark' },
    { id: 'kids', icon: 'languages', for: ['children'], span: 'sm:col-span-2 lg:col-span-2', tone: 'pink' },
    { id: 'women', icon: 'laptop', for: ['women'], online: true, span: 'lg:col-span-3', tone: 'sun' },
    { id: 'conversation', icon: 'messages-square', for: ['women'], online: true, span: 'lg:col-span-3', tone: 'mint' },
  ],

  // Serveis per a escoles (schools.items.<id>.title / .text)
  schoolServices: [
    { id: 'reinforcement', icon: 'graduation-cap' },
    { id: 'language', icon: 'languages' },
    { id: 'team', icon: 'handshake' },
  ],

  journey: [
    { id: 'understand', icon: 'ear' },
    { id: 'speak', icon: 'messages-square' },
    { id: 'participate', icon: 'handshake' },
    { id: 'belong', icon: 'heart' },
  ],

  values: [
    { id: 'language', icon: 'languages' },
    { id: 'community', icon: 'users' },
    { id: 'respect', icon: 'globe' },
    { id: 'solidarity', icon: 'heart-handshake' },
  ],

  help: [
    { id: 'volunteer', icon: 'heart-handshake', subject: 'volunteer' },
    { id: 'partner', icon: 'handshake', subject: 'school' },
  ],

  // Formulari: el primer és el que ve preseleccionat. Textos a form.* i subjects.* dels JSON.
  subjects: [
    { id: 'women', icon: 'laptop' },
    { id: 'children', icon: 'graduation-cap' },
    { id: 'school', icon: 'school' },
    { id: 'volunteer', icon: 'heart-handshake' },
    { id: 'info', icon: 'message-circle' },
  ],

  // Preguntes curtes que apareixen segons el que tria la persona (opcionals).
  // Textos a form.details.<id>.label i form.details.<id>.options.<opció>.
  formDetails: {
    women: [
      { id: 'language', options: ['ca', 'es', 'both'] },
      { id: 'level', options: ['zero', 'some', 'improve'] },
    ],
    children: [
      { id: 'need', options: ['reinforcement', 'catalan', 'spanish', 'unsure'] },
      { id: 'age', options: ['a35', 'a68', 'a912', 'a1316'] },
    ],
    school: [{ id: 'school', type: 'text' }],
  },

  faq: ['enroll', 'level', 'who', 'online', 'schools', 'volunteer', 'data'],

  // Xifres d'impacte. DESACTIVADES: posa-hi dades REALS i canvia `enabled` a true.
  stats: {
    enabled: false,
    items: [
      { id: 'children', value: 100, suffix: '+' },
      { id: 'women', value: 50, suffix: '+' },
      { id: 'schools', value: 5, suffix: '' },
      { id: 'classes', value: 10, suffix: '' },
    ],
  },
};
