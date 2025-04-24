document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    const carouselInner = carousel.querySelector('.carousel-inner');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const images = carouselInner.querySelectorAll('img');
    let currentIndex = 0;

    function showImage(index) {
        carouselInner.style.transform = `translateX(-${index * 100}%)`;
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }

    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);

    // Auto-advance carousel
    setInterval(showNextImage, 5000);
});







const carousel = document.getElementById('carousel');
const cards = carousel.querySelectorAll('.carousel-card');
const dotsContainer = document.getElementById('dots');

// Create dots dynamically
cards.forEach((_, idx) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (idx === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    cards[idx].scrollIntoView({ behavior: 'smooth', inline: 'center' });
  });
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('.dot');

// Update active dot on scroll
carousel.addEventListener('scroll', () => {
  const scrollLeft = carousel.scrollLeft;
  const cardWidth = cards[0].offsetWidth + 16; // Adjust gap if needed
  const activeIndex = Math.round(scrollLeft / cardWidth);

  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[activeIndex]) dots[activeIndex].classList.add('active');
});







const images = [
    '/Pictures/gallery/gallery_1.JPG',
    '/Pictures/gallery/gallery_2.JPG',
    '/Pictures/gallery/gallery_3.JPG',
    '/Pictures/gallery/gallery_4.JPG',
    '/Pictures/gallery/gallery_5.JPG',
    '/Pictures/gallery/gallery_6.JPG',
    '/Pictures/gallery/gallery_7.JPG',
    '/Pictures/gallery/gallery_8.JPG',
    '/Pictures/gallery/gallery_9.JPG',
    '/Pictures/gallery/gallery_10.JPG',
    '/Pictures/gallery/gallery_11.JPG',
    '/Pictures/gallery/gallery_12.JPG',
    '/Pictures/gallery/gallery_13.JPG',
    '/Pictures/gallery/gallery_14.JPG',
    '/Pictures/gallery/gallery_15.JPG',
    '/Pictures/gallery/gallery_16.JPG',
    '/Pictures/gallery/gallery_17.JPG',
    '/Pictures/gallery/gallery_18.JPG'

  ];

  let currentIndex = 1;
  const track = document.getElementById('gallery-carouselTrack');
  const carouselItems = [];


  function createCarouselItems() {
    images.forEach((src, i) => {
      const item = document.createElement('div');
      item.classList.add('gallery-carousel-item');

      const img = document.createElement('img');
      img.src = src;
      item.appendChild(img);

      
      track.appendChild(item);
      carouselItems.push(item);
    });
  }


  function updateCarousel() {
    carouselItems.forEach((item, i) => {
      const offset = i - currentIndex;
      // Optionally hide items that are far away
      if (offset < -2 || offset > 2) {
        item.style.display = 'none';
        return;
      } else {
        item.style.display = 'block';
      }

      const absOffset = Math.abs(offset);
      const scale = 1 - absOffset * 0.2;
      // Increase horizontal spacing for a more dramatic slide
      const translateX = offset * 500;
      const rotateY = offset * 15;         // slight rotation for 3D effect
      const translateZ = -absOffset * 100;   // push further behind
      const opacity = absOffset === 2 ? 0.5 : 1;
      const zIndex = 999 - absOffset;        // center is on top

      item.style.transform = `
        translate(-50%, -50%)
        translateX(${translateX}px)
        translateZ(${translateZ}px)
        rotateY(${rotateY}deg)
        scale(${scale})
      `;
      item.style.opacity = opacity;
      item.style.zIndex = zIndex;
    });
  }

  // Navigation functions
  function prevSlide() {
    currentIndex = (currentIndex <= 0) ? images.length - 1 : currentIndex - 1;
    updateCarousel();
  }
  function nextSlide() {
    currentIndex = (currentIndex >= images.length - 1) ? 0 : currentIndex + 1;
    updateCarousel();
  }

  // Initialize carousel on page load
  window.addEventListener('DOMContentLoaded', () => {
    createCarouselItems();
    updateCarousel();
  });
