// Load this after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
   // Create bubbles
   createBubbles();
   
   // Add scroll effects
   addScrollEffects();
   
   // Handle sticky header
   handleStickyHeader();
   
   // Add easter egg
   setupEasterEgg();
   
   // Add scroll bubble effect
   addScrollBubbleEffect();
   
   // Setup challenge slider
   setupChallengeSlider();
   });
   
function createBubbles() {
const bubbleContainer = document.querySelector('.bubble-container');

// Create more bubbles - only in the header and hero area
const bubbleCount = window.innerWidth < 768 ? 15 : 30; // More bubbles for immersion

// Track active bubbles to limit total number
let activeBubbleCount = 0;
const maxBubbles = bubbleCount;

function createNewBubble() {
if (activeBubbleCount >= maxBubbles) return;

activeBubbleCount++;
const bubble = document.createElement('div');
bubble.className = 'bubble';

// Random size between 20px and 80px
const size = Math.random() * 60 + 20;
bubble.style.width = `${size}px`;
bubble.style.height = `${size}px`;

// Random position along the width, but only in the top section
bubble.style.left = `${Math.random() * 100}%`;
bubble.style.bottom = `${Math.random() * 80}%`; // Keep bubbles in top area

// Random animation duration between 15 and 25s
const duration = Math.random() * 10 + 15;
bubble.style.animationDuration = `${duration}s`;

// Random opacity
bubble.style.opacity = Math.random() * 0.3 + 0.1;

bubbleContainer.appendChild(bubble);

// Remove bubble after animation completes and create new one
setTimeout(() => {
    if (bubble && bubble.parentNode) {
        bubble.parentNode.removeChild(bubble);
        activeBubbleCount--;
        // Only create new bubble if we're still on the page
        if (document.body.contains(bubbleContainer)) {
            createNewBubble();
        }
    }
}, duration * 1000);
}

// Initial creation of bubbles
for (let i = 0; i < bubbleCount; i++) {
setTimeout(() => createNewBubble(), i * 200); // Stagger bubble creation
}

// Hide bubbles when scrolling down far
window.addEventListener('scroll', function() {
const scrollPosition = window.scrollY;
if (scrollPosition > 800) {
    bubbleContainer.style.opacity = '0';
} else {
    bubbleContainer.style.opacity = '1';
}
});
}

function addScrollEffects() {
const scrollElements = document.querySelectorAll('.section, .hero, .team-member, .card, .challenge-card');

scrollElements.forEach(element => {
element.classList.add('scroll-effect');
});

window.addEventListener('scroll', function() {
scrollElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
        // Apply slight upward movement when scrolling into view
        const scrollPercent = Math.min(1, (window.innerHeight - elementTop) / window.innerHeight);
        const translateY = Math.min(20, 20 * scrollPercent);
        element.style.transform = `translateY(-${translateY}px)`;
    }
});
});
}

function handleStickyHeader() {
const header = document.getElementById('header');
window.addEventListener('scroll', function() {
if (window.scrollY > 100) {
    header.classList.add('scrolled');
} else {
    header.classList.remove('scrolled');
}
});
}

function setupEasterEgg() {
const easterEgg = document.querySelector('.easter-egg');
let scrollPosition = 0;
let easterEggVisible = false;

window.addEventListener('scroll', function() {
const currentScrollPosition = window.scrollY;

// Show easter egg when scrolling to the bottom
if (currentScrollPosition > document.body.scrollHeight - window.innerHeight - 300) {
    if (!easterEggVisible) {
        easterEgg.style.bottom = '20px';
        easterEgg.style.opacity = '0.7';
        easterEggVisible = true;
    }
} else {
    if (easterEggVisible) {
        easterEgg.style.bottom = '-100px';
        easterEgg.style.opacity = '0';
        easterEggVisible = false;
    }
}

scrollPosition = currentScrollPosition;
});

// Add easter egg click behavior
easterEgg.addEventListener('click', function() {
let count = 0;
const maxBubbles = 15;
const interval = setInterval(() => {
    if (count >= maxBubbles) {
        clearInterval(interval);
        return;
    }
    
    const bubble = document.createElement('div');
    bubble.className = 'scroll-bubble';
    bubble.style.width = `${Math.random() * 20 + 10}px`;
    bubble.style.height = bubble.style.width;
    bubble.style.left = `${Math.random() * 80 + 10}%`;
    bubble.style.bottom = '20px';
    document.body.appendChild(bubble);
    
    setTimeout(() => {
        if (bubble.parentNode) {
            bubble.parentNode.removeChild(bubble);
        }
    }, 4000);
    
    count++;
}, 200);
});
}

function addScrollBubbleEffect() {
// Add small bubbles when scrolling past certain sections
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', function() {
sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionVisible = window.innerHeight / 2;
    
    if (sectionTop < sectionVisible && sectionTop > -section.offsetHeight + sectionVisible) {
        // Random chance to create a bubble
        if (Math.random() < 0.02) {
            const bubble = document.createElement('div');
            bubble.className = 'scroll-bubble';
            bubble.style.width = `${Math.random() * 20 + 10}px`;
            bubble.style.height = bubble.style.width;
            
            // Position relative to the section
            const sectionRect = section.getBoundingClientRect();
            const x = sectionRect.left + Math.random() * sectionRect.width;
            const y = sectionRect.top + Math.random() * (sectionRect.height / 2);
            
            bubble.style.left = `${x}px`;
            bubble.style.top = `${y}px`;
            
            document.body.appendChild(bubble);
            
            setTimeout(() => {
                if (bubble.parentNode) {
                    bubble.parentNode.removeChild(bubble);
                }
            }, 4000);
        }
    }
});
});
}

// Set up challenge cards slider
function setupChallengeSlider() {
const slider = document.querySelector('.challenge-slider');
const slides = document.querySelectorAll('.challenge-slide');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');
const dots = document.querySelectorAll('.slider-dot');

if (!slider || slides.length === 0) return;

let currentSlide = 0;
const slideWidth = 100; // 100%

// Initialize
updateSlider();

// Auto-rotate slides every 10 seconds (changed from 5)
let autoSlideInterval = setInterval(nextSlide, 10000);

// Reset interval when manually changing slides
function resetInterval() {
clearInterval(autoSlideInterval);
autoSlideInterval = setInterval(nextSlide, 10000);
}

// Event listeners
prevArrow.addEventListener('click', () => {
prevSlide();
resetInterval();
});

nextArrow.addEventListener('click', () => {
nextSlide();
resetInterval();
});

// Add click events to dots
dots.forEach((dot, index) => {
dot.addEventListener('click', () => {
    goToSlide(index);
    resetInterval();
});
});

// Touch/swipe support
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

slider.addEventListener('touchend', (e) => {
touchEndX = e.changedTouches[0].screenX;
handleSwipe();
resetInterval();
}, { passive: true });

function handleSwipe() {
const swipeThreshold = 50;
if (touchStartX - touchEndX > swipeThreshold) {
    // Swipe left
    nextSlide();
} else if (touchEndX - touchStartX > swipeThreshold) {
    // Swipe right
    prevSlide();
}
}

// Navigation functions
function updateSlider() {
slider.style.transform = `translateX(-${currentSlide * slideWidth}%)`;

// Update dots
dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
});

// Add sparkle effect to current slide
const currentCard = slides[currentSlide].querySelector('.challenge-card');
addSparkleToElement(currentCard);
}

function nextSlide() {
currentSlide = (currentSlide + 1) % slides.length;
updateSlider();
}

function prevSlide() {
currentSlide = (currentSlide - 1 + slides.length) % slides.length;
updateSlider();
}

function goToSlide(index) {
currentSlide = index;
updateSlider();
}

// Add sparkle effect to an element
function addSparkleToElement(element) {
if (!element) return;

const sparkle = document.createElement('div');
sparkle.style.position = 'absolute';
sparkle.style.width = '30px';
sparkle.style.height = '30px';
sparkle.style.borderRadius = '50%';
sparkle.style.backgroundColor = 'var(--secondary)';
sparkle.style.boxShadow = '0 0 15px var(--secondary)';
sparkle.style.pointerEvents = 'none';
sparkle.style.zIndex = '2';
sparkle.style.top = '30%';
sparkle.style.left = '50%';
sparkle.style.transform = 'translate(-50%, -50%)';
sparkle.style.animation = 'sparkle 1s forwards';

element.style.position = 'relative';
element.appendChild(sparkle);

setTimeout(() => {
    if (sparkle.parentNode) {
        sparkle.parentNode.removeChild(sparkle);
    }
}, 1000);
}

// Add event listeners to challenge cards
const challengeCards = document.querySelectorAll('.challenge-card');
challengeCards.forEach(card => {
card.addEventListener('click', function() {
    // Find which slide this card is in
    const slideIndex = Array.from(slides).findIndex(slide => 
        slide.contains(this)
    );
    
    if (slideIndex !== -1 && slideIndex !== currentSlide) {
        goToSlide(slideIndex);
        resetInterval();
    } else {
        // Just add the sparkle effect if already on this slide
        addSparkleToElement(this);
    }
});
});

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
if (e.key === 'ArrowRight') {
    nextSlide();
    resetInterval();
} else if (e.key === 'ArrowLeft') {
    prevSlide();
    resetInterval();
}
});
}

// Add to DOM-ready function call
document.addEventListener('DOMContentLoaded', function() {
setupChallengeSlider();
});

// In main.js hinzufügen - löst das Problem mit verdeckten Abschnitten
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      const headerHeight = document.querySelector('#header').offsetHeight;
      
      window.scrollTo({
        top: targetSection.offsetTop - headerHeight - 20, // 20px extra Puffer
        behavior: 'smooth'
      });
    });
  });