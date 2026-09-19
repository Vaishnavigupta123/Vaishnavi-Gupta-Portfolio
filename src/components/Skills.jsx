import { Brain, Cloud, Database, Monitor, Server, Wrench } from 'lucide-react'
import { skillGroups } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import { RevealGroup, RevealItem } from './ui/Reveal'
import SpotlightCard from './ui/SpotlightCard'
import SkillChip from './ui/SkillChip'

const ICONS = {
  monitor: Monitor,
  server: Server,
  database: Database,
  cloud: Cloud,
  wrench: Wrench,
  brain: Brain,
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeading
        eyebrow="Skills"
        title="What I work with, and what I reach for first"
        subtitle="Grouped by where they sit in the stack — from the interface a clinician touches down to the infrastructure it runs on."
      />

      <RevealGroup className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {skillGroups.map((group) => {
          const Icon = ICONS[group.icon] ?? Monitor
          return (
            <RevealItem key={group.title}>
              <SpotlightCard className="p-5" glow={group.glow} tilt tiltStrength={4}>
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{ background: `linear-gradient(135deg, ${group.glow}, transparent)` }}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <h3 className="font-display text-base font-semibold text-white">
                    {group.title}
                  </h3>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li key={skill}>
                      <SkillChip name={skill} />
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </section>
  )
}
