import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Home, Sun, Coffee, Moon, Stars, Ship, ChevronDown } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'La Thébaïde, Maison d\'hôtes à Louxor, rive est',
  description:
    'La Thébaïde est le duplex de Sophie & Nasser à Louxor, rive est. 4 chambres climatisées, rooftop panoramique sur le Nil. Le point d\'ancrage de tous vos séjours en Égypte.',
  alternates: { canonical: 'https://rendezvous-surlenil.com/la-thebaide' },
  openGraph: {
    title: 'La Thébaïde, Maison d\'hôtes à Louxor | Rendez-vous sur le Nil',
    description: 'Un duplex soigneusement décoré sur la rive est de Louxor, ouvert toute l\'année. 4 chambres climatisées, rooftop panoramique sur le Nil. La maison de Sophie & Nasser.',
    images: [{ url: 'https://images.unsplash.com/photo-1609188076864-c35269136dc4?w=1200&q=85', width: 1200, height: 630, alt: 'La Thébaïde, maison d\'hôtes à Louxor, rive est' }],
  },
}

// JSON-LD, LodgingBusiness
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'La Thébaïde',
  description: 'Duplex soigneusement décoré sur la rive est de Louxor, tenu par Sophie Godineau et Nasser. 4 chambres climatisées, rooftop panoramique sur le Nil. Ouvert toute l\'année.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Louxor',
    addressCountry: 'EG',
  },
  url: 'https://rendezvous-surlenil.com/la-thebaide',
  image: 'https://images.unsplash.com/photo-1609188076864-c35269136dc4?w=1200&q=85',
  priceRange: '€€€',
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Vue panoramique sur le Nil et Louxor', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Terrasse', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Jardin', value: true },
  ],
}

const espaces = [
  {
    icon: Sun,
    label: 'Le jardin',
    description:
      'Un carré de verdure improbable entre les champs de canne à sucre et les murs ocre. Bougainvilliers, palmiers, un grenadier. Le matin, le café s\'y déguste sous les bougainvilliers. Le soir, les oiseaux.',
  },
  {
    icon: Home,
    label: 'Le salon',
    description:
      'Poutres ancienne, mashrabiya, kilims berbères et jarres en terre cuite. Un espace où le temps ralentit, conçu pour lire, parler, ou simplement être là. Pas une réception d\'hôtel.',
  },
  {
    icon: Coffee,
    label: 'Les chambres',
    description:
      'Quatre chambres raffinées et climatisées, chacune avec salle de bain privée, hauts plafonds, linge de lit en coton égyptien, lumière maîtrisée. Chaque chambre a sa propre personnalité, choisie avec soin.',
  },
  {
    icon: Moon,
    label: 'La terrasse du toit',
    description:
      'Vue panoramique sur le Nil et les toits de Louxor. Au coucher du soleil, le ciel au-dessus des collines de l\'Ouest prend des teintes qu\'on ne voit nulle part ailleurs. La terrasse est à vous, le thé monte d\'en bas, les étoiles font le reste.',
  },
  {
    icon: Stars,
    label: 'La cuisine',
    description:
      'Pas de restaurant. Pas de menu plastifié. La cuisine propose des plats égyptiens de saison, ful, koshary, grillades d\'agneau, desserts au miel, avec les produits du marché local.',
  },
]

const moments = [
  {
    time: 'L\'aube',
    description:
      'L\'appel à la prière résonne depuis la mosquée du quartier. La lumière dorée envahit les toits de Louxor, les minarets, le Nil. C\'est l\'heure où la ville appartient encore à ceux qui savent se lever tôt.',
  },
  {
    time: 'Le matin',
    description:
      'Petit-déjeuner dans le jardin. Fromage blanc local, pain baladi tout chaud, miel de canne, jus de citron pressé. La maison vous invite à préparer votre journée à votre rythme.',
  },
  {
    time: 'L\'après-midi',
    description:
      'C\'est le moment du calme. Les volets fermés, la peau encore chaude des temples du matin. Une sieste, un livre. Dehors, les fellahs continuent leur travail dans les champs.',
  },
  {
    time: 'Le soir',
    description:
      'La terrasse. Un verre de jus de grenade. Le ciel change toutes les minutes au-dessus de la Vallée des Rois, violet, orange, nuit. On raconte l\'Égypte. Vous écoutez.',
  },
]

const faq = [
  {
    q: 'La Thébaïde est-elle accessible toute l\'année ?',
    a: 'Oui, La Thébaïde est ouverte toute l\'année. La maison est entièrement climatisée, ce qui la rend confortable même en été. Écrivez à Sophie pour vérifier les disponibilités à vos dates.',
  },
  {
    q: 'Combien de voyageurs peut accueillir La Thébaïde ?',
    a: 'La Thébaïde est un duplex privé avec 4 chambres, chacune avec sa propre salle de bain. Elle est réservée exclusivement aux voyageurs de Rendez-vous sur le Nil. C\'est cette intimité qui en fait l\'essence : vous ne croisez jamais des inconnus.',
  },
  {
    q: 'Peut-on séjourner à La Thébaïde sans passer par un séjour organisé ?',
    a: 'La Thébaïde peut être réservée comme hébergement seul, mais Sophie vous encouragera toujours à profiter de ce qu\'elle et Nasser peuvent vous faire découvrir. C\'est un point de départ, pas juste une chambre.',
  },
  {
    q: 'Où se trouve exactement La Thébaïde ?',
    a: 'Sur la rive est de Louxor, à 10 minutes de l\'aéroport et à quelques minutes à pied du temple de Karnak et du Nil. Un transfert est organisé à votre arrivée, pas besoin de chercher.',
  },
]

export default function LaThebaidePage() {
  const whatsappUrl = getWhatsAppUrl(
    'Bonjour Sophie, je suis intéressé(e) par un séjour à La Thébaïde à Louxor. Pouvez-vous me donner les disponibilités et les tarifs ? 🏡'
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '90vh' }}>
        <div className="absolute inset-0">
          <Image
            src="/photos/thebaide/thebaide-hero.jpg"
            alt="La Thébaïde, rooftop panoramique sur Louxor"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'brightness(0.72)', objectPosition: 'center 60%' }}
          />
          {/* Overlay progressif, léger en haut, dense en bas */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(13,33,55,0.1) 0%, rgba(13,33,55,0.08) 35%, rgba(13,33,55,0.6) 75%, rgba(13,33,55,0.92) 100%)',
            }}
          />
          {/* Grain texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            }}
          />
        </div>

        {/* Breadcrumb */}
        <nav
          className="absolute top-28 left-6 md:left-16 flex items-center gap-2 text-xs z-10"
          style={{ color: 'rgba(255,255,255,0.55)' }}
          aria-label="Fil d'Ariane"
        >
          <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
          <span>/</span>
          <span style={{ color: 'rgba(255,255,255,0.85)' }}>La Thébaïde</span>
        </nav>

        {/* Contenu hero */}
        <div
          className="relative z-10 flex flex-col justify-end px-6 md:px-16 pb-20 md:pb-32 max-w-[1200px] mx-auto"
          style={{ minHeight: '90vh' }}
        >
          <div className="max-w-3xl">
            {/* Label lieu */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm" style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.35)' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#C4902A' }} />
                <span className="text-[10px] font-medium tracking-[0.18em] uppercase" style={{ color: '#CE8D5C' }}>
                  Louxor · Rive est
                </span>
              </div>
            </div>

            <h1
              className="mb-6"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                color: 'white',
                fontWeight: 300,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
              }}
            >
              La Thébaïde
            </h1>

            <p
              className="text-xl md:text-2xl mb-5"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                color: '#CE8D5C',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.35,
              }}
            >
              Ici, vous êtes chez nous.
            </p>

            <p
              className="text-base md:text-lg mb-12 max-w-xl"
              style={{ color: 'rgba(250,247,242,0.80)', fontWeight: 300, lineHeight: 1.75 }}
            >
              Un duplex soigneusement décoré sur la rive est de Louxor, à deux pas du Nil et de Karnak.
              Le point d&apos;ancrage de l&apos;univers Rendez-vous sur le Nil, et l&apos;endroit où l&apos;Égypte commence à vous appartenir vraiment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Demander les disponibilités
              </a>
              <a
                href="#ame"
                className="btn btn-secondary"
                style={{ color: 'white', borderColor: 'rgba(255,255,255,0.45)' }}
              >
                Découvrir le lieu
              </a>
            </div>
          </div>
        </div>

        {/* Indicateur scroll */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          style={{ color: 'rgba(255,255,255,0.4)' }}
          aria-hidden="true"
        >
          <div
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, rgba(201,169,110,0.7), transparent)',
            }}
          />
        </div>
      </section>

      {/* ─── L'âme du lieu ─────────────────────────────────── */}
      <section
        id="ame"
        className="py-24 md:py-36"
        style={{ background: '#FAF7F2' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

            {/* Texte, plus large */}
            <div className="lg:col-span-7">
              <p className="eyebrow mb-5">L&apos;âme du lieu</p>
              <h2
                className="title-underline mb-10"
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                  color: '#0F3D38',
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                Une maison, pas un hôtel.
                <br />
                <em style={{ fontWeight: 300, fontStyle: 'italic' }}>C&apos;est toute la différence.</em>
              </h2>

              <div className="space-y-5" style={{ maxWidth: '560px' }}>
                <p className="leading-relaxed" style={{ color: '#3D5166', fontSize: '1.0625rem' }}>
                  La Thébaïde porte deux noms en un. Celui de la Thébaïde égyptienne, ce territoire antique autour de l&apos;ancienne Thèbes, la ville aux cent portes, aujourd&apos;hui Louxor. Et celui que les mystiques du désert donnaient à leurs refuges : un lieu retiré du monde, propice au silence et à la contemplation.
                </p>
                <p className="leading-relaxed" style={{ color: '#3D5166', fontSize: '1.0625rem' }}>
                  C&apos;est la maison de Nasser. Ce n&apos;est pas une propriété gérée à distance. Quand vous y séjournez, vous êtes ses hôtes. La différence se ressent dès la première heure : il y a des livres sur les étagères, des photos de famille dans l&apos;entrée, un chat qui dort sur la terrasse.
                </p>
                <p className="leading-relaxed" style={{ color: '#3D5166', fontSize: '1.0625rem' }}>
                  La rive est de Louxor, c&apos;est le cœur de la cité des pharaons : Karnak, le temple de Louxor, le Nil à portée de main. Et depuis le rooftop de La Thébaïde, la vue s&apos;étend jusqu&apos;aux collines de la Vallée des Rois à l&apos;horizon.
                </p>
              </div>

              {/* Stat pills */}
              <div className="flex flex-wrap gap-3 mt-10">
                {[
                  'Rive est de Louxor',
                  'Duplex privé',
                  '4 chambres avec SDB privées',
                  'Ouverte toute l\'année',
                  'Accueil personnalisé',
                ].map((item) => (
                  <span
                    key={item}
                    className="text-[11px] font-medium px-3 py-1.5 rounded-sm"
                    style={{ background: '#FDF8F0', color: '#5C6E7E', border: '1px solid #E8D5B7' }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Galerie portrait + carré */}
            <div className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-28">
              <div className="img-portrait-lg overflow-hidden rounded-sm">
                <Image
                  src="/photos/thebaide/rooftop-femme-the.png"
                  alt="La Thébaïde, rooftop panoramique avec vue sur Louxor"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="img-square overflow-hidden rounded-sm">
                  <Image
                    src="/photos/thebaide/chambre-noire.png"
                    alt="Chambre noire de La Thébaïde à Louxor"
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                </div>
                <div className="img-square overflow-hidden rounded-sm">
                  <Image
                    src="/photos/thebaide/rooftop-transats.png"
                    alt="Transats et pergola sur le rooftop de La Thébaïde"
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Les espaces ───────────────────────────────────── */}
      <section
        className="py-24 md:py-32"
        style={{ background: '#FDF8F0' }}
        aria-labelledby="espaces-heading"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="max-w-lg mb-16">
            <p className="eyebrow mb-4">Les espaces</p>
            <h2
              id="espaces-heading"
              className="title-underline"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(1.625rem, 3vw, 2.5rem)',
                color: '#0F3D38',
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              Chaque pièce a
              <br />
              <em style={{ fontWeight: 300, fontStyle: 'italic' }}>son histoire.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {espaces.map(({ icon: Icon, label, description }, i) => (
              <div
                key={label}
                className={`p-7 rounded-sm ${i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                style={{ background: 'white', border: '1px solid #E8D5B7' }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-5"
                  style={{ background: '#FDF8F0', border: '1px solid #E8D5B7' }}
                >
                  <Icon size={17} style={{ color: '#C4902A' }} aria-hidden="true" />
                </div>
                <h3
                  className="mb-3"
                  style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.25rem', color: '#0F3D38', fontWeight: 500 }}
                >
                  {label}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5C6E7E', lineHeight: 1.8 }}>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Une journée à La Thébaïde ──────────────────────── */}
      <section
        className="py-24 md:py-32"
        style={{ background: '#0F3D38' }}
        aria-labelledby="journee-heading"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Image */}
            <div className="img-portrait overflow-hidden rounded-sm">
              <Image
                src="/photos/thebaide/salle-manger.jpg"
                alt="Salle à manger de La Thébaïde, Louxor"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                style={{ objectPosition: 'center 40%' }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(13,33,55,0.18) 0%, transparent 50%)',
                }}
              />
            </div>

            {/* Timeline */}
            <div>
              <p className="eyebrow mb-4" style={{ color: '#C4902A' }}>Le rythme de la maison</p>
              <h2
                id="journee-heading"
                className="mb-12"
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(1.625rem, 3vw, 2.5rem)',
                  color: '#FAF7F2',
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                Une journée
                <br />
                <em style={{ fontWeight: 300, fontStyle: 'italic', color: '#CE8D5C' }}>comme nulle part ailleurs.</em>
              </h2>

              <div className="flex flex-col gap-0">
                {moments.map(({ time, description }, i) => (
                  <div key={time} className="flex gap-6">
                    {/* Timeline */}
                    <div className="flex flex-col items-center">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                        style={{ background: '#C4902A' }}
                      />
                      {i < moments.length - 1 && (
                        <div
                          style={{ width: '1px', flex: 1, background: 'rgba(201,169,110,0.2)', minHeight: '32px', margin: '6px 0' }}
                        />
                      )}
                    </div>

                    {/* Contenu */}
                    <div className="pb-8">
                      <p
                        className="font-medium mb-1.5"
                        style={{ fontFamily: 'Cormorant Garamond', fontSize: '1rem', color: '#C4902A', letterSpacing: '0.05em' }}
                      >
                        {time}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(250,247,242,0.72)', lineHeight: 1.8 }}>
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Louxor depuis La Thébaïde ──────────────────────── */}
      <section className="py-24 md:py-32" style={{ background: '#FAF7F2' }} aria-labelledby="louxor-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="eyebrow mb-4">Louxor, vu de l&apos;intérieur</p>
            <h2
              id="louxor-heading"
              className="title-underline title-underline-center"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(1.625rem, 3vw, 2.5rem)',
                color: '#0F3D38',
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              Pourquoi la rive est
              <br />
              <em style={{ fontWeight: 300, fontStyle: 'italic' }}>est le meilleur point de départ.</em>
            </h2>
            <p className="mt-8 text-base leading-relaxed mx-auto max-w-xl" style={{ color: '#5C6E7E' }}>
              La rive est de Louxor, c&apos;est le cœur battant de la cité des pharaons. Karnak à pied, le Nil face à vous,
              et en felouque, la rive ouest et ses temples funéraires à portée de main.
            </p>
          </div>

          {/* Grille de raisons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#E8D5B7' }}>
            {[
              {
                number: '15',
                unit: 'min',
                label: 'du temple de Karnak',
                body: 'À pied depuis La Thébaïde. Le plus grand complexe religieux de l\'Antiquité, avant les foules.',
              },
              {
                number: '3 500',
                unit: 'ans',
                label: 'd\'histoire à portée de main',
                body: 'Karnak, Louxor, le musée de Louxor, la plus grande concentration de temples au monde.',
              },
              {
                number: '5',
                unit: 'min',
                label: 'en felouque pour la rive ouest',
                body: 'La Vallée des Rois, Deir el-Bahari, les Colosses, une traversée du Nil suffit. Un plaisir chaque fois.',
              },
              {
                number: '1',
                label: 'rooftop panoramique sur le Nil',
                unit: '',
                body: 'Vue à 360° depuis la terrasse : le Nil, les minarets de Louxor, et au loin les collines de la Vallée des Rois.',
              },
              {
                number: '10',
                unit: 'min',
                label: 'de l\'aéroport de Louxor',
                body: 'Arrivée et départ sans stress. Un transfert est organisé depuis l\'aéroport, pas de logistique hasardeuse.',
              },
              {
                number: '∞',
                unit: '',
                label: 'couchers de soleil à ne pas rater',
                body: 'Depuis le rooftop, le soleil descend exactement derrière les collines de la Vallée des Rois. Chaque soir.',
              },
            ].map(({ number, unit, label, body }) => (
              <div
                key={label}
                className="p-8"
                style={{ background: 'white' }}
              >
                <div className="flex items-baseline gap-1 mb-1">
                  <span
                    style={{
                      fontFamily: 'Cormorant Garamond',
                      fontSize: '2.5rem',
                      color: '#C4902A',
                      fontWeight: 300,
                      lineHeight: 1,
                    }}
                  >
                    {number}
                  </span>
                  {unit && (
                    <span
                      style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.25rem', color: '#E8D5B7', fontWeight: 300 }}
                    >
                      {unit}
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold tracking-wide uppercase mb-3" style={{ color: '#0F3D38' }}>
                  {label}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#8A9BAB' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Dans l'univers RVSLN ───────────────────────────── */}
      <section className="py-24 md:py-32" style={{ background: '#FDF8F0' }} aria-labelledby="univers-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="eyebrow mb-4">Point d&apos;ancrage</p>
              <h2
                id="univers-heading"
                className="title-underline mb-8"
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(1.625rem, 3vw, 2.5rem)',
                  color: '#0F3D38',
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                La Thébaïde dans
                <br />
                <em style={{ fontWeight: 300, fontStyle: 'italic' }}>votre voyage complet.</em>
              </h2>
              <p className="leading-relaxed mb-5" style={{ color: '#5C6E7E', fontSize: '1.0625rem' }}>
                La Thébaïde n&apos;est pas qu&apos;un hébergement. C&apos;est le lieu depuis lequel tout rayonne.
                Le matin vous partez explorer avec Sophie. Le soir vous rentrez à la maison. Entre les deux,
                Louxor vous appartient.
              </p>
              <p className="leading-relaxed mb-8" style={{ color: '#5C6E7E', fontSize: '1.0625rem' }}>
                Pour les voyageurs qui font une croisière dahabiya, La Thébaïde est souvent le point de départ
                ou d&apos;arrivée, une ou deux nuits pour s&apos;installer dans l&apos;Égypte avant d&apos;embarquer,
                ou la douceur d&apos;un retour à terre après le Nil.
              </p>

              {/* Liens */}
              <div className="flex flex-col gap-3">
                {[
                  { icon: Ship, label: 'Croisières Dahabiya, embarquement depuis Louxor', href: '/croisieres-dahabiya' },
                  { icon: Home, label: 'Séjours Signature, La Thébaïde comme point de départ', href: '/sejours/signature' },
                  { icon: Stars, label: 'Travel Planner, intégrer La Thébaïde dans votre voyage', href: '/sur-mesure' },
                ].map(({ icon: Icon, label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 p-4 rounded-sm group"
                    style={{ background: 'white', border: '1px solid #E8D5B7' }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: '#FDF8F0' }}
                    >
                      <Icon size={14} style={{ color: '#C4902A' }} aria-hidden="true" />
                    </div>
                    <span
                      className="text-sm flex-1 transition-colors group-hover:text-[#C4902A]"
                      style={{ color: '#5C6E7E' }}
                    >
                      {label}
                    </span>
                    <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#C4902A' }}>
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Grande image cinématique */}
            <div className="img-cinematic overflow-hidden rounded-sm">
              <Image
                src="/photos/dahabiya/exterieur-coucher.jpg"
                alt="Dahabiya sur le Nil au coucher de soleil depuis Louxor"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Tarifs & séjour ────────────────────────────────── */}
      <section
        className="py-20 md:py-24"
        style={{ background: '#0F3D38', borderTop: '1px solid #2A5A54' }}
        aria-labelledby="tarifs-heading"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow mb-4" style={{ color: '#C4902A' }}>Séjour & tarifs</p>
              <h2
                id="tarifs-heading"
                className="mb-6"
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(1.625rem, 3vw, 2.5rem)',
                  color: '#FAF7F2',
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                Les tarifs sont
                <br />
                <em style={{ fontWeight: 300, fontStyle: 'italic', color: '#CE8D5C' }}>communiqués sur demande.</em>
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: '#8A9BAB' }}>
                La Thébaïde ne fonctionne pas comme un hôtel en ligne. Chaque séjour se discute directement avec Sophie,
                en fonction des dates, du nombre de personnes et de comment vous souhaitez organiser votre voyage.
                Écrivez-lui sur WhatsApp pour connaître les disponibilités et les tarifs.
              </p>

              {/* Ce qui est inclus */}
              <div className="flex flex-col gap-2.5">
                {[
                  'Chambre(s) avec petit-déjeuner',
                  'Cuisine maison de Nasser (dîner sur demande)',
                  'Accès felouque pour la rive ouest (Vallée des Rois)',
                  'Transferts aéroport ou embarcadère',
                  'Conseils de Sophie, orientation quotidienne',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(250,247,242,0.75)' }}>
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#C4902A' }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA card */}
            <div
              className="p-8 rounded-sm text-center"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,169,110,0.25)' }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.3)' }}>
                <Home size={24} style={{ color: '#C4902A' }} aria-hidden="true" />
              </div>
              <h3
                className="mb-3"
                style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.5rem', color: '#FAF7F2', fontWeight: 400 }}
              >
                Réserver La Thébaïde
              </h3>
              <p className="text-sm mb-8 leading-relaxed" style={{ color: '#8A9BAB' }}>
                Écrivez à Sophie sur WhatsApp avec vos dates envisagées et le nombre de personnes.
                Elle vous répond sous 24h.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full justify-center"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }} aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Écrire à Sophie sur WhatsApp
              </a>
              <p className="mt-4 text-xs" style={{ color: 'rgba(138,155,171,0.7)' }}>
                Réponse sous 24h, en français
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: '#FAF7F2' }}>
        <div className="max-w-2xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">Questions fréquentes</p>
            <h2
              className="title-underline title-underline-center"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(1.625rem, 3vw, 2.5rem)',
                color: '#0F3D38',
                fontWeight: 400,
              }}
            >
              Tout ce que vous <em style={{ fontWeight: 300, fontStyle: 'italic' }}>voulez savoir</em>
            </h2>
          </div>
          <div className="flex flex-col gap-3 mt-10">
            {faq.map((item) => (
              <details
                key={item.q}
                className="group rounded-sm overflow-hidden"
                style={{ background: 'white', border: '1px solid #E8D5B7' }}
              >
                <summary
                  className="flex items-center justify-between px-6 py-5 cursor-pointer list-none"
                  style={{ color: '#0F3D38' }}
                >
                  <span className="font-medium text-sm pr-4">{item.q}</span>
                  <ChevronDown
                    size={16}
                    style={{ color: '#C4902A', flexShrink: 0 }}
                    className="transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="px-6 pb-5">
                  <div style={{ height: '1px', background: '#E8D5B7', marginBottom: '1rem' }} />
                  <p className="text-sm leading-relaxed" style={{ color: '#5C6E7E' }}>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Témoignages La Thébaïde ─────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: '#FDF8F0' }} aria-labelledby="temoignages-thebaide-heading">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">Ce qu&apos;ils en disent</p>
            <h2
              id="temoignages-thebaide-heading"
              className="title-underline title-underline-center"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(1.625rem, 3vw, 2.375rem)', color: '#0F3D38', fontWeight: 300, lineHeight: 1.2 }}
            >
              Chez eux, pas dans un hôtel.
              <br />
              <em style={{ fontWeight: 400, fontStyle: 'italic' }}>Ils l&apos;ont ressenti.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {[
              {
                name: 'Christine & Jean-Marc',
                quote: "La Thébaïde est un havre de paix. Merci pour l'accueil, la disponibilité et l'organisation. Une semaine merveilleuse.",
                detail: 'Séjour à La Thébaïde, Louxor',
              },
              {
                name: 'Manon',
                quote: "Je recommande la Thébaïde pour le confort, le rooftop et l'emplacement. Séjour parfait.",
                detail: 'Séjour à La Thébaïde',
              },
              {
                name: 'Anthony',
                quote: 'La Thébaïde est un logement magnifique et très confortable.',
                detail: 'La Thébaïde, Louxor',
              },
            ].map((t) => (
              <figure key={t.name} className="flex flex-col">
                <p
                  aria-hidden="true"
                  style={{ fontFamily: 'Cormorant Garamond', fontSize: '3.25rem', lineHeight: 1, color: '#E8D5B7', fontWeight: 300, marginBottom: '-0.125rem' }}
                >
                  &ldquo;
                </p>
                <blockquote
                  style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.125rem', fontStyle: 'italic', color: '#0F3D38', lineHeight: 1.7, fontWeight: 400 }}
                >
                  {t.quote}
                </blockquote>
                <figcaption style={{ marginTop: '1.25rem' }}>
                  <div style={{ width: '20px', height: '1px', background: '#C4902A', marginBottom: '0.625rem' }} />
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#C4902A', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{t.name}</p>
                  <p style={{ fontSize: '0.6875rem', color: '#8A9BAB', marginTop: '0.2rem', letterSpacing: '0.04em' }}>{t.detail}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA final ─────────────────────────────────────── */}
      <section className="relative py-24 md:py-36 text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/photos/blog/guide-the-coucher.jpg"
            alt="Guide préparant le thé au coucher de soleil, La Thébaïde, Louxor"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'brightness(0.45)', objectPosition: 'center 70%' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(13,33,55,0.55)' }}
          />
        </div>

        <div className="relative z-10 max-w-xl mx-auto px-6">
          <p className="eyebrow mb-4" style={{ color: '#CE8D5C' }}>Une maison vous attend</p>
          <h2
            className="mb-6"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              color: 'white',
              fontWeight: 300,
              lineHeight: 1.15,
            }}
          >
            Louxor s&apos;apprend
            <br />
            <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#CE8D5C' }}>en y vivant.</em>
          </h2>
          <p className="mb-10 text-base leading-relaxed" style={{ color: 'rgba(250,247,242,0.75)' }}>
            La Thébaïde n&apos;est pas une escale. C&apos;est un état d&apos;esprit.
            Écrivez à Sophie, elle vous dira si la maison est disponible à vos dates.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }} aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Écrire à Sophie sur WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
