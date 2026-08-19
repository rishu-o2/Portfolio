import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { label: 'Projects',       value: 3,  suffix: '+' },
  { label: 'Years Learning', value: 2,  suffix: '+' },
  { label: 'Technologies',   value: 5,  suffix: '+' },
]

const GOAL = 'Build AI that matters'

export default function AboutSection() {
  const sectionRef  = useRef(null)
  const photoRef    = useRef(null)
  const textRef     = useRef(null)
  const statRefs    = useRef([])
  const repoTagsRef = useRef(null)

  const [repos, setRepos]   = useState([])
  const [pubCount, setPubCount] = useState(null)

  // ── GitHub API ─────────────────────────────────────────────────────────
  useEffect(() => {
    fetch('https://api.github.com/users/rishu-o2')
      .then(r => r.json())
      .then(d => { if (d.public_repos) setPubCount(d.public_repos) })
      .catch(() => {})

    fetch('https://api.github.com/users/rishu-o2/repos?sort=updated&per_page=3')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setRepos(d.map(r => r.name)) })
      .catch(() => {})
  }, [])

  // ── GSAP animations ────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(photoRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: photoRef.current, start: 'top 85%' }
        }
      )
      gsap.fromTo(textRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: textRef.current, start: 'top 85%' }
        }
      )

      statRefs.current.forEach((el, i) => {
        if (!el) return
        const target = STATS[i]?.value ?? 0
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate() {
            const numEl = el.querySelector('[data-num]')
            if (numEl) numEl.textContent = Math.round(obj.val)
          }
        })
        gsap.fromTo(el,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: i * 0.12,
            scrollTrigger: { trigger: el, start: 'top 90%' }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" style={s.section}>
      <div style={s.container}>
        {/* ── Left: photo placeholder ─────────────────────────────────── */}
        <div ref={photoRef} style={s.photoSide}>
          <div style={s.photoCircle}>
            <span style={s.photoLabel}>[ photo ]</span>
          </div>

          {/* GitHub repo tags */}
          {repos.length > 0 && (
            <div ref={repoTagsRef} style={s.repoWrap}>
              <p style={s.repoTitle}>Recently updated</p>
              <div style={s.repoTags}>
                {repos.map(name => (
                  <a
                    key={name}
                    href={`https://github.com/rishu-o2/${name}`}
                    target="_blank" rel="noopener"
                    style={s.repoTag}
                  >{name}</a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Right: bio + stats ──────────────────────────────────────── */}
        <div ref={textRef} style={s.textSide}>
          <p style={s.eyebrow}>Who I Am</p>
          <h2 style={s.heading}>About Me</h2>

          <p style={s.para}>
            I'm Rishu Raj, a Computer Science undergrad with a deep focus on Artificial
            Intelligence and Machine Learning. I'm drawn to problems that sit at the edge
            of what's technically possible — and I build systems that push that edge a
            little further.
          </p>
          <p style={s.para}>
            My flagship project, IRA (Intelligent Responsive Assistant), is a J.A.R.V.I.S-inspired
            AI that talks, opens apps, runs system commands, and is evolving toward persistent
            memory and screen understanding. Building IRA taught me that the most interesting
            engineering happens when you refuse to accept "good enough."
          </p>
          <p style={s.para}>
            Beyond code, I care about the craft — clean APIs, thoughtful UX, and software
            that actually serves people. I believe great engineering is invisible: the user
            just feels the magic.
          </p>

          {/* Stats grid */}
          <div style={s.statsGrid}>
            {STATS.map((stat, i) => (
              <div key={stat.label} ref={el => (statRefs.current[i] = el)} style={s.statBox}>
                <div style={s.statNum}>
                  <span data-num>{0}</span>
                  <span>{stat.suffix}</span>
                </div>
                <div style={s.statLabel}>{stat.label}</div>
              </div>
            ))}

            {/* GitHub public repos live stat */}
            <div style={s.statBox}>
              <div style={s.statNum}>
                {pubCount !== null ? pubCount : '—'}
              </div>
              <div style={s.statLabel}>Public Repos</div>
            </div>

            {/* Goal card — full width */}
            <div style={{ ...s.statBox, ...s.goalBox }}>
              <div style={s.goalNum}>1</div>
              <div style={s.goalLabel}>Goal: {GOAL}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Inline styles ──────────────────────────────────────────────────────────
const s = {
  section: {
    padding: '140px 0',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 48px',
    display: 'grid',
    gridTemplateColumns: '1fr 1.4fr',
    gap: 80,
    alignItems: 'start',
  },
  photoSide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 32,
    opacity: 0,
  },
  photoCircle: {
    width: 300,
    height: 300,
    borderRadius: '50%',
    border: '2px solid rgba(242,165,90,0.3)',
    background: 'rgba(242,165,90,0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 14,
    color: '#f2a65a',
    opacity: 0.6,
  },
  repoWrap: { width: '100%', textAlign: 'center' },
  repoTitle: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'rgba(232,234,240,0.3)',
    marginBottom: 10,
  },
  repoTags: { display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  repoTag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    color: '#f2a65a',
    border: '1px solid rgba(242,165,90,0.25)',
    borderRadius: 20,
    padding: '4px 12px',
    textDecoration: 'none',
    transition: 'border-color 0.2s',
  },
  textSide: { opacity: 0 },
  eyebrow: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#f2a65a',
    marginBottom: 16,
  },
  heading: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 'clamp(36px, 5vw, 60px)',
    color: '#fff',
    lineHeight: 1.1,
    marginBottom: 32,
  },
  para: {
    fontSize: 16,
    color: 'rgba(232,234,240,0.55)',
    lineHeight: 1.85,
    fontWeight: 300,
    marginBottom: 20,
    maxWidth: 580,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 16,
    marginTop: 40,
  },
  statBox: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 12,
    padding: '20px 24px',
    opacity: 0,
  },
  statNum: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 36,
    color: '#f2a65a',
    lineHeight: 1,
    marginBottom: 6,
  },
  statLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    color: 'rgba(232,234,240,0.45)',
    letterSpacing: '0.05em',
  },
  goalBox: {
    gridColumn: '1 / -1',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  goalNum: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 36,
    color: '#f2a65a',
    lineHeight: 1,
    flexShrink: 0,
  },
  goalLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 13,
    color: 'rgba(232,234,240,0.55)',
  },
}
