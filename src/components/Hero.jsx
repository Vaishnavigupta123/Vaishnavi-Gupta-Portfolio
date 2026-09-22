import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from 'lucide-react'
import { profile } from '../data/content'
import Starfield from './ui/Starfield'
import ResumeModal from './ResumeModal'

const ICONS = { github: Github, linkedin: Linkedin, code: Code2, mail: Mail }

/** Types / deletes through profile.roles on a loop. */
function useTypewriter(words, { type = 70, back = 38, hold = 1900 } = {}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    let delay = deleting ? back : type

    if (!deleting && text === word) {
      delay = hold
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
      return
    }

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true)
        return
      }
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
    }, delay)

    return () => clearTimeout(timer)
  }, [text, deleting, index, words, type, back, hold])

  return text
}

export default function Hero() {
  const typed = useTypewriter(profile.roles)
  const [resumeOpen, setResumeOpen] = useState(false)

  const go = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:px-12"
    >
      {/* starfield lives only behind the hero, fading out at the bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          maskImage: 'linear-gradient(to bottom, #000 55%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000 55%, transparent 100%)',
        }}
      >
        <Starfield />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        {/* ---------------- Left ---------------- */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-3"
          >
            {profile.available && (
              <span className="eyebrow">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Open to opportunities
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-slate-500">
              <MapPin className="h-3 w-3" />
              {profile.location}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 font-display text-[2.2rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-[3.4rem] xl:text-[4rem]"
          >
            <span className="text-gradient">{profile.firstName}</span>{' '}
            <span className="text-gradient-accent">{profile.lastName}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-5 flex min-h-[2.25rem] items-center font-mono text-base text-slate-300 sm:text-lg"
          >
            <span className="mr-2 text-accent">&gt;</span>
            <span>{typed}</span>
            <span className="ml-0.5 inline-block h-5 w-[2px] animate-blink bg-accent sm:h-6" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-slate-400 text-balance"
          >
            {profile.blurb}
          </motion.p>

          {/* CTAs + socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a href="#projects" onClick={(e) => go(e, 'projects')} className="btn-primary">
              View my work
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <button type="button" onClick={() => setResumeOpen(true)} className="btn-ghost">
              <FileText className="h-4 w-4" />
              View Resume
            </button>

            <span aria-hidden="true" className="mx-1 hidden h-8 w-px bg-white/10 sm:block" />

            <div className="flex items-center gap-2">
              {profile.socials.map(({ label, url, icon }) => {
                const Icon = ICONS[icon] ?? Code2
                return (
                  <a
                    key={label}
                    href={url}
                    target={url.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.035] text-slate-400 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:text-accent hover:shadow-glow"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* ---------------- Right: portrait ---------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[17rem] sm:max-w-[19rem] lg:mx-0 lg:ml-auto lg:max-w-[23rem]"
        >
          {/* glow behind the frame */}
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-accent/25 via-accent-soft/15 to-transparent blur-3xl" />

          {/* offset accent frame */}
          <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[1.75rem] border border-accent/30 sm:translate-x-3 sm:translate-y-3" />

          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-900 shadow-glow-lg">
            <img
              src={profile.photo}
              alt={`${profile.name}, ${profile.role}`}
              width="1125"
              height="1440"
              loading="eager"
              className="aspect-[1/1.08] w-full object-cover object-top grayscale-[0.15] transition-all duration-700 hover:grayscale-0 hover:scale-[1.03]"
            />

            {/* tint + bottom fade so the badge stays readable */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/15 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{
                background:
                  'linear-gradient(140deg, rgba(94,234,212,0.35), transparent 45%, rgba(167,139,250,0.3))',
              }}
            />

            {/* availability badge */}
            {profile.available && (
              <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink-950/75 px-2.5 py-1 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-200">
                  Available
                </span>
              </div>
            )}
          </div>

        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        onClick={(e) => go(e, 'about')}
        aria-label="Scroll to about"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 text-slate-600 transition-colors hover:text-accent lg:block"
      >
        <ArrowDown className="h-5 w-5" />
      </motion.a>

      <AnimatePresence>
        {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}
