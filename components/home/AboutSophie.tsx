import Image from 'next/image'
import Link from 'next/link'
import { getWhatsAppUrl } from '@/lib/constants'

export default function AboutSophie() {
  return (
    <section
      className="py-20 md:py-28"
      style={{ background: '#FDF8F0' }}
      aria-labelledby="about-sophie-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Texte, gauche */}
          <div className="order-2 lg:order-1">
            <p className="eyebrow mb-4">Deux personnes. Un pays. Un réseau construit sur le terrain.</p>
            <h2
              id="about-sophie-heading"
              className="text-display-lg title-underline mb-8"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#0F3D38' }}
            >
              Sophie & Nasser
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 300 }}>ce que les agences ne peuvent pas proposer</em>
            </h2>

            <p className="leading-relaxed mb-5" style={{ color: '#5C6E7E', fontSize: '1.0625rem' }}>
              Sophie connaît l&apos;Égypte de l&apos;intérieur, elle y revient sans cesse depuis des années,
              et c&apos;est là que tout a commencé. Nasser, son partenaire égyptien, est né sur la rive est
              de Louxor. Il connaît chaque guide, chaque gardien de temple qui mérite qu&apos;on lui serre
              la main, chaque dahabiya, chaque chauffeur dont le sourire dans le rétroviseur dit, sans un
              mot, que vous êtes entre de bonnes mains.
            </p>
            <p className="leading-relaxed mb-8" style={{ color: '#5C6E7E', fontSize: '1.0625rem' }}>
              Ce que vous choisissez, ce n&apos;est pas un itinéraire. C&apos;est leur carnet d&apos;adresses,
              et un réseau de confiance construit sur le long terme. Des voyageurs là où les circuits
              classiques ne vont jamais. Pas parce que c&apos;est difficile d&apos;accès. Parce que
              ça ne s&apos;improvise pas sans confiance.
            </p>

            {/* Citation */}
            <blockquote
              className="relative pl-6 mb-10"
              style={{ borderLeft: '2px solid #C4902A' }}
            >
              <p
                className="text-lg italic leading-relaxed"
                style={{ fontFamily: 'Cormorant Garamond', color: '#1E6860', fontWeight: 400 }}
              >
                &ldquo;Ce que vous choisissez, ce n&apos;est pas un produit. C&apos;est l&apos;expérience
                de deux personnes qui ont l&apos;Égypte dans les mains.&rdquo;
              </p>
              <footer className="mt-3 text-xs font-medium tracking-wide" style={{ color: '#8A9BAB' }}>
               — Sophie
              </footer>
            </blockquote>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/sophie" className="btn btn-secondary">
                Découvrir leur histoire
              </Link>
              <a
                href={getWhatsAppUrl('Bonjour Sophie, je souhaite échanger avec vous sur un projet de voyage en Égypte. Pouvez-vous me dire quand vous êtes disponible ? 🌿')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{ color: '#C4902A', borderColor: '#C4902A' }}
                title="Écrire à Sophie Godineau, travel planner Égypte francophone"
              >
                Écrire à Sophie →
              </a>
            </div>
          </div>

          {/* Photo, droite */}
          <div className="order-1 lg:order-2 relative">
            <div className="img-portrait-lg overflow-hidden rounded-sm img-zoom">
              <Image
                src="/photos/sophie/sophie-nasser-marche.jpg"
                alt="Sophie Godineau et Nasser, travel planners en Égypte, Rendez-vous sur le Nil"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                style={{ objectPosition: 'center top' }}
              />
            </div>

            {/* Encadré stats */}
            <div
              className="absolute -bottom-4 left-2 md:-left-8 p-5 shadow-lg"
              style={{
                background: '#FAF7F2',
                border: '1px solid #E8D5B7',
                borderRadius: '2px',
                minWidth: '180px',
              }}
            >
              <div className="flex flex-col gap-3">
                <div>
                  <p
                    className="text-2xl font-light"
                    style={{ fontFamily: 'Cormorant Garamond', color: '#C4902A' }}
                  >
                    Terrain
                  </p>
                  <p className="text-xs" style={{ color: '#8A9BAB' }}>connaissance intime</p>
                </div>
                <div style={{ width: '30px', height: '1px', background: '#E8D5B7' }} />
                <div>
                  <p
                    className="text-2xl font-light"
                    style={{ fontFamily: 'Cormorant Garamond', color: '#C4902A' }}
                  >
                    +100
                  </p>
                  <p className="text-xs" style={{ color: '#8A9BAB' }}>voyageurs ravis</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
