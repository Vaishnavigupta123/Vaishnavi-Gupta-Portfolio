import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently closest to the top of the viewport.
 * Uses scroll position rather than IntersectionObserver so that short sections
 * near the page end still register.
 */
export default function useScrollSpy(ids, offset = 120) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    let frame = 0

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0

        // Bottom of the page always highlights the final section.
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 80) {
          setActiveId(ids[ids.length - 1])
          return
        }

        let current = ids[0]
        for (const id of ids) {
          const el = document.getElementById(id)
          if (!el) continue
          if (el.getBoundingClientRect().top - offset <= 0) current = id
        }
        setActiveId(current)
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ids, offset])

  return activeId
}
