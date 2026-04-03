import type { Metadata } from 'next'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import { getWhatsAppUrl, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Sophie, Travel Planner Égypte sur mesure | Rendez-vous sur le Nil',
  description:
    'Sophie Godineau, travel planner spécialisée en Égypte. Avec Nasser, son partenaire égyptien, ils vous ouvrent une Égypte que les circuits classiques ne montrent jamais.',
  alternates: {
    canonical: `${SITE_URL}/sophie`,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sophie Godineau',
  jobTitle: 'Travel Planner Égypte',
  description: 'Travel planner spécialisée en Égypte. Dix ans de voyages, de rencontres et de terrain pour construire une Égypte sur mesure, authentique et hors des sentiers touristiques.',
  worksFor: {
    '@type': 'TouristAgency',
    name: 'Rendez-vous sur le Nil',
    url: SITE_URL,
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Louxor',
    addressCountry: 'EG',
  },
  knowsLanguage: ['fr', 'en', 'ar'],
}

const WHATSAPP_SOPHIE = getWhatsAppUrl(
  "Bonjour Sophie, j'ai découvert Rendez-vous sur le Nil et je souhaite échanger avec vous sur un projet de voyage en Égypte. Pouvez-vous me dire quand vous êtes disponible pour un appel ?"
)

// ─── Données ──────────────────────────────────────────────────────────────────

const engagements = [
  {
    num: '01',
    title: 'Un premier échange sans engagement',
    description:
      'Avant tout projet, je prends le temps de comprendre qui vous êtes et ce que vous cherchez vraiment. Pas de formulaire, pas de devis automatique, une vraie conversation.',
  },
  {
    num: '02',
    title: 'Un itinéraire dessiné pour vous seuls',
    description:
      "Je ne recycle pas un programme existant. Chaque itinéraire part de zéro, calibré sur votre rythme, vos centres d'intérêt, votre façon d'être en voyage.",
  },
  {
    num: '03',
    title: "Des adresses que je ne donnerais pas à tout le monde",
    description:
      "Les maisons d'hôtes que je recommande, je les ai visitées. Les guides que je missionne, je les connais depuis des années. Chaque prestataire est choisi à la main.",
  },
  {
    num: '04',
    title: 'Disponible avant, pendant et après',
    description:
      "Vous ne gérez rien seuls. Je suis joignable pendant le voyage pour le moindre imprévu. Et après votre retour, je suis là si vous avez des questions.",
  },
  {
    num: '05',
    title: 'Tout en français, sans filtre',
    description:
      "Pas de barrière de langue, pas d'intermédiaire. Vous me parlez comme à quelqu'un de confiance, parce que c'est exactement ce que je veux être.",
  },
]

const differences = [
  {
    them: 'Un catalogue de programmes standardisés',
    us: "Un itinéraire créé pour vous seuls, à partir d'une conversation",
  },
  {
    them: "Un groupe de 15 personnes que vous n'avez pas choisies",
    us: "Votre famille, vos amis, et personne d'autre",
  },
  {
    them: 'Un correspondant local que vous ne connaissez pas',
    us: 'Nasser, qui accueille les voyageurs à La Thébaïde et coordonne tout sur le terrain',
  },
  {
    them: 'Une hotline impersonnelle en cas de problème',
    us: 'Mon numéro direct, disponible pendant tout votre voyage',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SophiePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <style>{`
        .role-item + .role-item { border-top: 1px solid #E8D5B7; }
        .role-item:hover .role-num { color: #C4902A; }
      `}</style>

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: '100svh', background: '#0F3D38' }}
        aria-label="Sophie Godineau, Travel Planner en Égypte"
      >
        {/* Fond, .img-hero couvre toute la section */}
        <div className="absolute inset-0 z-0 img-hero">
          <Image
            src="/photos/sophie/sophie-portrait.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: 'center 20%', filter: 'brightness(0.35) saturate(1.1)' }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(105deg, rgba(13,33,55,0.97) 0%, rgba(13,33,55,0.82) 44%, rgba(13,33,55,0.35) 100%)',
            }}
            aria-hidden="true"
          />
        </div>

        <div
          className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          style={{ minHeight: '100svh', paddingTop: 'clamp(80px, 12vw, 120px)', paddingBottom: 'clamp(48px, 8vw, 80px)' }}
        >
          {/* Texte, 7 colonnes */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-7">
              <div style={{ width: '32px', height: '1px', background: '#C4902A' }} />
              <span className="eyebrow" style={{ color: '#CE8D5C' }}>Travel Planner en Égypte</span>
            </div>

            <h1
              className="text-display-xl mb-7"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                color: 'white',
                fontWeight: 300,
                lineHeight: 1.08,
              }}
            >
              Sophie Godineau
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#CE8D5C' }}>
                une connaissance intime
              </em>
              <br />
              <span style={{ fontWeight: 300 }}>de l&apos;Égypte vraie</span>
            </h1>

            <p
              className="text-lg leading-relaxed mb-12"
              style={{ color: 'rgba(250,247,242,0.78)', maxWidth: '480px', fontWeight: 300 }}
            >
              Je connais l&apos;Égypte de l&apos;intérieur, j&apos;y reviens depuis des années,
              et ce pays ne me lâche pas. Je ne vends pas des voyages. J&apos;ouvre des portes.
            </p>

            <div className="flex flex-wrap gap-10">
              {[
                { value: 'Terrain', label: 'connaissance intime' },
                { value: '100%', label: 'sur mesure' },
                { value: 'FR', label: 'interlocutrice' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p
                    style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontSize: '2rem',
                      fontWeight: 300,
                      color: '#C4902A',
                      lineHeight: 1,
                    }}
                  >
                    {value}
                  </p>
                  <p
                    className="mt-1"
                    style={{ fontSize: '0.6875rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.4)' }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Portrait flottant, desktop uniquement */}
          <div className="hidden lg:block lg:col-span-5 relative">
            {/* Ratio portrait 3:4, avec maxHeight pour éviter un bloc trop haut */}
            <div
              className="img-portrait overflow-hidden rounded-sm"
              style={{ maxHeight: '560px', boxShadow: '0 32px 64px rgba(0,0,0,0.4)' }}
            >
              <Image
                src="/photos/sophie/sophie-nasser-errr.jpg"
                alt="Sophie Godineau et Nasser sur le Nil, Louxor, Égypte"
                fill
                sizes="(max-width: 1280px) 40vw, 480px"
                className="object-cover"
                style={{ objectPosition: 'center top' }}
              />
              <div className="img-overlay-bottom" aria-hidden="true" />
            </div>
            {/* Citation flottante */}
            <div
              className="absolute -bottom-6 -left-6 p-5 shadow-2xl"
              style={{ background: '#C4902A', borderRadius: '2px', maxWidth: '220px' }}
            >
              <p
                className="italic leading-snug"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: 'white', fontSize: '0.9375rem' }}
              >
                &ldquo;L&apos;Égypte ne se visite pas. Elle se vit.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
          aria-hidden="true"
        >
          <div style={{ width: '1px', height: '44px', background: 'linear-gradient(to bottom, transparent, #C4902A)' }} />
        </div>
      </section>

      {/* ─── HISTOIRE ─────────────────────────────────────────────────── */}
      <section
        className="py-20 md:py-32"
        style={{ background: '#FDF8F0' }}
        aria-labelledby="histoire-heading"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Photo sticky desktop */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div
                className="img-portrait-lg overflow-hidden rounded-sm"
                style={{ maxHeight: '560px' }}
              >
                <Image
                  src="/photos/sophie/sophie-portrait.jpg"
                  alt="Sophie Godineau, travel planner à Louxor"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                  style={{ objectPosition: 'center top' }}
                />
              </div>

              {/* Petite image flottante Nil */}
              <div
                className="relative -mt-12 ml-auto w-40 rounded-sm shadow-xl overflow-hidden"
                style={{ border: '4px solid #FDF8F0' }}
              >
                <div className="img-square">
                  <Image
                    src="/photos/sophie/nasser-portrait.jpg"
                    alt="Nasser, co-fondateur de Rendez-vous sur le Nil, Louxor"
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Texte, 7 colonnes */}
            <div className="lg:col-span-7 lg:pt-4">
              <p className="eyebrow mb-4">Mon histoire</p>
              <h2
                id="histoire-heading"
                className="text-display-lg title-underline mb-12"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#0F3D38' }}
              >
                Comment l&apos;Égypte
                <br />
                <em style={{ fontStyle: 'italic', fontWeight: 300 }}>m&apos;a choisie</em>
              </h2>

              <p className="leading-relaxed mb-6" style={{ color: '#5C6E7E', fontSize: '1.0625rem' }}>
                La première fois que j&apos;ai mis les pieds à Louxor, c&apos;était pour quelques jours.
                Je suis repartie, et je n&apos;ai cessé de revenir. Ce n&apos;est pas un hasard, c&apos;est une évidence
                que je n&apos;aurais pas su m&apos;expliquer à l&apos;époque.
              </p>

              {/* Phrase forte mise en avant */}
              <p
                className="my-10 leading-relaxed"
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                  fontStyle: 'italic',
                  color: '#1E6860',
                  lineHeight: 1.5,
                  borderLeft: '2px solid #C4902A',
                  paddingLeft: '1.5rem',
                }}
              >
                Elle a appris à lire l&apos;Égypte autrement, par ses gens, ses rythmes, ses coulisses.
                Pas en touriste. En quelqu&apos;un qui revient, encore et encore, jusqu&apos;à vraiment comprendre.
              </p>

              {/* Sous-titre 1 */}
              <h3
                className="mb-4 mt-10"
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: '1.1875rem',
                  fontWeight: 500,
                  color: '#0F3D38',
                }}
              >
                Le moment où tout a basculé
              </h3>

              <p className="leading-relaxed mb-5" style={{ color: '#5C6E7E', fontSize: '1.0625rem' }}>
                Un jour, une amie m&apos;a demandé de lui organiser son voyage. Puis une autre. Puis leurs amis.
                J&apos;ai compris que ce que j&apos;avais construit ici, la connaissance intime d&apos;un pays,
                le réseau de confiance, la langue, était précieux. Que je pouvais offrir quelque chose
                qu&apos;aucun catalogue ne peut donner.
              </p>

              {/* Divider décoratif */}
              <div className="flex items-center gap-4 my-8" aria-hidden="true">
                <div style={{ flex: 1, height: '1px', background: '#E8D5B7' }} />
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C4902A' }} />
                <div style={{ flex: 1, height: '1px', background: '#E8D5B7' }} />
              </div>

              {/* Sous-titre 2 */}
              <h3
                className="mb-4"
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: '1.1875rem',
                  fontWeight: 500,
                  color: '#0F3D38',
                }}
              >
                Ce que je veux pour vous
              </h3>

              <p className="leading-relaxed mb-8" style={{ color: '#5C6E7E', fontSize: '1.0625rem' }}>
                Rendez-vous sur le Nil, c&apos;est tout ça, condensé dans une promesse simple :
                vous emmener dans mon Égypte. Celle des lumières dorées du soir sur Karnak.
                Des souks qui sentent le cumin et le jasmin. Des nuits silencieuses sur le Nil,
                bercées par le clapotis du fleuve.
              </p>

              {/* Phrase finale */}
              <p
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: '1.1875rem',
                  fontStyle: 'italic',
                  color: '#C4902A',
                  fontWeight: 400,
                }}
              >
                Pas un voyage parmi d&apos;autres. Le vôtre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MON RÔLE, Editorial ─────────────────────────────────────── */}
      <section
        className="py-12 md:py-28"
        style={{ background: 'white' }}
        aria-labelledby="role-heading"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* En-tête + image sticky */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <p className="eyebrow mb-4">Mon rôle</p>
              <h2
                id="role-heading"
                className="text-display-lg title-underline mb-8"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#0F3D38' }}
              >
                Ce que je fais
                <br />
                <em style={{ fontStyle: 'italic', fontWeight: 300 }}>pour vous, concrètement</em>
              </h2>
              <p className="leading-relaxed mb-10" style={{ color: '#5C6E7E', fontSize: '1.0625rem' }}>
                Travel planner, c&apos;est un métier qui s&apos;apprend sur le terrain.
                Voici, sans fioriture, ce que ça signifie quand vous faites appel à moi.
              </p>

              {/* Image atmosphérique, ratio 4:3 */}
              <div className="img-section overflow-hidden rounded-sm">
                <Image
                  src="/photos/sophie/sophie-desert.jpg"
                  alt="Sophie Godineau dans le désert égyptien"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Liste éditoriale numérotée */}
            <div className="lg:col-span-7">
              {engagements.map(({ num, title, description }) => (
                <div key={num} className="role-item flex gap-7 py-8">
                  <span
                    className="role-num flex-shrink-0 transition-colors duration-300"
                    style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontSize: '3rem',
                      fontWeight: 300,
                      color: '#E8D5B7',
                      lineHeight: 1,
                      width: '56px',
                      textAlign: 'right' as const,
                    }}
                    aria-hidden="true"
                  >
                    {num}
                  </span>
                  <div>
                    <h3
                      className="mb-3"
                      style={{
                        fontFamily: 'Cormorant Garamond, Georgia, serif',
                        fontSize: '1.25rem',
                        fontWeight: 500,
                        color: '#0F3D38',
                        lineHeight: 1.3,
                      }}
                    >
                      {title}
                    </h3>
                    <p className="leading-relaxed" style={{ color: '#5C6E7E', fontSize: '1rem' }}>
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── NASSER, Cinématique ─────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: '600px',
          background: '#0F3D38',
          backgroundImage: "url('/photos/sophie/sophie-nasser-duo.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }}
        aria-labelledby="nasser-heading"
      >
        {/* Overlay */}
        <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(to right, rgba(13,33,55,0.96) 0%, rgba(13,33,55,0.84) 40%, rgba(13,33,55,0.42) 68%, rgba(13,33,55,0.10) 100%)' }} aria-hidden="true" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-xl">
            <p className="eyebrow mb-5" style={{ color: '#C4902A' }}>Notre binôme</p>
            <h2
              id="nasser-heading"
              className="text-display-lg mb-10"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                color: '#FAF7F2',
                fontWeight: 300,
                lineHeight: 1.15,
              }}
            >
              Nasser
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#CE8D5C' }}>
                ou l&apos;Égypte qui se dévoile
              </em>
            </h2>

            {/* Citation Nasser */}
            <blockquote
              className="mb-10 pl-6"
              style={{ borderLeft: '2px solid #C4902A' }}
            >
              <p
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: '1.3125rem',
                  fontStyle: 'italic',
                  color: '#CE8D5C',
                  lineHeight: 1.5,
                }}
              >
                &ldquo;Il y a des temples que les touristes ne verront jamais. Pas parce qu&apos;ils sont fermés,
                parce qu&apos;il faut savoir à quelle heure arriver, et qui saluer à l&apos;entrée.&rdquo;
              </p>
              <footer className="mt-3">
                <p className="text-xs tracking-widest uppercase" style={{ color: 'rgba(250,247,242,0.4)' }}>
                  Nasser, rive est de Louxor
                </p>
              </footer>
            </blockquote>

            <div className="space-y-4 mb-12" style={{ color: 'rgba(250,247,242,0.7)', fontSize: '1rem' }}>
              <p className="leading-relaxed">
                Nasser est né sur la rive est de Louxor. Manager de dahabiya, il a grandi entre le temple
                de Tod et les champs de canne à sucre bordant le Nil. Il connaît l&apos;Égypte non comme
                une destination mise en scène, mais comme une terre vécue, intime, fondatrice.
              </p>
              <p className="leading-relaxed">
                C&apos;est lui qui orchestre tout ce que vous ne voyez pas : les bateliers de confiance,
                les autorisations de sites rares, les guides locaux triés sur le volet, les imprévus
                réglés avant même que vous les remarquiez.
              </p>
            </div>

            {/* Duo Sophie / Nasser */}
            <div
              className="inline-grid grid-cols-2 rounded-sm overflow-hidden"
              style={{ border: '1px solid rgba(201,169,110,0.25)' }}
            >
              {[
                { name: 'Sophie', role: 'Interlocutrice France', sub: 'Conception & suivi' },
                { name: 'Nasser', role: 'Expert terrain Égypte', sub: 'Logistique & réseau' },
              ].map((person, i) => (
                <div
                  key={person.name}
                  className="px-6 py-5 text-center"
                  style={{
                    background: i === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(201,169,110,0.08)',
                    borderRight: i === 0 ? '1px solid rgba(201,169,110,0.2)' : undefined,
                  }}
                >
                  <p style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.125rem', color: '#CE8D5C', fontWeight: 400, marginBottom: '0.25rem' }}>
                    {person.name}
                  </p>
                  <p style={{ fontSize: '0.6875rem', color: 'rgba(250,247,242,0.5)', lineHeight: 1.6, letterSpacing: '0.04em' }}>
                    {person.role}<br />{person.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── DIFFÉRENCIATION ──────────────────────────────────────────── */}
      <section
        className="py-12 md:py-28"
        style={{ background: '#FDF8F0' }}
        aria-labelledby="difference-heading"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <p className="eyebrow mb-4">Notre approche</p>
            <h2
              id="difference-heading"
              className="text-display-lg title-underline title-underline-center"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#0F3D38' }}
            >
              Ce que nous ne faisons pas
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 300 }}>et pourquoi ça change tout</em>
            </h2>
          </div>

          <div className="mt-14 space-y-3 max-w-3xl mx-auto">
            {differences.map(({ them, us }) => (
              <div
                key={us}
                className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-sm"
                style={{ border: '1px solid #E8D5B7' }}
              >
                <div
                  className="flex items-start gap-4 px-6 py-5 md:border-r"
                  style={{ background: '#FAF7F2', borderColor: '#E8D5B7' }}
                >
                  <span className="flex-shrink-0 mt-0.5" style={{ color: '#D4B896', fontSize: '0.875rem' }}>✕</span>
                  <p className="text-sm leading-relaxed" style={{ color: '#8A9BAB' }}>{them}</p>
                </div>
                <div className="flex items-start gap-4 px-6 py-5" style={{ background: 'white' }}>
                  <CheckCircle size={14} style={{ color: '#C4902A', flexShrink: 0, marginTop: '3px' }} aria-hidden="true" />
                  <p className="text-sm leading-relaxed font-medium" style={{ color: '#0F3D38' }}>{us}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#0F3D38' }}
        aria-labelledby="cta-sophie-heading"
      >
        {/* Fond subtil */}
        <div className="absolute inset-0 z-0 img-hero">
          <Image
            src="/photos/voyageurs/duo-arche-coucher.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'brightness(0.14) saturate(0.7)' }}
            aria-hidden="true"
          />
        </div>
        <div
          className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(to bottom, rgba(15,61,56,0.75) 0%, rgba(15,61,56,0.96) 100%)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[760px] mx-auto px-6 md:px-12 py-28 md:py-36 text-center">
          <p className="eyebrow mb-6" style={{ color: '#C4902A' }}>Prochaine étape</p>

          <h2
            id="cta-sophie-heading"
            className="text-display-lg mb-8"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              color: '#FAF7F2',
              fontWeight: 300,
              lineHeight: 1.2,
            }}
          >
            Racontez-moi votre projet.
            <br />
            <em style={{ fontStyle: 'italic', color: '#CE8D5C', fontWeight: 400 }}>
              Construisons-le ensemble.
            </em>
          </h2>

          <p
            className="text-base leading-relaxed mb-4 mx-auto"
            style={{ color: 'rgba(250,247,242,0.68)', maxWidth: '480px' }}
          >
            Toutes les conversations commencent de la même façon : une envie floue, une date vague,
            une question simple. C&apos;est largement suffisant pour commencer.
          </p>

          <p
            className="italic mb-12 mx-auto"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              color: '#C4902A',
              maxWidth: '400px',
              fontSize: '1.125rem',
            }}
          >
            Je réponds personnellement, jamais un assistant, jamais un bot.
          </p>

          <a
            href={WHATSAPP_SOPHIE}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary inline-flex items-center gap-3"
            style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', fontSize: '0.875rem' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Parlons de votre voyage →
          </a>

          <p className="mt-7 text-xs" style={{ color: 'rgba(250,247,242,0.28)', letterSpacing: '0.08em' }}>
            Réponse dans la journée · En français · Sans engagement
          </p>
        </div>
      </section>
    </>
  )
}
