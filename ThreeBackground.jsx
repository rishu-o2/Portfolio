import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // ── Scene / Camera / Renderer ──────────────────────────────────────────
    const scene    = new THREE.Scene()
    const camera   = new THREE.PerspectiveCamera(
      60, canvas.clientWidth / canvas.clientHeight, 0.01, 100
    )
    camera.position.z = 2

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)

    // ── Particles ─────────────────────────────────────────────────────────
    const COUNT = 150
    const positions = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 4   // x: -2 to 2
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4   // y: -2 to 2
      positions[i * 3 + 2] = -(Math.random())             // z: -1 to 0
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      color:          0xf2a65a,
      size:           0.012,
      transparent:    true,
      opacity:        0.5,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // ── Mouse parallax ───────────────────────────────────────────────────
    let mouseX = 0
    let mouseY = 0
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
    }
    window.addEventListener('resize', onResize)

    // ── Animation loop ────────────────────────────────────────────────────
    let rafId
    const pos = geometry.attributes.position

    const animate = () => {
      rafId = requestAnimationFrame(animate)

      // Float particles upward, reset when they leave the top
      for (let i = 0; i < COUNT; i++) {
        pos.array[i * 3 + 1] += 0.001
        if (pos.array[i * 3 + 1] > 2) {
          pos.array[i * 3 + 1] = -2
          pos.array[i * 3 + 0] = (Math.random() - 0.5) * 4
        }
      }
      pos.needsUpdate = true

      // Gentle base rotation
      points.rotation.x += 0.0002
      points.rotation.y += 0.0003

      // Smooth mouse parallax (lerp toward target)
      points.rotation.x += (mouseY * 0.0003 - points.rotation.x) * 0.05
      points.rotation.y += (mouseX * 0.0003 - points.rotation.y) * 0.05

      renderer.render(scene, camera)
    }
    animate()

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'absolute',
        top:           0,
        left:          0,
        width:         '100%',
        height:        '100%',
        zIndex:        0,
        pointerEvents: 'none',
      }}
    />
  )
}
