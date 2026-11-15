(() => {
  const doc = document;
  const body = doc.body;

  function initHeader() {
    const header = doc.querySelector('[data-header]');
    if (!header) return;
    const setState = () => header.classList.toggle('is-stuck', window.scrollY > 8);
    setState();
    window.addEventListener('scroll', setState, { passive: true });
  }

  function initDisclosures() {
    const drops = [...doc.querySelectorAll('[data-nav-drop]')];
    if (!drops.length) return;

    const closeAll = except => {
      drops.forEach(drop => {
        if (drop !== except) drop.open = false;
      });
    };

    drops.forEach(drop => {
      drop.addEventListener('toggle', () => {
        if (drop.open) closeAll(drop);
      });
      drop.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
          drop.open = false;
          drop.querySelector('summary')?.focus();
        }
      });
    });

    doc.addEventListener('click', event => {
      if (!event.target.closest('[data-nav-drop]')) closeAll();
    });

    doc.addEventListener('focusin', event => {
      const active = event.target.closest('[data-nav-drop]');
      if (active) closeAll(active);
    });
  }

  function initMenu() {
    const drawer = doc.querySelector('[data-menu]');
    const openButton = doc.querySelector('[data-menu-open]');
    const closeButton = doc.querySelector('[data-menu-close]');
    if (!drawer || !openButton) return;

    let returnFocus = null;

    const focusables = () =>
      [...drawer.querySelectorAll('a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])')].filter(
        element => element.offsetParent !== null
      );

    const open = () => {
      returnFocus = doc.activeElement;
      drawer.removeAttribute('inert');
      drawer.setAttribute('aria-hidden', 'false');
      drawer.setAttribute('data-open', '');
      openButton.setAttribute('aria-expanded', 'true');
      body.classList.add('menu-open');
      // force the visibility change to apply before moving focus into the drawer
      void drawer.offsetWidth;
      (closeButton || focusables()[0])?.focus();
    };

    const close = ({ restore = true } = {}) => {
      drawer.removeAttribute('data-open');
      drawer.setAttribute('aria-hidden', 'true');
      drawer.setAttribute('inert', '');
      openButton.setAttribute('aria-expanded', 'false');
      body.classList.remove('menu-open');
      if (restore && returnFocus) returnFocus.focus();
    };

    openButton.addEventListener('click', open);
    closeButton?.addEventListener('click', () => close());

    drawer.addEventListener('click', event => {
      if (event.target === drawer) close();
      if (event.target.closest('a')) close({ restore: false });
    });

    doc.addEventListener('keydown', event => {
      if (!drawer.hasAttribute('data-open')) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && doc.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && doc.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  function initScrollRegions() {
    doc.querySelectorAll('.table-wrap').forEach(wrap => {
      const sync = () => {
        if (wrap.scrollWidth > wrap.clientWidth) wrap.setAttribute('tabindex', '0');
        else wrap.removeAttribute('tabindex');
      };
      sync();
      window.addEventListener('resize', sync, { passive: true });
    });
  }

  function initPicker() {
    doc.querySelectorAll('[data-picker]').forEach(picker => {
      const buttons = [...picker.querySelectorAll('[data-pick]')];
      const panels = [...picker.querySelectorAll('[data-panel]')];
      const status = picker.querySelector('[data-picker-status]');
      if (!buttons.length) return;

      const select = (id, { focus = false } = {}) => {
        let selected = null;
        buttons.forEach(button => {
          const active = button.dataset.pick === id;
          button.setAttribute('aria-pressed', String(active));
          if (active) selected = button;
        });
        panels.forEach(panel => {
          if (panel.dataset.panel === id) panel.setAttribute('data-active', 'true');
          else panel.removeAttribute('data-active');
        });
        if (status && selected) status.textContent = `Showing ${selected.textContent.trim()}.`;
        if (focus) selected?.focus();
      };

      buttons.forEach(button => {
        button.addEventListener('click', () => select(button.dataset.pick));
        button.addEventListener('keydown', event => {
          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
          event.preventDefault();
          const index = buttons.indexOf(button);
          let next = index;
          if (event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
          if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
          if (event.key === 'Home') next = 0;
          if (event.key === 'End') next = buttons.length - 1;
          select(buttons[next].dataset.pick, { focus: true });
        });
      });
    });
  }

  function initReveals() {
    const targets = [
      ...doc.querySelectorAll(
        '.band .section-head, .feature-proof, .picker, .rows__item, .routes__item, .founder__portrait, .founder__copy, .stage-strip, .practice-grid, .comparison, .proof-strip, .work-list, .cta-panel, .ethics, .service-block'
      )
    ];
    if (!targets.length) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) return;

    targets.forEach((target, index) => {
      target.classList.add('reveal');
      if (target.matches('.rows__item, .routes__item')) {
        target.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 55}ms`);
      }
    });

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    targets.forEach(target => observer.observe(target));

    window.setTimeout(() => {
      targets.forEach(target => target.classList.add('is-in'));
    }, 2400);
  }

  function initWork() {
    const root = doc.querySelector('[data-work]');
    if (!root) return;
    const form = doc.querySelector('[data-work-search]');
    const input = doc.querySelector('[data-work-input]');
    const count = doc.querySelector('[data-work-count]');
    const empty = doc.querySelector('[data-work-empty]');
    const filters = [...doc.querySelectorAll('[data-filter]')];
    const resets = [...doc.querySelectorAll('[data-work-reset]')];
    const items = [...root.querySelectorAll('[data-work-item]')];
    const groups = [...root.querySelectorAll('[data-work-group]')];
    if (!input || !items.length) return;

    const normalise = value =>
      value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    let group = 'all';
    let announceTimer = 0;

    const apply = ({ announce = true } = {}) => {
      const tokens = normalise(input.value).split(/\s+/).filter(Boolean);
      let visible = 0;

      items.forEach(item => {
        const haystack = normalise(`${item.dataset.search || ''} ${item.textContent}`);
        const matchesQuery = tokens.every(token => haystack.includes(token));
        const matchesGroup = group === 'all' || item.dataset.group === group;
        const show = matchesQuery && matchesGroup;
        item.hidden = !show;
        if (show) visible += 1;
      });

      groups.forEach(section => {
        const hasVisible = [...section.querySelectorAll('[data-work-item]')].some(item => !item.hidden);
        section.hidden = !hasVisible;
      });

      if (empty) empty.hidden = visible !== 0;
      resets.forEach(reset => {
        reset.hidden = group === 'all' && input.value.trim() === '';
      });

      if (count) {
        const total = items.length;
        const text =
          visible === 0
            ? 'No projects match'
            : group === 'all' && tokens.length === 0
              ? `${visible} ${visible === 1 ? 'project' : 'projects'}`
              : `${visible} of ${total} projects shown`;
        if (announce) {
          window.clearTimeout(announceTimer);
          announceTimer = window.setTimeout(() => {
            count.textContent = text;
          }, 220);
        } else {
          count.textContent = text;
        }
      }
    };

    filters.forEach(button => {
      button.addEventListener('click', () => {
        group = button.dataset.filter;
        filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
        apply();
      });
    });

    input.addEventListener('input', () => apply());
    input.addEventListener('keydown', event => {
      if (event.key === 'Escape' && input.value) {
        input.value = '';
        apply();
      }
    });

    form?.addEventListener('submit', event => {
      event.preventDefault();
      apply();
    });

    resets.forEach(reset => {
      reset.addEventListener('click', () => {
        input.value = '';
        group = 'all';
        filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter.dataset.filter === 'all')));
        apply();
        input.focus();
      });
    });

    apply({ announce: false });
  }

  function initIntake() {
    const form = doc.querySelector('[data-intake-form]');
    if (!form) return;

    const prefillNode = doc.getElementById('intake-prefills');
    let prefills = {};
    try {
      prefills = prefillNode ? JSON.parse(prefillNode.textContent) : {};
    } catch (error) {
      prefills = {};
    }

    const field = name => form.elements.namedItem(name);
    const nameField = field('name');
    const contactField = field('contact');
    const briefField = field('brief');
    const situationField = field('situation');
    const consentField = field('consent');
    const required = [
      [nameField, 'name'],
      [contactField, 'contact'],
      [briefField, 'brief']
    ];
    const optional = ['organisation', 'situation', 'firstVersion', 'timing', 'budget'].map(field);

    const state = doc.querySelector('[data-transcript-state]');
    const transcript = doc.querySelector('[data-transcript-body]');
    const emptyCopy = transcript ? transcript.textContent : '';
    const preparedSection = doc.querySelector('[data-prepared]');
    const preparedPanel = doc.querySelector('[data-prepared-panel]');
    const preparedLink = doc.querySelector('[data-prepared-link]');
    const preparedReset = doc.querySelector('[data-prepared-reset]');

    const valueOf = element => (element ? String(element.value || '').trim() : '');

    const message = () => {
      const lines = [];
      const name = valueOf(nameField);
      const contact = valueOf(contactField);
      const brief = valueOf(briefField);

      lines.push('Hello Emmanuel,');
      lines.push('');
      if (name) lines.push(`My name is ${name}.`);
      if (contact) lines.push(`You can reply to me at ${contact}.`);
      if (name || contact) lines.push('');
      if (brief) lines.push('What I am trying to build or improve:', brief);
      optional.forEach(element => {
        if (!element) return;
        const value = valueOf(element);
        if (!value || value === 'Not decided') return;
        const label = element.closest('.field')?.querySelector('label')?.childNodes[0]?.textContent?.trim();
        if (!label) return;
        lines.push('', `${label}:`, value);
      });
      lines.push('', 'Sent from the project brief on successabovedreams.vercel.app.');
      return lines.join('\n');
    };

    const setState = text => {
      if (!state) return;
      state.textContent = text;
      state.dataset.state = text === 'Ready to review' ? 'ready' : '';
    };

    const updateTranscript = () => {
      if (!transcript) return;
      const hasRequired = required.every(([element]) => valueOf(element));
      transcript.textContent = hasRequired ? message() : emptyCopy;
      setState(hasRequired ? 'Ready to review' : 'Incomplete');
      if (preparedSection && !preparedSection.hidden) {
        preparedSection.hidden = true;
      }
    };

    const clearError = name => {
      const error = form.querySelector(`[data-error-for="${name}"]`);
      const control = field(name);
      if (error) error.hidden = true;
      if (control && control.getAttribute('aria-invalid')) control.removeAttribute('aria-invalid');
    };

    const showError = (name, focus = false) => {
      const error = form.querySelector(`[data-error-for="${name}"]`);
      const control = field(name);
      if (error) error.hidden = false;
      if (control) {
        control.setAttribute('aria-invalid', 'true');
        if (focus) control.focus();
      }
    };

    const validate = () => {
      let firstInvalid = null;
      required.forEach(([element, name]) => {
        if (!valueOf(element)) {
          firstInvalid = firstInvalid || element;
          showError(name);
        } else {
          clearError(name);
        }
      });
      if (consentField && !consentField.checked) {
        showError('consent');
        firstInvalid = firstInvalid || consentField;
      } else {
        clearError('consent');
      }
      if (firstInvalid) {
        firstInvalid.focus();
        return false;
      }
      return true;
    };

    form.addEventListener('input', event => {
      const name = event.target?.name;
      if (name) clearError(name);
      updateTranscript();
    });

    form.addEventListener('change', event => {
      const name = event.target?.name;
      if (name) clearError(name);
      updateTranscript();
    });

    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!validate()) return;

      if (preparedLink) {
        const number = prefills.whatsapp || '233543671806';
        preparedLink.href = `https://wa.me/${number}?text=${encodeURIComponent(message())}`;
      }
      if (transcript) transcript.textContent = message();
      setState('Message prepared');
      if (preparedSection) {
        preparedSection.hidden = false;
        preparedPanel?.focus();
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        preparedSection.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' });
      }
    });

    preparedReset?.addEventListener('click', () => {
      if (preparedSection) preparedSection.hidden = true;
      const first = nameField || briefField;
      first?.focus();
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      form.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' });
      updateTranscript();
    });

    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');
    const situation = params.get('situation');
    if (service && prefills.services && prefills.services[service] && briefField && !valueOf(briefField)) {
      briefField.value = prefills.services[service];
    }
    if (situation && prefills.situations && prefills.situations[situation] && situationField && !valueOf(situationField)) {
      situationField.value = prefills.situations[situation];
    }

    updateTranscript();
  }

  function initHashFocus() {
    if (!window.location.hash) return;
    let target = null;
    try {
      target = doc.querySelector(window.location.hash);
    } catch (error) {
      target = null;
    }
    if (!target) return;
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    window.requestAnimationFrame(() => target.focus({ preventScroll: true }));
  }

  initHeader();
  initDisclosures();
  initMenu();
  initScrollRegions();
  initPicker();
  initWork();
  initIntake();
  initHashFocus();
  initReveals();
})();
