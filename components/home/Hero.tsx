'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getWhatsAppUrl } from '@/lib/constants'

const HERO_WHATSAPP = getWhatsAppUrl(
  "Bonjour Sophie, j'ai découvert Rendez-vous sur le Nil et je souhaite échanger avec vous sur un projet de voyage en Égypte. Pouvez-vous me dire quand vous êtes disponible pour un appel ?"
)

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return
      const y = window.scrollY * 0.4
      parallaxRef.current.style.transform = `translateY(${y}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '100svh' }}
      aria-label="Bienvenue sur Rendez-vous sur le Nil"
    >
      {/* Background image avec parallax */}
      <div className="absolute inset-0 z-0">
        <div
          ref={parallaxRef}
          className="absolute inset-0 scale-110"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <Image
            src="/photos/hero/hero-nil.jpg"
            alt="Coucher de soleil sur le Nil, Louxor, Égypte, Rendez-vous sur le Nil"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'brightness(0.82)' }}
          />
        </div>
        <div className="img-overlay-hero" />
      </div>

      {/* Contenu hero */}
      <div
        className="relative z-10 flex flex-col justify-end h-full px-6 md:px-16 pb-20 md:pb-28 max-w-[1200px] mx-auto"
        style={{ minHeight: '100svh' }}
      >
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="animate-hero-line" style={{ width: '32px', height: '1px', background: '#C4902A' }} />
            <span className="eyebrow animate-hero-eyebrow" style={{ color: '#CE8D5C' }}>
              Voyages premium en Égypte
            </span>
          </div>

          {/* H1 */}
          <h1
            className="text-display-2xl mb-6 animate-hero-title"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              color: 'white',
              fontWeight: 300,
              lineHeight: 1.08,
            }}
          >
            L&apos;Égypte que vous
            <br />
            <em style={{ fontStyle: 'italic', fontWeight: 400 }}>
              n&apos;avez pas encore vue.
            </em>
          </h1>

          {/* Sous-titre */}
          <p
            className="text-base md:text-lg leading-relaxed mb-10 animate-hero-sub"
            style={{ color: 'rgba(250, 247, 242, 0.85)', maxWidth: '520px', fontWeight: 300 }}
          >
            Sophie connaît l&apos;Égypte de l&apos;intérieur depuis plus de dix ans. Nasser y est né.
            Ensemble, ils ont construit quelque chose que les tour-opérateurs ne peuvent pas vendre :
            une relation de confiance avec un pays qui leur appartient un peu.
          </p>

          {/* Ancre réalité */}
          <p
            className="mb-8 text-sm font-medium animate-hero-anchor"
            style={{ color: 'rgba(201,169,110,0.9)', letterSpacing: '0.03em' }}
          >
            Spécialiste de l&apos;Égypte. Chaque voyage pensé sur mesure.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4 animate-hero-ctas">
            <a
              href={HERO_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              title="Écrire à Sophie Godineau, travel planner Égypte francophone"
            >
              Écrire à Sophie →
            </a>
            <Link
              href="/croisieres-dahabiya"
              className="btn btn-secondary"
              style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}
            >
              Découvrir la dahabiya
            </Link>
          </div>

          {/* Réassurance + social proof */}
          <div className="animate-hero-social">
            <p className="text-xs mb-3" style={{ color: 'rgba(250,247,242,0.5)' }}>
              Réponse sous 24h, en français
            </p>
            <p
              className="text-sm italic"
              style={{ color: 'rgba(226,201,154,0.85)', fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1rem' }}
            >
              &ldquo;Le voyage de ma vie. Je n&apos;aurais pas su organiser ça seul.&rdquo;
              <span className="not-italic ml-2" style={{ color: 'rgba(250,247,242,0.5)', fontSize: '0.8125rem', fontFamily: 'inherit' }}>
               , Marc, Paris
              </span>
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
          aria-hidden="true"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'white' }}>
            Découvrir
          </span>
          <div
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, white, transparent)',
              animation: 'float 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  )
}
