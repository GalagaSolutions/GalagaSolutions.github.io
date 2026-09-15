(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  const setMenu = open => { menu?.setAttribute('aria-expanded', String(open)); nav?.classList.toggle('open', open); };
  menu?.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  nav?.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) setMenu(false); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') { setMenu(false); menu.focus(); } });
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  const filters = document.querySelectorAll('[data-filter]');
  filters.forEach(button => button.addEventListener('click', () => {
    let count = 0;
    filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelectorAll('[data-category]').forEach(card => {
      card.hidden = button.dataset.filter !== 'All' && card.dataset.category !== button.dataset.filter;
      if (!card.hidden) count++;
    });
    const result = document.getElementById('filter-result');
    if (result) result.textContent = `Showing ${count} ${button.dataset.filter === 'All' ? '' : button.dataset.filter.toLowerCase() + ' '}playbooks.`;
  }));
  const bench = document.querySelector('.workbench');
  const story = document.querySelector('.story');
  if (!bench || !story) return;
  const chapters = Array.from(document.querySelectorAll('[data-chapter]'));
  const controls = document.querySelectorAll('[data-stage]');
  const motionControl = document.querySelector('.motion-control');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width: 801px)');
  let motionOff = reduced.matches;
  let active = -1;
  let scheduled = false;
  let manualUntilScroll = false;
  function setStage(index) {
    if (active === index) return;
    active = index;
    bench.dataset.scene = String(index);
    bench.querySelector('.bench-status').textContent = ['Request received', 'Key details organized', 'Prepared for human review'][index];
    controls.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.stage) === index)));
    ['.voice-note', '.extraction', '.ready-card'].forEach((selector, i) => bench.querySelector(selector).setAttribute('aria-hidden', String(i !== index)));
  }
  function readScroll() {
    scheduled = false;
    if (motionOff || !desktop.matches || manualUntilScroll) return;
    const focus = window.innerHeight * .5;
    let best = 0;
    let distance = Infinity;
    chapters.forEach((chapter, index) => {
      const box = chapter.getBoundingClientRect();
      const current = Math.abs(box.top + box.height / 2 - focus);
      if (current < distance) { distance = current; best = index; }
    });
    setStage(best);
  }
  function queueScroll() {
    manualUntilScroll = false;
    if (!scheduled) { scheduled = true; requestAnimationFrame(readScroll); }
  }
  controls.forEach(button => button.addEventListener('click', () => {
    manualUntilScroll = true;
    setStage(Number(button.dataset.stage));
  }));
  function syncMotion() {
    document.body.classList.toggle('motion-off', motionOff);
    motionControl?.setAttribute('aria-pressed', String(motionOff));
    if (motionControl) motionControl.textContent = motionOff ? 'Resume motion' : 'Pause motion';
    if (motionOff) setStage(2); else { manualUntilScroll = false; readScroll(); }
  }
  motionControl?.addEventListener('click', () => { motionOff = !motionOff; syncMotion(); });
  reduced.addEventListener('change', event => { motionOff = event.matches; syncMotion(); });
  desktop.addEventListener('change', () => { manualUntilScroll = false; if (!desktop.matches) setStage(0); else readScroll(); });
  window.addEventListener('scroll', queueScroll, {passive: true});
  window.addEventListener('resize', queueScroll, {passive: true});
  setStage(motionOff ? 2 : 0);
  syncMotion();
})();
