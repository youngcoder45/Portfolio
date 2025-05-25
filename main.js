// Loading Screen Handler
window.addEventListener('load', () => {
  const loaderWrapper = document.querySelector('.loader-wrapper');
  setTimeout(() => {
    loaderWrapper.classList.add('loader-hidden');
    setTimeout(() => {
      loaderWrapper.style.display = 'none';
    }, 500);
  }, 2000); // Show loader for 2 seconds to see the full animation
});

// Burger Menu Functionality
const burger = document.querySelector('.burger');
const nav = document.querySelector('nav');
const navOverlay = document.querySelector('.nav-overlay');
const body = document.body;

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  nav.classList.toggle('active');
  navOverlay.classList.toggle('active');
  body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking overlay
navOverlay.addEventListener('click', () => {
  burger.classList.remove('active');
  nav.classList.remove('active');
  navOverlay.classList.remove('active');
  body.style.overflow = '';
});

// Close menu when clicking a nav link
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    nav.classList.remove('active');
    navOverlay.classList.remove('active');
    body.style.overflow = '';
  });
});

// Change active nav link based on scroll position
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if(scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if(link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

// Contact form validation and Formspree AJAX submission
const form = document.getElementById('contact-form');
const responseMsg = document.getElementById('form-response');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  responseMsg.textContent = '';
  if (!form.checkValidity()) {
    responseMsg.style.color = '#ff5555';
    responseMsg.textContent = 'Please fill out all fields correctly.';
    return;
  }
  responseMsg.style.color = '#00e0ff';
  responseMsg.textContent = 'Sending message...';

  const formData = new FormData(form);
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    if (res.ok) {
      responseMsg.style.color = '#55ff55';
      responseMsg.textContent = 'Thank you for contacting me, I will get back to you soon!';
      form.reset();
    } else {
      const data = await res.json();
      responseMsg.style.color = '#ff5555';
      if (data.errors && data.errors.length > 0) {
        responseMsg.textContent = data.errors.map(e => e.message).join(', ');
      } else {
        responseMsg.textContent = 'Oops! Something went wrong. Please try again later.';
      }
    }
  } catch (error) {
    responseMsg.style.color = '#ff5555';
    responseMsg.textContent = 'Network error. Please try again later.';
  }
});

// Add this to your existing JavaScript
const filterSkills = (category) => {
  const skills = document.querySelectorAll('.skill-card');
  skills.forEach(skill => {
    if (category === 'all' || skill.dataset.category === category) {
      skill.style.display = 'block';
    } else {
      skill.style.display = 'none';
    }
  });
};

const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;
document.getElementById('prev-testimonial').onclick = () => {
  testimonials[currentTestimonial].classList.remove('active');
  testimonials[currentTestimonial].style.opacity = 0;
  testimonials[currentTestimonial].style.pointerEvents = 'none';
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  testimonials[currentTestimonial].classList.add('active');
  testimonials[currentTestimonial].style.opacity = 1;
  testimonials[currentTestimonial].style.pointerEvents = 'auto';
};
document.getElementById('next-testimonial').onclick = () => {
  testimonials[currentTestimonial].classList.remove('active');
  testimonials[currentTestimonial].style.opacity = 0;
  testimonials[currentTestimonial].style.pointerEvents = 'none';
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  testimonials[currentTestimonial].classList.add('active');
  testimonials[currentTestimonial].style.opacity = 1;
  testimonials[currentTestimonial].style.pointerEvents = 'auto';
};

const introTexts = [
  "Hello! I'm Aditya Verma, a passionate web developer.",
  "I craft modern, responsive, and user-friendly web apps.",
  "Always eager to learn new technologies and improve my skills."
];
let i = 0, j = 0, current = '', isDeleting = false;
function type() {
  if (i < introTexts.length) {
    if (!isDeleting && j <= introTexts[i].length) {
      current = introTexts[i].substring(0, j++);
      document.getElementById('typed-intro').textContent = current;
      setTimeout(type, 40);
    } else if (isDeleting && j > 0) {
      current = introTexts[i].substring(0, --j);
      document.getElementById('typed-intro').textContent = current;
      setTimeout(type, 20);
    } else if (!isDeleting) {
      // After typing, show the full text and move to next
      document.getElementById('typed-intro').textContent = introTexts[i];
      i++;
      j = 0;
      setTimeout(type, 900);
    } else {
      isDeleting = false;
      setTimeout(type, 700);
    }
  } else {
    // When all lines are typed, show all as paragraphs
    document.getElementById('typed-intro').innerHTML = introTexts.map(t => `<span>${t}</span>`).join('<br>');
  }
}
type();

// Add this to your main.js file
document.addEventListener('DOMContentLoaded', function() {
  // Intersection Observer for fade-in animations
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
          }
      });
  }, {
      threshold: 0.1
  });

  // Observe all sections with fade-in class
  document.querySelectorAll('.fade-in').forEach(section => {
      observer.observe(section);
  });
});

// Particle Background Animation
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.particles');
  if (!container) return;
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let particles = [];
  const particleCount = 100;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 188, 212, ${p.opacity})`;
      ctx.fill();
      particles.forEach(q => {
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 188, 212, ${0.1 * (1 - dist / 120)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      });
    });
    requestAnimationFrame(animate);
  }
  window.addEventListener('resize', resize);
  resize();
  animate();
});

// Add mouse parallax effect
document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  document.querySelectorAll('.gradient-overlay').forEach(element => {
      const moveX = (mouseX - 0.5) * 20;
      const moveY = (mouseY - 0.5) * 20;
      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});

// Simple Easter Eggs
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing easter eggs...'); // Debug log

  // Easter Egg 1: Double-click name to trigger emoji shower
  const nameTitle = document.querySelector('header h1');
  if (nameTitle) {
    console.log('Name title found:', nameTitle); // Debug log
    nameTitle.style.cursor = 'pointer';
    nameTitle.addEventListener('dblclick', (e) => {
      console.log('Double click detected!'); // Debug log
      createEmojiShower();
    });
  }

  // Easter Egg 2: Type "yc45" anywhere
  let secretCode = '';
  document.addEventListener('keypress', (e) => {
    secretCode += e.key.toLowerCase();
    console.log('Current secret code:', secretCode); // Debug log
    if (secretCode.length > 4) {
      secretCode = secretCode.slice(-4);
    }
    if (secretCode === 'yc45') {
      console.log('Secret code activated!'); // Debug log
      triggerRainbowText();
      secretCode = '';
    }
  });

  // Easter Egg 3: Click skill icons
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach(card => {
    let clicks = 0;
    card.style.cursor = 'pointer';
    
    card.addEventListener('click', (e) => {
      e.preventDefault();
      clicks++;
      console.log('Skill card clicked, clicks:', clicks); // Debug log
      
      if (clicks === 3) {
        console.log('Triple click activated!'); // Debug log
        card.style.transform = 'scale(1.2)';
        createEmojiShower();
        setTimeout(() => {
          card.style.transform = '';
          clicks = 0;
        }, 1000);
      }
    });
  });

  // Easter Egg 4: Hidden messages in project titles
  const projectTitles = document.querySelectorAll('.project-title');
  const hiddenMessages = [
    "You found a secret! 🎉",
    "Hello Easter Egg! 🚀",
    "You're awesome 🥚🥚! ⭐",
    "Nice discovery! 💫"
  ];

  projectTitles.forEach(title => {
    title.style.cursor = 'pointer';
    title.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Project title clicked!'); // Debug log
      showHiddenMessage(this);
    });
  });

  function showHiddenMessage(element) {
    const message = hiddenMessages[Math.floor(Math.random() * hiddenMessages.length)];
    const popup = document.createElement('div');
    popup.className = 'secret-popup';
    popup.textContent = message;
    
    // Style the popup
    popup.style.cssText = `
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
    `;
    
    document.body.appendChild(popup);
    
    // Trigger animation
    requestAnimationFrame(() => {
      popup.style.opacity = '1';
    });
    
    // Remove popup after animation
    setTimeout(() => {
      popup.style.opacity = '0';
      setTimeout(() => popup.remove(), 300);
    }, 2000);
  }
});

// Helper function to create emoji shower
function createEmojiShower() {
  console.log('Creating emoji shower...'); // Debug log
  const emojis = ['🚀', '💻', '⭐', '🖥️', '🎯', '❤️', '💖', '✨', '🎁', '🤩', '💽', '🧑‍💻'];
  
  for (let i = 0; i < 20; i++) {
    const emoji = document.createElement('div');
    emoji.className = 'easter-egg-emoji';
    
    // Randomize starting position
    emoji.style.cssText = `
      left: ${Math.random() * window.innerWidth}px;
      top: ${window.innerHeight}px;
      position: fixed;
      font-size: 24px;
      pointer-events: none;
      z-index: 9999;
      animation: floatUp ${2 + Math.random() * 2}s ease-in forwards;
      opacity: ${0.4 + Math.random() * 0.6};
    `;
    
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    document.body.appendChild(emoji);
    
    // Remove emoji after animation
    setTimeout(() => emoji.remove(), 3000);
  }
}

// Helper function to trigger rainbow text
function triggerRainbowText() {
  console.log('Triggering rainbow text...'); // Debug log
  const titles = document.querySelectorAll('.section-title');
  
  titles.forEach(title => {
    title.classList.add('secret-text');
    title.style.transition = 'color 0.3s ease';
    
    setTimeout(() => {
      title.classList.remove('secret-text');
    }, 3000);
  });
}

// Fun cursor trail effect
let coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.cursor-trail');

document.addEventListener('mousemove', (e) => {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateTrail() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach((circle, index) => {
    circle.style.left = x - 12 + 'px';
    circle.style.top = y - 12 + 'px';

    circle.style.scale = (circles.length - index) / circles.length;
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateTrail);
}

// Initialize cursor trail
function initTrail() {
  const cursorTrailContainer = document.createElement('div');
  cursorTrailContainer.className = 'cursor-trail-container';
  document.body.appendChild(cursorTrailContainer);

  for (let i = 0; i < 20; i++) {
    const div = document.createElement('div');
    div.className = 'cursor-trail';
    div.x = 0;
    div.y = 0;
    cursorTrailContainer.appendChild(div);
  }
}

initTrail();
animateTrail();

// Secret click combination for matrix effect
let clickPattern = [];
const secretPattern = [1, 2, 1, 2]; // Left click = 1, Right click = 2

document.addEventListener('mousedown', (e) => {
  clickPattern.push(e.button + 1);
  if (clickPattern.length > secretPattern.length) {
    clickPattern.shift();
  }
  if (JSON.stringify(clickPattern) === JSON.stringify(secretPattern)) {
    toggleMatrixEffect();
    clickPattern = [];
  }
});

function toggleMatrixEffect() {
  const canvas = document.createElement('canvas');
  canvas.className = 'matrix-canvas';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
  const matrixChars = matrix.split('');
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  let matrixInterval = setInterval(drawMatrix, 33);
  setTimeout(() => {
    clearInterval(matrixInterval);
    canvas.remove();
  }, 5000);
}

// Add this to your existing JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Find all text nodes in the document
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let node;
  while (node = walker.nextNode()) {
    const text = node.textContent;
    if (text.toLowerCase().includes('space')) {
      // Split the text and wrap the word "space" with a span
      const newText = text.replace(/\b(space)\b/gi, '<span data-space-trigger>$1</span>');
      const span = document.createElement('span');
      span.innerHTML = newText;
      node.parentNode.replaceChild(span, node);
    }
  }

  // Add click event listeners to space triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-space-trigger]');
    if (trigger) {
      createFlyingRocket(e.clientX, e.clientY);
    }
  });
});

function createFlyingRocket(startX, startY) {
  // Create rocket element
  const rocket = document.createElement('div');
  rocket.className = 'flying-rocket';
  document.body.appendChild(rocket);

  // Calculate launch direction based on screen position
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const launchDirection = startX < screenWidth / 2 ? 1 : -1; // 1 for right, -1 for left

  // Position the rocket at click position
  rocket.style.left = `${startX - 20}px`;
  rocket.style.top = `${startY - 20}px`;

  // Set custom property for launch direction
  rocket.style.setProperty('--launch-direction', launchDirection);

  // Launch sequence
  launchSequence(rocket, startX, startY, launchDirection);
}

function launchSequence(rocket, x, y, direction) {
  // Step 1: Pre-launch vibration
  rocket.classList.add('pre-launch');
  createSmokeParticles(x, y, 'pre-launch');

  // Step 2: Ignition after 1 second
  setTimeout(() => {
    rocket.classList.remove('pre-launch');
    rocket.classList.add('ignition');
    createSmokeParticles(x, y, 'ignition');
    
    // Step 3: Liftoff after 0.5 seconds
    setTimeout(() => {
      rocket.classList.remove('ignition');
      rocket.classList.add('liftoff');
      createGroundParticles(x, y);
      
      // Create continuous smoke trail during flight
      let smokeInterval = setInterval(() => {
        const rect = rocket.getBoundingClientRect();
        createSmokeParticles(
          rect.left + rect.width / 2,
          rect.top + rect.height,
          'liftoff'
        );
      }, 50);
      
      // Cleanup after animation
      setTimeout(() => {
        clearInterval(smokeInterval);
        rocket.remove();
      }, 3000);
    }, 500);
  }, 1000);
}

function createSmokeParticles(x, y, stage) {
  const particleCount = stage === 'liftoff' ? 10 : 15;
  const baseSize = stage === 'liftoff' ? 12 : 8;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'smoke-particle';
    
    // Random particle properties
    const size = Math.random() * baseSize + baseSize/2;
    particle.style.width = particle.style.height = `${size}px`;
    
    // Position particle
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    // Set random movement direction
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 100 + 50;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance + (stage === 'liftoff' ? 50 : 0);
    const rotate = Math.random() * 360;
    
    particle.style.setProperty('--dx', `${dx}px`);
    particle.style.setProperty('--dy', `${dy}px`);
    particle.style.setProperty('--rotate', `${rotate}deg`);
    
    document.body.appendChild(particle);
    
    // Animate the particle
    particle.animate([
      { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 0.8, filter: 'blur(0px)' },
      { transform: `translate(${dx}px, ${dy}px) scale(3) rotate(${rotate}deg)`, opacity: 0, filter: 'blur(4px)' }
    ], {
      duration: Math.random() * 1000 + 1000,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards'
    });
    
    // Cleanup
    setTimeout(() => particle.remove(), 2000);
  }
}

function createGroundParticles(x, y) {
  const particleCount = 40;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'ground-particle';
    
    // Random particle properties
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Position particle
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    // Set random movement direction
    const angle = (Math.random() * 180 - 90) * (Math.PI / 180);
    const velocity = Math.random() * 200 + 100;
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity;
    const rotate = Math.random() * 360;
    
    particle.style.setProperty('--dx', `${dx}px`);
    particle.style.setProperty('--dy', `${dy}px`);
    particle.style.setProperty('--rotate', `${rotate}deg`);
    
    document.body.appendChild(particle);
    
    // Animate the particle
    particle.animate([
      { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) scale(0) rotate(${rotate}deg)`, opacity: 0 }
    ], {
      duration: Math.random() * 1000 + 500,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards'
    });
    
    // Cleanup
    setTimeout(() => particle.remove(), 1500);
  }
}