import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  const centered = align === 'center'

  return (
    <div className={`mb-14 max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <Reveal direction="up">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-glow" />
            {eyebrow}
          </span>
        </Reveal>
      )}

      <Reveal direction="up" delay={0.08}>
        <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-balance sm:text-4xl md:text-[2.75rem]">
          <span className="text-gradient">{title}</span>
        </h2>
      </Reveal>

      {subtitle && (
        <Reveal direction="up" delay={0.16}>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-400 text-balance">{subtitle}</p>
        </Reveal>
      )}

      <Reveal direction="left" delay={0.22}>
        <div
          className={`mt-7 h-px w-24 bg-gradient-to-r from-accent via-accent-soft to-transparent ${
            centered ? 'mx-auto' : ''
          }`}
        />
      </Reveal>
    </div>
  )
}
