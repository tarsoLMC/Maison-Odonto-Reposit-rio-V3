/* Maison V5 — progressive enhancement. Navigation and contact never depend on JS. */
(() => {
  'use strict';
  const opening = document.getElementById('opening');
  if (!opening) return;
  let seen = false;
  try { seen = sessionStorage.getItem('maisonIntroV5') === '1'; } catch (_) {}
  const close = () => {
    opening.classList.add('is-hidden');
    try { sessionStorage.setItem('maisonIntroV5', '1'); } catch (_) {}
    setTimeout(() => opening.remove(), 250);
  };
  if (seen || matchMedia('(prefers-reduced-motion: reduce)').matches) { close(); return; }
  opening.querySelector('.opening-skip')?.addEventListener('click', close);
  opening.addEventListener('animationend', e => {
    if (e.target === opening && e.animationName === 'maison-opening-exit') close();
  });
  // Independent CSS fallback exits after 2.3s, including with JS unavailable.
  setTimeout(close, innerWidth <= 720 ? 1450 : 1750);
})();
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const menu = document.querySelector('.mobile-menu');
  if (menu) {
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { menu.open = false; }));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') menu.open = false; });
    document.addEventListener('click', e => { if (!menu.contains(e.target)) menu.open = false; });
    addEventListener('resize', () => { if (innerWidth > 1120) menu.open = false; });
  }
  document.querySelector('.contact-dismiss')?.addEventListener('click', () => {
    const float = document.querySelector('.contact-float');
    float.classList.add('is-compact');
    float.querySelector('a').setAttribute('aria-label', 'Falar com a Maison pelo WhatsApp');
    float.querySelector('a').focus();
  });
  document.querySelectorAll('[data-carousel]').forEach(rail => {
    const name = rail.dataset.carousel;
    const cards = [...rail.children];
    rail.tabIndex = 0;
    rail.setAttribute('role', 'region');
    const prev = document.querySelector(`[data-prev="${name}"]`);
    const next = document.querySelector(`[data-next="${name}"]`);
    const status = document.querySelector(`[data-status="${name}"]`);
    const autoplay = document.querySelector(`[data-autoplay="${name}"]`);
    let playing = Boolean(autoplay) && !reduced.matches;
    let timer;
    const step = () => cards[1] ? cards[1].offsetLeft - cards[0].offsetLeft : rail.clientWidth;
    const end = () => Math.max(0, rail.scrollWidth - rail.clientWidth);
    const update = () => {
      const index = Math.min(cards.length, Math.round(rail.scrollLeft / step()) + 1);
      if (status) status.textContent = `${String(index).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
      if (prev) prev.disabled = rail.scrollLeft < 2;
      if (next) next.disabled = rail.scrollLeft >= end() - 2;
    };
    const move = (direction, wrap = false) => rail.scrollTo({
      left: wrap && rail.scrollLeft >= end() - 2 ? 0 : rail.scrollLeft + direction * step(),
      behavior: reduced.matches ? 'instant' : 'smooth'
    });
    const sync = () => {
      clearInterval(timer);
      if (autoplay) {
        autoplay.setAttribute('aria-label', playing ? 'Pausar rotação de avaliações' : 'Iniciar rotação de avaliações');
        autoplay.setAttribute('aria-pressed', String(playing));
        autoplay.innerHTML = playing ? '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14" fill="none" stroke="currentColor" stroke-width="2"/></svg>' : '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7Z" fill="currentColor"/></svg>';
      }
      if (playing && !document.hidden) timer = setInterval(() => {
        if (!rail.matches(':hover') && !rail.contains(document.activeElement)) move(1, true);
      }, 7000);
    };
    const stop = () => { playing = false; sync(); };
    rail.addEventListener('keydown', e => {
      if (e.target !== rail || !['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return;
      e.preventDefault(); stop();
      if (e.key === 'Home' || e.key === 'End') rail.scrollTo({left:e.key === 'Home' ? 0 : end(),behavior:reduced.matches ? 'instant' : 'smooth'});
      else move(e.key === 'ArrowRight' ? 1 : -1);
    });
    prev?.addEventListener('click', () => { stop(); move(-1); });
    next?.addEventListener('click', () => { stop(); move(1); });
    rail.addEventListener('pointerdown', stop, { passive: true });
    rail.addEventListener('focusin', stop);
    rail.addEventListener('scroll', update, { passive: true });
    autoplay?.addEventListener('click', () => { playing = !playing; sync(); });
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', () => { if (reduced.matches) stop(); });
    addEventListener('resize', update);
    update(); sync();
  });
  const modal = document.querySelector('.gallery-modal');
  const photos = [...document.querySelectorAll('[data-gallery]')];
  if (modal && typeof modal.showModal === 'function') {
    let current = 0;
    let trigger;
    const show = index => {
      current = (index + photos.length) % photos.length;
      const photo = photos[current];
      const img = modal.querySelector('[data-modal-image]');
      img.src = photo.href;
      img.alt = photo.dataset.caption;
      modal.querySelector('[data-modal-caption]').textContent = photo.dataset.caption;
      modal.querySelector('[data-modal-count]').textContent = `${current + 1} / ${photos.length}`;
    };
    photos.forEach((photo, index) => photo.addEventListener('click', e => {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      e.preventDefault(); trigger = photo; show(index); modal.showModal();
    }));
    modal.querySelector('[data-modal-close]').addEventListener('click', () => modal.close());
    modal.querySelector('[data-modal-prev]').addEventListener('click', () => show(current - 1));
    modal.querySelector('[data-modal-next]').addEventListener('click', () => show(current + 1));
    modal.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); show(current + (e.key === 'ArrowLeft' ? -1 : 1)); }
    });
    modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
    modal.addEventListener('close', () => trigger?.focus({ preventScroll: true }));
  }
  if ('IntersectionObserver' in window && !reduced.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('reveal-enter'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
  }
  const hero = document.querySelector('.hero');
  let pending = false;
  const paintScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    document.documentElement.style.setProperty('--scroll-progress', `${max > 0 ? scrollY / max * 100 : 0}%`);
    if (hero) hero.style.setProperty('--hero-shift', !reduced.matches && innerWidth > 720 ? `${Math.min(scrollY * .12, 65)}px` : '0px');
    pending = false;
  };
  addEventListener('scroll', () => { if (!pending) { pending = true; requestAnimationFrame(paintScroll); } }, { passive: true });
  paintScroll();
})();
