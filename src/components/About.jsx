import { Activity, Cloud, GraduationCap, Layers, Zap } from 'lucide-react'
import { about, education, profile } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal, { RevealGroup, RevealItem } from './ui/Reveal'
import SpotlightCard from './ui/SpotlightCard'

const ICONS = { activity: Activity, layers: Layers, zap: Zap, cloud: Cloud }

export default function About() {
  return (
    <section id="about" className="section">
      <SectionHeading
        eyebrow="About"
        title={about.heading}
        subtitle={profile.tagline}
      />

      <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
        {/* Narrative */}
        <div className="space-y-5">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="text-[15px] leading-[1.85] text-slate-400">{p}</p>
            </Reveal>
          ))}

          <Reveal delay={0.3}>
            <SpotlightCard className="mt-8 p-6" glow="rgba(139,92,246,0.28)">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-accent-soft">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-base font-semibold text-white">
                      {education.degree}
                    </h3>
                    <span className="font-mono text-[11px] text-slate-500">
                      {education.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">
                    {education.school} · {education.location}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>

        {/* Highlight cards */}
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {about.highlights.map((h) => {
            const Icon = ICONS[h.icon] ?? Activity
            return (
              <RevealItem key={h.title}>
                <SpotlightCard className="h-full p-5" tilt>
                  <div className="flex items-start gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-transparent text-accent transition-transform duration-500 group-hover:scale-110">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{h.title}</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-slate-400">{h.text}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
