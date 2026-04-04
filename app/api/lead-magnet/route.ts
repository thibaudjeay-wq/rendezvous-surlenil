import { NextRequest, NextResponse } from 'next/server'
import { getLeadMagnetPdfUrl } from '@/lib/sanity/settings'

interface LeadMagnetPayload {
  firstName: string
  email: string
  interest?: string
  consent: boolean
}

function buildGuideEmail(firstName: string, GUIDE_URL: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F2;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0F3D38 0%,#2A5A54 100%);padding:40px 48px 32px;text-align:center;border-radius:4px 4px 0 0;">
            <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.12em;color:#C4902A;text-transform:uppercase;">Rendez-vous sur le Nil</p>
            <h1 style="margin:0;font-family:Georgia,serif;font-size:28px;font-weight:400;color:#FAF7F2;line-height:1.3;">
              Votre guide Égypte<br><em style="color:#CE8D5C;font-style:italic;">est prêt, ${firstName}</em>
            </h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:40px 48px;border-left:1px solid #E8D5B7;border-right:1px solid #E8D5B7;">
            <p style="margin:0 0 20px;font-size:15px;color:#3D3D3D;line-height:1.7;">
              Bonjour ${firstName},
            </p>
            <p style="margin:0 0 20px;font-size:15px;color:#3D3D3D;line-height:1.7;">
              Merci de votre confiance. J'ai condensé dans ce guide tout ce que je dirai à une amie
              avant qu'elle parte en Égypte — les erreurs à ne pas commettre et des conseils d'experte.
            </p>
            <p style="margin:0 0 32px;font-size:15px;color:#3D3D3D;line-height:1.7;">
              Bonne lecture&nbsp;!
            </p>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <a href="${GUIDE_URL}" target="_blank"
                    style="display:inline-block;background:#C4902A;color:#ffffff;font-size:15px;font-weight:600;
                           text-decoration:none;padding:16px 40px;border-radius:2px;letter-spacing:0.03em;">
                    Lire le guide →
                  </a>
                </td>
              </tr>
            </table>

            <p style="margin:28px 0 0;font-size:13px;color:#8A9BAB;text-align:center;line-height:1.6;">
              Le lien ne fonctionne pas ? Copiez-collez cette adresse dans votre navigateur :<br>
              <span style="color:#C4902A;">${GUIDE_URL}</span>
            </p>
          </td>
        </tr>

        <!-- Signature -->
        <tr>
          <td style="background:#FDF8F0;padding:28px 48px 32px;border:1px solid #E8D5B7;border-top:none;border-radius:0 0 4px 4px;">
            <p style="margin:0 0 4px;font-size:14px;color:#0F3D38;font-family:Georgia,serif;font-style:italic;">Sophie Godineau</p>
            <p style="margin:0 0 16px;font-size:12px;color:#8A9BAB;">Co-fondatrice · Rendez-vous sur le Nil · Louxor, Égypte</p>
            <p style="margin:0;font-size:11px;color:#AABBC8;line-height:1.6;">
              Vous recevez cet email car vous avez demandé le guide sur rendezvous-surlenil.com.
              <br>Pour ne plus recevoir nos emails : <a href="{{unsubscribe}}" style="color:#AABBC8;">se désabonner</a>.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  try {
    const GUIDE_URL = await getLeadMagnetPdfUrl()
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
      console.log('[Lead Magnet] Brevo non configuré — simulation succès', { firstName, email })
      return NextResponse.json({ success: true, simulated: true })
    }

    const cleanEmail = email.toLowerCase().trim()
    const cleanFirstName = firstName.trim()

    // ─── Ajout dans Brevo (liste marketing) ───────────────
    const contactRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': BREVO_API_KEY },
      body: JSON.stringify({
        email: cleanEmail,
        attributes: {
          PRENOM: cleanFirstName,
          INTERET: body.interest ?? '',
          SOURCE: 'guide-egypte',
        },
        listIds: [parseInt(BREVO_LIST_ID, 10)],
        updateEnabled: true,
      }),
    })

    if (!contactRes.ok) {
      console.error('[Brevo] Erreur ajout contact:', await contactRes.text())
    }

    // ─── Envoi email transactionnel avec le guide ──────────
    const emailRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': BREVO_API_KEY },
      body: JSON.stringify({
        sender: { name: 'Sophie — Rendez-vous sur le Nil', email: 'sophie@rendezvous-surlenil.com' },
        to: [{ email: cleanEmail, name: cleanFirstName }],
        subject: `${cleanFirstName}, votre guide Égypte est prêt ✦`,
        htmlContent: buildGuideEmail(cleanFirstName, GUIDE_URL),
      }),
    })

    if (!emailRes.ok) {
      console.error('[Brevo] Erreur envoi email:', await emailRes.text())
      // On ne bloque pas l'utilisateur — l'inscription est enregistrée
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Lead Magnet] Erreur:', err)
    return NextResponse.json({ error: 'Une erreur est survenue. Veuillez réessayer.' }, { status: 500 })
  }
}
