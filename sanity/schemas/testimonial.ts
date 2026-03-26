import { defineType, defineField } from 'sanity'
import { HeartIcon } from '@sanity/icons'

export const testimonial = defineType({
  name: 'testimonial',
  title: '⭐ Témoignages clients',
  type: 'document',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'authorName',
      title: 'Prénom & Nom',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'authorLocation',
      title: 'Ville / pays',
      type: 'string',
      description: 'Ex : Paris, France',
    }),
    defineField({
      name: 'authorPhoto',
      title: 'Photo du client (optionnel)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'rating',
      title: 'Note /5',
      type: 'number',
      options: {
        list: [
          { title: '⭐⭐⭐⭐⭐ 5/5', value: 5 },
          { title: '⭐⭐⭐⭐ 4/5', value: 4 },
          { title: '⭐⭐⭐ 3/5', value: 3 },
        ],
        layout: 'radio',
      },
      initialValue: 5,
    }),
    defineField({
      name: 'quote',
      title: 'Citation courte',
      type: 'string',
      description: 'La phrase principale affichée en gros. Max 120 caractères.',
      validation: (R) => R.required().max(120),
    }),
    defineField({
      name: 'fullTestimonial',
      title: 'Témoignage complet (optionnel)',
      type: 'text',
      rows: 4,
      description: 'Pour une page dédiée ou un affichage étendu.',
    }),
    defineField({
      name: 'experience',
      title: 'Expérience vécue',
      type: 'reference',
      to: [{ type: 'experience' }],
      description: 'Quel séjour ou voyage a effectué ce client ?',
    }),
    defineField({
      name: 'date',
      title: 'Date du voyage',
      type: 'date',
    }),
    defineField({
      name: 'featured',
      title: 'Afficher sur la homepage ?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'quote',
      media: 'authorPhoto',
    },
  },
})
