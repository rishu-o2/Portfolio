import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Experience.module.css'

gsap.registerPlugin(ScrollTrigger)

const EXP = [
  {
    period: '2025 — Present',
    type: 'AI / ML Projects',
    role: 'AI Engineer & Developer',
    desc: "Building intelligent systems and applications powered by LLMs, ML models, and real-world APIs. Every project is a chance to learn something the docs don't cover.",
    bullets: [
      'Built IRA — a JARVIS-style AI assistant with Python, React, and Gemini',
      'Developed a Gemini-powered code tutor with complexity analysis and quiz generation',
      'Applied PSO optimization to improve credit card fraud prediction accuracy',
    ],
  },
  {
    period: '2024 — Present',
    type: 'Open Source / GitHub',
    role: 'Open Source Builder',
    desc: 'Learning in public — sharing everything I build, maintaining repos, and contributing to the developer community one commit at a time.',
    bullets: [
      'Maintained multiple active repositories across AI, ML, and web projects',
      'Documented projects thoroughly for other learners to follow and build on',
    ],
  },
  {
    period: '2023 — 2025',
    type: 'Self-Directed Learning',
    role: 'CS Undergrad — AI & ML Specialization',
    desc: 'Deep-diving into the CS fundamentals that actually matter: algorithms, data structures, ML theory, and building software from scratch.',
    bullets: [
      'Completed coursework in AI, ML, Deep Learning, and Software Engineering',
      'Mastered Python, Java, C++, and the full ML stack',
      'Built a portfolio of production-ready projects from zero',
    ],
  },
]

function ExpItem({ item }) {
  const ref = useRef(null)
  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%' }
      }
    )
  }, [])
  return (
    <div ref={ref} className={styles.item}>
      <div className={styles.period}>{item.period}</div>
      <div className={styles.body}>
        <p className={styles.type}>{item.type}</p>
        <h3 className={styles.role}>{item.role}</h3>
        <p className={styles.desc}>{item.desc}</p>
        <ul className={styles.bullets}>
          {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default function Experience() {
  const headerRef = useRef(null)
  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 88%' }
      }
    )
  }, [])

  return (
    <section className={styles.section} id="experience">
      <div className="container">
        <div ref={headerRef} className={styles.header}>
          <p className="eyebrow">Experience</p>
          <h2 className={styles.title}>Where I've Been</h2>
          <p className={styles.sub}>My learning journey through projects, code, and constant curiosity.</p>
        </div>
        {EXP.map((e, i) => <ExpItem key={i} item={e} />)}
      </div>
    </section>
  )
}
