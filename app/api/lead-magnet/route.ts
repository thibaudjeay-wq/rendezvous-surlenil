import { NextRequest, NextResponse } from 'next/server'

interface LeadMagnetPayload {
  firstName: string
  email: string
  interest?: string
  consent: boolean
}

export async function POST(req: NextRequest) {
  try {
    const body: LeadMagnetPayload = await req.json()
    const { firstName, email, consent } = body

    // ─── Validation ───────────────────────────────────────
    if (!firstName?.trim()) {
      return NextResponse.json({ error: 'Le prénom est requis.' }, { status: 400 })
    }
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Une adresse email valide est requise.' }, { status: 400 })
    }
    if (!consent) {
      return NextResponse.json({ error: 'Le consentement est requis.' }, { status: 400 })
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY
    const BREVO_LIST_ID = process.env.BREVO_LIST_ID

    if (!BREVO_API_KEY || !BREVO_LIST_ID) {
      // En dev sans Brevo configuré — on simule le succès
      console.log('[Lead Magnet] Brevo non configuré — simulation succès', { firstName, email })
      return NextResponse.json({ success: true, simulated: true })
    }

    // ─── Ajout dans Brevo ─────────────────────────────────
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        attributes: {
          PRENOM: firstName.trim(),
          INTERET: body.interest ?? '',
          SOURCE: 'guide-egypte',
        },
        listIds: [parseInt(BREVO_LIST_ID, 10)],
        updateEnabled: true, // Met à jour si déjà existant
      }),
    })

    if (!brevoResponse.ok) {
      const error = await brevoResponse.text()
      console.error('[Brevo] Erreur:', error)
      // On ne bloque pas l'utilisateur si Brevo échoue
      // On log l'erreur côté serveur
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Lead Magnet] Erreur:', err)
    return NextResponse.json({ error: 'Une erreur est survenue. Veuillez réessayer.' }, { status: 500 })
  }
}
