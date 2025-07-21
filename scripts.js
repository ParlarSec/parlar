document.addEventListener('DOMContentLoaded', () => {
  // Navigation
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Neon cursor trail (slower fade)
  const trailColors = ['#00fff7', '#00ffae', '#00e1ff', '#00ffea'];
  let mouseTrail = [];
  document.body.addEventListener('mousemove', e => {
    const dot = document.createElement('div');
    dot.className = 'neon-trail-dot';
    dot.style.left = `${e.clientX - 6}px`;
    dot.style.top = `${e.clientY - 6}px`;
    dot.style.background = trailColors[Math.floor(Math.random() * trailColors.length)];
    document.body.appendChild(dot);
    mouseTrail.push(dot);
    setTimeout(() => {
      dot.style.opacity = '0';
      setTimeout(() => dot.remove(), 800); // slower fade out
    }, 280); // slower delay before fade
    if (mouseTrail.length > 40) {
      const old = mouseTrail.shift();
      if (old) old.remove();
    }
  });

  // Animated hero headline "hacker" effect (slower)
  const heroH1 = document.querySelector('.hero h1');
  if (heroH1) {
    const original = heroH1.textContent;
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let interval = null;
    heroH1.addEventListener('mouseenter', () => {
      let iteration = 0;
      clearInterval(interval);
      interval = setInterval(() => {
        heroH1.textContent = original.split("")
          .map((char, i) => {
            if (char === " " || char === ".") return char;
            if (i < iteration) return original[i];
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("");
        if (iteration >= original.length) clearInterval(interval);
        iteration += 1/3; // slower progress
      }, 60); // slower interval
    });
    heroH1.addEventListener('mouseleave', () => {
      clearInterval(interval);
      heroH1.textContent = original;
    });
  }

  // Blog card hover "scan" effect (slower)
  document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      let scan = document.createElement('div');
      scan.className = 'scan-line';
      card.appendChild(scan);
      setTimeout(() => scan.remove(), 1200); // slower scan
    });
  });

  // Footer social icons neon pulse (unchanged)
  document.querySelectorAll('.footer-social a img').forEach(img => {
    img.addEventListener('mouseenter', () => {
      img.style.filter = 'drop-shadow(0 0 8px #00fff7)';
    });
    img.addEventListener('mouseleave', () => {
      img.style.filter = '';
    });
  });

  // Subtle background matrix code effect (slower)
  createMatrixEffect();

  // Make .cta-btn go to a random blog page
  const blogPages = [
    "leaf1.html",
    "leaf2.html",
    "leaf3.html",
    "leaf4.html",
    "leaf5.html"
  ];
  document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      // Only affect if href is "#blog" or similar
      if (btn.getAttribute('href') && btn.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const random = blogPages[Math.floor(Math.random() * blogPages.length)];
        window.location.href = random;
      }
    });
  });
});

// Neon cursor trail style and scan line (unchanged)
const style = document.createElement('style');
style.textContent = `
.neon-trail-dot {
  position: fixed;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0.7;
  z-index: 9999;
  filter: blur(1.5px) brightness(1.5);
  transition: opacity 0.8s;
}
.scan-line {
  position: absolute;
  left: 0; top: 0; width: 100%; height: 4px;
  background: linear-gradient(90deg, transparent, #00fff7 60%, transparent);
  animation: scan-move 1.2s cubic-bezier(.4,2,.6,.8);
  pointer-events: none;
  z-index: 2;
}
@keyframes scan-move {
  0% { top: 0; opacity: 0.7; }
  80% { top: 90%; opacity: 0.7; }
  100% { top: 100%; opacity: 0; }
}
.matrix-canvas {
  position: fixed;
  left: 0; top: 0;
  width: 100vw; height: 100vh;
  pointer-events: none;
  z-index: 0;
  opacity: 0.13;
}
`;
document.head.appendChild(style);

// Sleek "code rain" effect: vertical lines of code falling, much slower, limited to hero section
function createMatrixEffect() {
  // Remove any previous canvas
  const oldCanvas = document.querySelector('.matrix-canvas');
  if (oldCanvas) oldCanvas.remove();

  const hero = document.querySelector('.hero');
  if (!hero) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'matrix-canvas';
  canvas.style.position = 'absolute';
  canvas.style.left = '0';
  canvas.style.top = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '1';
  canvas.style.opacity = '0.18';

  hero.style.position = 'relative';
  hero.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }
  resizeCanvas();

  let fontSize = 16;
  let cols = Math.floor(canvas.width / fontSize);

  const codeLines = [
    "const user = getUser();",
    "if (threatDetected) {",
    "  alert('Intrusion!');",
    "}",
    "let hash = sha256(password);",
    "fetch('/api/secure')",
    "try { login(); } catch(e) {}",
    "firewall.block(ip);",
    "for(let i=0;i<10;i++){",
    "console.log('SECURE');",
    "encrypt(data, key);",
    "while(true){scan();}",
    "updatePatches();",
    "defend();",
    "threats.forEach(t=>mitigate(t));",
    "session.invalidate();",
    "user.authenticated = true;",
    "token = generateToken();",
    "setTimeout(scan, 1000);",
    "if(!secure) reboot();",
    "log('Access granted');"
  ];

  let drops = Array(cols).fill(0).map(() => ({
    y: Math.random() * canvas.height / fontSize,
    line: codeLines[Math.floor(Math.random() * codeLines.length)]
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(10,15,26,0.13)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `bold ${fontSize}px MajorMonoDisplay, monospace`;
    ctx.fillStyle = "#00fff7";
    ctx.shadowColor = "#00fff7";
    ctx.shadowBlur = 8;

    for (let i = 0; i < cols; i++) {
      let { y, line } = drops[i];
      let x = i * fontSize;
      ctx.fillText(line, x, y * fontSize);

      // Move the drop down (much slower)
      drops[i].y += 0.025 + Math.random() * 0.015;

      // When off screen, reset with a new code line and random y
      if (drops[i].y * fontSize > canvas.height + 40) {
        drops[i].y = -Math.random() * 10;
        drops[i].line = codeLines[Math.floor(Math.random() * codeLines.length)];
      }
    }
    ctx.shadowBlur = 0;
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', () => {
    resizeCanvas();
    fontSize = 16;
    cols = Math.floor(canvas.width / fontSize);
    drops = Array(cols).fill(0).map(() => ({
      y: Math.random() * canvas.height / fontSize,
      line: codeLines[Math.floor(Math.random() * codeLines.length)]
    }));
  });
}
