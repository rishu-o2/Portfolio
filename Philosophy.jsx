import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Philosophy.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Philosophy() {
  const bgRef      = useRef(null)
  const eyebrowRef = useRef(null)
  const headRef    = useRef(null)
  const bodyRef    = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax bg
      gsap.to(bgRef.current, {
        yPercent: 25, ease: 'none',
        scrollTrigger: { trigger: bgRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      })
      // Fade ups
      ;[eyebrowRef, headRef, bodyRef].forEach((r, i) => {
        gsap.fromTo(r.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.12,
            scrollTrigger: { trigger: r.current, start: 'top 88%' }
          }
        )
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section}>
      <div ref={bgRef} className={styles.bg} />
      <div className={styles.content}>
        <p ref={eyebrowRef} className={styles.eyebrow}>The Mindset</p>
        <h2 ref={headRef} className={styles.heading}>
          I believe the best software lives at the intersection of{' '}
          <em>engineering precision</em> and <em>creative intuition.</em>
        </h2>
        <p ref={bodyRef} className={styles.body}>
          Every model I train, every interface I ship, every line of code I write
          is an opportunity to build something that actually works — and feels
          inevitable when you use it.
        </p>
      </div>
    </section>
  )
}
