(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const toastEl = $('[data-toast]');
  let toastTimer = null;

  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toastEl.hidden = true;
    }, 2200);
  }

  // Year
  const year = $('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  // Mobile nav
  const toggle = $('[data-nav-toggle]');
  const links = $('[data-nav-links]');
  if (toggle && links) {
    const close = () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    $$('#navLinks a').forEach((a) => a.addEventListener('click', close));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
    document.addEventListener('click', (e) => {
      if (!links.classList.contains('is-open')) return;
      const t = e.target;
      if (!(t instanceof Node)) return;
      if (!links.contains(t) && !toggle.contains(t)) close();
    });
  }

  // Smooth scroll for buttons
  $$('[data-scroll]').forEach((el) => {
    el.addEventListener('click', (e) => {
      const href = el.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = $(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', href);
    });
  });

  // Copy to clipboard helpers
  $$('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy') || '';
      try {
        await navigator.clipboard.writeText(text);
        toast(`Copied: ${text}`);
      } catch {
        toast('Copy failed (browser blocked it).');
      }
    });
  });

  // Demo buttons: quick toasts
  $$('[data-toast]').forEach((el) => {
    if (el === toastEl) return;
    el.addEventListener('click', () => {
      const msg = el.getAttribute('data-toast');
      if (msg) toast(msg);
    });
  });

  // Fake signup form (hook this up to your backend)
  const form = $('[data-signup]');
  const success = $('[data-success]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = /** @type {HTMLInputElement|null} */ ($('#email'));
      const value = email?.value?.trim();
      if (!value) {
        toast('Add an email first.');
        email?.focus();
        return;
      }
      toast('Request sent.');
      if (success) success.hidden = false;
      form.reset();
    });
  }
})();


