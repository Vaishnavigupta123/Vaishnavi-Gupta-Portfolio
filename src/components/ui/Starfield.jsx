import { useEffect, useRef } from 'react'

const STAR_COLORS = ['#5eead4', '#38bdf8', '#a78bfa', '#e2e8f0', '#ffffff']

/**
 * Animated starfield drawn on a canvas: three parallax layers of drifting,
 * twinkling stars plus the occasional shooting star. Nudges toward the
 * pointer for a subtle depth effect.
 *
 * Pauses when the tab is hidden and renders a single static frame when the
 * visitor prefers reduced motion.
 */
export default function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches

    let width = 0
    let height = 0
    let dpr = 1
    let stars = []
    let shooting = []
    let raf = 0
    let running = true

    // Pointer offset, eased toward the real cursor each frame.
    const pointer = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const seed = () => {
      // Scale star count with viewport area, but keep it bounded.
      const count = Math.min(Math.round((width * height) / 7600), 140)
      stars = Array.from({ length: count }, () => {
        const depth = Math.random() // 0 = far, 1 = near
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.35 + depth * 1.25,
          depth,
          speed: (0.04 + depth * 0.22) * (Math.random() < 0.5 ? 1 : 0.7),
          drift: (Math.random() - 0.5) * 0.05,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
          alpha: 0.16 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
          twinkle: 0.4 + Math.random() * 1.6,
        }
      })
    }

    const spawnShootingStar = () => {
      const fromLeft = Math.random() < 0.5
      shooting.push({
        x: fromLeft ? -60 : width + 60,
        y: Math.random() * height * 0.55,
        vx: (fromLeft ? 1 : -1) * (5 + Math.random() * 3),
        vy: 1.6 + Math.random() * 1.4,
        life: 0,
        maxLife: 70 + Math.random() * 40,
        len: 90 + Math.random() * 90,
      })
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height)

      // Ease the parallax offset toward the pointer.
      pointer.x += (target.x - pointer.x) * 0.045
      pointer.y += (target.y - pointer.y) * 0.045

      for (const s of stars) {
        // Drift upward; wrap around the edges.
        if (!reduced) {
          s.y -= s.speed
          s.x += s.drift
          if (s.y < -4) {
            s.y = height + 4
            s.x = Math.random() * width
          }
          if (s.x < -4) s.x = width + 4
          else if (s.x > width + 4) s.x = -4
        }

        const twinkle = reduced ? 1 : 0.65 + 0.35 * Math.sin(t * 0.001 * s.twinkle + s.phase)
        const px = s.x + pointer.x * (0.3 + s.depth * 1.5)
        const py = s.y + pointer.y * (0.3 + s.depth * 1.5)

        ctx.globalAlpha = s.alpha * twinkle
        ctx.fillStyle = s.color
        ctx.beginPath()
        ctx.arc(px, py, s.r, 0, Math.PI * 2)
        ctx.fill()

        // Brighter stars get a soft halo.
        if (s.depth > 0.78) {
          ctx.globalAlpha = s.alpha * twinkle * 0.16
          ctx.beginPath()
          ctx.arc(px, py, s.r * 5, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Shooting stars
      for (let i = shooting.length - 1; i >= 0; i--) {
        const m = shooting[i]
        m.x += m.vx
        m.y += m.vy
        m.life += 1

        const fade = 1 - m.life / m.maxLife
        if (fade <= 0) {
          shooting.splice(i, 1)
          continue
        }

        const tailX = m.x - (m.vx / Math.hypot(m.vx, m.vy)) * m.len
        const tailY = m.y - (m.vy / Math.hypot(m.vx, m.vy)) * m.len
        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY)
        grad.addColorStop(0, `rgba(226,232,240,${0.85 * fade})`)
        grad.addColorStop(1, 'rgba(226,232,240,0)')

        ctx.globalAlpha = 1
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.6
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(m.x, m.y)
        ctx.lineTo(tailX, tailY)
        ctx.stroke()
      }

      ctx.globalAlpha = 1

      if (!reduced && running && Math.random() < 0.0014 && shooting.length < 1) {
        spawnShootingStar()
      }

      if (running) raf = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 22
      target.y = (e.clientY / window.innerHeight - 0.5) * 22
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!running) {
        running = true
        raf = requestAnimationFrame(draw)
      }
    }

    resize()
    window.addEventListener('resize', resize)
    if (!coarse) window.addEventListener('pointermove', onMove)
    document.addEventListener('visibilitychange', onVisibility)

    if (reduced) {
      draw(0) // one static frame
      running = false
    } else {
      raf = requestAnimationFrame(draw)
    }

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
