'use client'

import { useState } from 'react'
import { CheckCircle, Loader2 } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

const INTEREST_OPTIONS = [
  { value: '', label: 'Votre projet de voyage (optionnel)' },
  { value: 'dahabiya', label: 'Croisière en dahabiya' },
  { value: 'sejour', label: 'Séjour signature ou privilèges' },
  { value: 'sur-mesure', label: 'Voyage sur mesure' },
  { value: 'excursion', label: 'Excursion ou expérience locale' },
  { value: 'decouverte', label: 'Simplement en découverte pour l\'instant' },
]

export default function GuideForm() {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [interest, setInterest] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent) {
      setErrorMsg('Veuillez cocher la case de consentement pour continuer.')
      return
    }
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email, interest, consent }),
      })
      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Une erreur est survenue.')
        setStatus('error')
        return
      }

      setStatus('success')
    } catch {
      setErrorMsg('Une erreur réseau est survenue. Réessayez.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-6">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: 'rgba(196, 144, 42, 0.1)' }}
        >
          <CheckCircle size={32} style={{ color: '#C4902A' }} />
        </div>
        <h3
          className="mb-2"
          style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.375rem', color: '#0F3D38', fontWeight: 400 }}
        >
          Merci {firstName}&nbsp;!
        </h3>
        <p className="text-sm leading-relaxed mb-6" style={{ color: '#5C6E7E' }}>
          Le guide arrive dans votre boîte mail dans quelques minutes.
        </p>

        <a
          href="https://heyzine.com/flip-book/1ceed35b47.html"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary inline-flex justify-center w-full mb-4"
        >
          Lire le guide maintenant →
        </a>

        <p className="text-xs" style={{ color: '#8A9BAB' }}>
          Vous ne trouvez pas l&apos;email ? Vérifiez vos spams.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-4">
        {/* Prénom */}
        <div>
          <label htmlFor="firstName" className="sr-only">Votre prénom</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Votre prénom *"
            required
            autoComplete="given-name"
            className="w-full px-4 py-3.5 text-sm outline-none transition-all duration-200 rounded-sm"
            style={{
              background: 'white',
              border: '1px solid #E8D5B7',
              color: '#0F3D38',
              fontFamily: 'Manrope',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#C4902A')}
            onBlur={(e) => (e.target.style.borderColor = '#E8D5B7')}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="sr-only">Votre email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email *"
            required
            autoComplete="email"
            className="w-full px-4 py-3.5 text-sm outline-none transition-all duration-200 rounded-sm"
            style={{
              background: 'white',
              border: '1px solid #E8D5B7',
              color: '#0F3D38',
              fontFamily: 'Manrope',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#C4902A')}
            onBlur={(e) => (e.target.style.borderColor = '#E8D5B7')}
          />
        </div>

        {/* Intérêt (optionnel) */}
        <div>
          <label htmlFor="interest" className="sr-only">Votre projet de voyage</label>
          <select
            id="interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="w-full px-4 py-3.5 text-sm outline-none transition-all duration-200 rounded-sm appearance-none"
            style={{
              background: 'white',
              border: '1px solid #E8D5B7',
              color: interest ? '#0F3D38' : '#8A9BAB',
              fontFamily: 'Manrope',
              cursor: 'pointer',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#C4902A')}
            onBlur={(e) => (e.target.style.borderColor = '#E8D5B7')}
          >
            {INTEREST_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === '' && interest !== ''}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Consentement RGPD */}
        <div className="flex items-start gap-3 mt-1">
          <input
            id="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="mt-0.5 flex-shrink-0 cursor-pointer"
            style={{ accentColor: '#C4902A', width: '16px', height: '16px' }}
          />
          <label htmlFor="consent" className="text-xs leading-relaxed cursor-pointer" style={{ color: '#5C6E7E' }}>
            J&apos;accepte de recevoir ce guide gratuit et d&apos;éventuelles communications de Rendez-vous sur le Nil.
            Mes données ne seront jamais partagées.{' '}
            <a href="/politique-confidentialite" className="underline hover:text-[#C4902A] transition-colors" style={{ color: '#C4902A' }}>
              Politique de confidentialité
            </a>{' '}
            *
          </label>
        </div>

        {/* Erreur */}
        {(status === 'error' || errorMsg) && (
          <p className="text-xs px-3 py-2 rounded-sm" style={{ color: '#C0392B', background: 'rgba(192,57,43,0.08)' }}>
            ⚠️ {errorMsg}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn btn-primary justify-center text-center w-full mt-2"
          style={{ opacity: status === 'loading' ? 0.7 : 1 }}
        >
          {status === 'loading' ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              Envoi en cours...
            </>
          ) : (
            'Recevoir mon guide gratuit'
          )}
        </button>

        <p className="text-center text-xs" style={{ color: '#8A9BAB' }}>
          🔒 Gratuit · Sans spam · Désabonnement en 1 clic
        </p>
      </div>
    </form>
  )
}
