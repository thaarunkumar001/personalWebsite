document.addEventListener('DOMContentLoaded', () => {
  
  // ------------------------------------------------------------------------
  // 1. Dark / Light Theme Toggle Engine
  // ------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  function getThemeIcon(theme) {
    if (theme === 'dark') {
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>`;
    } else {
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>`;
    }
  }

  function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      const iconSpan = themeToggleBtn.querySelector('.theme-toggle-icon');
      if (iconSpan) iconSpan.innerHTML = getThemeIcon(theme);
      themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }

  // Detect system preference or default to dark
  const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
  let theme = mediaQuery.matches ? 'light' : 'dark';
  setTheme(theme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      setTheme(theme);
    });
  }

  mediaQuery.addEventListener('change', (e) => {
    theme = e.matches ? 'light' : 'dark';
    setTheme(theme);
  });

  // ------------------------------------------------------------------------
  // 2. Mobile Menu & Navigation
  // ------------------------------------------------------------------------
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

  function toggleMobileMenu() {
    const isOpen = mobileNavToggle.getAttribute('aria-expanded') === 'true';
    mobileNavToggle.setAttribute('aria-expanded', !isOpen);
    mobileMenuOverlay.classList.toggle('open');
    mobileMenuOverlay.setAttribute('aria-hidden', isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  }

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', toggleMobileMenu);
  }

  // Smooth Scrolling for Anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        if (mobileMenuOverlay && mobileMenuOverlay.classList.contains('open')) {
          toggleMobileMenu();
        }
      }
    });
  });

  // ------------------------------------------------------------------------
  // 3. Certifications Carousel Controls & Touch Events
  // ------------------------------------------------------------------------
  const viewport = document.getElementById('carousel-viewport');
  const track = document.getElementById('carousel-track');
  const slides = track ? track.querySelectorAll('.carousel-slide') : [];
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const indicatorsContainer = document.getElementById('carousel-indicators');
  const dots = indicatorsContainer ? indicatorsContainer.querySelectorAll('.indicator-dot') : [];

  function getActiveSlideIndex() {
    if (!slides.length || !viewport) return 0;
    const scrollLeft = viewport.scrollLeft;
    const slideWidth = slides[0].getBoundingClientRect().width;
    return Math.round(scrollLeft / (slideWidth + 24));
  }

  function updateCarouselUI() {
    if (!viewport || !slides.length) return;
    const scrollLeft = viewport.scrollLeft;
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;

    if (prevBtn) prevBtn.disabled = scrollLeft <= 10;
    if (nextBtn) nextBtn.disabled = scrollLeft >= maxScroll - 10;

    const activeIndex = getActiveSlideIndex();
    dots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.classList.remove('active');
        dot.removeAttribute('aria-current');
      }
    });
  }

  if (prevBtn && nextBtn && slides.length && viewport) {
    prevBtn.addEventListener('click', () => {
      const slideWidth = slides[0].getBoundingClientRect().width + 24;
      viewport.scrollBy({ left: -slideWidth, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      const slideWidth = slides[0].getBoundingClientRect().width + 24;
      viewport.scrollBy({ left: slideWidth, behavior: 'smooth' });
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const slideWidth = slides[0].getBoundingClientRect().width + 24;
        viewport.scrollTo({ left: index * slideWidth, behavior: 'smooth' });
      });
    });

    viewport.addEventListener('scroll', updateCarouselUI);
    window.addEventListener('resize', updateCarouselUI);
    updateCarouselUI();
  }

  // ------------------------------------------------------------------------
  // 4. Reveal on Scroll Observer
  // ------------------------------------------------------------------------
  const revealItems = document.querySelectorAll('.reveal');
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.05
  };

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observerInstance.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealItems.forEach(item => {
    observer.observe(item);
  });

  // ------------------------------------------------------------------------
  // 5. Back to Top Button
  // ------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0.5';
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});