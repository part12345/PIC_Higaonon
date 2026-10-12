(() => {
  const menuButton = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');
  const navLinks = [...document.querySelectorAll('.site-nav a')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const themeButton = document.getElementById('theme-toggle');
  const themeIcon = themeButton.querySelector('.theme-icon');
  const themeLabel = themeButton.querySelector('.theme-label');
  const savedTheme = localStorage.getItem('digital-kabilin-theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  function setTheme(theme) {
    const dark = theme === 'dark';
    document.body.classList.toggle('dark-mode', dark);
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    themeIcon.textContent = dark ? '☀' : '☾';
    themeLabel.textContent = dark ? 'Light mode' : 'Dark mode';
    localStorage.setItem('digital-kabilin-theme', theme);
  }
  setTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));
  themeButton.addEventListener('click', () => {
    setTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark');
  });

  function closeMenu() {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('open', !expanded);
  });
  navLinks.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-25% 0px -60% 0px', threshold: 0 });
    sections.forEach(section => observer.observe(section));
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDetail = document.getElementById('lightbox-detail');
  const closeLightbox = () => { if (lightbox.open) lightbox.close(); };
  document.querySelectorAll('.gallery-item').forEach(item => item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.image;
    lightboxImage.alt = item.querySelector('img').alt;
    lightboxTitle.textContent = item.dataset.title;
    lightboxDetail.textContent = item.dataset.detail || 'Educational illustration. Please consult the linked references for sourced cultural information.';
    if (typeof lightbox.showModal === 'function') lightbox.showModal();
    else window.open(item.dataset.image, '_blank', 'noopener');
  }));
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });

  const timelineEntries = [...document.querySelectorAll('.timeline-entry')];
  const detailYear = document.getElementById('timeline-detail-year');
  const detailTitle = document.getElementById('timeline-detail-title');
  const detailText = document.getElementById('timeline-detail-text');
  timelineEntries.forEach(entry => entry.addEventListener('click', () => {
    timelineEntries.forEach(item => {
      const active = item === entry;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    detailYear.textContent = entry.dataset.year;
    detailTitle.textContent = entry.dataset.title;
    detailText.textContent = entry.dataset.detail;
  }));
})();
