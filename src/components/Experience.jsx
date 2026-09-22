import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Briefcase, ChevronDown } from 'lucide-react'
import { experience } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

function Role({ job, index, open, onToggle }) {
  return (
    <Reveal delay={index * 0.1} className="relative pl-10 sm:pl-14">
      {/* timeline node */}
      <span className="absolute left-0 top-1.5 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-ink-900 sm:h-10 sm:w-10">
        <span
          className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${
            job.current
              ? 'bg-accent shadow-[0_0_14px_rgba(94,234,212,0.9)]'
              : 'bg-slate-600 group-hover:bg-accent-soft'
          }`}
        />
        {job.current && (
          <span className="absolute inset-0 animate-ping rounded-full border border-accent/30" />
        )}
      </span>

      <div
        className={`group rounded-2xl glass gradient-border transition-all duration-500 ${
          open ? 'bg-white/[0.055]' : 'hover:bg-white/[0.05]'
        }`}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="flex w-full items-start gap-4 p-5 text-left sm:p-6"
        >
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h3 className="font-display text-lg font-semibold text-white">{job.role}</h3>
              {job.current && (
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                  Current
                </span>
              )}
            </div>

            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="inline-flex items-center gap-1.5 font-medium text-accent">
                <Briefcase className="h-3.5 w-3.5" />
                {job.company}
              </span>
              <span className="text-slate-600">·</span>
              <span className="font-mono text-[12px] text-slate-500">{job.period}</span>
            </div>

            <p className="mt-2 text-[13px] text-slate-500">{job.context}</p>
            <p className="mt-3 text-[14px] leading-relaxed text-slate-400">{job.summary}</p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <li key={tag}>
                  <span className="chip-accent">{tag}</span>
                </li>
              ))}
            </ul>
          </div>

          <span
            className={`mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-all duration-500 ${
              open ? 'rotate-180 border-accent/40 text-accent' : 'group-hover:text-white'
            }`}
          >
            <ChevronDown className="h-4 w-4" />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-white/[0.07] px-5 pb-6 pt-5 sm:px-6">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">
                  What I shipped
                </p>
                <ul className="space-y-3">
                  {job.points.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + i * 0.035 }}
                      className="flex gap-3 text-[13.5px] leading-relaxed text-slate-400"
                    >
                      <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  )
}

export default function Experience() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="experience" className="section">
      <SectionHeading
        eyebrow="Experience"
        title="Where I have been *building*"
        subtitle="From UI/UX and front-end work to owning clinical modules on a multi-tenant EHR platform. Expand any role for the detail."
      />

      <div className="relative">
        {/* timeline rail */}
        <div className="absolute bottom-4 left-4 top-4 w-px bg-gradient-to-b from-accent/50 via-accent-soft/25 to-transparent sm:left-5" />

        <div className="space-y-6">
          {experience.map((job, i) => (
            <Role
              key={`${job.company}-${job.role}`}
              job={job}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
