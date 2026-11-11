/* Maison V13 — comparações educativas. Sem JS: as duas explicações ficam disponíveis. */
(() => {
  'use strict';
  const backLink = document.querySelector('[data-return-to-quiz]');
  if (backLink && window.history && window.history.length > 1) {
    try {
      const previous = new URL(document.referrer);
      const current = new URL(window.location.href);
      // Só usar Voltar quando esta página veio diretamente da escolha da Maison.
      if (previous.origin === current.origin &&
          previous.pathname.endsWith('/especialidades.html')) {
        backLink.addEventListener('click', event => {
          event.preventDefault();
          window.history.back();
        });
      }
    } catch (_) { /* manter o href normal caso a origem não possa ser verificada */ }
  }

  const root = document.querySelector('[data-care-compare]');
  if (!root) return;
  const list = root.querySelector('[data-compare-tabs]');
  const tabs = [...root.querySelectorAll('[data-compare-tab]')];
  const panels = [...root.querySelectorAll('[data-compare-panel]')];
  if (!list || tabs.length !== 2 || panels.length !== 2) return;
  const keys = tabs.map(tab => tab.dataset.compareTab);
  if (new Set(keys).size !== 2 ||
      keys.some(key => !panels.some(panel => panel.dataset.comparePanel === key))) return;

  list.setAttribute('role', 'tablist');
  list.setAttribute('aria-label', 'Comparar tratamentos');
  tabs.forEach(tab => {
    tab.setAttribute('role', 'tab');
  });
  panels.forEach(panel => {
    panel.setAttribute('role', 'tabpanel');
    panel.tabIndex = 0;
  });

  const activate = (key, focus = false) => {
    const activeIndex = keys.indexOf(key);
    if (activeIndex < 0) return;
    tabs.forEach((tab, index) => {
      tab.setAttribute('aria-selected', String(index === activeIndex));
      tab.tabIndex = index === activeIndex ? 0 : -1;
    });
    panels.forEach(panel => {
      panel.hidden = panel.dataset.comparePanel !== key;
    });
    if (focus) tabs[activeIndex].focus({preventScroll:true});
  };

  activate(keys[0]);
  root.classList.add('is-enhanced');

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(keys[index]));
    tab.addEventListener('keydown', event => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 :
        event.key === 'End' ? tabs.length - 1 :
        (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      activate(keys[next], true);
    });
  });
})();
