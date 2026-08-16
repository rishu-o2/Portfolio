import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Nav() {
  const navRef = useRef(null)

  useEffect(() => {
    let last = 0
    const onScroll = () => {
      const y = window.scrollY
      navRef.current.style.opacity = y > last && y > 80 ? '0' : '1'
      navRef.current.style.transform = y > last && y > 80 ? 'translateY(-100%)' : 'translateY(0)'
      last = y
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header ref={navRef} style={styles.nav}>
      <a href="#top" style={styles.logo}>rishu<span style={{color:'#f2a65a'}}>.</span>dev</a>
      <nav style={styles.links}>
        {['#projects','#experience','#contact'].map((href, i) => (
          <a key={i} href={href} style={styles.link}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(232,234,240,0.55)'}
          >{href.replace('#','')}</a>
        ))}
      </nav>
      <div style={styles.socials}>
        <a href="https://github.com/rishu-o2" target="_blank" rel="noopener" style={styles.socialIcon}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"/></svg>
        </a>
        <a href="https://www.linkedin.com/in/rishu-raj-723718315/" target="_blank" rel="noopener" style={styles.socialIcon}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.93v5.68H9.37V9h3.41v1.56h.05c.47-.89 1.63-1.84 3.35-1.84 3.58 0 4.25 2.36 4.25 5.43v6.3zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.57V9h3.55v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z"/></svg>
        </a>
        <a href="https://www.instagram.com/latewithrishu/" target="_blank" rel="noopener" style={styles.socialIcon}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12c0-3.2.01-3.58.07-4.85C2.38 3.86 3.9 2.31 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32A6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
        </a>
      </div>
    </header>
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
  socials: { display: 'flex', gap: 18, alignItems: 'center' },
  socialIcon: { color: 'rgba(255,255,255,0.5)', display: 'flex', transition: 'color 0.2s' },
}
