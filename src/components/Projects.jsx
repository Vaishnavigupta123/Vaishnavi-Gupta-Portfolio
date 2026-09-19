import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Github, Lock, Sparkles, X } from 'lucide-react'
import { projectFilters, projects } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import SpotlightCard from './ui/SpotlightCard'

function hexToRgba(hex, alpha) {
  const n = parseInt(hex.replace('#', ''), 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`
}

function ProjectCard({ project, onOpen }) {
  const glow = hexToRgba(project.accent, 0.3)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 26, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -14, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <SpotlightCard
        as="article"
        glow={glow}
        tilt
        tiltStrength={4}
        className="flex h-full cursor-pointer flex-col p-6"
        onClick={() => onOpen(project)}
      >
        {/* accent wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
          style={{ background: glow }}
        />

        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{
                color: project.accent,
                borderColor: hexToRgba(project.accent, 0.35),
                background: hexToRgba(project.accent, 0.08),
              }}
            >
              {project.category}
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium text-slate-400">
                <Sparkles className="h-2.5 w-2.5" />
                Featured
              </span>
            )}
          </div>

          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-500 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-white/25 group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <h3 className="font-display text-xl font-semibold leading-snug text-white transition-colors duration-300">
          {project.title}
        </h3>
        <p className="mt-1 font-mono text-[11px] text-slate-500">{project.period}</p>
        <p className="mt-3 text-[14px] font-medium text-slate-300">{project.tagline}</p>

        <p className="mt-3 line-clamp-3 text-[13.5px] leading-relaxed text-slate-500">
          {project.description}
        </p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-5">
          {project.tech.slice(0, 5).map((t) => (
            <li key={t}>
              <span className="chip">{t}</span>
            </li>
          ))}
          {project.tech.length > 5 && (
            <li>
              <span className="chip">+{project.tech.length - 5}</span>
            </li>
          )}
        </ul>
      </SpotlightCard>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!project) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] grid place-items-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div className="absolute inset-0 bg-ink-950/85 backdrop-blur-xl" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl glass-strong p-7 sm:p-9"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl"
          style={{ background: hexToRgba(project.accent, 0.22) }}
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-white/30 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative">
          <span
            className="rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
            style={{
              color: project.accent,
              borderColor: hexToRgba(project.accent, 0.35),
              background: hexToRgba(project.accent, 0.08),
            }}
          >
            {project.category}
          </span>

          <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-1.5 font-mono text-[11px] text-slate-500">{project.period}</p>
          <p className="mt-4 text-[15px] font-medium text-slate-300">{project.tagline}</p>

          <p className="mt-4 text-[14px] leading-[1.8] text-slate-400">{project.description}</p>

          <div className="mt-7">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">
              Highlights
            </p>
            <ul className="space-y-2.5">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[13.5px] leading-relaxed text-slate-400">
                  <span
                    className="mt-[9px] h-1 w-1 shrink-0 rounded-full"
                    style={{ background: project.accent }}
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">
              Built with
            </p>
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li key={t}>
                  <span className="chip">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/[0.07] pt-6">
            {project.links?.length > 0 &&
              project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-ghost !px-5 !py-2.5 !text-[13px]"
                >
                  {link.type === 'github' ? (
                    <Github className="h-4 w-4" />
                  ) : (
                    <ExternalLink className="h-4 w-4" />
                  )}
                  {link.label}
                </a>
              ))}

            {project.note && (
              <span className="inline-flex items-center gap-2 text-[12px] text-slate-500">
                <Lock className="h-3.5 w-3.5" />
                {project.note}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  )

  return (
    <section id="projects" className="section">
      <SectionHeading
        eyebrow="Projects"
        title="Things I have designed and shipped"
        subtitle="Clinical platforms, marketing sites and product prototypes. Tap any card for the full breakdown."
      />

      {/* Filters */}
      <Reveal delay={0.1}>
        <div className="mb-10 flex flex-wrap gap-2">
          {projectFilters.map((f) => {
            const isActive = filter === f
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
                  isActive ? 'text-ink-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-soft"
                  />
                )}
                {!isActive && (
                  <span className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.03]" />
                )}
                <span className="relative z-10">{f}</span>
              </button>
            )
          })}
        </div>
      </Reveal>

      {/* Grid */}
      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <ProjectCard key={project.title} project={project} onOpen={setSelected} />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
