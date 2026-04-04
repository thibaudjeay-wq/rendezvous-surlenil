import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { sanityClient } from '@/lib/sanity/client'
import { postsQuery, allCategoriesQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { getWhatsAppUrl } from '@/lib/constants'

export const revalidate = 3600 // ISR, revalide toutes les heures

export const metadata: Metadata = {
  title: 'Blog, Inspirations & guides pour voyager en Égypte',
  description:
    "Conseils pratiques, récits de voyage, portraits de lieux, le blog de Rendez-vous sur le Nil pour préparer votre voyage en Égypte avec Sophie & Nasser.",
  alternates: { canonical: 'https://rendezvous-surlenil.com/blog' },
  openGraph: {
    title: 'Blog & Inspirations, Rendez-vous sur le Nil',
    description: "Le blog d'une Française expatriée à Louxor pour vous faire aimer l'Égypte.",
    images: [{ url: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=1200&q=85', width: 1200, height: 630, alt: 'Blog Égypte, inspirations et guides voyage par Sophie Godineau' }],
  },
}

// ─── Types ────────────────────────────────────────────────
type SanityPost = {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt?: string
  featured?: boolean
  mainImage?: { asset: { _id: string; url: string; metadata: { lqip: string } }; alt?: string; hotspot?: object; crop?: object }
  categories?: Array<{ title: string; slug: { current: string } }>
  tags?: string[]
  author?: { name: string }
}

type SanityCategory = {
  _id: string
  title: string
  slug: { current: string }
  icon?: string
  count: number
}

// ─── Données statiques de fallback ────────────────────────
// Slugs synchronisés avec STATIC_ARTICLES dans app/blog/[slug]/page.tsx
const staticPosts: SanityPost[] = [
  {
    _id: 'static-1',
    title: 'Quand partir en Égypte ? Le guide complet mois par mois',
    slug: { current: 'quand-partir-en-egypte' },
    excerpt: "L'Égypte se visite toute l'année, mais tous les mois ne se ressemblent pas. Températures, affluence, fêtes locales, Nil en crue : voici le calendrier honnête pour choisir votre moment.",
    publishedAt: '2024-11-10T08:00:00Z',
    categories: [{ title: 'Conseils pratiques', slug: { current: 'conseils-pratiques' } }],
  },
  {
    _id: 'static-2',
    title: "Dormir dans le désert blanc en Égypte : une expérience hors du temps",
    slug: { current: 'dormir-desert-blanc-egypte' },
    excerpt: "Le désert blanc, dans le Sahara occidental, est l'un des paysages les plus irréels d'Afrique. Des formations calcaires sculptées par le vent, une nuit sous les étoiles, un silence total. Comment organiser cette expérience depuis Bahariya.",
    publishedAt: '2024-12-03T08:00:00Z',
    categories: [{ title: 'Expériences', slug: { current: 'experiences' } }],
  },
  {
    _id: 'static-3',
    title: "Voyage sur mesure en Égypte : ce que les agences ne vous disent pas",
    slug: { current: 'voyage-sur-mesure-egypte' },
    excerpt: "Le « sur mesure » est devenu un argument marketing galvaudé. Sophie explique ce que signifie vraiment construire un voyage en Égypte personnalisé, et ce que les agences généralistes ne peuvent pas offrir.",
    publishedAt: '2025-01-15T08:00:00Z',
    categories: [{ title: 'Voyage sur mesure', slug: { current: 'sur-mesure' } }],
  },
  {
    _id: 'static-4',
    title: "Qu'est-ce qu'une dahabiya ? Tout ce qu'il faut savoir",
    slug: { current: 'qu-est-ce-qu-une-dahabiya' },
    excerpt: "Le voilier traditionnel égyptien utilisé sur le Nil depuis l'Antiquité. Jusqu'à 24 passagers, équipage de 10 à 14 personnes, guide francophone à bord pendant toute la croisière.",
    publishedAt: '2024-10-20T08:00:00Z',
    categories: [{ title: 'Croisières', slug: { current: 'croisieres' } }],
  },
  {
    _id: 'static-5',
    title: 'Louxor : 5 temples méconnus que les circuits ne montrent jamais',
    slug: { current: 'louxor-5-temples-meconnus' },
    excerpt: "Medinet Habou, Deir el-Medina, la chapelle rouge de Hatshepsout, Louxor cache des merveilles que 90% des touristes ne voient jamais.",
    publishedAt: '2024-09-15T08:00:00Z',
    categories: [{ title: 'Louxor', slug: { current: 'louxor' } }],
  },
  {
    _id: 'static-6',
    title: "Siwa : l'oasis secrète à la frontière libyenne",
    slug: { current: 'siwa-oasis-secrete' },
    excerpt: "Berbère, isolée, préservée, Siwa est probablement la destination la moins connue d'Égypte. Et de loin la plus envoûtante.",
    publishedAt: '2024-08-05T08:00:00Z',
    categories: [{ title: 'Désert', slug: { current: 'desert' } }],
  },
]

// Palette d'images par index
const fallbackImages = [
  '/photos/blog/felucques-assouan.png',
  '/photos/blog/desert-blanc-formations.jpg',
  '/photos/privileges/siwa-lac-turquoise.jpg',
  '/photos/dahabiya/salon-coucher.jpg',
  '/photos/sophie/sophie-nasser-duo.jpg',
  '/photos/dahabiya/exterieur-coucher.jpg',
]

function estimateReadTime(excerpt?: string): string {
  const words = (excerpt ?? '').split(/\s+/).length
  return `${Math.max(3, Math.round(words / 200 * 8))} min`
}

function formatDate(iso?: string): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

// ─── Page ─────────────────────────────────────────────────
export default async function BlogPage() {
  let posts: SanityPost[] = staticPosts
  let categories: SanityCategory[] = []
  let isSanityConnected = false

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const [fetchedPosts, fetchedCategories] = await Promise.all([
        sanityClient.fetch<SanityPost[]>(postsQuery, { from: 0, to: 24 }),
        sanityClient.fetch<SanityCategory[]>(allCategoriesQuery),
      ])
      if (fetchedPosts && fetchedPosts.length > 0) {
        // Merger les corrections statiques sur les excerpts Sanity
        posts = fetchedPosts.map(p => {
          const override = staticPosts.find(s => s.slug?.current === p.slug?.current)
          return override ? { ...p, excerpt: override.excerpt ?? p.excerpt } : p
        })
        categories = fetchedCategories ?? []
        isSanityConnected = true
      }
    }
  } catch {
    // Sanity pas encore configuré, fallback static
  }

  const featuredIndex = isSanityConnected ? posts.findIndex((p) => p.featured) : -1
  const featured = featuredIndex >= 0 ? posts[featuredIndex] : posts[0]
  const rest = posts.filter((p) => p !== featured)
  const whatsappUrl = getWhatsAppUrl(
    "Bonjour Sophie, j'ai lu votre blog et j'aimerais discuter d'un projet de voyage en Égypte. Êtes-vous disponible ? 🌿"
  )

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="py-24 md:py-32" style={{ background: '#0F3D38' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center">
          <p className="eyebrow mb-5" style={{ color: '#C4902A' }}>Blog & Inspirations</p>
          <h1
            className="text-display-xl mb-6"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: '#FAF7F2', fontWeight: 300 }}
          >
            L&apos;Égypte vue
            <br />
            <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#CE8D5C' }}>de l&apos;intérieur</em>
          </h1>
          <p className="max-w-xl mx-auto text-lg" style={{ color: 'rgba(250,247,242,0.72)', fontWeight: 300, lineHeight: 1.7 }}>
            Récits de voyage, portraits de lieux, conseils pratiques, les carnets d&apos;une Française
            qui connaît l&apos;Égypte de l&apos;intérieur. Depuis 2021.
          </p>

          {/* Catégories dans le hero si Sanity connecté */}
          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-10">
              <Link
                href="/blog"
                className="text-xs px-4 py-2 rounded-sm font-medium transition-colors"
                style={{ background: 'rgba(201,169,110,0.15)', color: '#C4902A', border: '1px solid rgba(201,169,110,0.3)' }}
              >
                Tous les articles
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/blog/categorie/${cat.slug.current}`}
                  className="text-xs px-4 py-2 rounded-sm font-medium transition-all hover:bg-[rgba(201,169,110,0.15)] hover:text-[#C4902A]"
                  style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(250,247,242,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {cat.icon && <span className="mr-1.5">{cat.icon}</span>}
                  {cat.title}
                  {cat.count > 0 && (
                    <span className="ml-1.5 text-[10px] opacity-60">({cat.count})</span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Article à la une ───────────────────────────────── */}
      {featured && (
        <section className="py-14 md:py-20" style={{ background: '#FDF8F0' }}>
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <p className="eyebrow mb-8">À la une</p>

            <Link
              href={`/blog/${featured.slug.current}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-sm card"
            >
              {/* Image */}
              <div className="img-cinematic relative overflow-hidden">
                {isSanityConnected && featured.mainImage?.asset ? (
                  <Image
                    src={urlFor(featured.mainImage).width(900).height(506).url()}
                    alt={featured.mainImage.alt ?? featured.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    placeholder={featured.mainImage.asset.metadata?.lqip ? 'blur' : undefined}
                    blurDataURL={featured.mainImage.asset.metadata?.lqip}
                  />
                ) : (
                  <Image
                    src={fallbackImages[0]}
                    alt={featured.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>

              {/* Texte */}
              <div className="flex flex-col justify-center p-8 md:p-12" style={{ background: 'white' }}>
                {featured.categories?.[0] && (
                  <span
                    className="inline-block text-[10px] font-semibold tracking-[0.14em] uppercase px-2.5 py-1 rounded-sm mb-5 self-start"
                    style={{ background: '#FDF8F0', color: '#C4902A', border: '1px solid #E8D5B7' }}
                  >
                    {featured.categories[0].title}
                  </span>
                )}
                <h2
                  className="mb-4 transition-colors duration-200 group-hover:text-[#C4902A]"
                  style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.75rem', color: '#0F3D38', fontWeight: 400, lineHeight: 1.25 }}
                >
                  {featured.title}
                </h2>
                {featured.excerpt && (
                  <p className="text-sm leading-relaxed mb-6" style={{ color: '#5C6E7E' }}>
                    {featured.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-xs" style={{ color: '#8A9BAB' }}>{formatDate(featured.publishedAt)}</span>
                    <span className="flex items-center gap-1.5 text-xs" style={{ color: '#8A9BAB' }}>
                      <Clock size={11} aria-hidden="true" />
                      {estimateReadTime(featured.excerpt)} de lecture
                    </span>
                  </div>
                  <span
                    className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase transition-colors group-hover:text-[#A87820]"
                    style={{ color: '#C4902A' }}
                  >
                    Lire <ArrowRight size={12} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ─── Grille d'articles ──────────────────────────────── */}
      <section className="pb-20 md:pb-28" style={{ background: '#FDF8F0' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">

          {/* Filtres statiques si Sanity non connecté */}
          {!isSanityConnected && (
            <div className="flex flex-wrap gap-2 mb-10">
              {['Tous', 'Croisières', 'Louxor', 'Désert', 'Pratique', 'Temples'].map((cat, i) => (
                <button
                  key={cat}
                  className="text-xs px-4 py-2 rounded-sm font-medium"
                  style={{
                    background: i === 0 ? '#0F3D38' : 'white',
                    color: i === 0 ? '#FAF7F2' : '#5C6E7E',
                    border: i === 0 ? '1px solid #0F3D38' : '1px solid #E8D5B7',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((article, i) => (
              <Link
                key={article._id}
                href={`/blog/${article.slug.current}`}
                className="card group overflow-hidden block"
              >
                {/* Image */}
                <div className="img-section relative overflow-hidden">
                  {isSanityConnected && article.mainImage?.asset ? (
                    <Image
                      src={urlFor(article.mainImage).width(600).height(450).url()}
                      alt={article.mainImage.alt ?? article.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      placeholder={article.mainImage.asset.metadata?.lqip ? 'blur' : undefined}
                      blurDataURL={article.mainImage.asset.metadata?.lqip}
                    />
                  ) : (
                    <Image
                      src={fallbackImages[(i + 1) % fallbackImages.length]}
                      alt={article.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  {article.categories?.[0] && (
                    <span
                      className="absolute top-3 left-3 text-[10px] font-semibold tracking-[0.12em] uppercase px-2.5 py-1 rounded-sm z-10"
                      style={{ background: 'rgba(13,33,55,0.75)', color: 'rgba(250,247,242,0.9)', backdropFilter: 'blur(4px)' }}
                    >
                      {article.categories[0].title}
                    </span>
                  )}
                </div>

                {/* Texte */}
                <div className="p-5">
                  <h3
                    className="mb-2 leading-snug transition-colors duration-200 group-hover:text-[#C4902A]"
                    style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.125rem', color: '#0F3D38', fontWeight: 500 }}
                  >
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-xs leading-relaxed mb-4 line-clamp-3" style={{ color: '#5C6E7E' }}>
                      {article.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #F0E8D8' }}>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px]" style={{ color: '#8A9BAB' }}>{formatDate(article.publishedAt)}</span>
                      <span className="flex items-center gap-1 text-[11px]" style={{ color: '#8A9BAB' }}>
                        <Clock size={10} aria-hidden="true" />
                        {estimateReadTime(article.excerpt)}
                      </span>
                    </div>
                    <ArrowRight
                      size={13}
                      style={{ color: '#C4902A' }}
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <p className="text-center text-sm mt-12" style={{ color: '#8A9BAB' }}>
            {isSanityConnected
              ? `${posts.length} article${posts.length > 1 ? 's' : ''} publiés, nouveaux articles chaque mois.`
              : "De nouveaux articles sont publiés régulièrement. Inscrivez-vous pour recevoir conseils de voyage et nouvelles dates."
            }
          </p>
        </div>
      </section>

      {/* ─── CTA WhatsApp ───────────────────────────────────── */}
      <section className="py-20 text-center" style={{ background: '#0F3D38' }}>
        <div className="max-w-lg mx-auto px-6">
          <p className="eyebrow mb-4" style={{ color: '#C4902A' }}>Vous inspirez-vous ?</p>
          <h2
            className="text-display-lg mb-6"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: '#FAF7F2', fontWeight: 400 }}
          >
            Et si on en parlait ?
          </h2>
          <p className="mb-8 text-sm leading-relaxed" style={{ color: '#8A9BAB' }}>
            Vous avez lu un article et l&apos;envie d&apos;Égypte se précise ? Sophie est là pour transformer
            votre inspiration en vrai voyage.
          </p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
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
