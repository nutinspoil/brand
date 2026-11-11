/* SUCCESS ABOVE DREAMS — document behaviour.
   Menu, nav dropdowns, header fold, routing and stamp reveal, filters, enquiry slip. */
(() => {
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.mobile-nav');
  const openButton = document.querySelector('[data-menu-open]');
  const closeButton = document.querySelector('[data-menu-close]');
  const headerBrand = document.querySelector('.letterhead .brand');
  const background = [...document.querySelectorAll('main, footer')].filter(element => !menu?.contains(element));
  const dropdowns = [...document.querySelectorAll('details.nav-drop')];
  const previousInert = new Map();
  let menuFocusFrame = null;
  let previousOverflow = '';
  const DESKTOP = 1180;

  function menuItems() {
    return [...menu.querySelectorAll('a[href], button, input, select, textarea, [tabindex]')]
      .filter(item => item.tabIndex >= 0 && !item.matches(':disabled') &&
        !item.closest('[hidden], [inert]') && item.getClientRects().length > 0 &&
        window.getComputedStyle(item).visibility !== 'hidden');
  }

  function closeMenu() {
    if (!menu?.classList.contains('is-open')) return;
    window.cancelAnimationFrame(menuFocusFrame);
    menuFocusFrame = null;
    root.classList.remove('menu-open');
    document.body.style.overflow = previousOverflow;
    openButton?.setAttribute('aria-expanded', 'false');
    previousInert.forEach((wasInert, element) => element.toggleAttribute('inert', wasInert));
    previousInert.clear();
    (window.innerWidth > DESKTOP ? headerBrand : openButton)?.focus({ preventScroll: true });
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    menu.setAttribute('inert', '');
  }

  function openMenu() {
    if (!menu || window.innerWidth > DESKTOP || menu.classList.contains('is-open')) return;
    dropdowns.forEach(dropdown => { dropdown.open = false; });
    previousOverflow = document.body.style.overflow;
    menu.removeAttribute('inert');
    menu.setAttribute('tabindex', '-1');
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    root.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
    openButton?.setAttribute('aria-expanded', 'true');
    background.forEach(element => {
      previousInert.set(element, element.hasAttribute('inert'));
      element.setAttribute('inert', '');
    });
    menuFocusFrame = window.requestAnimationFrame(() => {
      menuFocusFrame = null;
      if (!menu.classList.contains('is-open')) return;
      if (window.innerWidth > DESKTOP) return closeMenu();
      const items = menuItems();
      (items.includes(closeButton) ? closeButton : items[0] || menu).focus({ preventScroll: true });
    });
  }

  if (menu && !menu.classList.contains('is-open')) menu.setAttribute('inert', '');
  openButton?.addEventListener('click', openMenu);
  closeButton?.addEventListener('click', closeMenu);
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', event => {
    if (!menu?.classList.contains('is-open')) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key !== 'Tab') return;
    const items = menuItems();
    if (!items.length) {
      event.preventDefault();
      menu.focus();
    } else if (!items.includes(document.activeElement)) {
      event.preventDefault();
      (event.shiftKey ? items.at(-1) : items[0]).focus();
    } else if (event.shiftKey && document.activeElement === items[0]) {
      event.preventDefault();
      items.at(-1).focus();
    } else if (!event.shiftKey && document.activeElement === items.at(-1)) {
      event.preventDefault();
      items[0].focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > DESKTOP) closeMenu();
    else dropdowns.forEach(dropdown => { dropdown.open = false; });
  });

  dropdowns.forEach(dropdown => dropdown.addEventListener('toggle', () => {
    if (!dropdown.open) return;
    dropdowns.forEach(other => { if (other !== dropdown) other.open = false; });
  }));
  document.addEventListener('click', event => {
    dropdowns.forEach(dropdown => { if (!dropdown.contains(event.target)) dropdown.open = false; });
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || menu?.classList.contains('is-open')) return;
    const dropdown = dropdowns.find(item => item.open);
    if (!dropdown) return;
    event.preventDefault();
    dropdown.open = false;
    dropdown.querySelector('summary')?.focus({ preventScroll: true });
  });

  // The running head folds away once the note itself is on screen.
  if (header) {
    let pinned = false;
    function setPinned() {
      const next = window.scrollY > 56;
      if (next === pinned) return;
      pinned = next;
      header.classList.toggle('is-pinned', pinned);
    }
    setPinned();
    window.addEventListener('scroll', setPinned, { passive: true });
  }

  // One authored sequence: the routing line is drawn, then each stamp settles.
  const reveal = [...document.querySelectorAll('[data-route], [data-stamp]')];
  if (reveal.length) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches || !('IntersectionObserver' in window)) {
      reveal.forEach(element => element.classList.add('is-drawn', 'is-stamped'));
    } else {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(entry.target.hasAttribute('data-route') ? 'is-drawn' : 'is-stamped');
          observer.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.2 });
      reveal.forEach(element => observer.observe(element));
    }
  }

  // The index deck: the readout mirrors whichever key is held.
  document.querySelectorAll('[data-deck]').forEach(deck => {
    const keys = [...deck.querySelectorAll('.index-key')];
    const out = deck.querySelector('[data-deck-read]');
    const fill = deck.querySelector('.index-bar i');
    if (!keys.length) return;

    function show(index) {
      const key = keys[index];
      if (!key) return;
      keys.forEach((item, n) => item.classList.toggle('is-held', n === index));
      const note = key.querySelector('.index-note')?.textContent;
      if (out && note) out.textContent = note;
      if (fill) fill.style.setProperty('--pos', `${Math.round(((index + 1) / keys.length) * 100)}%`);
    }

    keys.forEach((key, index) => {
      key.addEventListener('pointerenter', () => show(index));
      key.addEventListener('focus', () => show(index));
    });
    show(0);
  });

  // Category filters and search on the index pages.
  const filterGroups = [...document.querySelectorAll('[data-filter-group]:not([data-filter-item]):not([data-filter])')];
  function refreshGroup(group) {
    const key = group.dataset.filterGroup;
    const choice = group.dataset.activeFilter || 'all';
    const query = document.querySelector(`[data-search="${key}"]`)?.value.trim().toLowerCase() || '';
    const items = [...document.querySelectorAll(`[data-filter-item][data-filter-group="${key}"]`)];
    items.forEach(item => {
      const matchesCategory = choice === 'all' || item.dataset.category === choice;
      const matchesSearch = !query || item.textContent.toLowerCase().includes(query);
      item.hidden = !(matchesCategory && matchesSearch);
    });
    const empty = document.querySelector(`[data-empty-search="${key}"]`);
    if (empty) empty.hidden = items.some(item => !item.hidden);
  }
  filterGroups.forEach(group => {
    group.dataset.activeFilter = 'all';
    group.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
      group.dataset.activeFilter = button.dataset.filter;
      group.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      refreshGroup(group);
    }));
  });
  document.querySelectorAll('[data-search]').forEach(input => input.addEventListener('input', () => {
    const group = filterGroups.find(item => item.dataset.filterGroup === input.dataset.search);
    if (group) refreshGroup(group);
  }));

  // The enquiry terminal: a live transcript, then a WhatsApp draft the visitor sends themselves.
  const REQUIRED = ['name', 'category', 'brief'];

  function noteLines(values) {
    return [
      'Hello Emmanuel, I would like to discuss a project with Success Above Dreams.',
      '',
      `Name: ${values.get('name') || '-'}`,
      `Business: ${values.get('business') || 'Not provided'}`,
      `Email: ${values.get('email') || 'Not provided'}`,
      `Phone: ${values.get('phone') || 'Not provided'}`,
      `Project type: ${values.get('category') || '-'}`,
      `Industry: ${values.get('industry') || 'Not provided'}`,
      '',
      'Project brief:',
      values.get('brief') || '-',
      `Budget range: ${values.get('budget') || 'Not provided'}`,
      `Target timing: ${values.get('timeline') || 'Not provided'}`
    ].join('\n');
  }

  document.querySelectorAll('[data-whatsapp-form]').forEach(form => {
    const slip = document.querySelector('[data-draft]');
    const state = document.querySelector('[data-draft-state]');

    function preview() {
      if (!slip) return;
      const values = new FormData(form);
      const filled = REQUIRED.filter(key => String(values.get(key) || '').trim());
      slip.replaceChildren();
      if (!filled.length) {
        const hint = document.createElement('span');
        hint.className = 'transcript-empty';
        hint.textContent = 'Fill the form and the message appears here, exactly as WhatsApp will receive it.';
        slip.append(hint);
        if (state) state.textContent = 'Nothing sent yet';
        return;
      }
      slip.textContent = noteLines(values);
      if (state) state.textContent = filled.length === REQUIRED.length ? 'Ready to review' : `${filled.length} of ${REQUIRED.length} essentials filled`;
    }

    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', preview);
      field.addEventListener('change', preview);
    });
    preview();

    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      preview();
      const url = `https://wa.me/233543671806?text=${encodeURIComponent(noteLines(new FormData(form)))}`;
      const draft = window.open(url, '_blank');
      if (draft) draft.opener = null;
      const status = form.querySelector('[data-form-status]');
      if (status) status.textContent = draft
        ? 'WhatsApp opened with your draft. Read it, change anything you like, then press Send.'
        : 'Your browser blocked the WhatsApp tab. Allow pop-ups for this site, or use the direct link beside the button.';
    });
  });

  document.querySelectorAll('[data-year]').forEach(item => { item.textContent = String(new Date().getFullYear()); });
})();
