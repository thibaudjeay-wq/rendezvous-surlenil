import { defineType, defineField, defineArrayMember } from 'sanity'
import { DownloadIcon } from '@sanity/icons'

export const leadMagnet = defineType({
  name: 'leadMagnet',
  title: '📥 Guide PDF gratuit',
  type: 'document',
  icon: DownloadIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titre du guide',
      type: 'string',
      initialValue: 'Le Guide Complet pour Voyager en Égypte',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'string',
      initialValue: 'Tout ce que vous devez savoir avant de partir',
    }),
    defineField({
      name: 'description',
      title: 'Description courte',
      type: 'text',
      rows: 3,
      description: 'Affiché sous le titre sur la landing page.',
      initialValue: 'Destinations incontournables, conseils terrain, les erreurs à éviter, les bonnes adresses... Sophie partage tout.',
    }),
    defineField({
      name: 'mockupImage',
      title: 'Visuel du guide (mockup PDF)',
      type: 'image',
      options: { hotspot: true },
      description: 'Image du guide mise en scène, affiché à droite du formulaire.',
    }),
    defineField({
      name: 'benefits',
      title: '✅ Ce que contient le guide',
      type: 'array',
      description: 'Liste des bénéfices / contenus du guide. Affichés avec une coche.',
      of: [defineArrayMember({ type: 'string' })],
      initialValue: [
        'Les 10 incontournables en Égypte',
        'Quand partir et quelle région choisir',
        'Croisière dahabiya vs circuit classique',
        'Budget réaliste et conseils pratiques',
        'Les bonnes adresses de Sophie sur place',
      ],
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Texte du bouton',
      type: 'string',
      initialValue: 'Recevoir mon guide gratuit',
    }),
    defineField({
      name: 'pdfFile',
      title: 'Fichier PDF',
      type: 'file',
      description: 'Le fichier PDF à télécharger. Uploadez-le ici.',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'pdfUrl',
      title: 'Ou lien direct vers le PDF (alternatif)',
      type: 'url',
      description: 'Si le PDF est hébergé ailleurs (Google Drive, etc.)',
    }),
    defineField({
      name: 'thankYouMessage',
      title: 'Message après inscription',
      type: 'string',
      initialValue: 'Merci ! Votre guide arrive par email dans quelques minutes.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Guide PDF gratuit' }),
  },
})
