/* Maison V10 · Enquete de orientação mobile, sem coleta de respostas.
   Se JavaScript falhar, o catálogo completo V9 continua disponível. */
(() => {
  'use strict';
  const root = document.querySelector('[data-mobile-care-wizard]');
  if (!root || typeof window.matchMedia !== 'function') return;
  const media = window.matchMedia('(max-width: 720px)');
  const first = root.querySelector('[data-step-panel="1"]');
  const second = root.querySelector('[data-step-panel="2"]');
  const options = [...root.querySelectorAll('[data-choose-care]')];
  const services = [...root.querySelectorAll('[data-wizard-service]')];
  const back = root.querySelector('[data-care-back]');
  const all = root.querySelector('[data-show-all]');
  const title = root.querySelector('[data-care-title]');
  const intro = root.querySelector('[data-care-intro]');
  const stepLabel = root.querySelector('[data-care-step-label]');
  const categoryLabel = root.querySelector('[data-care-category]');
  if (!first || !second || options.length !== 4 || services.length !== 7 ||
      !back || !all || !title || !intro || !stepLabel || !categoryLabel) return;

  const openingTitle = title.textContent;
  const openingIntro = intro.textContent;
  const labels = new Map(options.map(button => [button.dataset.chooseCare, button.dataset.careTitle]));
  let lastButton = null;
  const validCategories = new Set([...labels.keys(), 'todos']);

  // A escolha fica apenas no estado da entrada atual do histórico do navegador.
  // Não há cookies, sessionStorage, requisições ou cadastro.
  function remember(category) {
    try {
      if (!window.history || typeof window.history.replaceState !== 'function') return;
      const previous = window.history.state;
      const state = previous && typeof previous === 'object' ? previous : {};
      window.history.replaceState({...state, maisonCare: category}, '');
    } catch (_) { /* histórico indisponível: a navegação continua funcionando */ }
  }

  function restore() {
    try {
      const saved = window.history?.state?.maisonCare;
      return validCategories.has(saved) ? saved : null;
    } catch (_) { return null; }
  }

  function refreshResponsive() {
    document.body.classList.toggle('mobile-care-active', media.matches);
  }
  function showStep(step, category, restoring = false) {
    const detail = step === 2;
    root.dataset.step = String(step);
    first.hidden = detail;
    second.hidden = !detail;
    stepLabel.textContent = 'Etapa ' + step + ' de 2';
    title.textContent = detail ? 'Qual tratamento você quer conhecer?' : openingTitle;
    intro.textContent = detail
      ? 'Escolha um tratamento para abrir a página com informações completas.'
      : openingIntro;
    if (detail) {
      const viewingAll = category === 'todos';
      categoryLabel.textContent = viewingAll ? 'TODOS OS TRATAMENTOS' : (labels.get(category) || '').toUpperCase();
      services.forEach(link => {
        const groups = (link.dataset.wizardService || '').split(' ');
        link.hidden = !(viewingAll || groups.includes(category));
      });
      all.hidden = viewingAll;
    } else {
      services.forEach(link => link.hidden = false);
      all.hidden = false;
    }
    if (!restoring) {
      remember(detail ? category : null);
      if (media.matches) root.scrollIntoView({ block: 'start', behavior: 'auto' });
      title.focus({ preventScroll: true });
    }
  }

  options.forEach(button => {
    button.addEventListener('click', () => {
      lastButton = button;
      showStep(2, button.dataset.chooseCare);
    });
  });
  back.addEventListener('click', () => {
    showStep(1);
    lastButton?.focus({ preventScroll: true });
  });
  all.addEventListener('click', () => showStep(2, 'todos'));

  // O retorno do navegador restaura o passo sem novo scroll ou foco forçado.
  refreshResponsive();
  const previousCategory = restore();
  if (previousCategory) showStep(2, previousCategory, true);
  if (typeof media.addEventListener === 'function') media.addEventListener('change', refreshResponsive);
  else if (typeof media.addListener === 'function') media.addListener(refreshResponsive);
})();
