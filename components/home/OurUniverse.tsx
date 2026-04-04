import Image from 'next/image'
import Link from 'next/link'
import { Ship, Sparkles, Crown, Map, Compass, Home } from 'lucide-react'

const experiences = [
  {
    icon: Ship,
    label: 'Croisières Dahabiya',
    description: 'Le Nil à bord d\'un voilier traditionnel, en petit groupe ou privatisé',
    href: '/croisieres-dahabiya',
    image: '/photos/dahabiya/pont-jacuzzi-nil.jpg',
    tag: null,
  },
  {
    icon: Sparkles,
    label: 'Séjours Signature',
    description: 'Nos séjours curatés, entre temples et douceur égyptienne',
    href: '/sejours/signature',
    image: '/photos/signature/karnak-colonnes.jpg',
    tag: null,
  },
  {
    icon: Crown,
    label: 'Séjours Privilèges',
    description: 'Séjours thématiques en petit groupe, animés par Sophie',
    href: '/sejours/privileges',
    image: '/photos/privileges/siwa-lac-turquoise.jpg',
    tag: null,
  },
  {
    icon: Map,
    label: 'Travel Planner',
    description: 'Votre Égypte, imaginée ensemble, exactement comme vous la rêvez',
    href: '/sur-mesure',
    image: '/photos/sophie/sophie-portrait.jpg',
    tag: null,
  },
  {
    icon: Compass,
    label: 'Escapades Sérénité',
    description: 'Caire, Siwa, désert blanc, l\'Égypte immersive à votre rythme',
    href: '/sejours/escapades-serenite',
    image: '/photos/voyageurs/femme-coucher-siwa.jpg',
    tag: null,
  },
  {
    icon: Home,
    label: 'La Thébaïde, Louxor',
    description: 'Notre duplex à Louxor, rive est, 4 chambres, rooftop panoramique',
    href: '/la-thebaide',
    image: '/photos/thebaide/rooftop-femme-the.jpg',
    tag: null,
  },
]

export default function OurUniverse() {
  return (
    <section
      className="py-20 md:py-28"
      style={{ background: '#FDF8F0' }}
      aria-labelledby="universe-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header section */}
        <div className="text-center mb-14">
          <p className="eyebrow mb-4">Notre univers</p>
          <h2
            id="universe-heading"
            className="text-display-lg title-underline title-underline-center"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: '#0F3D38' }}
          >
            Choisissez votre façon de vivre l&apos;Égypte
          </h2>
        </div>

        {/* Grille */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {experiences.map(({ icon: Icon, label, description, href, image, tag }) => (
            <Link
              key={href}
              href={href}
              className="card group relative overflow-hidden block"
              style={{ borderRadius: '4px' }}
            >
              {/* Image */}
              <div className="img-section">
                <Image
                  src={image}
                  alt={label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="img-overlay-warm" />

                {/* Badge tag */}
                {tag && (
                  <span
                    className="absolute top-4 left-4 text-[10px] font-semibold tracking-[0.14em] uppercase px-3 py-1 rounded-sm z-10"
                    style={{ background: '#C4902A', color: 'white' }}
                  >
                    {tag}
                  </span>
                )}

                {/* Icône flottante */}
                <div
                  className="absolute bottom-4 right-4 w-9 h-9 rounded-full flex items-center justify-center z-10"
                  style={{ background: 'rgba(13,33,55,0.6)', backdropFilter: 'blur(4px)' }}
                >
                  <Icon size={16} color="#C4902A" aria-hidden="true" />
                </div>
              </div>

              {/* Texte */}
              <div className="p-5">
                <h3
                  className="font-medium mb-1.5 transition-colors duration-200 group-hover:text-[#C4902A]"
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '1.125rem',
                    color: '#0F3D38',
                  }}
                >
                  {label}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5C6E7E' }}>
                  {description}
                </p>
                <span
                  className="inline-flex items-center gap-1 text-xs font-medium mt-3 transition-colors group-hover:text-[#C4902A]"
                  style={{ color: '#C4902A', letterSpacing: '0.06em' }}
                >
                  Explorer →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
