// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('.header');
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelectorAll('.nav a');

  // Hero Carousel functionality
  const heroSlides = document.querySelectorAll('.hero-slide');
  const carouselDots = document.querySelectorAll('.carousel-dot');
  let currentSlide = 0;
  let carouselInterval;

  function showSlide(index) {
    // Remove active class from all slides and dots
    heroSlides.forEach(slide => slide.classList.remove('active'));
    carouselDots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current slide and dot
    heroSlides[index].classList.add('active');
    carouselDots[index].classList.add('active');
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    showSlide(currentSlide);
  }

  function startCarousel() {
    carouselInterval = setInterval(nextSlide, 8000); // Change slide every 8 seconds
  }

  function stopCarousel() {
    clearInterval(carouselInterval);
  }

  // Manual navigation with dots
  carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
      stopCarousel();
      startCarousel(); // Restart auto-play after manual selection
    });
  });

  // Start carousel if slides exist
  if (heroSlides.length > 0) {
    startCarousel();
  }

  // Mobile menu toggle
  if(toggle){
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
    });
  }

  // Close menu when clicking a link
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Only handle anchor links within the same page
      if(href.startsWith('#')){
        const target = document.querySelector(href);

        if(target){
          e.preventDefault();
          const headerHeight = header ? header.offsetHeight : 80;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }

        // Close mobile menu if open
        if(nav.classList.contains('open')){
          nav.classList.remove('open');
        }
      } else {
        // For regular page links, just close the mobile menu
        if(nav.classList.contains('open')){
          nav.classList.remove('open');
        }
      }
    });
  });

  // Active nav link on scroll
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        links.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // Sticky header on scroll
  let lastScrollTop = 0;
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
  });

  // Set current year in footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe elements for animations
  const animatedElements = document.querySelectorAll('.featured-card, .board-card, .service-card, .media-card, .award-logo, .timeline-item');
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Highlight current page in navigation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav a');

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    // Remove existing active classes
    link.classList.remove('active');

    // Add active class if this is the current page
    if (linkHref === currentPage ||
        (currentPage === '' && linkHref === 'index.html') ||
        (currentPage === 'index.html' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });
});