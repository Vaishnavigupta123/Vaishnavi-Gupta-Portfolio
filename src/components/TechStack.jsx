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
              style={{ '--brand': color }}
              className="group flex shrink-0 items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.035] px-5 py-3 backdrop-blur-md transition-all duration-300 hover:border-[color:var(--brand)]/50 hover:bg-white/[0.08]"
            >
              <span
                aria-hidden="true"
                className="grid h-7 w-7 shrink-0 place-items-center rounded-lg ring-1 ring-inset ring-white/10 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `color-mix(in srgb, ${color} 16%, transparent)` }}
              >
                <Icon
                  className="h-4 w-4 transition-[filter] duration-300 group-hover:drop-shadow-[0_0_6px_var(--brand)]"
                  style={{ color }}
                />
              </span>
              <span className="whitespace-nowrap text-[13px] font-medium text-slate-300 transition-colors group-hover:text-white">
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
        title="The full toolkit"
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
                  ? 'border-accent/50 bg-accent/10 text-accent'
                  : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/25 hover:text-white'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.18} direction="none">
        <div className="space-y-3">
          <Marquee items={filtered.slice(0, half)} />
          {filtered.length > 1 && <Marquee items={filtered.slice(half)} reverse />}
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
