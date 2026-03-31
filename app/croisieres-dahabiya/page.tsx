import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Ship, Users, Star, Sunset, CheckCircle, XCircle, ChevronDown } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/constants'
import { sanityClient } from '@/lib/sanity/client'
import { dahabiyaExperiencesQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

export const revalidate = 3600

type SanityDahabiyaExp = {
  _id: string
  title: string
  slug: { current: string }
  duration?: string
  priceDisplay?: string
  priceAmount?: number
  priceSuffix?: string
  highlights?: Array<{ icon?: string; label: string; value: string }>
  included?: string[]
  notIncluded?: string[]
  ctaWhatsappMessage?: string
  featured?: boolean
  mainImage?: { asset: { _id: string; url: string; metadata: { lqip?: string } }; alt?: string }
  gallery?: Array<{ asset: { _id: string; url: string; metadata: { lqip?: string } }; alt?: string }>
}

function formatPrice(exp: SanityDahabiyaExp): string {
  if (exp.priceDisplay === 'on-request' || exp.priceDisplay === 'private-quote') return 'Sur devis'
  if (exp.priceAmount) return `À partir de ${exp.priceAmount.toLocaleString('fr-FR')} €`
  return 'Sur devis'
}

export const metadata: Metadata = {
  title: 'Croisières en Dahabiya sur le Nil, Louxor à Assouan',
  description:
    'Naviguez sur le Nil à bord d\'une dahabiya. Croisière haut de gamme entre Louxor et Assouan, en dehors des foules. Accompagnement francophone par Sophie Godineau.',
  alternates: { canonical: 'https://rendezvous-surlenil.com/croisieres-dahabiya' },
  openGraph: {
    title: 'Croisières en Dahabiya, Rendez-vous sur le Nil',
    description: 'Le Nil à bord d\'un voilier traditionnel. Hors des foules, au cœur de l\'Égypte authentique.',
    images: [{ url: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=1200&q=85', width: 1200, height: 630, alt: 'Croisière en dahabiya sur le Nil, Rendez-vous sur le Nil' }],
  },
}

// JSON-LD, TouristTrip
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TouristTrip',
  name: 'Croisière Dahabiya sur le Nil, Louxor à Assouan',
  description: 'Croisière haut de gamme à bord d\'une dahabiya sur le Nil entre Louxor et Assouan.',
  touristType: 'Couples, familles, voyageurs haut de gamme',
  itinerary: {
    '@type': 'ItemList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Louxor' },
      { '@type': 'ListItem', position: 2, name: 'Esna' },
      { '@type': 'ListItem', position: 3, name: 'Edfou' },
      { '@type': 'ListItem', position: 4, name: 'Kom Ombo' },
      { '@type': 'ListItem', position: 5, name: 'Assouan' },
    ],
  },
}

const formules = [
  {
    name: 'Escapade',
    duration: '4 nuits / 5 jours',
    price: 'À partir de 2 400 €',
    priceSuffix: 'pour 2 personnes',
    highlights: ['Louxor → Assouan', 'Petit groupe intimiste', '4 escales majeures', 'Repas à bord inclus'],
    cta: getWhatsAppUrl('Bonjour Sophie, je suis intéressé(e) par la formule Escapade (4 nuits). Pouvez-vous m\'en dire plus ? 🛶'),
  },
  {
    name: 'Immersion',
    duration: '7 nuits / 8 jours',
    price: 'À partir de 3 800 €',
    priceSuffix: 'pour 2 personnes',
    highlights: ['Louxor → Assouan', 'Petit groupe intimiste', '8 escales sélectionnées', 'Excursions incluses', 'Guide local francophone'],
    featured: true,
    cta: getWhatsAppUrl('Bonjour Sophie, je suis intéressé(e) par la formule Immersion (7 nuits). Pouvez-vous m\'en dire plus ? 🛶'),
  },
  {
    name: 'Grand Voyage',
    duration: '12 nuits / 13 jours',
    price: 'Sur devis',
    priceSuffix: 'privatisation complète',
    highlights: ['Itinéraire sur mesure', 'Bateau privatisé', 'Louxor ↔ Assouan', 'Guide dédié', 'Extensions possibles', 'Flexibilité totale'],
    cta: getWhatsAppUrl('Bonjour Sophie, je suis intéressé(e) par une croisière longue durée. J\'aimerais en discuter avec vous 🛶'),
  },
]

const included = [
  'Nuitées à bord de la dahabiya',
  'Pension complète (repas sur le bateau)',
  'Équipage local expérimenté',
  'Guide francophone sur les sites',
  'Droits d\'entrée des temples',
  'Transferts depuis/vers l\'aéroport ou votre hôtel',
  'Accompagnement WhatsApp avant le départ',
]

const notIncluded = [
  'Vol international',
  'Assurance voyage (recommandée)',
  'Pourboires locaux (usage et discrétion)',
  'Dépenses personnelles',
]

const itinerary = [
  { day: 'Jour 1', title: 'Louxor, L\'arrivée', description: 'Accueil à l\'aéroport ou à votre hôtel, transfert organisé. Installation à bord de la dahabiya au lever du soleil. Première navigation douce sur le Nil. Karnak en fin de journée.' },
  { day: 'Jour 2', title: 'La rive ouest, Vallée des Rois', description: 'Réveil face au lever du soleil sur la rive ouest. Visite de la Vallée des Rois et du temple de Deir el-Bahari. Retour à bord pour un déjeuner en navigant.' },
  { day: 'Jour 3', title: 'Esna, Le temple caché', description: 'Navigation matinale. Visite du temple d\'Esna, souvent ignoré des circuits classiques, et l\'un des plus beaux. Baignade possible, pique-nique sur la berge.' },
  { day: 'Jour 4', title: 'Edfou, Le temple d\'Horus', description: 'Escale à Edfou pour le temple d\'Horus, le mieux conservé d\'Égypte. Traversée en caleche. Soirée sur le pont face au coucher de soleil sur les champs de canne à sucre.' },
  { day: 'Jour 5', title: 'Kom Ombo & Assouan', description: 'Temple de Kom Ombo au lever du soleil, magie absolue. Arrivée à Assouan en fin d\'après-midi. Visite du marché aux épices. Dîner de fête à bord pour la dernière nuit.' },
]

const faq = [
  {
    q: 'Qu\'est-ce qu\'une dahabiya exactement ?',
    a: 'La dahabiya est un voilier traditionnel égyptien à fond plat, utilisé depuis le XIXe siècle par les explorateurs et voyageurs fortunés. Aujourd\'hui entièrement rénové, il offre tout le confort d\'un boutique hotel flottant, cabines climatisées, repas gastronomiques, salon panoramique et pont terrasse.',
  },
  {
    q: 'Combien de personnes à bord ?',
    a: 'La dahabiya accueille en général 8 à 12 voyageurs selon les bateaux, un format bien plus intime qu\'un grand paquebot de croisière. Certaines formules permettent la privatisation complète pour votre groupe. Sophie vous précise les options selon vos dates et votre projet.',
  },
  {
    q: 'Peut-on personnaliser l\'itinéraire ?',
    a: 'Absolument. Les formules présentées sont des bases. Sophie peut adapter les escales, le rythme, les activités et les demi-journées libres selon vos envies. C\'est le propre du voyage sur mesure.',
  },
  {
    q: 'La croisière est-elle adaptée aux familles avec enfants ?',
    a: 'Oui, à partir de 6-7 ans environ. La dahabiya est un cadre sécurisé et vivant, qui émerveille les enfants autant que les adultes. Sophie conseille des formules courtes (4 nuits) pour les plus jeunes.',
  },
  {
    q: 'Quelle est la meilleure période pour naviguer ?',
    a: 'D\'octobre à avril est idéale : températures douces (20-28°C), nuits fraiches, lumière dorée. Juillet-août est possible mais très chaud (40°C+). Sophie vous guidera selon votre date de départ.',
  },
]

export default async function CroisiereDahabiyaPage() {
  const whatsappMain = getWhatsAppUrl('Bonjour Sophie, je suis intéressé(e) par une croisière en dahabiya sur le Nil. Pouvez-vous m\'envoyer plus d\'informations ? 🛶')

  let sanityExps: SanityDahabiyaExp[] = []
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      sanityExps = await sanityClient.fetch<SanityDahabiyaExp[]>(dahabiyaExperiencesQuery)
    }
  } catch { /* fallback statique */ }

  // Formules depuis Sanity si disponibles, sinon fallback statique
  const activeFormules = sanityExps.length > 0
    ? sanityExps.map((exp) => ({
        name: exp.title,
        duration: exp.duration ?? '',
        price: formatPrice(exp),
        priceSuffix: exp.priceSuffix ?? '/ personne',
        highlights: exp.highlights?.map((h) => h.value) ?? [],
        featured: exp.featured ?? false,
        cta: getWhatsAppUrl(exp.ctaWhatsappMessage ?? 'Bonjour Sophie, je suis intéressé(e) par une croisière en dahabiya. 🛶'),
      }))
    : formules

  // Inclus / non inclus depuis la première expérience Sanity
  const featuredExp = sanityExps.find((e) => e.featured) ?? sanityExps[0]
  const activeIncluded = featuredExp?.included?.length ? featuredExp.included : included
  const activeNotIncluded = featuredExp?.notIncluded?.length ? featuredExp.notIncluded : notIncluded

  // Galerie depuis Sanity si disponible
  const sanityGallery = featuredExp?.gallery?.length ? featuredExp.gallery : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '85vh' }}>
        <div className="absolute inset-0">
          <img
            src="/photos/dahabiya/exterieur-coucher.jpg"
            alt="Dahabiya naviguant sur le Nil au coucher du soleil"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.8)' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(13,33,55,0.3) 0%, rgba(13,33,55,0.7) 80%)',
            }}
          />
        </div>

        <div
          className="relative z-10 flex flex-col justify-end px-6 md:px-16 pb-10 md:pb-28 max-w-[1200px] mx-auto"
          style={{ minHeight: '85vh' }}
        >
          {/* Breadcrumb */}
          <nav className="absolute top-28 left-6 md:left-16 flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.6)' }} aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>Croisières Dahabiya</span>
          </nav>

          <div className="max-w-2xl">
            <p className="eyebrow mb-4" style={{ color: '#CE8D5C' }}>Le Nil à votre rythme</p>
            <h1
              className="text-display-xl mb-6"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: 'white', fontWeight: 300 }}
            >
              Naviguer sur le Nil
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 400 }}>en dahabiya</em>
            </h1>
            <p className="text-lg mb-10" style={{ color: 'rgba(250,247,242,0.85)', maxWidth: '480px', fontWeight: 300 }}>
              Remonter le Nil à bord d&apos;un voilier traditionnel,
              au rythme de l&apos;eau et du vent.
              Louxor, Esna, Edfou, Assouan, des millénaires de temples,
              loin des foules.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={whatsappMain} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Parlons de votre voyage →
              </a>
              <a href="#formules" className="btn btn-secondary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}>
                Voir les formules
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Intro : Qu'est-ce qu'une dahabiya ───────────── */}
      <section className="py-12 md:py-28" style={{ background: '#FAF7F2' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="eyebrow mb-4">L&apos;expérience</p>
              <h2
                className="text-display-lg title-underline mb-8"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#0F3D38' }}
              >
                Qu&apos;est-ce qu&apos;une
                <br />
                <em style={{ fontStyle: 'italic', fontWeight: 300 }}>dahabiya ?</em>
              </h2>
              <p className="leading-relaxed mb-5" style={{ color: '#5C6E7E', fontSize: '1.0625rem' }}>
                La dahabiya est un voilier traditionnel égyptien à fond plat, utilisé depuis le XIXe siècle par les explorateurs et les voyageurs fortunés. Entièrement rénové, il offre aujourd&apos;hui tout le confort d&apos;un boutique hotel flottant.
              </p>
              <p className="leading-relaxed mb-5" style={{ color: '#5C6E7E', fontSize: '1.0625rem' }}>
                Cabines climatisées avec salle de bain privée, cuisine gastronomique préparée à bord, salon panoramique, pont terrasse pour les nuits étoilées, une atmosphère intimiste loin des grandes croisières de masse.
              </p>
              <p className="leading-relaxed mb-8" style={{ color: '#5C6E7E', fontSize: '1.0625rem' }}>
                C&apos;est la façon la plus intime, la plus libre et la plus belle de remonter le Nil.
              </p>

              {/* Highlights rapides */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Ship, label: 'Dahabiya traditionnelle' },
                  { icon: Users, label: 'Petit groupe intimiste' },
                  { icon: Star, label: 'Guide francophone' },
                  { icon: Sunset, label: 'Couchers de soleil' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5 py-2.5 px-3.5 rounded-sm" style={{ background: '#FDF8F0', border: '1px solid #E8D5B7' }}>
                    <Icon size={15} style={{ color: '#C4902A' }} aria-hidden="true" />
                    <span className="text-sm font-medium" style={{ color: '#0F3D38' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Galerie — Sanity si dispo, sinon statique */}
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-sm" style={{ aspectRatio: '3/4' }}>
                {sanityGallery?.[0]?.asset ? (
                  <Image
                    src={urlFor(sanityGallery[0]).width(600).height(800).url()}
                    alt={sanityGallery[0].alt ?? 'Dahabiya sur le Nil'}
                    width={600} height={800}
                    className="w-full h-full object-cover"
                    placeholder={sanityGallery[0].asset.metadata?.lqip ? 'blur' : undefined}
                    blurDataURL={sanityGallery[0].asset.metadata?.lqip}
                  />
                ) : (
                  <img src="/photos/dahabiya/salon-coucher.jpg" alt="Salon de la dahabiya au coucher de soleil sur le Nil" className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex flex-col gap-4">
                <div className="overflow-hidden rounded-sm flex-1">
                  {sanityGallery?.[1]?.asset ? (
                    <Image
                      src={urlFor(sanityGallery[1]).width(400).height(300).url()}
                      alt={sanityGallery[1].alt ?? 'Dahabiya'}
                      width={400} height={300}
                      className="w-full h-full object-cover"
                      placeholder={sanityGallery[1].asset.metadata?.lqip ? 'blur' : undefined}
                      blurDataURL={sanityGallery[1].asset.metadata?.lqip}
                    />
                  ) : (
                    <img src="/photos/voyageurs/couple-cabine-nil.jpg" alt="Couple regardant le Nil depuis la cabine de la dahabiya" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="overflow-hidden rounded-sm flex-1">
                  {sanityGallery?.[2]?.asset ? (
                    <Image
                      src={urlFor(sanityGallery[2]).width(400).height(300).url()}
                      alt={sanityGallery[2].alt ?? 'Dahabiya'}
                      width={400} height={300}
                      className="w-full h-full object-cover"
                      placeholder={sanityGallery[2].asset.metadata?.lqip ? 'blur' : undefined}
                      blurDataURL={sanityGallery[2].asset.metadata?.lqip}
                    />
                  ) : (
                    <img src="/photos/dahabiya/table-nil.jpg" alt="Table dressée sur le pont de la dahabiya avec vue sur le Nil" className="w-full h-full object-cover" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Formules ─────────────────────────────────────── */}
      <section id="formules" className="py-12 md:py-28" style={{ background: '#FDF8F0' }} aria-labelledby="formules-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-8 md:mb-14">
            <p className="eyebrow mb-4">Tarifs & Formules</p>
            <h2
              id="formules-heading"
              className="text-display-lg title-underline title-underline-center"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#0F3D38' }}
            >
              Choisissez votre croisière
            </h2>
            <p className="text-sm mt-8 max-w-lg mx-auto" style={{ color: '#8A9BAB' }}>
              Toutes les formules sont personnalisables. Sophie adapte chaque croisière selon vos envies, vos dates et votre groupe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {activeFormules.map((f) => (
              <div
                key={f.name}
                className="flex flex-col p-7 rounded-sm relative"
                style={{
                  background: f.featured ? '#0F3D38' : 'white',
                  border: f.featured ? '2px solid #C4902A' : '1px solid #E8D5B7',
                  boxShadow: f.featured ? '0 20px 50px rgba(13,33,55,0.25)' : '0 4px 16px rgba(13,33,55,0.06)',
                }}
              >
                {f.featured && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase rounded-full"
                    style={{ background: '#C4902A', color: 'white' }}
                  >
                    Recommandée
                  </span>
                )}

                <p className="eyebrow mb-2" style={{ color: f.featured ? '#C4902A' : '#C4902A' }}>
                  {f.duration}
                </p>
                <h3
                  className="mb-1"
                  style={{
                    fontFamily: 'Cormorant Garamond',
                    fontSize: '1.5rem',
                    color: f.featured ? '#FAF7F2' : '#0F3D38',
                    fontWeight: 400,
                  }}
                >
                  {f.name}
                </h3>
                <p
                  className="text-xl font-light mb-1"
                  style={{ fontFamily: 'Cormorant Garamond', color: f.featured ? '#CE8D5C' : '#C4902A' }}
                >
                  {f.price}
                </p>
                <p className="text-xs mb-6" style={{ color: f.featured ? '#8A9BAB' : '#8A9BAB' }}>
                  {f.priceSuffix}
                </p>

                <div style={{ height: '1px', background: f.featured ? '#2A5A54' : '#E8D5B7', marginBottom: '1.5rem' }} />

                <ul className="flex flex-col gap-2.5 flex-1 mb-8">
                  {f.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm" style={{ color: f.featured ? '#D4B896' : '#5C6E7E' }}>
                      <CheckCircle size={13} style={{ color: '#C4902A', flexShrink: 0, marginTop: '3px' }} aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>

                <a
                  href={f.cta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${f.featured ? 'btn-primary' : 'btn-secondary'} justify-center text-center`}
                >
                  Nous écrire →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Itinéraire ───────────────────────────────────── */}
      <section className="py-12 md:py-28" style={{ background: '#FAF7F2' }} aria-labelledby="itinerary-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-8 md:mb-14">
            <p className="eyebrow mb-4">L&apos;itinéraire</p>
            <h2
              id="itinerary-heading"
              className="text-display-lg title-underline title-underline-center"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#0F3D38' }}
            >
              Programme type, 5 jours
            </h2>
          </div>

          <div className="flex flex-col gap-0 mt-12 max-w-2xl mx-auto">
            {itinerary.map((item, i) => (
              <div key={item.day} className="flex gap-6 group">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                    style={{ background: '#0F3D38', border: '2px solid #C4902A' }}
                  >
                    <span className="text-xs font-semibold" style={{ color: '#C4902A' }}>{i + 1}</span>
                  </div>
                  {i < itinerary.length - 1 && (
                    <div style={{ width: '1px', flex: 1, background: '#E8D5B7', minHeight: '40px' }} />
                  )}
                </div>

                {/* Contenu */}
                <div className="pb-8">
                  <p className="eyebrow mb-1" style={{ color: '#C4902A' }}>{item.day}</p>
                  <h3
                    className="font-medium mb-2"
                    style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.25rem', color: '#0F3D38' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#5C6E7E' }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm italic" style={{ color: '#8A9BAB' }}>
              Cet itinéraire est une base, Sophie l&apos;adapte à votre rythme et vos envies.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Inclus / Non inclus ──────────────────────────── */}
      <section className="py-20 md:py-24" style={{ background: '#FDF8F0' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Inclus */}
            <div className="p-8 rounded-sm" style={{ background: 'white', border: '1px solid #E8D5B7' }}>
              <h3
                className="mb-6"
                style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.375rem', color: '#0F3D38' }}
              >
                ✅ Ce qui est inclus
              </h3>
              <ul className="flex flex-col gap-3">
                {activeIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm" style={{ color: '#5C6E7E' }}>
                    <CheckCircle size={14} style={{ color: '#27AE60', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Non inclus */}
            <div className="p-8 rounded-sm" style={{ background: 'white', border: '1px solid #E8D5B7' }}>
              <h3
                className="mb-6"
                style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.375rem', color: '#0F3D38' }}
              >
                ❌ Non inclus
              </h3>
              <ul className="flex flex-col gap-3">
                {activeNotIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm" style={{ color: '#5C6E7E' }}>
                    <XCircle size={14} style={{ color: '#C0392B', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────── */}
      <section className="py-12 md:py-28" style={{ background: '#FAF7F2' }} aria-labelledby="faq-heading">
        <div className="max-w-2xl mx-auto px-6 md:px-12">
          <div className="text-center mb-8 md:mb-14">
            <p className="eyebrow mb-4">Questions fréquentes</p>
            <h2
              id="faq-heading"
              className="text-display-lg title-underline title-underline-center"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#0F3D38' }}
            >
              Tout ce que vous
              <em style={{ fontStyle: 'italic', fontWeight: 300 }}> voulez savoir</em>
            </h2>
          </div>

          <div className="flex flex-col gap-4 mt-12">
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
                  <span className="font-medium text-sm pr-4" style={{ fontFamily: 'Manrope' }}>
                    {item.q}
                  </span>
                  <ChevronDown
                    size={16}
                    style={{ color: '#C4902A', flexShrink: 0 }}
                    className="transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="px-6 pb-5">
                  <div style={{ height: '1px', background: '#E8D5B7', marginBottom: '1rem' }} />
                  <p className="text-sm leading-relaxed" style={{ color: '#5C6E7E' }}>
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Témoignages croisière ───────────────────────────── */}
      <section className="py-12 md:py-28" style={{ background: '#FAF7F2' }} aria-labelledby="temoignages-croisiere-heading">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <div className="text-center mb-8 md:mb-16">
            <p className="eyebrow mb-4">Ce qu&apos;ils en disent</p>
            <h2
              id="temoignages-croisiere-heading"
              className="title-underline title-underline-center"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(1.625rem, 3vw, 2.375rem)', color: '#0F3D38', fontWeight: 300, lineHeight: 1.2 }}
            >
              Ils ont navigué.
              <br />
              <em style={{ fontWeight: 400, fontStyle: 'italic' }}>Voilà ce qu&apos;ils ont vécu.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {[
              {
                name: 'Emma & famille',
                quote: "Nous avons adoré la croisière. Tout était super ! Le chef cuisinier, le personnel, les visites, le bateau, l'ambiance. Notre guide Amir très sympa.",
                detail: 'Croisière Dahabiya',
              },
              {
                name: 'Nicolas & famille',
                quote: "Nous avons passé une très belle croisière. Le bateau était très confortable et le personnel particulièrement accueillant. Notre guide Andrew a été très apprécié.",
                detail: 'Croisière Dahabiya',
              },
              {
                name: 'Mireille & Anaïs',
                quote: "Croisière unique et intime. Guide exceptionnel, équipage bienveillant. Accueil chaleureux à la Thébaïde.",
                detail: 'Croisière Dahabiya + La Thébaïde',
              },
              {
                name: 'Laura & Nicolas',
                quote: "Cette croisière était formidable. Sam est une vraie perle, passionnant et précis.",
                detail: 'Croisière Dahabiya',
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

      {/* ─── CTA Final ────────────────────────────────────── */}
      <section
        className="py-12 md:py-28 text-center relative overflow-hidden"
        style={{ background: '#0F3D38' }}
      >
        <div className="max-w-xl mx-auto px-6 relative z-10">
          <p className="eyebrow mb-4" style={{ color: '#C4902A' }}>Prêt(e) à embarquer ?</p>
          <h2
            className="text-display-lg mb-6"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#FAF7F2', fontWeight: 400 }}
          >
            Votre croisière commence
            <br />
            <em style={{ fontStyle: 'italic', color: '#CE8D5C' }}>par un message à Sophie</em>
          </h2>
          <p className="mb-10 text-sm leading-relaxed" style={{ color: '#8A9BAB' }}>
            Dates, budget, nombre de personnes, envies... Partagez tout à Sophie. Elle vous répond sous 24h et construit avec vous votre dahabiya idéale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappMain}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }} aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Écrire à Sophie sur WhatsApp
            </a>
            <Link href="/contact" className="btn btn-secondary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
              Ou écrire par email →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
