import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { ArrowLeft, Clock, CalendarDays, BookOpen } from 'lucide-react'
import { sanityClient } from '@/lib/sanity/client'
import { postBySlugQuery, postsQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { getWhatsAppUrl } from '@/lib/constants'

export const revalidate = 3600

// ─── Types ────────────────────────────────────────────────
type SanityBlock = { _type: string; style?: string; children?: Array<{ _key?: string; _type?: string; marks?: string[]; text: string }> }
type SanityImageBlock = { _type: 'image'; asset: { _id: string; url: string; metadata: { lqip: string; dimensions: { width: number; height: number } } }; alt?: string; caption?: string }
type SanityBodyBlock = SanityBlock | SanityImageBlock

type SanityGalleryImage = {
  asset: { _id: string; url: string; metadata: { lqip: string; dimensions: { width: number; height: number } } }
  alt?: string
  caption?: string
  hotspot?: object
  crop?: object
}

type Post = {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt?: string
  _updatedAt?: string
  mainImage?: { asset: { _id: string; url: string; metadata: { lqip: string } }; alt?: string; hotspot?: object; crop?: object }
  body?: SanityBodyBlock[]
  gallery?: SanityGalleryImage[]
  categories?: Array<{ title: string; slug: { current: string } }>
  tags?: string[]
  author?: { name: string; role?: string; bio?: string; photo?: { asset: { url: string } } }
  relatedExperiences?: Array<{
    _id: string; title: string; tagline?: string; type: string
    slug: { current: string }
    mainImage?: { asset: { url: string }; alt?: string }
    priceDisplay?: string; priceAmount?: number; priceSuffix?: string
  }>
  ctaInArticle?: { enabled: boolean; title: string; message: string; whatsappMessage: string }
  showLeadMagnet?: boolean
  seo?: { metaTitle?: string; metaDescription?: string }
}

// ─── Helpers ──────────────────────────────────────────────
function countWords(body?: SanityBodyBlock[]): number {
  if (!body) return 0
  return body.reduce((count, block) => {
    if (block._type === 'block' && 'children' in block) {
      return count + (block.children ?? []).reduce((c, child) => c + child.text.split(/\s+/).length, 0)
    }
    return count
  }, 0)
}

function readTime(body?: SanityBodyBlock[]): string {
  const words = countWords(body)
  return `${Math.max(3, Math.round(words / 200))} min`
}

function formatDate(iso?: string): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function experienceHref(type: string, slug: string): string {
  const map: Record<string, string> = {
    dahabiya: '/croisieres-dahabiya',
    'sejour-signature': '/sejours/signature',
    'sejour-privilege': '/sejours/privileges',
    'sejour-thematique': '/sejours/escapades-serenite',
    'sur-mesure': '/sur-mesure',
    hebergement: '/la-thebaide',
  }
  return map[type] ?? `/sejours/${slug}`
}

// ─── Static fallback articles ─────────────────────────────
// Used when NEXT_PUBLIC_SANITY_PROJECT_ID is not set.
// Blocks follow the Sanity PortableText format so ptComponents renders them identically.

function block(key: string, style: string, text: string): SanityBodyBlock {
  return {
    _type: 'block',
    style,
    children: [{ _key: `${key}s`, _type: 'span', marks: [], text }],
  }
}

const STATIC_ARTICLES: Record<string, Post> = {
  'quand-partir-en-egypte': {
    _id: 'static-1',
    title: 'Quand partir en Égypte ? Le guide complet mois par mois',
    slug: { current: 'quand-partir-en-egypte' },
    excerpt: "L'Égypte se visite toute l'année, mais tous les mois ne se ressemblent pas. Températures, affluence, fêtes locales, Nil en crue : voici le calendrier honnête pour choisir votre moment.",
    publishedAt: '2024-11-10',
    categories: [{ title: 'Conseils pratiques', slug: { current: 'conseils-pratiques' } }],
    tags: ['saison', 'météo', 'planification', 'Louxor'],
    body: [
      block('p1', 'normal', "La question revient dans chaque conversation : « Quelle est la meilleure saison pour aller en Égypte ? » La réponse honnête, c'est qu'il n'y en a pas une, il y en a plusieurs, selon ce que vous cherchez. Un voyageur qui veut explorer les temples sous un ciel vide choisira mars. Un autre qui veut sentir le pays dans sa vérité choisira septembre, après le Ramadan, quand la vie reprend."),
      block('h2a', 'h2', "Octobre – mars : la haute saison douce"),
      block('p2', 'normal', "Ces mois sont les plus demandés, et pour cause : les températures sont idéales. À Louxor, les journées oscillent entre 22 et 28°C, les nuits sont fraîches (10-14°C). Sur le Nil, la lumière du matin est d'une douceur rare. C'est la fenêtre parfaite pour une croisière en dahabiya, ni la chaleur étouffante de l'été, ni le vent de khamsine du printemps."),
      block('p3', 'normal', "Décembre-janvier concentre le plus fort afflux touristique. Les grands sites, Karnak, la Vallée des Rois, peuvent être denses en milieu de journée. Notre conseil : lever tôt, visiter à l'ouverture, laisser les groupes passer, reprendre en fin d'après-midi quand la lumière devient dorée."),
      block('q1', 'blockquote', "À Louxor en novembre, nous étions parfois seuls face aux colosses de Memnon au lever du soleil. Ce genre de moment ne s'oublie pas."),
      block('h2b', 'h2', "Avril – mai : le printemps contrasté"),
      block('p4', 'normal', "Avril est un mois-charnière. Les températures montent (35-40°C à Louxor en mai), et le vent de khamsine peut souffler ponctuellement, un vent de sable chaud venu du désert, qui rend les visites inconfortables pendant quelques heures. Ce n'est pas rédhibitoire, mais prévoyez de la flexibilité dans votre programme."),
      block('p5', 'normal', "En contrepartie, l'affluence touristique baisse nettement. Les prix s'assouplissent, les guides sont moins sollicités, et vous aurez les temples presque pour vous. Pour un voyageur expérimenté qui ne craint pas la chaleur, avril peut être une belle surprise."),
      block('h2c', 'h2', "Juin – août : l'Égypte profonde, pour initiés"),
      block('p6', 'normal', "L'été est la saison que les agences déconseillent automatiquement. Pas tout à fait à tort : 40-45°C à Louxor en juillet, c'est une réalité. Mais l'Égypte d'été est aussi celle qui se dévoile le plus authentiquement. Les bazars sont pour les Égyptiens. Les hôtels sont vides. Les soirées sur la terrasse, face au Nil, ont un goût unique."),
      block('p7', 'normal', "Nous déconseillons l'été pour un premier voyage ou pour des visiteurs qui souhaitent explorer beaucoup de sites. Mais pour quelqu'un qui veut séjourner à La Thébaïde, lire, se poser, observer, juillet peut être magique."),
      block('h2d', 'h2', "Septembre – octobre : la renaissance"),
      block('p8', 'normal', "Septembre est notre mois préféré pour les voyageurs qui nous font confiance. La chaleur commence à refluer. Le Ramadan est derrière. La rentrée touristique n'a pas encore eu lieu. L'Égypte est dans un entre-deux rare : détendue, accessible, lumineuse. Les températures passent sous les 37°C en fin de mois. La Vallée des Rois retrouve un peu de silence."),
      block('h2e', 'h2', "Le Ramadan : faut-il éviter ?"),
      block('p9', 'normal', "La date du Ramadan se décale chaque année (calendrier lunaire). Pendant ce mois, les horaires des restaurants et commerces changent, certains sites ont des horaires réduits, et l'atmosphère du pays se transforme profondément. Ce n'est pas une contrainte, c'est une expérience en soi. Mais il faut le savoir pour anticiper."),
      block('p10', 'normal', "Si vous voyagez pendant le Ramadan, prévoyez vos pique-niques pour le déjeuner, et rejoignez une famille pour l'Iftar, le repas du soir après le coucher du soleil. C'est l'un des moments les plus chaleureux de toute la culture égyptienne."),
      block('h2f', 'h2', "Notre recommandation finale"),
      block('p11', 'normal', "Si vous n'avez qu'une fenêtre à choisir : octobre ou mars. Température idéale, lumière exceptionnelle, affluence raisonnable. Pour un premier voyage, c'est la combinaison gagnante. Pour un deuxième voyage, laissez-vous guider par vos envies, chaque saison a sa propre vérité."),
    ],
  },

  'dormir-desert-blanc-egypte': {
    _id: 'static-2',
    title: "Dormir dans le désert blanc en Égypte : une expérience hors du temps",
    slug: { current: 'dormir-desert-blanc-egypte' },
    excerpt: "À 45 kilomètres de Farafra, le désert blanc est l'un des paysages les plus irréels d'Afrique. Des formations calcaires sculptées par le vent, une nuit sous les étoiles, un silence total : voici comment préparer cette expérience.",
    publishedAt: '2024-12-03',
    categories: [{ title: 'Expériences', slug: { current: 'experiences' } }],
    tags: ['désert', 'Farafra', 'nuit étoiles', 'bivouac', 'désert blanc'],
    body: [
      block('p1', 'normal', "Il y a des paysages qui déjouent toute attente. Le désert blanc, à 45 km au nord de Farafra dans le Sahara occidental, en fait partie. Ce n'est pas le désert de sable que l'on imagine en Égypte, c'est un plateau de formations calcaires érodées par le vent, blanches comme de la craie, qui surgissent du sol sous des formes impossibles : champignons géants, personnages figés, animaux fantastiques."),
      block('q1', 'blockquote', "La première fois que j'ai vu le désert blanc au coucher du soleil, j'ai pensé à une autre planète. La lumière rasante transformait tout en or sur fond de blanc pur."),
      block('h2a', 'h2', "Comment y accéder"),
      block('p2', 'normal', "Le désert blanc ne se rejoint pas seul, du moins pas raisonnablement. La piste depuis Farafra est balisée, mais les conditions changent, et se perdre dans le Sahara reste une réalité. L'approche classique : louer un 4×4 avec chauffeur-guide à Farafra, ou organiser le circuit depuis Bahareya, l'oasis la plus proche du Caire (à 370 km, soit environ 4h30 de route)."),
      block('p3', 'normal', "Depuis Louxor, la logistique est plus complexe mais faisable : vol intérieur ou train vers le Caire, puis route jusqu'à Bahareya. Une nuit dans le désert blanc s'intègre idéalement dans un circuit de 3 à 4 jours dans les oasis du désert occidental (Bahareya, Farafra, Dakhla), avant de rejoindre Louxor ou Assouan par route ou avion."),
      block('h2b', 'h2', "Le bivouac : ce qui vous attend"),
      block('p4', 'normal', "Le camp se monte en milieu d'après-midi, après les visites de la journée. Votre guide installe un tapis, des coussins, un réchaud. Le dîner, poulet grillé, riz, légumes, thé au cumin, se prépare sur le feu. Vous mangez face aux formations calcaires qui changent de couleur avec la lumière déclinante."),
      block('p5', 'normal', "La nuit est la vraie révélation. Sans pollution lumineuse à des centaines de kilomètres, le ciel du Sahara est d'une densité d'étoiles qui coupe le souffle. Voie lactée visible à l'œil nu, silence absolu (aucun insecte, aucun vent en hiver), températures fraîches : prévoyez un sac de couchage même en octobre."),
      block('h2c', 'h2', "Quelle saison choisir"),
      block('p6', 'normal', "Octobre à mars est la fenêtre idéale. Les journées sont agréables (25-30°C), les nuits fraîches (5-12°C). En été, les températures diurnes dépassent 45°C, une expérience difficile à vivre, même pour les amateurs de chaleur. Évitez aussi les périodes de khamsine (mars-avril) : le vent de sable peut rendre toute activité extérieure inconfortable."),
      block('h2d', 'h2', "Ce qu'il faut emporter"),
      block('p7', 'normal', "La liste est courte mais précise : sac de couchage ou couverture chaude (indispensable même en novembre), lampe frontale, protection solaire haute indice, chapeau à large bord, foulard ou keffieh (contre le sable et le soleil), chaussures fermées pour la marche sur les formations calcaires. Prévoyez une charge de téléphone complète, la recharge sur le camp est aléatoire."),
      block('h2e', 'h2', "Intégrer le désert blanc à votre voyage"),
      block('p8', 'normal', "Le désert blanc seul mérite le déplacement, mais il prend toute sa profondeur dans un circuit qui combine Nil et désert. Quelques jours de croisière en dahabiya sur le Nil entre Louxor et Assouan, puis une extension vers les oasis, c'est le voyage que peu d'agences proposent et que nous avons construit pour plusieurs de nos voyageurs."),
      block('p9', 'normal', "Si vous nous écrivez, précisez votre niveau d'autonomie, votre tolérance à l'inconfort, et le nombre de nuits que vous souhaitez passer hors des hôtels classiques. Nous construisons l'itinéraire autour de ces données."),
    ],
  },

  'voyage-sur-mesure-egypte': {
    _id: 'static-3',
    title: "Voyage sur mesure en Égypte : ce que les agences ne vous disent pas",
    slug: { current: 'voyage-sur-mesure-egypte' },
    excerpt: "Le « sur mesure » est devenu un argument marketing galvaudé. Dans cet article, Sophie explique ce que signifie vraiment construire un voyage en Égypte personnalisé, et ce que les agences généralistes ne peuvent pas vous offrir.",
    publishedAt: '2025-01-15',
    categories: [{ title: 'Voyage sur mesure', slug: { current: 'sur-mesure' } }],
    tags: ['sur mesure', 'agence', 'travel planner', 'conseils'],
    body: [
      block('p1', 'normal', "Toutes les agences de voyages affirment faire du « sur mesure ». Certaines y arrivent. La plupart assemblent des briques préfabriquées, hôtels contractualisés, guides sous-traités, circuits standardisés, en les réarrangeant différemment selon le client. C'est une prestation valable. Ce n'est pas du sur mesure."),
      block('p2', 'normal', "Le vrai sur mesure commence par une question que la plupart des agences ne posent jamais : qu'est-ce que vous ne voulez pas faire ? Pas les monuments que vous voulez voir. Pas le budget. Ce que vous refusez catégoriquement de vivre."),
      block('q1', 'blockquote', "Une de mes clientes m'a dit : « Je ne veux jamais manger dans un restaurant avec un menu en français et un drapeau français à l'entrée. » Cette phrase m'a appris plus sur elle que n'importe quel questionnaire de voyage."),
      block('h2a', 'h2', "Ce que « sur mesure » veut réellement dire"),
      block('p3', 'normal', "Le sur mesure n'est pas un service, c'est une relation. Cela commence par une conversation où vous parlez de vos voyages précédents, de ce qui vous a déçu, de ce qui vous a touché. Pas de formulaire. Pas de catégories prédéfinies. Une vraie écoute."),
      block('p4', 'normal', "À partir de là, le voyage se construit comme un récit plutôt que comme un programme. Pas « Jour 1 : arrivée au Caire, visite des pyramides, hôtel 4 étoiles ». Plutôt : « Vous arrivez de nuit, Nasser vous attend, vous montez directement sur la terrasse de la maison pour votre première nuit sous les étoiles de la rive ouest. Le lendemain matin, café sur la terrasse, les champs de canne à sucre en face, la montagne thébaine derrière. »"),
      block('h2b', 'h2', "Pourquoi les agences généralistes ne peuvent pas faire ça"),
      block('p5', 'normal', "Ce n'est pas une critique des agences généralistes, c'est une question de modèle économique. Pour qu'une agence soit rentable à grande échelle, elle a besoin de volume. Le volume nécessite de la standardisation. La standardisation est l'opposé du sur mesure."),
      block('p6', 'normal', "Un tour-opérateur qui vend 5 000 voyages en Égypte par an ne peut pas connaître personnellement les guides qui accueilleront vos clients. Il ne peut pas choisir votre chambre en fonction de votre sensibilité au bruit. Il ne peut pas vous prévenir que ce site est en travaux ce mois-ci et vous rediriger vers une alternative moins connue mais plus belle."),
      block('p7', 'normal', "Nous, si. Parce que nous avons choisi de rester petits. Nous accueillons un nombre limité de voyageurs chaque année, justement pour ne jamais être dans cette situation."),
      block('h2c', 'h2', "Les questions à poser avant de réserver"),
      block('p8', 'normal', "Quand vous contactez un prestataire qui dit faire du sur mesure, posez ces questions directement : Qui construit mon programme, une personne qui connaît l'Égypte en profondeur ou un commercial ? Vos guides sont-ils des indépendants avec qui vous avez une relation longue, ou des sous-traitants d'une agence locale ? Si quelque chose ne se passe pas comme prévu sur place, qui je contacte, et qui a réellement le pouvoir de changer quelque chose ?"),
      block('p9', 'normal', "Les réponses à ces trois questions vous diront tout ce que vous avez besoin de savoir."),
      block('h2d', 'h2', "Ce que nous faisons concrètement"),
      block('p10', 'normal', "Notre processus commence par un échange WhatsApp ou téléphonique d'environ 30 minutes. Pas de formulaire. Vous expliquez votre projet, vos contraintes, vos envies. Nous posons des questions qui peuvent vous surprendre. Nous vous disons honnêtement si notre offre est adaptée à votre voyage, et si elle ne l'est pas, nous vous disons pourquoi et vers qui vous tourner."),
      block('p11', 'normal', "Si le courant passe, nous construisons une proposition narrative, pas un tableau Excel de prestations. Vous lisez un récit de votre voyage avant même de l'avoir vécu. Vous ajustez. Nous affinons. La réservation vient en dernier."),
      block('p12', 'normal', "Ce processus prend plus de temps. Il coûte plus cher. Il donne un voyage incomparable, c'est le pari que nous faisons, et que nos voyageurs confirment à leur retour."),
    ],
  },

  'qu-est-ce-qu-une-dahabiya': {
    _id: 'static-4',
    title: "Qu'est-ce qu'une dahabiya ? Tout ce qu'il faut savoir",
    slug: { current: 'qu-est-ce-qu-une-dahabiya' },
    excerpt: "Le voilier traditionnel égyptien qui a séduit Agatha Christie et les grands explorateurs du XIXe siècle. Aujourd'hui rénové, il offre l'expérience la plus intime du Nil.",
    publishedAt: '2024-10-20',
    categories: [{ title: 'Croisières', slug: { current: 'croisieres' } }],
    tags: ['dahabiya', 'Nil', 'croisière', 'Louxor'],
    body: [
      block('p1', 'normal', "La dahabiya est un voilier traditionnel à fond plat, utilisé sur le Nil depuis le XIXe siècle. Son nom vient de l'arabe « dahab », l'or. Les grandes dahabiyas de l'époque victorienne étaient peintes en dorures et transportaient les voyageurs fortunés qui remontaient le fleuve vers Louxor et Assouan. Agatha Christie en faisait partie. Flaubert aussi. Et quelques archéologues qui préféraient la navigation douce aux caravanes."),
      block('h2a', 'h2', "Dahabiya et croisière classique : quelle différence ?"),
      block('p2', 'normal', "La différence tient en un mot : la privatisation. Sur un bateau de croisière classique, vous partagez le pont, la salle à manger, le guide et les escales avec 80 à 200 autres voyageurs. Sur une dahabiya, le bateau n'appartient qu'à vous. Votre groupe, et personne d'autre."),
      block('p3', 'normal', "La dahabiya navigue aussi différemment. Elle peut s'arrêter n'importe où, sur une berge, face à un temple oublié, dans un village de pêcheurs que les grands bateaux ne voient jamais. Elle va à votre rythme, pas à celui d'un programme imprimé."),
      block('q1', 'blockquote', "Sur une dahabiya, on n'est pas dans un hôtel qui flotte. On est sur le Nil, vraiment. La différence se sent dès la première nuit."),
      block('h2b', 'h2', "Combien de personnes à bord ?"),
      block('p4', 'normal', "Les dahabiyas modernes accueillent en général entre 2 et 8 voyageurs, selon le modèle. Les cabines sont climatisées, avec salle de bain privée. Un salon panoramique, une cuisine équipée, un pont terrasse pour les nuits étoilées. Le tout géré par un équipage de 4 à 6 personnes, capitaine, matelots, cuisinier."),
      block('h2c', 'h2', "Que comprend une croisière en dahabiya ?"),
      block('p5', 'normal', "Nuitées à bord, pension complète (repas préparés par le cuisinier de bord), équipage local, guide francophone sur les sites, droits d'entrée des temples, transferts depuis votre hôtel ou l'aéroport. L'organisation logistique est entièrement prise en charge, vous n'avez rien à prévoir sur place."),
      block('h2d', 'h2', "Quel itinéraire sur une dahabiya ?"),
      block('p6', 'normal', "L'itinéraire classique relie Louxor à Assouan, en 4 à 7 nuits. Les escales varient selon les formules : Esna (temple souvent ignoré des circuits), Edfou (temple d'Horus, le mieux conservé d'Égypte), Kom Ombo (double temple face au Nil), et bien sûr Assouan et ses îles. Chaque itinéraire est adaptable selon votre rythme et vos envies."),
      block('p7', 'normal', "Si vous avez des questions sur la formule qui vous correspond le mieux, durée, budget, période, Sophie répond à toutes les questions. Pas de formulaire. Un message suffit."),
    ],
  },

  'louxor-5-temples-meconnus': {
    _id: 'static-5',
    title: 'Louxor : 5 temples méconnus que les circuits ne montrent jamais',
    slug: { current: 'louxor-5-temples-meconnus' },
    excerpt: "Medinet Habou, Deir el-Medina, la chapelle rouge de Hatshepsout, Louxor cache des merveilles que 90% des touristes ne voient jamais.",
    publishedAt: '2024-09-15',
    categories: [{ title: 'Louxor', slug: { current: 'louxor' } }],
    tags: ['Louxor', 'temples', 'rive ouest', 'Égypte ancienne'],
    body: [
      block('p1', 'normal', "Louxor est souvent présentée comme la plus grande ville archéologique du monde, et ce n'est pas une exagération. Dans un périmètre de 30 kilomètres, on trouve plus de temples, tombeaux et nécropoles que dans n'importe quel autre endroit sur terre. Et pourtant, la plupart des circuits font la même chose : Karnak, la Vallée des Rois, le temple de Louxor. Trois sites magnifiques, mais trois sites que tous les touristes voient le même matin."),
      block('p2', 'normal', "Voici cinq temples que Sophie visite avec ses voyageurs, et que 90% des visiteurs de Louxor ne verront jamais."),
      block('h2a', 'h2', "1. Medinet Habou, le temple le mieux préservé de la rive ouest"),
      block('p3', 'normal', "Medinet Habou est le temple funéraire de Ramsès III, sur la rive ouest. Il est en état de conservation remarquable, murs couverts de scènes de bataille peintes, couleurs encore visibles dans les hypogées. La plupart des guides touristiques le mentionnent à peine. Les groupes organisés n'y vont presque jamais. Sophie y emmène systématiquement ses voyageurs, tôt le matin, quand le site est quasi vide."),
      block('h2b', 'h2', "2. Deir el-Medina, le village des artisans"),
      block('p4', 'normal', "Deir el-Medina était le village des artisans qui creusaient les tombeaux de la Vallée des Rois. Leurs propres tombeaux, ornés des plus belles peintures funéraires qui soient, se trouvent ici, souvent déserts. L'intimité de l'espace, la finesse des hiéroglyphes, la lumière naturelle : c'est l'un des endroits les plus émouvants de toute la rive ouest."),
      block('h2c', 'h2', "3. La chapelle rouge de Hatshepsout"),
      block('p5', 'normal', "Reconstruite à partir de ses blocs d'origine au musée en plein air de Karnak, la chapelle rouge d'Hatshepsout est souvent oubliée des visites de Karnak pourtant si fréquentées. Elle se visite en 20 minutes, en dehors des foules, avec des reliefs d'une finesse exceptionnelle."),
      block('h2d', 'h2', "4. Le temple de Seti I à Gournah"),
      block('p6', 'normal', "Moins spectaculaire que celui d'Abydos, le temple de Seti I à Gournah mérite pourtant le détour, ne serait-ce que pour la qualité des reliefs et la quasi-absence de visiteurs. On peut passer une heure seul face aux piliers, ce qui est devenu rare à Louxor."),
      block('h2e', 'h2', "5. Le temple d'Amon à Karnak, l'entrée de revers"),
      block('p7', 'normal', "Karnak n'est pas méconnu, mais il y a une façon de le visiter que presque personne ne connaît : entrer par l'allée des sphinx côté Louxor, à contre-sens du flux touristique, à l'heure de la fermeture du soir. Les groupes sont partis. La lumière devient dorée. Les colosses n'appartiennent qu'à vous."),
      block('p8', 'normal', "Ce genre de détail, l'heure, l'entrée, l'angle, c'est exactement ce que Sophie apporte. Pas un guide téléphonique, mais dix ans de connaissance intime de ces lieux."),
    ],
  },

  'siwa-oasis-secrete': {
    _id: 'static-6',
    title: "Siwa : l'oasis secrète à la frontière libyenne",
    slug: { current: 'siwa-oasis-secrete' },
    excerpt: "Berbère, isolée, préservée, Siwa est probablement la destination la moins connue d'Égypte. Et de loin la plus envoûtante.",
    publishedAt: '2024-08-05',
    categories: [{ title: 'Désert', slug: { current: 'desert' } }],
    tags: ['Siwa', 'oasis', 'désert', 'Berbères'],
    body: [
      block('p1', 'normal', "Siwa se mérite. Pour y arriver depuis Le Caire, il faut traverser 560 kilomètres de désert occidental, huit heures de route ou un vol court vers Marsa Matrouh, puis encore deux heures. La plupart des voyageurs ne font pas cet effort. C'est exactement ce qui rend Siwa si précieux."),
      block('p2', 'normal', "L'oasis est berbère, pas arabe. La langue locale est le siwi, dialecte amazigh. Les maisons traditionnelles sont en karshif, un mélange de sel et d'argile du lac qui donne aux murs une teinte ocre rose unique. L'architecture de Siwa ne ressemble à rien d'autre en Égypte."),
      block('h2a', 'h2', "Ce qu'on vient chercher à Siwa"),
      block('p3', 'normal', "Le temple d'Alexandre le Grand, d'abord. C'est ici, au temple d'Amon de Siwa, qu'Alexandre consulta l'oracle en 331 avant J.-C., et que l'oracle lui aurait révélé sa filiation divine. Le temple est à moitié en ruine, battu par le vent, entouré de palmiers. Magnifique de désolation."),
      block('p4', 'normal', "Les sources d'eau chaude, ensuite. Cleopatra's Bath, Ain Ghaifa, des bassins naturels où l'eau jaillit de la terre à 30°C au milieu du désert. Se baigner là, au coucher du soleil, sur fond de dunes dorées et de palmiers, est une expérience que peu de voyageurs auront vécue."),
      block('h2b', 'h2', "La mer de sable au coucher du soleil"),
      block('p5', 'normal', "À la lisière de l'oasis commence l'erg, la mer de sable. Des dunes qui s'étendent à perte de vue jusqu'à la frontière libyenne. Une excursion en 4×4 au coucher du soleil sur ces dunes, suivie d'un thé face à l'horizon qui s'embrase, est l'une des expériences les plus fortes que l'Égypte peut offrir."),
      block('h2c', 'h2', "Comment intégrer Siwa à un voyage en Égypte"),
      block('p6', 'normal', "Siwa s'intègre idéalement comme extension de 3 à 5 nuits à la fin d'un circuit classique, après Le Caire, avant le retour. Ou en destination principale pour les voyageurs qui cherchent à s'éloigner radicalement des circuits touristiques. Sophie l'inclut régulièrement dans ses voyages sur mesure, combinée au désert blanc ou à un séjour à la Thébaïde."),
      block('p7', 'normal', "Si Siwa vous attire et que vous voulez savoir comment l'intégrer à votre voyage, écrivez à Sophie. Elle connaît l'oasis en toutes saisons et vous dira honnêtement si c'est fait pour vous."),
    ],
  },
}

// ─── generateStaticParams ─────────────────────────────────
export async function generateStaticParams() {
  const staticSlugs = Object.keys(STATIC_ARTICLES).map((slug) => ({ slug }))
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return staticSlugs
    const posts = await sanityClient.fetch<Array<{ slug: { current: string } }>>(
      postsQuery,
      { from: 0, to: 100 }
    )
    return [...staticSlugs, ...(posts ?? []).map((p) => ({ slug: p.slug.current }))]
  } catch {
    return staticSlugs
  }
}

// ─── generateMetadata ─────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const staticPost = STATIC_ARTICLES[slug]
      if (staticPost) {
        return {
          title: `${staticPost.title}, Rendez-vous sur le Nil`,
          description: staticPost.excerpt ?? '',
          alternates: { canonical: `https://rendezvous-surlenil.com/blog/${slug}` },
        }
      }
      throw new Error()
    }
    const post = await sanityClient.fetch<Post>(postBySlugQuery, { slug })
    if (!post) throw new Error()
    const title = post.seo?.metaTitle ?? post.title
    const description = post.seo?.metaDescription ?? post.excerpt ?? ''
    return {
      title: `${title}, Rendez-vous sur le Nil`,
      description,
      alternates: { canonical: `https://rendezvous-surlenil.com/blog/${slug}` },
      openGraph: {
        title,
        description,
        images: post.mainImage?.asset ? [{ url: urlFor(post.mainImage).width(1200).height(630).url() }] : [],
      },
    }
  } catch {
    return {
      title: 'Article, Rendez-vous sur le Nil',
      description: 'Blog voyage en Égypte par Sophie Godineau.',
    }
  }
}

// ─── Portable text components ────────────────────────────
const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 leading-relaxed" style={{ color: '#3D5166', fontSize: '1.0625rem', lineHeight: 1.85 }}>
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2
        className="mt-12 mb-5"
        style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: '#0F3D38', fontWeight: 400, lineHeight: 1.25 }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="mt-8 mb-4"
        style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.375rem', color: '#0F3D38', fontWeight: 500 }}
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="my-8 pl-5"
        style={{ borderLeft: '2px solid #C4902A' }}
      >
        <p
          className="italic leading-relaxed"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.25rem', color: '#1E6860', margin: 0 }}
        >
          {children}
        </p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 flex flex-col gap-2" style={{ paddingLeft: '1rem' }}>{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 flex flex-col gap-2" style={{ paddingLeft: '1.25rem', listStyleType: 'decimal' }}>{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-2.5 text-sm" style={{ color: '#5C6E7E', lineHeight: 1.7 }}>
        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#C4902A' }} />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="text-sm" style={{ color: '#5C6E7E', lineHeight: 1.7 }}>{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong style={{ color: '#0F3D38', fontWeight: 600 }}>{children}</strong>,
    em: ({ children }) => <em style={{ fontStyle: 'italic', color: '#1E6860' }}>{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        style={{ color: '#C4902A', textDecoration: 'underline', textUnderlineOffset: '3px' }}
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value: SanityImageBlock }) => (
      <figure className="my-10">
        <div
          className="overflow-hidden rounded-sm"
          style={{ position: 'relative', aspectRatio: '16/9' }}
        >
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt ?? ''}
            fill
            sizes="(max-width: 768px) 100vw, 760px"
            className="object-cover"
            placeholder={value.asset?.metadata?.lqip ? 'blur' : undefined}
            blurDataURL={value.asset?.metadata?.lqip}
          />
        </div>
        {value.caption && (
          <figcaption className="mt-3 text-xs text-center italic" style={{ color: '#8A9BAB' }}>
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
}

// ─── WhatsApp icon inline ─────────────────────────────────
function WaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

// ─── Page ─────────────────────────────────────────────────
export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let post: Post | null = null

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      post = await sanityClient.fetch<Post>(postBySlugQuery, { slug })
    }
  } catch {
    // ignore
  }

  if (!post) post = STATIC_ARTICLES[slug] ?? null
  if (!post) notFound()

  const rt = readTime(post.body)
  const cta = post.ctaInArticle
  const waUrl = getWhatsAppUrl(cta?.whatsappMessage ?? "Bonjour Sophie, j'ai lu votre article et j'aimerais en savoir plus sur un voyage en Égypte 🌿")
  const defaultWaUrl = getWhatsAppUrl("Bonjour Sophie, j'ai lu votre article et j'aimerais organiser un voyage en Égypte. Êtes-vous disponible ? 🌿")

  const articleUrl = `https://rendezvous-surlenil.com/blog/${slug}`

  // JSON-LD BlogPosting
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt ?? post.publishedAt,
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    author: { '@type': 'Person', name: post.author?.name ?? 'Sophie Godineau' },
    publisher: {
      '@type': 'Organization',
      name: 'Rendez-vous sur le Nil',
      logo: { '@type': 'ImageObject', url: 'https://rendezvous-surlenil.com/logo.png' },
    },
    image: post.mainImage?.asset ? urlFor(post.mainImage).width(1200).height(630).url() : undefined,
    url: articleUrl,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ─── Hero article ──────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '60vh' }}>
        <div className="absolute inset-0">
          {post.mainImage?.asset ? (
            <Image
              src={urlFor(post.mainImage).width(1800).height(900).url()}
              alt={post.mainImage.alt ?? post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ filter: 'brightness(0.65)' }}
              placeholder={post.mainImage.asset.metadata?.lqip ? 'blur' : undefined}
              blurDataURL={post.mainImage.asset.metadata?.lqip}
            />
          ) : (
            <div style={{ position: 'absolute', inset: 0, background: '#2A5A54' }} />
          )}
          <div className="img-overlay-hero" />
        </div>

        <div
          className="relative z-10 flex flex-col justify-end px-6 md:px-16 pb-16 md:pb-24 max-w-[1200px] mx-auto"
          style={{ minHeight: '60vh' }}
        >
          {/* Breadcrumb */}
          <nav
            className="absolute top-28 left-6 md:left-16 flex items-center gap-2 text-xs"
            style={{ color: 'rgba(255,255,255,0.55)' }}
            aria-label="Fil d'Ariane"
          >
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            {post.categories?.[0] && (
              <>
                <span>/</span>
                <Link href={`/blog/categorie/${post.categories[0].slug.current}`} className="hover:text-white transition-colors">
                  {post.categories[0].title}
                </Link>
              </>
            )}
          </nav>

          <div className="max-w-3xl">
            {/* Catégorie */}
            {post.categories?.[0] && (
              <span
                className="inline-block text-[10px] font-semibold tracking-[0.14em] uppercase px-2.5 py-1 rounded-sm mb-5"
                style={{ background: 'rgba(184,131,42,0.85)', color: 'white' }}
              >
                {post.categories[0].title}
              </span>
            )}

            <h1
              className="mb-6"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(1.875rem, 4vw, 3rem)',
                color: 'white',
                fontWeight: 400,
                lineHeight: 1.15,
              }}
            >
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0"
                  style={{ background: '#2A5A54', border: '1px solid rgba(201,169,110,0.4)' }}
                >
                  {post.author?.photo?.asset?.url ? (
                    <img src={post.author.photo.asset.url} alt={post.author.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] font-bold" style={{ color: '#C4902A' }}>S</div>
                  )}
                </div>
                <span className="text-xs font-medium" style={{ color: 'rgba(250,247,242,0.85)' }}>
                  {post.author?.name ?? 'Sophie Godineau'}
                </span>
              </div>
              {post.publishedAt && (
                <span className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(250,247,242,0.6)' }}>
                  <CalendarDays size={11} aria-hidden="true" />
                  {formatDate(post.publishedAt)}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(250,247,242,0.6)' }}>
                <Clock size={11} aria-hidden="true" />
                {rt} de lecture
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Corps de l'article ────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: '#FAF7F2' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">

            {/* Article principal */}
            <article>
              {/* Excerpt / chapeau */}
              {post.excerpt && (
                <p
                  className="mb-8 pb-8 text-lg leading-relaxed italic"
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    color: '#1E6860',
                    borderBottom: '1px solid #E8D5B7',
                    fontSize: '1.1875rem',
                  }}
                >
                  {post.excerpt}
                </p>
              )}

              {/* Corps portable text */}
              {post.body ? (
                <PortableText value={post.body} components={ptComponents} />
              ) : (
                <p className="text-sm" style={{ color: '#8A9BAB' }}>
                  Contenu de l&apos;article à venir…
                </p>
              )}

              {/* Galerie photos */}
              {post.gallery && post.gallery.length > 0 && (
                <div className="mt-10 pt-8" style={{ borderTop: '1px solid #E8D5B7' }}>
                  <p className="eyebrow mb-5">Galerie</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {post.gallery.map((img, i) => (
                      <figure key={i} className="relative overflow-hidden rounded-sm" style={{ aspectRatio: '4/3' }}>
                        <Image
                          src={urlFor(img).width(600).height(450).url()}
                          alt={img.alt ?? post.title}
                          fill
                          sizes="(max-width: 640px) 50vw, 33vw"
                          className="object-cover"
                          placeholder={img.asset.metadata?.lqip ? 'blur' : undefined}
                          blurDataURL={img.asset.metadata?.lqip}
                        />
                        {img.caption && (
                          <figcaption className="absolute bottom-0 inset-x-0 px-2 py-1.5 text-[10px] text-center" style={{ background: 'rgba(15,61,56,0.75)', color: 'rgba(250,247,242,0.9)' }}>
                            {img.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-10 pt-6 flex flex-wrap gap-2" style={{ borderTop: '1px solid #E8D5B7' }}>
                  <span className="text-xs font-medium" style={{ color: '#8A9BAB' }}>Tags :</span>
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}

              {/* CTA inline mobile, WhatsApp */}
              {cta?.enabled !== false && (
                <div
                  className="mt-10 p-6 rounded-sm lg:hidden"
                  style={{ background: '#FDF8F0', border: '1px solid #E8D5B7' }}
                >
                  <p className="eyebrow mb-2">Envie de voyager en Égypte ?</p>
                  <p className="text-sm mb-4" style={{ color: '#5C6E7E' }}>
                    {cta?.message ?? 'Sophie répond à toutes vos questions.'}
                  </p>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp w-full justify-center">
                    <WaIcon />
                    Écrire à Sophie
                  </a>
                </div>
              )}

              {/* Guide PDF lead magnet */}
              {post.showLeadMagnet !== false && (
                <div
                  className="mt-10 p-7 rounded-sm"
                  style={{ background: '#0F3D38', border: '1px solid #2A5A54' }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.3)' }}
                    >
                      <BookOpen size={20} style={{ color: '#C4902A' }} aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <p className="eyebrow mb-2" style={{ color: '#C4902A' }}>Guide gratuit</p>
                      <h3
                        className="mb-2"
                        style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.25rem', color: '#FAF7F2', fontWeight: 400 }}
                      >
                        Téléchargez notre guide Égypte
                      </h3>
                      <p className="text-sm mb-5" style={{ color: '#8A9BAB' }}>
                        20 pages de conseils pratiques, itinéraires et adresses, conçus par Sophie pour préparer votre voyage.
                      </p>
                      <Link href="/guide-egypte" className="btn btn-primary">
                        Obtenir le guide gratuit
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Retour blog */}
              <div className="mt-10 pt-6" style={{ borderTop: '1px solid #E8D5B7' }}>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#C4902A]"
                  style={{ color: '#5C6E7E' }}
                >
                  <ArrowLeft size={14} aria-hidden="true" />
                  Retour au blog
                </Link>
              </div>
            </article>

            {/* ─── Sidebar ──────────────────────────────────── */}
            <aside className="hidden lg:flex flex-col gap-6 lg:sticky lg:top-28">
              {/* WhatsApp CTA */}
              {cta?.enabled !== false && (
                <div
                  className="p-6 rounded-sm"
                  style={{ background: '#FDF8F0', border: '1px solid #E8D5B7' }}
                >
                  <p className="eyebrow mb-2">{cta?.title ?? 'Envie de voyager en Égypte ?'}</p>
                  <p className="text-sm mb-5 leading-relaxed" style={{ color: '#5C6E7E' }}>
                    {cta?.message ?? 'Sophie répond à toutes vos questions en 24h.'}
                  </p>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp w-full justify-center"
                  >
                    <WaIcon />
                    Écrire à Sophie
                  </a>
                </div>
              )}

              {/* Auteur */}
              <div
                className="p-5 rounded-sm"
                style={{ background: 'white', border: '1px solid #E8D5B7' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
                    style={{ background: '#FDF8F0', border: '2px solid #E8D5B7' }}
                  >
                    {post.author?.photo?.asset?.url ? (
                      <img src={post.author.photo.asset.url} alt={post.author.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm font-bold" style={{ color: '#C4902A' }}>S</div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#0F3D38' }}>
                      {post.author?.name ?? 'Sophie Godineau'}
                    </p>
                    <p className="text-xs" style={{ color: '#8A9BAB' }}>
                      {post.author?.role ?? 'Guide & travel planner, Louxor'}
                    </p>
                  </div>
                </div>
                {post.author?.bio && (
                  <p className="text-xs leading-relaxed" style={{ color: '#5C6E7E' }}>{post.author.bio}</p>
                )}
              </div>

              {/* Catégories */}
              {post.categories && post.categories.length > 0 && (
                <div className="p-5 rounded-sm" style={{ background: 'white', border: '1px solid #E8D5B7' }}>
                  <p className="eyebrow mb-3">Catégories</p>
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((cat) => (
                      <Link
                        key={cat.slug.current}
                        href={`/blog/categorie/${cat.slug.current}`}
                        className="tag tag-gold hover:opacity-80 transition-opacity"
                      >
                        {cat.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Guide PDF mini */}
              {post.showLeadMagnet !== false && (
                <div
                  className="p-5 rounded-sm text-center"
                  style={{ background: '#0F3D38', border: '1px solid #2A5A54' }}
                >
                  <BookOpen size={20} style={{ color: '#C4902A', margin: '0 auto 0.75rem' }} aria-hidden="true" />
                  <p className="text-xs font-semibold mb-2" style={{ color: '#FAF7F2' }}>
                    Guide Égypte gratuit
                  </p>
                  <p className="text-xs mb-4" style={{ color: '#8A9BAB' }}>
                    20 pages de conseils par Sophie
                  </p>
                  <Link href="/guide-egypte" className="btn btn-primary w-full justify-center text-[11px]">
                    Télécharger →
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* ─── Expériences liées ─────────────────────────────── */}
      {post.relatedExperiences && post.relatedExperiences.length > 0 && (
        <section className="py-16 md:py-20" style={{ background: '#FDF8F0' }} aria-labelledby="related-heading">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="mb-10">
              <p className="eyebrow mb-3">Pour aller plus loin</p>
              <h2
                id="related-heading"
                style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.75rem', color: '#0F3D38', fontWeight: 400 }}
              >
                Les expériences liées à cet article
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {post.relatedExperiences.map((exp) => (
                <Link
                  key={exp._id}
                  href={experienceHref(exp.type, exp.slug.current)}
                  className="card group overflow-hidden"
                >
                  <div className="img-section relative overflow-hidden">
                    {exp.mainImage?.asset?.url ? (
                      <Image
                        src={exp.mainImage.asset.url}
                        alt={exp.mainImage.alt ?? exp.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div style={{ position: 'absolute', inset: 0, background: '#2A5A54' }} />
                    )}
                  </div>
                  <div className="p-5">
                    <h3
                      className="mb-1 transition-colors group-hover:text-[#C4902A]"
                      style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.125rem', color: '#0F3D38', fontWeight: 500 }}
                    >
                      {exp.title}
                    </h3>
                    {exp.tagline && (
                      <p className="text-xs leading-relaxed" style={{ color: '#8A9BAB' }}>{exp.tagline}</p>
                    )}
                    {exp.priceAmount && (
                      <p className="mt-2 text-sm font-medium" style={{ color: '#C4902A', fontFamily: 'Cormorant Garamond' }}>
                        À partir de {exp.priceAmount.toLocaleString('fr-FR')} € <span className="text-xs font-normal" style={{ color: '#8A9BAB' }}>{exp.priceSuffix}</span>
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA final ─────────────────────────────────────── */}
      <section className="py-20 text-center" style={{ background: '#0F3D38' }}>
        <div className="max-w-lg mx-auto px-6">
          <p className="eyebrow mb-4" style={{ color: '#C4902A' }}>Prêt(e) à voyager ?</p>
          <h2
            className="text-display-lg mb-6"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#FAF7F2', fontWeight: 400 }}
          >
            Votre Égypte commence
            <br />
            <em style={{ fontStyle: 'italic', color: '#CE8D5C' }}>par un message à Sophie</em>
          </h2>
          <p className="mb-8 text-sm leading-relaxed" style={{ color: '#8A9BAB' }}>
            Cet article vous a donné envie ? Sophie répond sous 24h et transforme
            vos envies en un vrai voyage.
          </p>
          <a href={defaultWaUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <WaIcon />
            Écrire à Sophie sur WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
