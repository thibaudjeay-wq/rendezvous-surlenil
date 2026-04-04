import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, ChevronDown, Anchor, Sun } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/constants'
import { sanityClient } from '@/lib/sanity/client'
import { signatureExperiencesQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

type SanityHighlight = { icon?: string; label?: string; value?: string }
type SanitySignatureExp = {
  _id: string
  title: string
  slug: { current: string }
  tagline?: string
  mainImage?: { asset: { _id: string; url: string }; alt?: string; hotspot?: { x: number; y: number } }
  highlights?: SanityHighlight[]
  priceDisplay?: string
  priceAmount?: number
  priceSuffix?: string
  duration?: string
  ctaWhatsappMessage?: string
  featured?: boolean
  included?: string[]
}

export const metadata: Metadata = {
  title: 'Séjours Signature en Égypte, Dahabiya, Louxor & Assouan | Rendez-vous sur le Nil',
  description:
    'Six séjours clés en main en Égypte par Sophie Godineau : croisière en dahabiya sur le Nil, nuits à La Thébaïde, guide francophone privé, montgolfière. De 3 à 12 nuits, Louxor, Assouan, Abou Simbel.',
  alternates: { canonical: 'https://rendezvous-surlenil.com/sejours/signature' },
  openGraph: {
    title: 'Séjours Signature en Égypte | Rendez-vous sur le Nil',
    description: 'Six séjours clés en main pour découvrir l\'Égypte authentique : dahabiya sur le Nil, temples de la Haute-Égypte, guide francophone dédié.',
    images: [{ url: 'https://images.unsplash.com/photo-1539768942893-daf853948e5e?w=1200&q=85', width: 1200, height: 630, alt: 'Séjours Signature en Égypte, dahabiya sur le Nil' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Séjours Signature, Rendez-vous sur le Nil',
  description: 'Six séjours clés en main en Égypte : croisière dahabiya, séjours à Louxor, guide francophone privé.',
  url: 'https://rendezvous-surlenil.com/sejours/signature',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'CASBAH — Louxor j\'adore, 8 jours / 7 nuits' },
    { '@type': 'ListItem', position: 2, name: 'YALLA — La Haute-Égypte dans toute sa splendeur, 7 jours / 6 nuits' },
    { '@type': 'ListItem', position: 3, name: 'PACHA — Nil part ailleurs, croisière dahabiya 5 ou 7 nuits' },
    { '@type': 'ListItem', position: 4, name: 'SAFARA — La mini-croisière, 4 jours / 3 nuits' },
    { '@type': 'ListItem', position: 5, name: 'SMALA — L\'évasion privée, dahabiya privatisée' },
    { '@type': 'ListItem', position: 6, name: 'HABIBI — Offre été, 4 jours / 3 nuits, basse saison' },
  ],
}

const sejours = [
  {
    code: 'CASBAH',
    title: "Louxor j'adore",
    duration: '8 jours / 7 nuits',
    badge: undefined,
    image: '/photos/thebaide/rooftop-femme-the.jpg',
    imageAlt: 'Temple de Karnak au lever du soleil, Louxor',
    description:
      'Immersion totale à Louxor. La Thébaïde comme point de chute, Karnak au crépuscule, montgolfière au lever du soleil sur la Vallée des Rois. Une excursion à Dendérah ou Esna vient compléter ce tour de force archéologique.',
    highlights: [
      '7 nuits à La Thébaïde (duplex de Sophie & Nasser)',
      'Visites : sites essentiels de la rive est et de la rive ouest',
      'Guide francophone dédié sur tous les sites',
      'Montgolfière au lever du soleil',
      'Excursion Dendérah ou Esna',
      'Transferts inclus',
    ],
    ctaMessage:
      "Bonjour Sophie, je suis intéressé(e) par le séjour CASBAH, Louxor j'adore (8j/7n). Pouvez-vous m'en dire plus ? 🌿",
  },
  {
    code: 'YALLA',
    title: 'La Haute-Égypte dans toute sa splendeur.',
    duration: '7 jours / 6 nuits',
    badge: 'Le plus complet',
    image: '/photos/dahabiya/salon-coucher.jpg',
    imageAlt: 'Dahabiya sur le Nil au coucher du soleil',
    description:
      "2 nuits à La Thébaïde pour ancrer l'expérience à Louxor, puis 4 nuits à bord d'une dahabiya de Louxor à Assouan. Abou Simbel, montgolfière, guide dédié. Les entrées des sites sont incluses les jours de croisière. Les déjeuners et dîners les jours à La Thébaïde ne sont pas inclus.",
    highlights: [
      '2 nuits à La Thébaïde',
      '4 nuits en dahabiya (Louxor → Assouan)',
      'Visite de tous les sites majeurs de la vallée du Nil',
      'Escales : temples de Haute-Égypte',
      'Excursion Abou Simbel incluse',
      'Montgolfière au lever du soleil',
      'Guide francophone dédié',
      'Entrées des sites incluses les jours de croisière',
    ],
    ctaMessage:
      'Bonjour Sophie, je suis intéressé(e) par le séjour YALLA, Le voyage de Pharaon (7j/6n). Pouvez-vous m\'en dire plus ? 🌿',
    featured: true,
  },
  {
    code: 'PACHA',
    title: 'Nil part ailleurs',
    duration: '6 jours / 5 nuits, ou 8 jours / 7 nuits',
    badge: undefined,
    image: '/photos/dahabiya/exterieur-coucher.jpg',
    imageAlt: 'Vue sur le Nil depuis une dahabiya',
    description:
      "La croisière dahabiya intégrale, de Louxor à Assouan. Temples au fil de l'eau, couchers de soleil sur le fleuve, Abou Simbel inclus. Tous les repas se prennent à bord, inclus. Deux durées possibles selon votre rythme.",
    highlights: [
      'Dahabiya sur le Nil (5 ou 7 nuits)',
      'Guide francophone à bord',
      'Excursion Abou Simbel incluse',
      'Tous les repas à bord inclus',
      'Escales : temples de Haute-Égypte',
      'Entrées des sites incluses',
    ],
    ctaMessage:
      'Bonjour Sophie, je suis intéressé(e) par le séjour PACHA, Nil part ailleurs. Pouvez-vous m\'en dire plus ? 🌿',
  },
  {
    code: 'SAFARA',
    title: 'La mini-croisière',
    duration: '4 jours / 3 nuits',
    badge: undefined,
    image: '/photos/dahabiya/table-nil.jpg',
    imageAlt: 'Felouque sur le Nil à Assouan',
    description:
      "L'essentiel du Nil, concentré en trois nuits d'exception. 3 nuits à bord d'une dahabiya entre Assouan et Louxor, guide francophone dédié, excursion Abou Simbel incluse.",
    highlights: [
      '3 nuits en dahabiya Assouan–Louxor',
      'Guide francophone dédié',
      'Excursion Abou Simbel incluse',
      'Escales : temples de Haute-Égypte',
      'Entrées des sites incluses',
      'Transferts inclus',
    ],
    ctaMessage:
      'Bonjour Sophie, je suis intéressé(e) par le séjour SAFARA, La mini-croisière (4j/3n). Pouvez-vous m\'en dire plus ? 🌿',
  },
  {
    code: 'SMALA',
    title: "L'évasion privée",
    duration: 'À partir de 5 jours / 4 nuits',
    badge: 'Pour groupes & familles',
    image: '/photos/voyageurs/duo-arche-coucher.jpg',
    imageAlt: 'Croisière privée sur le Nil au coucher du soleil',
    description:
      "La dahabiya privatisée entièrement pour votre groupe, famille, amis, collègues. Sophie organise chaque détail sur mesure : votre programme, votre rythme, vos envies. Rien n'est imposé.",
    highlights: [
      'Dahabiya privatisée pour votre groupe',
      'Guide francophone dédié',
      'Programme 100 % sur mesure',
      'Durée et itinéraire flexibles',
      'Entrées des sites incluses',
      'Organisation complète par Sophie',
    ],
    ctaMessage:
      "Bonjour Sophie, je suis intéressé(e) par le séjour SMALA, L'évasion privée. Nous sommes [nombre de personnes]. Pouvez-vous m'en dire plus ? 🌿",
  },
  {
    code: 'HABIBI',
    title: 'Offre été',
    duration: '4 jours / 3 nuits, juin, juillet, août',
    badge: 'Basse saison',
    image: '/photos/signature/montgolfiere-voyageur.jpg',
    imageAlt: 'Louxor en été, lumière dorée sur les temples',
    description:
      "L'Égypte en été, lumière intense, sites moins fréquentés, tarifs doux. 3 nuits à La Thébaïde, guide dédié, montgolfière au lever du soleil, promenade en felouque sur le Nil. La basse saison comme avantage.",
    highlights: [
      '4 nuits à La Thébaïde',
      'Guide francophone dédié',
      'Montgolfière au lever du soleil',
      'Felouque sur le Nil',
      'Tarif basse saison',
    ],
    ctaMessage:
      'Bonjour Sophie, je suis intéressé(e) par le séjour HABIBI, Offre été (été 2026). Pouvez-vous m\'en dire plus ? 🌿',
  },
]

const included = [
  'Guide francophone dédié sur tous les sites',
  'Transferts aéroport et inter-sites',
  'Accompagnement WhatsApp de Sophie avant et pendant le séjour',
]

const faq = [
  {
    q: 'Les séjours Signature sont-ils modifiables ?',
    a: 'Oui, chaque programme est une base. Sophie adapte les dates, le rythme, les nuits supplémentaires, les escales. Deux voyages ne se ressemblent jamais.',
  },
  {
    q: "Qu'est-ce qu'une dahabiya ?",
    a: "Une dahabiya est une voilière traditionnelle à fond plat, aménagée pour la croisière sur le Nil. Moins grande qu'un paquebot de croisière, elle offre une atmosphère intimiste et romantique. Chaque cabine est privative.",
  },
  {
    q: 'Ces séjours conviennent-ils aux familles avec enfants ?',
    a: 'Absolument. CASBAH, PACHA et SMALA sont particulièrement adaptés. Les enfants ne s\'ennuient jamais — curieux de nature, ils se prennent pour Indiana Jones dès le premier temple.',
  },
  {
    q: 'Quelle est la meilleure période ?',
    a: "D'octobre à avril pour les meilleures conditions. En octobre, comptez environ 35°C, la chaleur s'adoucit progressivement. Janvier-février sont les mois les plus doux (25°C environ). HABIBI est spécifiquement conçu pour profiter des avantages de l'été (juin–août).",
  },
  {
    q: "Les vols sont-ils inclus ?",
    a: "Non, les vols internationaux ne sont pas inclus. Sophie peut vous orienter vers les meilleures options selon vos dates et votre ville de départ.",
  },
]

export const revalidate = 3600

export default async function SignaturePage() {
  let sanityExps: SanitySignatureExp[] = []
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      sanityExps = await sanityClient.fetch<SanitySignatureExp[]>(signatureExperiencesQuery)
    }
  } catch {
    // Fallback aux séjours statiques
  }

  const whatsappUrl = getWhatsAppUrl(
    'Bonjour Sophie, je suis intéressé(e) par un Séjour Signature en Égypte. Pouvez-vous me présenter les options disponibles ? 🌿'
  )

  // Included: toujours statique (Sanity contient des options spécifiques à certains séjours)
  const activeIncluded = included

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '70vh' }}>
        <div className="absolute inset-0">
          <Image
            src="/photos/signature/karnak-colonnes.jpg"
            alt="Colonnes de Karnak, Séjours Signature"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'brightness(0.72)' }}
          />
          <div className="img-overlay-hero" />
        </div>

        <div
          className="relative z-10 flex flex-col justify-between px-6 md:px-16 pb-10 md:pb-28 max-w-[1200px] mx-auto"
          style={{ minHeight: '70vh', paddingTop: 'clamp(130px, 14vw, 160px)' }}
        >
          <nav
            className="flex items-center gap-2 text-xs mb-auto"
            style={{ color: 'rgba(255,255,255,0.6)' }}
            aria-label="Fil d'Ariane"
          >
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/sejours" className="hover:text-white transition-colors">Nos séjours</Link>
            <span>/</span>
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>Signature</span>
          </nav>

          <div className="max-w-2xl">
            <p className="eyebrow mb-4" style={{ color: '#CE8D5C' }}>6 séjours clés en main</p>
            <h1
              className="text-display-xl mb-6"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: 'white', fontWeight: 300 }}
            >
              Séjours Signature
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 400 }}>l&apos;Égypte comme Sophie la connaît</em>
            </h1>
            <p
              className="text-lg mb-10"
              style={{ color: 'rgba(250,247,242,0.85)', maxWidth: '520px', fontWeight: 300 }}
            >
              Six programmes pensés par Sophie & Nasser, La Thébaïde, croisière en dahabiya,
              guide dédié, montgolfière. Des bases que Sophie adapte à vos envies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Parlons de votre voyage →
              </a>
              <a
                href="#sejours"
                className="btn btn-secondary"
                style={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}
              >
                Voir les séjours
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Concept ───────────────────────────────────────── */}
      <section className="py-12 md:py-28" style={{ background: '#FAF7F2' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="eyebrow mb-4">Ce qui nous distingue</p>
              <h2
                className="text-display-lg title-underline mb-8"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: '#0F3D38' }}
              >
                Sophie a testé chaque programme.
                <br />
                <em style={{ fontStyle: 'italic', fontWeight: 300 }}>Nasser connaît chaque site.</em>
              </h2>
              <p className="leading-relaxed mb-5" style={{ color: '#5C6E7E', fontSize: '1.0625rem' }}>
                Chaque Séjour Signature est un itinéraire que Sophie a conçu, retravaillé, affiné au fil des voyages.
                La Thébaïde est leur point d&apos;ancrage à Louxor. La dahabiya, leur façon de vivre le Nil.
                Chaque guide a été choisi pour sa passion autant que pour son expertise.
              </p>
              <p className="leading-relaxed mb-8" style={{ color: '#5C6E7E', fontSize: '1.0625rem' }}>
                Ces programmes sont des bases, Sophie les adapte à vos dates, votre rythme,
                vos envies. Jamais deux voyages ne se ressemblent.
              </p>

              <blockquote className="pl-5" style={{ borderLeft: '2px solid #C4902A' }}>
                <p
                  className="italic leading-relaxed"
                  style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.125rem', color: '#1E6860' }}
                >
                  &ldquo;Un séjour Signature, c&apos;est ma façon de vous offrir le meilleur de ce que je connais de l&apos;Égypte.&rdquo;
                </p>
                <footer className="mt-3 text-xs font-medium tracking-wide" style={{ color: '#8A9BAB' }}>
                 , Sophie Godineau
                </footer>
              </blockquote>
            </div>

            {/* Pictogrammes des 2 hébergements signatures */}
            <div className="grid grid-cols-2 gap-6">
              <div
                className="p-7 rounded-sm flex flex-col gap-4"
                style={{ background: '#0F3D38', border: '1px solid rgba(201,169,110,0.2)' }}
              >
                <div className="w-8 h-px" style={{ background: '#C4902A' }} />
                <h3
                  className="font-medium"
                  style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.25rem', color: '#FAF7F2' }}
                >
                  La Thébaïde
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8A9BAB' }}>
                  Le duplex de Sophie & Nasser à Louxor, rive est. 4 chambres avec SDB privées,
                  rooftop panoramique sur le Nil.
                </p>
                <Link href="/la-thebaide" className="text-xs font-medium tracking-wide" style={{ color: '#C4902A' }}>
                  Découvrir →
                </Link>
              </div>
              <div
                className="p-7 rounded-sm flex flex-col gap-4"
                style={{ background: '#2A5A54', border: '1px solid rgba(201,169,110,0.15)' }}
              >
                <Anchor size={18} style={{ color: '#C4902A' }} aria-hidden="true" />
                <h3
                  className="font-medium"
                  style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.25rem', color: '#FAF7F2' }}
                >
                  La Dahabiya
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8A9BAB' }}>
                  Voilière traditionnelle sur le Nil.
                  Cabines privatives, repas à bord, escales aux temples.
                </p>
              </div>
              <div
                className="p-7 rounded-sm col-span-2 flex flex-col gap-3"
                style={{ background: 'white', border: '1px solid #E8D5B7' }}
              >
                <Sun size={16} style={{ color: '#C4902A' }} aria-hidden="true" />
                <p className="text-sm font-medium" style={{ color: '#0F3D38' }}>
                  Montgolfière au lever du soleil
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#5C6E7E' }}>
                  Incluse dans CASBAH, YALLA et HABIBI, la vallée des Rois vue du ciel, à l&apos;aube.
                  L&apos;une des expériences les plus fortes de toute l&apos;Égypte.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Les séjours ───────────────────────────────────── */}
      <section id="sejours" className="py-12 md:py-28" style={{ background: '#FDF8F0' }} aria-labelledby="sejours-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">Nos programmes</p>
            <h2
              id="sejours-heading"
              className="text-display-lg title-underline title-underline-center"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: '#0F3D38' }}
            >
              Six façons de vivre l&apos;Égypte
            </h2>
            <p className="mt-8 max-w-md mx-auto text-sm" style={{ color: '#8A9BAB' }}>
              Chaque programme est une base, Sophie l&apos;adapte à vos dates, votre groupe et vos envies.
            </p>
          </div>

          <div className="flex flex-col gap-16">
            {sanityExps.length > 0
              ? sanityExps.map((exp, i) => {
                  const isSmala = exp.title?.toLowerCase().includes('smala') || exp.title?.toLowerCase().includes('évasion privée')
                  const imgSrc = isSmala
                    ? '/photos/voyageurs/selfie-groupe-siwa.jpg'
                    : exp.mainImage ? urlFor(exp.mainImage).width(900).height(600).url() : null
                  const highlightLabels = exp.highlights?.map(h =>
                    h.value ? `${h.label} : ${h.value}` : (h.label ?? '')
                  ).filter(Boolean) ?? []
                  const ctaMsg = exp.ctaWhatsappMessage
                    ?? `Bonjour Sophie, je suis intéressé(e) par le séjour "${exp.title}" (${exp.duration ?? ''}). Pouvez-vous m'en dire plus ? 🌿`
                  const priceLabel =
                    exp.priceDisplay === 'on-request' ? 'Sur demande'
                    : exp.priceDisplay === 'private-quote' ? 'Sur devis'
                    : exp.priceAmount
                      ? `${exp.priceDisplay === 'from' ? 'À partir de ' : ''}${exp.priceAmount.toLocaleString('fr-FR')} €${exp.priceSuffix ? ' ' + exp.priceSuffix : ''}`
                      : null

                  return (
                    <div
                      key={exp._id}
                      className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
                    >
                      {/* Image */}
                      <div className="img-section overflow-hidden rounded-sm relative">
                        {imgSrc ? (
                          <Image
                            src={imgSrc}
                            alt={isSmala ? 'Groupe de voyageurs à Siwa, Égypte — SMALA évasion privée' : (exp.mainImage?.alt ?? exp.title)}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-stone-200" />
                        )}
                        {exp.featured && (
                          <span
                            className="absolute top-4 left-4 text-[10px] font-semibold tracking-[0.14em] uppercase px-3 py-1 rounded-sm z-10"
                            style={{ background: '#C4902A', color: 'white' }}
                          >
                            Coup de cœur
                          </span>
                        )}
                        {priceLabel && (
                          <div
                            className="absolute bottom-4 left-4 px-3 py-2 rounded-sm z-10"
                            style={{ background: 'rgba(13,33,55,0.88)', backdropFilter: 'blur(6px)' }}
                          >
                            <p className="text-xs font-bold tracking-[0.12em]" style={{ color: '#C4902A' }}>
                              {priceLabel}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Texte */}
                      <div>
                        {exp.duration && (
                          <p className="eyebrow mb-1" style={{ color: '#C4902A' }}>{exp.duration}</p>
                        )}
                        <h3
                          className="mb-1"
                          style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.875rem', color: '#0F3D38', fontWeight: 400 }}
                        >
                          {exp.title}
                        </h3>
                        {exp.tagline && (
                          <p className="text-sm leading-relaxed mb-6" style={{ color: '#5C6E7E' }}>
                            {exp.tagline}
                          </p>
                        )}
                        {highlightLabels.length > 0 && (
                          <ul className="flex flex-col gap-2.5 mb-8">
                            {highlightLabels.map((h) => (
                              <li key={h} className="flex items-start gap-2.5 text-sm" style={{ color: '#5C6E7E' }}>
                                <CheckCircle size={13} style={{ color: '#C4902A', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                                {h}
                              </li>
                            ))}
                          </ul>
                        )}
                        <div className="flex flex-wrap gap-3">
                          <a
                            href={getWhatsAppUrl(ctaMsg)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                          >
                            Demander une proposition →
                          </a>
                          {exp.slug?.current && (
                            <Link href={`/experiences/${exp.slug.current}`} className="btn btn-secondary">
                              Voir le programme
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })
              : sejours.map((s, i) => (
                <div
                  key={s.code}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
                >
                  {/* Image */}
                  <div className="img-section overflow-hidden rounded-sm relative">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    {s.badge && (
                      <span
                        className="absolute top-4 left-4 text-[10px] font-semibold tracking-[0.14em] uppercase px-3 py-1 rounded-sm z-10"
                        style={{ background: '#C4902A', color: 'white' }}
                      >
                        {s.badge}
                      </span>
                    )}
                    <div
                      className="absolute bottom-4 left-4 px-3 py-2 rounded-sm z-10"
                      style={{ background: 'rgba(13,33,55,0.88)', backdropFilter: 'blur(6px)' }}
                    >
                      <p className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: '#C4902A' }}>
                        {s.code}
                      </p>
                    </div>
                  </div>

                  {/* Texte */}
                  <div>
                    <p className="eyebrow mb-1" style={{ color: '#C4902A' }}>{s.code}</p>
                    <h3
                      className="mb-1"
                      style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.875rem', color: '#0F3D38', fontWeight: 400 }}
                    >
                      {s.title}
                    </h3>
                    <p className="text-sm mb-6" style={{ color: '#8A9BAB' }}>
                      {s.duration}
                    </p>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: '#5C6E7E' }}>
                      {s.description}
                    </p>
                    <ul className="flex flex-col gap-2.5 mb-8">
                      {s.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2.5 text-sm" style={{ color: '#5C6E7E' }}>
                          <CheckCircle size={13} style={{ color: '#C4902A', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={getWhatsAppUrl(s.ctaMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Demander une proposition pour ce séjour →
                    </a>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>

      {/* ─── Ce qui est inclus ──────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: '#FAF7F2' }}>
        <div className="max-w-[800px] mx-auto px-6 md:px-12">
          <div className="text-center mb-10">
            <p className="eyebrow mb-3">Dans chaque séjour Signature</p>
            <h2
              className="text-display-lg"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: '#0F3D38' }}
            >
              Ce qui est toujours inclus
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeIncluded.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 p-4 rounded-sm"
                style={{ background: 'white', border: '1px solid #E8D5B7' }}
              >
                <CheckCircle size={14} style={{ color: '#27AE60', flexShrink: 0, marginTop: '3px' }} aria-hidden="true" />
                <span className="text-sm leading-relaxed" style={{ color: '#5C6E7E' }}>{item}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-xs mt-6" style={{ color: '#8A9BAB' }}>
            * Vols internationaux non inclus, Sophie peut vous orienter selon vos dates et votre ville de départ.
          </p>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────── */}
      <section className="py-12 md:py-28" style={{ background: '#FDF8F0' }} aria-labelledby="faq-heading">
        <div className="max-w-2xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">Questions fréquentes</p>
            <h2
              id="faq-heading"
              className="text-display-lg title-underline title-underline-center"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: '#0F3D38' }}
            >
              Tout ce que vous <em style={{ fontStyle: 'italic', fontWeight: 300 }}>voulez savoir</em>
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

      {/* ─── CTA Final ──────────────────────────────────────── */}
      <section className="py-12 md:py-28 text-center" style={{ background: '#0F3D38' }}>
        <div className="max-w-xl mx-auto px-6">
          <p className="eyebrow mb-4" style={{ color: '#C4902A' }}>Votre séjour vous attend</p>
          <h2
            className="text-display-lg mb-6"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: '#FAF7F2', fontWeight: 400 }}
          >
            Prêt(e) à vivre l&apos;Égypte
            <br />
            <em style={{ fontStyle: 'italic', color: '#CE8D5C' }}>comme vous l&apos;avez imaginée ?</em>
          </h2>
          <p className="mb-10 text-sm leading-relaxed" style={{ color: '#8A9BAB' }}>
            Écrivez à Sophie, elle vous répond sous 24h avec une première proposition
            adaptée à vos envies, vos dates et votre budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            <Link href="/sejours" className="btn btn-secondary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
              Voir tous nos séjours
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
