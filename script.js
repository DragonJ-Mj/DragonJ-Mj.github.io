// Dragon.xyz Clono — shared JS

// ---------- Theme ----------
(function () {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(saved);
})();

function toggleTheme() {
  const html = document.documentElement;
  const next = html.classList.contains('dark') ? 'light' : 'dark';
  html.classList.remove('light', 'dark');
  html.classList.add(next);
  localStorage.setItem('theme', next);
  updateThemeIcon();
}
function updateThemeIcon() {
  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  btn.textContent = document.documentElement.classList.contains('dark') ? '☀' : '☾';
}

// ---------- Header ----------
function buildHeader(activePath) {
  const nav = [
    ['/', 'Home'], ['/about/', 'About'], ['/experience/', 'Experience'],
    ['/projects/', 'Projects'], ['/blog/', 'Blog'],
    ['/sponsors/', 'Sponsors'], ['/contact/', 'Contact'],
  ];
  const isActive = (p) => p === '/' ? activePath === '/' : activePath.startsWith(p);
  return `
    <header class="header" id="hdr">
      <nav>
        <a href="/" class="brand">
          <div class="brand-logo">⌬</div>
          <div>
            <div class="brand-text">Dragon<span class="dot">.xyz</span></div>
            <div class="brand-status"><span class="dot"></span>System_Active</div>
          </div>
        </a>
        <div class="nav-links">
          ${nav.map(([p, l]) => `<a href="${p === '/' ? '/' : p}" class="${isActive(p) ? 'active' : ''}">${l}</a>`).join('')}
        </div>
        <div class="header-actions">
          <button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle theme">☀</button>
          <button class="menu-btn" onclick="toggleMenu()" aria-label="Menu">☰</button>
        </div>
      </nav>
      <div class="mobile-menu" id="mmenu">
        <div class="mobile-menu-inner">
          ${nav.map(([p, l]) => `<a href="${p === '/' ? '/' : p}" class="${isActive(p) ? 'active' : ''}">${l} <span style="opacity:.3">⚡</span></a>`).join('')}
        </div>
      </div>
    </header>`;
}
function toggleMenu() {
  const menu = document.getElementById('mmenu');
  const hdr = document.getElementById('hdr');
  menu.classList.toggle('open');
  hdr.classList.toggle('menu-open', menu.classList.contains('open'));
}

// ---------- Footer ----------
function buildFooter() {
  return `
    <footer>
      <div class="container">
        <div class="footer-grid">
          <div>
            <a href="/" class="brand" style="margin-bottom:1rem">
              <div class="brand-logo">⌬</div>
              <div class="brand-text">Dragon<span class="dot">.xyz</span></div>
            </a>
            <p style="color:var(--muted); font-size:.9rem; max-width:340px; margin-bottom:1rem">
              I build tools, write code, and ship things that make my workflow faster. Currently architecting unified workspaces and exploring AI.
            </p>
            <div style="font-family:var(--font-mono); font-size:.75rem; color:var(--muted); margin-bottom:.5rem">📍 Pune, Maharashtra · GMT+5:30</div>
            <div style="font-family:var(--font-mono); font-size:.75rem; color:var(--muted)">🟢 Available for freelance</div>
          </div>
          <div>
            <h4>Site</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about/">About</a></li>
              <li><a href="/experience/">Experience</a></li>
              <li><a href="/projects/">Projects</a></li>
            </ul>
          </div>
          <div>
            <h4>More</h4>
            <ul>
              <li><a href="/blog/">Blog</a></li>
              <li><a href="/sponsors/">Sponsors</a></li>
              <li><a href="/contact/">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Stay in the loop</h4>
            <p style="color:var(--muted); font-size:.85rem; margin-bottom:.75rem">Occasional emails on what I'm building. No spam.</p>
            <form onsubmit="event.preventDefault(); alert('Thanks for subscribing!')" style="display:flex; gap:.5rem; margin-bottom:1rem">
              <input type="email" placeholder="you@example.com" required style="flex:1; padding:.5rem .75rem; background:var(--bg); border:1px solid var(--border); border-radius:.4rem; color:var(--text); font-size:.85rem"/>
              <button type="submit" class="btn-primary" style="padding:0 .75rem; border-radius:.4rem; border:none; color:white; background:linear-gradient(135deg,var(--accent),var(--primary))">→</button>
            </form>
            <div style="display:flex; gap:.5rem">
              <a href="https://github.com/DragonJ-Mj" class="btn" style="padding:.5rem; width:36px; height:36px; justify-content:center">⌨</a>
              <a href="https://linkedin.com/in/dragonmj" class="btn" style="padding:.5rem; width:36px; height:36px; justify-content:center">in</a>
              <a href="mailto:imdragonmj@gmail.com" class="btn" style="padding:.5rem; width:36px; height:36px; justify-content:center">✉</a>
            </div>
          </div>
        </div>

        <div class="marquee">
          <div class="marquee-track">
            ${Array(4).fill(`<span>SHIP DAILY</span><span class="star">★</span><span>BUILD WEIRD THINGS</span><span class="star">★</span><span>STAY CURIOUS</span><span class="star">★</span>`).join('')}
          </div>
        </div>

        <div class="footer-bottom">
          <p>© ${new Date().getFullYear()} Dragon.xyz — All rights reserved.</p>
          <p>Built with ♥ &amp; lots of coffee</p>
          <div style="display:flex; gap:1rem">
            <a href="#" onclick="alert('Privacy policy')">Privacy</a>
            <a href="#" onclick="alert('Terms of service')">Terms</a>
          </div>
        </div>
      </div>
    </footer>`;
}

// ---------- Mount ----------
function mountChrome(activePath) {
  document.body.insertAdjacentHTML('afterbegin', buildHeader(activePath));
  document.body.insertAdjacentHTML('beforeend', buildFooter());
  updateThemeIcon();
  window.addEventListener('scroll', () => {
    document.getElementById('hdr')?.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ---------- Notify (mailto + wa.me) ----------
const OWNER_EMAIL = 'imdragonmj@gmail.com';
const OWNER_PHONE = '919826630100';
function notifyOwner(subject, fields) {
  const lines = Object.entries(fields).map(([k, v]) => `${k}: ${Array.isArray(v) ? '\n  • ' + v.join('\n  • ') : v}`).join('\n');
  const body = `${lines}\n\n— sent from dragon.xyz`;
  const mail = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const wa = `https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(`*${subject}*\n\n${lines}`)}`;
  window.open(wa, '_blank');
  setTimeout(() => { window.location.href = mail; }, 400);
}
