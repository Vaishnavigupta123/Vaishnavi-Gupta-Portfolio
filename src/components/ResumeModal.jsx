import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, ExternalLink, X } from 'lucide-react'
import { profile } from '../data/content'

/**
 * In-page resume viewer. Embeds the PDF so visitors never leave the page,
 * with Download and Open-in-new-tab as escape hatches (some mobile browsers
 * refuse to render a PDF in an iframe).
 */
export default function ResumeModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[85] grid place-items-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Resume"
    >
      <div className="absolute inset-0 bg-ink-950/85 backdrop-blur-xl" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl glass-strong"
      >
        {/* header */}
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <h2 className="font-display text-base font-semibold text-white sm:text-lg">
              View Resume
            </h2>
            <p className="mt-0.5 truncate text-[12.5px] text-slate-400">
              {profile.name} — {profile.role}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/[0.04] px-3 py-2 text-[13px] font-medium text-slate-200 transition-all duration-300 hover:border-accent/50 hover:text-white"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download</span>
            </a>

            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/[0.04] px-3 py-2 text-[13px] font-medium text-slate-200 transition-all duration-300 hover:border-accent/50 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">Open</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume"
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/12 bg-white/[0.04] text-slate-400 transition-colors hover:border-white/30 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* document */}
        <div className="relative flex-1 bg-slate-200">
          <iframe
            src={`${profile.resumeUrl}#view=FitH`}
            title={`${profile.name} resume`}
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>

        {/* fallback for browsers that will not embed a PDF */}
        <p className="border-t border-white/[0.08] px-5 py-2.5 text-center text-[11.5px] text-slate-500 sm:hidden">
          Not loading?{' '}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="text-accent underline underline-offset-2"
          >
            Open the PDF directly
          </a>
        </p>
      </motion.div>
    </motion.div>
  )
}
