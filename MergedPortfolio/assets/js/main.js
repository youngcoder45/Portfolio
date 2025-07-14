(function($) {
  
  "use strict";  

  $(window).on('load', function() {

    /* 
   MixitUp
   ========================================================================== */
  // $('#portfolio').mixItUp();

  /* 
   One Page Navigation & wow js
   ========================================================================== */
    // var OnePNav = $('.onepage-nev');
    // var top_offset = OnePNav.height() - -0;
    // OnePNav.onePageNav({
    //   currentClass: 'active',
    //   scrollOffset: top_offset,
    // });
  
  /*Page Loader active
    ========================================================*/
	
		/*PRELOADER JS*/ 
			// $('.spinner').fadeOut();
			// $('.preloader').delay(350).fadeOut('slow'); 
		/*END PRELOADER JS*/

		/*START MENU JS*/		
			 // if ($(window).scrollTop() > 200) {
              //  $('.fixed-top').addClass('menu-bg');
          // } else {
              //  $('.fixed-top').removeClass('menu-bg');
          // }
			// $(window).on('scroll', function(){
			// 	if ( $(window).scrollTop() > 100 ) {
			// 		$('.site-navigation, .header-white, .header').addClass('navbar-fixed');
			// 	} else {
			// 		$('.site-navigation, .header-white, .header').removeClass('navbar-fixed');
			// 	}
			// });				
		/*END MENU JS*/	

      /* WOW Scroll Spy
    ========================================================*/
     // var wow = new WOW({
      // //disabled for mobile
      //     mobile: false
      // });

      // wow.init();

    /* Nivo Lightbox 
    ========================================================*/
    // $('.lightbox').nivoLightbox({
    //     effect: 'fadeScale',
    //     keyboardNav: true,
    //   });

    /* Counter
    ========================================================*/
    // $('.counterUp').counterUp({
    //  delay: 20,
    //  time: 3000
    // });
	
	 /* Tesimonial
    ========================================================*/
	// $(".carousel-testimony").owlCarousel({
	// 	loop:true,
	// 	navText:false,
	// 	autoplay: true,
	// 	items:1,
	// 	slideSpeed: 5000,
	// 	responsive:{
	// 		0:{
	// 			items:1
	// 		},
	// 		768:{
	// 			items:1
	// 		},
	// 		979:{
	// 			items:1
	// 		},
	// 		1000:{
	// 			items:1
	// 		}
	// 	}
	// });


    /* Back Top Link active
    ========================================================*/
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

  // --- SCROLLSPY FOR NAVBAR (above #skills only) ---
  document.addEventListener('DOMContentLoaded', function () {
    const sections = ['home', 'about', 'statistics', 'highlights'];
    const navLinks = Array.from(document.querySelectorAll('.navbar-nav .nav-link'));
    function onScroll() {
      let scrollPos = window.scrollY || window.pageYOffset;
      let found = false;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop - 80 <= scrollPos) {
          navLinks.forEach(link => link.classList.remove('scrollspy-active'));
          const activeLink = navLinks.find(link => link.getAttribute('href') === '#' + sections[i]);
          if (activeLink) activeLink.classList.add('scrollspy-active');
          found = true;
          break;
        }
      }
      if (!found) navLinks.forEach(link => link.classList.remove('scrollspy-active'));
    }
    window.addEventListener('scroll', onScroll);
    onScroll();

    // Smooth scroll for nav links
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').replace('#', '');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          e.preventDefault();
          window.scrollTo({
            top: targetSection.offsetTop - 64,
            behavior: 'smooth'
          });
        }
      });
    });
  });

  // REBUILT HERO SECTION: Animated Roles
  (function() {
    var roles = document.querySelectorAll('.hero-roles .role-text');
    var idx = 0;
    function showRole(i) {
      roles.forEach(function(r, j) { r.classList.toggle('active', j === i); });
    }
    setInterval(function() {
      idx = (idx + 1) % roles.length;
      showRole(idx);
    }, 1500);
    showRole(0);
  })();

  // HERO PARTICLES INIT
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
    } else {
      // Fallback: simple floating shapes
      var c = document.createElement('canvas');
      c.width = c.height = 0;
      c.style.width = '100%';
      c.style.height = '100%';
      c.style.position = 'absolute';
      c.style.top = c.style.left = 0;
      c.style.pointerEvents = 'none';
      document.getElementById('hero-particles').appendChild(c);
      var ctx = c.getContext('2d');
      var shapes = Array.from({length: 18}, () => ({
        x: Math.random(), y: Math.random(), r: 18+Math.random()*18, dx: (Math.random()-0.5)*0.001, dy: (Math.random()-0.5)*0.001, color: ['#00bcd4','rgba(255,3,100,0.18)','rgba(255,255,255,0.12)'][Math.floor(Math.random()*3)]
      }));
      function resize() { c.width = c.offsetWidth; c.height = c.offsetHeight; }
      window.addEventListener('resize', resize); resize();
      function draw() {
        ctx.clearRect(0,0,c.width,c.height);
        shapes.forEach(s => {
          ctx.beginPath();
          ctx.arc(s.x*c.width, s.y*c.height, s.r, 0, 2*Math.PI);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = 0.18;
          ctx.fill();
          ctx.globalAlpha = 1;
          s.x += s.dx; s.y += s.dy;
          if (s.x<0||s.x>1) s.dx*=-1;
          if (s.y<0||s.y>1) s.dy*=-1;
        });
        requestAnimationFrame(draw);
      }
      draw();
    }
  })();

  // ABOUT BADGES: Staggered Animation
  (function() {
    var badges = document.querySelectorAll('.about-badges-animated .about-badge');
    badges.forEach(function(badge, i) {
      setTimeout(function() {
        badge.style.opacity = 1;
        badge.style.transform = 'translateY(0)';
      }, 200 + i*180);
    });
  })();

  // HERO BG FLOATING SHAPES
  (function() {
    var bg = document.getElementById('hero-bg-anim');
    if (!bg) return;
    var c = document.createElement('canvas');
    c.width = c.height = 0;
    c.style.width = '100%';
    c.style.height = '100%';
    c.style.position = 'absolute';
    c.style.top = c.style.left = 0;
    c.style.pointerEvents = 'none';
    bg.appendChild(c);
    var ctx = c.getContext('2d');
    var shapes = Array.from({length: 16}, () => ({
      x: Math.random(), y: Math.random(), r: 32+Math.random()*32, dx: (Math.random()-0.5)*0.0007, dy: (Math.random()-0.5)*0.0007, color: ['#00bcd4','rgba(255,3,100,0.13)','rgba(255,255,255,0.10)'][Math.floor(Math.random()*3)]
    }));
    function resize() { c.width = c.offsetWidth; c.height = c.offsetHeight; }
    window.addEventListener('resize', resize); resize();
    function draw() {
      ctx.clearRect(0,0,c.width,c.height);
      shapes.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x*c.width, s.y*c.height, s.r, 0, 2*Math.PI);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = 0.18;
        ctx.fill();
        ctx.globalAlpha = 1;
        s.x += s.dx; s.y += s.dy;
        if (s.x<0||s.x>1) s.dx*=-1;
        if (s.y<0||s.y>1) s.dy*=-1;
      });
      requestAnimationFrame(draw);
    }
    draw();
  })();

  // HERO ROLES ANIMATION
  (function() {
    var roles = document.querySelectorAll('.hero-roles .role-text');
    var idx = 0;
    function showRole(i) {
      roles.forEach(function(r, j) { r.classList.toggle('active', j === i); });
    }
    setInterval(function() {
      idx = (idx + 1) % roles.length;
      showRole(idx);
    }, 1500);
    showRole(0);
  })();

}(jQuery));