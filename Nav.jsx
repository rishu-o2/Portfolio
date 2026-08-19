import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Nav() {
  const navRef     = useRef(null)
  const overlayRef = useRef(null)
  const linksRef   = useRef([])
  const [open, setOpen] = useState(false)

  // ── Hide/show nav on scroll ─────────────────────────────────────────
  useEffect(() => {
    let last = 0
    const onScroll = () => {
      const y = window.scrollY
      if (navRef.current) {
        navRef.current.style.opacity   = y > last && y > 80 ? '0' : '1'
        navRef.current.style.transform = y > last && y > 80 ? 'translateY(-100%)' : 'translateY(0)'
      }
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Animate overlay open/close ──────────────────────────────────────
  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    if (open) {
      document.body.style.overflow = 'hidden'
      gsap.set(overlay, { display: 'flex' })
      gsap.fromTo(overlay,
        { xPercent: 100 },
        { xPercent: 0, duration: 0.55, ease: 'power4.inOut' }
      )
      gsap.fromTo(linksRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.08, delay: 0.25 }
      )
    } else {
      document.body.style.overflow = ''
      gsap.to(overlay, {
        xPercent: 100, duration: 0.45, ease: 'power4.inOut',
        onComplete: () => gsap.set(overlay, { display: 'none' })
      })
    }
  }, [open])

  const closeAndScroll = (href) => {
    setOpen(false)
    setTimeout(() => {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 500)
  }

  const NAV_LINKS = [
    { href: '#about',      label: 'About'     },
    { href: '#projects',   label: 'Projects'  },
    { href: '#skills',     label: 'Skills'    },
    { href: '#experience', label: 'Experience'},
    { href: '#contact',    label: 'Contact'   },
  ]

  return (
    <>
      <header ref={navRef} style={styles.nav}>
        <a href="#top" style={styles.logo}>rishu<span style={{ color: '#f2a65a' }}>.</span>dev</a>

        {/* Desktop links */}
        <nav style={styles.links}>
          {NAV_LINKS.slice(0, 4).map(({ href, label }) => (
            <a key={href} href={href} style={styles.link}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'rgba(232,234,240,0.55)'}
            >{label}</a>
          ))}
        </nav>

        <div style={styles.right}>
          {/* Desktop socials */}
          <div style={{ ...styles.socials, ...styles.desktopOnly }}>
            <a href="https://github.com/rishu-o2" target="_blank" rel="noopener" style={styles.socialIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/rishu-raj-723718315/" target="_blank" rel="noopener" style={styles.socialIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.93v5.68H9.37V9h3.41v1.56h.05c.47-.89 1.63-1.84 3.35-1.84 3.58 0 4.25 2.36 4.25 5.43v6.3zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.57V9h3.55v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z"/></svg>
            </a>
          </div>

          {/* Hamburger button (mobile only) */}
          <button
            id="hamburger-btn"
            onClick={() => setOpen(true)}
            style={styles.hamburger}
            aria-label="Open menu"
          >
            <span style={styles.bar} />
            <span style={styles.bar} />
            <span style={styles.bar} />
          </button>
        </div>
      </header>

      {/* ── Mobile fullscreen overlay ──────────────────────────────────── */}
      <div ref={overlayRef} style={styles.overlay}>
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          style={styles.closeBtn}
          aria-label="Close menu"
        >×</button>

        {/* Overlay links */}
        <nav style={styles.overlayLinks}>
          {NAV_LINKS.map(({ href, label }, i) => (
            <a
              key={href}
              ref={el => (linksRef.current[i] = el)}
              href={href}
              onClick={e => { e.preventDefault(); closeAndScroll(href) }}
              style={styles.overlayLink}
              onMouseEnter={e => e.target.style.color = '#f2a65a'}
              onMouseLeave={e => e.target.style.color = '#fff'}
            >{label}</a>
          ))}
        </nav>
      </div>

      {/* ── Responsive style injection ─────────────────────────────────── */}
      <style>{`
        @media (min-width: 769px) {
          #hamburger-btn { display: none !important; }
        }
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-desktop-socials { display: none !important; }
        }
      `}</style>
    </>
  )
}

const styles = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '24px 48px',
    transition: 'opacity 0.4s ease, transform 0.4s ease',
    mixBlendMode: 'difference',
  },
  logo: {
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 700, fontSize: 16, color: '#fff',
  },
  links: { display: 'flex', gap: 40 },
  link: {
    fontSize: 14, color: 'rgba(232,234,240,0.55)',
    fontWeight: 500, transition: 'color 0.2s',
  },
  right: { display: 'flex', alignItems: 'center', gap: 20 },
  socials: { display: 'flex', gap: 18, alignItems: 'center' },
  desktopOnly: {},
  socialIcon: { color: 'rgba(255,255,255,0.5)', display: 'flex', transition: 'color 0.2s' },

  // Hamburger
  hamburger: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 8,
    zIndex: 450,
  },
  bar: {
    display: 'block',
    width: 24,
    height: 1.5,
    background: '#fff',
    borderRadius: 2,
    transition: 'transform 0.3s',
  },

  // Fullscreen overlay
  overlay: {
    display: 'none',
    position: 'fixed',
    inset: 0,
    background: '#0c0d11',
    zIndex: 400,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translateX(100%)',
  },
  closeBtn: {
    position: 'absolute',
    top: 28, right: 40,
    background: 'none',
    border: 'none',
    color: 'rgba(232,234,240,0.6)',
    fontSize: 40,
    cursor: 'pointer',
    lineHeight: 1,
    fontFamily: "'DM Serif Display', serif",
    transition: 'color 0.2s',
  },
  overlayLinks: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
  },
  overlayLink: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 'clamp(36px, 9vw, 64px)',
    color: '#fff',
    textDecoration: 'none',
    opacity: 0,
    transition: 'color 0.2s',
  },
}
