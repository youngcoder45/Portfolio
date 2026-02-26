// ===== PROFESSIONAL PORTFOLIO JS =====

document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initNavigation();
    initHeroParticles();
    initSkillBars();
    initProjectFilters();
    initCounters();
    initContactForm();
    initScrollAnimations();
    // initParallaxEffects();
    initResponsiveFeatures();
    // initEasterEggs();
    // initTimelineAnimations();
    initSectionRevealAnimations();
});

// Removed Custom Cursor, Particles, and Tilt Effect for a cleaner, more professional look.


// ===== PRELOADER (VISIBLE MINIMUM DURATION) =====
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    document.body.classList.add('overflow-hidden');
    
    const minDuration = 1000; // Reduced duration
    const start = Date.now();
    
    function hidePreloader() {
        const elapsed = Date.now() - start;
        const wait = Math.max(0, minDuration - elapsed);
        
        setTimeout(() => {
            preloader.classList.add('loader-hidden');
            document.body.classList.remove('overflow-hidden');
            setTimeout(() => {
                if(preloader.parentNode) preloader.parentNode.removeChild(preloader);
            }, 700);
        }, wait);
    }

    // Force hide after 3 seconds max as fallback
    setTimeout(hidePreloader, 3000);

    if (document.readyState === 'complete') {
        hidePreloader();
    } else {
        window.addEventListener('load', hidePreloader);
    }
}

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navbar) return;

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - navbar.offsetHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', debounce(function() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        updateActiveNavigation();
    }, 10));
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== HERO PARTICLES (CLEAN & MINIMAL) =====
function initHeroParticles() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 100, // Increased density for tech feel
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#ffffff", "#aaaaaa", "#4477aa"] // Multi-color particles
                },
                "shape": {
                    "type": ["circle", "triangle"], // Mixed shapes
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.2, // Stronger connections
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2, // Faster movement
                    "direction": "none",
                    "random": true, // Random movement
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 200, // Larger interaction radius
                        "line_linked": {
                            "opacity": 0.6
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }

    // ReactBits-style Typing Effect
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const text = "Building intelligent systems and scalable web applications.";
        typingElement.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50); // Faster typing speed
            } else {
                // Add blinking cursor class if needed, or leave as is
                typingElement.style.borderRight = '2px solid #4ade80';
                setInterval(() => {
                    typingElement.style.borderRightColor = 
                        typingElement.style.borderRightColor === 'transparent' ? '#4ade80' : 'transparent';
                }, 500);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 1000);
    }
}


// ===== SKILLS BARS ANIMATION (REMOVED - MOVED TO TECH STACK GRID) =====
function initSkillBars() {
    // This function is no longer needed as we switched to a tech stack grid layout
    return;
    /*
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillPercents = document.querySelectorAll('.skill-percentage');
    if (skillBars.length === 0) return;

    function animateSkillBars() {
        skillBars.forEach((bar, index) => {
            const targetWidth = bar.getAttribute('data-width');
            if (targetWidth) {
                setTimeout(() => {
                    bar.style.width = targetWidth + '%';
                    bar.classList.add('animated');
                }, index * 150);
            }
        });
        // Animate numbers
        skillPercents.forEach((percent, index) => {
            const value = parseInt(percent.textContent);
            if (!isNaN(value)) {
                percent.textContent = '0%';
                let current = 0;
                const step = Math.ceil(value / 40);
                function animateNum() {
                    current += step;
                    if (current >= value) {
                        percent.textContent = value + '%';
                    } else {
                        percent.textContent = current + '%';
                        requestAnimationFrame(animateNum);
                    }
                }
                setTimeout(animateNum, index * 150);
            }
        });
    }

    // Animate every time section enters view
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        let lastTrigger = 0;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && Date.now() - lastTrigger > 1000) {
                    animateSkillBars();
                    lastTrigger = Date.now();
                }
            });
        }, { threshold: 0.3 });
        observer.observe(skillsSection);
    }
    */
}

// ===== PROJECT FILTERS =====
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.enhanced-card');

    if (filterBtns.length === 0 || projectCards.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.classList.remove('filter-hidden');
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                } else {
                    card.classList.add('filter-hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                }
            });
        });
    });
}

// ===== COUNTERS =====
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (counters.length === 0) return;

    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            if (isNaN(target)) return;

            const increment = target / 100;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '');
                }
            }, 20);
        });

        countersAnimated = true;
    }

    // Animate when stats section is in view
    const statsSection = document.getElementById('statistics');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Simple validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        showFormMessage('Sending...', 'info');

        // Submit form (using Formspree or similar service)
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            showFormMessage('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
        })
        .catch(error => {
            showFormMessage('There was an error sending your message. Please try again.', 'error');
        });
    });
}

function showFormMessage(message, type) {
    const formResponse = document.getElementById('form-response');
    if (!formResponse) return;

    formResponse.textContent = message;
    formResponse.className = `form-response ${type}`;

    setTimeout(() => {
        formResponse.textContent = '';
        formResponse.className = 'form-response';
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Only select elements NOT handled by section reveal
    const animatedElements = document.querySelectorAll('.skill-category, .timeline-item');
    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.classList.add('animated');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.95)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
    window.addEventListener('scroll', debounce(function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        // Hero background parallax
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const heroBg = heroSection.querySelector('.hero-bg-gradient');
            if (heroBg) {
                heroBg.style.transform = `translateY(${rate}px)`;
            }
        }

        // Floating elements
        const floatingElements = document.querySelectorAll('.hero-img-float');
        floatingElements.forEach(element => {
            const speed = 0.3;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, 10));
}

// ===== RESPONSIVE FEATURES =====
function initResponsiveFeatures() {
    // Mobile menu toggle
    const burger = document.querySelector('.navbar-toggler');
    const nav = document.querySelector('.navbar-collapse');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }

    // Close mobile menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav) {
                nav.classList.remove('show');
            }
        });
    });

    // Add scroll to top button
    initScrollToTopButton();
}

function initScrollToTopButton() {
    let scrollTopBtn = document.getElementById('scrollTopBtn');

    if (!scrollTopBtn) {
        scrollTopBtn = document.createElement('button');
        scrollTopBtn.id = 'scrollTopBtn';
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollTopBtn.className = 'scroll-top-btn';
        scrollTopBtn.onclick = scrollToTop;
        document.body.appendChild(scrollTopBtn);
    }

    window.addEventListener('scroll', debounce(function() {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    }, 100));
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== EASTER EGGS =====
function initEasterEggs() {
    // Double-click header for emoji shower
    const header = document.querySelector('header h1');
    if (header) {
        header.style.cursor = 'pointer';
        header.addEventListener('dblclick', createEmojiShower);
    }

    // Konami code detection
    let konamiCode = "";
    const validCode = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba";

    document.addEventListener('keydown', function(e) {
        konamiCode += e.key;
        if (konamiCode.length > validCode.length) {
            konamiCode = konamiCode.slice(-validCode.length);
        }
        if (konamiCode === validCode) {
            createColorBurst();
            konamiCode = "";
        }
    });

    // Secret click pattern
    let clickPattern = [];
    const secretPattern = [1, 2, 1, 2];

    document.addEventListener('mousedown', function(e) {
        clickPattern.push(e.button + 1);
        if (clickPattern.length > secretPattern.length) {
            clickPattern.shift();
        }
        if (JSON.stringify(clickPattern) === JSON.stringify(secretPattern)) {
            toggleMatrixEffect();
            clickPattern = [];
        }
    });
}

function createEmojiShower() {
    const emojis = ["🚀", "💻", "⭐", "🖥️", "🎯", "❤️", "💖", "✨", "🎁", "🤩", "💽", "🧑‍💻"];

    for (let i = 0; i < 20; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'easter-egg-emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        const x = Math.random() * window.innerWidth;
        const duration = 2 + Math.random() * 2;
        const opacity = 0.4 + Math.random() * 0.6;

        emoji.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${window.innerHeight}px;
            font-size: 2rem;
            z-index: 9999;
            pointer-events: none;
            animation: floatUp ${duration}s ease-in forwards;
            opacity: ${opacity};
        `;

        document.body.appendChild(emoji);
        setTimeout(() => emoji.remove(), duration * 1000);
    }
}

function createColorBurst() {
    const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"];

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'color-particle';

        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = (2 * Math.PI * i) / 30;
        const speed = 2 + Math.random() * 2;

        particle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${color};
            border-radius: 50%;
            z-index: 9999;
            pointer-events: none;
        `;

        document.body.appendChild(particle);

        const startX = window.innerWidth / 2;
        const startY = window.innerHeight / 2;
        let x = startX;
        let y = startY;

        const animate = () => {
            x += Math.cos(angle) * speed;
            y += Math.sin(angle) * speed;

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';

            if (x < 0 || x > window.innerWidth || y < 0 || y > window.innerHeight) {
                particle.remove();
            } else {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }
}

function toggleMatrixEffect() {
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9998;
        pointer-events: none;
    `;

    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const interval = setInterval(() => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = `${fontSize}px monospace`;

        drops.forEach((drop, i) => {
            const char = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(char, i * fontSize, drop * fontSize);

            if (drop * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        });
    }, 33);

    setTimeout(() => {
        clearInterval(interval);
        canvas.remove();
    }, 5000);
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-100vh);
            opacity: 0;
        }
    }

    .easter-egg-emoji {
        position: fixed;
        font-size: 2rem;
        z-index: 9999;
        pointer-events: none;
    }

    .color-particle {
        position: fixed;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        z-index: 9999;
        pointer-events: none;
    }
`;
document.head.appendChild(style);

// === TESTIMONIALS SLIDER ===
(function() {
  const testimonials = document.querySelectorAll('.testimonial');
  let currentTestimonial = 0;
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  function showTestimonial(idx) {
    testimonials.forEach((el, i) => {
      el.classList.toggle('active', i === idx);
    });
  }
  if (prevBtn && nextBtn && testimonials.length) {
    prevBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentTestimonial);
    });
    nextBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    });
  }
})();
const newsletterForm = document.getElementById('newsletter-form');
const newsletterResponse = document.getElementById('newsletter-response');
if(newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value.trim();
    if(!email || !/\S+@\S+\.\S+/.test(email)) {
      newsletterResponse.style.color = '#ff5555';
      newsletterResponse.textContent = 'Please enter a valid email address.';
      return;
    }
    newsletterResponse.style.color = '#00e0ff';
    newsletterResponse.textContent = 'Subscribing...';
    setTimeout(() => {
      newsletterResponse.style.color = '#55ff55';
      newsletterResponse.textContent = 'Thank you for subscribing!';
      newsletterForm.reset();
    }, 1200);
  });
}

// === DYNAMIC FEATURES INIT ===
// Removed legacy jQuery and particles.js dependencies in favor of modern vanilla JS implementations

  var offset = 200;
  var duration = 500;
  $(window).scroll(function() {
    if ($(this).scrollTop() > offset) {
      $('.back-to-top').fadeIn(400);
    } else {
      $('.back-to-top').fadeOut(400);
    }
  });
  $('.back-to-top').on('click',function(event) {
    event.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 600);
    return false;
  });
// STAGGERED BADGE ANIMATION
(function() {
  var badges = document.querySelectorAll('.hero-badges .badge, .about-badges-animated .about-badge');
  badges.forEach(function(badge, i) {
    badge.style.opacity = 0;
    badge.style.transform = 'translateY(24px)';
    setTimeout(function() {
      badge.style.opacity = 1;
      badge.style.transform = 'translateY(0)';
      badge.style.transition = 'opacity 0.5s, transform 0.5s';
    }, 200 + i*180);
  });
})();

document.addEventListener('DOMContentLoaded', function () {
  // Navbar: Smooth scroll and active link
  if (typeof $ === 'function') {
    $('.navbar-nav a.nav-link').on('click', function (e) {
      var target = $(this.getAttribute('href'));
      if (target.length) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: target.offset().top - 60 }, 800);
      }
    });
    // Highlight active nav link on scroll
    $(window).on('scroll', function () {
      var scrollPos = $(document).scrollTop();
      $('.navbar-nav a.nav-link').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr('href'));
        if (refElement.position() && refElement.position().top - 80 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
          $('.navbar-nav a.nav-link').removeClass('active');
          currLink.addClass('active');
        }
      });
    });
  }

  // Form validation (basic)
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      var valid = true;
      var inputs = contactForm.querySelectorAll('input, textarea');
      inputs.forEach(function (input) {
        if (!input.value) {
          valid = false;
          input.classList.add('is-invalid');
        } else {
          input.classList.remove('is-invalid');
        }
      });
      if (!valid) {
        e.preventDefault();
      }
    });
  }

  // Burger menu for mobile (if present)
  var burger = document.querySelector('.navbar-toggler');
  var navCollapse = document.getElementById('navbarCollapse');
  if (burger && navCollapse) {
    burger.addEventListener('click', function () {
      navCollapse.classList.toggle('show');
    });
  }
});

// ===== TIMELINE ANIMATION (TRUE SEQUENTIAL) =====
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length === 0) return;
    let animated = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                timelineItems.forEach((el, i) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0) scale(1)';
                        el.classList.add('animated');
                    }, 400 * i);
                });
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    timelineItems.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px) scale(0.97)';
        el.style.transition = 'opacity 1.2s cubic-bezier(0.4,0,0.2,1), transform 1.2s cubic-bezier(0.4,0,0.2,1)';
        observer.observe(el);
    });
}

// ===== GENERAL SECTION REVEAL ANIMATIONS (TRUE SEQUENTIAL) =====
function initSectionRevealAnimations() {
    const sectionGroups = [
        document.querySelectorAll('.fade-in'),
        document.querySelectorAll('.enhanced-card'),
        document.querySelectorAll('.stat-card'),
        document.querySelectorAll('.blog-card'),
        document.querySelectorAll('.testimonial'),
        document.querySelectorAll('.about-glass-card')
    ];
    sectionGroups.forEach(group => {
        if (group.length === 0) return;
        let animated = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    group.forEach((el, i) => {
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0) scale(1)';
                            el.classList.add('animated');
                        }, 350 * i);
                    });
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -50px 0px'
        });
        group.forEach((el) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px) scale(0.97)';
            el.style.transition = 'opacity 1s cubic-bezier(0.4,0,0.2,1), transform 1s cubic-bezier(0.4,0,0.2,1)';
            observer.observe(el);
        });
    });
}