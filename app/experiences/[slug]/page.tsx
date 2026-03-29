import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { CheckCircle, XCircle, ChevronDown, ArrowLeft, MapPin, Clock, Users } from 'lucide-react'
import { sanityClient } from '@/lib/sanity/client'
import { experienceBySlugQuery, sitemapQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { getWhatsAppUrl } from '@/lib/constants'

export const revalidate = 3600

// ─── Types ────────────────────────────────────────────────
type SanityImage = {
  asset: { _id: string; url: string; metadata: { lqip?: string; dimensions?: { width: number; height: number } } }
  alt?: string
  hotspot?: { x: number; y: number }
  crop?: object
}

type SanityHighlight = { icon?: string; label?: string; value?: string }

type ThematicDate = {
  _key?: string
  label?: string
  startDate?: string
  endDate?: string
  priceAmount?: number
  availableSpots?: number
  spotsLeft?: number
  status?: 'available' | 'limited' | 'full'
}

type ProgramDay = {
  _key?: string
  day?: string
  title?: string
  description?: unknown[]
  image?: SanityImage
}

type Experience = {
  _id: string
  title: string
  slug: { current: string }
  type: string
  tagline?: string
  description?: unknown[]
  mainImage?: SanityImage
  gallery?: SanityImage[]
  highlights?: SanityHighlight[]
  program?: ProgramDay[]
  included?: string[]
  notIncluded?: string[]
  faq?: Array<{ question: string; answer: string }>
  priceDisplay?: string
  priceAmount?: number
  priceSuffix?: string
  duration?: string
  thematicDates?: ThematicDate[]
  ctaWhatsappMessage?: string
  seo?: { metaTitle?: string; metaDescription?: string; noIndex?: boolean }
}

// ─── Helpers ──────────────────────────────────────────────
const TYPE_LABELS: Record<string, string> = {
  dahabiya: 'Croisière Dahabiya',
  'sejour-signature': 'Séjour Signature',
  'sejour-privilege': 'Séjour Privilèges',
  'sejour-thematique': 'Séjour Thématique',
  'sur-mesure': 'Voyage Sur Mesure',
  excursion: 'Excursion',
  hebergement: 'Hébergement',
}

const STATUS_LABELS = {
  available: { label: 'Disponible', color: '#27AE60', bg: '#F0FDF4' },
  limited: { label: 'Quelques places', color: '#E67E22', bg: '#FFF7ED' },
  full: { label: 'Complet', color: '#E74C3C', bg: '#FEF2F2' },
}

function formatDateFr(iso?: string): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function formatPrice(exp: Experience): string {
  if (exp.priceDisplay === 'on-request') return 'Sur demande'
  if (exp.priceDisplay === 'private-quote') return 'Devis sur mesure'
  if (exp.priceAmount) {
    const prefix = exp.priceDisplay === 'from' ? 'À partir de ' : ''
    const suffix = exp.priceSuffix ? ` ${exp.priceSuffix}` : ''
    return `${prefix}${exp.priceAmount.toLocaleString('fr-FR')} €${suffix}`
  }
  return 'Sur demande'
}

// ─── PortableText components ───────────────────────────────
const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 leading-relaxed" style={{ color: '#5C6E7E', fontSize: '1.0625rem' }}>
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.75rem', color: '#0F3D38', fontWeight: 400 }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.375rem', color: '#0F3D38', fontWeight: 400 }}>
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="pl-5 my-8" style={{ borderLeft: '2px solid #C4902A' }}>
        <p className="italic leading-relaxed" style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.125rem', color: '#1E6860' }}>
          {children}
        </p>
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong style={{ color: '#0F3D38' }}>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" style={{ color: '#C4902A', textDecoration: 'underline' }}>
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-5 flex flex-col gap-2">{children}</ul>,
    number: ({ children }) => <ol className="mb-5 flex flex-col gap-2 list-decimal list-inside">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-2.5 text-sm" style={{ color: '#5C6E7E' }}>
        <span style={{ color: '#C4902A', marginTop: '4px', flexShrink: 0 }}>•</span>
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="text-sm" style={{ color: '#5C6E7E' }}>{children}</li>
    ),
  },
}

// ─── generateStaticParams ──────────────────────────────────
export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return []
  try {
    const data = await sanityClient.fetch<{ experiences: Array<{ slug: { current: string } }> }>(sitemapQuery)
    return (data.experiences ?? []).map(e => ({ slug: e.slug.current }))
  } catch {
    return []
  }
}

// ─── generateMetadata ──────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return {}
  try {
    const exp = await sanityClient.fetch<Experience | null>(experienceBySlugQuery, { slug })
    if (!exp) return {}
    const title = exp.seo?.metaTitle ?? exp.title
    const description = exp.seo?.metaDescription ?? exp.tagline ?? ''
    return {
      title,
      description,
      alternates: { canonical: `https://rendezvous-surlenil.com/experiences/${slug}` },
      robots: exp.seo?.noIndex ? { index: false } : undefined,
    }
  } catch {
    return {}
  }
}

// ─── Page ──────────────────────────────────────────────────
export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) notFound()

  let exp: Experience | null = null
  try {
    exp = await sanityClient.fetch<Experience | null>(experienceBySlugQuery, { slug })
  } catch {
    notFound()
  }
  if (!exp) notFound()

  const ctaMsg = exp.ctaWhatsappMessage
    ?? `Bonjour Sophie, je suis intéressé(e) par "${exp.title}"${exp.duration ? ` (${exp.duration})` : ''}. Pouvez-vous m'en dire plus ? 🌿`
  const whatsappUrl = getWhatsAppUrl(ctaMsg)
  const typeLabel = TYPE_LABELS[exp.type] ?? exp.type
  const priceLabel = formatPrice(exp)

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '65vh' }}>
        <div className="absolute inset-0">
          {exp.mainImage ? (
            <Image
              src={urlFor(exp.mainImage).width(1600).height(900).url()}
              alt={exp.mainImage.alt ?? exp.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ filter: 'brightness(0.68)' }}
              placeholder={exp.mainImage.asset.metadata?.lqip ? 'blur' : 'empty'}
              blurDataURL={exp.mainImage.asset.metadata?.lqip}
            />
          ) : (
            <div className="absolute inset-0" style={{ background: '#0F3D38' }} />
          )}
          <div className="img-overlay-hero" />
        </div>

        <div
          className="relative z-10 flex flex-col justify-end px-6 md:px-16 pb-20 md:pb-28 max-w-[1200px] mx-auto"
          style={{ minHeight: '65vh' }}
        >
          <nav
            className="absolute top-28 left-6 md:left-16 flex items-center gap-2 text-xs"
            style={{ color: 'rgba(255,255,255,0.6)' }}
            aria-label="Fil d'Ariane"
          >
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/sejours" className="hover:text-white transition-colors">Nos séjours</Link>
            <span>/</span>
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>{exp.title}</span>
          </nav>

          <div className="max-w-2xl">
            <p className="eyebrow mb-4" style={{ color: '#CE8D5C' }}>{typeLabel}</p>
            <h1
              className="text-display-xl mb-4"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: 'white', fontWeight: 300, lineHeight: 1.15 }}
            >
              {exp.title}
            </h1>
            {exp.tagline && (
              <p className="mb-8 text-lg" style={{ color: 'rgba(250,247,242,0.85)', maxWidth: '520px', fontWeight: 300 }}>
                {exp.tagline}
              </p>
            )}

            {/* Prix + durée inline */}
            <div className="flex flex-wrap gap-4 mb-10">
              {exp.duration && (
                <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  <Clock size={14} aria-hidden="true" />
                  {exp.duration}
                </div>
              )}
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#CE8D5C' }}>
                {priceLabel}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Demander une proposition →
              </a>
              {exp.program && exp.program.length > 0 && (
                <a href="#programme" className="btn btn-secondary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}>
                  Voir le programme
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Highlights ────────────────────────────────────── */}
      {exp.highlights && exp.highlights.length > 0 && (
        <section style={{ background: '#0F3D38', borderBottom: '1px solid rgba(201,169,110,0.15)' }}>
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8">
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-5">
              {exp.highlights.map((h, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-1">
                  <p className="text-xs font-semibold tracking-[0.1em] uppercase" style={{ color: '#C4902A' }}>
                    {h.value ?? '—'}
                  </p>
                  <p className="text-xs" style={{ color: 'rgba(250,247,242,0.65)' }}>
                    {h.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Description ───────────────────────────────────── */}
      {exp.description && (
        <section className="py-20 md:py-28" style={{ background: '#FAF7F2' }}>
          <div className="max-w-[760px] mx-auto px-6 md:px-12">
            <PortableText value={exp.description as never} components={ptComponents} />
          </div>
        </section>
      )}

      {/* ─── Galerie ───────────────────────────────────────── */}
      {exp.gallery && exp.gallery.length > 0 && (
        <section className="py-12" style={{ background: '#FDF8F0' }}>
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {exp.gallery.slice(0, 6).map((img, i) => (
                <div key={i} className="relative overflow-hidden rounded-sm" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src={urlFor(img).width(600).height(450).url()}
                    alt={img.alt ?? `${exp.title} — photo ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Programme jour par jour ───────────────────────── */}
      {exp.program && exp.program.length > 0 && (
        <section id="programme" className="py-20 md:py-28" style={{ background: '#FAF7F2' }} aria-labelledby="prog-heading">
          <div className="max-w-[900px] mx-auto px-6 md:px-12">
            <div className="text-center mb-14">
              <p className="eyebrow mb-4">Votre voyage, jour par jour</p>
              <h2
                id="prog-heading"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(1.625rem, 3vw, 2.375rem)', color: '#0F3D38', fontWeight: 300 }}
              >
                Le programme
              </h2>
            </div>
            <div className="flex flex-col gap-10">
              {exp.program.map((day, i) => (
                <div key={day._key ?? i} className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-10">
                  {/* Label jour */}
                  <div className="md:pt-1">
                    <p className="text-xs font-bold tracking-[0.15em] uppercase mb-1" style={{ color: '#C4902A' }}>
                      {day.day ?? `Jour ${i + 1}`}
                    </p>
                    {day.title && (
                      <p className="text-sm font-medium" style={{ color: '#0F3D38' }}>{day.title}</p>
                    )}
                  </div>
                  {/* Contenu */}
                  <div>
                    {day.image && (
                      <div className="relative overflow-hidden rounded-sm mb-5" style={{ aspectRatio: '16/7' }}>
                        <Image
                          src={urlFor(day.image).width(800).height(350).url()}
                          alt={day.image.alt ?? day.title ?? `Jour ${i + 1}`}
                          fill
                          sizes="(max-width: 900px) 100vw, 720px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    {day.description && (
                      <PortableText value={day.description as never} components={ptComponents} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Dates thématiques ─────────────────────────────── */}
      {exp.thematicDates && exp.thematicDates.length > 0 && (
        <section className="py-16 md:py-20" style={{ background: '#FDF8F0' }} aria-labelledby="dates-heading">
          <div className="max-w-[900px] mx-auto px-6 md:px-12">
            <div className="text-center mb-10">
              <p className="eyebrow mb-4">Partez à une date précise</p>
              <h2
                id="dates-heading"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(1.5rem, 2.5vw, 2.125rem)', color: '#0F3D38', fontWeight: 300 }}
              >
                Dates disponibles
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {exp.thematicDates.map((d, i) => {
                const status = STATUS_LABELS[d.status ?? 'available']
                const isFull = d.status === 'full'
                return (
                  <div
                    key={d._key ?? i}
                    className="rounded-sm p-5"
                    style={{
                      background: 'white',
                      border: '1px solid #E8D5B7',
                      opacity: isFull ? 0.6 : 1,
                    }}
                  >
                    {d.label && (
                      <p className="text-sm font-semibold mb-2" style={{ color: '#0F3D38' }}>{d.label}</p>
                    )}
                    {(d.startDate || d.endDate) && (
                      <div className="flex items-center gap-2 mb-3 text-xs" style={{ color: '#8A9BAB' }}>
                        <MapPin size={11} aria-hidden="true" />
                        <span>
                          {formatDateFr(d.startDate)}
                          {d.endDate && d.endDate !== d.startDate ? ` → ${formatDateFr(d.endDate)}` : ''}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        {d.priceAmount && (
                          <p className="font-semibold text-sm" style={{ color: '#0F3D38' }}>
                            {d.priceAmount.toLocaleString('fr-FR')} €
                            {exp.priceSuffix ? <span className="font-normal text-xs ml-1" style={{ color: '#8A9BAB' }}>{exp.priceSuffix}</span> : null}
                          </p>
                        )}
                        {d.spotsLeft !== undefined && d.spotsLeft > 0 && (
                          <div className="flex items-center gap-1 mt-1 text-xs" style={{ color: '#8A9BAB' }}>
                            <Users size={11} aria-hidden="true" />
                            <span>{d.spotsLeft} place{d.spotsLeft > 1 ? 's' : ''} restante{d.spotsLeft > 1 ? 's' : ''}</span>
                          </div>
                        )}
                      </div>
                      <span
                        className="text-[10px] font-semibold tracking-[0.1em] uppercase px-3 py-1 rounded-sm"
                        style={{ color: status.color, background: status.bg }}
                      >
                        {status.label}
                      </span>
                    </div>
                    {!isFull && (
                      <a
                        href={getWhatsAppUrl(`Bonjour Sophie, je suis intéressé(e) par "${d.label ?? exp.title}" (${formatDateFr(d.startDate)}${d.endDate ? ` → ${formatDateFr(d.endDate)}` : ''}). Pouvez-vous m'en dire plus ? 🌿`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 text-xs font-medium flex items-center gap-1.5"
                        style={{ color: '#C4902A' }}
                      >
                        Réserver cette date →
                      </a>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── Inclus / Non inclus ───────────────────────────── */}
      {((exp.included && exp.included.length > 0) || (exp.notIncluded && exp.notIncluded.length > 0)) && (
        <section className="py-16 md:py-20" style={{ background: '#FAF7F2' }}>
          <div className="max-w-[900px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {exp.included && exp.included.length > 0 && (
                <div>
                  <p className="text-xs font-bold tracking-[0.15em] uppercase mb-5" style={{ color: '#27AE60' }}>
                    Inclus dans ce séjour
                  </p>
                  <ul className="flex flex-col gap-3">
                    {exp.included.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: '#5C6E7E' }}>
                        <CheckCircle size={13} style={{ color: '#27AE60', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {exp.notIncluded && exp.notIncluded.length > 0 && (
                <div>
                  <p className="text-xs font-bold tracking-[0.15em] uppercase mb-5" style={{ color: '#E74C3C' }}>
                    Non inclus
                  </p>
                  <ul className="flex flex-col gap-3">
                    {exp.notIncluded.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: '#5C6E7E' }}>
                        <XCircle size={13} style={{ color: '#E74C3C', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ─── FAQ ───────────────────────────────────────────── */}
      {exp.faq && exp.faq.length > 0 && (
        <section className="py-20 md:py-28" style={{ background: '#FDF8F0' }} aria-labelledby="faq-exp-heading">
          <div className="max-w-2xl mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="eyebrow mb-4">Questions fréquentes</p>
              <h2
                id="faq-exp-heading"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(1.5rem, 2.5vw, 2.125rem)', color: '#0F3D38', fontWeight: 300 }}
              >
                Tout ce que vous voulez savoir
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              {exp.faq.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-sm overflow-hidden"
                  style={{ background: 'white', border: '1px solid #E8D5B7' }}
                >
                  <summary
                    className="flex items-center justify-between px-6 py-5 cursor-pointer list-none"
                    style={{ color: '#0F3D38' }}
                  >
                    <span className="font-medium text-sm pr-4">{item.question}</span>
                    <ChevronDown
                      size={16}
                      style={{ color: '#C4902A', flexShrink: 0 }}
                      className="transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="px-6 pb-5">
                    <div style={{ height: '1px', background: '#E8D5B7', marginBottom: '1rem' }} />
                    <p className="text-sm leading-relaxed" style={{ color: '#5C6E7E' }}>{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA Final ──────────────────────────────────────── */}
      <section className="py-20 md:py-28 text-center" style={{ background: '#0F3D38' }}>
        <div className="max-w-xl mx-auto px-6">
          <p className="eyebrow mb-4" style={{ color: '#C4902A' }}>{priceLabel}</p>
          <h2
            className="text-display-lg mb-6"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#FAF7F2', fontWeight: 400 }}
          >
            Prêt(e) pour{' '}
            <em style={{ fontStyle: 'italic', color: '#CE8D5C' }}>{exp.title}</em>&nbsp;?
          </h2>
          {exp.duration && (
            <p className="mb-4 text-sm" style={{ color: '#8A9BAB' }}>{exp.duration}</p>
          )}
          <p className="mb-10 text-sm leading-relaxed" style={{ color: '#8A9BAB' }}>
            Écrivez à Sophie, elle vous répond sous 24h avec une proposition sur mesure.
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

      {/* ─── Navigation retour ─────────────────────────────── */}
      <div className="py-8 px-6" style={{ background: '#FAF7F2', borderTop: '1px solid #E8D5B7' }}>
        <div className="max-w-[1200px] mx-auto">
          <Link
            href="/sejours"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-70"
            style={{ color: '#0F3D38' }}
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Retour aux séjours
          </Link>
        </div>
      </div>
    </>
  )
}
