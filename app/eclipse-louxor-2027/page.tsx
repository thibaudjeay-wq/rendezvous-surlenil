import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Sun,
  Moon,
  Users,
  Home,
  Car,
  UserCheck,
  Ship,
  Camera,
  Telescope,
  MapPin,
  ChevronDown,
  Check,
} from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/constants'
import ContactCTA from '@/components/ui/ContactCTA'

export const metadata: Metadata = {
  title: 'Éclipse solaire totale du 2 août 2027 à Louxor — Séjour privatif à La Thébaïde | Rendez-vous sur le Nil',
  description:
    "Vivez l'éclipse solaire totale du 2 août 2027 depuis un rooftop privatif face au Nil, à Louxor. Formule réservée aux groupes déjà constitués : privatisation entière de La Thébaïde (4 chambres, jusqu'à 8 personnes), 5 jours / 4 nuits, guide francophone privé et chauffeur privé.",
  keywords: [
    'éclipse Louxor 2027',
    'éclipse solaire totale 2 août 2027',
    'éclipse Égypte 2027',
    'voir éclipse Louxor',
    'séjour éclipse Égypte',
    'eclipse Luxor August 2027',
  ],
  alternates: { canonical: 'https://rendezvous-surlenil.com/eclipse-louxor-2027' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://rendezvous-surlenil.com/eclipse-louxor-2027',
    siteName: 'Rendez-vous sur le Nil',
    title: "L'éclipse du siècle à Louxor — 2 août 2027",
    description:
      "Privatisez La Thébaïde pour votre groupe et vivez l'éclipse solaire totale du 2 août 2027 depuis un rooftop privatif face au Nil.",
    images: [
      {
        url: 'https://rendezvous-surlenil.com/photos/thebaide/thebaide-hero.jpg',
        width: 1200,
        height: 630,
        alt: "Rooftop de La Thébaïde face au Nil, Louxor",
      },
    ],
  },
}

// JSON-LD, Event (éclipse) + offre de séjour
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: "Éclipse solaire totale du 2 août 2027 — Séjour privatif à La Thébaïde, Louxor",
  description:
    "Observation de l'éclipse solaire totale du 2 août 2027 depuis le rooftop privatif de La Thébaïde, à Louxor. Séjour de 5 jours / 4 nuits réservé à un groupe déjà constitué, jusqu'à 8 personnes, avec guide francophone privé et chauffeur privé.",
  startDate: '2027-08-02',
  endDate: '2027-08-02',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'La Thébaïde, Louxor',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Louxor',
      addressCountry: 'EG',
    },
  },
  image: ['https://rendezvous-surlenil.com/photos/thebaide/thebaide-hero.jpg'],
  organizer: {
    '@type': 'TravelAgency',
    name: 'Rendez-vous sur le Nil',
    url: 'https://rendezvous-surlenil.com',
  },
  offers: {
    '@type': 'Offer',
    name: 'Privatisation entière de La Thébaïde — 5 jours / 4 nuits, jusqu\'à 8 personnes',
    availability: 'https://schema.org/LimitedAvailability',
    url: 'https://rendezvous-surlenil.com/eclipse-louxor-2027',
  },
}

// ─── Ce que le séjour comprend ─────────────────────────────
const inclus = [
  { icon: Home, label: 'Hébergement privatif à La Thébaïde', desc: 'Le duplex entier, 4 chambres, rooftop panoramique — rien que pour votre groupe.' },
  { icon: UserCheck, label: 'Guide francophone privé', desc: 'Dédié à votre groupe pendant tout le séjour.' },
  { icon: Car, label: 'Chauffeur privé', desc: 'Véhicule climatisé, tous les transferts et déplacements.' },
  { icon: Telescope, label: "Observation de l'éclipse depuis le rooftop", desc: 'Un espace réservé exclusivement à votre groupe, loin de la foule.' },
  { icon: Ship, label: 'Navigation en felouque sur le Nil', desc: 'Le jour de l\'éclipse, pour prolonger la journée hors du temps.' },
  { icon: MapPin, label: '5 jours / 4 nuits à Louxor', desc: 'Rive est et rive ouest, les grands sites et les trésors cachés de Thèbes.' },
]

const sitesInclus = [
  'Temple de Karnak',
  'Temple de Louxor',
  'Vallée des Rois',
  "Temple d'Hatchepsout",
  'Medinet Habou',
  'Vallée des Nobles',
  'Deir el-Médina',
  'Colosses de Memnon',
  'Souk de Louxor',
]

// ⚠️ À confirmer avec Sophie avant mise en ligne définitive
const nonInclus = [
  'Vols internationaux jusqu\'à Louxor',
  'Billets d\'entrée des sites et des tombes',
  'Repas hors petits-déjeuners',
  'Pourboires',
  'Assurance voyage',
]

const programme = [
  {
    jour: 'Jour 1',
    titre: 'Karnak et Temple de Louxor',
    points: [
      "Accueil à l'aéroport et installation à La Thébaïde.",
      'Découverte de la rive est avec votre guide francophone privé.',
      'Karnak et sa majestueuse salle hypostyle de 134 colonnes.',
      'Temple de Louxor, avenue des Sphinx et colosses de Ramsès II.',
    ],
  },
  {
    jour: 'Jour 2',
    titre: 'La Vallée des Rois',
    points: [
      'Exploration de la rive ouest.',
      'Vallée des Rois et tombes royales.',
      "Temple d'Hatchepsout à Deir el-Bahari.",
      'Colosses de Memnon. Retour à La Thébaïde, face au Nil.',
    ],
  },
  {
    jour: 'Jour 3',
    titre: "La grande éclipse",
    highlight: true,
    points: [
      'Matinée tranquille à la maison.',
      "Observation exclusive de l'éclipse solaire totale depuis le rooftop privatisé de La Thébaïde.",
      "Plus de six minutes d'obscurité au milieu des paysages de l'Égypte antique.",
      'Puis navigation en felouque sur le Nil pour prolonger cette journée hors du temps.',
    ],
  },
  {
    jour: 'Jour 4',
    titre: 'Les trésors cachés de Thèbes',
    points: [
      'Vallée des Nobles.',
      'Deir el-Médina, le village des artisans.',
      'Medinet Habou. Loin des circuits classiques, une autre facette de l\'Égypte ancienne.',
    ],
  },
  {
    jour: 'Jour 5',
    titre: 'Derniers regards sur Louxor',
    points: [
      'Promenade dans le souk de Louxor.',
      'Temps libre.',
      "Transfert vers l'aéroport.",
    ],
  },
]

const pourQui = [
  { icon: Users, label: 'Une famille', desc: 'Réunie pour partager ensemble un événement exceptionnel.' },
  { icon: Users, label: "Un groupe d'amis", desc: 'Passionnés de voyage, prêts à vivre l\'Égypte autrement.' },
  { icon: Telescope, label: "Un club d'astronomie", desc: 'Un site d\'observation privé au cœur de la bande de totalité.' },
  { icon: Camera, label: 'Des photographes ou vidéastes', desc: 'Un rooftop dégagé, face au Nil et aux montagnes thébaines.' },
]

const faq = [
  {
    q: 'Peut-on réserver une seule chambre, ou venir en couple ?',
    a: "Non. La Thébaïde est privatisée dans son intégralité pour un même groupe. Le tarif concerne l'ensemble du duplex (4 chambres), pas une chambre individuelle. Cette formule est conçue pour un groupe déjà constitué, jusqu'à 8 personnes.",
  },
  {
    q: 'Pourquoi Louxor pour cette éclipse ?',
    a: "Le 2 août 2027, Louxor se trouve au cœur de la bande de totalité. L'éclipse y durera plus de six minutes — l'une des plus longues du XXIᵉ siècle — au-dessus du Nil et de la plus grande concentration de temples de l'Égypte antique.",
  },
  {
    q: "L'observation se fait-elle vraiment depuis la maison ?",
    a: "Oui. Le rooftop panoramique de La Thébaïde est privatisé pour votre groupe le jour de l'éclipse. Vous vivez ce moment dans un cadre exclusif face au Nil, à l'écart de la foule des grands hôtels.",
  },
  {
    q: 'Combien de temps à l\'avance faut-il réserver ?',
    a: "Le plus tôt possible. La maison ne peut accueillir qu'un seul groupe pour cette date, et la demande pour l'éclipse de 2027 est déjà très forte. Écrivez à Sophie pour vérifier que la date est encore libre.",
  },
]

export default function EclipseLouxor2027Page() {
  const whatsappUrl = getWhatsAppUrl(
    "Bonjour Sophie, notre groupe est intéressé par le séjour privatif à La Thébaïde pour l'éclipse du 2 août 2027. Nous sommes ___ personnes. Pouvez-vous nous dire si la date est encore disponible ? 🌒"
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '92vh' }}>
        <div className="absolute inset-0">
          <Image
            src="/photos/thebaide/thebaide-hero.jpg"
            alt="Rooftop de La Thébaïde face au Nil, Louxor"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'brightness(0.62)', objectPosition: 'center 55%' }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(13,33,55,0.35) 0%, rgba(13,33,55,0.25) 35%, rgba(13,33,55,0.7) 75%, rgba(13,33,55,0.95) 100%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            }}
          />
        </div>

        <nav
          className="absolute top-40 left-6 md:left-16 flex items-center gap-2 text-xs z-10"
          style={{ color: 'rgba(255,255,255,0.55)' }}
          aria-label="Fil d'Ariane"
        >
          <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
          <span>/</span>
          <span style={{ color: 'rgba(255,255,255,0.85)' }}>Éclipse à Louxor · 2 août 2027</span>
        </nav>

        <div
          className="relative z-10 flex flex-col justify-end px-6 md:px-16 pb-12 md:pb-32 max-w-[1200px] mx-auto"
          style={{ minHeight: '92vh' }}
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-sm"
                style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.35)' }}
              >
                <Sun size={12} style={{ color: '#C4902A' }} aria-hidden="true" />
                <span className="text-[10px] font-medium tracking-[0.18em] uppercase" style={{ color: '#CE8D5C' }}>
                  Louxor · 2 août 2027
                </span>
              </div>
            </div>

            <h1
              className="mb-6"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                color: 'white',
                fontWeight: 300,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
              }}
            >
              L&apos;éclipse du siècle
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#CE8D5C' }}>à Louxor.</em>
            </h1>

            <p
              className="text-xl md:text-2xl mb-5"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                color: 'rgba(250,247,242,0.92)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.35,
              }}
            >
              Privatisez La Thébaïde pour votre groupe et vivez l&apos;éclipse solaire totale face au Nil.
            </p>

            <p
              className="text-base md:text-lg mb-10 max-w-xl"
              style={{ color: 'rgba(250,247,242,0.78)', fontWeight: 300, lineHeight: 1.75 }}
            >
              Le 2 août 2027, Louxor sera l&apos;un des meilleurs endroits au monde pour observer l&apos;une des plus
              longues éclipses solaires totales du XXI<sup>e</sup> siècle. Pendant plus de six minutes, le Soleil
              disparaîtra au-dessus du Nil et des temples de l&apos;ancienne Thèbes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <ContactCTA
                label="Réserver pour mon groupe"
                whatsappUrl={whatsappUrl}
                emailSubject="Éclipse du 2 août 2027 — séjour privatif La Thébaïde"
              />
              <a
                href="#programme"
                className="btn btn-secondary"
                style={{ color: 'white', borderColor: 'rgba(255,255,255,0.45)' }}
              >
                Voir le programme
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bandeau : offre réservée aux groupes ──────────── */}
      <section style={{ background: '#C4902A' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-5">
          <div className="flex items-start gap-3">
            <Users size={16} style={{ color: '#0D2137', flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
            <p className="text-sm leading-relaxed" style={{ color: '#0D2137' }}>
              <strong>Offre réservée aux groupes déjà constitués, jusqu&apos;à 8 personnes.</strong>{' '}
              La Thébaïde est privatisée dans son intégralité (4 chambres). Le tarif concerne l&apos;ensemble du duplex,
              pas une chambre individuelle. Cette formule n&apos;est pas conçue pour une réservation individuelle ou
              pour un couple seul.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Un événement rare dans un lieu unique ─────────── */}
      <section className="py-24 md:py-36" style={{ background: '#FAF7F2' }} aria-labelledby="evenement-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-5">Un événement rare dans un lieu unique</p>
              <h2
                id="evenement-heading"
                className="title-underline mb-10"
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                  color: '#0F3D38',
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                Voir une éclipse totale est déjà extraordinaire.
                <br />
                <em style={{ fontWeight: 300, fontStyle: 'italic' }}>L&apos;observer ici, encore davantage.</em>
              </h2>

              <div className="space-y-5" style={{ maxWidth: '560px' }}>
                <p className="leading-relaxed" style={{ color: '#3D5166', fontSize: '1.0625rem' }}>
                  Louxor se trouve au cœur de la bande de totalité. Pendant plus de six minutes, le jour laissera
                  place à la nuit au-dessus du Nil et des temples de l&apos;Égypte antique. Un événement rare, qui
                  attire déjà astronomes, photographes et passionnés du monde entier.
                </p>
                <p className="leading-relaxed" style={{ color: '#3D5166', fontSize: '1.0625rem' }}>
                  L&apos;observer depuis un rooftop privé face au Nil, au cœur de la plus grande concentration de
                  temples de l&apos;Égypte antique, en fait un moment véritablement exceptionnel. Loin de la foule des
                  grands hôtels, vous disposez d&apos;un espace réservé exclusivement à votre groupe.
                </p>
                <p className="leading-relaxed" style={{ color: '#3D5166', fontSize: '1.0625rem' }}>
                  Pour vivre ce moment dans les meilleures conditions, nous proposons une formule différente des
                  hôtels et des voyages de groupe classiques : une maison entière, un seul groupe, aucun partage.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-10">
                {[
                  '2 août 2027',
                  'Plus de 6 minutes de totalité',
                  'Au cœur de la bande de totalité',
                  'Rooftop privatisé',
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

            <div className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-28">
              <div className="img-portrait-lg overflow-hidden rounded-sm">
                <Image
                  src="/photos/thebaide/rooftop-transats.jpg"
                  alt="Rooftop panoramique de La Thébaïde, transats face au Nil"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="img-square overflow-hidden rounded-sm">
                  <Image
                    src="/photos/thebaide/rooftop-femme-the.jpg"
                    alt="Thé sur le rooftop de La Thébaïde au-dessus de Louxor"
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                </div>
                <div className="img-square overflow-hidden rounded-sm">
                  <Image
                    src="/photos/blog/felucque-nil-solitaire.png"
                    alt="Felouque solitaire sur le Nil à Louxor"
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

      {/* ─── Une maison entière pour votre groupe ──────────── */}
      <section className="py-24 md:py-32" style={{ background: '#0F3D38' }} aria-labelledby="maison-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="img-portrait overflow-hidden rounded-sm">
              <Image
                src="/photos/thebaide/salle-manger.jpg"
                alt="Grand espace de vie de La Thébaïde, duplex privatif à Louxor"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                style={{ objectPosition: 'center 45%' }}
              />
            </div>

            <div>
              <p className="eyebrow mb-4" style={{ color: '#C4902A' }}>Une maison entière pour votre groupe</p>
              <h2
                id="maison-heading"
                className="mb-8"
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: 'clamp(1.625rem, 3vw, 2.5rem)',
                  color: '#FAF7F2',
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                Vous ne réservez pas une chambre.
                <br />
                <em style={{ fontWeight: 300, fontStyle: 'italic', color: '#CE8D5C' }}>Vous privatisez la maison.</em>
              </h2>

              <p className="leading-relaxed mb-6" style={{ color: 'rgba(250,247,242,0.78)', fontSize: '1.0625rem' }}>
                La Thébaïde est un vaste duplex privatif situé face au Nil. Pour votre famille, votre groupe d&apos;amis,
                votre club d&apos;astronomie ou votre équipe de photographes : une seule réservation, un seul groupe,
                aucun partage avec d&apos;autres voyageurs.
              </p>

              <div className="grid grid-cols-2 gap-px rounded-sm overflow-hidden" style={{ background: 'rgba(201,169,110,0.25)' }}>
                {[
                  { n: '4', u: 'chambres', d: 'avec salle de bain privée' },
                  { n: '8', u: 'personnes', d: 'maximum, un seul groupe' },
                  { n: '1', u: 'rooftop', d: 'panoramique privatif' },
                  { n: '360°', u: '', d: 'de vue sur le Nil et les montagnes thébaines' },
                ].map(({ n, u, d }) => (
                  <div key={d} className="p-6" style={{ background: '#0F3D38' }}>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2.25rem', color: '#C4902A', fontWeight: 300, lineHeight: 1 }}>
                        {n}
                      </span>
                      {u && (
                        <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.125rem', color: 'rgba(201,169,110,0.5)', fontWeight: 300 }}>
                          {u}
                        </span>
                      )}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(250,247,242,0.6)' }}>{d}</p>
                  </div>
                ))}
              </div>

              <p
                className="mt-8 text-sm italic"
                style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.125rem', color: '#CE8D5C' }}
              >
                Parce que certains événements méritent d&apos;être vécus ensemble.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Le séjour comprend ────────────────────────────── */}
      <section className="py-24 md:py-32" style={{ background: '#FDF8F0' }} aria-labelledby="inclus-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="max-w-lg mb-16">
            <p className="eyebrow mb-4">Le séjour comprend</p>
            <h2
              id="inclus-heading"
              className="title-underline"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(1.625rem, 3vw, 2.5rem)',
                color: '#0F3D38',
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              5 jours / 4 nuits à Louxor,
              <br />
              <em style={{ fontWeight: 300, fontStyle: 'italic' }}>tout organisé.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {inclus.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="p-7 rounded-sm" style={{ background: 'white', border: '1px solid #E8D5B7' }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-5"
                  style={{ background: '#FDF8F0', border: '1px solid #E8D5B7' }}
                >
                  <Icon size={17} style={{ color: '#C4902A' }} aria-hidden="true" />
                </div>
                <h3 className="mb-3" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.25rem', color: '#0F3D38', fontWeight: 500 }}>
                  {label}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5C6E7E', lineHeight: 1.8 }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Sites visités + non inclus */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <div className="p-8 rounded-sm" style={{ background: 'white', border: '1px solid #E8D5B7' }}>
              <p className="text-xs font-semibold tracking-wider uppercase mb-5" style={{ color: '#C4902A' }}>
                Les sites visités
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {sitesInclus.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-sm" style={{ color: '#3D5166' }}>
                    <Check size={14} style={{ color: '#C4902A', flexShrink: 0, marginTop: 3 }} aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-sm" style={{ background: '#FAF7F2', border: '1px solid #E8D5B7' }}>
              <p className="text-xs font-semibold tracking-wider uppercase mb-5" style={{ color: '#8A9BAB' }}>
                Non inclus
              </p>
              <ul className="flex flex-col gap-2.5">
                {nonInclus.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-sm" style={{ color: '#5C6E7E' }}>
                    <span className="flex-shrink-0 mt-2 w-1 h-1 rounded-full" style={{ background: '#8A9BAB' }} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Programme jour par jour ───────────────────────── */}
      <section id="programme" className="py-24 md:py-32" style={{ background: '#0D2137' }} aria-labelledby="programme-heading">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12">
          <div className="text-center max-w-xl mx-auto mb-16">
            <p className="eyebrow mb-4" style={{ color: '#C4902A' }}>Programme 4 nuits / 5 jours</p>
            <h2
              id="programme-heading"
              className="title-underline title-underline-center"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(1.625rem, 3vw, 2.5rem)',
                color: '#FAF7F2',
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              Le rendez-vous du voyage,
              <br />
              <em style={{ fontWeight: 300, fontStyle: 'italic', color: '#CE8D5C' }}>jour après jour.</em>
            </h2>
          </div>

          <div className="flex flex-col gap-0">
            {programme.map(({ jour, titre, points, highlight }, i) => (
              <div key={jour} className="flex gap-6 md:gap-8">
                <div className="flex flex-col items-center">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: highlight ? '#C4902A' : 'rgba(201,169,110,0.12)',
                      border: '1px solid rgba(201,169,110,0.4)',
                    }}
                  >
                    {highlight ? (
                      <Moon size={15} style={{ color: '#0D2137' }} aria-hidden="true" />
                    ) : (
                      <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1rem', color: '#C4902A' }}>{i + 1}</span>
                    )}
                  </div>
                  {i < programme.length - 1 && (
                    <div style={{ width: 1, flex: 1, background: 'rgba(201,169,110,0.2)', minHeight: 40, margin: '8px 0' }} />
                  )}
                </div>

                <div className="pb-12">
                  <p
                    className="font-medium mb-1"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C4902A' }}
                  >
                    {jour}
                  </p>
                  <h3
                    className="mb-4"
                    style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', color: '#FAF7F2', fontWeight: 400 }}
                  >
                    {titre}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(250,247,242,0.72)', lineHeight: 1.7 }}>
                        <span className="flex-shrink-0 mt-2 w-1 h-1 rounded-full" style={{ background: '#C4902A' }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pour qui ? ────────────────────────────────────── */}
      <section className="py-24 md:py-32" style={{ background: '#FAF7F2' }} aria-labelledby="pourqui-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="eyebrow mb-4">Pour qui ?</p>
            <h2
              id="pourqui-heading"
              className="title-underline title-underline-center"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(1.625rem, 3vw, 2.5rem)',
                color: '#0F3D38',
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              Réunissez <em style={{ fontWeight: 300, fontStyle: 'italic' }}>votre tribu.</em>
            </h2>
            <p className="mt-8 text-base leading-relaxed mx-auto max-w-xl" style={{ color: '#5C6E7E' }}>
              Le duplex étant entièrement privatisé, l&apos;offre est particulièrement avantageuse pour les groupes de
              plusieurs personnes souhaitant partager les frais tout en profitant d&apos;un hébergement exclusif.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pourQui.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="p-6 rounded-sm" style={{ background: 'white', border: '1px solid #E8D5B7' }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                  style={{ background: '#FDF8F0', border: '1px solid #E8D5B7' }}
                >
                  <Icon size={16} style={{ color: '#C4902A' }} aria-hidden="true" />
                </div>
                <h3 className="mb-2" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.125rem', color: '#0F3D38', fontWeight: 500 }}>
                  {label}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5C6E7E', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm mt-12 mx-auto max-w-xl" style={{ color: '#8A9BAB' }}>
            Cette formule n&apos;est pas conçue pour des réservations individuelles ou pour un couple seul, le duplex
            étant privatisé dans son intégralité pour un même groupe.
          </p>
        </div>
      </section>

      {/* ─── Tarif ─────────────────────────────────────────── */}
      <section className="py-12 md:py-24" style={{ background: '#0F3D38', borderTop: '1px solid #2A5A54' }} aria-labelledby="tarif-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow mb-4" style={{ color: '#C4902A' }}>Le tarif</p>
              <h2
                id="tarif-heading"
                className="mb-6"
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: 'clamp(1.625rem, 3vw, 2.5rem)',
                  color: '#FAF7F2',
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                Un tarif unique pour toute la maison,
                <br />
                <em style={{ fontWeight: 300, fontStyle: 'italic', color: '#CE8D5C' }}>communiqué sur demande.</em>
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: '#8A9BAB' }}>
                Le tarif couvre la privatisation entière de La Thébaïde pour la durée du séjour, quel que soit le
                nombre de participants (8 maximum) — plus votre groupe est complet, plus le coût par personne diminue.
                Écrivez à Sophie avec le nombre de participants et vos dates : elle vous communique le tarif et
                vérifie que la date est encore libre.
              </p>

              <div className="flex flex-col gap-2.5">
                {[
                  'Duplex entier privatisé — 4 chambres',
                  '5 jours / 4 nuits à Louxor',
                  'Guide francophone privé + chauffeur privé',
                  "Observation de l'éclipse depuis le rooftop",
                  'Navigation en felouque sur le Nil',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(250,247,242,0.75)' }}>
                    <Check size={14} style={{ color: '#C4902A', flexShrink: 0 }} aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div
              className="p-8 rounded-sm text-center"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,169,110,0.25)' }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.3)' }}>
                <Moon size={24} style={{ color: '#C4902A' }} aria-hidden="true" />
              </div>
              <h3 className="mb-3" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', color: '#FAF7F2', fontWeight: 400 }}>
                Réserver pour votre groupe
              </h3>
              <p className="text-sm mb-8 leading-relaxed" style={{ color: '#8A9BAB' }}>
                Écrivez à Sophie avec le nombre de participants et vos dates envisagées. Elle vous répond sous 24h,
                en français, avec le tarif et la disponibilité.
              </p>
              <div className="flex flex-col gap-3">
                <ContactCTA
                  label="Vérifier la disponibilité"
                  whatsappUrl={whatsappUrl}
                  emailSubject="Éclipse du 2 août 2027 — séjour privatif La Thébaïde"
                  fullWidth
                />
              </div>
              <p className="mt-4 text-xs" style={{ color: 'rgba(138,155,171,0.7)' }}>
                Une seule réservation possible pour cette date.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────── */}
      <section className="py-12 md:py-28" style={{ background: '#FAF7F2' }}>
        <div className="max-w-2xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">Questions fréquentes</p>
            <h2
              className="title-underline title-underline-center"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
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
              <details key={item.q} className="group rounded-sm overflow-hidden" style={{ background: 'white', border: '1px solid #E8D5B7' }}>
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none" style={{ color: '#0F3D38' }}>
                  <span className="font-medium text-sm pr-4">{item.q}</span>
                  <ChevronDown size={16} style={{ color: '#C4902A', flexShrink: 0 }} className="transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="px-6 pb-5">
                  <div style={{ height: 1, background: '#E8D5B7', marginBottom: '1rem' }} />
                  <p className="text-sm leading-relaxed" style={{ color: '#5C6E7E' }}>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA final ─────────────────────────────────────── */}
      <section className="relative py-24 md:py-36 text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/photos/hero/hero-nil.jpg"
            alt="Coucher de soleil sur le Nil à Louxor"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'brightness(0.5)', objectPosition: 'center 55%' }}
          />
          <div className="absolute inset-0" style={{ background: 'rgba(13,33,55,0.55)' }} />
        </div>

        <div className="relative z-10 max-w-xl mx-auto px-6">
          <p className="eyebrow mb-4" style={{ color: '#CE8D5C' }}>Louxor 2027, un voyage qui ne se reproduira pas</p>
          <h2
            className="mb-6"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              color: 'white',
              fontWeight: 300,
              lineHeight: 1.15,
            }}
          >
            Regardez le ciel s&apos;éteindre
            <br />
            <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#CE8D5C' }}>au-dessus du Nil.</em>
          </h2>
          <p className="mb-10 text-base leading-relaxed" style={{ color: 'rgba(250,247,242,0.78)' }}>
            Une seule maison, une seule date, un seul groupe. Écrivez à Sophie avec le nombre de participants —
            elle vous dira si le 2 août 2027 est encore libre.
          </p>
          <ContactCTA
            label="Écrire à Sophie"
            whatsappUrl={whatsappUrl}
            emailSubject="Éclipse du 2 août 2027 — séjour privatif La Thébaïde"
          />
        </div>
      </section>
    </>
  )
}
