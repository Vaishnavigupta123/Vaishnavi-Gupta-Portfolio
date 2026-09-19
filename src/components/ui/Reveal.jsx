import { motion, useReducedMotion } from 'framer-motion'

const OFFSET = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Scroll-triggered entrance wrapper. Animates once, respects reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.7,
  className = '',
  as = 'div',
  amount = 0.25,
}) {
  const reduced = useReducedMotion()
  const offset = OFFSET[direction] ?? OFFSET.up
  const MotionTag = motion[as] ?? motion.div

  if (reduced) return <MotionTag className={className}>{children}</MotionTag>

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}

/** Staggered container — pair with <RevealItem /> children. */
export function RevealGroup({ children, className = '', stagger = 0.08, delay = 0 }) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className = '', y = 24 }) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y, filter: 'blur(6px)' },
        show: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
