import { ArrowUp } from 'lucide-react'
import { navLinks, profile } from '../data/content'

export default function Footer() {
  const year = new Date().getFullYear()

  const go = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-start">
          <div>
            <a href="#home" onClick={(e) => go(e, 'home')} className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 font-display text-sm font-bold">
                <span className="bg-gradient-to-br from-accent to-accent-soft bg-clip-text text-transparent">
                  VG
                </span>
              </span>
              <span className="text-sm font-semibold text-slate-200">{profile.name}</span>
            </a>
            <p className="mt-3 max-w-xs text-center text-[13px] leading-relaxed text-slate-500 sm:text-left">
              {profile.role} · {profile.location}
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 text-center sm:text-left">
            {navLinks.slice(1).map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => go(e, link.id)}
                className="text-[13px] text-slate-500 transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row">
          <p className="font-mono text-[11px] text-slate-600">
            © {year} {profile.name}. Built with React, Tailwind and Framer Motion.
          </p>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[12px] font-medium text-slate-400 transition-all duration-300 hover:border-accent/40 hover:text-accent"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
