'use client'

import { usePathname } from 'next/navigation'

/**
 * N'affiche son contenu que hors du Studio Sanity (/studio).
 * L'en-tête fixe du site recouvrait la barre du Studio et bloquait les clics
 * (notamment le bouton « + » de création d'article).
 */
export default function HorsStudio({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/studio')) return null
  return <>{children}</>
}
