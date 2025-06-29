window.addEventListener("load", () => {
  const b = document.querySelector(".loader-wrapper");
  setTimeout(() => {
      b.classList.add("loader-hidden"), setTimeout(() => b.style.display = "none", 500)
  }, 2e3)
});
const burger = document.querySelector(".burger"),
  nav = document.querySelector("nav"),
  navOverlay = document.querySelector(".nav-overlay"),
  body = document.body;
burger?.addEventListener("click", () => {
  burger.classList.toggle("active"), nav.classList.toggle("active"), navOverlay.classList.toggle("active"), body.style.overflow = nav.classList.contains("active") ? "hidden" : ""
}), navOverlay?.addEventListener("click", () => {
  burger.classList.remove("active"), nav.classList.remove("active"), navOverlay.classList.remove("active"), body.style.overflow = ""
}), document.querySelectorAll("nav a").forEach(b => {
  b.addEventListener("click", () => {
      burger.classList.remove("active"), nav.classList.remove("active"), navOverlay.classList.remove("active"), body.style.overflow = ""
  })
});
const sections = document.querySelectorAll("main section"),
  navLinks = document.querySelectorAll("nav ul li a"),
  updateActiveNavLink = () => {
      let d = "";
      sections.forEach(a => {
          const b = a.offsetTop - 80;
          window.scrollY >= b && (d = a.getAttribute("id"))
      }), navLinks.forEach(a => {
          a.classList.remove("active"), a.getAttribute("href").substring(1) === d && a.classList.add("active")
      })
  };
window.addEventListener("scroll", updateActiveNavLink);
const form = document.getElementById("contact-form"),
  responseMsg = document.getElementById("form-response");
form?.addEventListener("submit", async b => {
  if (b.preventDefault(), responseMsg.textContent = "", !form.checkValidity()) return responseMsg.style.color = "#ff5555", void(responseMsg.textContent = "Please fill out all fields correctly.");
  responseMsg.style.color = "#00e0ff", responseMsg.textContent = "Sending message...";
  try {
      const c = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: {
              Accept: "application/json"
          }
      });
      if (c.ok) responseMsg.style.color = "#55ff55", responseMsg.textContent = "Thank you for contacting me, I will get back to you soon!", form.reset();
      else {
          const a = await c.json();
          responseMsg.style.color = "#ff5555", responseMsg.textContent = a.errors?.length ? a.errors.map(b => b.message).join(", ") : "Oops! Something went wrong. Please try again later."
      }
  } catch (b) {
      responseMsg.style.color = "#ff5555", responseMsg.textContent = "Network error. Please try again later."
  }
});
const filterSkills = c => {
      const a = document.querySelectorAll(".skill-card");
      a.forEach(a => {
          a.style.display = "all" === c || a.dataset.category === c ? "block" : "none"
      })
  },
  testimonials = document.querySelectorAll(".testimonial");
let currentTestimonial = 0;
document.getElementById("prev-testimonial")?.addEventListener("click", () => {
  testimonials[currentTestimonial].classList.remove("active"), testimonials[currentTestimonial].style.opacity = 0, testimonials[currentTestimonial].style.pointerEvents = "none", currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length, testimonials[currentTestimonial].classList.add("active"), testimonials[currentTestimonial].style.opacity = 1, testimonials[currentTestimonial].style.pointerEvents = "auto"
}), document.getElementById("next-testimonial")?.addEventListener("click", () => {
  testimonials[currentTestimonial].classList.remove("active"), testimonials[currentTestimonial].style.opacity = 0, testimonials[currentTestimonial].style.pointerEvents = "none", currentTestimonial = (currentTestimonial + 1) % testimonials.length, testimonials[currentTestimonial].classList.add("active"), testimonials[currentTestimonial].style.opacity = 1, testimonials[currentTestimonial].style.pointerEvents = "auto"
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
// ...existing code...
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
// ...existing code...