import { siteSettings } from './siteSettings'
import { experience } from './experience'
import { post } from './post'
import { category } from './category'
import { author } from './author'
import { testimonial } from './testimonial'
import { leadMagnet } from './leadMagnet'
import { seoObject } from './seoObject'

export const schemaTypes = [
  // Types réutilisables (objects)
  seoObject,
  // Singletons
  siteSettings,
  leadMagnet,
  // Collections
  experience,
  testimonial,
  // Blog
  post,
  category,
  author,
]
