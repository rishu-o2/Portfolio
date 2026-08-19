import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * useMagnetic — attaches a magnetic pull effect to any element.
 * @param {number} strength  How strongly the element follows the cursor (0–1). Default 0.35.
 * @returns {React.RefObject}  Attach this ref to the target element.
 */
export default function useMagnetic(strength = 0.35) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function onMouseMove(e) {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width  / 2
      const cy = rect.top  + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength

      gsap.to(el, {
        x: dx,
        y: dy,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    function onMouseLeave() {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      })
    }

    el.addEventListener('mousemove',  onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)

    return () => {
      el.removeEventListener('mousemove',  onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [strength])

  return ref
}
