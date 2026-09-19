import { Award, Code2, GraduationCap, Trophy, TrendingUp, Zap, ArrowUpRight } from 'lucide-react'
import { achievements } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import { RevealGroup, RevealItem } from './ui/Reveal'
import SpotlightCard from './ui/SpotlightCard'

const ICONS = {
  award: Award,
  trophy: Trophy,
  graduation: GraduationCap,
  trending: TrendingUp,
  code: Code2,
  zap: Zap,
}

export default function Achievements() {
  return (
    <section id="achievements" className="section">
      <SectionHeading
        eyebrow="Achievements"
        title="Certifications, milestones and things I am proud of"
        subtitle="A mix of formal credentials and the engineering wins that actually moved the product."
      />

      <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {achievements.map((item) => {
          const Icon = ICONS[item.icon] ?? Award
          const Wrapper = item.link ? 'a' : 'div'
          const linkProps = item.link
            ? { href: item.link, target: '_blank', rel: 'noreferrer noopener' }
            : {}

          return (
            <RevealItem key={item.title} className={item.span ? 'sm:col-span-2 lg:col-span-1' : ''}>
              <SpotlightCard
                as={Wrapper}
                {...linkProps}
                tilt
                tiltStrength={5}
                className="flex h-full flex-col p-6"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-accent/20 to-transparent text-accent transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon className="h-5 w-5" />
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                      {item.kind}
                    </span>
                    {item.link && (
                      <ArrowUpRight className="h-3.5 w-3.5 text-slate-600 transition-colors group-hover:text-accent" />
                    )}
                  </div>
                </div>

                <h3 className="font-display text-base font-semibold leading-snug text-white">
                  {item.title}
                </h3>
                <p className="mt-1 font-mono text-[11px] text-accent/70">{item.year}</p>
                <p className="mt-3 text-[13.5px] leading-relaxed text-slate-400">
                  {item.description}
                </p>
              </SpotlightCard>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </section>
  )
}
