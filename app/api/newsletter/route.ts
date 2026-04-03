import { NextRequest, NextResponse } from 'next/server'

interface NewsletterPayload {
  email: string
  firstName?: string
}

export async function POST(req: NextRequest) {
  try {
    const body: NewsletterPayload = await req.json()
    const { email, firstName } = body

    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Une adresse email valide est requise.' }, { status: 400 })
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY
    const LIST_ID = process.env.BREVO_NEWSLETTER_LIST_ID ?? process.env.BREVO_LIST_ID

    if (!BREVO_API_KEY || !LIST_ID) {
      console.log('[Newsletter] Brevo non configuré — simulation succès', { email })
      return NextResponse.json({ success: true, simulated: true })
    }

    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': BREVO_API_KEY },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        attributes: {
          ...(firstName?.trim() ? { PRENOM: firstName.trim() } : {}),
          SOURCE: 'newsletter-footer',
        },
        listIds: [parseInt(LIST_ID, 10)],
        updateEnabled: true,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      // 400 avec "Contact already exist" = déjà inscrit, on retourne succès quand même
      if (res.status === 400 && err.includes('already exist')) {
        return NextResponse.json({ success: true, alreadySubscribed: true })
      }
      console.error('[Brevo] Erreur newsletter:', err)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Newsletter] Erreur:', err)
    return NextResponse.json({ error: 'Une erreur est survenue. Veuillez réessayer.' }, { status: 500 })
  }
}
