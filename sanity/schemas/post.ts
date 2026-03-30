import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const post = defineType({
  name: 'post',
  title: '📝 Articles de blog',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'content', title: '✍️ Contenu', default: true },
    { name: 'meta', title: '🏷️ Catégories & Tags' },
    { name: 'conversion', title: '🎯 Conversion & CTA' },
    { name: 'seo', title: '🔍 SEO' },
  ],
  fields: [
    // ─── Contenu principal ────────────────────────────────
    defineField({
      name: 'title',
      title: 'Titre de l\'article',
      type: 'string',
      group: 'content',
      validation: (R) => R.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'URL de l\'article',
      type: 'slug',
      group: 'content',
      description: 'Générée automatiquement. Ne pas modifier après publication.',
      options: { source: 'title', maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Image principale',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Description de l\'image (pour le SEO)', type: 'string' },
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Résumé court',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Affiché sur les listes et utilisé comme meta description si pas de SEO personnalisé. 120-160 caractères.',
      validation: (R) => R.max(160),
    }),
    defineField({
      name: 'featured',
      title: '⭐ Article mis en avant (À la une)',
      type: 'boolean',
      group: 'content',
      initialValue: false,
      description: 'Si activé, cet article apparaît en tête de la page blog.',
    }),
    defineField({
      name: 'body',
      title: 'Contenu de l\'article',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Description', type: 'string' },
            { name: 'caption', title: 'Légende (optionnel)', type: 'string' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: '📷 Galerie photos',
      type: 'array',
      group: 'content',
      description: 'Photos complémentaires affichées en grille après le corps de l\'article.',
      of: [defineArrayMember({
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'alt', title: 'Description (SEO)', type: 'string' },
          { name: 'caption', title: 'Légende', type: 'string' },
        ],
      })],
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'reference',
      group: 'content',
      to: [{ type: 'author' }],
    }),

    // ─── Catégories & tags ────────────────────────────────
    defineField({
      name: 'categories',
      title: 'Catégories',
      type: 'array',
      group: 'meta',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'category' }] })],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'meta',
      description: 'Mots-clés pour le filtrage et l\'inter-linking',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),

    // ─── Conversion ───────────────────────────────────────
    defineField({
      name: 'relatedExperiences',
      title: '🔗 Expériences liées',
      type: 'array',
      group: 'conversion',
      description: 'Liens vers les séjours, dahabiya ou sur-mesure — affichés en fin d\'article.',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'experience' }] })],
    }),
    defineField({
      name: 'ctaInArticle',
      title: '💬 CTA WhatsApp dans l\'article',
      type: 'object',
      group: 'conversion',
      description: 'Bloc de conversion affiché dans l\'article (sidebar desktop / inline mobile).',
      fields: [
        {
          name: 'enabled',
          title: 'Activer le CTA ?',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'title',
          title: 'Titre du bloc',
          type: 'string',
          initialValue: 'Envie de voyager en Égypte ?',
        },
        {
          name: 'message',
          title: 'Texte',
          type: 'string',
          initialValue: 'Sophie répond à toutes vos questions.',
        },
        {
          name: 'whatsappMessage',
          title: 'Message WhatsApp pré-rempli',
          type: 'string',
          initialValue: 'Bonjour Sophie, j\'ai lu votre article et j\'aimerais en savoir plus 🌿',
        },
      ],
    }),
    defineField({
      name: 'showLeadMagnet',
      title: '📥 Afficher le bloc guide gratuit en fin d\'article ?',
      type: 'boolean',
      group: 'conversion',
      initialValue: true,
    }),

    // ─── SEO ──────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoObject',
      group: 'seo',
    }),
  ],

  orderings: [
    {
      title: 'Date de publication (récent en premier)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      date: 'publishedAt',
      media: 'mainImage',
    },
    prepare({ title, author, date, media }) {
      const dateStr = date ? new Date(date).toLocaleDateString('fr-FR') : 'Non publié'
      return { title, subtitle: `${author ?? 'Sans auteur'} — ${dateStr}`, media }
    },
  },
})
