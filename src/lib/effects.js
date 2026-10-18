const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Anima l'aparició dels elements .reveal quan entren al viewport. */
export function initReveal(root = document) {
  const items = root.querySelectorAll('.reveal:not(.is-visible)');
  if (!('IntersectionObserver' in window) || reduceMotion()) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );
  items.forEach((el) => observer.observe(el));
}

/** Comptadors animats: <span data-count="120" data-suffix="+"></span> */
export function initCounters(root = document) {
  const els = root.querySelectorAll('[data-count]');
  const reduce = reduceMotion();
  const write = (el, n) => {
    el.textContent = `${n}${el.dataset.suffix ?? ''}`;
  };
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        observer.unobserve(el);
        const target = Number(el.dataset.count);
        if (reduce) return write(el, target);
        const start = performance.now();
        const duration = 1400;
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          write(el, Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    },
    { threshold: 0.5 },
  );
  els.forEach((el) => {
    write(el, 0);
    observer.observe(el);
  });
}

/** Llum que segueix el ratolí a les targetes .spotlight. */
export function initSpotlight() {
  document.addEventListener(
    'pointermove',
    (e) => {
      const card = e.target.closest?.('.spotlight');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    },
    { passive: true },
  );
}

/** Barra de progrés de lectura + ombra de la capçalera en fer scroll. */
export function initScrollEffects() {
  const bar = document.querySelector('[data-scroll-progress]');
  const header = document.querySelector('[data-header]');
  let ticking = false;
  const update = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar?.style.setProperty('--progress', max > 0 ? String(Math.min(scrollY / max, 1)) : '0');
    header?.setAttribute('data-scrolled', String(scrollY > 8));
  };
  addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}
