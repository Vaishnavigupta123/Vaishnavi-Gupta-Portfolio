import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Code2, Copy, Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react'
import { contact, profile } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import SpotlightCard from './ui/SpotlightCard'

const ITEM_ICONS = { mail: Mail, phone: Phone, pin: MapPin }
const SOCIAL_ICONS = { github: Github, linkedin: Linkedin, code: Code2, mail: Mail }

function Field({ label, id, type = 'text', value, onChange, rows, required }) {
  const Tag = rows ? 'textarea' : 'input'
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
        {label}
      </span>
      <Tag
        id={id}
        name={id}
        type={rows ? undefined : type}
        rows={rows}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[14px] text-slate-200 outline-none backdrop-blur-md transition-all duration-300 placeholder:text-slate-600 focus:border-accent/50 focus:bg-white/[0.06] focus:shadow-glow"
        placeholder={rows ? 'Tell me a little about it…' : label}
      />
    </label>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [copied, setCopied] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  // No backend here — this composes a prefilled email in the visitor's client.
  // Swap for Formspree / EmailJS if you want submissions without a mail app.
  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || 'someone'}`)
    const body = encodeURIComponent(
      `${form.message}\n\n—\n${form.name}\n${form.email}`
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  }

  return (
    <section id="contact" className="section">
      <SectionHeading
        eyebrow="Contact"
        title={contact.heading}
        subtitle={contact.subheading}
        align="center"
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        {/* ---- Details ---- */}
        <div className="space-y-4">
          {contact.items.map((item, i) => {
            const Icon = ITEM_ICONS[item.icon] ?? Mail
            const Wrapper = item.url ? 'a' : 'div'
            return (
              <Reveal key={item.label} delay={i * 0.08} direction="right">
                <SpotlightCard
                  as={Wrapper}
                  {...(item.url ? { href: item.url } : {})}
                  className="flex items-center gap-4 p-5"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-accent/20 to-transparent text-accent transition-transform duration-500 group-hover:scale-110">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-0.5 truncate text-[14px] font-medium text-slate-200">
                      {item.value}
                    </p>
                  </div>
                </SpotlightCard>
              </Reveal>
            )
          })}

          <Reveal delay={0.26} direction="right">
            <button
              type="button"
              onClick={copyEmail}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-5 py-3.5 text-[13px] font-medium text-slate-400 transition-all duration-300 hover:border-accent/40 hover:text-accent"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" /> Email copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" /> Copy email address
                </>
              )}
            </button>
          </Reveal>

          <Reveal delay={0.32} direction="right">
            <div className="flex gap-3 pt-2">
              {profile.socials
                .filter((s) => s.icon !== 'mail')
                .map((s) => {
                  const Icon = SOCIAL_ICONS[s.icon] ?? Code2
                  return (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={s.label}
                      className="grid h-12 flex-1 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:text-accent hover:shadow-glow"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </a>
                  )
                })}
            </div>
          </Reveal>
        </div>

        {/* ---- Form ---- */}
        <Reveal delay={0.12} direction="left">
          <SpotlightCard className="p-7 sm:p-8" glow="rgba(56,189,248,0.25)">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" id="name" value={form.name} onChange={set('name')} required />
                <Field
                  label="Email"
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  required
                />
              </div>

              <Field
                label="Message"
                id="message"
                rows={5}
                value={form.message}
                onChange={set('message')}
                required
              />

              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                className="btn-primary w-full"
              >
                Send message
                <Send className="h-4 w-4" />
              </motion.button>

              <p className="text-center text-[11px] leading-relaxed text-slate-600">
                Opens your mail app with the message ready to send.
              </p>
            </form>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  )
}
