import { groq } from 'next-sanity'

// ─── Fragments réutilisables ───────────────────────────────
const imageFields = groq`
  asset->{ _id, url, metadata { dimensions, lqip } },
  alt,
  hotspot, crop
`

const seoFields = groq`
  seo {
    metaTitle, metaDescription,
    ogImage { ${imageFields} },
    noIndex
  }
`

const experienceCard = groq`
  _id, title, slug, type, tagline,
  mainImage { ${imageFields} },
  priceDisplay, priceAmount, priceSuffix, duration,
  featured, order
`

// ─── Homepage ─────────────────────────────────────────────
export const homePageQuery = groq`{
  "featuredExperiences": *[_type == "experience" && featured == true] | order(order asc) [0...6] {
    ${experienceCard}
  },
  "dahabiya": *[_type == "experience" && type == "dahabiya"] | order(order asc) [0] {
    ${experienceCard},
    description,
    highlights,
    gallery[0...4] { ${imageFields} }
  },
  "testimonials": *[_type == "testimonial" && featured == true] | order(_createdAt desc) [0...3] {
    _id, authorName, authorLocation, rating, quote,
    authorPhoto { ${imageFields} },
    experience->{ title, type }
  },
  "latestPosts": *[_type == "post"] | order(publishedAt desc) [0...3] {
    _id, title, slug, excerpt, publishedAt,
    mainImage { ${imageFields} },
    categories[]->{ title, slug }
  },
  "leadMagnet": *[_type == "leadMagnet"][0] {
    title, subtitle, description, benefits, ctaLabel,
    mockupImage { ${imageFields} }
  }
}`

// ─── Expérience (page détail) ──────────────────────────────
export const experienceBySlugQuery = groq`
  *[_type == "experience" && slug.current == $slug][0] {
    _id, title, slug, type, tagline,
    description,
    mainImage { ${imageFields} },
    gallery[] { ${imageFields} },
    highlights,
    program[] {
      day, title, description,
      image { ${imageFields} }
    },
    included, notIncluded, faq,
    priceDisplay, priceAmount, priceSuffix, duration,
    thematicDates,
    ctaWhatsappMessage,
    ${seoFields}
  }
`

// ─── Séjours par type ─────────────────────────────────────
export const experiencesByTypeQuery = groq`
  *[_type == "experience" && type == $type] | order(order asc) {
    ${experienceCard}
  }
`

// ─── Blog — listing ───────────────────────────────────────
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) [$from...$to] {
    _id, title, slug, excerpt, publishedAt,
    mainImage { ${imageFields} },
    categories[]->{ title, slug },
    tags,
    author->{ name, photo { ${imageFields} } }
  }
`

export const postsCountQuery = groq`count(*[_type == "post"])`

// ─── Blog — article ───────────────────────────────────────
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, excerpt, publishedAt,
    mainImage { ${imageFields} },
    body,
    categories[]->{ title, slug },
    tags,
    author->{ name, role, photo { ${imageFields} }, bio },
    relatedExperiences[]->{ ${experienceCard} },
    ctaInArticle, showLeadMagnet,
    ${seoFields}
  }
`

// ─── Blog — par catégorie ─────────────────────────────────
export const postsByCategoryQuery = groq`
  *[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
    _id, title, slug, excerpt, publishedAt,
    mainImage { ${imageFields} },
    categories[]->{ title, slug }
  }
`

export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    title, slug, description, icon
  }
`

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id, title, slug, icon,
    "count": count(*[_type == "post" && ^._id in categories[]._ref])
  }
`

// ─── Témoignages ──────────────────────────────────────────
export const testimonialsFeaturedQuery = groq`
  *[_type == "testimonial" && featured == true] | order(_createdAt desc) [0...20] {
    _id, authorName, authorLocation, rating, quote,
    authorPhoto { ${imageFields} },
    experience->{ title, type }
  }
`

// ─── Expériences par type (enrichi) ───────────────────────
export const dahabiyaExperiencesQuery = groq`
  *[_type == "experience" && type == "dahabiya"] | order(order asc) {
    _id, title, slug, tagline,
    mainImage { ${imageFields} },
    gallery[0...6] { ${imageFields} },
    highlights,
    included, notIncluded,
    priceDisplay, priceAmount, priceSuffix, duration,
    ctaWhatsappMessage, featured
  }
`

export const signatureExperiencesQuery = groq`
  *[_type == "experience" && type == "sejour-signature"] | order(order asc) {
    _id, title, slug, tagline,
    mainImage { ${imageFields} },
    highlights,
    priceDisplay, priceAmount, priceSuffix, duration,
    ctaWhatsappMessage, featured,
    included
  }
`

export const privilegesExperiencesQuery = groq`
  *[_type == "experience" && type in ["sejour-privilege", "sejour-thematique"]] | order(order asc) {
    _id, title, slug, tagline,
    mainImage { ${imageFields} },
    highlights,
    priceDisplay, priceAmount, priceSuffix, duration,
    thematicDates,
    ctaWhatsappMessage, featured
  }
`

// ─── Sitemap ──────────────────────────────────────────────
export const sitemapQuery = groq`{
  "experiences": *[_type == "experience"]{ slug, _updatedAt },
  "posts": *[_type == "post"]{ slug, _updatedAt },
  "categories": *[_type == "category"]{ slug, _updatedAt }
}`
