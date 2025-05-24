<<<<<<< HEAD
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
=======
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

// Contact form validation and submission simulation
const form = document.getElementById('contact-form');
const responseMsg = document.getElementById('form-response');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  responseMsg.textContent = '';
  if(!form.checkValidity()) {
    responseMsg.style.color = '#ff5555';
    responseMsg.textContent = 'Please fill out all fields correctly.';
    return;
  }
  // Simulate form submission delay
  responseMsg.style.color = '#00e0ff';
  responseMsg.textContent = 'Sending message...';

  setTimeout(() => {
    responseMsg.style.color = '#55ff55';
    responseMsg.textContent = 'Thank you for contacting me, I will get back to you soon!';
    form.reset();
  }, 1500);
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
class ParticleAnimation {
  constructor() {
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      document.querySelector('.particles').appendChild(this.canvas);
      
      this.particles = [];
      this.particleCount = 100;
      
      this.init();
      this.animate();
      
      window.addEventListener('resize', () => this.init());
  }
  
  init() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      
      this.particles = [];
      for(let i = 0; i < this.particleCount; i++) {
          this.particles.push({
              x: Math.random() * this.canvas.width,
              y: Math.random() * this.canvas.height,
              size: Math.random() * 2 + 1,
              speedX: Math.random() * 2 - 1,
              speedY: Math.random() * 2 - 1,
              opacity: Math.random() * 0.5 + 0.2
          });
      }
  }
  
  animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.particles.forEach(particle => {
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          if(particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
          if(particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;
          
          this.ctx.beginPath();
          this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(0, 188, 212, ${particle.opacity})`;
          this.ctx.fill();
          
          // Draw connections
          this.particles.forEach(otherParticle => {
              const dx = particle.x - otherParticle.x;
              const dy = particle.y - otherParticle.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if(distance < 150) {
                  this.ctx.beginPath();
                  this.ctx.strokeStyle = `rgba(0, 188, 212, ${0.1 * (1 - distance/150)})`;
                  this.ctx.lineWidth = 1;
                  this.ctx.moveTo(particle.x, particle.y);
                  this.ctx.lineTo(otherParticle.x, otherParticle.y);
                  this.ctx.stroke();
              }
          });
      });
      
      requestAnimationFrame(() => this.animate());
  }
}

// Initialize the animation when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ParticleAnimation();
  
  // Add smooth scroll reveal effect
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
          }
      });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'all 0.6s ease-out';
      observer.observe(section);
  });
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
>>>>>>> 078cd339d0b611eb79ad9ac4aec888982cd537af
