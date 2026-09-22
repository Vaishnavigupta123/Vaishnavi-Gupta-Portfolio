import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  const centered = align === 'center'

  return (
    <div className={`mb-14 max-w-4xl ${centered ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <Reveal direction={centered ? 'up' : 'left'}>
          <div className={`flex items-center gap-3.5 ${centered ? 'justify-center' : ''}`}>
            {centered && (
              <span
                aria-hidden="true"
                className="h-px w-10 bg-gradient-to-r from-transparent to-accent"
              />
            )}
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
              {eyebrow}
            </span>
            <span
              aria-hidden="true"
              className="h-px w-10 bg-gradient-to-r from-accent to-transparent"
            />
          </div>
        </Reveal>
      )}

      <Reveal direction="up" delay={0.08}>
        <h2 className="mt-6 font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.02em] text-balance sm:text-[2.6rem] md:text-5xl">
          {/* Text wrapped in *asterisks* renders in the accent gradient. */}
          {title.split(/\*(.+?)\*/).map((part, i) =>
            i % 2 === 1 ? (
              <span key={i} className="text-gradient-accent">
                {part}
              </span>
            ) : (
              <span key={i} className="text-gradient">
                {part}
              </span>
            )
          )}
        </h2>
      </Reveal>

      {subtitle && (
        <Reveal direction="up" delay={0.16}>
          <p
            className={`mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-400 text-balance ${
              centered ? 'mx-auto' : ''
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}
