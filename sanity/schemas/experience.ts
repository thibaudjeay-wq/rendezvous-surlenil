import { defineType, defineField, defineArrayMember } from 'sanity'
import { StarIcon } from '@sanity/icons'

const EXPERIENCE_TYPES = [
  { title: '⛵ Croisière Dahabiya', value: 'dahabiya' },
  { title: '✨ Séjour Signature', value: 'sejour-signature' },
  { title: '👑 Séjour Privilèges', value: 'sejour-privilege' },
  { title: '🗓️ Séjour Thématique / Daté', value: 'sejour-thematique' },
  { title: '🗺️ Voyage Sur Mesure', value: 'sur-mesure' },
  { title: '🌍 Excursion & Expérience locale', value: 'excursion' },
  { title: '🏡 Hébergement (La Thébaïde)', value: 'hebergement' },
]

export const experience = defineType({
  name: 'experience',
  title: '🌍 Expériences & Séjours',
  type: 'document',
  icon: StarIcon,
  groups: [
    { name: 'infos', title: '📝 Informations générales', default: true },
    { name: 'contenu', title: '📄 Contenu de la page' },
    { name: 'tarif', title: '💰 Tarif & Disponibilités' },
    { name: 'seo', title: '🔍 SEO' },
  ],
  fields: [
    // ─── Infos de base ────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      group: 'infos',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      group: 'infos',
      description: 'Générée automatiquement depuis le titre. Ne pas modifier après publication.',
      options: { source: 'title', maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type de voyage',
      type: 'string',
      group: 'infos',
      options: { list: EXPERIENCE_TYPES, layout: 'radio' },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Accroche courte',
      type: 'string',
      group: 'infos',
      description: 'Affichée sur les cartes et les listes. Maximum 80 caractères.',
      validation: (R) => R.max(80),
    }),
    defineField({
      name: 'mainImage',
      title: 'Photo principale',
      type: 'image',
      group: 'infos',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Description de l\'image (SEO)', type: 'string' },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Mettre en avant sur la homepage ?',
      type: 'boolean',
      group: 'infos',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      group: 'infos',
      description: 'Plus le chiffre est petit, plus l\'expérience apparaît en haut.',
      initialValue: 10,
    }),

    // ─── Contenu page ─────────────────────────────────────
    defineField({
      name: 'description',
      title: 'Description principale',
      type: 'array',
      group: 'contenu',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie photos',
      type: 'array',
      group: 'contenu',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Description', type: 'string' }],
        }),
      ],
    }),
    defineField({
      name: 'highlights',
      title: 'Points forts (affiché en icônes)',
      type: 'array',
      group: 'contenu',
      description: 'Ex : "7 nuits · 8 jours", "Bateau privatisé", "Guide francophone inclus"',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'icon', title: 'Icône (nom Lucide)', type: 'string', description: 'Ex : Ship, Star, Users, Map' },
            { name: 'label', title: 'Libellé', type: 'string' },
            { name: 'value', title: 'Valeur', type: 'string' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        }),
      ],
    }),
    defineField({
      name: 'program',
      title: 'Programme jour par jour',
      type: 'array',
      group: 'contenu',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'day', title: 'Jour', type: 'string', description: 'Ex : "Jour 1 — Louxor"' },
            { name: 'title', title: 'Titre de la journée', type: 'string' },
            {
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [defineArrayMember({ type: 'block' })],
            },
            { name: 'image', title: 'Photo (optionnel)', type: 'image', options: { hotspot: true } },
          ],
          preview: {
            select: { title: 'day', subtitle: 'title' },
          },
        }),
      ],
    }),
    defineField({
      name: 'included',
      title: '✅ Ce qui est inclus',
      type: 'array',
      group: 'contenu',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'notIncluded',
      title: '❌ Ce qui n\'est pas inclus',
      type: 'array',
      group: 'contenu',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'faq',
      title: 'Questions fréquentes',
      type: 'array',
      group: 'contenu',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Réponse', type: 'text', rows: 3 },
          ],
          preview: { select: { title: 'question' } },
        }),
      ],
    }),

    // ─── Tarif ────────────────────────────────────────────
    defineField({
      name: 'priceDisplay',
      title: 'Affichage du prix',
      type: 'string',
      group: 'tarif',
      options: {
        list: [
          { title: 'À partir de...', value: 'from' },
          { title: 'Sur demande', value: 'on-request' },
          { title: 'Privatisation sur devis', value: 'private-quote' },
          { title: 'Prix fixe', value: 'fixed' },
        ],
        layout: 'radio',
      },
      initialValue: 'from',
    }),
    defineField({
      name: 'priceAmount',
      title: 'Montant (€)',
      type: 'number',
      group: 'tarif',
      description: 'Laisser vide si "Sur demande" ou "Privatisation sur devis"',
      hidden: ({ document }) =>
        document?.priceDisplay === 'on-request' || document?.priceDisplay === 'private-quote',
    }),
    defineField({
      name: 'priceSuffix',
      title: 'Suffixe du prix',
      type: 'string',
      group: 'tarif',
      description: 'Ex : "/ personne", "/ couple", "/ nuit"',
      initialValue: '/ personne',
    }),
    defineField({
      name: 'duration',
      title: 'Durée',
      type: 'string',
      group: 'tarif',
      description: 'Ex : "7 nuits", "3 à 14 jours", "À la journée"',
    }),

    // ─── Séjours datés / thématiques ─────────────────────
    defineField({
      name: 'thematicDates',
      title: '🗓️ Dates disponibles (séjours thématiques)',
      type: 'array',
      group: 'tarif',
      description: 'Uniquement pour les séjours thématiques. Laisser vide sinon.',
      hidden: ({ document }) => document?.type !== 'sejour-thematique',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'label', title: 'Nom du séjour', type: 'string', description: 'Ex : "Noël sur le Nil 2025"' },
            { name: 'startDate', title: 'Date de début', type: 'date' },
            { name: 'endDate', title: 'Date de fin', type: 'date' },
            { name: 'priceAmount', title: 'Prix (€)', type: 'number' },
            { name: 'availableSpots', title: 'Places totales (optionnel)', type: 'number' },
            { name: 'spotsLeft', title: 'Places restantes (optionnel)', type: 'number' },
            {
              name: 'status',
              title: 'Statut',
              type: 'string',
              options: {
                list: [
                  { title: '🟢 Disponible', value: 'available' },
                  { title: '🟡 Quelques places', value: 'limited' },
                  { title: '🔴 Complet', value: 'full' },
                ],
                layout: 'radio',
              },
              initialValue: 'available',
            },
          ],
          preview: {
            select: { title: 'label', subtitle: 'startDate' },
          },
        }),
      ],
    }),

    // ─── CTA ──────────────────────────────────────────────
    defineField({
      name: 'ctaWhatsappMessage',
      title: 'Message WhatsApp pour cette expérience',
      type: 'text',
      group: 'contenu',
      rows: 2,
      description: 'Message pré-rempli quand on clique sur WhatsApp depuis cette page.',
    }),

    // ─── SEO ──────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoObject',
      group: 'seo',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      type: 'type',
      media: 'mainImage',
    },
    prepare({ title, type, media }) {
      const typeLabel = EXPERIENCE_TYPES.find((t) => t.value === type)?.title ?? type
      return { title, subtitle: typeLabel, media }
    },
  },
})
