import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = e => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMove)

    const tick = gsap.ticker.add(() => {
      dot.style.left = mx + 'px'
      dot.style.top  = my + 'px'
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'
    })

    const expand = () => gsap.to(ring, { width: 56, height: 56, borderColor: 'rgba(242,165,90,0.9)', duration: 0.3 })
    const shrink = () => gsap.to(ring, { width: 36, height: 36, borderColor: 'rgba(242,165,90,0.45)', duration: 0.3 })

    const links = document.querySelectorAll('a, button')
    links.forEach(el => { el.addEventListener('mouseenter', expand); el.addEventListener('mouseleave', shrink) })

    return () => {
      window.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  style={styles.dot} />
      <div ref={ringRef} style={styles.ring} />
    </>
  )
}

const styles = {
  dot: {
    position: 'fixed', width: 8, height: 8,
    background: '#f2a65a', borderRadius: '50%',
    pointerEvents: 'none', zIndex: 9999,
    transform: 'translate(-50%,-50%)',
  },
  ring: {
    position: 'fixed', width: 36, height: 36,
    border: '1.5px solid rgba(242,165,90,0.45)', borderRadius: '50%',
    pointerEvents: 'none', zIndex: 9998,
    transform: 'translate(-50%,-50%)',
  }
}
