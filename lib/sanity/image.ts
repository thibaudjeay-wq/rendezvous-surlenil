import imageUrlBuilder from '@sanity/image-url'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — imageUrlBuilder reste fonctionnel; la dépréciation concerne l'usage sans client Sanity
const builder = imageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
})

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
