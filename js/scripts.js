document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links1');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    document.querySelectorAll('.nav-links1 a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.textContent = '☰';
      });
    });
  }

  // Volunteer Modal
  const joinUsBtn = document.querySelector('.involvement-card .cta-btn[href="#"]');
  const volunteerModal = document.getElementById('volunteerModal');
  if (joinUsBtn && volunteerModal) {
    joinUsBtn.addEventListener('click', e => {
      e.preventDefault();
      volunteerModal.style.display = 'block';
    });
  }

  // Partner Modal
  const partnerBtn = document.querySelector('.involvement-card:nth-of-type(3) .cta-btn');
  const partnerModal = document.getElementById('partnerModal');
  if (partnerBtn && partnerModal) {
    partnerBtn.addEventListener('click', e => {
      e.preventDefault();
      partnerModal.style.display = 'block';
    });
  }

  // Close modals on click outside
  window.addEventListener('click', event => {
    if (volunteerModal && event.target === volunteerModal) volunteerModal.style.display = 'none';
    if (partnerModal && event.target === partnerModal) partnerModal.style.display = 'none';
  });

  // Testimonial Slider
  const testimonialTrack = document.querySelector('.testimonial-track');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const prevButton = document.querySelector('.testimonial-control.prev');
  const nextButton = document.querySelector('.testimonial-control.next');
  const indicators = document.querySelectorAll('.testimonial-indicators .indicator');

  if (testimonialTrack && testimonialCards.length > 0 && prevButton && nextButton) {
    let currentSlide = 0;
    const totalSlides = testimonialCards.length;
    const slideWidth = 100;

    function updateSliderPosition() {
      testimonialTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
      indicators.forEach((ind, idx) => ind.classList.toggle('active', idx === currentSlide));
      prevButton.disabled = currentSlide === 0;
      nextButton.disabled = currentSlide === totalSlides - 1;
    }

    prevButton.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateSliderPosition();
      }
    });

    nextButton.addEventListener('click', () => {
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSliderPosition();
      }
    });

    indicators.forEach((ind, idx) => {
      ind.addEventListener('click', () => {
        currentSlide = idx;
        updateSliderPosition();
      });
    });

    let autoSlide = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSliderPosition();
    }, 5000);

    testimonialTrack.addEventListener('mouseenter', () => clearInterval(autoSlide));
    testimonialTrack.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSliderPosition();
      }, 5000);
    });

    updateSliderPosition();
  }

  // Theme-based Favicon Switch
  function switchFaviconBasedOnTheme() {
    let favicon = document.querySelector("link[rel~='icon']");
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    favicon.href = prefersDark ? '/assets/favicon/gazaWhite.png' : '/assets/favicon/gazaBlack.png';
  }

  switchFaviconBasedOnTheme();
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', switchFaviconBasedOnTheme);
});

// Close Modal Functions
function closeModal() {
  const modal = document.getElementById('volunteerModal');
  if (modal) modal.style.display = 'none';
}

function closePartnerModal() {
  const modal = document.getElementById('partnerModal');
  if (modal) modal.style.display = 'none';
}
