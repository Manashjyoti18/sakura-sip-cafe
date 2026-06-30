/* ========================================
   Main Application Logic
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Splash Screen ----
  const splash = document.getElementById('splash-screen');
  if (splash) {
    setTimeout(() => {
      splash.style.pointerEvents = 'none';
      setTimeout(() => splash.remove(), 500);
    }, 3000);
  }

  // ---- Theme Toggle ----
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('sakura-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('sakura-theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    const thumb = document.querySelector('.toggle-thumb');
    if (thumb) {
      thumb.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
  }

  // ---- Navbar Scroll ----
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 80);
    }
  }, { passive: true });

  // ---- Mobile Nav ----
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileOverlay = document.getElementById('mobile-overlay');

  function openMobileNav() {
    mobileNav.classList.add('open');
    mobileOverlay.classList.add('open');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.classList.add('closing');
    mobileOverlay.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      mobileNav.classList.remove('open', 'closing');
    }, 300);
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      if (mobileNav.classList.contains('open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileNav);
  }

  // Close mobile nav on link click
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });
  }

  // ---- Cart Drawer ----
  const cartBtn = document.getElementById('cart-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartCloseBtn = document.getElementById('cart-close-btn');

  function openCart() {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (window.menuSystem) {
      window.menuSystem.renderCartDrawer();
    }
  }

  function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Place Order
  const placeOrderBtn = document.getElementById('place-order-btn');
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', () => {
      if (window.menuSystem && window.menuSystem.getCartCount() > 0) {
        const total = window.menuSystem.getCartTotal().toFixed(2);
        closeCart();
        setTimeout(() => {
          showModal(
            '🎉',
            'Order Placed!',
            `Your order of $${total} has been received! Our team is preparing your delicious items. Estimated wait: 15-20 minutes. Arigatou gozaimasu! 🙏`
          );
          window.menuSystem.clearCart();
        }, 400);
      }
    });
  }

  // ---- Back to Top ----
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Hero Mascot ----
  const mascot = document.querySelector('.hero-mascot');
  if (mascot) {
    setTimeout(() => mascot.classList.add('visible'), 3000);
    mascot.addEventListener('click', () => {
      mascot.style.animation = 'wiggle 0.5s ease';
      setTimeout(() => {
        mascot.style.animation = 'float 4s ease-in-out infinite';
      }, 500);
    });
  }

  // ---- Event Countdowns ----
  function updateCountdowns() {
    document.querySelectorAll('.event-countdown').forEach(countdown => {
      const targetDate = new Date(countdown.dataset.date);
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        countdown.innerHTML = '<span style="color:var(--sakura-500);font-weight:600;">Event has started! 🎉</span>';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      countdown.innerHTML = `
        <div class="countdown-item"><div class="count-value">${days}</div><div class="count-label">Days</div></div>
        <div class="countdown-item"><div class="count-value">${hours}</div><div class="count-label">Hrs</div></div>
        <div class="countdown-item"><div class="count-value">${minutes}</div><div class="count-label">Min</div></div>
        <div class="countdown-item"><div class="count-value">${seconds}</div><div class="count-label">Sec</div></div>
      `;
    });
  }

  updateCountdowns();
  setInterval(updateCountdowns, 1000);

  // ---- Smooth scroll for nav links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const pos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    });
  });

  // ---- Initialize Systems ----
  // Particles
  const particles = new SakuraParticleSystem('particle-canvas', 35);

  // Scroll Animations
  const scrollAnimator = new ScrollAnimator();

  // Menu & Cart
  window.menuSystem = new MenuSystem();

  // Reservation
  const reservation = new ReservationSystem();

  // Contact form
  const contactForm = new ContactForm();

  // ---- RSVP Buttons ----
  document.querySelectorAll('.rsvp-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const eventName = btn.dataset.event;
      showModal(
        '🎫',
        'RSVP Confirmed!',
        `You're all set for "${eventName}"! We'll send you a reminder. See you there! 🎉`
      );
      btn.textContent = 'RSVPd ✓';
      btn.disabled = true;
      btn.style.opacity = '0.7';
    });
  });

  console.log('🌸 Sakura Sip Café loaded! いらっしゃいませ!');
});
