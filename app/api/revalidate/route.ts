import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

// Sanity webhook → on-demand ISR
// Configure in Sanity: POST https://rendezvous-surlenil.com/api/revalidate
// Header: Authorization: Bearer <SANITY_REVALIDATE_SECRET>
// Filter: all document types

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (secret) {
    const auth = req.headers.get('authorization')
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
  }

  try {
    const body = await req.json()
    const type: string = body?._type ?? ''

    if (type === 'post') {
      const slug: string = body?.slug?.current ?? ''
      revalidatePath('/blog')
      if (slug) revalidatePath(`/blog/${slug}`)
    } else if (type === 'category') {
      const slug: string = body?.slug?.current ?? ''
      revalidatePath('/blog')
      if (slug) revalidatePath(`/blog/categorie/${slug}`)
    } else if (type === 'experience') {
      const slug: string = body?.slug?.current ?? ''
      revalidatePath('/sejours/signature')
      revalidatePath('/sejours/privileges')
      revalidatePath('/croisieres-dahabiya')
      if (slug) revalidatePath(`/experiences/${slug}`)
    } else if (type === 'siteSettings' || type === 'leadMagnet') {
      revalidatePath('/', 'layout')
    } else if (type === 'testimonial') {
      revalidatePath('/')
    } else {
      // Revalidate tout en cas de type inconnu
      revalidatePath('/', 'layout')
    }

    return NextResponse.json({ revalidated: true, type })
  } catch (err) {
    console.error('[Revalidate] Erreur:', err)
    return NextResponse.json({ message: 'Erreur lors du traitement du webhook' }, { status: 500 })
  }
}
