/* ========================================
   Scroll Animations & Effects
   IntersectionObserver-based reveal system
   ======================================== */

class ScrollAnimator {
  constructor() {
    this.observers = [];
    this.init();
  }

  init() {
    this.setupRevealObserver();
    this.setupNavHighlighter();
    this.setupParallax();
  }

  setupRevealObserver() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Don't unobserve to allow re-animation if needed
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
    this.observers.push(observer);
  }

  setupNavHighlighter() {
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-100px 0px -50% 0px'
    });

    sections.forEach(section => observer.observe(section));
    this.observers.push(observer);
  }

  setupParallax() {
    const hero = document.querySelector('.hero-bg');
    if (!hero) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    }, { passive: true });
  }

  destroy() {
    this.observers.forEach(obs => obs.disconnect());
  }
}

// Export
window.ScrollAnimator = ScrollAnimator;
