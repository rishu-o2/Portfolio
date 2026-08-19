import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SKILLS = [
  { name: 'Python',           pct: 85 },
  { name: 'Machine Learning', pct: 80 },
  { name: 'JavaScript',       pct: 75 },
  { name: 'React',            pct: 70 },
  { name: 'FastAPI',          pct: 65 },
  { name: 'C++ / Java',       pct: 70 },
  { name: 'Deep Learning',    pct: 60 },
  { name: 'Git & Linux',      pct: 80 },
]

function SkillBar({ skill, index }) {
  const barRef  = useRef(null)
  const wrapRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(wrapRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        delay: index * 0.07,
        scrollTrigger: { trigger: wrapRef.current, start: 'top 92%' }
      }
    )
    gsap.fromTo(barRef.current,
      { width: '0%' },
      { width: skill.pct + '%', duration: 1.2, ease: 'power3.out',
        delay: index * 0.07 + 0.15,
        scrollTrigger: { trigger: barRef.current, start: 'top 92%' }
      }
    )
  }, [skill.pct, index])

  return (
    <div ref={wrapRef} style={s.skillWrap}>
      <div style={s.labelRow}>
        <span style={s.skillName}>{skill.name}</span>
        <span style={s.skillPct}>{skill.pct}%</span>
      </div>
      <div style={s.track}>
        <div ref={barRef} style={s.fill} />
      </div>
    </div>
  )
}

export default function SkillsSection() {
  const headerRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 88%' }
      }
    )
  }, [])

  return (
    <section id="skills" style={s.section}>
      <div style={s.container}>
        <div ref={headerRef} style={s.header}>
          <p style={s.eyebrow}>// skills</p>
          <h2 style={s.title}>Tech Stack</h2>
        </div>
        <div style={s.grid}>
          {SKILLS.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

const s = {
  section: {
    padding: '140px 0',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 48px',
  },
  header: { marginBottom: 64, opacity: 0 },
  eyebrow: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#f2a65a',
    marginBottom: 16,
  },
  title: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 'clamp(40px, 5.5vw, 68px)',
    color: '#fff',
    lineHeight: 1.05,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '28px 60px',
  },
  skillWrap: { opacity: 0 },
  labelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  skillName: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 13,
    color: 'rgba(232,234,240,0.75)',
    fontWeight: 600,
  },
  skillPct: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    color: '#f2a65a',
  },
  track: {
    height: 4,
    background: 'rgba(255,255,255,0.06)',
    borderRadius: 99,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    width: '0%',
    borderRadius: 99,
    background: 'linear-gradient(90deg, #f2a65a, #7c9eff)',
  },
}
