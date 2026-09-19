import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from 'lucide-react'
import { profile, stats } from '../data/content'
import useCountUp from '../hooks/useCountUp'

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

function Stat({ value, suffix, label }) {
  const [count, ref] = useCountUp(value)
  return (
    <div ref={ref}>
      <div className="font-display text-2xl font-bold text-white sm:text-3xl">
        {count}
        <span className="text-gradient-accent">{suffix}</span>
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-slate-500">{label}</div>
    </div>
  )
}

export default function Hero() {
  const typed = useTypewriter(profile.roles)

  const go = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-20 pt-32 sm:px-8"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
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
            className="mt-7 font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-[4.2rem]"
          >
            <span className="text-gradient">{profile.firstName}</span>
            <br />
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

          {/* CTAs */}
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
            <a href={profile.resumeUrl} download className="btn-ghost">
              <Download className="h-4 w-4" />
              Download CV
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.52 }}
            className="mt-10 flex items-center gap-3"
          >
            {profile.socials.map(({ label, url, icon }) => {
              const Icon = ICONS[icon] ?? Code2
              return (
                <a
                  key={label}
                  href={url}
                  target={url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="group grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.035] text-slate-400 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:text-accent hover:shadow-glow"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              )
            })}
          </motion.div>
        </div>

        {/* ---------------- Right: code card ---------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-accent/20 via-accent-soft/10 to-transparent blur-3xl" />

          <div className="relative animate-float rounded-2xl glass-strong p-1">
            {/* window chrome */}
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-3 font-mono text-[11px] text-slate-500">developer.js</span>
            </div>

            <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed">
              <code>
                <span className="text-violet-400">const</span>{' '}
                <span className="text-accent">vaishnavi</span>{' '}
                <span className="text-slate-500">=</span> <span className="text-slate-300">{'{'}</span>
                {'\n'}
                <span className="text-slate-500">{'  '}role</span>
                <span className="text-slate-500">:</span>{' '}
                <span className="text-emerald-300">&apos;Full Stack Developer&apos;</span>
                <span className="text-slate-500">,</span>
                {'\n'}
                <span className="text-slate-500">{'  '}building</span>
                <span className="text-slate-500">:</span>{' '}
                <span className="text-emerald-300">&apos;ABDM-compliant EHR&apos;</span>
                <span className="text-slate-500">,</span>
                {'\n'}
                <span className="text-slate-500">{'  '}stack</span>
                <span className="text-slate-500">: [</span>
                {'\n'}
                <span className="text-emerald-300">{'    '}&apos;React&apos;</span>
                <span className="text-slate-500">,</span>{' '}
                <span className="text-emerald-300">&apos;Next.js&apos;</span>
                <span className="text-slate-500">,</span>
                {'\n'}
                <span className="text-emerald-300">{'    '}&apos;Python&apos;</span>
                <span className="text-slate-500">,</span>{' '}
                <span className="text-emerald-300">&apos;Django&apos;</span>
                <span className="text-slate-500">,</span>
                {'\n'}
                <span className="text-emerald-300">{'    '}&apos;PostgreSQL&apos;</span>
                <span className="text-slate-500">,</span>{' '}
                <span className="text-emerald-300">&apos;AWS&apos;</span>
                <span className="text-slate-500">,</span>
                {'\n'}
                <span className="text-slate-500">{'  '}],</span>
                {'\n'}
                <span className="text-slate-500">{'  '}focus</span>
                <span className="text-slate-500">:</span>{' '}
                <span className="text-emerald-300">&apos;multi-tenant SaaS&apos;</span>
                <span className="text-slate-500">,</span>
                {'\n'}
                <span className="text-slate-500">{'  '}available</span>
                <span className="text-slate-500">:</span>{' '}
                <span className="text-amber-300">true</span>
                <span className="text-slate-500">,</span>
                {'\n'}
                <span className="text-slate-300">{'}'}</span>
                <span className="ml-1 inline-block h-3.5 w-[7px] animate-blink bg-accent align-middle" />
              </code>
            </pre>
          </div>

          {/* floating badges */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-6 top-16 rounded-xl glass px-3.5 py-2 font-mono text-[11px] text-accent"
          >
            WebSocket · live vitals
          </motion.div>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -left-8 bottom-14 rounded-xl glass px-3.5 py-2 font-mono text-[11px] text-accent-warm"
          >
            multi-tenant · ABDM
          </motion.div>
        </motion.div>
      </div>

      {/* ---------------- Stats strip ---------------- */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute inset-x-0 bottom-0 hidden border-t border-white/[0.06] md:block"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-8 py-7">
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        onClick={(e) => go(e, 'about')}
        aria-label="Scroll to about"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[7.5rem] left-1/2 hidden -translate-x-1/2 text-slate-600 transition-colors hover:text-accent lg:block"
      >
        <ArrowDown className="h-5 w-5" />
      </motion.a>
    </section>
  )
}
