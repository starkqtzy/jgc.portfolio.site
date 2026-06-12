/* ── Mobile Nav ── */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navBackdrop = document.getElementById('navBackdrop');

  function closeMobileNav() {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    navBackdrop.classList.remove('open');
    navBackdrop.setAttribute('aria-hidden', 'true');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navBackdrop.classList.toggle('open', isOpen);
    navBackdrop.setAttribute('aria-hidden', String(!isOpen));
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navBackdrop.addEventListener('click', closeMobileNav);

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  /* ── Smooth Scroll (offset for fixed nav) ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = document.getElementById('navbar').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });        
  });

  /* ── Navbar Scroll ── */
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── Scroll Reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => io.observe(el));

  /* ── Contact Form ── */
  const contactForm = document.getElementById('contactForm');
  const formMsg = document.getElementById('form-msg');

  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const fname = document.getElementById('fname').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    formMsg.className = '';
    formMsg.textContent = '';

    if (!fname || !email || !message) {
      formMsg.textContent = 'Please fill in your name, email, and message.';
      formMsg.className = 'error';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formMsg.textContent = 'Please enter a valid email address.';
      formMsg.className = 'error';
      return;
    }

    window.open(
      'https://mail.google.com/mail/u/0/#inbox?compose=DmwnWrRlQQGFgMRsHlVgLjCDzjNbPjJXsXFlBJdQDJZSDzhfnNhxMZVJwBfSkVBXrsRbqPfZHRMl',
      '_blank',
      'noopener,noreferrer'
    );
  });

  /* ── Active Nav Link ── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute('id');
      }
    });
    navAnchors.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
