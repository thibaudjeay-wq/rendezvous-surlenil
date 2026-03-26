import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { UserCheck, Car, Phone, ChevronDown } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Escapades en Égypte avec guide privé francophone, Louxor, Siwa, Désert | Rendez-vous sur le Nil',
  description:
    'Explorez l\'Égypte avec guide francophone privé et chauffeur dédié : pyramides du Caire, Vallée des Rois, oasis de Siwa, désert blanc. À la journée ou sur plusieurs jours. Tarifs affichés.',
  alternates: { canonical: 'https://rendezvous-surlenil.com/sejours/escapades-serenite' },
  openGraph: {
    title: 'Escapades Sérénité, Guide privé francophone en Égypte | Rendez-vous sur le Nil',
    description: 'Guide francophone privé et chauffeur dédié pour explorer l\'Égypte à votre rythme. Le Caire, Siwa, Louxor, désert blanc. Tarifs affichés.',
    images: [{ url: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=1200&q=85', width: 1200, height: 630, alt: 'Escapades Sérénité, désert blanc Égypte' }],
  },
}

const destinations = [
  {
    id: 'caire',
    name: 'Le Caire',
    tagline: 'Pyramides, sphinx et trésors millénaires.',
    accroche:
      'Le Caire est une ville qui déborde, de bruit, de vie, d\'histoire. Avec le bon guide à vos côtés, elle devient fascinante plutôt qu\'intimidante. Pyramides de Gizeh et Sphinx au lever du soleil, Grand Egyptian Museum et ses trésors de Toutânkhamon, vieux Caire copte, bazars de Khan el-Khalili, Saqqarah et ses pyramides à degrés.',
    options: [
      { label: 'Pyramides, Sphinx & Grand Egyptian Museum' },
      { label: 'Le vieux Caire & bazar Khan el-Khalili' },
      { label: 'Saqqarah & Dahshur' },
    ],
    pricing: 'À partir de 60 € par personne / jour',
    pricingNote: 'Tickets d\'entrée en sus',
    image: '/photos/signature/marche-lanternes.jpg',
    imageAlt: 'Boutique de lanternes dorées au Caire, Khan el-Khalili, Escapades Sérénité',
    ctaMessage: 'Bonjour Sophie, je souhaite organiser une Escapade Sérénité au Caire. Pouvez-vous me donner plus d\'informations ? 🌿',
  },
  {
    id: 'fayoum',
    name: 'Le Fayoum',
    tagline: 'L\'Égypte secrète, loin des foules.',
    accroche:
      'À deux heures du Caire, le Fayoum est l\'une des destinations les plus méconnues et les plus envoûtantes d\'Égypte. Village de potiers, lac Magique, Wadi Al-Hitan, la vallée des baleines fossiles inscrite au patrimoine mondial, et les dunes du Wadi el-Rayan pour finir avec une session de sandboard.',
    options: [],
    pricingOptions: [
      { label: '1 journée', price: '170 €' },
      { label: '2 jours avec nuit en bivouac', price: '250 €' },
    ],
    pricingNote: 'Combinaisons sur devis',
    image: '/photos/escapades/tunnel-craie.jpg',
    imageAlt: 'Formations calcaires du désert blanc, Égypte, Escapades Sérénité',
    ctaMessage: 'Bonjour Sophie, je souhaite organiser une Escapade Sérénité au Fayoum. Pouvez-vous me donner plus d\'informations ? 🌿',
  },
  {
    id: 'siwa',
    name: 'Siwa',
    tagline: 'L\'oasis au bout du monde.',
    accroche:
      'Siwa est une oasis berbère perdue à l\'ouest de l\'Égypte, à la frontière libyenne. Un monde à part, palmiers dattiers, sources chaudes, lacs salés turquoise, forteresse en pisé et temple de l\'Oracle d\'Amon où Alexandre le Grand vint chercher sa destinée.',
    options: [],
    pricingOptions: [
      { label: '3 jours', price: '325 €' },
      { label: '4 jours', price: '400 €' },
      { label: '5 jours', price: '490 €' },
    ],
    pricingNote: 'Combinaisons avec Bahariya ou grotte de Djara, nous consulter',
    image: '/photos/privileges/siwa-lac-turquoise.jpg',
    imageAlt: 'Lac turquoise de Siwa, Égypte, Escapades Sérénité',
    ctaMessage: 'Bonjour Sophie, je souhaite organiser une Escapade Sérénité à Siwa. Pouvez-vous me donner plus d\'informations ? 🌿',
  },
  {
    id: 'desert',
    name: 'Désert occidental',
    tagline: 'Le blanc, le noir et les étoiles.',
    accroche:
      'Le désert blanc d\'Égypte est l\'un des paysages les plus irréels de la planète, des formations calcaires sculptées par le vent qui surgissent du sable comme des fantômes. Combiné avec le désert noir de Bahariya et ses collines volcaniques, c\'est une expérience sensorielle totale.',
    options: [],
    pricingOptions: [
      { label: '2 jours', price: '190 €' },
      { label: '3 jours', price: '290 €' },
    ],
    pricingNote: 'Combinaisons, nous consulter',
    image: '/photos/escapades/cuisine-feu-desert-blanc.jpg',
    imageAlt: 'Cuisine au feu dans le désert blanc, Égypte, Escapades Sérénité',
    ctaMessage: 'Bonjour Sophie, je souhaite organiser une Escapade Sérénité dans le désert occidental. Pouvez-vous me donner plus d\'informations ? 🌿',
  },
  {
    id: 'louxor',
    name: 'Louxor',
    tagline: 'La capitale mondiale de l\'archéologie.',
    accroche:
      'Nulle part ailleurs au monde on ne trouve une telle concentration de chefs-d\'œuvre antiques sur un si petit territoire. La Vallée des Rois et ses tombeaux aux couleurs intactes, les temples de Karnak et Louxor illuminés le soir, les colosses de Memnon qui veillent sur la plaine.',
    options: [
      { label: 'Rive Est : temples de Karnak + temple de Louxor' },
      { label: 'Rive Ouest : Vallée des Rois, colosses de Memnon, temple d\'Hatchepsout' },
      { label: 'Temple de Medinet Habu, vallée des artisans, vallée des nobles' },
      { label: 'Vol en montgolfière, 100 € par personne (option)' },
    ],
    pricing: 'À partir de 60 € par personne / jour',
    pricingNote: 'Tickets d\'entrée et repas en sus',
    image: '/photos/signature/karnak-colonnes.jpg',
    imageAlt: 'Colonnes de Karnak au lever du soleil, Louxor, Escapades Sérénité',
    ctaMessage: 'Bonjour Sophie, je souhaite organiser une Escapade Sérénité à Louxor. Pouvez-vous me donner plus d\'informations ? 🌿',
  },
  {
    id: 'assouan',
    name: 'Assouan',
    tagline: 'La douceur nubienne au bord du Nil.',
    accroche:
      'Assouan est la ville la plus douce d\'Égypte, une lumière différente, un rythme plus lent, une chaleur humaine particulière. Le temple de Philae sur son île, l\'obélisque inachevé qui dort encore dans sa carrière, les cataractes du Nil, un village nubien aux maisons peintes de couleurs vives.',
    options: [
      { label: 'Temple de Philae, obélisque inachevé, cataractes du Nil, village nubien' },
      { label: 'Excursion Abou Simbel, +130 € par personne (option)' },
    ],
    pricing: 'À partir de 60 € par personne / jour',
    pricingNote: 'Tickets d\'entrée et repas en sus',
    image: '/photos/dahabiya/exterieur-coucher.jpg',
    imageAlt: 'Dahabiya et le Nil à Assouan au coucher de soleil, Escapades Sérénité',
    ctaMessage: 'Bonjour Sophie, je souhaite organiser une Escapade Sérénité à Assouan. Pouvez-vous me donner plus d\'informations ? 🌿',
  },
]

const faq = [
  {
    q: 'Les escapades sont-elles uniquement disponibles pour les groupes ?',
    a: 'Non, les Escapades Sérénité sont conçues pour vous, que vous soyez seul(e), en couple, en famille ou entre amis. Votre guide et votre chauffeur vous sont entièrement dédiés. Vous n\'avez pas à partager l\'expérience avec des inconnus.',
  },
  {
    q: 'Peut-on combiner plusieurs destinations ?',
    a: 'Oui. Sophie peut construire un itinéraire combinant plusieurs destinations, par exemple Siwa + désert occidental, ou Le Caire + Fayoum. Les combinaisons sont proposées sur devis. Écrivez-lui pour qu\'elle vous suggère la meilleure organisation selon vos dates.',
  },
  {
    q: 'Le guide francophone est-il certifié ?',
    a: 'Tous les guides sélectionnés par Sophie et Nasser sont des guides officiels, diplômés et francophones. Ils connaissent les sites dans leurs moindres détails, et surtout, ils savent raconter. Nasser les choisit un par un, après des années de collaboration de confiance.',
  },
  {
    q: 'Peut-on ajouter une Escapade à un Séjour Signature ou une croisière dahabiya ?',
    a: 'Absolument, c\'est même souvent le meilleur scénario. Une escapade au Caire avant d\'embarquer pour la croisière, ou quelques jours à Siwa en fin de voyage. Sophie intègre les escapades dans un itinéraire global fluide.',
  },
]

export default function EscapadesPage() {
  const whatsappUrlDefault = getWhatsAppUrl(
    'Bonjour Sophie, je suis intéressé(e) par les Escapades Sérénité. Pouvez-vous me présenter les options disponibles ? 🌿'
  )

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '80vh' }}>
        <div className="absolute inset-0">
          <Image
            src="/photos/voyageurs/femme-coucher-shali.jpg"
            alt="Voyageuse au coucher de soleil sur les ruines de Shali, Siwa, Escapades Sérénité"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'brightness(0.65)', objectPosition: 'center 40%' }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(13,33,55,0.2) 0%, rgba(13,33,55,0.1) 35%, rgba(13,33,55,0.65) 75%, rgba(13,33,55,0.92) 100%)',
            }}
          />
        </div>

        <div
          className="relative z-10 flex flex-col justify-end px-6 md:px-16 pb-20 md:pb-32 max-w-[1200px] mx-auto"
          style={{ minHeight: '80vh' }}
        >
          <nav
            className="absolute top-28 left-6 md:left-16 flex items-center gap-2 text-xs z-10"
            style={{ color: 'rgba(255,255,255,0.55)' }}
            aria-label="Fil d'Ariane"
          >
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/experiences-egypte" className="hover:text-white transition-colors">Expériences</Link>
            <span>/</span>
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>Escapades Sérénité</span>
          </nav>

          <div className="max-w-2xl">
            <p className="eyebrow mb-5" style={{ color: '#CE8D5C' }}>Guide privé · Chauffeur dédié · Rien que pour vous</p>
            <h1
              className="mb-6"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                color: 'white',
                fontWeight: 300,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
              }}
            >
              Escapades Sérénité
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#CE8D5C' }}>l&apos;Égypte immersive, à votre rythme</em>
            </h1>
            <p
              className="text-base md:text-lg mb-12 max-w-xl"
              style={{ color: 'rgba(250,247,242,0.82)', fontWeight: 300, lineHeight: 1.75 }}
            >
              Vous êtes déjà en Égypte, ou vous souhaitez composer votre propre itinéraire ?
              Nos escapades sont des expériences immersives clé en main, guide francophone privé et chauffeur dédié inclus,
              à la journée ou sur plusieurs jours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappUrlDefault}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Parlons de votre voyage →
              </a>
              <a
                href="#destinations"
                className="btn btn-secondary"
                style={{ color: 'white', borderColor: 'rgba(255,255,255,0.45)' }}
              >
                Voir les destinations
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Ce qui est inclus ──────────────────────────────── */}
      <section style={{ background: '#0F3D38', borderBottom: '1px solid #2A5A54' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: UserCheck,
                label: 'Guide francophone privé certifié',
                desc: 'Sélectionné par Nasser, dédié à votre groupe. Diplômé, bilingue, passionné.',
              },
              {
                icon: Car,
                label: 'Chauffeur dédié inclus',
                desc: 'Véhicule climatisé, chauffeur de confiance. Vous ne gérez pas la logistique.',
              },
              {
                icon: Phone,
                label: 'Accompagnement WhatsApp',
                desc: 'Sophie disponible de 10h à 19h avant et pendant votre escapade.',
              },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.3)' }}
                >
                  <Icon size={16} style={{ color: '#C4902A' }} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: '#FAF7F2' }}>{label}</p>
                  <p className="text-xs leading-relaxed" style={{ color: '#8A9BAB' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Destinations ───────────────────────────────────── */}
      <section id="destinations" className="py-20 md:py-32" style={{ background: '#FAF7F2' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 md:mb-24">
            <div>
              <p className="eyebrow mb-4">Les destinations</p>
              <h2
                className="title-underline mb-8"
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                  color: '#0F3D38',
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                Six façons de vivre l&apos;Égypte
                <br />
                <em style={{ fontWeight: 300, fontStyle: 'italic' }}>autrement.</em>
              </h2>
              <p className="text-base leading-relaxed" style={{ color: '#5C6E7E' }}>
                Chaque escapade est conçue comme une expérience en soi, pas une visite guidée de masse.
                Votre guide connaît les heures, les angles, les anecdotes que les autres n&apos;ont pas.
              </p>
            </div>
            <div className="img-section overflow-hidden rounded-sm hidden lg:block">
              <Image
                src="/photos/voyageurs/escapades-intro.jpg"
                alt="Voyageurs en Égypte, Escapades Sérénité"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-16 lg:gap-24">
            {destinations.map((d, i) => (
              <article
                key={d.id}
                id={d.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start ${
                  i % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Image */}
                <div
                  className={`img-section overflow-hidden rounded-sm ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}
                >
                  <Image
                    src={d.image}
                    alt={d.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <p className="eyebrow mb-3">{d.name}</p>
                  <h3
                    className="title-underline mb-5"
                    style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                      color: '#0F3D38',
                      fontWeight: 400,
                      lineHeight: 1.2,
                    }}
                  >
                    {d.tagline}
                  </h3>
                  <p className="leading-relaxed mb-7" style={{ color: '#5C6E7E', fontSize: '1rem' }}>
                    {d.accroche}
                  </p>

                  {/* Options incluses */}
                  {d.options && d.options.length > 0 && (
                    <div className="mb-7">
                      <p className="text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: '#C4902A' }}>
                        Ce que vous pouvez visiter
                      </p>
                      <ul className="flex flex-col gap-2">
                        {d.options.map((opt) => (
                          <li key={opt.label} className="flex items-start gap-2.5 text-sm" style={{ color: '#5C6E7E' }}>
                            <div className="w-1 h-1 rounded-full flex-shrink-0 mt-2" style={{ background: '#C4902A' }} />
                            {opt.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tarif */}
                  <div
                    className="p-5 rounded-sm mb-7"
                    style={{ background: 'white', border: '1px solid #E8D5B7' }}
                  >
                    <p className="text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: '#C4902A' }}>
                      Tarif
                    </p>
                    {'pricingOptions' in d && d.pricingOptions ? (
                      <div className="flex flex-col gap-2">
                        {d.pricingOptions.map((opt) => (
                          <div key={opt.label} className="flex items-center justify-between gap-4">
                            <span className="text-sm" style={{ color: '#5C6E7E' }}>{opt.label}</span>
                            <span
                              style={{
                                fontFamily: 'Cormorant Garamond',
                                fontSize: '1.25rem',
                                color: '#C4902A',
                                fontWeight: 400,
                                flexShrink: 0,
                              }}
                            >
                              {opt.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p
                        style={{
                          fontFamily: 'Cormorant Garamond',
                          fontSize: '1.375rem',
                          color: '#C4902A',
                          fontWeight: 400,
                        }}
                      >
                        {d.pricing}
                      </p>
                    )}
                    {d.pricingNote && (
                      <p className="text-xs mt-2.5" style={{ color: '#8A9BAB' }}>{d.pricingNote}</p>
                    )}
                  </div>

                  <a
                    href={getWhatsAppUrl(d.ctaMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Demander une proposition →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Combiner les escapades ─────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: '#0F3D38' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="eyebrow mb-4" style={{ color: '#C4902A' }}>Combiner & personnaliser</p>
              <h2
                className="mb-6"
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                  color: '#FAF7F2',
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                Ces escapades s&apos;intègrent
                <br />
                <em style={{ fontWeight: 300, fontStyle: 'italic', color: '#CE8D5C' }}>dans votre voyage complet.</em>
              </h2>
              <p className="leading-relaxed mb-5" style={{ color: 'rgba(250,247,242,0.75)', fontSize: '1rem' }}>
                Vous préparez une croisière dahabiya ? Ajoutez quelques jours au Caire avant d&apos;embarquer.
                Vous séjournez à La Thébaïde ? Intégrez une escapade à Siwa ou dans le désert blanc.
                Sophie construit l&apos;itinéraire global, les escapades en font naturellement partie.
              </p>
              <p className="leading-relaxed mb-10" style={{ color: 'rgba(250,247,242,0.75)', fontSize: '1rem' }}>
                Les combinaisons d&apos;escapades sont toujours possibles, un devis personnalisé vous est soumis.
                Contactez Sophie pour qu&apos;elle vous propose la meilleure organisation selon vos dates et vos envies.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Croisières Dahabiya, Louxor–Assouan', href: '/croisieres-dahabiya' },
                  { label: 'Séjours Signatures, clé en main depuis Louxor', href: '/sejours/signature' },
                  { label: 'Travel Planner, intégrer vos escapades à votre itinéraire', href: '/sur-mesure' },
                ].map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center justify-between gap-4 p-4 rounded-sm group"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,169,110,0.18)' }}
                  >
                    <span className="text-sm transition-colors group-hover:text-[#C4902A]" style={{ color: 'rgba(250,247,242,0.75)' }}>
                      {label}
                    </span>
                    <span className="text-xs font-medium" style={{ color: '#C4902A', flexShrink: 0 }}>→</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="img-portrait overflow-hidden rounded-sm">
              <Image
                src="/photos/sophie/sophie-nil-coucher.jpg"
                alt="Sophie Godineau, travel planner Égypte, Rendez-vous sur le Nil"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: '#FDF8F0' }}>
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

      {/* ─── CTA final ──────────────────────────────────────── */}
      <section className="relative py-24 md:py-36 text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/photos/voyageurs/festin-dunes.jpg"
            alt="Festin bédouin au coucher de soleil sur les dunes, Escapades Sérénité"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'brightness(0.4)' }}
          />
          <div className="absolute inset-0" style={{ background: 'rgba(13,33,55,0.55)' }} />
        </div>

        <div className="relative z-10 max-w-xl mx-auto px-6">
          <p className="eyebrow mb-4" style={{ color: '#CE8D5C' }}>Votre prochaine escapade</p>
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
            L&apos;Égypte que vous avez imaginée
            <br />
            <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#CE8D5C' }}>existe vraiment.</em>
          </h2>
          <p className="mb-10 text-base leading-relaxed" style={{ color: 'rgba(250,247,242,0.78)' }}>
            Demandez une proposition à Sophie, elle vous répond sous 24h.
          </p>
          <a
            href={whatsappUrlDefault}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }} aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Parlons de votre voyage →
          </a>
          <p className="mt-4 text-xs" style={{ color: 'rgba(138,155,171,0.75)' }}>
            Réponse sous 24h, en français
          </p>
        </div>
      </section>
    </>
  )
}
