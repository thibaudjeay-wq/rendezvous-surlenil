import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import { sanityClient } from '@/lib/sanity/client'
import { postsByCategoryQuery, categoryBySlugQuery, allCategoriesQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { getWhatsAppUrl } from '@/lib/constants'

export const revalidate = 3600

type SanityPost = {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt?: string
  mainImage?: { asset: { _id: string; url: string; metadata: { lqip: string } }; alt?: string; hotspot?: object; crop?: object }
  categories?: Array<{ title: string; slug: { current: string } }>
}

type SanityCategory = {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  icon?: string
  count: number
  seo?: { metaTitle?: string; metaDescription?: string }
}

function formatDate(iso?: string): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

// ─── generateStaticParams ─────────────────────────────────
export async function generateStaticParams() {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return []
    const categories = await sanityClient.fetch<SanityCategory[]>(allCategoriesQuery)
    return (categories ?? []).map((c) => ({ slug: c.slug.current }))
  } catch {
    return []
  }
}

// ─── generateMetadata ─────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) throw new Error()
    const category = await sanityClient.fetch<SanityCategory>(categoryBySlugQuery, { slug })
    if (!category) throw new Error()
    return {
      title: category.seo?.metaTitle ?? `${category.title}, Blog Rendez-vous sur le Nil`,
      description: category.seo?.metaDescription ?? category.description ?? `Articles sur le thème "${category.title}", conseils et inspirations pour voyager en Égypte.`,
      alternates: { canonical: `https://rendezvous-surlenil.com/blog/categorie/${slug}` },
    }
  } catch {
    return { title: 'Catégorie, Blog Rendez-vous sur le Nil' }
  }
}

// ─── Page ─────────────────────────────────────────────────
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) notFound()

  let category: SanityCategory | null = null
  let posts: SanityPost[] = []

  try {
    const [fetchedCategory, fetchedPosts] = await Promise.all([
      sanityClient.fetch<SanityCategory>(categoryBySlugQuery, { slug }),
      sanityClient.fetch<SanityPost[]>(postsByCategoryQuery, { categorySlug: slug }),
    ])
    category = fetchedCategory
    posts = fetchedPosts ?? []
  } catch {
    notFound()
  }

  if (!category) notFound()

  const whatsappUrl = getWhatsAppUrl(
    `Bonjour Sophie, j'ai lu des articles sur "${category.title}" et j'aimerais organiser un voyage en Égypte. Êtes-vous disponible ? 🌿`
  )

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: '#0F3D38' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs mb-10" style={{ color: 'rgba(255,255,255,0.5)' }} aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span style={{ color: 'rgba(255,255,255,0.85)' }}>{category.title}</span>
          </nav>

          <div className="max-w-2xl">
            {category.icon && (
              <p className="text-3xl mb-4" aria-hidden="true">{category.icon}</p>
            )}
            <p className="eyebrow mb-4" style={{ color: '#C4902A' }}>Catégorie</p>
            <h1
              className="text-display-xl mb-4"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: '#FAF7F2', fontWeight: 300 }}
            >
              {category.title}
            </h1>
            {category.description && (
              <p className="text-lg" style={{ color: 'rgba(250,247,242,0.72)', fontWeight: 300, lineHeight: 1.7 }}>
                {category.description}
              </p>
            )}
            <p className="mt-4 text-sm" style={{ color: '#8A9BAB' }}>
              {posts.length} article{posts.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Articles ──────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#FDF8F0' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg mb-2" style={{ color: '#0F3D38', fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem' }}>
                Aucun article pour le moment
              </p>
              <p className="text-sm mb-8" style={{ color: '#8A9BAB' }}>
                De nouveaux articles arrivent bientôt dans cette catégorie.
              </p>
              <Link href="/blog" className="btn btn-secondary">
                Voir tous les articles
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((article, i) => (
                <Link
                  key={article._id}
                  href={`/blog/${article.slug.current}`}
                  className="card group overflow-hidden block"
                >
                  <div className="img-section relative overflow-hidden">
                    {article.mainImage?.asset ? (
                      <Image
                        src={urlFor(article.mainImage).width(600).height(450).url()}
                        alt={article.mainImage.alt ?? article.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        placeholder={article.mainImage.asset.metadata?.lqip ? 'blur' : undefined}
                        blurDataURL={article.mainImage.asset.metadata?.lqip}
                        priority={i === 0}
                      />
                    ) : (
                      <div style={{ position: 'absolute', inset: 0, background: '#2A5A54' }} />
                    )}
                  </div>
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
                          5 min
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
          )}

          {/* Retour */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#C4902A]"
              style={{ color: '#5C6E7E' }}
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Voir tous les articles
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────── */}
      <section className="py-16 text-center" style={{ background: '#0F3D38' }}>
        <div className="max-w-lg mx-auto px-6">
          <h2
            className="text-display-lg mb-6"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: '#FAF7F2', fontWeight: 400 }}
          >
            Ces articles vous inspirent ?
            <br />
            <em style={{ fontStyle: 'italic', color: '#CE8D5C' }}>Parlons de votre voyage.</em>
          </h2>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }} aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Écrire à Sophie sur WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
