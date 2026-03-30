/**
 * seed.mjs — Injecte tout le contenu statique dans Sanity
 *
 * Usage :
 *   SANITY_WRITE_TOKEN=xxx node scripts/seed.mjs
 *
 * Récupérer le token : studio.sanity.io → projet → API → Tokens → Add API token (Editor)
 * Le script est idempotent : on peut le relancer sans créer de doublons.
 */

import { createClient } from '@sanity/client'

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const TOKEN = process.env.SANITY_WRITE_TOKEN

if (!PROJECT_ID) {
  console.error('❌  NEXT_PUBLIC_SANITY_PROJECT_ID manquant dans .env.local')
  process.exit(1)
}
if (!TOKEN) {
  console.error('❌  SANITY_WRITE_TOKEN manquant — récupère-le sur sanity.io → ton projet → API → Tokens')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: TOKEN,
  useCdn: false,
})

// ─── Helpers ──────────────────────────────────────────────
let counter = 0
function key(prefix) {
  return `${prefix}${++counter}`
}

function block(style, text) {
  const k = key('blk')
  return {
    _type: 'block',
    _key: k,
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: `${k}s`, marks: [], text }],
  }
}

function normal(text) { return block('normal', text) }
function h2(text)     { return block('h2', text) }
function bq(text)     { return block('blockquote', text) }

function hl(label, value) {
  return { _type: 'object', _key: key('hl'), label, value }
}

async function upsert(doc) {
  await client.createOrReplace(doc)
  console.log(`  ✓  ${doc._type}  ${doc._id}`)
}

// ─── 1. Auteur Sophie ──────────────────────────────────────
async function seedAuthor() {
  console.log('\n👤  Auteur')
  await upsert({
    _id: 'seed-author-sophie',
    _type: 'author',
    name: 'Sophie Godineau',
    role: 'Co-fondatrice, guide francophone en Égypte',
    bio: [
      { ...normal('Française expatriée à Louxor depuis plus de dix ans, Sophie a construit Rendez-vous sur le Nil avec son mari Nasser. Elle organise des voyages sur mesure, des croisières en dahabiya et des séjours à La Thébaïde, leur maison d\'hôtes sur la rive est du Nil.') },
    ],
  })
  return 'seed-author-sophie'
}

// ─── 2. Catégories ────────────────────────────────────────
async function seedCategories() {
  console.log('\n🏷️  Catégories')
  const cats = [
    {
      id: 'seed-cat-conseils', slug: 'conseils-pratiques', title: 'Conseils pratiques', icon: '🗓️',
      desc: 'Saisons, budget, visas, préparation du voyage.',
      seoTitle: 'Conseils pratiques pour voyager en Égypte — Rendez-vous sur le Nil',
      seoDesc: 'Saisons, budget, visas, santé, préparation : tous les conseils terrain de Sophie Godineau pour partir sereinement en Égypte.',
    },
    {
      id: 'seed-cat-experiences', slug: 'experiences', title: 'Expériences', icon: '✨',
      desc: 'Bivouac, montgolfière, dahabiya, rencontres.',
      seoTitle: 'Expériences uniques en Égypte — Rendez-vous sur le Nil',
      seoDesc: 'Bivouac dans le désert blanc, montgolfière sur le Nil, nuit à bord d\'une dahabiya : les expériences hors du commun que Sophie propose en Égypte.',
    },
    {
      id: 'seed-cat-sur-mesure', slug: 'sur-mesure', title: 'Voyage sur mesure', icon: '🗺️',
      desc: 'Comment construire un voyage personnalisé en Égypte.',
      seoTitle: 'Voyage sur mesure en Égypte — Rendez-vous sur le Nil',
      seoDesc: 'Comment construire un voyage en Égypte vraiment personnalisé ? Sophie explique ce que signifie le sur mesure, loin des circuits standardisés.',
    },
    {
      id: 'seed-cat-croisieres', slug: 'croisieres', title: 'Croisières', icon: '⛵',
      desc: 'Dahabiya, felouque, navigation sur le Nil.',
      seoTitle: 'Croisières sur le Nil en dahabiya — Rendez-vous sur le Nil',
      seoDesc: 'Dahabiya privatisée, felouque, navigation lente entre Louxor et Assouan : tout savoir sur les croisières sur le Nil selon Sophie Godineau.',
    },
    {
      id: 'seed-cat-louxor', slug: 'louxor', title: 'Louxor', icon: '🏛️',
      desc: 'Temples, nécropoles et vie quotidienne à Louxor.',
      seoTitle: 'Louxor : temples, nécropoles et secrets de la ville — Rendez-vous sur le Nil',
      seoDesc: 'Sophie vit à Louxor depuis plus de 10 ans. Ses adresses, ses temples préférés, les endroits que les circuits ne montrent jamais.',
    },
    {
      id: 'seed-cat-desert', slug: 'desert', title: 'Désert', icon: '🌵',
      desc: 'Désert blanc, Siwa, oasis du désert occidental.',
      seoTitle: 'Désert égyptien : Siwa, désert blanc, oasis — Rendez-vous sur le Nil',
      seoDesc: 'Désert blanc, oasis de Siwa, mer de sable : les destinations désert en Égypte que Sophie recommande et intègre dans ses voyages sur mesure.',
    },
  ]
  for (const c of cats) {
    await upsert({
      _id: c.id,
      _type: 'category',
      title: c.title,
      slug: { _type: 'slug', current: c.slug },
      description: c.desc,
      icon: c.icon,
      seo: { metaTitle: c.seoTitle, metaDescription: c.seoDesc },
    })
  }
  return Object.fromEntries(cats.map(c => [c.slug, c.id]))
}

// ─── 3. Articles de blog ──────────────────────────────────
async function seedPosts(authorId, catIds) {
  console.log('\n📝  Articles de blog')

  const posts = [
    {
      _id: 'seed-post-quand-partir',
      title: 'Quand partir en Égypte ? Le guide complet mois par mois',
      slug: 'quand-partir-en-egypte',
      excerpt: "L'Égypte se visite toute l'année, mais tous les mois ne se ressemblent pas. Températures, affluence, fêtes locales, Nil en crue : voici le calendrier honnête pour choisir votre moment.",
      publishedAt: '2024-11-10T08:00:00Z',
      featured: true,
      catId: catIds['conseils-pratiques'],
      tags: ['saison', 'météo', 'planification', 'Louxor'],
      showLeadMagnet: true,
      body: [
        normal("La question revient dans chaque conversation : « Quelle est la meilleure saison pour aller en Égypte ? » La réponse honnête, c'est qu'il n'y en a pas une, il y en a plusieurs, selon ce que vous cherchez. Un voyageur qui veut explorer les temples sous un ciel vide choisira mars. Un autre qui veut sentir le pays dans sa vérité choisira septembre, après le Ramadan, quand la vie reprend."),
        h2("Octobre – mars : la haute saison douce"),
        normal("Ces mois sont les plus demandés, et pour cause : les températures sont idéales. À Louxor, les journées oscillent entre 22 et 28°C, les nuits sont fraîches (10-14°C). Sur le Nil, la lumière du matin est d'une douceur rare. C'est la fenêtre parfaite pour une croisière en dahabiya, ni la chaleur étouffante de l'été, ni le vent de khamsine du printemps."),
        normal("Décembre-janvier concentre le plus fort afflux touristique. Les grands sites, Karnak, la Vallée des Rois, peuvent être denses en milieu de journée. Notre conseil : lever tôt, visiter à l'ouverture, laisser les groupes passer, reprendre en fin d'après-midi quand la lumière devient dorée."),
        bq("À Louxor en novembre, nous étions parfois seuls face aux colosses de Memnon au lever du soleil. Ce genre de moment ne s'oublie pas."),
        h2("Avril – mai : le printemps contrasté"),
        normal("Avril est un mois-charnière. Les températures montent (35-40°C à Louxor en mai), et le vent de khamsine peut souffler ponctuellement, un vent de sable chaud venu du désert, qui rend les visites inconfortables pendant quelques heures. Ce n'est pas rédhibitoire, mais prévoyez de la flexibilité dans votre programme."),
        normal("En contrepartie, l'affluence touristique baisse nettement. Les prix s'assouplissent, les guides sont moins sollicités, et vous aurez les temples presque pour vous."),
        h2("Juin – août : l'Égypte profonde, pour initiés"),
        normal("L'été est la saison que les agences déconseillent automatiquement. 40-45°C à Louxor en juillet, c'est une réalité. Mais l'Égypte d'été est aussi celle qui se dévoile le plus authentiquement. Les bazars sont pour les Égyptiens. Les hôtels sont vides. Les soirées sur la terrasse, face au Nil, ont un goût unique."),
        h2("Septembre – octobre : la renaissance"),
        normal("Septembre est notre mois préféré pour les voyageurs qui nous font confiance. La chaleur commence à refluer. Le Ramadan est derrière. La rentrée touristique n'a pas encore eu lieu. L'Égypte est dans un entre-deux rare : détendue, accessible, lumineuse."),
        h2("Le Ramadan : faut-il éviter ?"),
        normal("La date du Ramadan se décale chaque année (calendrier lunaire). Pendant ce mois, les horaires des restaurants et commerces changent, certains sites ont des horaires réduits, et l'atmosphère du pays se transforme profondément. Ce n'est pas une contrainte, c'est une expérience en soi."),
        h2("Notre recommandation finale"),
        normal("Si vous n'avez qu'une fenêtre à choisir : octobre ou mars. Température idéale, lumière exceptionnelle, affluence raisonnable. Pour un premier voyage, c'est la combinaison gagnante."),
      ],
    },
    {
      _id: 'seed-post-desert-blanc',
      title: "Dormir dans le désert blanc en Égypte : une expérience hors du temps",
      slug: 'dormir-desert-blanc-egypte',
      excerpt: "À 45 kilomètres de Farafra, le désert blanc est l'un des paysages les plus irréels d'Afrique. Des formations calcaires sculptées par le vent, une nuit sous les étoiles, un silence total.",
      publishedAt: '2024-12-03T08:00:00Z',
      catId: catIds['experiences'],
      tags: ['désert', 'Farafra', 'nuit étoiles', 'bivouac', 'désert blanc'],
      showLeadMagnet: true,
      body: [
        normal("Il y a des paysages qui déjouent toute attente. Le désert blanc, à 45 km au nord de Farafra dans le Sahara occidental, en fait partie. Ce n'est pas le désert de sable que l'on imagine en Égypte, c'est un plateau de formations calcaires érodées par le vent, blanches comme de la craie, qui surgissent du sol sous des formes impossibles."),
        bq("La première fois que j'ai vu le désert blanc au coucher du soleil, j'ai pensé à une autre planète. La lumière rasante transformait tout en or sur fond de blanc pur."),
        h2("Comment y accéder"),
        normal("Le désert blanc ne se rejoint pas seul, du moins pas raisonnablement. La piste depuis Farafra est balisée, mais les conditions changent. L'approche classique : louer un 4×4 avec chauffeur-guide à Farafra, ou organiser le circuit depuis Bahareya, l'oasis la plus proche du Caire."),
        normal("Depuis Louxor, la logistique est plus complexe mais faisable : vol intérieur ou train vers le Caire, puis route jusqu'à Bahareya. Une nuit dans le désert blanc s'intègre idéalement dans un circuit de 3 à 4 jours dans les oasis du désert occidental."),
        h2("Le bivouac : ce qui vous attend"),
        normal("Le camp se monte en milieu d'après-midi. Votre guide installe un tapis, des coussins, un réchaud. Le dîner, poulet grillé, riz, légumes, thé au cumin, se prépare sur le feu. Vous mangez face aux formations calcaires qui changent de couleur avec la lumière déclinante."),
        normal("La nuit est la vraie révélation. Sans pollution lumineuse à des centaines de kilomètres, le ciel du Sahara est d'une densité d'étoiles qui coupe le souffle. Voie lactée visible à l'œil nu, silence absolu, températures fraîches : prévoyez un sac de couchage même en octobre."),
        h2("Quelle saison choisir"),
        normal("Octobre à mars est la fenêtre idéale. Les journées sont agréables (25-30°C), les nuits fraîches (5-12°C). En été, les températures diurnes dépassent 45°C. Évitez aussi les périodes de khamsine (mars-avril)."),
        h2("Ce qu'il faut emporter"),
        normal("Sac de couchage ou couverture chaude (indispensable même en novembre), lampe frontale, protection solaire haute indice, chapeau à large bord, foulard ou keffieh, chaussures fermées pour la marche sur les formations calcaires."),
        h2("Intégrer le désert blanc à votre voyage"),
        normal("Le désert blanc seul mérite le déplacement, mais il prend toute sa profondeur dans un circuit qui combine Nil et désert. Quelques jours de croisière en dahabiya sur le Nil entre Louxor et Assouan, puis une extension vers les oasis, c'est le voyage que peu d'agences proposent."),
      ],
    },
    {
      _id: 'seed-post-sur-mesure',
      title: "Voyage sur mesure en Égypte : ce que les agences ne vous disent pas",
      slug: 'voyage-sur-mesure-egypte',
      excerpt: "Le « sur mesure » est devenu un argument marketing galvaudé. Sophie explique ce que signifie vraiment construire un voyage en Égypte personnalisé.",
      publishedAt: '2025-01-15T08:00:00Z',
      catId: catIds['sur-mesure'],
      tags: ['sur mesure', 'agence', 'travel planner', 'conseils'],
      showLeadMagnet: true,
      body: [
        normal("Toutes les agences de voyages affirment faire du « sur mesure ». Certaines y arrivent. La plupart assemblent des briques préfabriquées, hôtels contractualisés, guides sous-traités, circuits standardisés, en les réarrangeant différemment selon le client."),
        normal("Le vrai sur mesure commence par une question que la plupart des agences ne posent jamais : qu'est-ce que vous ne voulez pas faire ? Pas les monuments que vous voulez voir. Pas le budget. Ce que vous refusez catégoriquement de vivre."),
        bq("Une de mes clientes m'a dit : « Je ne veux jamais manger dans un restaurant avec un menu en français et un drapeau français à l'entrée. » Cette phrase m'a appris plus sur elle que n'importe quel questionnaire de voyage."),
        h2("Ce que « sur mesure » veut réellement dire"),
        normal("Le sur mesure n'est pas un service, c'est une relation. Cela commence par une conversation où vous parlez de vos voyages précédents, de ce qui vous a déçu, de ce qui vous a touché. Pas de formulaire. Pas de catégories prédéfinies. Une vraie écoute."),
        h2("Pourquoi les agences généralistes ne peuvent pas faire ça"),
        normal("Ce n'est pas une critique des agences généralistes, c'est une question de modèle économique. Pour qu'une agence soit rentable à grande échelle, elle a besoin de volume. Le volume nécessite de la standardisation. La standardisation est l'opposé du sur mesure."),
        normal("Un tour-opérateur qui vend 5 000 voyages en Égypte par an ne peut pas connaître personnellement les guides qui accueilleront vos clients. Il ne peut pas choisir votre chambre en fonction de votre sensibilité au bruit."),
        h2("Les questions à poser avant de réserver"),
        normal("Qui construit mon programme, une personne qui connaît l'Égypte en profondeur ou un commercial ? Vos guides sont-ils des indépendants avec qui vous avez une relation longue, ou des sous-traitants d'une agence locale ? Si quelque chose ne se passe pas comme prévu sur place, qui je contacte ?"),
        h2("Ce que nous faisons concrètement"),
        normal("Notre processus commence par un échange WhatsApp ou téléphonique d'environ 30 minutes. Pas de formulaire. Vous expliquez votre projet, vos contraintes, vos envies. Si le courant passe, nous construisons une proposition narrative, pas un tableau Excel de prestations."),
        normal("Ce processus prend plus de temps. Il coûte plus cher. Il donne un voyage incomparable, c'est le pari que nous faisons, et que nos voyageurs confirment à leur retour."),
      ],
    },
    {
      _id: 'seed-post-dahabiya',
      title: "Qu'est-ce qu'une dahabiya ? Tout ce qu'il faut savoir",
      slug: 'qu-est-ce-qu-une-dahabiya',
      excerpt: "Le voilier traditionnel égyptien qui a séduit Agatha Christie et les grands explorateurs du XIXe siècle. Aujourd'hui rénové, il offre l'expérience la plus intime du Nil.",
      publishedAt: '2024-10-20T08:00:00Z',
      catId: catIds['croisieres'],
      tags: ['dahabiya', 'Nil', 'croisière', 'Louxor'],
      showLeadMagnet: true,
      body: [
        normal("La dahabiya est un voilier traditionnel à fond plat, utilisé sur le Nil depuis le XIXe siècle. Son nom vient de l'arabe « dahab », l'or. Les grandes dahabiyas de l'époque victorienne transportaient les voyageurs fortunés vers Louxor et Assouan. Agatha Christie en faisait partie. Flaubert aussi."),
        h2("Dahabiya et croisière classique : quelle différence ?"),
        normal("La différence tient en un mot : la privatisation. Sur un bateau de croisière classique, vous partagez le pont, la salle à manger et le guide avec 80 à 200 autres voyageurs. Sur une dahabiya, le bateau n'appartient qu'à vous."),
        normal("La dahabiya navigue aussi différemment. Elle peut s'arrêter n'importe où, sur une berge, face à un temple oublié, dans un village de pêcheurs que les grands bateaux ne voient jamais."),
        bq("Sur une dahabiya, on n'est pas dans un hôtel qui flotte. On est sur le Nil, vraiment. La différence se sent dès la première nuit."),
        h2("Combien de personnes à bord ?"),
        normal("Les dahabiyas modernes accueillent en général entre 2 et 8 voyageurs. Les cabines sont climatisées, avec salle de bain privée. Un salon panoramique, une cuisine équipée, un pont terrasse pour les nuits étoilées. Le tout géré par un équipage de 4 à 6 personnes."),
        h2("Que comprend une croisière en dahabiya ?"),
        normal("Nuitées à bord, pension complète, équipage local, guide francophone sur les sites, droits d'entrée des temples, transferts. L'organisation logistique est entièrement prise en charge."),
        h2("Quel itinéraire sur une dahabiya ?"),
        normal("L'itinéraire classique relie Louxor à Assouan, en 4 à 7 nuits. Les escales varient : Esna, Edfou (temple d'Horus, le mieux conservé d'Égypte), Kom Ombo, et Assouan et ses îles. Chaque itinéraire est adaptable."),
      ],
    },
    {
      _id: 'seed-post-temples',
      title: 'Louxor : 5 temples méconnus que les circuits ne montrent jamais',
      slug: 'louxor-5-temples-meconnus',
      excerpt: "Medinet Habou, Deir el-Medina, la chapelle rouge de Hatshepsout, Louxor cache des merveilles que 90% des touristes ne voient jamais.",
      publishedAt: '2024-09-15T08:00:00Z',
      catId: catIds['louxor'],
      tags: ['Louxor', 'temples', 'rive ouest', 'Égypte ancienne'],
      showLeadMagnet: true,
      body: [
        normal("Louxor est souvent présentée comme la plus grande ville archéologique du monde. Dans un périmètre de 30 kilomètres, on trouve plus de temples, tombeaux et nécropoles que n'importe où ailleurs sur terre. Et pourtant, la plupart des circuits font la même chose : Karnak, la Vallée des Rois, le temple de Louxor."),
        normal("Voici cinq temples que Sophie visite avec ses voyageurs, et que 90% des visiteurs de Louxor ne verront jamais."),
        h2("1. Medinet Habou, le temple le mieux préservé de la rive ouest"),
        normal("Medinet Habou est le temple funéraire de Ramsès III, sur la rive ouest. Il est en état de conservation remarquable, murs couverts de scènes de bataille peintes, couleurs encore visibles dans les hypogées. Sophie y emmène systématiquement ses voyageurs, tôt le matin, quand le site est quasi vide."),
        h2("2. Deir el-Medina, le village des artisans"),
        normal("Deir el-Medina était le village des artisans qui creusaient les tombeaux de la Vallée des Rois. Leurs propres tombeaux, ornés des plus belles peintures funéraires qui soient, se trouvent ici, souvent déserts."),
        h2("3. La chapelle rouge de Hatshepsout"),
        normal("Reconstruite à partir de ses blocs d'origine au musée en plein air de Karnak, la chapelle rouge d'Hatshepsout est souvent oubliée des visites de Karnak. Elle se visite en 20 minutes, en dehors des foules, avec des reliefs d'une finesse exceptionnelle."),
        h2("4. Le temple de Seti I à Gournah"),
        normal("Moins spectaculaire que celui d'Abydos, le temple de Seti I à Gournah mérite le détour pour la qualité des reliefs et la quasi-absence de visiteurs. On peut passer une heure seul face aux piliers."),
        h2("5. Le temple d'Amon à Karnak, l'entrée de revers"),
        normal("Karnak n'est pas méconnu, mais il y a une façon de le visiter que presque personne ne connaît : entrer par l'allée des sphinx côté Louxor, à contre-sens du flux touristique, à l'heure de la fermeture du soir. Les groupes sont partis. La lumière devient dorée."),
      ],
    },
    {
      _id: 'seed-post-siwa',
      title: "Siwa : l'oasis secrète à la frontière libyenne",
      slug: 'siwa-oasis-secrete',
      excerpt: "Berbère, isolée, préservée, Siwa est probablement la destination la moins connue d'Égypte. Et de loin la plus envoûtante.",
      publishedAt: '2024-08-05T08:00:00Z',
      catId: catIds['desert'],
      tags: ['Siwa', 'oasis', 'désert', 'Berbères'],
      showLeadMagnet: true,
      body: [
        normal("Siwa se mérite. Pour y arriver depuis Le Caire, il faut traverser 560 kilomètres de désert occidental, huit heures de route ou un vol court vers Marsa Matrouh, puis encore deux heures. La plupart des voyageurs ne font pas cet effort. C'est exactement ce qui rend Siwa si précieux."),
        normal("L'oasis est berbère, pas arabe. La langue locale est le siwi, dialecte amazigh. Les maisons traditionnelles sont en karshif, un mélange de sel et d'argile du lac qui donne aux murs une teinte ocre rose unique."),
        h2("Ce qu'on vient chercher à Siwa"),
        normal("Le temple d'Alexandre le Grand, d'abord. C'est ici, au temple d'Amon de Siwa, qu'Alexandre consulta l'oracle en 331 avant J.-C. Le temple est à moitié en ruine, battu par le vent, entouré de palmiers. Magnifique de désolation."),
        normal("Les sources d'eau chaude, ensuite. Cleopatra's Bath, Ain Ghaifa, des bassins naturels où l'eau jaillit de la terre à 30°C au milieu du désert. Se baigner là, au coucher du soleil, sur fond de dunes dorées et de palmiers."),
        h2("La mer de sable au coucher du soleil"),
        normal("À la lisière de l'oasis commence l'erg, la mer de sable. Des dunes qui s'étendent à perte de vue jusqu'à la frontière libyenne. Une excursion en 4×4 au coucher du soleil sur ces dunes, suivie d'un thé face à l'horizon qui s'embrase."),
        h2("Comment intégrer Siwa à un voyage en Égypte"),
        normal("Siwa s'intègre idéalement comme extension de 3 à 5 nuits à la fin d'un circuit classique, après Le Caire, avant le retour. Sophie l'inclut régulièrement dans ses voyages sur mesure, combinée au désert blanc ou à un séjour à la Thébaïde."),
      ],
    },
  ]

  for (const p of posts) {
    await upsert({
      _id: p._id,
      _type: 'post',
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      publishedAt: p.publishedAt,
      excerpt: p.excerpt,
      featured: p.featured ?? false,
      tags: p.tags,
      showLeadMagnet: p.showLeadMagnet,
      body: p.body,
      author: { _type: 'reference', _ref: authorId },
      categories: [{ _type: 'reference', _key: key('cat'), _ref: p.catId }],
      ctaInArticle: {
        enabled: true,
        title: 'Envie de voyager en Égypte ?',
        message: 'Sophie répond à toutes vos questions.',
        whatsappMessage: "Bonjour Sophie, j'ai lu votre article et j'aimerais en savoir plus 🌿",
      },
    })
  }
}

// ─── 4. Séjours Signature ─────────────────────────────────
async function seedExperiences() {
  console.log('\n✈️  Séjours Signature')

  const experiences = [
    {
      _id: 'seed-exp-casbah',
      title: "CASBAH — Louxor j'adore",
      slug: 'casbah-louxor-jadore',
      tagline: "Immersion totale à Louxor : La Thébaïde, Karnak au crépuscule, montgolfière au lever du soleil sur la Vallée des Rois.",
      duration: '8 jours / 7 nuits',
      order: 1,
      featured: false,
      priceDisplay: 'on-request',
      priceSuffix: '/ personne',
      ctaWhatsappMessage: "Bonjour Sophie, je suis intéressé(e) par le séjour CASBAH, Louxor j'adore (8j/7n). Pouvez-vous m'en dire plus ? 🌿",
      highlights: [
        hl('Hébergement', '7 nuits à La Thébaïde'),
        hl('Guide', 'Francophone dédié sur tous les sites'),
        hl('Expérience', 'Montgolfière au lever du soleil'),
        hl('Excursion', 'Dendérah ou Esna'),
        hl('Transferts', 'Inclus'),
      ],
      included: [
        '7 nuits à La Thébaïde (duplex de Sophie & Nasser)',
        'Guide francophone dédié sur tous les sites',
        'Montgolfière au lever du soleil',
        'Excursion Dendérah ou Esna',
        'Transferts aéroport et inter-sites',
        'Petit-déjeuner chaque matin',
        'Accompagnement WhatsApp de Sophie avant et pendant',
      ],
      notIncluded: ['Vols internationaux', 'Déjeuners et dîners (sauf petit-déjeuner)', 'Entrées des sites'],
    },
    {
      _id: 'seed-exp-yalla',
      title: "YALLA — Le voyage de Pharaon",
      slug: 'yalla-voyage-de-pharaon',
      tagline: "Le grand voyage : 2 nuits à La Thébaïde, puis 4 nuits à bord d'une dahabiya de Louxor à Assouan. Abou Simbel, montgolfière, guide dédié.",
      duration: '7 jours / 6 nuits',
      order: 2,
      featured: true,
      priceDisplay: 'on-request',
      priceSuffix: '/ personne',
      ctaWhatsappMessage: "Bonjour Sophie, je suis intéressé(e) par le séjour YALLA, Le voyage de Pharaon (7j/6n). Pouvez-vous m'en dire plus ? 🌿",
      highlights: [
        hl('Hébergement', '2 nuits à La Thébaïde'),
        hl('Croisière', '4 nuits en dahabiya Louxor–Assouan'),
        hl('Excursion', 'Abou Simbel incluse'),
        hl('Expérience', 'Montgolfière au lever du soleil'),
        hl('Guide', 'Francophone dédié'),
      ],
      included: [
        '2 nuits à La Thébaïde',
        '4 nuits en dahabiya (Louxor–Assouan)',
        'Excursion Abou Simbel incluse',
        'Montgolfière au lever du soleil',
        'Guide francophone dédié',
        'Pension complète à bord de la dahabiya',
        'Transferts aéroport et inter-sites',
      ],
      notIncluded: ['Vols internationaux', 'Entrées des sites (hors Abou Simbel)'],
    },
    {
      _id: 'seed-exp-pacha',
      title: "PACHA — Nil part ailleurs",
      slug: 'pacha-nil-part-ailleurs',
      tagline: "La croisière dahabiya intégrale, d'Assouan à Louxor. Temples au fil de l'eau, couchers de soleil sur le fleuve.",
      duration: '6 jours / 5 nuits, ou 8 jours / 7 nuits',
      order: 3,
      featured: false,
      priceDisplay: 'on-request',
      priceSuffix: '/ personne',
      ctaWhatsappMessage: "Bonjour Sophie, je suis intéressé(e) par le séjour PACHA, Nil part ailleurs. Pouvez-vous m'en dire plus ? 🌿",
      highlights: [
        hl('Croisière', 'Dahabiya sur le Nil (5 ou 7 nuits)'),
        hl('Guide', 'Francophone à bord'),
        hl('Option', 'Abou Simbel en option'),
        hl('Repas', 'Dîners à bord, petit-déjeuner inclus'),
        hl('Escales', 'Temples de Haute-Égypte'),
      ],
      included: [
        'Dahabiya sur le Nil (5 ou 7 nuits)',
        'Guide francophone à bord',
        'Dîners à bord, petit-déjeuner inclus',
        'Escales aux temples de Haute-Égypte',
        'Transferts depuis votre hôtel ou l\'aéroport',
      ],
      notIncluded: ['Vols internationaux', 'Abou Simbel (en option)', 'Déjeuners à terre'],
    },
    {
      _id: 'seed-exp-safara',
      title: "SAFARA — La mini-croisière",
      slug: 'safara-mini-croisiere',
      tagline: "3 nuits à bord d'une dahabiya entre Assouan et Louxor. L'entrée en matière idéale pour ceux qui veulent goûter la croisière.",
      duration: '4 jours / 3 nuits',
      order: 4,
      featured: false,
      priceDisplay: 'on-request',
      priceSuffix: '/ personne',
      ctaWhatsappMessage: "Bonjour Sophie, je suis intéressé(e) par le séjour SAFARA, La mini-croisière (4j/3n). Pouvez-vous m'en dire plus ? 🌿",
      highlights: [
        hl('Croisière', '3 nuits en dahabiya Assouan–Louxor'),
        hl('Guide', '4 sessions avec guide francophone'),
        hl('Excursion', 'Abou Simbel incluse'),
        hl('Transferts', 'Inclus'),
      ],
      included: [
        '3 nuits en dahabiya Assouan–Louxor',
        '4 sessions avec guide francophone',
        'Excursion Abou Simbel incluse',
        'Transferts inclus',
        'Pension complète à bord',
      ],
      notIncluded: ['Vols internationaux', 'Entrées des sites'],
    },
    {
      _id: 'seed-exp-smala',
      title: "SMALA — L'évasion privée",
      slug: 'smala-evasion-privee',
      tagline: "La dahabiya privatisée entièrement pour votre groupe, famille, amis, collègues. Programme 100% sur mesure.",
      duration: 'À partir de 5 jours / 4 nuits',
      order: 5,
      featured: false,
      priceDisplay: 'private-quote',
      priceSuffix: '/ groupe',
      ctaWhatsappMessage: "Bonjour Sophie, je suis intéressé(e) par le séjour SMALA, L'évasion privée. Nous sommes [nombre de personnes]. Pouvez-vous m'en dire plus ? 🌿",
      highlights: [
        hl('Privatisation', 'Dahabiya pour votre groupe'),
        hl('Guide', 'Francophone dédié'),
        hl('Programme', '100% sur mesure'),
        hl('Flexibilité', 'Durée et itinéraire à la carte'),
        hl('Organisation', 'Complète par Sophie'),
      ],
      included: [
        'Dahabiya privatisée pour votre groupe',
        'Guide francophone dédié',
        'Programme 100% sur mesure',
        'Durée et itinéraire flexibles',
        'Organisation complète par Sophie',
        'Pension complète à bord',
      ],
      notIncluded: ['Vols internationaux', 'Entrées des sites'],
    },
    {
      _id: 'seed-exp-habibi',
      title: "HABIBI — Offre été",
      slug: 'habibi-offre-ete',
      tagline: "L'Égypte en été : lumière intense, sites moins fréquentés, tarifs doux. La basse saison comme avantage.",
      duration: '4 jours / 3 nuits, juin, juillet, août',
      order: 6,
      featured: false,
      priceDisplay: 'on-request',
      priceSuffix: '/ personne',
      ctaWhatsappMessage: "Bonjour Sophie, je suis intéressé(e) par le séjour HABIBI, Offre été (été 2026). Pouvez-vous m'en dire plus ? 🌿",
      highlights: [
        hl('Hébergement', '4 nuits à La Thébaïde'),
        hl('Guide', 'Francophone dédié'),
        hl('Expérience', 'Montgolfière au lever du soleil'),
        hl('Activité', 'Felouque sur le Nil'),
        hl('Tarif', 'Basse saison'),
      ],
      included: [
        '4 nuits à La Thébaïde',
        'Guide francophone dédié',
        'Montgolfière au lever du soleil',
        'Promenade en felouque sur le Nil',
        'Transferts aéroport',
        'Petit-déjeuner chaque matin',
      ],
      notIncluded: ['Vols internationaux', 'Déjeuners et dîners', 'Entrées des sites'],
    },
  ]

  for (const exp of experiences) {
    await upsert({
      _id: exp._id,
      _type: 'experience',
      title: exp.title,
      slug: { _type: 'slug', current: exp.slug },
      type: 'sejour-signature',
      tagline: exp.tagline,
      duration: exp.duration,
      order: exp.order,
      featured: exp.featured,
      priceDisplay: exp.priceDisplay,
      priceSuffix: exp.priceSuffix,
      highlights: exp.highlights,
      included: exp.included,
      notIncluded: exp.notIncluded,
      ctaWhatsappMessage: exp.ctaWhatsappMessage,
    })
  }
}

// ─── 5. Croisières Dahabiya ───────────────────────────────
async function seedDahabiya() {
  console.log('\n⛵  Croisières Dahabiya')

  const formules = [
    {
      _id: 'seed-exp-dahabiya-escapade',
      title: 'Croisière Escapade',
      slug: 'croisiere-dahabiya-escapade',
      tagline: 'Louxor → Assouan en 4 nuits. La découverte idéale du Nil en dahabiya, petit groupe intimiste.',
      duration: '4 nuits / 5 jours',
      order: 1,
      featured: false,
      priceDisplay: 'from',
      priceAmount: 2400,
      priceSuffix: '/ pour 2 personnes',
      ctaWhatsappMessage: "Bonjour Sophie, je suis intéressé(e) par la formule Escapade (4 nuits). Pouvez-vous m'en dire plus ? 🛶",
      highlights: [
        hl('Itinéraire', 'Louxor → Assouan'),
        hl('Ambiance', 'Petit groupe intimiste'),
        hl('Escales', '4 escales majeures'),
        hl('Repas', 'À bord inclus'),
      ],
    },
    {
      _id: 'seed-exp-dahabiya-immersion',
      title: 'Croisière Immersion',
      slug: 'croisiere-dahabiya-immersion',
      tagline: 'La formule complète : 7 nuits de Louxor à Assouan, 8 escales sélectionnées, excursions et guide francophone inclus.',
      duration: '7 nuits / 8 jours',
      order: 2,
      featured: true,
      priceDisplay: 'from',
      priceAmount: 3800,
      priceSuffix: '/ pour 2 personnes',
      ctaWhatsappMessage: "Bonjour Sophie, je suis intéressé(e) par la formule Immersion (7 nuits). Pouvez-vous m'en dire plus ? 🛶",
      highlights: [
        hl('Itinéraire', 'Louxor → Assouan'),
        hl('Ambiance', 'Petit groupe intimiste'),
        hl('Escales', '8 escales sélectionnées'),
        hl('Excursions', 'Incluses'),
        hl('Guide', 'Local francophone'),
      ],
      included: [
        'Nuitées à bord de la dahabiya',
        'Pension complète (repas sur le bateau)',
        'Équipage local expérimenté',
        'Guide francophone sur les sites',
        "Droits d'entrée des temples",
        "Transferts depuis/vers l'aéroport ou votre hôtel",
        'Accompagnement WhatsApp avant le départ',
      ],
      notIncluded: [
        'Vol international',
        'Assurance voyage (recommandée)',
        'Pourboires locaux',
        'Dépenses personnelles',
      ],
    },
    {
      _id: 'seed-exp-dahabiya-grand-voyage',
      title: 'Grand Voyage en Dahabiya',
      slug: 'croisiere-dahabiya-grand-voyage',
      tagline: 'Privatisation complète de la dahabiya pour 12 nuits. Itinéraire sur mesure, flexibilité totale, guide dédié.',
      duration: '12 nuits / 13 jours',
      order: 3,
      featured: false,
      priceDisplay: 'private-quote',
      priceSuffix: '/ privatisation complète',
      ctaWhatsappMessage: "Bonjour Sophie, je suis intéressé(e) par une croisière longue durée. J'aimerais en discuter avec vous 🛶",
      highlights: [
        hl('Itinéraire', 'Sur mesure'),
        hl('Privatisation', 'Bateau privatisé'),
        hl('Trajet', 'Louxor ↔ Assouan'),
        hl('Guide', 'Dédié'),
        hl('Flexibilité', 'Totale'),
      ],
    },
  ]

  for (const exp of formules) {
    await upsert({
      _id: exp._id,
      _type: 'experience',
      title: exp.title,
      slug: { _type: 'slug', current: exp.slug },
      type: 'dahabiya',
      tagline: exp.tagline,
      duration: exp.duration,
      order: exp.order,
      featured: exp.featured,
      priceDisplay: exp.priceDisplay,
      priceAmount: exp.priceAmount,
      priceSuffix: exp.priceSuffix,
      highlights: exp.highlights,
      included: exp.included,
      notIncluded: exp.notIncluded,
      ctaWhatsappMessage: exp.ctaWhatsappMessage,
    })
  }
}

// ─── 6. Séjours Privilèges ────────────────────────────────
async function seedPrivileges() {
  console.log('\n👑  Séjours Privilèges')

  const programmes = [
    {
      _id: 'seed-exp-oasis-flow',
      title: 'OASIS FLOW SIWA — Yoga, oasis & sérénité',
      slug: 'oasis-flow-siwa',
      tagline: "Yoga du matin sur les dunes, baignades dans les sources naturelles, dîners sous les étoiles. Siwa, l'oasis au bout du monde.",
      duration: '8 jours / 7 nuits',
      order: 1,
      featured: false,
      priceDisplay: 'on-request',
      priceSuffix: '/ personne',
      ctaWhatsappMessage: 'Bonjour Sophie, je suis intéressé(e) par le séjour OASIS FLOW SIWA (8-15 novembre 2026). Pouvez-vous me donner les informations pour réserver ma place ? 🌿',
      highlights: [
        hl('Lieu', 'Siwa, oasis isolée à 500 km du Caire'),
        hl('Activité', 'Séances de yoga quotidiennes avec Louise'),
        hl('Expériences', 'Sources naturelles, baignades, dunes'),
        hl('Hébergement', 'Lodge traditionnel'),
        hl('Accompagnement', 'Sophie présente sur toute la durée'),
        hl('Repas & transferts', 'Inclus'),
      ],
      thematicDates: [
        {
          _key: 'td-oasis-2026',
          label: 'OASIS FLOW SIWA — Novembre 2026',
          startDate: '2026-11-08',
          endDate: '2026-11-15',
          status: 'available',
        },
      ],
    },
    {
      _id: 'seed-exp-croque-vogue',
      title: 'CROQUE & VOGUE — Aquarelle & croisière sur le Nil',
      slug: 'croque-et-vogue',
      tagline: "Croisière en dahabiya entre Assouan et Louxor, pinceau en main. Ateliers aquarelle quotidiens sur les plus beaux sites d'Égypte.",
      duration: '12 jours / 11 nuits',
      order: 2,
      featured: true,
      priceDisplay: 'on-request',
      priceSuffix: '/ personne',
      ctaWhatsappMessage: 'Bonjour Sophie, je suis intéressé(e) par le séjour CROQUE & VOGUE (15-26 novembre 2026). Pouvez-vous me donner les informations pour réserver ma place ? 🌿',
      highlights: [
        hl('Transport', 'Croisière en dahabiya'),
        hl('Ateliers', 'Aquarelle avec Isabelle Corcket & Robbie'),
        hl('Sites', 'Assouan, Kom Ombo, Edfou, Louxor'),
        hl('Accompagnement', 'Sophie présente sur toute la durée'),
        hl('Repas & hébergement', 'Cabine privée, repas à bord'),
      ],
      thematicDates: [
        {
          _key: 'td-croque-2026',
          label: 'CROQUE & VOGUE — Novembre 2026',
          startDate: '2026-11-15',
          endDate: '2026-11-26',
          status: 'available',
        },
      ],
    },
    {
      _id: 'seed-exp-deesse-nil',
      title: 'DÉESSE DU NIL — Voyage 100 % féminin',
      slug: 'deesse-du-nil',
      tagline: 'Un voyage entre femmes accompagné par Sophie. Louxor, temples, bien-être. Se ressourcer en sororité dans les sites les plus sacrés.',
      duration: '8 jours / 7 nuits',
      order: 3,
      featured: false,
      priceDisplay: 'on-request',
      priceSuffix: '/ personne',
      ctaWhatsappMessage: 'Bonjour Sophie, je suis intéressée par le séjour DÉESSE DU NIL (27 janvier–3 février 2027). Pouvez-vous me donner les informations pour réserver ma place ? 🌿',
      highlights: [
        hl('Lieux', 'Louxor & temples féminins sacrés'),
        hl('Accompagnatrice', 'Sophie Godineau'),
        hl('Hébergement', 'La Thébaïde'),
        hl('Expérience', 'Montgolfière au lever du soleil'),
        hl('Public', 'Séjour exclusivement féminin'),
      ],
      thematicDates: [
        {
          _key: 'td-deesse-2027',
          label: 'DÉESSE DU NIL — Janvier 2027',
          startDate: '2027-01-27',
          endDate: '2027-02-03',
          status: 'available',
        },
      ],
    },
  ]

  for (const prog of programmes) {
    await upsert({
      _id: prog._id,
      _type: 'experience',
      title: prog.title,
      slug: { _type: 'slug', current: prog.slug },
      type: 'sejour-privilege',
      tagline: prog.tagline,
      duration: prog.duration,
      order: prog.order,
      featured: prog.featured,
      priceDisplay: prog.priceDisplay,
      priceSuffix: prog.priceSuffix,
      highlights: prog.highlights,
      thematicDates: prog.thematicDates,
      ctaWhatsappMessage: prog.ctaWhatsappMessage,
    })
  }
}

// ─── 7. Témoignages ───────────────────────────────────────
async function seedTestimonials() {
  console.log('\n⭐  Témoignages')

  const testimonials = [
    { id: 'seed-testi-1', name: 'Maurice', quote: 'De tous mes voyages, je te mets sur la première marche.' },
    { id: 'seed-testi-2', name: 'Annie', quote: "J'ai enfin pu réaliser le voyage dont je rêvais et je me suis sentie en totale sécurité." },
    { id: 'seed-testi-3', name: 'Véronique', quote: "Plus riche, plus merveilleux encore que ce que j'imaginais." },
    { id: 'seed-testi-4', name: 'Christine & Jean-Marc', quote: 'La Thébaïde est un havre de paix… une semaine merveilleuse.' },
    { id: 'seed-testi-5', name: 'Allan', quote: 'Not just our travel agents, we feel like we made new friends.' },
    { id: 'seed-testi-6', name: 'Elisabeth', quote: 'Des moments exceptionnels… une organisation parfaite.' },
    { id: 'seed-testi-7', name: 'Mireille & Anaïs', quote: 'Croisière unique et intime… équipage bienveillant.' },
    { id: 'seed-testi-8', name: 'Nelly, Lucas & Victor', quote: 'Un voyage sur mesure, authentique et immersif.' },
    { id: 'seed-testi-9', name: 'Nicolas & famille', quote: 'Une croisière très confortable avec un personnel attentionné.' },
    { id: 'seed-testi-10', name: 'Patricia & Anne-Marie', quote: "Nous gardons d'excellents souvenirs… merci pour votre écoute." },
  ]

  for (const t of testimonials) {
    await upsert({
      _id: t.id,
      _type: 'testimonial',
      authorName: t.name,
      quote: t.quote,
      rating: 5,
      featured: true,
    })
  }
}

// ─── 8. Réglages du site ──────────────────────────────────
async function seedSiteSettings() {
  console.log('\n⚙️  Réglages du site')
  await upsert({
    _id: 'seed-site-settings',
    _type: 'siteSettings',
    siteName: 'Rendez-vous sur le Nil',
    tagline: 'Voyages premium en Égypte',
    whatsappNumber: '33601315023',
    whatsappDefaultMessage: "Bonjour Sophie, j'ai découvert Rendez-vous sur le Nil et je souhaite échanger avec vous sur un projet de voyage en Égypte 🌿",
    email: 'sophie@rendezvous-surlenil.com',
  })
}

// ─── 9. Lead Magnet — Guide PDF ───────────────────────────
async function seedLeadMagnet() {
  console.log('\n📥  Guide PDF')
  await upsert({
    _id: 'seed-lead-magnet',
    _type: 'leadMagnet',
    title: 'Le Guide Complet pour Voyager en Égypte',
    subtitle: 'Tout ce que vous devez savoir avant de partir',
    description: 'Destinations incontournables, conseils terrain, les erreurs à éviter, les bonnes adresses... Sophie partage tout dans ce guide de 20 pages.',
    pdfUrl: 'https://heyzine.com/flip-book/1ceed35b47.html',
    ctaLabel: 'Recevoir mon guide gratuit',
    thankYouMessage: 'Merci ! Votre guide arrive par email dans quelques minutes.',
    benefits: [
      'Les 10 incontournables en Égypte',
      'Quelle saison choisir selon votre style de voyage',
      'Croisière dahabiya vs circuit classique : le vrai comparatif',
      'Budget réaliste et conseils pratiques',
      'Les bonnes adresses de Sophie sur place',
    ],
  })
}

// ─── Main ──────────────────────────────────────────────────
async function main() {
  console.log(`\n🌍  Seed Rendez-vous sur le Nil → projet ${PROJECT_ID}\n`)

  const authorId = await seedAuthor()
  const catIds = await seedCategories()
  await seedPosts(authorId, catIds)
  await seedExperiences()
  await seedDahabiya()
  await seedPrivileges()
  await seedTestimonials()
  await seedSiteSettings()
  await seedLeadMagnet()

  console.log('\n✅  Seed terminé — rechargez le Studio Sanity pour voir le contenu.')
}

main().catch(err => {
  console.error('\n❌  Erreur :', err.message)
  process.exit(1)
})
