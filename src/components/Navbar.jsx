import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navLinks, profile } from '../data/content'
import useScrollSpy from '../hooks/useScrollSpy'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const ids = useMemo(() => navLinks.map((l) => l.id), [])
  const active = useScrollSpy(ids)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[65] transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        {/* Backdrop so page content never shows through behind the bar */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 transition-all duration-500 ${
            scrolled
              ? 'border-b border-white/[0.07] bg-ink-950/75 backdrop-blur-xl'
              : 'border-b border-transparent bg-transparent'
          }`}
        />

        <nav className="relative mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Logo mark only */}
          <a
            href="#home"
            onClick={(e) => go(e, 'home')}
            aria-label={`${profile.name} — back to top`}
            className="group relative"
          >
            <span className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 font-display text-[15px] font-bold text-transparent backdrop-blur-md transition-colors duration-300 group-hover:border-accent/50">
              <span className="bg-gradient-to-br from-accent to-accent-soft bg-clip-text">VG</span>
              <span className="absolute inset-0 rounded-xl opacity-0 shadow-glow transition-opacity duration-500 group-hover:opacity-100" />
            </span>
          </a>

          {/* Links + CTA, all grouped on the right */}
          <div className="flex items-center gap-2 sm:gap-4">
          {/* Desktop links */}
          <div
            className="hidden items-center gap-1 rounded-full px-2 py-1.5 lg:flex"
          >
            {navLinks.map((link) => {
              const isActive = active === link.id
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => go(e, link.id)}
                  className={`relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.08]"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              )
            })}
          </div>

            <a
              href="#contact"
              onClick={(e) => go(e, 'contact')}
              className="hidden items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[13px] font-semibold text-slate-200 backdrop-blur-md transition-all duration-300 hover:border-accent/50 hover:text-white sm:inline-flex"
            >
              Get in touch
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-200 backdrop-blur-md transition-colors hover:border-accent/40 lg:hidden"
            >
              {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[64] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-ink-950/85 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-4 top-24 rounded-3xl glass-strong p-3"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => go(e, link.id)}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition-colors ${
                    active === link.id
                      ? 'bg-white/[0.07] text-white'
                      : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className="font-mono text-[11px] text-slate-600">
                    0{i + 1}
                  </span>
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
