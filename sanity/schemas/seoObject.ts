import { defineType, defineField } from 'sanity'

// Réutilisable sur tous les documents via type: 'seoObject'
export const seoObject = defineType({
  name: 'seoObject',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Titre SEO (balise title)',
      type: 'string',
      description: 'Idéalement 50-60 caractères. Affiché dans Google.',
      validation: (R) => R.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'Idéalement 120-160 caractères. Affiché sous le titre dans Google.',
      validation: (R) => R.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Image de partage (Open Graph)',
      type: 'image',
      description: 'Affichée quand on partage la page sur les réseaux. Format recommandé : 1200x630px.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'noIndex',
      title: 'Masquer cette page des moteurs de recherche ?',
      type: 'boolean',
      description: 'Activer uniquement pour les pages techniques (confirmation, etc.).',
      initialValue: false,
    }),
  ],
})
