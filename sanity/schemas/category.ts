import { defineType, defineField } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const category = defineType({
  name: 'category',
  title: '🏷️ Catégories de blog',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Nom de la catégorie',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL de la catégorie',
      type: 'slug',
      options: { source: 'title' },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'icon',
      title: 'Emoji ou icône',
      type: 'string',
      description: 'Ex : 🛶, 🏛️, 🌅',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoObject',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'description' },
    prepare({ title, subtitle }) {
      return { title, subtitle }
    },
  },
})
