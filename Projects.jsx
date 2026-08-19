import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Projects.module.css'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    num: '01',
    name: 'IRA — Intelligent Responsive Assistant',
    tags: ['Python', 'React', 'Gemini API', 'FastAPI'],
    desc: 'A personal AI assistant inspired by J.A.R.V.I.S and FRIDAY. Talks with the user, opens apps, runs system commands, and is being built toward voice interaction, persistent memory, and screen understanding.',
    link: 'https://github.com/rishu-o2/IRA',
    linkLabel: 'View on GitHub',
  },
  {
    num: '02',
    name: 'CodeExplain — Plain-English Code Tutor',
    tags: ['Streamlit', 'Python', 'Gemini'],
    desc: 'A Streamlit app that explains source code in plain English — line-by-line breakdowns, complexity analysis, bug review, and quiz generation. Built for learners who want to actually understand code, not just run it.',
    link: 'https://github.com/rishu-o2/CodeExplain-Plain-English-Code-Tutor',
    linkLabel: 'View on GitHub',
  },
  {
    num: '03',
    name: 'PSO Credit Card Default Prediction',
    tags: ['Machine Learning', 'Python', 'Jupyter', 'Scikit-learn'],
    desc: 'An ML research project predicting credit card default using Particle Swarm Optimization to tune model hyperparameters — beating standard baseline performance on a real-world finance dataset.',
    link: 'https://github.com/rishu-o2/PSO-credit-card-ML-project',
    linkLabel: 'View on GitHub',
  },
  {
    num: '04',
    name: 'IRA-OS — AI Operating Layer',
    tags: ['Python', 'System Programming', 'AI'],
    desc: 'An operating system layer powered by AI — handling system-level tasks, file management, and automation through natural language commands.',
    link: 'https://github.com/rishu-o2/IRA-OS',
    linkLabel: 'View on GitHub',
  },
  {
    num: '05',
    name: 'OS Security Framework',
    tags: ['Security', 'Python', 'Linux'],
    desc: 'A security-focused framework for monitoring and hardening operating system vulnerabilities, built for practical cybersecurity learning.',
    link: 'https://github.com/rishu-o2/OS-Security-Framework',
    linkLabel: 'View on GitHub',
  },
]

function ProjectItem({ project }) {
  const ref     = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%' }
      }
    )

    const row = ref.current
    function onEnter() {
      gsap.to(textRef.current, {
        y: -4,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }
    function onLeave() {
      gsap.to(textRef.current, {
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
        overwrite: 'auto',
      })
    }

    row.addEventListener('mouseenter', onEnter)
    row.addEventListener('mouseleave', onLeave)
    return () => {
      row.removeEventListener('mouseenter', onEnter)
      row.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <a ref={ref} href={project.link} target="_blank" rel="noopener" className={styles.item}>
      <div className={styles.num}>{project.num}</div>
      <div ref={textRef} className={styles.body}>
        <div className={styles.meta}>
          <h3 className={styles.name}>{project.name}</h3>
          <div className={styles.tags}>
            {project.tags.map(t => <span key={t}>{t}</span>)}
          </div>
        </div>
        <p className={styles.desc}>{project.desc}</p>
        <span className={styles.link}>{project.linkLabel} →</span>
      </div>
      <div className={styles.arrow}>↗</div>
    </a>
  )
}

export default function Projects() {
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
    <section className={styles.section} id="projects">
      <div className={styles.container}>
        <div ref={headerRef} className={styles.header}>
          <p className={styles.eyebrow}>Featured Work</p>
          <h2 className={styles.title}>Selected Projects</h2>
        </div>
        <div className={styles.list}>
          {PROJECTS.map((p) => <ProjectItem key={p.num} project={p} />)}
        </div>
      </div>
    </section>
  )
}
