/* Maison — progressive enhancements; all contact links and navigation work without JS. */
(() => {
  'use strict';
  const opening = document.getElementById('opening');
  if (!opening) return;
  let seen = false;
  try { seen = sessionStorage.getItem('maisonIntroV4') === '1'; } catch (_) {}
  const reduced = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const close = () => {
    opening.classList.add('is-hidden');
    try { sessionStorage.setItem('maisonIntroV4', '1'); } catch (_) {}
    setTimeout(() => opening.remove(), 250);
  };
  if (seen || reduced) { opening.remove(); return; }
  opening.querySelector('.opening-skip')?.addEventListener('click', close);
  opening.addEventListener('animationend', (event) => {
    if (event.target === opening && event.animationName === 'maison-opening-exit') close();
  });
  // CSS independently removes the overlay; no body scroll lock is ever applied.
  setTimeout(close, window.innerWidth <= 720 ? 1450 : 1750);
})();
(() => {
  'use strict';
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { mobileMenu.open = false; }));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') mobileMenu.open = false; });
    document.addEventListener('click', event => { if (!mobileMenu.contains(event.target)) mobileMenu.open = false; });
    window.addEventListener('resize', () => { if (window.innerWidth > 1020) mobileMenu.open = false; });
  }
  const filters = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');
  const filterStatus = document.querySelector('[data-filter-status]');
  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      const category = filter.dataset.filter;
      filters.forEach(button => button.setAttribute('aria-pressed', String(button === filter)));
      let visible = 0;
      cards.forEach(card => { card.hidden = category !== 'todos' && card.dataset.category !== category; if (!card.hidden) visible++; });
      if (filterStatus) filterStatus.textContent = `${visible} especialidade${visible === 1 ? '' : 's'} em exibição.`;
    });
  });
  document.documentElement.classList.add('enhanced');
})();
