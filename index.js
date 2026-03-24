/* ============================================================
   NIR CHOUDHARY — Portfolio Scripts
   script.js
   ============================================================ */

/* ── Custom Cursor ─────────────────────────────────────────── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  if (!cursor || !ring) return;

  let mx = 0, my = 0;
  let rx = 0, ry = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  const hoverTargets = document.querySelectorAll(
    'a, button, .cat-btn, .video-card, .service-card, .social-link, .featured-play-btn'
  );
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });
})();


/* ── Sticky Navigation ─────────────────────────────────────── */
(function initNav() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
})();


/* ── Mobile Hamburger Menu ─────────────────────────────────── */
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.toggle('open');
}

(function initMobileMenu() {
  document.querySelectorAll('#navLinks a').forEach((a) => {
    a.addEventListener('click', () => {
      const navLinks = document.getElementById('navLinks');
      if (navLinks) navLinks.classList.remove('open');
    });
  });
})();


/* ── Scroll Reveal (IntersectionObserver) ──────────────────── */
(function initReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer  = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => observer.observe(el));
})();


/* ── Animated Skill Bars ───────────────────────────────────── */
(function initSkillBars() {
  const skillGrid = document.getElementById('skillsGrid');
  if (!skillGrid) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-fill').forEach((fill) => {
            fill.style.width = fill.dataset.width + '%';
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(skillGrid);
})();


/* ── Animated Stat Counters ────────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  let current  = 0;
  const step   = Math.max(1, Math.floor(target / 60));

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current;
  }, 25);
}

(function initCounters() {
  const statsGrid = document.querySelector('.stats-grid');
  if (!statsGrid) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(statsGrid);
})();


/* ── Video Category Filter ─────────────────────────────────── */
function filterVideos(cat, btn) {
  // Update active button
  document.querySelectorAll('.cat-btn').forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');

  // Show / hide cards with fade animation
  document.querySelectorAll('.video-card').forEach((card) => {
    const match = cat === 'all' || card.dataset.cat === cat;

    if (match) {
      card.style.display   = '';
      card.style.opacity   = '0';
      card.style.transform = 'scale(0.95)';

      requestAnimationFrame(() => {
        card.style.transition = 'opacity .4s ease, transform .4s ease';
        card.style.opacity    = '1';
        card.style.transform  = 'scale(1)';
      });
    } else {
      card.style.display = 'none';
    }
  });
}


/* ── Contact Form Handler ──────────────────────────────────── */
function handleFormSubmit(e) {
  e.preventDefault();

  const btn        = e.target.querySelector('.form-submit');
  const successMsg = document.getElementById('formSuccess');

  btn.textContent = 'Sending…';
  btn.disabled    = true;

  setTimeout(() => {
    btn.textContent       = 'Message Sent ✓';
    btn.style.background  = 'linear-gradient(135deg, #059669, #10b981)';
    btn.style.boxShadow   = '0 0 30px rgba(5,150,105,0.4)';

    if (successMsg) successMsg.style.display = 'block';

    e.target.reset();
  }, 1200);
}


/* ── Hero Parallax ─────────────────────────────────────────── */
(function initParallax() {
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.28}px)`;
      heroContent.style.opacity   = String(Math.max(0, 1 - scrolled / 600));
    }
  });
})();


/* ── Active Nav Link Highlighting ──────────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              'active-link',
              link.getAttribute('href') === '#' + entry.target.id
            );
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
})();

 const cards = document.querySelectorAll(".video-card");
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("modalVideo");
  const closeBtn = document.querySelector(".close-btn");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const videoSrc = card.getAttribute("data-video");
      video.src = videoSrc;
      modal.style.display = "flex";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    video.pause();
    video.src = "";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      video.pause();
      video.src = "";
    }
  });