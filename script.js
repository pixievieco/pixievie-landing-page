// Navigation functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href').includes(current)) {
      item.classList.add('active');
    }
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.team-member, .portfolio-item, .service-card, .step, .testimonial').forEach(el => {
  observer.observe(el);
});

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');

    const filterValue = button.getAttribute('data-filter');

    portfolioItems.forEach(item => {
      if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Contact form validation and submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Basic validation
    let isValid = true;
    const errors = [];

    if (!data.name.trim()) {
      errors.push('Name is required');
      isValid = false;
    }

    if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) {
      errors.push('Valid email is required');
      isValid = false;
    }

    if (!data.subject.trim()) {
      errors.push('Subject is required');
      isValid = false;
    }

    if (!data.message.trim()) {
      errors.push('Message is required');
      isValid = false;
    }

    if (isValid) {
      // Here you would typically send the data to a server
      // For now, we'll just show a success message
      alert('Thank you for your message! We\'ll get back to you soon.');
      contactForm.reset();
    } else {
      alert('Please fill in all required fields correctly:\n' + errors.join('\n'));
    }
  });
}

// Back to top button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.style.display = 'flex';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Testimonial slider (basic auto-scroll)
let testimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showNextTestimonial() {
  testimonials.forEach((testimonial, index) => {
    testimonial.style.transform = `translateX(-${testimonialIndex * 100}%)`;
  });
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
}

setInterval(showNextTestimonial, 5000);

// Loading screen
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 500); // Small delay for smooth transition
});

// Pixel animation
let animating = false;

function createPixels() {
  const hero = document.querySelector('.hero');
  for (let i = 0; i < 100; i++) { // Moderate count
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.dataset.x = Math.random() * 100;
    pixel.dataset.y = Math.random() * 100;
    pixel.dataset.speedX = (Math.random() - 0.5) * 0.2;
    pixel.dataset.speedY = (Math.random() - 0.5) * 0.2;
    // Random purple shades
    const r = Math.floor(Math.random() * 51) + 100; // 100-150
    const g = Math.floor(Math.random() * 51) + 50;  // 50-100
    const b = Math.floor(Math.random() * 51) + 150; // 150-200
    pixel.style.background = `rgba(${r}, ${g}, ${b}, 0.5)`;
    pixel.style.transform = `translate(${pixel.dataset.x}vw, ${pixel.dataset.y}vh)`;
    hero.appendChild(pixel);
  }
}

function animatePixels() {
  if (!animating) {
    requestAnimationFrame(animatePixels);
    return;
  }
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach(pixel => {
    let x = parseFloat(pixel.dataset.x);
    let y = parseFloat(pixel.dataset.y);
    x += parseFloat(pixel.dataset.speedX);
    y += parseFloat(pixel.dataset.speedY);
    if (x > 100) x = 0;
    if (x < 0) x = 100;
    if (y > 100) y = 0;
    if (y < 0) y = 100;
    pixel.dataset.x = x;
    pixel.dataset.y = y;
    pixel.style.transform = `translate(${x}vw, ${y}vh)`;
  });
  requestAnimationFrame(animatePixels);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  console.log("Initializing Lucide icons...");
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
    console.log("Lucide icons initialized successfully.");
  } else {
    console.error("Lucide library not loaded.");
  }
  console.log("Pixievie Studio premium website loaded");

  // Pixel animations disabled
  // if (window.innerWidth > 768) {
  //   createPixels();
  //   animatePixels();
  //   const heroObserver = new IntersectionObserver((entries) => {
  //     animating = entries[0].isIntersecting;
  //   });
  //   heroObserver.observe(document.querySelector('.hero'));
  // }

  // Debug logs for step spans
  document.querySelectorAll('.step span').forEach((span, index) => {
    const style = window.getComputedStyle(span);
    console.log(`Step ${index + 1} span - color: ${style.color}, background-color: ${style.backgroundColor}, visibility: ${style.visibility}, display: ${style.display}`);
  });

  // Debug logs for social icons alignment
  const socialIcons = document.querySelectorAll('.social-links i');
  socialIcons.forEach((icon, index) => {
    const rect = icon.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(icon);
    console.log(`Social icon ${index + 1} (${icon.getAttribute('data-lucide')}) - height: ${rect.height}, width: ${rect.width}, top: ${rect.top}, vertical-align: ${computedStyle.verticalAlign}, display: ${computedStyle.display}`);
  });

  // Debug logs for contact form alignment
  const contactHeading = document.querySelector('.contact h2');
  if (contactHeading) {
    const rect = contactHeading.getBoundingClientRect();
    console.log(`Contact heading position - left: ${rect.left}, top: ${rect.top}, width: ${rect.width}, height: ${rect.height}`);
  }

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const rect = contactForm.getBoundingClientRect();
    console.log(`Contact form position - left: ${rect.left}, top: ${rect.top}, width: ${rect.width}, height: ${rect.height}`);
  }
});
