import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    const onScroll = () => {
      const scrolled  = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      bar.style.width = docHeight > 0 ? (scrolled / docHeight) * 100 + '%' : '0%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{
      position:        'fixed',
      top:             0,
      left:            0,
      width:           '100%',
      height:          2,
      zIndex:          600,
      backgroundColor: 'rgba(255,255,255,0.04)',
      pointerEvents:   'none',
    }}>
      <div ref={barRef} style={{
        height:          '100%',
        width:           '0%',
        backgroundColor: '#f2a65a',
        transition:      'width 0.05s linear',
      }} />
    </div>
  )
}
