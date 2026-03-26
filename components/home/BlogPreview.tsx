import Link from 'next/link'

// Placeholder, sera remplacé par données Sanity
const posts = [
  {
    _id: '1',
    title: 'Dahabiya vs croisière classique : laquelle choisir pour le Nil ?',
    slug: { current: 'dahabiya-vs-croisiere-classique' },
    excerpt: 'Deux façons radicalement différentes de naviguer sur le Nil. On vous aide à choisir selon votre style de voyage.',
    publishedAt: '2024-11-15',
    category: { title: 'Croisières', slug: { current: 'croisieres' } },
    image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=600&q=80',
    readingTime: 6,
  },
  {
    _id: '2',
    title: 'Louxor : les 7 incontournables à ne pas manquer',
    slug: { current: 'louxor-incontournables' },
    excerpt: 'Karnak, la Vallée des Rois, Deir el-Bahari... et les adresses secrètes que seule Sophie connaît.',
    publishedAt: '2024-10-28',
    category: { title: 'Destinations', slug: { current: 'destinations' } },
    image: 'https://images.unsplash.com/photo-1539768942893-daf853948e5e?w=600&q=80',
    readingTime: 8,
  },
  {
    _id: '3',
    title: 'Quand partir en Égypte ? Le guide des saisons par Sophie',
    slug: { current: 'quand-partir-egypte-saisons' },
    excerpt: 'Chaleur, foules, budget... Sophie vous dit honnêtement quelle période choisir selon votre projet.',
    publishedAt: '2024-10-10',
    category: { title: 'Conseils pratiques', slug: { current: 'conseils-pratiques' } },
    image: 'https://images.unsplash.com/photo-1601148494936-9b7e580f9826?w=600&q=80',
    readingTime: 5,
  },
]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPreview() {
  return (
    <section
      className="py-20 md:py-28"
      style={{ background: '#FDF8F0' }}
      aria-labelledby="blog-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <p className="eyebrow mb-4">Blog & Inspirations</p>
            <h2
              id="blog-heading"
              className="text-display-lg title-underline"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#0F3D38' }}
            >
              Se préparer, s&apos;inspirer
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 300 }}>rêver</em>
            </h2>
          </div>
          <Link
            href="/blog"
            className="btn btn-ghost hidden md:flex"
            style={{ color: '#C4902A', borderColor: '#C4902A', flexShrink: 0 }}
          >
            Tous les articles →
          </Link>
        </div>

        {/* Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {posts.map((post) => (
            <article key={post._id} className="card group flex flex-col">
              {/* Image */}
              <Link href={`/blog/${post.slug.current}`} className="block overflow-hidden" style={{ aspectRatio: '16/10' }}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>

              {/* Contenu */}
              <div className="flex flex-col flex-1 p-6">
                {/* Meta */}
                <div className="flex items-center justify-between mb-3">
                  <Link
                    href={`/blog/categorie/${post.category.slug.current}`}
                    className="text-[10px] font-semibold tracking-[0.14em] uppercase transition-colors hover:text-[#C4902A]"
                    style={{ color: '#C4902A' }}
                  >
                    {post.category.title}
                  </Link>
                  <span className="text-xs" style={{ color: '#8A9BAB' }}>
                    {post.readingTime} min de lecture
                  </span>
                </div>

                <Link href={`/blog/${post.slug.current}`} className="group/title flex-1">
                  <h3
                    className="font-medium leading-snug mb-3 transition-colors group-hover/title:text-[#C4902A]"
                    style={{
                      fontFamily: 'Cormorant Garamond',
                      fontSize: '1.1875rem',
                      color: '#0F3D38',
                    }}
                  >
                    {post.title}
                  </h3>
                </Link>

                <p className="text-sm leading-relaxed mb-4" style={{ color: '#5C6E7E' }}>
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: '1px solid #E8D5B7' }}>
                  <time
                    dateTime={post.publishedAt}
                    className="text-xs"
                    style={{ color: '#8A9BAB' }}
                  >
                    {formatDate(post.publishedAt)}
                  </time>
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="text-xs font-medium transition-colors hover:text-[#C4902A]"
                    style={{ color: '#C4902A' }}
                  >
                    Lire →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA mobile */}
        <div className="text-center mt-10 md:hidden">
          <Link href="/blog" className="btn btn-secondary">
            Tous les articles
          </Link>
        </div>
      </div>
    </section>
  )
}
