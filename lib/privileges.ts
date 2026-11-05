// ─── Séjours Privilèges — source unique (statique, prioritaire sur Sanity) ───
// Utilisé par /sejours/privileges et par les fiches /experiences/<slug>.

export type SessionStatus = 'available' | 'limited' | 'full' | 'upcoming'

export type PrivilegeSession = {
  label?: string
  startDate?: string // ISO yyyy-mm-dd
  endDate?: string
  status: SessionStatus
}

export type PrivilegeProgramme = {
  slug: string
  code: string
  title: string
  duration: string
  datesSummary: string
  image: string
  imageAlt: string
  highlights: Array<{ label: string; value: string }>
  sessions: PrivilegeSession[]
  sessionsNote?: string
  ctaLabel: string
  ctaMessage: string
  featured?: boolean
  /** true : la fiche /experiences/<slug> affiche ces highlights au lieu de ceux de Sanity */
  overrideDetailHighlights?: boolean
}

export const PRIVILEGE_STATUS_LABELS: Record<SessionStatus, { label: string; color: string; bg: string }> = {
  available: { label: 'Disponible', color: '#27AE60', bg: 'rgba(39,174,96,0.1)' },
  limited: { label: 'Quelques places', color: '#E67E22', bg: 'rgba(230,126,34,0.1)' },
  full: { label: 'Complet', color: '#C0392B', bg: 'rgba(192,57,43,0.1)' },
  upcoming: { label: 'À venir', color: '#8A9BAB', bg: 'rgba(138,155,171,0.12)' },
}

const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']

function parseIso(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return { y, m, d }
}

/** « 4 – 9 janvier 2027 », « 28 janvier – 2 février 2027 »… (sans décalage de fuseau) */
export function formatSessionDates(s: PrivilegeSession): string {
  if (!s.startDate) return ''
  const a = parseIso(s.startDate)
  if (!s.endDate || s.endDate === s.startDate) return `${a.d} ${MONTHS[a.m - 1]} ${a.y}`
  const b = parseIso(s.endDate)
  if (a.y !== b.y) return `${a.d} ${MONTHS[a.m - 1]} ${a.y} – ${b.d} ${MONTHS[b.m - 1]} ${b.y}`
  if (a.m !== b.m) return `${a.d} ${MONTHS[a.m - 1]} – ${b.d} ${MONTHS[b.m - 1]} ${b.y}`
  return `${a.d} – ${b.d} ${MONTHS[b.m - 1]} ${b.y}`
}

export const PRIVILEGES: PrivilegeProgramme[] = [
  {
    slug: 'croque-et-vogue',
    code: 'CROQUE & VOGUE',
    title: 'Aquarelle & croisière sur le Nil',
    duration: '12 jours / 11 nuits',
    datesSummary: '15 au 26 novembre 2026',
    image: '/photos/privileges/stage-aquarelle.jpg',
    imageAlt: 'Stage aquarelle en Égypte, séjour Croque & Vogue',
    highlights: [
      { label: 'Transport', value: 'Croisière en dahabiya' },
      { label: 'Ateliers', value: 'Ateliers aquarelle quotidiens avec Isabelle Corcket & Robbie' },
      { label: 'Sites', value: 'Temples peints depuis le bateau ou sur site' },
      { label: 'Escales', value: 'Assouan, Kom Ombo, Esna, Louxor' },
      { label: 'Accompagnement', value: 'Sophie présente sur toute la durée' },
      { label: 'Repas & hébergement', value: 'Repas à bord, hébergement en cabine privée' },
    ],
    sessions: [
      { label: 'CROQUE & VOGUE — Novembre 2026', startDate: '2026-11-15', endDate: '2026-11-26', status: 'full' },
    ],
    ctaLabel: 'Être prévenu(e) du prochain départ →',
    ctaMessage:
      'Bonjour Sophie, le séjour CROQUE & VOGUE de novembre 2026 est complet. Pouvez-vous me prévenir du prochain départ ? 🌿',
    featured: true,
  },
  {
    slug: 'deesse-du-nil',
    code: 'DÉESSE DU NIL',
    title: 'Louxor au féminin',
    duration: '6 jours / 5 nuits',
    datesSummary: 'Janvier – février 2027 · plusieurs départs',
    image: '/photos/voyageurs/trio-femmes-nil.jpg',
    imageAlt: 'Voyageuses sur le Nil à Louxor, séjour Déesse du Nil',
    highlights: [
      { label: 'Format', value: 'Séjour accompagné à Louxor' },
      { label: 'Groupe', value: 'Petit groupe de 2 à 4 participantes' },
      { label: 'Hébergement', value: 'Hébergement à La Thébaïde' },
      { label: 'Expérience', value: 'Montgolfière' },
      { label: 'Navigation', value: 'Felouque sur le Nil' },
      { label: 'Découverte', value: 'Temples et vie locale' },
      { label: 'Esprit', value: 'Ambiance conviviale' },
    ],
    sessions: [
      { startDate: '2027-01-04', endDate: '2027-01-09', status: 'available' },
      { startDate: '2027-01-11', endDate: '2027-01-16', status: 'available' },
      { startDate: '2027-01-18', endDate: '2027-01-23', status: 'available' },
      { startDate: '2027-01-25', endDate: '2027-01-30', status: 'available' },
      { startDate: '2027-02-08', endDate: '2027-02-13', status: 'available' },
      { startDate: '2027-02-15', endDate: '2027-02-20', status: 'available' },
    ],
    sessionsNote: 'Séjour confirmé à partir de 2 participantes.',
    overrideDetailHighlights: true,
    ctaLabel: 'Réserver ma place →',
    ctaMessage:
      'Bonjour Sophie, je suis intéressée par le séjour DÉESSE DU NIL — Louxor au féminin (6 jours / 5 nuits). Quelle date me conseillez-vous ? 🌿',
  },
  {
    slug: 'oasis-flow-siwa',
    code: 'OASIS FLOW SIWA',
    title: 'Yoga, oasis & sérénité',
    duration: '8 jours / 7 nuits',
    datesSummary: 'Dates à venir',
    image: '/photos/privileges/siwa-lac-turquoise.jpg',
    imageAlt: 'Oasis de Siwa au coucher du soleil, Égypte',
    highlights: [
      { label: 'Lieu', value: 'Siwa, oasis isolée à 750 km du Caire' },
      { label: 'Activité', value: 'Séances de yoga quotidiennes' },
      { label: 'Expériences', value: 'Baignades dans les lacs salés, dunes' },
      { label: 'Hébergement', value: 'Nuits en lodge traditionnel' },
      { label: 'Accompagnement', value: 'Sophie présente sur toute la durée' },
      { label: 'Repas & transferts', value: 'Transferts et repas inclus' },
    ],
    sessions: [{ label: 'Date à venir', status: 'upcoming' }],
    ctaLabel: 'Être prévenu(e) des dates →',
    ctaMessage:
      'Bonjour Sophie, je suis intéressé(e) par le séjour OASIS FLOW SIWA. Pouvez-vous me prévenir dès que les prochaines dates sont fixées ? 🌿',
  },
]

export function getPrivilegeBySlug(slug: string) {
  return PRIVILEGES.find((p) => p.slug === slug)
}
