import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, Crown, Compass, Ship, ArrowRight, BookOpen } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Nos séjours en Égypte, Signature, Privilèges & Escapades',
  description:
    'Découvrez nos séjours haut de gamme en Égypte : Séjours Signature, Séjours Privilèges, Escapades Sérénité et voyages sur mesure. Accompagnement francophone par Sophie & Nasser.',
  alternates: { canonical: 'https://rendezvous-surlenil.com/sejours' },
  openGraph: {
    title: 'Nos séjours en Égypte, Rendez-vous sur le Nil',
    description: "Toutes nos façons de vivre l'Égypte : séjours curatés, privilèges & voyages sur mesure.",
    images: [{ url: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=1200&q=85', width: 1200, height: 630, alt: 'Séjours en Égypte, Rendez-vous sur le Nil' }],
  },
}

const experiences = [
  {
    icon: Sparkles,
    eyebrow: 'Sur devis · Privatif · Adaptable',
    label: 'Séjours Signature',
    description:
      'Six programmes clés en main, CASBAH, YALLA, PACHA, SAFARA, SMALA, HABIBI, construits autour de La Thébaïde et de la dahabiya. Sophie adapte chaque programme à vos dates, votre rythme, vos envies. Proposition en 48h.',
    href: '/sejours/signature',
    image: '/photos/signature/karnak-colonnes.jpg',
    tag: null,
    features: ['6 programmes nommés', 'La Thébaïde ou dahabiya', 'Guide dédié', 'Sur devis · Proposition en 48h'],
  },
  {
    icon: Crown,
    eyebrow: 'Dates fixes · Petit groupe · Places limitées',
    label: 'Séjours Privilèges',
    description:
      'Trois séjours thématiques à dates fixes, en petit groupe (8 à 12 pers. max.), avec Sophie et des intervenants experts. OASIS FLOW SIWA (yoga), CROQUE & VOGUE (aquarelle sur dahabiya), DÉESSE DU NIL (voyage féminin). Saison 2026–2027.',
    href: '/sejours/privileges',
    image: '/photos/privileges/femme-pont-dahabiya.jpg',
    tag: 'Places limitées',
    features: ['3 départs 2026–2027', 'Max 8–12 personnes', 'Yoga · Aquarelle · Féminin', 'Sophie présente'],
  },
  {
    icon: Compass,
    eyebrow: 'Guide privé · Chauffeur · Tarifs affichés',
    label: 'Escapades Sérénité',
    description:
      'Six destinations, Le Caire, Fayoum, Siwa, Désert occidental, Louxor, Assouan, avec guide francophone privé certifié et chauffeur dédié. À la journée ou sur plusieurs jours. Tarifs affichés sur la page, combinaisons possibles.',
    href: '/sejours/escapades-serenite',
    image: '/photos/escapades/pique-nique-dunes.jpg',
    tag: null,
    features: ['6 destinations', 'Guide francophone certifié', 'Chauffeur dédié inclus', 'À partir de 60 € / pers. / jour'],
  },
]

export default function SejoursPage() {
  const whatsappUrl = getWhatsAppUrl(
    'Bonjour Sophie, je souhaite en savoir plus sur vos séjours en Égypte. Pouvez-vous m\'en dire plus ? 🌿'
  )

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '72vh' }}>
        <div className="absolute inset-0">
          <Image
            src="/photos/signature/montgolfiere-voyageur.jpg"
            alt="Montgolfière au-dessus de la Vallée des Rois, Louxor"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'brightness(0.75)' }}
          />
          <div className="img-overlay-hero" />
        </div>

        <div
          className="relative z-10 flex flex-col justify-end px-6 md:px-16 pb-10 md:pb-28 max-w-[1200px] mx-auto"
          style={{ minHeight: '72vh' }}
        >
          <nav
            className="absolute top-28 left-6 md:left-16 flex items-center gap-2 text-xs"
            style={{ color: 'rgba(255,255,255,0.6)' }}
            aria-label="Fil d'Ariane"
          >
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>Nos séjours</span>
          </nav>

          <div className="max-w-2xl">
            <p className="eyebrow mb-4" style={{ color: '#CE8D5C' }}>Nos expériences</p>
            <h1
              className="text-display-xl mb-6"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: 'white', fontWeight: 300 }}
            >
              Quel voyage
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 400 }}>vous ressemble ?</em>
            </h1>
            <p
              className="text-lg mb-10"
              style={{ color: 'rgba(250,247,242,0.85)', maxWidth: '500px', fontWeight: 300 }}
            >
              De la croisière dahabiya aux séjours d&apos;exception, en passant par nos escapades thématiques
              et voyages entièrement sur mesure, chaque voyage que nous créons est unique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Parlons de votre voyage →
              </a>
              <Link
                href="/croisieres-dahabiya"
                className="btn btn-secondary"
                style={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}
              >
                Voir la dahabiya
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Produit phare, Dahabiya ──────────────────────── */}
      <section
        className="py-6"
        style={{ background: '#0F3D38', borderBottom: '1px solid #2A5A54' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid #C4902A' }}
              >
                <Ship size={18} style={{ color: '#C4902A' }} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#C4902A' }}>
                  Produit phare
                </p>
                <p className="text-sm font-medium" style={{ color: '#FAF7F2' }}>
                  Croisières Dahabiya, Le Nil privatisé pour vous seuls
                </p>
              </div>
            </div>
            <Link
              href="/croisieres-dahabiya"
              className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase whitespace-nowrap"
              style={{ color: '#C4902A' }}
            >
              Découvrir <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Grille des expériences ─────────────────────────── */}
      <section
        className="py-12 md:py-28"
        style={{ background: '#FDF8F0' }}
        aria-labelledby="sejours-heading"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">Comment voyager avec nous</p>
            <h2
              id="sejours-heading"
              className="text-display-lg title-underline title-underline-center"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#0F3D38' }}
            >
              Trois gammes de voyages
            </h2>
            <p className="mt-8 max-w-xl mx-auto text-sm leading-relaxed" style={{ color: '#8A9BAB' }}>
              Chaque gamme répond à une façon différente de voyager. Si vous ne savez pas encore laquelle vous correspond,
              Sophie vous aidera à choisir en 10 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiences.map(({ icon: Icon, eyebrow, label, description, href, image, tag, features }) => (
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
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="img-overlay-warm" />

                  {tag && (
                    <span
                      className="absolute top-4 left-4 text-[10px] font-semibold tracking-[0.14em] uppercase px-3 py-1 rounded-sm z-10"
                      style={{ background: '#C4902A', color: 'white' }}
                    >
                      {tag}
                    </span>
                  )}

                  <div
                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10"
                    style={{ background: 'rgba(13,33,55,0.7)', backdropFilter: 'blur(6px)' }}
                  >
                    <Icon size={17} color="#C4902A" aria-hidden="true" />
                  </div>
                </div>

                {/* Texte */}
                <div className="p-6">
                  <p className="eyebrow mb-2">{eyebrow}</p>
                  <h3
                    className="font-medium mb-3 transition-colors duration-200 group-hover:text-[#C4902A]"
                    style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontSize: '1.375rem',
                      color: '#0F3D38',
                    }}
                  >
                    {label}
                  </h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: '#5C6E7E' }}>
                    {description}
                  </p>

                  {/* Features pills */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {features.map((f) => (
                      <span
                        key={f}
                        className="text-[11px] px-2.5 py-1 rounded-sm font-medium"
                        style={{ background: '#FDF8F0', color: '#5C6E7E', border: '1px solid #E8D5B7' }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase transition-colors group-hover:text-[#A87820]"
                    style={{ color: '#C4902A' }}
                  >
                    Découvrir <ArrowRight size={12} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Travel Planner, service support ───────────────── */}
      <section className="py-12 md:py-16" style={{ background: '#FDF8F0', borderTop: '1px solid #E8D5B7' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-sm"
            style={{ background: 'white', border: '1px solid #E8D5B7' }}
          >
            <div className="flex items-start gap-5">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(13,33,55,0.06)', border: '1px solid #E8D5B7' }}
              >
                <BookOpen size={18} style={{ color: '#0F3D38' }} aria-hidden="true" />
              </div>
              <div>
                <p className="font-medium mb-1" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.25rem', color: '#0F3D38' }}>
                  Vous préférez partir de zéro ?
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#5C6E7E', maxWidth: '520px' }}>
                  Le service <strong>Travel Planner</strong> de Sophie construit votre itinéraire sur mesure :
                  Carnet de voyage personnalisé (149 €) ou Conciergerie d&apos;expériences complète.
                  Ces gammes peuvent être intégrées dans n&apos;importe quel séjour Signature ou Escapade.
                </p>
              </div>
            </div>
            <Link
              href="/sur-mesure"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase whitespace-nowrap flex-shrink-0 transition-colors hover:text-[#A87820]"
              style={{ color: '#C4902A' }}
            >
              Découvrir le Travel Planner <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Comment ça marche ──────────────────────────────── */}
      <section className="py-12 md:py-28" style={{ background: '#FAF7F2' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">Notre approche</p>
            <h2
              className="text-display-lg title-underline title-underline-center"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#0F3D38' }}
            >
              Pas un catalogue. <em style={{ fontStyle: 'italic', fontWeight: 300 }}>Une conversation.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                step: '01',
                title: 'Vous nous parlez de vous',
                body: 'Vos envies, vos dates, votre budget, ce qui vous fait vibrer. Sophie vous écoute, vraiment.',
              },
              {
                step: '02',
                title: 'Sophie construit votre voyage',
                body: 'En 48h, elle vous soumet une proposition sur mesure. Hébergements, itinéraire, guides, rythme.',
              },
              {
                step: '03',
                title: 'Vous partez. Elle veille.',
                body: 'Pendant tout votre séjour, Sophie reste disponible. Nasser s\'occupe du terrain.',
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="text-center px-4">
                <p
                  className="mb-5"
                  style={{
                    fontFamily: 'Cormorant Garamond',
                    fontSize: '3.5rem',
                    color: '#E8D5B7',
                    lineHeight: 1,
                    fontWeight: 300,
                  }}
                >
                  {step}
                </p>
                <h3
                  className="mb-3"
                  style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.25rem', color: '#0F3D38', fontWeight: 500 }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5C6E7E' }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Final ──────────────────────────────────────── */}
      <section className="py-20 md:py-28 text-center" style={{ background: '#0F3D38' }}>
        <div className="max-w-xl mx-auto px-6">
          <p className="eyebrow mb-4" style={{ color: '#C4902A' }}>On commence ?</p>
          <h2
            className="text-display-lg mb-6"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#FAF7F2', fontWeight: 400 }}
          >
            Votre voyage commence
            <br />
            <em style={{ fontStyle: 'italic', color: '#CE8D5C' }}>par un message</em>
          </h2>
          <p className="mb-10 text-sm leading-relaxed" style={{ color: '#8A9BAB' }}>
            Pas de formulaire, pas de devis automatique. Un échange humain avec Sophie,
            qui prend le temps de comprendre ce dont vous avez vraiment envie.
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
