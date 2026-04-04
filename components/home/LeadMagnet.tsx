import Link from 'next/link'
import { CheckCircle, BookOpen } from 'lucide-react'

const benefits = [
  'Les erreurs fréquentes à éviter avant et pendant le voyage',
  'Ce qu\'elle conseille vraiment, sans langue de bois',
  'Ses conseils d\'experte pour bien choisir votre formule',
]

export default function LeadMagnet() {
  return (
    <section
      aria-labelledby="lead-magnet-heading"
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #2A5A54 0%, #0F3D38 60%, #2A5A54 100%)',
        padding: 'clamp(40px, 8vw, 80px) 0',
      }}
    >
      {/* Décoration */}
      <div
        className="absolute top-0 left-0 w-80 h-80 opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #C4902A 0%, transparent 70%)',
          transform: 'translate(-30%, -30%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #C4902A 0%, transparent 70%)',
          transform: 'translate(30%, 30%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* Icône/Visuel */}
          <div className="flex-shrink-0">
            <div
              className="w-28 h-36 md:w-32 md:h-44 rounded-sm flex flex-col items-center justify-center shadow-xl relative"
              style={{
                background: 'linear-gradient(145deg, #C4902A, #C4902A)',
                boxShadow: '8px 8px 0px rgba(201,169,110,0.2), 0 20px 40px rgba(0,0,0,0.3)',
              }}
              aria-hidden="true"
            >
              <BookOpen size={36} color="white" style={{ opacity: 0.9 }} />
              <p className="text-white text-xs font-medium text-center mt-3 px-2 leading-tight" style={{ fontSize: '0.625rem', letterSpacing: '0.06em' }}>
                GUIDE<br />GRATUIT
              </p>
              <div
                className="absolute right-0 top-2 bottom-2 w-2 rounded-r-sm"
                style={{ background: 'rgba(255,255,255,0.2)' }}
              />
            </div>
          </div>

          {/* Texte */}
          <div className="flex-1 text-center md:text-left">
            <p className="eyebrow mb-3" style={{ color: '#C4902A' }}>Avant de choisir votre voyage</p>
            <h2
              id="lead-magnet-heading"
              className="mb-4"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                color: '#FAF7F2',
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              L&apos;art de voyager en Égypte
              <br />
              <em style={{ color: '#CE8D5C', fontWeight: 300, fontStyle: 'italic' }}>le guide gratuit de Sophie</em>
            </h2>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: '#8A9BAB', maxWidth: '480px' }}>
              Les erreurs à ne pas commettre, des suggestions d&apos;itinéraires
              et ses conseils d&apos;experte. Ce qu&apos;elle partage avec ceux qui lui font confiance.
            </p>

            <ul className="flex flex-col gap-2 mb-8 items-center md:items-start">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <CheckCircle size={14} style={{ color: '#C4902A', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                  <span className="text-sm text-left" style={{ color: '#D4B896' }}>{b}</span>
                </li>
              ))}
            </ul>

            <Link href="/guide-egypte" className="btn btn-primary inline-flex">
              Recevoir le guide gratuitement →
            </Link>
            <p className="mt-3 text-xs" style={{ color: 'rgba(138,155,171,0.7)' }}>
              Pas de spam. Juste ce qui vaut la peine d&apos;être lu.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
