/* ============================================================
   SEE BATCH OF 2082 — Main JavaScript
   script.js | Shared by index.html and teachers.html
   ============================================================ */

/* =============================================
   1. CUSTOM CURSOR
   ============================================= */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function lagRing() {
  rx += (mx - rx) * 0.11;
  ry += (my - ry) * 0.11;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(lagRing);
})();

document.querySelectorAll('a, button, .hero-title, .footer-secret, .teacher-card, .photo-frame').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});


/* =============================================
   2. FLOATING PARTICLES (ambient golden dust)
   ============================================= */
const pCanvas = document.getElementById('particleCanvas');
if (pCanvas) {
  const pCtx = pCanvas.getContext('2d');
  pCanvas.width  = window.innerWidth;
  pCanvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    pCanvas.width  = window.innerWidth;
    pCanvas.height = window.innerHeight;
  });

  class Dust {
    constructor(scatter) {
      this.w = pCanvas.width;
      this.h = pCanvas.height;
      this.reset(scatter);
    }
    reset(scatter) {
      this.x   = Math.random() * this.w;
      this.y   = scatter ? Math.random() * this.h : this.h + 5;
      this.r   = Math.random() * 1.6 + 0.4;
      this.vy  = -(Math.random() * 0.45 + 0.12);
      this.vx  = (Math.random() - 0.5) * 0.25;
      this.a   = Math.random() * 0.35 + 0.05;
      this.life = 0;
      this.max  = Math.random() * 320 + 160;
    }
    tick() {
      this.x += this.vx; this.y += this.vy; this.life++;
      if (this.life > this.max || this.y < -5) this.reset(false);
    }
    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.a * (1 - this.life / this.max);
      ctx.fillStyle   = '#C9A55A';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const dusts = Array.from({ length: 65 }, () => new Dust(true));

  (function animDust() {
    pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
    dusts.forEach(d => { d.w = pCanvas.width; d.h = pCanvas.height; d.tick(); d.draw(pCtx); });
    requestAnimationFrame(animDust);
  })();
}


/* =============================================
   3. CONFETTI ENGINE
   ============================================= */
const cCanvas = document.getElementById('confettiCanvas');
const cCtx    = cCanvas ? cCanvas.getContext('2d') : null;
let   confettis = [];

if (cCanvas) {
  cCanvas.width  = window.innerWidth;
  cCanvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    cCanvas.width  = window.innerWidth;
    cCanvas.height = window.innerHeight;
  });

  const COLORS = ['#C9A55A', '#E2C47A', '#FAF7F0', '#8B6B8B', '#6B8BA8', '#D4896A'];

  class Piece {
    constructor(x, y) {
      this.x  = x; this.y = y;
      this.vx = (Math.random() - 0.5) * 10;
      this.vy = -(Math.random() * 9 + 3);
      this.g  = 0.28;
      this.w  = Math.random() * 9 + 4;
      this.h  = Math.random() * 5 + 3;
      this.rot = Math.random() * 360;
      this.rs = (Math.random() - 0.5) * 12;
      this.col = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.fade = Math.random() * 0.008 + 0.004;
      this.alpha = 1;
    }
    tick() { this.x += this.vx; this.vy += this.g; this.y += this.vy; this.rot += this.rs; this.alpha -= this.fade; }
    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot * Math.PI / 180);
      ctx.fillStyle = this.col;
      ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h);
      ctx.restore();
    }
  }

  function burst(x, y, n = 90) {
    for (let i = 0; i < n; i++) confettis.push(new Piece(x, y));
  }

  (function animConfetti() {
    cCtx.clearRect(0, 0, cCanvas.width, cCanvas.height);
    confettis = confettis.filter(p => p.alpha > 0);
    confettis.forEach(p => { p.tick(); p.draw(cCtx); });
    requestAnimationFrame(animConfetti);
  })();

  /* Expose burst globally */
  window.__burst = burst;
}

/* Trigger confetti on hero title click */
const heroTitle = document.getElementById('heroTitle');
if (heroTitle && window.__burst) {
  heroTitle.addEventListener('click', (e) => {
    window.__burst(e.clientX, e.clientY);
    showToast('🎓 SEE Batch of 2082 — We made it!');
  });
}


/* =============================================
   4. SCROLL FADE ANIMATIONS
   ============================================= */
const fades = document.querySelectorAll('.scroll-fade');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
fades.forEach(el => io.observe(el));


/* =============================================
   5. EASTER EGG — Footer "✦ click me ✦"
   ============================================= */
const footerSecret = document.getElementById('footerSecret');
const easterModal  = document.getElementById('easterModal');

if (footerSecret && easterModal) {
  footerSecret.addEventListener('click', () => {
    easterModal.classList.add('active');
  });
}
window.closeEaster = function () {
  if (easterModal) easterModal.classList.remove('active');
};
/* Close modal on backdrop click */
if (easterModal) {
  easterModal.addEventListener('click', (e) => {
    if (e.target === easterModal) window.closeEaster();
  });
}


/* =============================================
   6. KONAMI CODE 🎮
   ↑ ↑ ↓ ↓ ← → ← → B A  → mega confetti celebration
   ============================================= */
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let ki = 0;
document.addEventListener('keydown', (e) => {
  if (e.key === KONAMI[ki]) { ki++; }
  else { ki = e.key === KONAMI[0] ? 1 : 0; }
  if (ki === KONAMI.length) {
    ki = 0;
    if (window.__burst) {
      for (let i = 0; i < 8; i++) {
        setTimeout(() => window.__burst(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight * 0.6
        ), i * 180);
      }
    }
    showToast('🎮 CHEAT CODE! You\'re a legend, Batch of 2082! 🎉');
  }
});


/* =============================================
   7. DAYS TOGETHER COUNTER (homepage only)
   ============================================= */
const counterEl = document.getElementById('daysCounter');
if (counterEl) {
  // Class of SEE 2082 BS — approximately started Grade 9 in Baisakh 2080 (April 2023)
  const startDate = new Date('2023-04-13');
  const now       = new Date();
  const days      = Math.max(0, Math.floor((now - startDate) / 86400000));

  let count = 0;
  const step = days / 60; // 60 frames to count up
  const timer = setInterval(() => {
    count = Math.min(count + step, days);
    counterEl.textContent = Math.floor(count).toLocaleString();
    if (count >= days) clearInterval(timer);
  }, 16);
}


/* =============================================
   TOAST HELPER (used by surprises)
   ============================================= */
function showToast(msg) {
  const t = document.createElement('div');
  Object.assign(t.style, {
    position:      'fixed',
    bottom:        '2.5rem',
    left:          '50%',
    transform:     'translateX(-50%) translateY(12px)',
    background:    'rgba(13, 27, 45, 0.96)',
    border:        '1px solid rgba(201, 165, 90, 0.35)',
    color:         '#EEE2C6',
    fontFamily:    "'Josefin Sans', sans-serif",
    fontSize:      '0.72rem',
    letterSpacing: '0.1em',
    padding:       '0.9rem 2rem',
    zIndex:        '9500',
    opacity:       '0',
    transition:    'all 0.4s ease',
    backdropFilter:'blur(12px)',
    whiteSpace:    'nowrap',
    pointerEvents: 'none',
  });
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => {
    t.style.opacity   = '1';
    t.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    t.style.opacity   = '0';
    t.style.transform = 'translateX(-50%) translateY(12px)';
    setTimeout(() => t.remove(), 400);
  }, 3200);
}
