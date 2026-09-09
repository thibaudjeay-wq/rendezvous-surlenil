/**
 * add-eclipse-experience.mjs — Crée le document Sanity « expérience » du séjour éclipse
 *
 * But : rendre le séjour "Éclipse du 2 août 2027" sélectionnable dans le menu
 * « 🔗 Expériences liées » des articles de blog. La page publique reste la landing
 * statique /eclipse-louxor-2027 (le front redirige /experiences/eclipse-louxor-2027 vers elle).
 *
 * Usage :
 *   SANITY_WRITE_TOKEN=xxx npm run add:eclipse
 *   (token Editor : sanity.io → projet → API → Tokens ; les autres vars viennent de .env.local)
 *
 * Idempotent : relançable sans créer de doublon (_id fixe).
 */

import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '..', '.env.local') })

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const TOKEN = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN

if (!PROJECT_ID) {
  console.error('❌  NEXT_PUBLIC_SANITY_PROJECT_ID manquant dans .env.local')
  process.exit(1)
}
if (!TOKEN) {
  console.error('❌  SANITY_WRITE_TOKEN manquant (token Editor sur sanity.io → API → Tokens)')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: TOKEN,
  useCdn: false,
})

const IMAGE = 'photos/eclipse/solar-eclipse-og.jpg'

async function main() {
  console.log(`\n🌘  Ajout du séjour éclipse → projet ${PROJECT_ID}\n`)

  let mainImage
  try {
    const filePath = join(__dirname, '..', 'public', IMAGE)
    const asset = await client.assets.upload('image', createReadStream(filePath), {
      filename: IMAGE.split('/').pop(),
    })
    mainImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: 'Éclipse solaire totale au-dessus des temples de Louxor',
    }
    console.log('  📷  image uploadée')
  } catch {
    console.warn('  ⚠️  image non uploadée — le doc sera créé sans photo')
  }

  await client.createOrReplace({
    _id: 'seed-experience-eclipse-louxor-2027',
    _type: 'experience',
    title: 'Éclipse solaire du 2 août 2027 à Louxor',
    slug: { _type: 'slug', current: 'eclipse-louxor-2027' },
    type: 'sejour-thematique',
    tagline: "L'éclipse du siècle depuis un rooftop privatif face au Nil — La Thébaïde privatisée, groupe déjà constitué.",
    ...(mainImage ? { mainImage } : {}),
    duration: '5 jours / 4 nuits',
    order: 1,
    featured: false,
    priceDisplay: 'private-quote',
    priceSuffix: '',
    ctaWhatsappMessage:
      "Bonjour Sophie, notre groupe est intéressé par le séjour privatif à La Thébaïde pour l'éclipse du 2 août 2027. Pouvez-vous nous dire si la date est encore disponible ? 🌒",
  })

  console.log('  ✓  experience  seed-experience-eclipse-louxor-2027')
  console.log('\n✅  Terminé — rechargez le Studio : le séjour apparaît dans « Expériences liées ».\n')
}

main().catch((err) => {
  console.error('\n❌  Erreur :', err.message)
  process.exit(1)
})
