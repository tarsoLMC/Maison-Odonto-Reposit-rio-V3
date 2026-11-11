/* Maison V9 · Seletor de tratamentos: acessível e progressivo.
   Sem JavaScript, as quatro categorias são âncoras e os quatro painéis continuam legíveis. */
(() => {
  'use strict';
  const root = document.querySelector('[data-maison-concierge]');
  if (!root) return;

  const list = root.querySelector('[data-concierge-list]');
  const tabs = [...root.querySelectorAll('[data-concierge-tab]')];
  const panels = [...root.querySelectorAll('[data-concierge-panel]')];
  const counter = root.querySelector('[data-concierge-counter]');
  if (!list || tabs.length !== 4 || panels.length !== 4) return;

  const ids = tabs.map(tab => tab.dataset.conciergeTab);
  if (new Set(ids).size !== ids.length ||
      ids.some(id => !panels.find(panel => panel.dataset.conciergePanel === id))) return;

  // Roles de abas só são ativados quando o comportamento está funcional.
  list.setAttribute('role', 'tablist');
  list.setAttribute('aria-label', 'Selecione uma área de tratamento');
  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', 'concierge-' + ids[index]);
  });
  panels.forEach(panel => {
    panel.setAttribute('role', 'tabpanel');
    panel.tabIndex = 0;
  });

  const select = (id, moveFocus = false) => {
    const index = ids.indexOf(id);
    if (index < 0) return;
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(panel => {
      panel.hidden = panel.dataset.conciergePanel !== id;
    });
    if (counter) counter.textContent = String(index + 1).padStart(2, '0');
    if (moveFocus) tabs[index].focus({ preventScroll: true });
  };

  // Suporta URLs com âncora, sem impor rolagem ou saltos ao alternar.
  const initial = decodeURIComponent(location.hash.slice(1)).replace(/^concierge-/, '');
  select(ids.includes(initial) ? initial : ids[0]);
  root.classList.add('is-enhanced');

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', event => {
      event.preventDefault();
      select(ids[index]);
    });
    tab.addEventListener('keydown', event => {
      const key = event.key;
      if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(key)) return;
      event.preventDefault();
      let next = index;
      if (key === 'Home') next = 0;
      else if (key === 'End') next = tabs.length - 1;
      else next = (index + (key === 'ArrowRight' || key === 'ArrowDown' ? 1 : -1) + tabs.length) % tabs.length;
      select(ids[next], true);
    });
  });

  window.addEventListener('hashchange', () => {
    const id = decodeURIComponent(location.hash.slice(1)).replace(/^concierge-/, '');
    if (ids.includes(id)) select(id);
  });
})();
