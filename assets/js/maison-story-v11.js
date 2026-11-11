/* Maison V11 — leitura progressiva, sem rolagem forçada e sem esconder conteúdo se JS falhar. */
(() => {
  'use strict';
  const story = document.querySelector('[data-treatment-story]');
  if (!story || !document.body || !window.matchMedia) return;
  const details = document.querySelector('.service-details');
  const journey = document.querySelector('.treatment-journey');
  const expand = story.querySelector('[data-story-expand]');
  const chapters = [...story.querySelectorAll('[data-story-chapter]')];
  if (!details || !journey || !expand || chapters.length !== 3) return;

  const mobile = window.matchMedia('(max-width: 720px)');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const sync = () => {
    // Apenas depois de confirmar todos os componentes podemos simplificar a página no mobile.
    document.body.classList.toggle('story-ready', mobile.matches);
  };
  sync();
  if (typeof mobile.addEventListener === 'function') mobile.addEventListener('change', sync);
  else if (typeof mobile.addListener === 'function') mobile.addListener(sync);

  // Exibe os detalhes integrais sob demanda, sem fechar novamente a seção e provocar saltos.
  expand.addEventListener('click', () => {
    document.body.classList.add('story-details-open');
    expand.setAttribute('aria-expanded', 'true');
    expand.textContent = 'Ir para as informações completas';
    details.setAttribute('id', 'informacoes-completas');
    if (typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(() => details.scrollIntoView({
        behavior: reduceMotion.matches ? 'auto' : 'smooth',
        block: 'start'
      }));
    } else {
      details.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  });

  // A animação é decorativa. Capítulos ficam visíveis mesmo sem observer ou JS.
  if (typeof window.IntersectionObserver !== 'function' || reduceMotion.matches) return;
  const observer = new window.IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-inview');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  chapters.forEach(chapter => observer.observe(chapter));
})();
