'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/constants'

// ─── Types ────────────────────────────────────────────────
type Outcome = 'sig' | 'priv' | 'esc' | 'hybrid'

interface Answer {
  label: string
  scores: Partial<Record<Outcome, number>>
}

interface Question {
  id: number
  text: string
  answers: Answer[]
}

// ─── Questions ────────────────────────────────────────────
const questions: Question[] = [
  {
    id: 1,
    text: "Qu'est-ce qui vous attire le plus en Égypte ?",
    answers: [
      { label: 'Les temples, les pharaons, les tombeaux, comprendre, pas juste voir', scores: { sig: 2 } },
      { label: 'Le Nil, la lenteur de l\'eau, être entre deux rives', scores: { sig: 2 } },
      { label: 'Le désert, Siwa, les dunes, l\'Égypte hors des guides', scores: { esc: 2 } },
      { label: 'Partager quelque chose autour d\'une passion (yoga, art, écriture…)', scores: { priv: 2 } },
    ],
  },
  {
    id: 2,
    text: 'Comment imaginez-vous votre rythme de voyage ?',
    answers: [
      { label: 'Calme et approfondi, moins de sites, plus de sens', scores: { sig: 2 } },
      { label: 'Équilibré, un peu de tout, sans me presser', scores: { sig: 1, esc: 1 } },
      { label: 'Actif, voir beaucoup, me déplacer, explorer', scores: { esc: 2 } },
    ],
  },
  {
    id: 3,
    text: 'Comment envisagez-vous le budget ?',
    answers: [
      { label: 'Je veux être rassuré(e) sur le prix avant d\'aller plus loin', scores: { esc: 2 } },
      { label: 'Le budget est secondaire si l\'expérience est à la hauteur', scores: { sig: 1, priv: 1 } },
      { label: 'C\'est une occasion particulière, l\'investissement se justifie', scores: { priv: 2 } },
    ],
  },
  {
    id: 4,
    text: 'Avec qui partez-vous ?',
    answers: [
      { label: 'En couple, pour quelque chose de marquant', scores: { sig: 2 } },
      { label: 'En famille ou entre amis, un voyage qui nous ressemble à tous', scores: { sig: 1, esc: 1 } },
      { label: 'Seul(e), ouvert(e) à rejoindre un petit groupe', scores: { priv: 2 } },
      { label: 'Pour une occasion spéciale, anniversaire, célébration…', scores: { priv: 2 } },
    ],
  },
  {
    id: 5,
    text: 'Comment vous imaginez-vous le premier soir en Égypte ?',
    answers: [
      { label: 'Sur un rooftop, un verre à la main, le Nil en contrebas', scores: { sig: 2 } },
      { label: 'À bord d\'une dahabiya qui glisse vers le sud sur un fleuve silencieux', scores: { sig: 1, priv: 1 } },
      { label: 'Dans le désert blanc, face à un ciel sans lumière artificielle', scores: { esc: 2 } },
      { label: 'Autour d\'une table avec d\'autres voyageurs qui partagent ma passion', scores: { priv: 2 } },
    ],
  },
]

// ─── Results ──────────────────────────────────────────────
const results: Record<Outcome, {
  title: string
  text: string
  itinerary: string
  href: string
  ctaMessage: string
}> = {
  sig: {
    title: 'Votre voyage a déjà une forme.',
    text: 'Ce que vous décrivez, c\'est exactement ce pour quoi les Séjours Signature ont été construits. Un programme clé en main, La Thébaïde ou dahabiya privatisée, guide dédié, votre rythme. Sophie vous fait une proposition en 48h, sans engagement.',
    itinerary: 'CASBAH (8j/7n), Louxor en profondeur, montgolfière, Dendérah\nou YALLA (7j/6n), La Thébaïde + dahabiya Louxor–Assouan + Abou Simbel',
    href: '/sejours/signature',
    ctaMessage: 'Bonjour Sophie, j\'ai complété le quiz et il me suggère un Séjour Signature. Pouvez-vous me proposer quelque chose ? 🌿',
  },
  priv: {
    title: 'Il existe un voyage fait pour vous, et pour d\'autres qui vous ressemblent.',
    text: 'Vous cherchez une expérience thématique, en petit groupe, avec une ambiance. Les Séjours Privilèges sont trois programmes à dates fixes, yoga à Siwa, aquarelle sur le Nil, voyage féminin. Sophie est présente du début à la fin. Places limitées.',
    itinerary: 'CROQUE & VOGUE (15–26 nov. 2026), Dahabiya + ateliers aquarelle\nou DÉESSE DU NIL (27 jan.–3 fév. 2027), Voyage 100 % féminin à Louxor',
    href: '/sejours/privileges',
    ctaMessage: 'Bonjour Sophie, j\'ai complété le quiz et il me suggère un Séjour Privilèges. Pouvez-vous me dire quelles places sont encore disponibles ? 🌿',
  },
  esc: {
    title: 'L\'Égypte que vous voulez n\'a pas de cases préfabriquées. C\'est bien.',
    text: 'Vous composez votre propre voyage, ou cherchez à enrichir un séjour déjà planifié. Les Escapades Sérénité vous donnent un guide francophone privé et un chauffeur dédié, à la journée ou sur plusieurs jours. Tarifs affichés, aucune surprise.',
    itinerary: 'Siwa 3 jours (325 €/pers.), Oasis, sources chaudes, dunes\nou Désert occidental 2 jours (190 €/pers.), Désert blanc, bivouac, étoiles',
    href: '/sejours/escapades-serenite',
    ctaMessage: 'Bonjour Sophie, j\'ai complété le quiz et il me suggère une Escapade Sérénité. Pouvez-vous m\'en dire plus ? 🌿',
  },
  hybrid: {
    title: 'Votre voyage a plusieurs chapitres. C\'est souvent les plus beaux.',
    text: 'Vous n\'avez pas envie de choisir, et vous avez raison. Sophie construit régulièrement des voyages qui combinent un Séjour Signature à Louxor avec une Escapade dans le désert ou à Siwa. Elle peut tout intégrer dans un itinéraire global fluide.',
    itinerary: 'CASBAH (7 nuits Louxor) + Escapade Siwa 3 jours\nun voyage en deux actes, une seule organisation',
    href: '/sejours/signature',
    ctaMessage: 'Bonjour Sophie, j\'ai complété le quiz et il me suggère une combinaison Séjour Signature + Escapade. Pouvez-vous me construire quelque chose ? 🌿',
  },
}

// ─── Scoring ──────────────────────────────────────────────
function computeResult(answers: number[]): Outcome {
  const scores: Record<Outcome, number> = { sig: 0, priv: 0, esc: 0, hybrid: 0 }

  answers.forEach((answerIdx, questionIdx) => {
    const q = questions[questionIdx]
    if (!q) return
    const a = q.answers[answerIdx]
    if (!a) return
    Object.entries(a.scores).forEach(([key, val]) => {
      scores[key as Outcome] += val
    })
  })

  const { sig, priv, esc } = scores
  const top = Math.max(sig, priv, esc)

  // Hybrid: sig and esc are co-dominant (within 1 point, both high)
  if (top === sig && Math.abs(sig - esc) <= 1 && sig >= 3) return 'hybrid'
  if (top === sig) return 'sig'
  if (top === priv) return 'priv'
  if (top === esc) return 'esc'
  return 'sig'
}

// ─── WhatsApp SVG ─────────────────────────────────────────
function WaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

// ─── Main component ───────────────────────────────────────
export default function QuizModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(0) // 0 = intro, 1-5 = questions, 6 = result
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<Outcome | null>(null)
  const [visible, setVisible] = useState(false)

  // Floating button visible immediately
  useEffect(() => {
    setVisible(true)
  }, [])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  function openQuiz() {
    setStep(0)
    setAnswers([])
    setResult(null)
    setIsOpen(true)
  }

  function selectAnswer(answerIdx: number) {
    const newAnswers = [...answers, answerIdx]
    setAnswers(newAnswers)

    const nextStep = step + 1
    if (nextStep > questions.length) {
      setResult(computeResult(newAnswers))
      setStep(nextStep)
    } else {
      setStep(nextStep)
    }
  }

  function restart() {
    setStep(0)
    setAnswers([])
    setResult(null)
  }

  const currentQuestion = step >= 1 && step <= questions.length ? questions[step - 1] : null
  const progress = step === 0 ? 0 : Math.round((step / questions.length) * 100)
  const isResult = step > questions.length

  return (
    <>
      {/* ─── Floating trigger button, desktop ───────────── */}
      <div
        className={[
          'fixed z-40 transition-all duration-500',
          'hidden md:flex flex-col items-start',
          'bottom-6 left-6',
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
        ].join(' ')}
      >
        <button
          onClick={openQuiz}
          className="flex items-center gap-3 px-6 py-4 rounded-full"
          style={{
            background: '#0F3D38',
            borderLeft: '3px solid #C4902A',
            color: '#FAF7F2',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}
          aria-label="Ouvrir le quiz pour trouver votre voyage idéal"
        >
          <span className="text-xs flex-shrink-0" style={{ color: '#C4902A' }} aria-hidden="true">◆</span>
          <span className="text-sm font-medium whitespace-nowrap">Trouver mon voyage →</span>
        </button>
        <p className="mt-1.5 pl-1 text-[11px]" style={{ color: 'rgba(250,247,242,0.45)' }}>
          30 secondes, sans engagement
        </p>
      </div>

      {/* ─── Floating trigger button, mobile ────────────── */}
      <div
        className={[
          'fixed z-40 transition-all duration-500 md:hidden',
          'bottom-[5.5rem] right-4',
          'flex flex-col items-end',
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
        ].join(' ')}
      >
        <button
          onClick={openQuiz}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full"
          style={{
            background: '#0F3D38',
            borderLeft: '3px solid #C4902A',
            color: '#FAF7F2',
            boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
          }}
          aria-label="Trouver mon voyage idéal"
        >
          <span className="text-[10px] flex-shrink-0" style={{ color: '#C4902A' }} aria-hidden="true">◆</span>
          <span className="text-xs font-medium whitespace-nowrap">Trouver mon voyage →</span>
        </button>
        <p className="mt-1 pr-0.5 text-[10px]" style={{ color: 'rgba(13,33,55,0.45)' }}>
          30 sec, sans engagement
        </p>
      </div>

      {/* ─── Modal overlay ────────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Quiz : trouvez votre voyage idéal"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#0F3D38]/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            className="relative w-full md:w-[440px] md:h-full md:max-h-full overflow-y-auto flex flex-col"
            style={{
              background: '#FAF7F2',
              maxHeight: '92svh',
              borderRadius: '8px 8px 0 0',
              // desktop: right panel
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5 flex-shrink-0"
              style={{ borderBottom: '1px solid #E8D5B7' }}
            >
              <div>
                <p className="text-[10px] font-semibold tracking-[0.16em] uppercase" style={{ color: '#C4902A' }}>
                  Trouvez votre voyage idéal
                </p>
                {!isResult && step > 0 && (
                  <p className="text-xs mt-0.5" style={{ color: '#8A9BAB' }}>
                    Question {step} sur {questions.length}
                  </p>
                )}
                {isResult && (
                  <p className="text-xs mt-0.5" style={{ color: '#8A9BAB' }}>Votre résultat</p>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-[#F0E6D3]"
                aria-label="Fermer le quiz"
              >
                <X size={16} style={{ color: '#5C6E7E' }} />
              </button>
            </div>

            {/* Progress bar */}
            {step > 0 && !isResult && (
              <div className="flex-shrink-0" style={{ height: '2px', background: '#E8D5B7' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: '#C4902A',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 px-6 py-8">

              {/* ── Intro ── */}
              {step === 0 && (
                <div>
                  <h2
                    className="mb-4"
                    style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.75rem', color: '#0F3D38', fontWeight: 400, lineHeight: 1.2 }}
                  >
                    Quel voyage vous ressemble ?
                  </h2>
                  <p className="text-sm leading-relaxed mb-8" style={{ color: '#5C6E7E' }}>
                    5 questions. Pas de bonnes ou mauvaises réponses. Juste pour mieux vous orienter
                    vers la formule qui vous correspond, et pré-remplir un message à Sophie si vous le souhaitez.
                  </p>
                  <button
                    onClick={() => setStep(1)}
                    className="btn btn-primary w-full justify-center"
                  >
                    Commencer →
                  </button>
                  <p className="text-center text-xs mt-4" style={{ color: '#8A9BAB' }}>
                    2 minutes · Aucune inscription requise
                  </p>
                </div>
              )}

              {/* ── Question ── */}
              {currentQuestion && !isResult && (
                <div>
                  <h3
                    className="mb-6"
                    style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.375rem', color: '#0F3D38', fontWeight: 400, lineHeight: 1.25 }}
                  >
                    {currentQuestion.text}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {currentQuestion.answers.map((answer, idx) => (
                      <button
                        key={idx}
                        onClick={() => selectAnswer(idx)}
                        className="text-left px-5 py-4 rounded-sm text-sm leading-relaxed transition-all hover:border-[#C4902A] hover:bg-[#FDF5E8]"
                        style={{
                          background: 'white',
                          border: '1px solid #E8D5B7',
                          color: '#5C6E7E',
                        }}
                      >
                        {answer.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Result ── */}
              {isResult && result && (
                <div>
                  {/* Result header */}
                  <div
                    className="p-5 rounded-sm mb-6"
                    style={{ background: '#0F3D38', border: '1px solid rgba(201,169,110,0.25)' }}
                  >
                    <p className="text-[10px] font-semibold tracking-[0.14em] uppercase mb-2" style={{ color: '#C4902A' }}>
                      Notre suggestion
                    </p>
                    <h3
                      style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.375rem', color: '#FAF7F2', fontWeight: 400, lineHeight: 1.2 }}
                    >
                      {results[result].title}
                    </h3>
                  </div>

                  <p className="text-sm leading-relaxed mb-5" style={{ color: '#5C6E7E' }}>
                    {results[result].text}
                  </p>

                  {/* Itinerary preview */}
                  <div
                    className="p-4 rounded-sm mb-6"
                    style={{ background: '#FDF8F0', border: '1px solid #E8D5B7' }}
                  >
                    <p className="text-[10px] font-semibold tracking-wider uppercase mb-2" style={{ color: '#C4902A' }}>
                      Exemple d&apos;itinéraire
                    </p>
                    {results[result].itinerary.split('\n').map((line, i) => (
                      <p key={i} className="text-sm leading-relaxed" style={{ color: '#5C6E7E' }}>
                        {line}
                      </p>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col gap-3">
                    <a
                      href={getWhatsAppUrl(results[result].ctaMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp w-full justify-center"
                    >
                      <WaIcon />
                      Parler de mon voyage avec Sophie
                    </a>
                    <Link
                      href={results[result].href}
                      className="btn btn-secondary w-full justify-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Voir cette formule en détail →
                    </Link>
                  </div>
                  <p className="text-center text-xs mt-4" style={{ color: '#8A9BAB' }}>
                    Réponse de Sophie sous 24h, en français
                  </p>

                  {/* Retry */}
                  <button
                    onClick={restart}
                    className="w-full text-center text-xs mt-4 transition-colors hover:text-[#C4902A]"
                    style={{ color: '#8A9BAB' }}
                  >
                    ← Recommencer le quiz
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  )
}
