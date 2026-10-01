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
  // 2. Mobile Navigation Overlay
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

  // Smooth Scroll Anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 70;
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
  // 3. Scroll Reveal & Card Flip Engine (Re-triggers every scroll)
  // ------------------------------------------------------------------------
  const revealItems = document.querySelectorAll('.reveal');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, observerOptions);

  revealItems.forEach(item => {
    observer.observe(item);
  });

  // ------------------------------------------------------------------------
  // 4. Certifications Single-Card Carousel Engine (Swipe & Arrow Support)
  // ------------------------------------------------------------------------
  const track = document.getElementById('carousel-track');
  const viewport = document.getElementById('carousel-viewport');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dots = document.querySelectorAll('.indicator-dot');
  const slides = document.querySelectorAll('.carousel-slide');

  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateCarousel(index) {
    if (!track || totalSlides === 0) return;

    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
      dot.setAttribute('aria-current', i === currentIndex ? 'true' : 'false');
    });
  }

  // Button Controls
  if (prevBtn) prevBtn.addEventListener('click', () => updateCarousel(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => updateCarousel(currentIndex + 1));

  // Dot Controls
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => updateCarousel(index));
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  if (viewport) {
    viewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeThreshold = 40;
    const diff = touchStartX - touchEndX;

    if (diff > swipeThreshold) {
      updateCarousel(currentIndex + 1); // Swiped Left -> Next Card
    } else if (diff < -swipeThreshold) {
      updateCarousel(currentIndex - 1); // Swiped Right -> Previous Card
    }
  }

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