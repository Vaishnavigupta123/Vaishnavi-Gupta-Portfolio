import { useEffect, useState } from 'react'

/**
 * Fixed ambient layer: gradient aurora blobs, a fading grid, a vignette,
 * and a pointer-reactive glow. Sits behind all content.
 */
export default function Background() {
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.2 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    let frame = 0
    const onMove = (e) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        setPointer({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
        frame = 0
      })
    }
    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base wash */}
      <div className="absolute inset-0 bg-ink-950" />

      {/* aurora blobs */}
      <div className="absolute -left-[18%] -top-[22%] h-[52rem] w-[52rem] animate-drift rounded-full bg-[radial-gradient(circle_at_center,rgba(110,231,255,0.20),transparent_62%)] blur-3xl" />
      <div
        className="absolute -right-[16%] top-[8%] h-[46rem] w-[46rem] animate-drift rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.22),transparent_62%)] blur-3xl"
        style={{ animationDelay: '-8s' }}
      />
      <div
        className="absolute bottom-[-24%] left-[22%] h-[44rem] w-[44rem] animate-drift rounded-full bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.14),transparent_62%)] blur-3xl"
        style={{ animationDelay: '-15s' }}
      />

      {/* grid */}
      <div
        className="absolute inset-0 bg-grid-fade bg-grid opacity-60"
        style={{
          maskImage: 'radial-gradient(ellipse 80% 55% at 50% 30%, #000 30%, transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 55% at 50% 30%, #000 30%, transparent 78%)',
        }}
      />

      {/* pointer-reactive glow */}
      <div
        className="absolute inset-0 transition-[background] duration-700 ease-out"
        style={{
          background: `radial-gradient(640px circle at ${pointer.x * 100}% ${
            pointer.y * 100
          }%, rgba(110,231,255,0.07), transparent 65%)`,
        }}
      />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(5,6,10,0.85)_100%)]" />
    </div>
  )
}
