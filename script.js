// Gamified Scroll Progress Bar
let lastScrollPercentage = 0;
const progressDebounce = 10; // milliseconds

window.addEventListener('scroll', function() {
    const now = Date.now();
    if (now - lastScrollPercentage < progressDebounce) return;
    lastScrollPercentage = now;
    
    const scrollProgressContainer = document.querySelector('.scroll-progress-container');
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');
    const progressDot = document.querySelector('.scroll-progress-dot');
    const progressNumber = document.querySelector('.scroll-progress-number');
    
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    const roundedPercentage = Math.round(scrollPercentage);
    
    scrollProgressBar.style.width = scrollPercentage + '%';
    progressNumber.textContent = roundedPercentage;
    
    // Dynamic color change based on progress
    if (scrollPercentage < 30) {
        scrollProgressBar.style.background = 'linear-gradient(90deg, #FF6B6B, #FF8E8E)';
    } else if (scrollPercentage < 70) {
        scrollProgressBar.style.background = 'linear-gradient(90deg, #FF8E8E, #FFC3C3)';
    } else {
        scrollProgressBar.style.background = 'linear-gradient(90deg, #FFC3C3, #FFE66D)';
    }
    
    // Show/hide logic with more prominent appearance
    if (scrollTop > 100 && scrollPercentage < 98) {
        scrollProgressContainer.style.opacity = '1';
        
        // Celebration effect when reaching certain milestones
        if (roundedPercentage % 25 === 0 && roundedPercentage !== 0) {
            progressDot.style.animation = 'none';
            void progressDot.offsetWidth; // Trigger reflow
            progressDot.style.animation = 'pulse 0.5s 3';
        }
    } else {
        scrollProgressContainer.style.opacity = '0';
    }
    
    // Final push encouragement
    if (scrollPercentage > 85) {
        progressNumber.style.color = '#FFE66D';
        progressNumber.style.textShadow = '0 0 5px rgba(255, 230, 109, 0.8)';
        progressDot.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.9), 0 0 15px rgba(255, 230, 109, 1)';
    }
});

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    const scrollProgressContainer = document.querySelector('.scroll-progress-container');
    setTimeout(() => {
        scrollProgressContainer.style.transition = 'opacity 0.3s ease';
    }, 1000);

    // Initialize all sections
    initDarkMode();
    initMenu();
    initSmoothScrolling();
    initScrollReveal();
    initTypedJS();
    initCertifications();
    initLeadership();
    initTestimonials();
    initSkillsAnimation();
    initProjectsToggle(); // Initialize projects toggle
});


// Dark/Light Mode Toggle
function initDarkMode() {
    const darkModeIcon = document.querySelector('#darkMode-icon');
    if (darkModeIcon) {
        darkModeIcon.onclick = () => {
            darkModeIcon.classList.toggle('bx-sun');
            document.body.classList.toggle('dark-mode');
        };
    }
}

// Menu Toggle
function initMenu() {
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        };

        // Close menu when clicking on nav links or scrolling
        document.querySelectorAll('.nav-btn').forEach(link => {
            link.addEventListener('click', () => {
                menuIcon.classList.remove('bx-x');
                navbar.classList.remove('active');
            });
        });

        window.onscroll = () => {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        };
    }
}

// Sticky Header
function initStickyHeader() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 100);
        }
    });
}

// Smooth scrolling for all navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-btn').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// Active nav link on scroll
function initActiveNavLinks() {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-btn').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Scroll Reveal Animation - FIXED VERSION
function initScrollReveal() {
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            reset: false, // CHANGED FROM true to false - This is the main fix!
            distance: '80px',
            duration: 2000,
            delay: 200,
            cleanup: true // Added cleanup to prevent conflicts
        });

        // Reveal elements only once
        sr.reveal('.home-content, .heading', { 
            origin: 'top',
            reset: false 
        });
        sr.reveal('.home-img img, .education-container, .projects-box, .contact form', { 
            origin: 'bottom',
            reset: false 
        });
        sr.reveal('.home-content h1, .about-img img', { 
            origin: 'left',
            reset: false 
        });
        sr.reveal('.home-content h3, .home-content p, .about-content', { 
            origin: 'right',
            reset: false 
        });

        // Specifically reveal section headings with reset false
        sr.reveal('.leadership .heading, .certifications .heading, .testimonials .heading, .contact .heading', {
            origin: 'top',
            reset: false,
            delay: 300
        });
    }
}

// Typed.js Animations
function initTypedJS() {
    if (typeof Typed !== 'undefined') {
        const typedName = new Typed('.typed-name', {
            strings: ['Anirudh Chaudhary'],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 1000,
            showCursor: false
        });

        const typedProfession = new Typed('.multiple-text', {
            strings: ['Data-Driven Business Analyst', 'SQL Expert', 'Power BI Specialist', 'Excel Wizard'],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });
    }
}

// Certifications Section Functionality
function initCertifications() {
    const certificationsSection = document.querySelector('.certifications');
    if (!certificationsSection) return;

    // Category filter functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const certificateCards = document.querySelectorAll('.certificate-card');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            
            // Show/hide certificates based on category
            certificateCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Certificate modal functionality
    const viewBtns = document.querySelectorAll('.view-btn');
    const modal = document.querySelector('.modal-overlay');
    const modalImg = document.querySelector('.certificate-image');
    const closeModal = document.querySelector('.close-modal');
    
    if (viewBtns.length && modal && modalImg && closeModal) {
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const certificatePath = btn.dataset.certificate;
                modalImg.src = certificatePath;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Leadership Section Animation
function initLeadership() {
    const leadershipSection = document.querySelector('.leadership');
    if (!leadershipSection) return;

    const cards = document.querySelectorAll('.leadership-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Activate timeline animation
                    const timeline = entry.target.querySelector('.timeline-line');
                    const starItems = entry.target.querySelectorAll('.star-item');
                    
                    if (timeline) {
                        timeline.classList.add('active');
                        
                        // Animate star items sequentially
                        starItems.forEach((item, i) => {
                            setTimeout(() => {
                                item.classList.add('active');
                            }, i * 300);
                        });
                    }
                    
                    // Start counting animation for this card's metrics
                    if (entry.target.querySelector('.count-anim')) {
                        startCounting(entry.target);
                    }
                }, index * 150);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach((card) => {
        observer.observe(card);
    });

    // Counting animation function
    function startCounting(card) {
        const metricValues = card.querySelectorAll('.count-anim');
        let delay = 0;
        
        metricValues.forEach(metric => {
            setTimeout(() => {
                const target = parseFloat(metric.dataset.target);
                const suffix = metric.dataset.suffix || '';
                const duration = 1500;
                let start = 0;
                const increment = target / (duration / 16);
                
                const updateCounter = () => {
                    start += increment;
                    if (start < target) {
                        if (suffix === '★') {
                            metric.textContent = start.toFixed(1) + suffix;
                        } else if (suffix === '%' || suffix === '+') {
                            metric.textContent = Math.floor(start) + suffix;
                        } else {
                            metric.textContent = Math.floor(start).toLocaleString() + suffix;
                        }
                        requestAnimationFrame(updateCounter);
                    } else {
                        metric.textContent = target.toLocaleString() + suffix;
                    }
                };
                
                updateCounter();
            }, delay);
            
            delay += 300;
        });
    }
}

// Skills Animation
function initSkillsAnimation() {
    const skillsSection = document.querySelector('.skills');
    if (!skillsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start the animation loop
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(skillsSection);

    function animateSkills() {
        const skillItems = document.querySelectorAll('.skill-item');
        const animationDuration = 2500;
        
        // First reset all animations
        skillItems.forEach((item) => {
            const pieFill = item.querySelector('.pie-fill');
            const percentElement = item.querySelector('.percent');
            
            pieFill.style.transition = 'none';
            pieFill.style.strokeDashoffset = '339.292';
            percentElement.textContent = '0%';
            
            // Force reflow
            void pieFill.offsetWidth;
        });

        // Then animate all together
        setTimeout(() => {
            skillItems.forEach((item) => {
                const chart = item.querySelector('.chart');
                const percent = parseInt(chart.getAttribute('data-percent'));
                const pieFill = item.querySelector('.pie-fill');
                const percentElement = item.querySelector('.percent');
                
                // Enable smooth transition
                pieFill.style.transition = `stroke-dashoffset ${animationDuration}ms ease-in-out`;
                
                // Calculate the final offset
                const offset = 339.292 * (100 - percent) / 100;
                pieFill.style.strokeDashoffset = offset;
                
                // Animate percentage number
                animateCount(percentElement, percent, animationDuration);
            });
        }, 100);
    }

    function animateCount(element, target, duration) {
        let start = 0;
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const currentValue = Math.floor(progress * target);
            
            element.textContent = currentValue + '%';
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        requestAnimationFrame(updateNumber);
    }
}

// Testimonials Carousel
function initTestimonials() {
    const testimonialsSection = document.querySelector('.testimonials');
    if (!testimonialsSection) return;

    const track = document.querySelector('.testimonials-track');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.radio-indicator');
    const container = document.querySelector('.testimonials-container');
    
    // Get original cards
    const originalCards = Array.from(document.querySelectorAll('.testimonial-card'));
    const cardCount = originalCards.length;
    
    if (cardCount === 0) return;
    
    // Clear track and rebuild with clones for infinite loop
    track.innerHTML = '';
    
    // Add clones before originals (for left-to-right scroll)
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });
    
    // Add original cards
    originalCards.forEach(card => {
        track.appendChild(card);
    });
    
    // Add clones after originals (for right-to-left scroll)
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });
    
    // Get all cards including clones
    const allCards = Array.from(track.querySelectorAll('.testimonial-card'));
    
    // Initialize variables
    let currentIndex = cardCount;
    let isAnimating = false;
    let scrollInterval;
    let direction = 'right';
    
    function calculateCardWidth() {
        if (allCards.length === 0) return 0;
        const card = allCards[0];
        const cardWidth = card.offsetWidth;
        const gapWidth = parseInt(window.getComputedStyle(track).gap.replace('px', ''));
        return cardWidth + gapWidth;
    }
    
    function updateTrackPosition(animate = true) {
        const cardWidth = calculateCardWidth();
        const offset = -currentIndex * cardWidth;
        
        if (animate) {
            track.style.transition = 'transform 0.8s cubic-bezier(0.33, 1, 0.68, 1)';
        } else {
            track.style.transition = 'none';
        }
        
        track.style.transform = `translateX(${offset}px)`;
        updateIndicators();
    }
    
    function updateIndicators() {
        const activeIndex = (currentIndex - cardCount) % cardCount;
        const normalizedIndex = activeIndex < 0 ? activeIndex + cardCount : activeIndex;
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === normalizedIndex);
        });
    }
    
    function moveToIndex(index, animate = true) {
        if (isAnimating) return;
        currentIndex = index;
        isAnimating = true;
        updateTrackPosition(animate);
    }
    
    function handleTransitionEnd() {
        isAnimating = false;
        
        const totalCards = allCards.length;
        const cardWidth = calculateCardWidth();
        
        if (currentIndex <= cardCount - 1) {
            currentIndex = cardCount;
            updateTrackPosition(false);
        } else if (currentIndex >= cardCount * 2) {
            currentIndex = cardCount * 2 - 1;
            updateTrackPosition(false);
        }
    }
    
    function autoScroll() {
        if (isAnimating) return;
        
        if (direction === 'right') {
            if (currentIndex >= cardCount * 2 - 1) {
                direction = 'left';
                moveToIndex(currentIndex - 1);
            } else {
                moveToIndex(currentIndex + 1);
            }
        } else {
            if (currentIndex <= cardCount) {
                direction = 'right';
                moveToIndex(currentIndex + 1);
            } else {
                moveToIndex(currentIndex - 1);
            }
        }
    }
    
    function startAutoScroll() {
        stopAutoScroll();
        scrollInterval = setInterval(autoScroll, 2000);
    }
    
    function stopAutoScroll() {
        clearInterval(scrollInterval);
    }
    
    // Event listeners
    track.addEventListener('transitionend', handleTransitionEnd);
    
    prevBtn.addEventListener('click', () => {
        stopAutoScroll();
        direction = 'left';
        moveToIndex(currentIndex - 1);
        startAutoScroll();
    });
    
    nextBtn.addEventListener('click', () => {
        stopAutoScroll();
        direction = 'right';
        moveToIndex(currentIndex + 1);
        startAutoScroll();
    });
    
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const targetIndex = parseInt(this.dataset.index) + cardCount;
            stopAutoScroll();
            direction = targetIndex > currentIndex ? 'right' : 'left';
            moveToIndex(targetIndex);
            startAutoScroll();
        });
    });
    
    container.addEventListener('mouseenter', stopAutoScroll);
    container.addEventListener('mouseleave', startAutoScroll);
    
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateTrackPosition(false);
        }, 250);
    });
    
    // Initialize
    updateTrackPosition(false);
    startAutoScroll();
}

// Projects Load More Functionality - FIXED VERSION
function initProjectsToggle() {
    const loadMoreBtn = document.getElementById('loadMoreProjects');
    const additionalProjects = document.querySelectorAll('.additional-project');
    const btnText = document.querySelector('.btn-text');
    const btnIcon = document.querySelector('.btn-icon');
    
    if (!loadMoreBtn || additionalProjects.length === 0) return;
    
    let showingAllProjects = false;
    
    loadMoreBtn.addEventListener('click', function() {
        showingAllProjects = !showingAllProjects;
        
        if (showingAllProjects) {
            // Show all additional projects with animation
            additionalProjects.forEach((project, index) => {
                setTimeout(() => {
                    project.classList.add('show');
                }, index * 100);
            });
            
            btnText.textContent = 'Show Less';
            btnIcon.className = 'fas fa-chevron-up btn-icon';
            loadMoreBtn.classList.add('expanded');
            
            // Refresh ScrollReveal after DOM changes
            setTimeout(() => {
                if (typeof ScrollReveal !== 'undefined') {
                    ScrollReveal().sync();
                }
            }, 600);
            
        } else {
            // Hide additional projects
            additionalProjects.forEach(project => {
                project.classList.remove('show');
            });
            
            btnText.textContent = 'Load More Projects';
            btnIcon.className = 'fas fa-chevron-down btn-icon';
            loadMoreBtn.classList.remove('expanded');
            
            // Refresh ScrollReveal after DOM changes
            setTimeout(() => {
                if (typeof ScrollReveal !== 'undefined') {
                    ScrollReveal().sync();
                }
            }, 300);
        }
    });
}

// Initialize sticky header
initStickyHeader();
// Initialize active nav links
initActiveNavLinks();

// Fixed Gallery Zoom Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get all gallery images
  const galleryImages = document.querySelectorAll('.gallery-image');
  const modal = document.getElementById('galleryModal');
  const zoomedImg = document.getElementById('zoomedImage');
  const closeBtn = document.querySelector('.close-modal');

  // Add click event to each gallery image
  galleryImages.forEach(img => {
    img.addEventListener('click', function() {
      modal.style.display = "block";
      zoomedImg.src = this.src;
      zoomedImg.alt = this.alt;
      
      // Disable body scroll when modal is open
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal when clicking X
  closeBtn.addEventListener('click', function() {
    modal.style.display = "none";
    document.body.style.overflow = 'auto';
  });

  // Close modal when clicking outside image
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = 'auto';
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
      document.body.style.overflow = 'auto';
    }
  });

  // Infinite scroll functionality (keep existing)
  const galleryTrack = document.querySelector('.gallery-track');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    const clone = item.cloneNode(true);
    galleryTrack.appendChild(clone);
  });
});