import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, Map, CalendarCheck, Plane, BookOpen, Compass, ChevronDown } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Travel Planner Égypte sur mesure, Itinéraire & Conciergerie privée | Rendez-vous sur le Nil',
  description:
    'Sophie crée votre itinéraire en Égypte sur mesure : sélection d\'hébergements, guides francophones privés, conseils locaux, accompagnement WhatsApp. Service de travel planning Égypte personnalisé et sans stress.',
  alternates: { canonical: 'https://rendezvous-surlenil.com/sur-mesure' },
  openGraph: {
    title: 'Travel Planner Égypte, Votre voyage imaginé par Sophie | Rendez-vous sur le Nil',
    description: 'Itinéraire sur mesure, sélection d\'hébergements, guides privés, accompagnement WhatsApp. Sophie construit votre voyage en Égypte de A à Z.',
    images: [{ url: 'https://images.unsplash.com/photo-1601148494936-9b7e580f9826?w=1200&q=85', width: 1200, height: 630, alt: 'Travel Planner Égypte sur mesure, Rendez-vous sur le Nil' }],
  },
}

const steps = [
  {
    icon: MessageCircle,
    number: '01',
    title: 'Appel découverte avec Sophie',
    body: 'Un échange WhatsApp ou un appel de 20 minutes, gratuit et sans engagement. Vos envies, vos dates, ce qui vous fait vibrer. Sophie écoute, vraiment. Un échange de 20 minutes suffit souvent à dessiner les grandes lignes de quelque chose de beau.',
  },
  {
    icon: Map,
    number: '02',
    title: 'Itinéraire sur mesure créé pour vous',
    body: 'Sophie vous soumet une proposition complète : itinéraire détaillé, hébergements sélectionnés, programme jour par jour. Vous ajustez, elle affine. Rien n\'est gravé dans le marbre.',
  },
  {
    icon: CalendarCheck,
    number: '03',
    title: 'Validation et ajustements selon vos envies',
    body: 'Chaque détail est affiné ensemble, les hébergements, le rythme, les activités, les moments libres. Le voyage devient réellement le vôtre avant même que vous partiez.',
  },
  {
    icon: Plane,
    number: '04',
    title: 'Vous partez, Sophie vous accompagne',
    body: 'Pendant tout votre séjour, Sophie est disponible sur WhatsApp de 10h à 19h. Nasser coordonne sur le terrain. Chaque imprévu est géré avant même que vous le ressentiez.',
  },
]

const faq = [
  {
    q: 'En quoi votre service est-il différent d\'un tour-opérateur ?',
    a: 'Pas de catalogue figé, pas de groupe, pas de guide avec un drapeau. Chaque voyage est construit pour vous, avec un interlocuteur unique, Sophie, qui vous connaît et qui est joignable directement.',
  },
  {
    q: 'Comment se passe l\'appel découverte ? Est-il payant ?',
    a: 'L\'appel découverte est gratuit et sans engagement. C\'est un échange de 20 minutes environ pour comprendre vos envies et voir si ce que nous proposons vous correspond.',
  },
  {
    q: 'Puis-je combiner le carnet de voyage avec une Escapade ?',
    a: 'Oui, les deux formules sont complémentaires. Vous pouvez avoir le carnet pour les villes et la conciergerie pour les escapades désert ou oasis. Sophie intègre tout dans un itinéraire global fluide.',
  },
  {
    q: 'Que se passe-t-il si mon programme change en cours de voyage ?',
    a: 'Sophie est disponible sur WhatsApp pendant votre séjour. Elle s\'adapte et trouve des solutions en temps réel. La flexibilité est l\'un des avantages essentiels du voyage sur mesure.',
  },
]

export default function SurMesurePage() {
  const whatsappUrl = getWhatsAppUrl(
    'Bonjour Sophie, je souhaite organiser un voyage sur mesure en Égypte. J\'aimerais vous parler de mon projet. Quand seriez-vous disponible ? 🌿'
  )

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '80vh' }}>
        <div className="absolute inset-0">
          <Image
            src="/photos/voyageurs/sophie-nil-travel-planner.jpg"
            alt="Sophie Godineau, Travel Planner Égypte sur mesure, Rendez-vous sur le Nil"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'brightness(0.62)' }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(13,33,55,0.15) 0%, rgba(13,33,55,0.08) 40%, rgba(13,33,55,0.7) 80%, rgba(13,33,55,0.92) 100%)',
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
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>Travel Planner</span>
          </nav>

          <div className="max-w-2xl">
            <p className="eyebrow mb-5" style={{ color: '#CE8D5C' }}>Votre Égypte, imaginée pour vous</p>
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
              Travel Planner
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#CE8D5C' }}>votre voyage, construit pour vous</em>
            </h1>
            <p
              className="text-base md:text-lg mb-12 max-w-xl"
              style={{ color: 'rgba(250,247,242,0.82)', fontWeight: 300, lineHeight: 1.75 }}
            >
              Pas de formulaire à remplir. Pas de catalogue à parcourir.
              Un échange avec Sophie pour construire ensemble le voyage en Égypte qui vous ressemble,
              de l&apos;itinéraire sur mesure jusqu&apos;à l&apos;accompagnement sur place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                Parlons de votre voyage →
              </a>
              <a href="#formules" className="btn btn-secondary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.45)' }}>
                Voir les formules
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pourquoi Sophie ────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: '#FAF7F2' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="eyebrow mb-4">Pourquoi faire appel à un travel planner pour l&apos;Égypte ?</p>
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
                L&apos;Égypte est magnifique.
                <br />
                <em style={{ fontWeight: 300, fontStyle: 'italic' }}>Et complexe à organiser seul.</em>
              </h2>
              <p className="leading-relaxed mb-5" style={{ color: '#5C6E7E', fontSize: '1.0625rem' }}>
                Les arnaques touristiques, les guides médiocres, les hébergements survalués, les sites
                à éviter à certaines heures, les trajets qui paraissent simples sur Google Maps et qui
                ne le sont pas, autant de pièges qu&apos;un travel planner spécialisé en Égypte connaît
                et vous évite.
              </p>
              <p className="leading-relaxed mb-8" style={{ color: '#5C6E7E', fontSize: '1.0625rem' }}>
                Mes séjours réguliers entre la France et l&apos;Égypte m&apos;ont permis de construire
                un réseau local solide et testé. Chaque itinéraire que je crée s&apos;appuie sur
                cette expérience du terrain, et sur Nasser, qui coordonne tout sur place.
              </p>

              <blockquote className="pl-5" style={{ borderLeft: '2px solid #C4902A' }}>
                <p
                  className="italic leading-relaxed"
                  style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.125rem', color: '#1E6860' }}
                >
                  &ldquo;Ce que vous achetez, ce n&apos;est pas un produit. C&apos;est une relation de confiance
                  avec quelqu&apos;un qui connaît l&apos;Égypte de l&apos;intérieur.&rdquo;
                </p>
                <footer className="mt-3 text-xs font-medium tracking-wide" style={{ color: '#8A9BAB' }}>
                 , Sophie Godineau
                </footer>
              </blockquote>
            </div>

            <div className="img-cinematic overflow-hidden rounded-sm">
              <Image
                src="/photos/voyageurs/guide-keffiyeh.jpg"
                alt="Guide local nouant le keffiyeh sur une voyageuse, soin et attention"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Les 2 formules ─────────────────────────────────── */}
      <section id="formules" className="py-20 md:py-32" style={{ background: '#FDF8F0' }} aria-labelledby="formules-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">Deux façons de travailler ensemble</p>
            <h2
              id="formules-heading"
              className="title-underline title-underline-center"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                color: '#0F3D38',
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              Des voyages construits pour vous
              <br />
              <em style={{ fontWeight: 300, fontStyle: 'italic' }}>tarifés pour vous.</em>
            </h2>
            <p className="mt-8 text-base leading-relaxed mx-auto max-w-xl" style={{ color: '#5C6E7E' }}>
              Nous ne pratiquons pas les prix affichés pour les séjours sur mesure, parce qu&apos;un voyage sur mesure
              mérite une proposition sur mesure. Mais pour vous aider à démarrer, voici nos deux formules Travel Planner.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Carte 1, Carnet de voyage */}
            <div
              className="flex flex-col rounded-sm overflow-hidden"
              style={{ background: 'white', border: '1px solid #E8D5B7' }}
            >
              {/* Header */}
              <div className="p-8 pb-6" style={{ background: '#0F3D38' }}>
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.35)' }}
                  >
                    <BookOpen size={20} style={{ color: '#C4902A' }} aria-hidden="true" />
                  </div>
                  <div
                    className="px-3 py-1 rounded-sm text-xs font-semibold tracking-wider uppercase"
                    style={{ background: 'rgba(201,169,110,0.15)', color: '#CE8D5C', border: '1px solid rgba(201,169,110,0.3)' }}
                  >
                    Pour voyager en autonomie
                  </div>
                </div>
                <h3
                  className="mb-2"
                  style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.5rem', color: '#FAF7F2', fontWeight: 400 }}
                >
                  Carnet de voyage personnalisé
                </h3>
                <p className="text-sm" style={{ color: '#8A9BAB' }}>
                  Votre feuille de route complète, tout ce qu&apos;il faut savoir, sans avoir à chercher.
                </p>
                {/* Prix */}
                <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="flex items-baseline gap-2">
                    <span
                      style={{
                        fontFamily: 'Cormorant Garamond',
                        fontSize: '3rem',
                        color: '#C4902A',
                        fontWeight: 300,
                        lineHeight: 1,
                      }}
                    >
                      149 €
                    </span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: 'rgba(138,155,171,0.8)' }}>
                    Offert pour toute réservation d&apos;un Séjour Signature · 49 € si Séjour Signature + villes supplémentaires
                  </p>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-8 flex flex-col flex-1">
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {[
                    'Itinéraire détaillé jour par jour',
                    'Sélection personnalisée d\'hébergements avec liens de réservation',
                    'Recommandations restaurants et transports',
                    'Carte interactive du voyage',
                    'Conseils pratiques et astuces locales',
                    'Accompagnement WhatsApp 10h–19h avant et pendant votre séjour',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm" style={{ color: '#5C6E7E' }}>
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                        style={{ background: '#C4902A' }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs leading-relaxed mb-6 pb-6" style={{ color: '#8A9BAB', borderBottom: '1px solid #E8D5B7' }}>
                  <strong style={{ color: '#5C6E7E' }}>Pour qui :</strong> voyageurs autonomes qui aiment organiser
                  certaines choses eux-mêmes, mais veulent un cadre solide et expert.
                </p>
                <a
                  href={getWhatsAppUrl('Bonjour Sophie, je suis intéressé(e) par le Carnet de voyage personnalisé (149 €). Pouvez-vous m\'en dire plus ? 🌿')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp w-full justify-center"
                >
                  Demander mon carnet →
                </a>
              </div>
            </div>

            {/* Carte 2, Conciergerie d'expériences */}
            <div
              className="flex flex-col rounded-sm overflow-hidden"
              style={{ background: 'white', border: '1px solid #E8D5B7' }}
            >
              {/* Header */}
              <div className="p-8 pb-6" style={{ background: '#2A5A54' }}>
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.35)' }}
                  >
                    <Compass size={20} style={{ color: '#C4902A' }} aria-hidden="true" />
                  </div>
                  <div
                    className="px-3 py-1 rounded-sm text-xs font-semibold tracking-wider uppercase"
                    style={{ background: 'rgba(201,169,110,0.15)', color: '#CE8D5C', border: '1px solid rgba(201,169,110,0.3)' }}
                  >
                    Pour vivre l&apos;Égypte sur le terrain
                  </div>
                </div>
                <h3
                  className="mb-2"
                  style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.5rem', color: '#FAF7F2', fontWeight: 400 }}
                >
                  Conciergerie d&apos;expériences
                </h3>
                <p className="text-sm" style={{ color: '#8A9BAB' }}>
                  Guide francophone privé et chauffeur dédié pour chaque escapade choisie.
                </p>
                {/* Prix */}
                <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="flex items-baseline gap-2">
                    <span
                      style={{
                        fontFamily: 'Cormorant Garamond',
                        fontSize: '1.75rem',
                        color: '#C4902A',
                        fontWeight: 300,
                        lineHeight: 1,
                      }}
                    >
                      Selon les escapades choisies
                    </span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: 'rgba(138,155,171,0.8)' }}>
                    Tarifs affichés par destination, à partir de 60 €/pers/jour
                  </p>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-8 flex flex-col flex-1">
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {[
                    'Coordination de guides francophones privés certifiés',
                    'Coordination de chauffeurs dédiés',
                    'Expériences immersives sur place',
                    'Itinéraire adapté selon les activités réservées',
                    'Accompagnement WhatsApp 10h–19h',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm" style={{ color: '#5C6E7E' }}>
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                        style={{ background: '#C4902A' }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs leading-relaxed mb-6 pb-6" style={{ color: '#8A9BAB', borderBottom: '1px solid #E8D5B7' }}>
                  <strong style={{ color: '#5C6E7E' }}>Pour qui :</strong> voyageurs qui veulent être accompagnés
                  par un guide lors des visites ou des aventures dans le désert.
                </p>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/sejours/escapades-serenite"
                    className="btn btn-secondary w-full justify-center"
                    style={{ color: '#0F3D38', borderColor: '#C4902A' }}
                  >
                    Voir les destinations & tarifs →
                  </Link>
                  <a
                    href={getWhatsAppUrl('Bonjour Sophie, je souhaite organiser des escapades avec guide privé en Égypte. Pouvez-vous me proposer quelque chose ? 🌿')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost w-full justify-center text-sm"
                    style={{ color: '#C4902A', borderColor: '#E8D5B7' }}
                  >
                    Demander une proposition →
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Note complémentaire */}
          <div
            className="mt-10 p-6 rounded-sm text-center"
            style={{ background: 'white', border: '1px solid #E8D5B7' }}
          >
            <p className="text-sm leading-relaxed" style={{ color: '#5C6E7E' }}>
              Les deux formules sont complémentaires, vous pouvez avoir le carnet pour les villes et la conciergerie
              pour les escapades désert ou oasis.{' '}
              <a href={getWhatsAppUrl('Bonjour Sophie, je souhaite combiner le Carnet de voyage et des Escapades. Pouvez-vous m\'en dire plus ? 🌿')} target="_blank" rel="noopener noreferrer" style={{ color: '#C4902A', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                Posez la question à Sophie →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ─── Comment ça marche ──────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: '#0F3D38' }} aria-labelledby="process-heading">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4" style={{ color: '#C4902A' }}>Comment ça marche</p>
            <h2
              id="process-heading"
              className="title-underline title-underline-center"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                color: '#FAF7F2',
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              Quatre étapes.
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#CE8D5C' }}>Un voyage qui vous ressemble.</em>
            </h2>
          </div>

          <div className="flex flex-col gap-0 mt-12">
            {steps.map(({ icon: Icon, number, title, body }, i) => (
              <div key={number} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(201,169,110,0.1)', border: '2px solid #C4902A' }}
                  >
                    <Icon size={18} style={{ color: '#C4902A' }} aria-hidden="true" />
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{ width: '1px', flex: 1, background: 'rgba(201,169,110,0.2)', minHeight: '48px' }} />
                  )}
                </div>
                <div className="pb-10">
                  <p className="eyebrow mb-1.5" style={{ color: '#C4902A' }}>Étape {number}</p>
                  <h3
                    className="mb-3"
                    style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.375rem', color: '#FAF7F2', fontWeight: 400 }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed max-w-lg" style={{ color: 'rgba(250,247,242,0.7)' }}>
                    {body}
                  </p>
                </div>
              </div>
            ))}
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

      {/* ─── Témoignages ────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: '#FDF8F0' }} aria-labelledby="temoignages-mesure-heading">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">Ce qu&apos;ils en disent</p>
            <h2
              id="temoignages-mesure-heading"
              className="title-underline title-underline-center"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(1.625rem, 3vw, 2.375rem)',
                color: '#0F3D38',
                fontWeight: 300,
                lineHeight: 1.2,
              }}
            >
              Ils ont fait confiance à Sophie.
              <br />
              <em style={{ fontWeight: 400, fontStyle: 'italic' }}>Voilà ce qu&apos;ils ont vécu.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {[
              {
                name: 'Patricia & Anne-Marie',
                quote: "Nous avons fait appel à Sophie et Nasser pour la deuxième fois. Organisation parfaite, guide francophone, visites sur mesure. Merci d'avoir répondu à toutes nos demandes.",
                detail: '2e voyage sur mesure',
              },
              {
                name: 'Nelly, Lucas & Victor',
                quote: 'Séjour sur mesure, authentique et immersif. Tout était parfaitement construit pour nous.',
                detail: 'Voyage sur mesure en famille',
              },
              {
                name: 'Allan',
                quote: 'A big thank you to Sophie and Nasser. Your knowledge, flexibility and kindness made everything seamless. We felt like we made new friends.',
                detail: 'Custom journey, Louxor',
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

      {/* ─── CTA final ──────────────────────────────────────── */}
      <section className="py-20 md:py-28 text-center" style={{ background: '#0F3D38' }}>
        <div className="max-w-xl mx-auto px-6">
          <p className="eyebrow mb-4" style={{ color: '#C4902A' }}>Votre Égypte commence par une conversation</p>
          <h2
            className="mb-6"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              color: '#FAF7F2',
              fontWeight: 400,
              lineHeight: 1.15,
            }}
          >
            Vous avez un projet de voyage
            <br />
            <em style={{ fontStyle: 'italic', color: '#CE8D5C' }}>en Égypte ?</em>
          </h2>
          <p className="mb-4 text-base leading-relaxed" style={{ color: '#8A9BAB' }}>
            Parlons-en. Un échange de 20 minutes suffit souvent à dessiner les grandes lignes
            de quelque chose de beau.
          </p>
          <p className="mb-10 text-sm" style={{ color: 'rgba(138,155,171,0.7)' }}>
            L&apos;appel découverte est gratuit et sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }} aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Me contacter sur WhatsApp
            </a>
            <a
              href="mailto:sophie@rendezvous-surlenil.com"
              className="btn btn-secondary"
              style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
            >
              ou écrire à Sophie →
            </a>
          </div>
          <p className="mt-6 text-xs" style={{ color: 'rgba(138,155,171,0.6)' }}>
            sophie@rendezvous-surlenil.com · +33 6 01 31 50 23
          </p>
        </div>
      </section>
    </>
  )
}
