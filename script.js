// Dynamic Footer Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close Mobile Navigation Menu when link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Sticky Header Box Shadow on Scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Scrollspy - Active Navigation Link Highlighting
const sections = document.querySelectorAll('section[id]');

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });
}, {
  threshold: 0.35
});

sections.forEach(section => {
  scrollObserver.observe(section);
});

// Copy to Clipboard Utility with Toast Alert
const copyButtons = document.querySelectorAll('.copy-btn');
const toast = document.getElementById('toast');

copyButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const textToCopy = btn.getAttribute('data-copy');
    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast(`Copied "${textToCopy}" to clipboard!`);
    }).catch(err => {
      console.error('Copy failed', err);
    });
  });
});

let toastTimeout;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}