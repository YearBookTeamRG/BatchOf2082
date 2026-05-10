/* ============================================================
   SEE BATCH OF 2082 — Rajarshi Gurukul
   script.js | Shared by all pages
   ============================================================ */

/* =============================================
   1. CUSTOM CURSOR  (desktop only)
   ============================================= */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
if (cursor && cursorRing) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });
  (function lagRing() {
    rx += (mx - rx) * 0.11; ry += (my - ry) * 0.11;
    cursorRing.style.left = rx + 'px'; cursorRing.style.top = ry + 'px';
    requestAnimationFrame(lagRing);
  })();
  document.querySelectorAll('a,button,.hero-title,.footer-secret,.teacher-card,.team-card,.photo-frame').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });
}

/* =============================================
   2. HAMBURGER MENU  (mobile)
   ============================================= */
const hamburger = document.getElementById('navHamburger');
const navbar    = document.querySelector('.navbar');
if (hamburger && navbar) {
  hamburger.addEventListener('click', () => navbar.classList.toggle('open'));
  // Close when a nav link is tapped
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => navbar.classList.remove('open'));
  });
}

/* =============================================
   3. SMART IMAGE LOADING
   Show photo if the file exists; keep placeholder if not.
   ============================================= */
function smartImg(imgEl, fallbackEl) {
  if (!imgEl) return;
  imgEl.onload  = () => { imgEl.style.display = 'block'; if (fallbackEl) fallbackEl.style.display = 'none'; };
  imgEl.onerror = () => { imgEl.style.display = 'none';  if (fallbackEl) fallbackEl.style.display = 'flex'; };
  // Trigger check (in case already cached)
  if (imgEl.complete && imgEl.naturalWidth) { imgEl.onload(); }
  else if (imgEl.complete)                   { imgEl.onerror(); }
}

// Group photo
smartImg(document.getElementById('groupImg'), document.getElementById('groupPlaceholder'));

// Teacher & team photos — loop over all wrap divs
document.querySelectorAll('[data-photo-img]').forEach(wrap => {
  const img      = wrap.querySelector('img');
  const fallback = wrap.querySelector('.emoji-fallback');
  smartImg(img, fallback);
});

/* =============================================
   4. FLOATING PARTICLES  (ambient golden dust)
   ============================================= */
const pCanvas = document.getElementById('particleCanvas');
if (pCanvas) {
  const pCtx = pCanvas.getContext('2d');
  const resize = () => { pCanvas.width = innerWidth; pCanvas.height = innerHeight; };
  resize(); window.addEventListener('resize', resize);
  class Dust {
    constructor(scatter) { this.reset(scatter); }
    reset(scatter) {
      this.x  = Math.random() * pCanvas.width;
      this.y  = scatter ? Math.random() * pCanvas.height : pCanvas.height + 5;
      this.r  = Math.random() * 1.6 + 0.4;
      this.vy = -(Math.random() * 0.45 + 0.12);
      this.vx = (Math.random() - 0.5) * 0.25;
      this.a  = Math.random() * 0.35 + 0.05;
      this.life = 0; this.max = Math.random() * 320 + 160;
    }
    tick() { this.x += this.vx; this.y += this.vy; this.life++; if (this.life > this.max || this.y < -5) this.reset(false); }
    draw() { pCtx.save(); pCtx.globalAlpha = this.a * (1 - this.life / this.max); pCtx.fillStyle = '#D4AF65'; pCtx.beginPath(); pCtx.arc(this.x, this.y, this.r, 0, Math.PI*2); pCtx.fill(); pCtx.restore(); }
  }
  const dusts = Array.from({length:65}, () => new Dust(true));
  (function animDust() { pCtx.clearRect(0,0,pCanvas.width,pCanvas.height); dusts.forEach(d=>{d.tick();d.draw();}); requestAnimationFrame(animDust); })();
}

/* =============================================
   5. CONFETTI ENGINE
   ============================================= */
const cCanvas = document.getElementById('confettiCanvas');
const cCtx    = cCanvas ? cCanvas.getContext('2d') : null;
let   confettis = [];
if (cCanvas) {
  const resize2 = () => { cCanvas.width = innerWidth; cCanvas.height = innerHeight; };
  resize2(); window.addEventListener('resize', resize2);
  const COLS = ['#D4AF65','#EDD07E','#F2E8D0','#9B7BAA','#6B8BA8','#D4896A'];
  class Piece {
    constructor(x,y) {
      this.x=x;this.y=y;this.vx=(Math.random()-.5)*10;this.vy=-(Math.random()*9+3);
      this.g=0.28;this.w=Math.random()*9+4;this.h=Math.random()*5+3;
      this.rot=Math.random()*360;this.rs=(Math.random()-.5)*12;
      this.col=COLS[Math.floor(Math.random()*COLS.length)];
      this.fade=Math.random()*.008+.004;this.alpha=1;
    }
    tick(){this.x+=this.vx;this.vy+=this.g;this.y+=this.vy;this.rot+=this.rs;this.alpha-=this.fade;}
    draw(){cCtx.save();cCtx.globalAlpha=Math.max(0,this.alpha);cCtx.translate(this.x,this.y);cCtx.rotate(this.rot*Math.PI/180);cCtx.fillStyle=this.col;cCtx.fillRect(-this.w/2,-this.h/2,this.w,this.h);cCtx.restore();}
  }
  window.__burst = function(x,y,n=90){for(let i=0;i<n;i++) confettis.push(new Piece(x,y));};
  (function animC(){cCtx.clearRect(0,0,cCanvas.width,cCanvas.height);confettis=confettis.filter(p=>p.alpha>0);confettis.forEach(p=>{p.tick();p.draw();});requestAnimationFrame(animC);})();
}

// Hero title click — confetti
const heroTitle = document.getElementById('heroTitle');
if (heroTitle) {
  heroTitle.addEventListener('click', e => {
    if (window.__burst) window.__burst(e.clientX, e.clientY);
    showToast('🎓 SEE Batch of 2082 — We made it!');
  });
}

/* =============================================
   6. SCROLL FADE
   ============================================= */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, {threshold:.12});
document.querySelectorAll('.scroll-fade').forEach(el => io.observe(el));

/* =============================================
   7. EASTER EGG — footer secret
   ============================================= */
const footerSecret = document.getElementById('footerSecret');
const easterModal  = document.getElementById('easterModal');
if (footerSecret && easterModal) footerSecret.addEventListener('click', () => easterModal.classList.add('active'));
window.closeEaster = function(){ if(easterModal) easterModal.classList.remove('active'); };
if (easterModal) easterModal.addEventListener('click', e => { if(e.target===easterModal) window.closeEaster(); });

/* =============================================
   8. KONAMI CODE  ↑↑↓↓←→←→BA
   ============================================= */
const KONAMI=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let ki=0;
document.addEventListener('keydown', e => {
  ki = (e.key===KONAMI[ki]) ? ki+1 : (e.key===KONAMI[0] ? 1 : 0);
  if (ki===KONAMI.length) {
    ki=0;
    if (window.__burst) for(let i=0;i<8;i++) setTimeout(()=>window.__burst(Math.random()*innerWidth, Math.random()*innerHeight*.6), i*180);
    showToast('🎮 CHEAT CODE UNLOCKED — Legendary Batch! 🎉');
  }
});

/* =============================================
   9. DAYS TOGETHER COUNTER
   ============================================= */
const counterEl = document.getElementById('daysCounter');
if (counterEl) {
  // ← Batch started on April 25, 2016
  const startDate = new Date('2016-04-25');
  const days = Math.max(0, Math.floor((Date.now() - startDate) / 86400000));
  let count = 0;
  const step = days / 60;
  const t = setInterval(() => {
    count = Math.min(count + step, days);
    counterEl.textContent = Math.floor(count).toLocaleString();
    if (count >= days) clearInterval(t);
  }, 16);
}

/* =============================================
   TOAST HELPER
   ============================================= */
function showToast(msg) {
  const t = document.createElement('div');
  Object.assign(t.style, {
    position:'fixed',bottom:'2.5rem',left:'50%',
    transform:'translateX(-50%) translateY(12px)',
    background:'rgba(13,27,45,.97)',
    border:'1px solid rgba(212,175,101,.38)',
    color:'#EDE3CC',fontFamily:"'Josefin Sans',sans-serif",
    fontSize:'.72rem',letterSpacing:'.1em',
    padding:'.9rem 2rem',zIndex:'9500',
    opacity:'0',transition:'all .4s ease',
    backdropFilter:'blur(12px)',whiteSpace:'nowrap',pointerEvents:'none',
  });
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(()=>{ t.style.opacity='1'; t.style.transform='translateX(-50%) translateY(0)'; });
  setTimeout(()=>{ t.style.opacity='0'; t.style.transform='translateX(-50%) translateY(12px)'; setTimeout(()=>t.remove(),400); },3200);
}
