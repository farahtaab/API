import { site } from '../config/site.js';
import { getLanguage, t, tDefault } from '../i18n/index.js';
import { whatsappUrl } from './whatsapp.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Inicialitza el formulari de contacte (#contact-form) i els botons que preseleccionen el motiu. */
export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const body = form.querySelector('[data-form-body]');
  const successEl = form.querySelector('[data-form-success]');
  const statusEl = form.querySelector('[data-form-status]');
  const submitBtn = form.querySelector('[type="submit"]');
  const intentOf = () => form.elements.intent.value;

  // Mostra només les preguntes de detall del motiu triat.
  const syncDetails = () => {
    form.querySelectorAll('[data-details]').forEach((panel) => {
      panel.hidden = panel.dataset.details !== intentOf();
    });
  };
  form.addEventListener('change', (e) => e.target.name === 'intent' && syncDetails());
  syncDetails();

  // Botons d'altres seccions: <a href="#contact" data-subject="women">
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-subject]');
    if (!trigger) return;
    const radio = form.querySelector(`input[name="intent"][value="${trigger.dataset.subject}"]`);
    if (radio) {
      radio.checked = true;
      syncDetails();
    }
  });

  const setStatus = (key, tone) => {
    if (!key) {
      statusEl.hidden = true;
      statusEl.removeAttribute('data-i18n');
      statusEl.textContent = '';
      return;
    }
    statusEl.hidden = false;
    statusEl.dataset.i18n = key; // es retraduirà si l'usuari canvia d'idioma
    statusEl.textContent = t(key);
    statusEl.className =
      'rounded-2xl px-4 py-3 text-sm font-semibold ' +
      (tone === 'ok' ? 'bg-brand-100 text-brand-800' : 'bg-red-50 text-red-800');
  };

  const showSuccess = (on) => {
    body.hidden = on;
    successEl.hidden = !on;
    if (on) {
      successEl.focus({ preventScroll: true });
      form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const setFieldError = (name, key) => {
    const errorEl = form.querySelector(`[data-error-for="${name}"]`);
    const inputs = name === 'contact' ? [form.elements.email, form.elements.phone] : [form.elements[name]];
    inputs.forEach((input) => input && (key ? input.setAttribute('aria-invalid', 'true') : input.removeAttribute('aria-invalid')));
    if (!errorEl) return;
    if (key) {
      errorEl.dataset.i18n = key;
      errorEl.textContent = t(key);
    } else {
      errorEl.removeAttribute('data-i18n');
      errorEl.textContent = '';
    }
  };

  const v = (n) => form.elements[n].value.trim();

  const validate = () => {
    let firstInvalid = null;
    const check = (name, key, ok, focusEl = form.elements[name]) => {
      setFieldError(name, ok ? null : key);
      if (!ok && !firstInvalid) firstInvalid = focusEl;
    };
    check('name', 'form.errors.required', v('name') !== '');
    check('contact', 'form.errors.contact', v('email') !== '' || v('phone') !== '', form.elements.phone);
    check('email', 'form.errors.email', v('email') === '' || EMAIL_RE.test(v('email')));
    check('phone', 'form.errors.phone', v('phone') === '' || v('phone').replace(/\D/g, '').length >= 7);
    check('consent', 'form.errors.consent', form.elements.consent.checked);
    firstInvalid?.focus();
    return !firstInvalid;
  };

  // Neteja l'error d'un camp mentre l'usuari escriu.
  form.addEventListener('input', (e) => {
    if (!e.target.name) return;
    setFieldError(e.target.name, null);
    if (e.target.name === 'email' || e.target.name === 'phone') setFieldError('contact', null);
  });

  /** Respostes de detall en català (és l'idioma amb què les llegeix l'associació). */
  const detailLines = () => {
    const lines = [];
    for (const f of site.formDetails[intentOf()] ?? []) {
      const el = form.elements[`d-${f.id}`];
      const value = (el.value ?? '').trim();
      if (!value) continue;
      const shown = f.type === 'text' ? value : tDefault(`form.details.${f.id}.options.${value}`);
      lines.push(`${tDefault(`form.details.${f.id}.label`)} ${shown}`);
    }
    return lines;
  };

  const collect = () => {
    const details = detailLines();
    const free = v('message');
    return {
      name: v('name'),
      email: v('email'),
      phone: v('phone'),
      subject: tDefault(`subjects.${intentOf()}`),
      details,
      message: [...details, free && `\n${free}`].filter(Boolean).join('\n'),
      language: getLanguage(),
    };
  };

  async function send(p) {
    const { provider, endpoint, accessKey } = site.form;

    if (provider === 'formsubmit') {
      // Envia el missatge directament al correu de l'associació (https://formsubmit.co).
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(site.contact.email)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: p.name,
          ...(p.email ? { email: p.email } : {}),
          phone: p.phone || '-',
          subject: p.subject,
          message: p.message || '-',
          language: p.language,
          _subject: `[Web] ${p.subject} - ${p.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) !== 'true') throw new Error('formsubmit');
      return 'sent';
    }

    if (provider === 'web3forms') {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: accessKey, ...p, subject: `[Web] ${p.subject}`, from_name: p.name }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false) throw new Error('web3forms');
      return 'sent';
    }

    if (provider === 'formspree' || provider === 'custom') {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(p),
      });
      if (!res.ok) throw new Error(provider);
      return 'sent';
    }

    // 'mailto' (sense backend)
    const text = `${p.message}\n\n— ${p.name}${p.email ? `\n${p.email}` : ''}${p.phone ? `\n${p.phone}` : ''}`;
    location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(`[Web] ${p.subject}`)}&body=${encodeURIComponent(text)}`;
    return 'mailto';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    setStatus(null);
    if (!validate()) return;
    // Honeypot anti-spam: els bots omplen aquest camp amagat.
    if (form.elements.website.value) return showSuccess(true);

    submitBtn.disabled = true;
    try {
      const result = await send(collect());
      if (result === 'mailto') {
        setStatus('form.mailto', 'ok');
      } else {
        form.reset();
        syncDetails();
        showSuccess(true);
      }
    } catch {
      setStatus('form.error', 'error');
    } finally {
      submitBtn.disabled = false;
    }
  });

  form.querySelector('[data-form-again]')?.addEventListener('click', () => {
    showSuccess(false);
    form.elements.name.focus();
  });

  // Enviar el mateix per WhatsApp
  form.querySelector('[data-form-whatsapp]')?.addEventListener('click', () => {
    const p = collect();
    const intro = p.name ? t('whatsapp.formIntro', { name: p.name }) : t('whatsapp.message');
    const text = p.message ? `${intro}\n\n${p.message}` : intro;
    window.open(whatsappUrl(text), '_blank', 'noopener');
  });
}
