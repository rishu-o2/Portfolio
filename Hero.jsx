import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Hero.module.css'
import useMagnetic from './useMagnetic'
import ThreeBackground from './ThreeBackground'

gsap.registerPlugin(ScrollTrigger)

function splitToSpans(text) {
  return text.split('').map((char, i) => (
    <span key={i} className={styles.char}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))
}

export default function Hero() {
  const counterRef  = useRef(null)
  const badgeRef    = useRef(null)
  const subRef      = useRef(null)
  const line1Ref    = useRef(null)
  const line2Ref    = useRef(null)
  const line3Ref    = useRef(null)
  const descRef     = useRef(null)
  const ctaRef      = useRef(null)
  const scrollRef   = useRef(null)
  const marqueeRef  = useRef(null)
  const bigNameRef  = useRef(null)

  // Magnetic effect on CTA buttons
  const exploreRef  = useMagnetic(0.4)
  const talkRef     = useMagnetic(0.4)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter
      const obj = { val: 0 }
      gsap.to(obj, {
        val: 100, duration: 2.8, ease: 'power2.out', delay: 0.1,
        onUpdate() {
          if (counterRef.current)
            counterRef.current.textContent = Math.round(obj.val)
        }
      })

      const chars1 = line1Ref.current.querySelectorAll(`.${styles.char}`)
      const chars2 = line2Ref.current.querySelectorAll(`.${styles.char}`)
      const chars3 = line3Ref.current.querySelectorAll(`.${styles.char}`)

      gsap.set([...chars1, ...chars2, ...chars3], { y: 120, opacity: 0, rotateX: -90 })
      gsap.set([badgeRef.current, subRef.current, descRef.current, ctaRef.current, scrollRef.current], { opacity: 0, y: 20 })

      const tl = gsap.timeline({ delay: 0.5 })
      tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
        .to(subRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')
        .to(chars1, { y: 0, opacity: 1, rotateX: 0, duration: 0.9, ease: 'power4.out', stagger: 0.03 }, '-=0.2')
        .to(chars2, { y: 0, opacity: 1, rotateX: 0, duration: 0.9, ease: 'power4.out', stagger: 0.03 }, '-=0.7')
        .to(chars3, { y: 0, opacity: 1, rotateX: 0, duration: 0.9, ease: 'power4.out', stagger: 0.03 }, '-=0.7')
        .to(descRef.current,   { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
        .to(ctaRef.current,    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5')
        .to(scrollRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')

      // Big name horizontal scroll parallax
      gsap.to(bigNameRef.current, {
        xPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: bigNameRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <section className={styles.hero} id="top">
        <ThreeBackground />
        <div ref={counterRef} className={styles.counter}>0</div>

        <div className={styles.content}>
          <div ref={badgeRef} className={styles.badge}>⚡ Currently building IRA v2</div>
          <p ref={subRef} className={styles.sub}>AI/ML Engineer &amp; Software Developer</p>

          <h1 className={styles.title}>
            <span className={styles.lineWrap}>
              <span ref={line1Ref} className={styles.line}>{splitToSpans('Building')}</span>
            </span>
            <span className={styles.lineWrap}>
              <span ref={line2Ref} className={styles.line}>{splitToSpans('Intelligence')}</span>
            </span>
            <span className={styles.lineWrap}>
              <span ref={line3Ref} className={`${styles.line} ${styles.italic}`}>{splitToSpans('Into Reality.')}</span>
            </span>
          </h1>

          <p ref={descRef} className={styles.desc}>
            CS undergrad specializing in AI &amp; ML — engineering intelligent systems,
            practical tools, and things worth using.
          </p>

          <div ref={ctaRef} className={styles.cta}>
            <a ref={exploreRef} href="#projects" className={styles.btnPrimary}>Explore Work →</a>
            <a ref={talkRef}    href="#contact"  className={styles.btnGhost}>Let's Talk →</a>
            <a href="/resume.pdf" download className={styles.btnCV}>Download CV ↓</a>
          </div>
        </div>

        <div ref={scrollRef} className={styles.scrollIndicator}>
          <span>Scroll</span>
          <div className={styles.scrollLine} />
        </div>

        <div className={styles.marqueeWrap}>
          <div className={styles.marquee}>
            {Array(8).fill(null).map((_, i) => (
              <span key={i} className={styles.marqueeItem}>
                RISHU RAJ <span className={styles.dot}>·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* BIG HORIZONTAL NAME — like Jishnu's "JISHNU" */}
      <div className={styles.bigNameWrap}>
        <div ref={bigNameRef} className={styles.bigName}>RISHU</div>
      </div>
    </>
  )
}
