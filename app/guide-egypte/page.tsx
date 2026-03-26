import type { Metadata } from 'next'
import GuideForm from './GuideForm'
import { CheckCircle, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Guide Égypte gratuit, Téléchargez le guide de Sophie',
  description:
    'Sophie Godineau partage son guide complet pour voyager en Égypte : destinations, conseils, budget, dahabiya... Téléchargez-le gratuitement.',
  robots: { index: true, follow: true },
}

const benefits = [
  "Les sites que Sophie fait visiter, et ceux qu'elle évite",
  "Quelle saison choisir selon ce que vous cherchez vraiment",
  "Dahabiya, séjour ou sur mesure : comment choisir sans se tromper",
  "Ce que les agences classiques ne vous diront jamais",
  "Les adresses de confiance de la rive ouest à Siwa",
  "Comment préparer votre voyage sans stress, de A à Z",
]

export default function GuidePage() {
  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh' }}>
      {/* Hero section */}
      <section
        className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
        style={{ background: 'linear-gradient(135deg, #0F3D38 0%, #2A5A54 100%)' }}
      >
        {/* Décoration */}
        <div
          className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #C4902A 0%, transparent 70%)', transform: 'translate(20%, -20%)' }}
          aria-hidden="true"
        />

        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Texte */}
            <div>
              <p className="eyebrow mb-4" style={{ color: '#C4902A' }}>Offert par Sophie</p>
              <h1
                className="text-display-xl mb-6"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#FAF7F2', fontWeight: 300 }}
              >
                Le Guide Égypte
                <br />
                <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#CE8D5C' }}>de Sophie</em>
              </h1>
              <p className="text-lg mb-8" style={{ color: 'rgba(250,247,242,0.75)', fontWeight: 300 }}>
                Tout ce qu&apos;il faut savoir avant de partir en Égypte, par quelqu&apos;un qui y vit depuis plus de dix ans.
              </p>

              <ul className="flex flex-col gap-3 mb-10">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <CheckCircle size={15} style={{ color: '#C4902A', flexShrink: 0 }} aria-hidden="true" />
                    <span className="text-sm" style={{ color: '#D4B896' }}>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Signature Sophie */}
              <div className="flex items-center gap-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div
                  className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
                  style={{ border: '2px solid #C4902A' }}
                >
                  <img
                    src="/photos/sophie/sophie-portrait.jpg"
                    alt="Sophie Godineau"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: '#FAF7F2' }}>Sophie Godineau</p>
                  <p className="text-xs" style={{ color: '#8A9BAB' }}>Co-fondatrice, guide francophone en Égypte</p>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div
              className="rounded-sm p-8 md:p-10 shadow-2xl"
              style={{ background: '#FAF7F2', border: '1px solid #E8D5B7' }}
            >
              {/* Visuel guide */}
              <div className="flex justify-center mb-8">
                <div
                  className="w-24 h-32 rounded-sm flex flex-col items-center justify-center shadow-lg relative"
                  style={{
                    background: 'linear-gradient(145deg, #C4902A, #C4902A)',
                    boxShadow: '6px 6px 0px rgba(184,131,42,0.2), 0 16px 32px rgba(0,0,0,0.15)',
                  }}
                  aria-hidden="true"
                >
                  <BookOpen size={32} color="white" style={{ opacity: 0.9 }} />
                  <p className="text-white text-center mt-2 leading-tight" style={{ fontSize: '0.55rem', letterSpacing: '0.08em' }}>
                    GUIDE<br />ÉGYPTE
                  </p>
                  <div className="absolute right-0 top-2 bottom-2 w-1.5 rounded-r-sm" style={{ background: 'rgba(255,255,255,0.2)' }} />
                </div>
              </div>

              <h2
                className="text-center mb-2"
                style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.375rem', color: '#0F3D38', fontWeight: 400 }}
              >
                Recevez votre guide gratuit
              </h2>
              <p className="text-center text-sm mb-8" style={{ color: '#8A9BAB' }}>
                Accès immédiat après votre inscription.
              </p>

              <GuideForm />
            </div>
          </div>
        </div>
      </section>

      {/* Section réassurance */}
      <section className="py-14" style={{ background: '#FDF8F0' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm leading-relaxed" style={{ color: '#8A9BAB' }}>
            🔒 Vos données sont protégées et ne seront jamais revendues.
            En vous inscrivant, vous acceptez de recevoir ce guide ainsi que de rares communications de Rendez-vous sur le Nil.
            Vous pouvez vous désinscrire à tout moment en un clic.{' '}
            <a href="/politique-confidentialite" className="underline hover:text-[#C4902A] transition-colors" style={{ color: '#5C6E7E' }}>
              Politique de confidentialité
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
