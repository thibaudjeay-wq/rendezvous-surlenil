import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export default defineConfig({
  name: 'rendez-vous-sur-le-nil',
  title: 'Rendez-vous sur le Nil',
  projectId,
  dataset,
  basePath: '/studio',
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Mon site')
          .items([
            // ─── Réglages ────────────────────────────
            S.listItem()
              .title('⚙️ Réglages du site')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.listItem()
              .title('📥 Guide Égypte gratuit')
              .id('leadMagnet')
              .child(
                S.document()
                  .schemaType('leadMagnet')
                  .documentId('leadMagnet')
              ),
            S.divider(),

            // ─── Contenu voyages ──────────────────────
            S.listItem()
              .title('✈️ Mes voyages & séjours')
              .schemaType('experience')
              .child(S.documentTypeList('experience').title('Voyages & Séjours')),

            S.listItem()
              .title('⭐ Avis voyageurs')
              .schemaType('testimonial')
              .child(S.documentTypeList('testimonial').title('Avis voyageurs')),

            S.divider(),

            // ─── Blog ────────────────────────────────
            S.listItem()
              .title('📝 Mes articles')
              .schemaType('post')
              .child(S.documentTypeList('post').title('Articles')),

            S.listItem()
              .title('🏷️ Thèmes du blog')
              .schemaType('category')
              .child(S.documentTypeList('category').title('Thèmes')),
          ]),
    }),
  ],
})
