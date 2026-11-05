import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, ChevronDown, Users, Calendar } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/constants'
import ContactCTA from '@/components/ui/ContactCTA'
import { PRIVILEGES, PRIVILEGE_STATUS_LABELS, formatSessionDates } from '@/lib/privileges'

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
  itemListElement: PRIVILEGES.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `${p.code} — ${p.title}, ${p.duration}, ${p.datesSummary}`,
  })),
}

const WHATSAPP_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const faq = [
  {
    q: 'Qu\'est-ce qui distingue les Séjours Privilèges des Séjours Signature ?',
    a: 'Les Séjours Privilèges sont des programmes collectifs en petit groupe (de 2 à 12 personnes), à dates fixes, animés par Sophie et un ou plusieurs intervenants experts (yoga, aquarelle…). Les Séjours Signature sont privatifs, adaptés à votre agenda et à votre groupe.',
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

export default function PrivilegesPage() {
  const whatsappUrl = getWhatsAppUrl(
    'Bonjour Sophie, je suis intéressé(e) par un Séjour Privilèges en Égypte. Pouvez-vous me présenter les programmes disponibles ? 🌿'
  )

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
              intervenants experts. Le Nil, Louxor, Siwa, chaque séjour a son âme.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <ContactCTA
                label="Réserver une place"
                whatsappUrl={whatsappUrl}
                emailSubject="Réservation Séjour Privilèges"
              />
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
                desc: 'De 2 à 12 personnes. Le temps de créer des liens, pas une file d\'attente.',
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

          <div className="flex flex-col gap-20">
            {PRIVILEGES.map((p, i) => (
              <div
                key={p.slug}
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
                  {p.featured && (
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
                  <p className="mb-6 text-sm" style={{ color: '#8A9BAB' }}>{p.duration} · {p.datesSummary}</p>

                  <ul className="flex flex-col gap-2.5 mb-8">
                    {p.highlights.map((h) => (
                      <li key={h.value} className="flex items-start gap-2.5 text-sm" style={{ color: '#5C6E7E' }}>
                        <CheckCircle size={13} style={{ color: '#C4902A', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                        {h.value}
                      </li>
                    ))}
                  </ul>

                  {/* Dates */}
                  <div className="flex flex-col gap-3 mb-8">
                    <p className="text-xs font-semibold tracking-[0.1em] uppercase mb-1" style={{ color: '#8A9BAB' }}>
                      {p.sessions.length > 1 ? 'Dates disponibles' : 'Date'}
                    </p>
                    <div className={p.sessions.length > 1 ? 'grid grid-cols-1 sm:grid-cols-2 gap-3' : 'flex flex-col gap-3'}>
                      {p.sessions.map((d) => {
                        const statusInfo = PRIVILEGE_STATUS_LABELS[d.status]
                        const dates = formatSessionDates(d)
                        return (
                          <div
                            key={`${d.label ?? ''}${d.startDate ?? ''}`}
                            className={`flex items-center justify-between rounded-sm ${p.sessions.length > 1 ? 'gap-2 px-3 py-3' : 'gap-4 p-4'}`}
                            style={{ background: '#FDF8F0', border: '1px solid #E8D5B7', opacity: d.status === 'full' ? 0.75 : 1 }}
                          >
                            <div>
                              {d.label && <p className="text-sm font-medium mb-0.5" style={{ color: '#0F3D38' }}>{d.label}</p>}
                              {dates && (
                                <p className={`flex items-center gap-1.5 whitespace-nowrap ${d.label ? 'text-xs' : 'text-[13px] font-medium'}`} style={{ color: d.label ? '#5C6E7E' : '#0F3D38' }}>
                                  <Calendar size={11} aria-hidden="true" />
                                  {dates}
                                </p>
                              )}
                            </div>
                            <span
                              className="text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                              style={{ background: statusInfo.bg, color: statusInfo.color }}
                            >
                              {statusInfo.label}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                    {p.sessionsNote && (
                      <p className="text-xs mt-1" style={{ color: '#5C6E7E' }}>{p.sessionsNote}</p>
                    )}
                  </div>

                  <a
                    href={getWhatsAppUrl(p.ctaMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    {WHATSAPP_ICON}
                    {p.ctaLabel}
                  </a>
                </div>
              </div>
            ))}
          </div>

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
          <ContactCTA
            label="Écrire à Sophie"
            whatsappUrl={whatsappUrl}
            emailSubject="Séjour Privilèges"
          />
        </div>
      </section>
    </>
  )
}
