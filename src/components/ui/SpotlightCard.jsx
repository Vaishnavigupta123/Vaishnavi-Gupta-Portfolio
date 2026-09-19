import { useCallback, useRef, useState } from 'react'

/**
 * Glass card with a cursor-following radial spotlight and an optional
 * subtle 3D tilt. Falls back to a plain glass card on touch devices,
 * where pointermove never fires.
 */
export default function SpotlightCard({
  children,
  className = '',
  glow = 'rgba(110,231,255,0.35)',
  tilt = false,
  tiltStrength = 6,
  as: Tag = 'div',
  ...rest
}) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [active, setActive] = useState(false)
  const [transform, setTransform] = useState('')

  const handleMove = useCallback(
    (e) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const px = ((e.clientX - rect.left) / rect.width) * 100
      const py = ((e.clientY - rect.top) / rect.height) * 100
      setPos({ x: px, y: py })

      if (tilt) {
        const rx = ((py - 50) / 50) * -tiltStrength
        const ry = ((px - 50) / 50) * tiltStrength
        setTransform(`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`)
      }
    },
    [tilt, tiltStrength]
  )

  const handleLeave = useCallback(() => {
    setActive(false)
    setTransform('')
  }, [])

  return (
    <Tag
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={handleLeave}
      style={{ transform, transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)' }}
      className={`group relative overflow-hidden rounded-2xl glass gradient-border ${className}`}
      {...rest}
    >
      {/* cursor spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(420px circle at ${pos.x}% ${pos.y}%, ${glow}, transparent 62%)`,
        }}
      />
      {/* top highlight line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />
      <div className="relative z-10 h-full">{children}</div>
    </Tag>
  )
}
