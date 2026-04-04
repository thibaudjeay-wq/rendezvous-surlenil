// ─── WhatsApp ─────────────────────────────────────────────
export const WHATSAPP_NUMBER = '33601315023'
export const WHATSAPP_DEFAULT_MESSAGE = encodeURIComponent(
  "Bonjour Sophie, j'ai découvert Rendez-vous sur le Nil et je souhaite échanger avec vous sur un projet de voyage en Égypte. Pouvez-vous me dire quand vous êtes disponible pour un appel ?"
)

// CTA label canonique utilisé sur tout le site
export const WHATSAPP_CTA_LABEL = 'Parlons de votre voyage →'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_DEFAULT_MESSAGE}`

export function getWhatsAppUrl(message?: string) {
  const text = message ? encodeURIComponent(message) : WHATSAPP_DEFAULT_MESSAGE
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}

// ─── Site ─────────────────────────────────────────────────
export const SITE_URL = 'https://rendezvous-surlenil.com'
export const SITE_NAME = 'Rendez-vous sur le Nil'
export const CONTACT_EMAIL = 'sophie@rendezvous-surlenil.com'

// ─── Navigation ───────────────────────────────────────────
// Structure: Sophie | Expériences (dropdown) | La Thébaïde | Croisières | Blog
export const NAV_LINKS = [
  { label: 'Sophie', href: '/sophie' },
  { label: 'Expériences', href: '/experiences-egypte' }, // trigger dropdown
  { label: 'La Thébaïde', href: '/la-thebaide' },
  { label: 'Croisières', href: '/croisieres-dahabiya' },
  { label: 'Blog', href: '/blog' },
] as const

export const EXPERIENCES_SUBMENU = [
  { label: 'Séjours Signature', href: '/sejours/signature', description: 'Nos séjours curatés premium' },
  { label: 'Séjours Privilèges', href: '/sejours/privileges', description: "Séjours thématiques en petit groupe, animés par Sophie" },
  { label: 'Escapades Sérénité', href: '/sejours/escapades-serenite', description: 'Guide privé francophone · Chauffeur · Tarifs affichés' },
  { label: 'Travel Planner', href: '/sur-mesure', description: 'Votre Égypte sur mesure' },
] as const

// ─── Footer nav ───────────────────────────────────────────
export const FOOTER_LINKS = [
  {
    title: 'Nos voyages',
    links: [
      { label: 'Croisières Dahabiya', href: '/croisieres-dahabiya' },
      { label: 'Séjours Signature', href: '/sejours/signature' },
      { label: 'Séjours Privilèges', href: '/sejours/privileges' },
      { label: 'Escapades Sérénité', href: '/sejours/escapades-serenite' },
      { label: 'Travel Planner', href: '/sur-mesure' },
    ],
  },
  {
    title: 'Découvrir',
    links: [
      { label: 'La Thébaïde — Louxor', href: '/la-thebaide' },
      { label: 'Sophie & Nasser', href: '/sophie' },
      { label: 'Blog & Inspirations', href: '/blog' },
      { label: 'Guide Égypte gratuit', href: '/guide-egypte' },
    ],
  },
  {
    title: 'Parlons voyage',
    links: [
      { label: 'Nous écrire sur WhatsApp', href: WHATSAPP_URL },
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'Politique de confidentialité', href: '/politique-confidentialite' },
    ],
  },
] as const

// ─── Réassurance args ─────────────────────────────────────
export const REASSURANCE_ITEMS = [
  { icon: 'MapPin', text: 'Basée à Louxor toute l\'année' },
  { icon: 'Globe', text: '100% francophone' },
  { icon: 'Heart', text: 'Chaque voyage est unique' },
  { icon: 'Star', text: 'Dahabiya privatisée' },
] as const
