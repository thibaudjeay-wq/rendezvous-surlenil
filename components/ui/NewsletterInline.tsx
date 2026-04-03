'use client'

import { useState } from 'react'

interface Props {
  variant?: 'dark' | 'light'
}

export default function NewsletterInline({ variant = 'dark' }: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const isDark = variant === 'dark'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
      } else {
        setErrorMsg(data.error ?? 'Une erreur est survenue.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Une erreur est survenue. Veuillez réessayer.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p
        className="text-sm italic"
        style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          color: isDark ? '#CE8D5C' : '#1E6860',
          fontSize: '1rem',
        }}
      >
        ✦ Merci, vous êtes inscrit(e).
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          required
          disabled={status === 'loading'}
          className="flex-1 text-sm px-3 py-2 rounded-sm outline-none"
          style={{
            background: isDark ? 'rgba(255,255,255,0.07)' : 'white',
            border: `1px solid ${isDark ? '#1E6860' : '#E8D5B7'}`,
            color: isDark ? '#FAF7F2' : '#0F3D38',
          }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="text-xs font-semibold px-4 py-2 rounded-sm transition-opacity"
          style={{
            background: '#C4902A',
            color: 'white',
            opacity: status === 'loading' ? 0.6 : 1,
            whiteSpace: 'nowrap',
          }}
        >
          {status === 'loading' ? '…' : 'S\'inscrire'}
        </button>
      </div>
      {status === 'error' && (
        <p className="mt-1.5 text-xs" style={{ color: '#CE8D5C' }}>{errorMsg}</p>
      )}
    </form>
  )
}
