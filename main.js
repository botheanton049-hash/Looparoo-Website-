document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  const header = document.getElementById('siteHeader');
  const navToggle = document.getElementById('navToggle');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    document.querySelectorAll('#mainNav a').forEach(link => {
      link.addEventListener('click', () => {
        header.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  const navLinks = document.querySelectorAll('[data-nav]');
  const sections = Array.from(navLinks).map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const navIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = '#' + entry.target.id;
        const link = document.querySelector(`[data-nav][href="${id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => navIo.observe(s));
  }

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.count');
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const duration = 1300;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = value.toFixed(decimals).replace('.', ',');
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && counters.length) {
    const counterIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          counterIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(el => counterIo.observe(el));
  }

  /* ---------- Scroll progress ring ---------- */
  const fillCircle = document.querySelector('.loop-progress__fill');
  const CIRC = 2 * Math.PI * 17;
  if (fillCircle) {
    fillCircle.style.strokeDasharray = String(CIRC);
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      fillCircle.style.strokeDashoffset = String(CIRC * (1 - progress));
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ---------- Product size toggle (S / L) ---------- */
  const sizeData = {
    s: { dims: '20 × 40 cm', cost: '4,53 €', price: '8,00 €' },
    l: { dims: '25 × 50 cm', cost: '5,13 €', price: '9,00 €' }
  };
  const sizeButtons = document.querySelectorAll('.size-toggle__btn');
  const specTable = document.getElementById('specTable');
  sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeButtons.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      const size = btn.dataset.size;
      const data = sizeData[size];
      if (specTable && data) {
        specTable.querySelectorAll('[data-field]').forEach(field => { field.style.opacity = '0'; });
        setTimeout(() => {
          specTable.querySelector('[data-field="dims"]').textContent = data.dims;
          specTable.querySelector('[data-field="cost"]').textContent = data.cost;
          specTable.querySelector('[data-field="price"]').textContent = data.price;
          specTable.querySelectorAll('[data-field]').forEach(field => { field.style.opacity = '1'; });
        }, 150);
      }
      const bagRender = document.getElementById('bagRender');
      if (bagRender) {
        bagRender.style.transform = size === 'l' ? 'scale(1.06)' : 'scale(1)';
      }
    });
  });

  /* ---------- Loop stepper ---------- */
  const stepIcons = [
    // Versand — Paket-Pfeil
    '<path d="M2 8h20l-3 12H5L2 8Z" stroke="#5C8A55" stroke-width="1.8" stroke-linejoin="round" fill="none"/><path d="M8 8V5a4 4 0 0 1 8 0v3" stroke="#5C8A55" stroke-width="1.8" fill="none"/>',
    // Empfang — Haus/Person
    '<path d="M2 12l10-8 10 8" stroke="#5C8A55" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 10v10h14V10" stroke="#5C8A55" stroke-width="1.8" fill="none" stroke-linejoin="round"/>',
    // Rückgabe — Pfeil-Kreis
    '<path d="M3 12a9 9 0 1 1 3 6.7" stroke="#5C8A55" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M3 15v4h4" stroke="#5C8A55" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    // Reinigung — Tropfen
    '<path d="M12 2c4 5 7 9 7 13a7 7 0 1 1-14 0c0-4 3-8 7-13Z" stroke="#5C8A55" stroke-width="1.8" fill="none" stroke-linejoin="round"/>',
    // Wiedernutzung — Doppelpfeil
    '<path d="M2 12a10 10 0 0 1 17-7" stroke="#5C8A55" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M22 12a10 10 0 0 1-17 7" stroke="#5C8A55" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M19 2v3h-3M5 22v-3h3" stroke="#5C8A55" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
  ];
  const stepperBtns = document.querySelectorAll('.stepper__btn');
  const stepperSlides = document.querySelectorAll('.stepper__slide');
  const stepperArc = document.getElementById('stepperArc');
  const stepperIcon = document.getElementById('stepperIcon');
  const ARC_CIRC = 2 * Math.PI * 82;
  const setStep = (index) => {
    stepperBtns.forEach(b => {
      const active = Number(b.dataset.step) === index;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-selected', String(active));
    });
    stepperSlides.forEach(s => {
      s.classList.toggle('is-active', Number(s.dataset.panel) === index);
    });
    if (stepperArc) {
      const progress = (index + 1) / stepperBtns.length;
      stepperArc.style.strokeDasharray = String(ARC_CIRC);
      stepperArc.style.strokeDashoffset = String(ARC_CIRC * (1 - progress));
    }
    if (stepperIcon) {
      stepperIcon.innerHTML = stepIcons[index] || '';
    }
  };
  stepperBtns.forEach(btn => {
    btn.addEventListener('click', () => setStep(Number(btn.dataset.step)));
  });
  if (stepperBtns.length) setStep(0);

  /* ---------- Ersparnis-Rechner ---------- */
  const pkgRange = document.getElementById('pkgRange');
  const pkgValue = document.getElementById('pkgValue');
  const calcSingle = document.getElementById('calcSingle');
  const calcLoop = document.getElementById('calcLoop');
  const calcWaste = document.getElementById('calcWaste');
  const fmtEUR = (n) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 }) + ' €';
  const fmtNum = (n) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });

  const updateCalc = () => {
    if (!pkgRange) return;
    const pkgs = Number(pkgRange.value);
    pkgValue.textContent = fmtNum(pkgs);
    const singleCost = pkgs * 1.0;      // ca. 1 €/Versand Einwegkarton (Marktangabe PPWR-Folie)
    const loopCost = pkgs * 0.30;       // eingeschwungener Betrieb LOOPAROO
    calcSingle.textContent = fmtEUR(singleCost);
    calcLoop.textContent = fmtEUR(loopCost);
    calcWaste.textContent = fmtNum(pkgs);
  };
  if (pkgRange) {
    pkgRange.addEventListener('input', updateCalc);
    updateCalc();
  }

  /* ---------- Partner contact form (demo only) ---------- */
  const form = document.getElementById('partnerForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        status.textContent = 'Bitte Name und E-Mail-Adresse angeben.';
        status.style.color = '#B5572A';
        return;
      }
      status.style.color = '';
      status.textContent = 'Danke! Ihre Anfrage wurde übermittelt — wir melden uns zeitnah.';
      form.reset();
    });
  }
});
