/* ==========================================================
   💖 BHONDIIII (DISHA) APOLOGY SCRIPT 💖
   ========================================================== */

/* ----------------------------------------------------------
   1. RUNAWAY "NO" BUTTON QUOTES
   (Jab cursor ya ungli NO button par aati hai toh ye texts aate hain)
   ---------------------------------------------------------- */
const noBtnQuotes = [
  "Bhondiiii aise gussa nahi karte na! 🥺",
  "Disha please maan jao na! 🙏",
  "Pakad ke dikhao Bhondi! 🏃💨",
  "Error 404: 'NO' not allowed for Disha! 🚫",
  "Aise gussa karogi toh rona aa jayega 🥺",
  "1000 Momos dunga if you click YES 🥟",
  "Button locked! Only YES is working 😜",
  "Disha suno to sahi... 🥺👉👈",
  "Ek sweet si smile de do bas! 🌸",
  "My heart will stop! Click YES ❤️",
  "Bhondiiii please forgive me na! 🫂",
  "Dekho YES button kitna cute lag raha hai 👉"
];
let dodgeCount = 0;

/* ----------------------------------------------------------
   2. SECRET LOVE REASONS FOR DISHA
   (Pop heart game me har tap par aane wale reasons)
   ---------------------------------------------------------- */
const dishaSecrets = [
  "🌸 'The way your eyes twinkle and you make that super cute face when you are excited.'",
  "🥺 'Even when you are in angry Godzilla mode, you look like the cutest angry baby in the universe.'",
  "🫂 'How warm and peaceful my world becomes the moment I hear your voice.'",
  "🥟 'Watching you eat your favorite food with that happy foodie dance is my favorite sight.'",
  "✨ 'You are not just my girlfriend, Disha, you are my safest place and my best friend.'",
  "❤️ 'Nobody in this universe can ever replace my Bhondiiii. Forever yours!'"
];
let secretIndex = 0;

/* ----------------------------------------------------------
   3. WEB AUDIO API (Offline Sound Effects)
   ---------------------------------------------------------- */
let audioCtx = null;
let isPlayingTune = false;
let tuneInterval = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playDodgeSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(780, now + 0.12);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  } catch (e) {}
}

function playChimeSound(freq = 440) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.28);
  } catch (e) {}
}

function playCelebrationFanfare() {
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    notes.forEach((note, i) => {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const now = ctx.currentTime;
        osc.frequency.setValueAtTime(note, now);
        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.65);
      }, i * 110);
    });
  } catch (e) {}
}

const bgAudio = document.getElementById('bgAudio');

function updateMusicButtonState() {
  const musicIcon = document.getElementById('musicIcon');
  const musicText = document.getElementById('musicText');
  if (bgAudio && !bgAudio.paused) {
    if (musicIcon) musicIcon.textContent = '⏸️';
    if (musicText) musicText.textContent = 'Pause Song';
  } else {
    if (musicIcon) musicIcon.textContent = '🎵';
    if (musicText) musicText.textContent = 'Play Song';
  }
}

function playAudioSafe() {
  if (!bgAudio) return;
  bgAudio.volume = 0.9;
  const p = bgAudio.play();
  if (p !== undefined) {
    p.then(() => {
      updateMusicButtonState();
    }).catch(err => {
      console.log('Autoplay waiting for gesture:', err);
    });
  }
}

function toggleRomanticTune() {
  if (!bgAudio) return;
  if (bgAudio.paused) {
    playAudioSafe();
  } else {
    bgAudio.pause();
    updateMusicButtonState();
  }
}

// Welcome Overlay interaction: Guaranteed to unlock music on every phone & laptop
const welcomeOverlay = document.getElementById('welcomeOverlay');
function closeWelcomeAndPlay() {
  if (welcomeOverlay && !welcomeOverlay.classList.contains('hidden')) {
    welcomeOverlay.classList.add('hidden');
    createExplosion(window.innerWidth / 2, window.innerHeight / 2, 60);
  }
  playAudioSafe();
}

if (welcomeOverlay) {
  welcomeOverlay.addEventListener('click', closeWelcomeAndPlay);
  welcomeOverlay.addEventListener('touchstart', closeWelcomeAndPlay, { passive: true });
}

// Global capture listener: ANY click or touch anywhere on screen plays song if paused
['click', 'pointerdown', 'touchstart', 'mousedown'].forEach(evt => {
  window.addEventListener(evt, () => {
    if (bgAudio && bgAudio.paused) {
      playAudioSafe();
    }
  }, { capture: true, once: false });
});

// Try autoplay immediately on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', playAudioSafe);
} else {
  playAudioSafe();
}

document.getElementById('musicToggle').addEventListener('click', (e) => {
  e.stopPropagation();
  toggleRomanticTune();
});

/* ----------------------------------------------------------
   4. PARTICLES CANVAS (Floating Hearts Background)
   ---------------------------------------------------------- */
const canvas = document.getElementById('particles-canvas');
const c = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor(x, y, isExplosion = false) {
    this.x = x || Math.random() * canvas.width;
    this.y = y || canvas.height + Math.random() * 40;
    this.size = isExplosion ? Math.random() * 16 + 8 : Math.random() * 11 + 6;
    this.speedY = isExplosion ? (Math.random() - 0.5) * 14 : -(Math.random() * 1.4 + 0.6);
    this.speedX = isExplosion ? (Math.random() - 0.5) * 14 : (Math.random() - 0.5) * 1.2;
    this.alpha = 1;
    this.decay = isExplosion ? Math.random() * 0.02 + 0.012 : 0.004;
    this.isExplosion = isExplosion;
    const colors = ['#ff3b68', '#ff758f', '#ffd166', '#ffccd5', '#ff4d6d', '#a2d2ff'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.shape = Math.random() > 0.35 ? 'heart' : 'circle';
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.06;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotSpeed;
    if (this.isExplosion) {
      this.speedY += 0.25;
      this.speedX *= 0.98;
      this.alpha -= this.decay;
    } else {
      if (this.y < -30) {
        this.y = canvas.height + 20;
        this.x = Math.random() * canvas.width;
      }
    }
  }

  draw() {
    c.save();
    c.translate(this.x, this.y);
    c.rotate(this.rotation);
    c.globalAlpha = Math.max(0, this.alpha);
    c.fillStyle = this.color;

    if (this.shape === 'heart') {
      const s = this.size;
      c.beginPath();
      c.moveTo(0, s / 4);
      c.bezierCurveTo(-s / 2, -s / 2, -s, s / 3, 0, s);
      c.bezierCurveTo(s, s / 3, s / 2, -s / 2, 0, s / 4);
      c.fill();
    } else {
      c.beginPath();
      c.arc(0, 0, this.size / 2, 0, Math.PI * 2);
      c.fill();
    }
    c.restore();
  }
}

for (let i = 0; i < 26; i++) {
  particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
}

function createExplosion(x, y, count = 70) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, true));
  }
}

function animateParticles() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw();
    if (p.isExplosion && p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('pointerdown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
  for (let i = 0; i < 6; i++) {
    particles.push(new Particle(e.clientX, e.clientY, true));
  }
});

/* ----------------------------------------------------------
   5. GUSSA SLIDER & CHARACTER STATE
   ---------------------------------------------------------- */
const angerSlider = document.getElementById('angerSlider');
const meterStatusText = document.getElementById('meterStatusText');
const sadEyes = document.getElementById('sadEyes');
const happyEyes = document.getElementById('happyEyes');
const bearTears = document.getElementById('bearTears');
const bearMouth = document.getElementById('bearMouth');
const sorrySign = document.getElementById('sorrySign');
const celebrateHeart = document.getElementById('celebrateHeart');
const blushLeft = document.getElementById('blushLeft');
const blushRight = document.getElementById('blushRight');

function updateCharacterMood(val) {
  if (val >= 75) {
    meterStatusText.textContent = `${val}% (Godzilla Gussa Mode! 🦖🔥)`;
    meterStatusText.style.color = '#d90429';
    sadEyes.style.display = 'block';
    happyEyes.style.display = 'none';
    bearTears.style.display = 'block';
    bearMouth.setAttribute('d', 'M 92 120 Q 100 112 108 120');
    sorrySign.style.display = 'block';
    celebrateHeart.style.display = 'none';
    blushLeft.setAttribute('opacity', '0.35');
    blushRight.setAttribute('opacity', '0.35');
  } else if (val >= 40) {
    meterStatusText.textContent = `${val}% (Bhondi soch rahi hai... 🤔💭)`;
    meterStatusText.style.color = '#ff7b00';
    sadEyes.style.display = 'block';
    happyEyes.style.display = 'none';
    bearTears.style.display = 'none';
    bearMouth.setAttribute('d', 'M 94 117 L 106 117');
    sorrySign.style.display = 'block';
    celebrateHeart.style.display = 'none';
    blushLeft.setAttribute('opacity', '0.55');
    blushRight.setAttribute('opacity', '0.55');
  } else if (val > 0) {
    meterStatusText.textContent = `${val}% (Smile chhupa rahi hai 😏🌸)`;
    meterStatusText.style.color = '#ff3b68';
    sadEyes.style.display = 'none';
    happyEyes.style.display = 'block';
    bearTears.style.display = 'none';
    bearMouth.setAttribute('d', 'M 92 115 Q 100 124 108 115');
    sorrySign.style.display = 'block';
    celebrateHeart.style.display = 'none';
    blushLeft.setAttribute('opacity', '0.85');
    blushRight.setAttribute('opacity', '0.85');
  } else {
    meterStatusText.textContent = `0% (All Gussa Melted! 100% Love 🥰❤️)`;
    meterStatusText.style.color = '#2d6a4f';
    triggerForgiveness();
  }
}

angerSlider.addEventListener('input', (e) => {
  const val = parseInt(e.target.value);
  updateCharacterMood(val);
  playChimeSound(320 + (100 - val) * 4);
});

/* ----------------------------------------------------------
   6. RUNAWAY "NO" BUTTON (Touch & Pointer support)
   ---------------------------------------------------------- */
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const buttonsArea = document.getElementById('buttonsArea');

function runawayNoBtn(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  playDodgeSound();
  dodgeCount++;

  const quote = noBtnQuotes[dodgeCount % noBtnQuotes.length];
  noBtn.textContent = quote;

  const currentScale = 1 + Math.min(dodgeCount * 0.08, 0.45);
  yesBtn.style.transform = `scale(${currentScale})`;

  const maxX = 120;
  const maxY = 50;
  const randomX = (Math.random() * 2 - 1) * maxX;
  const randomY = (Math.random() * 2 - 1) * maxY;

  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

  const btnRect = noBtn.getBoundingClientRect();
  createExplosion(btnRect.left + btnRect.width / 2, btnRect.top + btnRect.height / 2, 8);
}

noBtn.addEventListener('mouseenter', runawayNoBtn);
noBtn.addEventListener('touchstart', runawayNoBtn, { passive: false });
noBtn.addEventListener('click', runawayNoBtn);

/* ----------------------------------------------------------
   7. FORGIVENESS CELEBRATION
   ---------------------------------------------------------- */
function triggerForgiveness() {
  playCelebrationFanfare();
  createExplosion(window.innerWidth / 2, window.innerHeight / 2.5, 120);

  sadEyes.style.display = 'none';
  happyEyes.style.display = 'block';
  bearTears.style.display = 'none';
  bearMouth.setAttribute('d', 'M 90 114 Q 100 126 110 114');
  sorrySign.style.display = 'none';
  celebrateHeart.style.display = 'block';
  blushLeft.setAttribute('opacity', '0.95');
  blushRight.setAttribute('opacity', '0.95');
  angerSlider.value = 0;
  meterStatusText.textContent = `0% (Bhondiiii Maan Gayi! 🥰❤️)`;
  meterStatusText.style.color = '#2d6a4f';

  document.getElementById('askState').style.display = 'none';
  document.getElementById('celebrationState').style.display = 'block';
}

yesBtn.addEventListener('click', triggerForgiveness);

document.getElementById('resetBtn').addEventListener('click', () => {
  document.getElementById('askState').style.display = 'block';
  document.getElementById('celebrationState').style.display = 'none';
  angerSlider.value = 100;
  updateCharacterMood(100);
  dodgeCount = 0;
  noBtn.style.transform = 'translate(0, 0)';
  noBtn.textContent = 'NO 😤';
  yesBtn.style.transform = 'scale(1)';
});

/* ----------------------------------------------------------
   8. TABS SWITCHING
   ---------------------------------------------------------- */
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const target = btn.getAttribute('data-tab');
    document.getElementById(`tab-${target}`).classList.add('active');
  });
});

/* ----------------------------------------------------------
   9. GAME 1: FEED BHONDIIII HER SNACKS
   ---------------------------------------------------------- */
let stomachLevel = 25;
window.feedFood = function(name, emoji, text) {
  stomachLevel = Math.min(100, stomachLevel + 25);
  const stomachFill = document.getElementById('stomachFill');
  const stomachPercentText = document.getElementById('stomachPercentText');
  const feedReaction = document.getElementById('feedReaction');

  stomachFill.style.width = `${stomachLevel}%`;
  feedReaction.textContent = text;
  playChimeSound(450 + stomachLevel * 4);

  const bearStage = document.getElementById('bearStage');
  bearStage.style.transform = 'scale(1.12) rotate(4deg)';
  setTimeout(() => {
    bearStage.style.transform = 'scale(1) rotate(0deg)';
  }, 300);

  createExplosion(window.innerWidth / 2, window.innerHeight / 2, 20);

  if (stomachLevel >= 100) {
    stomachPercentText.textContent = `100% (Pet full = Dil khush! 100% Smile 🥰)`;
    feedReaction.textContent = `🎉 Disha ka mood 100% theek ho gaya! All snacks delivered with love! ❤️`;
    showToast('Bhondiiii ka pet full ho gaya! Yay! 😋');
  } else if (stomachLevel >= 75) {
    stomachPercentText.textContent = `${stomachLevel}% (Almost full! Thoda sa aur khilao)`;
  } else if (stomachLevel >= 50) {
    stomachPercentText.textContent = `${stomachLevel}% (Maza aa raha hai! Keep feeding)`;
  }
};

/* ----------------------------------------------------------
   10. GAME 2: POPPING FLOATING HEARTS (Secrets)
   ---------------------------------------------------------- */
const popArea = document.getElementById('popArea');
const popHeart = document.getElementById('popHeart');
const secretText = document.getElementById('secretText');

function relocatePopHeart() {
  const areaRect = popArea.getBoundingClientRect();
  const maxX = areaRect.width - 60;
  const maxY = areaRect.height - 60;
  const randX = Math.max(15, Math.random() * maxX);
  const randY = Math.max(15, Math.random() * maxY);

  popHeart.style.left = `${randX}px`;
  popHeart.style.top = `${randY}px`;
}
relocatePopHeart();

popHeart.addEventListener('click', (e) => {
  e.stopPropagation();
  playChimeSound(620);
  const rect = popHeart.getBoundingClientRect();
  createExplosion(rect.left + 20, rect.top + 20, 25);

  secretIndex = (secretIndex + 1) % dishaSecrets.length;
  secretText.style.opacity = '0';
  setTimeout(() => {
    secretText.textContent = dishaSecrets[secretIndex];
    secretText.style.opacity = '1';
  }, 150);

  relocatePopHeart();
});

popArea.addEventListener('click', () => {
  relocatePopHeart();
});

/* ----------------------------------------------------------
   11. REDEEMABLE COUPONS
   ---------------------------------------------------------- */
function showToast(msg) {
  const toast = document.getElementById('toastMsg');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

window.redeemCoupon = function(cardEl, couponName) {
  if (cardEl.classList.contains('redeemed')) return;
  cardEl.classList.add('redeemed');
  const btn = cardEl.querySelector('.coupon-btn');
  btn.textContent = 'REDEEMED! ✅';

  playChimeSound(700);
  const rect = cardEl.getBoundingClientRect();
  createExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2, 30);

  showToast(`🎉 "${couponName}" Redeemed! Screenshot leke bhejo abhi! 📸`);
};

/* ----------------------------------------------------------
   12. BEAR TAP INTERACTION
   ---------------------------------------------------------- */
document.getElementById('bearStage').addEventListener('click', () => {
  playDodgeSound();
  const rect = document.getElementById('bearStage').getBoundingClientRect();
  createExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
});

/* ----------------------------------------------------------
   13. SPECIAL FLYING KISSES FUNCTION 💋
   ---------------------------------------------------------- */
window.sendFlyingKisses = function() {
  playCelebrationFanfare();
  showToast('MWAHHHHH! Bheerrrryyy big kiss to my Bhondiiii! 💋😘');

  // Spawn flying kisses & heart bursts
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  createExplosion(centerX, centerY, 80);

  // Floating Kiss Emojis dynamically
  const kissEmojis = ['💋', '😘', '💖', '💕', '🥰', '💋'];
  for (let i = 0; i < 15; i++) {
    const el = document.createElement('div');
    el.textContent = kissEmojis[Math.floor(Math.random() * kissEmojis.length)];
    el.style.position = 'fixed';
    el.style.left = `${Math.random() * 80 + 10}vw`;
    el.style.bottom = '10vh';
    el.style.fontSize = `${Math.random() * 24 + 28}px`;
    el.style.zIndex = '9999';
    el.style.pointerEvents = 'none';
    el.style.transition = 'all 2s cubic-bezier(0.25, 1, 0.5, 1)';
    el.style.opacity = '1';
    el.style.transform = `translateY(0) scale(${Math.random() * 0.5 + 0.8})`;
    document.body.appendChild(el);

    setTimeout(() => {
      el.style.transform = `translateY(-${Math.random() * 350 + 250}px) translateX(${(Math.random() - 0.5) * 120}px) scale(1.4)`;
      el.style.opacity = '0';
    }, 50);

    setTimeout(() => {
      el.remove();
    }, 2100);
  }
};

