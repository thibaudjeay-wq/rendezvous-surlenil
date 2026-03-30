import { cache } from 'react'
import { groq } from 'next-sanity'
import { sanityClient } from './client'

const FALLBACK_WHATSAPP = '33601315023'
const FALLBACK_GUIDE_URL = 'https://heyzine.com/flip-book/1ceed35b47.html'

const siteSettingsQuery = groq`*[_type == "siteSettings"][0] { whatsappNumber }`
const leadMagnetQuery = groq`*[_type == "leadMagnet"][0] { pdfUrl }`

export const getSiteSettings = cache(async (): Promise<{ whatsappNumber: string }> => {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return { whatsappNumber: FALLBACK_WHATSAPP }
  }
  try {
    const data = await sanityClient.fetch<{ whatsappNumber?: string }>(siteSettingsQuery)
    return { whatsappNumber: data?.whatsappNumber ?? FALLBACK_WHATSAPP }
  } catch {
    return { whatsappNumber: FALLBACK_WHATSAPP }
  }
})

export const getLeadMagnetPdfUrl = cache(async (): Promise<string> => {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return FALLBACK_GUIDE_URL
  try {
    const data = await sanityClient.fetch<{ pdfUrl?: string }>(leadMagnetQuery)
    return data?.pdfUrl ?? FALLBACK_GUIDE_URL
  } catch {
    return FALLBACK_GUIDE_URL
  }
})
