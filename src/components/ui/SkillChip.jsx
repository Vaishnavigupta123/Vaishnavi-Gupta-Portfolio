import { getSkillIcon } from '../../data/skillIcons'

/**
 * A skill pill showing the real brand logo in its own brand colour,
 * with a matching tinted well behind it. Hover lifts the chip, brightens
 * the mark and picks up the brand colour in the border.
 */
export default function SkillChip({ name, size = 'sm' }) {
  const { Icon, color } = getSkillIcon(name)

  const box = size === 'md' ? 'py-2 pl-2 pr-4 text-[13px] gap-2.5' : 'py-1 pl-1 pr-3 text-[11.5px] gap-1.5'
  const well = size === 'md' ? 'h-7 w-7' : 'h-6 w-6'
  const glyph = size === 'md' ? 'h-4 w-4' : 'h-[13px] w-[13px]'

  return (
    <span
      style={{ '--brand': color }}
      className={`group/chip inline-flex items-center rounded-full border border-white/10 bg-white/[0.04]
                  font-medium tracking-wide text-slate-300 backdrop-blur-md transition-all duration-300
                  hover:-translate-y-0.5 hover:border-[color:var(--brand)]/50 hover:bg-white/[0.08]
                  hover:text-white hover:shadow-[0_4px_18px_-6px_var(--brand)] ${box}`}
    >
      <span
        aria-hidden="true"
        className={`grid ${well} shrink-0 place-items-center rounded-full ring-1 ring-inset ring-white/10
                    transition-transform duration-300 group-hover/chip:scale-110`}
        style={{ backgroundColor: `color-mix(in srgb, ${color} 16%, transparent)` }}
      >
        <Icon
          className={`${glyph} transition-[filter] duration-300
                      group-hover/chip:drop-shadow-[0_0_5px_var(--brand)]`}
          style={{ color }}
        />
      </span>
      <span className="whitespace-nowrap">{name}</span>
    </span>
  )
}
