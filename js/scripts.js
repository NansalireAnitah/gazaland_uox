// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links1');
  
  hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-links1 a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.remove;
    })
  })
});

// Show the volunteer modal when "Join Us" button is clicked
document.querySelector('.involvement-card .cta-btn[href="#"]').addEventListener('click', function (event) {
  event.preventDefault();
  document.getElementById('volunteerModal').style.display = 'block';
});

// Close the modal
function closeModal() {
  document.getElementById('volunteerModal').style.display = 'none';
}

// Close modals when clicking outside of them
window.onclick = function (event) {
  const volunteerModal = document.getElementById('volunteerModal');
  const partnerModal = document.getElementById('partnerModal');
  if (volunteerModal && event.target === volunteerModal) {
    volunteerModal.style.display = 'none';
  }
  if (partnerModal && event.target === partnerModal) {
    partnerModal.style.display = 'none';
  }
};


// Show the Partner Modal when "Partner With Us" button is clicked
document.querySelector('.involvement-card:nth-of-type(3) .cta-btn').addEventListener('click', function (event) {
  event.preventDefault();
  document.getElementById('partnerModal').style.display = 'block';
});

// Close the Partner Modal
function closePartnerModal() {
  document.getElementById('partnerModal').style.display = 'none';
}

// Testimonial Slider
document.addEventListener('DOMContentLoaded', () => {
  const testimonialTrack = document.querySelector('.testimonial-track');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const prevButton = document.querySelector('.testimonial-control.prev');
  const nextButton = document.querySelector('.testimonial-control.next');
  const indicators = document.querySelectorAll('.testimonial-indicators .indicator');

  let currentSlide = 0;
  const slideWidth = 100; // Percentage width for each slide
  const totalSlides = testimonialCards.length;

  // Function to update the slider position
  function updateSliderPosition() {
      testimonialTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;

      // Update active indicator
      indicators.forEach((indicator, index) => {
          indicator.classList.toggle('active', index === currentSlide);
      });

      // Enable/disable navigation buttons
      prevButton.disabled = currentSlide === 0;
      nextButton.disabled = currentSlide === totalSlides - 1;
  }

  // Event listener for the previous button
  prevButton.addEventListener('click', () => {
      if (currentSlide > 0) {
          currentSlide--;
          updateSliderPosition();
      }
  });

  // Event listener for the next button
  nextButton.addEventListener('click', () => {
      if (currentSlide < totalSlides - 1) {
          currentSlide++;
          updateSliderPosition();
      }
  });

  // Event listeners for indicators
  indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
          currentSlide = index;
          updateSliderPosition();
      });
  });

  // Auto-slide functionality
  let autoSlideInterval = setInterval(() => {
      if (currentSlide < totalSlides - 1) {
          currentSlide++;
      } else {
          currentSlide = 0; // Loop back to the first slide
      }
      updateSliderPosition();
  }, 5000); // Change slide every 5 seconds

  // Pause auto-slide on hover
  testimonialTrack.addEventListener('mouseenter', () => {
      clearInterval(autoSlideInterval);
  });

  // Resume auto-slide on mouse leave
  testimonialTrack.addEventListener('mouseleave', () => {
      autoSlideInterval = setInterval(() => {
          if (currentSlide < totalSlides - 1) {
              currentSlide++;
          } else {
              currentSlide = 0;
          }
          updateSliderPosition();
      }, 5000);
  });

  // Initialize the slider position
  updateSliderPosition();
});

// Switch icon based on system theme
function switchFaviconBasedOnTheme() {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon';
    document.head.appendChild(link);
  }

  // Check if user prefers dark mode
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // User has dark mode
    link.href = '/assets/favicon/gazaWhite.png';
  } else {
    // User has light mode
    link.href = '/assets/favicon/gazaBlack.png';
  }
}

// Call it when the page loads
switchFaviconBasedOnTheme();

// Listen to changes in system theme live
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', switchFaviconBasedOnTheme);