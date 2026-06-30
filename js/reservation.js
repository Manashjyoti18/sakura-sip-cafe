/* ========================================
   Reservation Form Logic
   ======================================== */

class ReservationSystem {
  constructor() {
    this.selectedSeating = '';
    this.selectedPartySize = 2;
    this.init();
  }

  init() {
    this.bindSeatingCards();
    this.bindPartySizeButtons();
    this.bindForm();
    this.setMinDate();
  }

  setMinDate() {
    const dateInput = document.getElementById('res-date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      dateInput.value = today;
    }
  }

  bindSeatingCards() {
    const cards = document.querySelectorAll('.seating-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedSeating = card.dataset.seating;
      });
    });
  }

  bindPartySizeButtons() {
    const buttons = document.querySelectorAll('.party-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedPartySize = parseInt(btn.dataset.size);
      });
    });

    // Set default
    const defaultBtn = document.querySelector('.party-btn[data-size="2"]');
    if (defaultBtn) defaultBtn.classList.add('active');
  }

  bindForm() {
    const form = document.getElementById('reservation-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.validateForm()) {
        this.submitReservation();
      }
    });

    // Clear error on input
    form.querySelectorAll('.form-input').forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('error');
      });
    });
  }

  validateForm() {
    let valid = true;
    const name = document.getElementById('res-name');
    const email = document.getElementById('res-email');
    const date = document.getElementById('res-date');
    const time = document.getElementById('res-time');

    if (!name.value.trim()) {
      name.classList.add('error');
      valid = false;
    }
    if (!email.value.trim() || !this.isValidEmail(email.value)) {
      email.classList.add('error');
      valid = false;
    }
    if (!date.value) {
      date.classList.add('error');
      valid = false;
    }
    if (!time.value) {
      time.classList.add('error');
      valid = false;
    }
    if (!this.selectedSeating) {
      // Highlight seating cards
      document.querySelectorAll('.seating-card').forEach(c => {
        c.style.animation = 'wiggle 0.5s ease';
        setTimeout(() => c.style.animation = '', 500);
      });
      valid = false;
    }

    return valid;
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  submitReservation() {
    const name = document.getElementById('res-name').value;
    const date = document.getElementById('res-date').value;
    const time = document.getElementById('res-time').value;

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    // Show success modal
    showModal(
      '🌸',
      'Reservation Confirmed!',
      `Thank you, ${name}! Your table for ${this.selectedPartySize} is reserved on ${formattedDate} at ${time}. We'll prepare your ${this.selectedSeating} seat with care! ✨`
    );

    // Reset form
    document.getElementById('reservation-form').reset();
    this.selectedSeating = '';
    this.selectedPartySize = 2;
    document.querySelectorAll('.seating-card').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.party-btn').forEach(b => b.classList.remove('active'));
    const defaultBtn = document.querySelector('.party-btn[data-size="2"]');
    if (defaultBtn) defaultBtn.classList.add('active');
    this.setMinDate();
  }
}

// Contact form handler
class ContactForm {
  constructor() {
    this.init();
  }

  init() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name');
      const email = document.getElementById('contact-email');
      const message = document.getElementById('contact-message');

      let valid = true;
      if (!name.value.trim()) { name.classList.add('error'); valid = false; }
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { email.classList.add('error'); valid = false; }
      if (!message.value.trim()) { message.classList.add('error'); valid = false; }

      if (valid) {
        showModal(
          '💌',
          'Message Sent!',
          `Thanks, ${name.value}! We'll get back to you soon. In the meantime, why not check out our menu? 🍡`
        );
        form.reset();
      }
    });

    form.querySelectorAll('.form-input').forEach(input => {
      input.addEventListener('input', () => input.classList.remove('error'));
    });
  }
}

// Global modal function
function showModal(icon, title, message) {
  const backdrop = document.getElementById('modal-backdrop');
  const modal = backdrop.querySelector('.modal');

  modal.querySelector('.modal-icon').textContent = icon;
  modal.querySelector('h3').textContent = title;
  modal.querySelector('p').textContent = message;

  backdrop.classList.add('open');

  const closeBtn = modal.querySelector('.modal-close-btn');
  const closeModal = () => {
    backdrop.classList.remove('open');
  };
  
  closeBtn.onclick = closeModal;
  backdrop.onclick = (e) => {
    if (e.target === backdrop) closeModal();
  };
}

// Export
window.ReservationSystem = ReservationSystem;
window.ContactForm = ContactForm;
window.showModal = showModal;
