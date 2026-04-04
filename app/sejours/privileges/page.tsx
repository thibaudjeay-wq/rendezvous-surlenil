import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, ChevronDown, Users, Calendar } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/constants'
import { sanityClient } from '@/lib/sanity/client'
import { privilegesExperiencesQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

export const revalidate = 3600

type ThematicDate = {
  label: string
  startDate?: string
  endDate?: string
  priceAmount?: number
  availableSpots?: number
  spotsLeft?: number
  status?: 'available' | 'limited' | 'full'
}

type SanityPrivilegeExp = {
  _id: string
  title: string
  slug: { current: string }
  tagline?: string
  duration?: string
  priceDisplay?: string
  priceAmount?: number
  priceSuffix?: string
  highlights?: Array<{ label: string; value: string }>
  thematicDates?: ThematicDate[]
  ctaWhatsappMessage?: string
  featured?: boolean
  mainImage?: { asset: { _id: string; url: string; metadata: { lqip?: string } }; alt?: string }
}

function formatDateFr(iso?: string) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  available: { label: 'Disponible', color: '#27AE60', bg: 'rgba(39,174,96,0.1)' },
  limited: { label: 'Quelques places', color: '#E67E22', bg: 'rgba(230,126,34,0.1)' },
  full: { label: 'Complet', color: '#C0392B', bg: 'rgba(192,57,43,0.1)' },
}

export const metadata: Metadata = {
  title: 'Séjours Privilèges, Yoga à Siwa & Aquarelle sur le Nil | Rendez-vous sur le Nil',
  description:
    'Séjours thématiques en petit groupe avec Sophie Godineau : yoga & bien-être à Siwa, aquarelle en croisière dahabiya, voyage féminin à Louxor. Places limitées, saison 2026-2027.',
  alternates: { canonical: 'https://rendezvous-surlenil.com/sejours/privileges' },
  openGraph: {
    title: 'Séjours Privilèges en Égypte | Rendez-vous sur le Nil',
    description: 'Yoga à Siwa, aquarelle en dahabiya, voyage féminin à Louxor. Trois séjours thématiques en petit groupe avec Sophie. Places limitées.',
    images: [{ url: 'https://images.unsplash.com/photo-1539768942893-daf853948e5e?w=1200&q=85', width: 1200, height: 630, alt: 'Séjours Privilèges en Égypte, Rendez-vous sur le Nil' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Séjours Privilèges, Rendez-vous sur le Nil',
  description: 'Séjours thématiques en petit groupe avec Sophie Godineau : yoga, aquarelle, voyage féminin.',
  url: 'https://rendezvous-surlenil.com/sejours/privileges',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'OASIS FLOW SIWA — Yoga, oasis & sérénité, 8 jours / 7 nuits, novembre 2026' },
    { '@type': 'ListItem', position: 2, name: 'CROQUE & VOGUE — Aquarelle & croisière sur le Nil, 12 jours / 11 nuits, novembre 2026' },
    { '@type': 'ListItem', position: 3, name: 'DÉESSE DU NIL — Voyage 100% féminin, 8 jours / 7 nuits, janvier 2027' },
  ],
}

const WHATSAPP_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const programmes = [
  {
    code: 'OASIS FLOW SIWA',
    title: 'Yoga, oasis & sérénité',
    dates: '8 au 15 novembre 2026',
    duration: '8 jours / 7 nuits',
    theme: 'Yoga & bien-être',
    spots: 'Places limitées, 8 pers. max.',
    image: '/photos/privileges/siwa-lac-turquoise.jpg',
    imageAlt: "Oasis de Siwa au coucher du soleil, Égypte",
    description:
      "L'oasis au bout du monde. Yoga du matin sur les dunes, baignades dans les lacs salés, randonnées à dos de dromadaire, dîners sous les étoiles. Louise vous accompagne pour les séances de yoga.",
    highlights: [
      'Siwa, oasis isolée à 750 km du Caire',
      'Séances de yoga quotidiennes avec Louise',
      'Baignades dans les lacs salés, dunes',
      'Nuits en lodge traditionnel',
      'Sophie présente sur toute la durée',
      'Transferts et repas inclus',
    ],
    intervenants: 'Sophie Godineau + Louise (yoga)',
    ctaMessage:
      'Bonjour Sophie, je suis intéressé(e) par le séjour OASIS FLOW SIWA (8-15 novembre 2026). Pouvez-vous me donner les informations pour réserver ma place ? 🌿',
    urgency: 'Départ : 8 novembre 2026',
  },
  {
    code: 'CROQUE & VOGUE',
    title: 'Aquarelle & croisière sur le Nil',
    dates: '15 au 26 novembre 2026',
    duration: '12 jours / 11 nuits',
    theme: 'Aquarelle & dessin',
    spots: 'Places limitées',
    image: '/photos/privileges/stage-aquarelle.jpg',
    imageAlt: 'Stage aquarelle en Égypte, séjour Croque & Vogue',
    description:
      "Une croisière en dahabiya entre Assouan et Louxor, pinceau en main. Isabelle Corcket et Robbie vous initient à l'aquarelle en plein air sur les plus beaux sites d'Égypte. Aucune expérience artistique requise.",
    highlights: [
      'Croisière en dahabiya',
      'Ateliers aquarelle quotidiens avec Isabelle Corcket & Robbie',
      'Temples peints depuis le bateau ou sur site',
      'Assouan, Kom Ombo, Esna, Louxor',
      'Sophie présente sur toute la durée',
      'Repas à bord, hébergement en cabine privée',
    ],
    intervenants: 'Sophie Godineau + Isabelle Corcket & Robbie (aquarelle)',
    ctaMessage:
      'Bonjour Sophie, je suis intéressé(e) par le séjour CROQUE & VOGUE (15-26 novembre 2026). Pouvez-vous me donner les informations pour réserver ma place ? 🌿',
    urgency: 'Départ : 15 novembre 2026',
    featured: true,
  },
  {
    code: 'DÉESSE DU NIL',
    title: 'Voyage 100 % féminin',
    dates: '27 janvier au 3 février 2027',
    duration: '8 jours / 7 nuits',
    theme: 'Voyage entre femmes',
    spots: 'Réservé aux femmes, places limitées',
    image: '/photos/voyageurs/trio-femmes-nil.jpg',
    imageAlt: 'Temple de Louxor au lever du soleil',
    description:
      "Un voyage entre femmes, convivial et en toute sécurité. Louxor, temples, rencontres. Un séjour pensé pour se reconnecter à soi-même, dans la puissance des sites les plus sacrés d'Égypte.",
    highlights: [
      'Louxor & temples, sites féminins sacrés',
      'Temps libres, échanges, bien-être',
      'Moments pour se reconnecter à soi-même',
      'Montgolfière au lever du soleil',
      'Séjour exclusivement féminin',
    ],
    intervenants: 'Sophie',
    ctaMessage:
      'Bonjour Sophie, je suis intéressée par le séjour DÉESSE DU NIL (27 janvier–3 février 2027). Pouvez-vous me donner les informations pour réserver ma place ? 🌿',
    urgency: 'Départ : 27 janvier 2027',
  },
]

const faq = [
  {
    q: 'Qu\'est-ce qui distingue les Séjours Privilèges des Séjours Signature ?',
    a: 'Les Séjours Privilèges sont des programmes collectifs en petit groupe (8 à 12 personnes max.), à dates fixes, animés par Sophie et un ou plusieurs intervenants experts (yoga, aquarelle…). Les Séjours Signature sont privatifs, adaptés à votre agenda et à votre groupe.',
  },
  {
    q: 'Comment réserver ma place ?',
    a: 'Écrivez à Sophie directement. Elle vous envoie le programme détaillé, le tarif et les modalités de réservation sous 24h. Les places étant limitées, le dépôt d\'acompte confirme votre inscription.',
  },
  {
    q: 'Faut-il être expérimenté(e) en yoga ou en aquarelle ?',
    a: 'Non. Les programmes OASIS FLOW SIWA et CROQUE & VOGUE sont ouverts à tous les niveaux. Les intervenants adaptent leurs ateliers aux débutants comme aux plus avancés.',
  },
  {
    q: 'Les vols sont-ils inclus ?',
    a: 'Non, les vols internationaux ne sont pas inclus. Sophie peut vous orienter vers les meilleures options selon votre ville de départ.',
  },
]

export default async function PrivilegesPage() {
  const whatsappUrl = getWhatsAppUrl(
    'Bonjour Sophie, je suis intéressé(e) par un Séjour Privilèges en Égypte. Pouvez-vous me présenter les programmes disponibles ? 🌿'
  )

  let sanityPrivileges: SanityPrivilegeExp[] = []
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      sanityPrivileges = await sanityClient.fetch<SanityPrivilegeExp[]>(privilegesExperiencesQuery)
    }
  } catch { /* fallback statique */ }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '75vh' }}>
        <div className="absolute inset-0">
          <Image
            src="/photos/privileges/femme-pont-dahabiya.jpg"
            alt="Voyageuse détente sur la dahabiya, Séjours Privilèges"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'brightness(0.65)' }}
          />
          <div className="img-overlay-hero" />
        </div>

        <div
          className="relative z-10 flex flex-col justify-between px-6 md:px-16 pb-10 md:pb-28 max-w-[1200px] mx-auto"
          style={{ minHeight: '75vh', paddingTop: 'clamp(130px, 14vw, 160px)' }}
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
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>Privilèges</span>
          </nav>

          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: '24px', height: '1px', background: '#C4902A' }} />
              <Users size={14} style={{ color: '#C4902A' }} aria-hidden="true" />
              <p className="eyebrow" style={{ color: 'rgba(250,247,242,0.9)' }}>Séjours en petit groupe · Places limitées</p>
            </div>
            <h1
              className="text-display-xl mb-6"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: 'white', fontWeight: 300 }}
            >
              Séjours Privilèges
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 400 }}>yoga, aquarelle & sororité</em>
            </h1>
            <p className="text-lg mb-10" style={{ color: 'rgba(250,247,242,0.85)', maxWidth: '520px', fontWeight: 300 }}>
              Trois programmes thématiques à dates fixes, en petit groupe, avec Sophie et des
              intervenants experts. Siwa, le Nil, Louxor, chaque séjour a son âme.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Réserver via WhatsApp →
              </a>
              <a href="mailto:sophie@rendezvous-surlenil.com?subject=Réservation%20Séjour%20Privilèges" className="btn btn-primary">
                Réserver par email →
              </a>
              <a href="#programmes" className="btn btn-secondary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}>
                Voir les programmes
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Concept ────────────────────────────────────────── */}
      <section className="py-12 md:py-28" style={{ background: '#0F3D38' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <p className="eyebrow mb-4" style={{ color: '#C4902A' }}>Ce qui définit les Privilèges</p>
            <h2
              className="text-display-lg"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: '#FAF7F2' }}
            >
              Voyager ensemble
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#CE8D5C' }}>autour d&apos;une passion partagée</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: <Users size={18} style={{ color: '#C4902A' }} aria-hidden="true" />,
                title: 'Petit groupe exclusif',
                desc: '8 à 12 personnes maximum. Le temps de créer des liens, pas une file d\'attente.',
              },
              {
                icon: <Calendar size={18} style={{ color: '#C4902A' }} aria-hidden="true" />,
                title: 'Dates fixes, réservez tôt',
                desc: 'Trois programmes par saison, avec des places limitées. Confirmez votre place avant qu\'elles partent.',
              },
              {
                icon: <CheckCircle size={18} style={{ color: '#C4902A' }} aria-hidden="true" />,
                title: 'Sophie avec le groupe',
                desc: 'Sophie accompagne ces séjours en groupe. Une référence joignable pour anticiper et gérer les imprévus.',
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-sm"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,169,110,0.2)' }}
              >
                <div className="mb-4">{icon}</div>
                <h3 className="mb-3 font-medium" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.125rem', color: '#FAF7F2' }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8A9BAB' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Programmes ────────────────────────────────────── */}
      <section id="programmes" className="py-12 md:py-28" style={{ background: '#FAF7F2' }} aria-labelledby="programmes-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">Saison 2026 – 2027</p>
            <h2
              id="programmes-heading"
              className="text-display-lg title-underline title-underline-center"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: '#0F3D38' }}
            >
              Trois séjours, trois univers
            </h2>
          </div>

          {/* ── Rendu avec données statiques + dates dynamiques Sanity ── */}
          {(() => {
            const data = programmes.map((prog) => {
              const sanity = sanityPrivileges.find(p =>
                p.title?.toLowerCase().includes(prog.code.toLowerCase().split(' ')[0]) ||
                prog.code.toLowerCase().split(' ').some(w => w.length > 3 && p.title?.toLowerCase().includes(w))
              )
              return { prog, thematicDates: sanity?.thematicDates ?? [], sanityId: sanity?._id ?? prog.code, featured: sanity?.featured ?? prog.featured ?? false }
            })
            return (
            <div className="flex flex-col gap-20">
              {data.map(({ prog: p, thematicDates, sanityId, featured }, i) => (
                <div
                  key={sanityId}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
                >
                  {/* Image */}
                  <div className="img-section overflow-hidden rounded-sm relative">
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    {featured && (
                      <span className="absolute top-4 left-4 text-[10px] font-semibold tracking-[0.14em] uppercase px-3 py-1 rounded-sm z-10" style={{ background: '#C4902A', color: 'white' }}>
                        Coup de cœur
                      </span>
                    )}
                  </div>

                  {/* Texte */}
                  <div>
                    <h3 className="mb-2" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.875rem', color: '#0F3D38', fontWeight: 400 }}>
                      {p.code}
                    </h3>
                    <p className="mb-1 text-sm font-medium" style={{ color: '#C4902A' }}>{p.title}</p>
                    <p className="mb-6 text-sm" style={{ color: '#8A9BAB' }}>{p.duration} · {p.dates}</p>

                    <ul className="flex flex-col gap-2.5 mb-8">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2.5 text-sm" style={{ color: '#5C6E7E' }}>
                          <CheckCircle size={13} style={{ color: '#C4902A', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Dates thématiques depuis Sanity */}
                    {thematicDates.length > 0 && (
                      <div className="flex flex-col gap-3 mb-8">
                        <p className="text-xs font-semibold tracking-[0.1em] uppercase mb-1" style={{ color: '#8A9BAB' }}>
                          Dates disponibles
                        </p>
                        {thematicDates.map((d, di) => {
                          const statusInfo = STATUS_LABELS[d.status ?? 'available']
                          return (
                            <div
                              key={di}
                              className="flex items-center justify-between gap-4 p-4 rounded-sm"
                              style={{ background: '#FDF8F0', border: '1px solid #E8D5B7' }}
                            >
                              <div>
                                {d.label && <p className="text-sm font-medium mb-0.5" style={{ color: '#0F3D38' }}>{d.label}</p>}
                                <p className="text-xs flex items-center gap-1.5" style={{ color: '#5C6E7E' }}>
                                  <Calendar size={11} aria-hidden="true" />
                                  {d.startDate && formatDateFr(d.startDate)}
                                  {d.endDate && ` → ${formatDateFr(d.endDate)}`}
                                </p>
                                {(d.spotsLeft !== undefined || d.availableSpots !== undefined) && (
                                  <p className="text-xs mt-1" style={{ color: '#8A9BAB' }}>
                                    {d.spotsLeft !== undefined ? `${d.spotsLeft} place${d.spotsLeft > 1 ? 's' : ''} restante${d.spotsLeft > 1 ? 's' : ''}` : `${d.availableSpots} places`}
                                  </p>
                                )}
                              </div>
                              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                {d.priceAmount && (
                                  <p className="text-sm font-semibold" style={{ color: '#0F3D38' }}>{d.priceAmount.toLocaleString('fr-FR')} €</p>
                                )}
                                <span
                                  className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                                  style={{ background: statusInfo.bg, color: statusInfo.color }}
                                >
                                  {statusInfo.label}
                                </span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    <a
                      href={getWhatsAppUrl(p.ctaMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      {WHATSAPP_ICON}
                      Réserver ma place →
                    </a>
                  </div>
                </div>
              ))}
            </div>
            )
          })()}

        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────── */}
      <section className="py-12 md:py-28" style={{ background: '#FDF8F0' }}>
        <div className="max-w-2xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">Questions fréquentes</p>
            <h2
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
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none" style={{ color: '#0F3D38' }}>
                  <span className="font-medium text-sm pr-4">{item.q}</span>
                  <ChevronDown size={16} style={{ color: '#C4902A', flexShrink: 0 }} className="transition-transform group-open:rotate-180" aria-hidden="true" />
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

      {/* ─── CTA ───────────────────────────────────────────── */}
      <section className="py-12 md:py-28 text-center" style={{ background: '#0F3D38' }}>
        <div className="max-w-xl mx-auto px-6">
          <p className="eyebrow mb-4" style={{ color: '#C4902A' }}>Places limitées</p>
          <h2
            className="text-display-lg mb-6"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: '#FAF7F2', fontWeight: 400 }}
          >
            Votre place vous attend
            <br />
            <em style={{ fontStyle: 'italic', color: '#CE8D5C' }}>avant qu&apos;elle parte</em>
          </h2>
          <p className="mb-10 text-sm leading-relaxed" style={{ color: '#8A9BAB' }}>
            Écrivez à Sophie — elle vous envoie le programme détaillé, le tarif et les modalités de réservation sous 24h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {WHATSAPP_ICON}
              Écrire à Sophie →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
