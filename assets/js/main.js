// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose = document.getElementById('menuClose');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
}
if (menuClose && mobileMenu) {
  menuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
}
document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', () => {
  mobileMenu?.classList.remove('open');
  document.body.style.overflow = '';
}));

// Nav scroll state
const nav = document.getElementById('navShell');
const setNavState = () => {
  if (!nav) return;
  // pages with .solid baseline never go transparent; just toggle .scrolled past 8px
  if (window.scrollY > 8) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', setNavState, { passive: true });
setNavState();

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
}

// Counters
const counters = document.querySelectorAll('[data-counter]');
const animateCounter = (el) => {
  const target = parseFloat(el.dataset.counter);
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 1600;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = target * eased;
    el.textContent = prefix + (decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString()) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
if ('IntersectionObserver' in window && counters.length) {
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCounter(e.target); cio.unobserve(e.target); }
    });
  }, { threshold: 0.4 });
  counters.forEach(el => cio.observe(el));
}

// Year stamp
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Contact form (Web3Forms)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const original = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending…';
    formStatus.textContent = '';
    formStatus.className = 'text-sm mt-3';
    try {
      const data = new FormData(contactForm);
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const json = await res.json();
      if (json.success) {
        formStatus.textContent = 'Thank you — we’ll reach out within 1 business day.';
        formStatus.classList.add('text-emerald-600');
        contactForm.reset();
      } else {
        throw new Error(json.message || 'Submission failed');
      }
    } catch (err) {
      formStatus.textContent = 'Something went wrong. Please email smartinnovationsproject@gmail.com directly.';
      formStatus.classList.add('text-rose-600');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = original;
    }
  });
}
