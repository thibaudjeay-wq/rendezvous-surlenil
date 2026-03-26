import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: '⚙️ Réglages du site',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteName',
      title: 'Nom du site',
      type: 'string',
      initialValue: 'Rendez-vous sur le Nil',
    }),
    defineField({
      name: 'tagline',
      title: 'Slogan court',
      type: 'string',
      description: 'Aparaît dans le footer et les métadonnées',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Numéro WhatsApp',
      type: 'string',
      description: 'Format international sans + ni espaces. Ex : 33601315023',
      initialValue: '33601315023',
    }),
    defineField({
      name: 'whatsappDefaultMessage',
      title: 'Message WhatsApp par défaut',
      type: 'text',
      rows: 2,
      initialValue: 'Bonjour Sophie, je souhaite en savoir plus sur vos voyages en Égypte 🌿',
    }),
    defineField({
      name: 'email',
      title: 'Email de contact',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Réseaux sociaux',
      type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram (URL)', type: 'url' },
        { name: 'facebook', title: 'Facebook (URL)', type: 'url' },
        { name: 'pinterest', title: 'Pinterest (URL)', type: 'url' },
      ],
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Réglages du site' }),
  },
})
