/* =============================================
   THE ROOST RESTAURANT — main.js
   ============================================= */

// ── Page Navigation ──
function navigateTo(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  const page = document.getElementById(pageId);
  if (page) {
    page.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const navLink = document.querySelector(`.nav-links a[data-page="${pageId}"]`);
  if (navLink) navLink.classList.add('active');

  // Close mobile nav
  document.querySelector('.nav-links').classList.remove('open');
  document.querySelector('.hamburger').classList.remove('open');
}

// ── Hamburger Menu ──
document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.hamburger').classList.toggle('open');
  document.querySelector('.nav-links').classList.toggle('open');
});

// ── Bind nav links ──
document.querySelectorAll('[data-page]').forEach(el => {
  el.addEventListener('click', () => navigateTo(el.getAttribute('data-page')));
});

// ── Menu Tabs ──
document.querySelectorAll('.menu-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.getAttribute('data-section');
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.menu-section').forEach(s => s.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('menu-' + target).classList.add('active');
  });
});

// ── Gallery Filter ──
document.querySelectorAll('.gal-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.gal-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.gallery-item').forEach(item => {
      if (filter === 'all' || item.getAttribute('data-cat') === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ── Lightbox ──
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const src = item.querySelector('img').src;
    lightboxImg.src = src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

document.getElementById('lightbox-close').addEventListener('click', () => {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ── Contact Form ──
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const success = document.getElementById('form-success');
    success.style.display = 'block';
    contactForm.reset();
    setTimeout(() => { success.style.display = 'none'; }, 5000);
  });
}

// ── Scroll Fade Animations ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── Initialize ──
navigateTo('home');
