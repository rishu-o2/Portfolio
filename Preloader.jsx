import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Preloader({ onComplete }) {
  const wrapRef     = useRef(null)
  const numberRef   = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const wrap     = wrapRef.current
    const numEl    = numberRef.current
    const barEl    = progressRef.current

    // ── Prevent body scroll while loading ────────────────────────────────
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete() {
        document.body.style.overflow = ''
        if (onComplete) onComplete()
      }
    })

    // Count 0 → 100 + grow progress bar simultaneously over 2.5 s
    const obj = { val: 0 }
    tl.to(obj, {
      val: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate() {
        numEl.textContent  = Math.round(obj.val)
        barEl.style.width  = obj.val + '%'
      },
    })
    // Slide preloader off screen upward
    .to(wrap, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
    })

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [onComplete])

  return (
    <div ref={wrapRef} style={styles.wrap}>
      {/* Centered counter */}
      <div style={styles.center}>
        <span ref={numberRef} style={styles.number}>0</span>
      </div>

      {/* Full-width progress bar pinned to bottom */}
      <div style={styles.track}>
        <div ref={progressRef} style={styles.bar} />
      </div>
    </div>
  )
}

const styles = {
  wrap: {
    position:        'fixed',
    inset:           0,
    backgroundColor: '#0c0d11',
    zIndex:          1000,
    display:         'flex',
    flexDirection:   'column',
    alignItems:      'center',
    justifyContent:  'center',
    overflow:        'hidden',
  },
  center: {
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
  },
  number: {
    fontFamily: "'DM Serif Display', serif",
    fontSize:   'clamp(120px, 20vw, 200px)',
    color:      '#ffffff',
    lineHeight:  1,
    userSelect: 'none',
    // subtle grain-like letter-spacing matching the site aesthetic
    letterSpacing: '-0.02em',
  },
  track: {
    position:        'absolute',
    bottom:          0,
    left:            0,
    width:           '100%',
    height:          '1px',
    backgroundColor: 'rgba(255,255,255,0.06)',
    overflow:        'hidden',
  },
  bar: {
    height:          '100%',
    width:           '0%',
    backgroundColor: '#f2a65a',
  },
}
