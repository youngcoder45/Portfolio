// ===== MAIN PORTFOLIO JAVASCRIPT =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('YC45 Portfolio - Professional JavaScript Loaded Successfully! 🚀');

    // Initialize all components
    initContactForm();
    initCounters();
    initScrollAnimations();
    initParallaxEffects();
    initNewsletterForm();
    initBackToTop();
});

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Clear previous errors
            clearFormErrors();

            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name')?.trim();
            const email = formData.get('email')?.trim();
            const subject = formData.get('subject')?.trim();
            const message = formData.get('message')?.trim();

            // Validation
            let hasError = false;

            if (!name) {
                showFieldError('name', 'Name is required');
                hasError = true;
            }

            if (!email) {
                showFieldError('email', 'Email is required');
                hasError = true;
            } else if (!isValidEmail(email)) {
                showFieldError('email', 'Please enter a valid email address');
                hasError = true;
            }

            if (!subject) {
                showFieldError('subject', 'Subject is required');
                hasError = true;
            }

            if (!message) {
                showFieldError('message', 'Message is required');
                hasError = true;
            }

            if (hasError) {
                showFormMessage('Please fix the errors above.', 'error');
                return;
            }

            // Show sending message
            showFormMessage('Sending your message...', 'info');

            // Submit to Formspree
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showFormMessage('Thank you! Your message has been sent successfully. I will get back to you soon!', 'success');
                    contactForm.reset();
                } else {
                    return response.json().then(data => {
                        if (data.errors && data.errors.length > 0) {
                            throw new Error(data.errors.map(error => error.message).join(', '));
                        } else {
                            throw new Error('Failed to send message');
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Form submission error:', error);
                showFormMessage('Sorry, there was an error sending your message. Please try again later.', 'error');
            });
        });
    }
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.field-error');
    errorElements.forEach(el => el.remove());

    const inputElements = document.querySelectorAll('.form-control');
    inputElements.forEach(el => el.classList.remove('is-invalid'));
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    if (field) {
        field.classList.add('is-invalid');

        // Remove existing error for this field
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        // Add new error message
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = '#f44336';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        field.parentNode.appendChild(errorElement);
    }
}

function showFormMessage(message, type) {
    let formResponse = document.getElementById('form-response');

    if (!formResponse) {
        // Create form response element if it doesn't exist
        formResponse = document.createElement('div');
        formResponse.id = 'form-response';
        formResponse.className = 'form-response';

        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.parentNode.insertBefore(formResponse, contactForm.nextSibling);
        }
    }

    formResponse.textContent = message;
    formResponse.className = `form-response ${type}`;

    // Auto-hide success/error messages after 5 seconds
    if (type !== 'info') {
        setTimeout(() => {
            formResponse.textContent = '';
            formResponse.className = 'form-response';
        }, 5000);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== NEWSLETTER FORM =====
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterResponse = document.getElementById('newsletter-response');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value.trim();

            if (!email || !isValidEmail(email)) {
                if (newsletterResponse) {
                    newsletterResponse.style.color = '#ff5555';
                    newsletterResponse.textContent = 'Please enter a valid email address.';
                }
                return;
            }

            if (newsletterResponse) {
                newsletterResponse.style.color = '#00e0ff';
                newsletterResponse.textContent = 'Subscribing...';

                setTimeout(() => {
                    newsletterResponse.style.color = '#55ff55';
                    newsletterResponse.textContent = 'Thank you for subscribing!';
                    newsletterForm.reset();
                }, 1200);
            }
        });
    }
}

// ===== COUNTERS ANIMATION =====
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
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

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .skill-category, .enhanced-card, .timeline-item, .stat-card');

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
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-bg');

        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ===== BURGER MENU =====
const burger = document.querySelector('.navbar-toggler');
const navCollapse = document.getElementById('navbarCollapse');

if (burger && navCollapse) {
    burger.addEventListener('click', function () {
        navCollapse.classList.toggle('show');
    });
}

const filterSkills = c => {
      const a = document.querySelectorAll(".skill-card");
      a.forEach(a => {
          a.style.display = "all" === c || a.dataset.category === c ? "block" : "none"
      })
  },
  testimonials = document.querySelectorAll(".testimonial");
let currentTestimonialOld = 0;
document.getElementById("prev-testimonial")?.addEventListener("click", () => {
  testimonials[currentTestimonialOld].classList.remove("active"), testimonials[currentTestimonialOld].style.opacity = 0, testimonials[currentTestimonialOld].style.pointerEvents = "none", currentTestimonialOld = (currentTestimonialOld - 1 + testimonials.length) % testimonials.length, testimonials[currentTestimonialOld].classList.add("active"), testimonials[currentTestimonialOld].style.opacity = 1, testimonials[currentTestimonialOld].style.pointerEvents = "auto"
}), document.getElementById("next-testimonial")?.addEventListener("click", () => {
  testimonials[currentTestimonialOld].classList.remove("active"), testimonials[currentTestimonialOld].style.opacity = 0, testimonials[currentTestimonialOld].style.pointerEvents = "none", currentTestimonialOld = (currentTestimonialOld + 1) % testimonials.length, testimonials[currentTestimonialOld].classList.add("active"), testimonials[currentTestimonialOld].style.opacity = 1, testimonials[currentTestimonialOld].style.pointerEvents = "auto"
});
const introTexts = ["Hello! I'm Aditya Verma, a passionate web developer.", "I craft modern, responsive, and user-friendly web apps.", "Always eager to learn new technologies and improve my skills."];
let i = 0,
  j = 0,
  current = "",
  isDeleting = !1;

function type() {
  if (i < introTexts.length) {
      const b = document.getElementById("typed-intro");
      if (!b) return;
      !isDeleting && j <= introTexts[i].length ? (current = introTexts[i].substring(0, j++), b.textContent = current, setTimeout(type, 40)) : isDeleting && 0 < j ? (current = introTexts[i].substring(0, --j), b.textContent = current, setTimeout(type, 20)) : isDeleting ? (isDeleting = !1, setTimeout(type, 700)) : (b.textContent = introTexts[i], i++, j = 0, setTimeout(type, 900))
  } else {
      const b = document.getElementById("typed-intro");
      b && (b.innerHTML = introTexts.map(b => `<span>${b}</span>`).join("<br>"))
  }
}
type(), document.addEventListener("DOMContentLoaded", () => {
  const c = new IntersectionObserver(b => {
      b.forEach(b => {
          b.isIntersecting && b.target.classList.add("visible")
      })
  }, {
      threshold: .1
  });
  document.querySelectorAll(".fade-in").forEach(a => {
      c.observe(a)
  })
}), document.addEventListener("DOMContentLoaded", () => {
  function h() {
      c.width = window.innerWidth, c.height = window.innerHeight, d.length = 0;
      for (let b = 0; b < e; b++) d.push({
          x: Math.random() * c.width,
          y: Math.random() * c.height,
          size: 2 * Math.random() + 1,
          speedX: 2 * Math.random() - 1,
          speedY: 2 * Math.random() - 1,
          opacity: .5 * Math.random() + .2
      })
  }

  function a() {
      i.clearRect(0, 0, c.width, c.height), d.forEach(e => {
          e.x += e.speedX, e.y += e.speedY, (0 > e.x || e.x > c.width) && (e.speedX *= -1), (0 > e.y || e.y > c.height) && (e.speedY *= -1), i.beginPath(), i.arc(e.x, e.y, e.size, 0, 2 * Math.PI), i.fillStyle = `rgba(0, 188, 212, ${e.opacity})`, i.fill(), d.forEach(a => {
          const b = e.x - a.x,
              c = e.y - a.y,
              d = Math.sqrt(b * b + c * c);
          120 > d && (i.beginPath(), i.strokeStyle = `rgba(0, 188, 212, ${.1*(1-d/120)})`, i.lineWidth = 1, i.moveTo(e.x, e.y), i.lineTo(a.x, a.y), i.stroke())
      })
      }), requestAnimationFrame(a)
  }
  const b = document.querySelector(".particles");
  if (!b) return;
  const c = document.createElement("canvas"),
      i = c.getContext("2d");
  b.appendChild(c);
  const d = [],
      e = 100;
  window.addEventListener("resize", h), h(), a()
}), document.addEventListener("mousemove", d => {
  const e = d.clientX / window.innerWidth,
      b = d.clientY / window.innerHeight;
  requestAnimationFrame(() => {
      document.querySelectorAll(".gradient-overlay").forEach(c => {
          c.style.transform = `translate(${20*(e-.5)}px, ${20*(b-.5)}px)`
      })
  })
}), document.addEventListener("DOMContentLoaded", () => {
  const e = document.querySelector("header h1");
  e && (e.style.cursor = "pointer", e.addEventListener("dblclick", createEmojiShower));
  let f = "";
  document.addEventListener("keypress", b => {
      f += b.key.toLowerCase(), 4 < f.length && (f = f.slice(-4)), "yc45" === f && (triggerRainbowText(), f = "")
  });
  const a = document.querySelectorAll(".skill-card");
  a.forEach(d => {
      let a = 0;
      d.style.cursor = "pointer", d.addEventListener("click", b => {
          b.preventDefault(), a++, 3 == a && (d.style.transform = "scale(1.2)", createEmojiShower(), setTimeout(() => {
              d.style.transform = "", a = 0
          }, 1e3))
      })
  });
  const c = document.querySelectorAll(".project-title");
  c.forEach(b => {
      b.style.cursor = "pointer", b.addEventListener("click", function(b) {
          b.preventDefault(), showHiddenMessage(this)
      })
  })
});

function createEmojiShower() {
  const f = ["\uD83D\uDE80", "\uD83D\uDCBB", "\u2B50", "\uD83D\uDDA5\uFE0F", "\uD83C\uDFAF", "\u2764\uFE0F", "\uD83D\uDC96", "\u2728", "\uD83C\uDF81", "\uD83E\uDD29", "\uD83D\uDCBD", "\uD83E\uDDD1\u200D\uD83D\uDCBB"];
  for (let a = 0; 20 > a; a++) {
      const a = document.createElement("div");
      a.className = "easter-egg-emoji";
      const b = Math.random() * window.innerWidth,
          c = 2 + 2 * Math.random(),
          d = .4 + .6 * Math.random();
      a.style.cssText = `
  left: ${b}px;
  top: ${window.innerHeight}px;
  animation: floatUp ${c}s ease-in forwards;
  opacity: ${d};
`, a.textContent = f[Math.floor(Math.random() * f.length)], document.body.appendChild(a), setTimeout(() => a.remove(), 1e3 * c)
  }
}

function showHiddenMessage() {
  const c = hiddenMessages[Math.floor(Math.random() * hiddenMessages.length)],
      a = document.createElement("div");
  a.className = "secret-popup", a.textContent = c, a.style.cssText = `
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background: rgba(0, 188, 212, 0.9);
color: white;
padding: 20px;
border-radius: 10px;
font-size: 1.2rem;
font-weight: bold;
z-index: 9999;
box-shadow: 0 4px 12px rgba(0,0,0,0.2);
opacity: 0;
transition: opacity 0.3s ease;
`, document.body.appendChild(a), requestAnimationFrame(() => {
      a.style.opacity = "1"
  }), setTimeout(() => {
      a.style.opacity = "0", setTimeout(() => a.remove(), 300)
  }, 2e3)
}

function triggerRainbowText() {
  const b = document.querySelectorAll(".section-title");
  b.forEach(b => {
      b.classList.add("secret-text"), b.style.transition = "color 0.3s ease", setTimeout(() => {
          b.classList.remove("secret-text")
      }, 3e3)
  })
}
let coords = {
  x: 0,
  y: 0
};
const circles = document.querySelectorAll(".cursor-trail");
document.addEventListener("mousemove", b => {
  coords.x = b.clientX, coords.y = b.clientY
});

function animateTrail() {
  let f = coords.x,
      g = coords.y;
  circles.forEach((a, b) => {
      a.style.left = f - 12 + "px", a.style.top = g - 12 + "px", a.style.scale = (circles.length - b) / circles.length, a.x = f, a.y = g;
      const c = circles[b + 1] || circles[0];
      f += .3 * (c.x - f), g += .3 * (c.y - g)
  }), requestAnimationFrame(animateTrail)
}

function initTrail() {
  const c = document.createElement("div");
  c.className = "cursor-trail-container", document.body.appendChild(c);
  for (let a = 0; 20 > a; a++) {
      const a = document.createElement("div");
      a.className = "cursor-trail", a.x = 0, a.y = 0, c.appendChild(a)
  }
}
initTrail(), animateTrail();
let clickPattern = [];
const secretPattern = [1, 2, 1, 2];
document.addEventListener("mousedown", b => {
  clickPattern.push(b.button + 1), clickPattern.length > secretPattern.length && clickPattern.shift(), JSON.stringify(clickPattern) === JSON.stringify(secretPattern) && (toggleMatrixEffect(), clickPattern = [])
});

function toggleMatrixEffect() {
  const i = document.createElement("canvas");
  i.className = "matrix-canvas", document.body.appendChild(i);
  const a = i.getContext("2d");
  i.width = window.innerWidth, i.height = window.innerHeight;
  const b = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "@", "#", "$", "%", "^", "&", "*", "(", ")", "*", "&", "^", "%"],
      c = 14,
      d = i.width / 14,
      j = Array(Math.floor(d)).fill(1),
      e = setInterval(function() {
          a.fillStyle = "rgba(0, 0, 0, 0.05)", a.fillRect(0, 0, i.width, i.height), a.fillStyle = "#0F0", a.font = "14px monospace", j.forEach((d, e) => {
              const f = b[Math.floor(Math.random() * b.length)];
              a.fillText(f, e * c, d * c), d * c > i.height && .975 < Math.random() && (j[e] = 0), j[e]++
          })
      }, 33);
  setTimeout(() => {
      clearInterval(e), i.remove()
  }, 5e3)
}
document.addEventListener("DOMContentLoaded", () => {
  const c = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, !1);
  for (let d; d = c.nextNode();) {
      const b = d.textContent;
      if (b.toLowerCase().includes("space")) {
          const a = document.createElement("span");
          a.innerHTML = b.replace(/\b(space)\b/gi, "<span class='sparkle-text'>$1</span>"), d.parentNode.replaceChild(a, d)
      }
  }
});

function createSparkle(a, b) {
  const c = document.createElement("div");
  c.className = "sparkle", c.style.left = a + "px", c.style.top = b + "px", document.body.appendChild(c), setTimeout(() => c.remove(), 1e3)
}
document.addEventListener("mousemove", a => {
  .1 > Math.random() && createSparkle(a.clientX, a.clientY)
});
let konamiCode = "";
const validCode = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba";
document.addEventListener("keydown", a => {
  konamiCode += a.key, konamiCode.length > validCode.length && (konamiCode = konamiCode.slice(-validCode.length)), konamiCode === validCode && (createColorBurst(), konamiCode = "")
});

function createColorBurst() {
  const a = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"];
  for (let b = 0; 50 > b; b++) {
      const c = document.createElement("div");
      c.className = "color-particle";
      const d = a[Math.floor(Math.random() * a.length)],
          e = 2 * Math.PI * b / 50,
          f = 2 + 2 * Math.random();
      c.style.backgroundColor = d, document.body.appendChild(c);
      const g = window.innerWidth / 2,
          h = window.innerHeight / 2;
      let i = g,
          j = h;
      const k = () => {
          i += Math.cos(e) * f, j += Math.sin(e) * f, c.style.left = i + "px", c.style.top = j + "px", 0 > i || i > window.innerWidth || 0 > j || j > window.innerHeight ? c.remove() : requestAnimationFrame(k)
      };
      requestAnimationFrame(k)
  }
}
document.querySelectorAll(".section-title").forEach(a => {
  a.addEventListener("click", () => {
      a.classList.add("shake"), setTimeout(() => a.classList.remove("shake"), 500)
  })
}), document.addEventListener("click", a => {
  const b = a.target;
  if (!b.hasAttribute("data-clicks")) b.setAttribute("data-clicks", "1"), setTimeout(() => b.removeAttribute("data-clicks"), 400);
  else {
      const a = parseInt(b.getAttribute("data-clicks")) + 1;
      b.setAttribute("data-clicks", a.toString()), 3 === a && (b.classList.add("glitch-text"), setTimeout(() => {
          b.classList.remove("glitch-text"), b.removeAttribute("data-clicks")
      }, 1e3))
  }
});
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
const newsletterFormOld = document.getElementById('newsletter-form');
const newsletterResponseOld = document.getElementById('newsletter-response');
if(newsletterFormOld) {
  newsletterFormOld.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value.trim();
    if(!email || !/\S+@\S+\.\S+/.test(email)) {
      newsletterResponseOld.style.color = '#ff5555';
      newsletterResponseOld.textContent = 'Please enter a valid email address.';
      return;
    }
    newsletterResponseOld.style.color = '#00e0ff';
    newsletterResponseOld.textContent = 'Subscribing...';
    setTimeout(() => {
      newsletterResponseOld.style.color = '#55ff55';
      newsletterResponseOld.textContent = 'Thank you for subscribing!';
      newsletterFormOld.reset();
    }, 1200);
  });
}

// === DYNAMIC FEATURES INIT ===
// HERO PARTICLES
(function() {
  if (window.particlesJS) {
    particlesJS('hero-particles', {
      particles: {
        number: { value: 32, density: { enable: true, value_area: 800 } },
        color: { value: ['#00bcd4', '#ff0364', '#fff'] },
        shape: { type: 'circle' },
        opacity: { value: 0.18, random: true },
        size: { value: 4, random: true },
        move: { enable: true, speed: 1.2, direction: 'none', random: true, straight: false, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
        modes: { repulse: { distance: 80 }, push: { particles_nb: 4 } }
      },
      retina_detect: true
    });
  }
})();
// COUNTER UP FOR STATISTICS
$(function() {
  if ($.fn.counterUp && $.fn.waypoint) {
    $('.counter').counterUp({ delay: 20, time: 1200 });
  }
});
// SMOOTH SCROLL (for anchor links)
$(function() {
  $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: target.offset().top - 64 }, 800);
      }
    }
  });
});
// BACK TO TOP BUTTON
$(function() {
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

  // WOW.js for reveal animations
  if (typeof WOW === 'function') {
    new WOW().init();
  }

  // Particles.js background
  if (typeof particlesJS === 'function' && document.getElementById('particles-js')) {
    particlesJS.load('particles-js', 'assets/js/particles.json', function () {
      // callback
    });
  }

  // Owl Carousel for testimonials or blog (if present)
  if ($('.owl-carousel').length && typeof $.fn.owlCarousel === 'function') {
    $('.owl-carousel').owlCarousel({
      loop: true,
      margin: 20,
      nav: true,
      dots: true,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 3 }
      }
    });
  }

  // Nivo Lightbox for project images (if present)
  if ($('.project-img, .blog-image').length && typeof $.fn.nivoLightbox === 'function') {
    $('.project-img, .blog-image').nivoLightbox();
  }

  // CounterUp for fun facts (if present)
  if ($('.counterUp').length && typeof $.fn.counterUp === 'function') {
    $('.counterUp').counterUp({
      delay: 10,
      time: 1000
    });
  }

  // Animated headline (if present)
  if ($('.cd-headline').length && typeof $.fn.animatedHeadline === 'function') {
    $('.cd-headline').animatedHeadline({
      animationType: 'clip'
    });
  }

  // Back to top button
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        backToTop.style.display = 'block';
      } else {
        backToTop.style.display = 'none';
      }
    });
    backToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
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