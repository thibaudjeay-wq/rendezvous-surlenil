'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Mail, X } from 'lucide-react'
import { getWhatsAppUrl, CONTACT_EMAIL } from '@/lib/constants'

interface ContactButtonProps {
  label?: string
  whatsappMessage?: string
  className?: string
  style?: React.CSSProperties
  variant?: 'primary' | 'secondary'
}

export default function ContactButton({
  label = 'Écrire à Sophie →',
  whatsappMessage,
  className = '',
  style,
  variant = 'primary',
}: ContactButtonProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const whatsappUrl = getWhatsAppUrl(whatsappMessage)
  const emailUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Projet de voyage en Égypte")}&body=${encodeURIComponent("Bonjour Sophie,\n\nJe souhaite échanger avec vous sur un projet de voyage en Égypte.\n\nCordialement,")}`

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        className={className || `btn btn-${variant}`}
        style={style}
        type="button"
      >
        {label}
      </button>

      {open && (
        <div
          className="absolute left-0 mt-2 z-50 bg-[#FAF7F2] border border-[#E8D5B7] rounded-sm shadow-xl overflow-hidden"
          style={{ minWidth: '220px' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#E8D5B7]">
            <span className="text-xs font-medium tracking-wide uppercase text-[#5C6E7E]">
              Choisissez votre moyen
            </span>
            <button onClick={() => setOpen(false)} className="text-[#5C6E7E] hover:text-[#0F3D38]">
              <X size={14} />
            </button>
          </div>

          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3.5 hover:bg-[#F5ECD7] transition-colors group"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#25D366]/10 text-[#25D366] flex-shrink-0">
              <MessageCircle size={16} />
            </span>
            <div>
              <p className="text-sm font-medium text-[#0F3D38] group-hover:text-[#C4902A] transition-colors">
                Via WhatsApp
              </p>
              <p className="text-xs text-[#5C6E7E]">Réponse sous 24h</p>
            </div>
          </a>

          {/* Email */}
          <a
            href={emailUrl}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3.5 hover:bg-[#F5ECD7] transition-colors group border-t border-[#E8D5B7]/60"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#C4902A]/10 text-[#C4902A] flex-shrink-0">
              <Mail size={16} />
            </span>
            <div>
              <p className="text-sm font-medium text-[#0F3D38] group-hover:text-[#C4902A] transition-colors">
                Par e-mail
              </p>
              <p className="text-xs text-[#5C6E7E]">{CONTACT_EMAIL}</p>
            </div>
          </a>
        </div>
      )}
    </div>
  )
}
