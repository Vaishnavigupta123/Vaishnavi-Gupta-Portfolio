import { useState } from 'react'
import { techStack } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import { getSkillIcon } from '../data/skillIcons'

const GROUPS = ['All', 'Frontend', 'Backend', 'Data', 'Cloud', 'Tools']

function Marquee({ items, reverse = false }) {
  // Duplicated once so the -50% translate loops seamlessly.
  const loop = [...items, ...items]

  return (
    <div className="fade-x overflow-hidden py-2">
      <div
        className="flex w-max gap-3 animate-marquee hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {loop.map((tech, i) => {
          const { Icon, color } = getSkillIcon(tech.name)
          return (
            <span
              key={`${tech.name}-${i}`}
              style={{
                '--brand': color,
                borderColor: `color-mix(in srgb, ${color} 34%, transparent)`,
                backgroundColor: `color-mix(in srgb, ${color} 11%, transparent)`,
              }}
              className="group flex shrink-0 items-center gap-2.5 rounded-xl border px-5 py-3 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_28px_-8px_var(--brand)]"
            >
              <span
                aria-hidden="true"
                className="grid h-7 w-7 shrink-0 place-items-center rounded-lg ring-1 ring-inset ring-white/15 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `color-mix(in srgb, ${color} 26%, transparent)` }}
              >
                <Icon
                  className="h-4 w-4 transition-[filter] duration-300 group-hover:drop-shadow-[0_0_6px_var(--brand)]"
                  style={{ color }}
                />
              </span>
              <span className="whitespace-nowrap text-[13px] font-semibold text-slate-200 transition-colors group-hover:text-white">
                {tech.name}
              </span>
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default function TechStack() {
  const [group, setGroup] = useState('All')

  const filtered = group === 'All' ? techStack : techStack.filter((t) => t.group === group)
  const half = Math.ceil(filtered.length / 2)

  return (
    <section id="stack" className="section">
      <SectionHeading
        eyebrow="Tech Stack"
        title="The full *toolkit*"
        subtitle="Everything I use to take a feature from a Figma frame to a deployed, authenticated, cached endpoint."
        align="center"
      />

      <Reveal delay={0.1}>
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {GROUPS.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGroup(g)}
              className={`rounded-full border px-4 py-1.5 text-[12.5px] font-medium transition-all duration-300 ${
                group === g
                  ? 'border-transparent bg-gradient-to-r from-accent to-accent-soft text-ink-950 shadow-[0_6px_24px_-8px_rgba(94,234,212,0.8)]'
                  : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-accent/40 hover:text-white'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.18} direction="none">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] px-2 py-7 backdrop-blur-sm">
          {/* colour band so the row reads as one lit surface */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 90% at 50% 50%, rgba(94,234,212,0.13), rgba(56,189,248,0.09) 42%, transparent 72%)',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-soft/50 to-transparent"
          />

          <div className="relative space-y-3">
            <Marquee items={filtered.slice(0, half)} />
            {filtered.length > 1 && <Marquee items={filtered.slice(half)} reverse />}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.26}>
        <p className="mt-10 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-slate-600">
          Hover to pause
        </p>
      </Reveal>
    </section>
  )
}
