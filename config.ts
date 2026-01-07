
/**
 * TARA MONEY - CONFIGURATION CENTRALE (Responsive Optimized)
 * Ce fichier contient les Design Tokens.
 */

export const THEME = {
  colors: {
    primary: "#FF4D00",
    primaryGradient: "linear-gradient(135deg, #FF4D00 0%, #FF8A00 100%)",
    dark: "#0A0A0A",
    white: "#FFFFFF",
    accent: "#3B82F6",
    gray: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      400: "#9CA3AF",
      500: "#6B7280",
      900: "#111827",
    },
    support: {
      mbuntu: { bg: "#FFFFFF", text: "#111111" },
      whatsapp: { bg: "#E7F9EE", text: "#075E54" },
      telegram: { bg: "#E5F4FB", text: "#0088CC" },
      calls: { bg: "#F0F9F4", text: "#00A859" },
      agent: { bg: "#FFF4EF", text: "#FF4D00" }
    }
  },
  typography: {
    hero: "text-4xl sm:text-6xl lg:text-8xl xl:text-[6.5rem]",
    h2: "text-3xl sm:text-5xl md:text-6xl lg:text-7xl",
    h3: "text-2xl sm:text-3xl",
    body: "text-base sm:text-lg md:text-xl",
  },
  radius: {
    pill: "rounded-full",
    card: "rounded-[2.5rem] sm:rounded-[4rem]",
    button: "rounded-2xl"
  },
  spacing: {
    section: "py-20 sm:py-32 md:py-40 lg:py-48",
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    cardPadding: "p-8 sm:p-10 md:p-12"
  }
};

export const CONTENT = {
  brand: {
    name: "tara.",
    tagline: "L'argent ne dort jamais, Tara non plus."
  },
  navbar: {
    links: [
      { name: 'Accueil', href: '#' },
      { name: 'Services', href: '#services' },
      { name: 'Tarifs', href: '#tarifs' }
    ],
    cta: "WhatsApp"
  },
  support: {
    headerTitle: "Support Tara",
    headerSub: "Nous sommes là pour vous aider",
    mainQuestion: "Comment préférez-vous nous contacter ?",
    availability: "Nos agents sont disponibles 24h/24 et 7j/7 pour vous accompagner dans vos démarches.",
  },
  footer: {
    description: "Simplifiez vos échanges d'argent en un message. Pas d'application, pas de complexité, juste vous et votre messagerie préférée.",
    columns: [
      {
        title: "Produit",
        links: [
          { name: "Transferts", href: "#" },
          { name: "Tontines", href: "#" },
          { name: "Paiement Marchand", href: "#" },
          { name: "API Business", href: "#" }
        ]
      },
      {
        title: "Compagnie",
        links: [
          { name: "À propos", href: "#" },
          { name: "Blog", href: "#" },
          { name: "Carrières", href: "#" },
          { name: "Contact", href: "#" }
        ]
      },
      {
        title: "Support",
        links: [
          { name: "Centre d'aide", href: "#" },
          { name: "Sécurité", href: "#" },
          { name: "Communauté", href: "#" }
        ]
      }
    ]
  },
  hero: {
    badge: "Simplifiez votre quotidien financier 🚀",
    titlePart1: "L'argent voyage",
    titlePart2: "par message.",
    description: "Inutile d'encombrer votre téléphone. Envoyez, recevez et gérez vos finances directement sur WhatsApp, Telegram ou par SMS.",
    primaryCTA: "Essayer Tara",
    secondaryCTA: "WhatsApp"
  },
  marquee: [
    "TRANSFERTS INSTANTANÉS", 
    "TONTINES DIGITALES", 
    "PAIEMENTS MARCHANDS", 
    "ZÉRO APPLICATION", 
    "SÉCURITÉ BANCAIRE", 
    "WHATSAPP & TELEGRAM"
  ],
  features: {
    title: "Pourquoi Tara ?",
    subtitle: '"L\'Afrique mérite le meilleur de la technologie financière."',
    items: [
      { 
        title: "Zéro Application", 
        desc: "Utilisez vos messageries habituelles sans rien installer de plus.", 
        icon: "smartphone" 
      },
      { 
        title: "Paiements SMS", 
        desc: "Tara fonctionne même sans connexion internet via SMS.", 
        icon: "zap" 
      },
      { 
        title: "Sécurité Maximale", 
        desc: "Chiffrement de bout en bout et validation multi-facteurs.", 
        icon: "shield" 
      }
    ]
  },
  payments: {
    title: "Encaissez partout.",
    methods: [
      { id: "tara", name: "TARA", desc: "Collectez via Tara partout.", color: "bg-white" },
      { id: "orange", name: "ORANGE MONEY", desc: "Intégration OM native.", color: "bg-[#FFF9F5]" },
      { id: "mtn", name: "MTN MOMO", desc: "Réception MTN instantanée.", color: "bg-[#FFFFF2]" },
      { id: "paypal", name: "PAYPAL", desc: "Paiements internationaux.", color: "bg-[#F0F7FF]" },
      { id: "visa", name: "VISA", desc: "Réseau mondial Visa.", color: "bg-[#1A3683]", dark: true },
      { id: "mastercard", name: "MASTERCARD", desc: "Mastercard sans frontières.", color: "bg-[#7E1D1D]", dark: true },
      { id: "google", name: "GOOGLE PAY", desc: "Paiement sans contact.", color: "bg-[#F3F4F6]" },
      { id: "amazon", name: "AMAZON PAY", desc: "Simplifiez vos achats.", color: "bg-[#1F2937]", dark: true },
    ]
  },
  pricing: {
    title: "Choisissez votre force.",
    plans: [
      { name: "Perso", price: "Gratuit", features: ["Chatbot standard", "Transferts illimités", "Support WhatsApp"], color: "bg-white" },
      { name: "Business", price: "30.000", features: ["Dashboard complet", "QR Codes custom", "Multi-comptes"], color: "bg-[#FF4D00]", popular: true },
      { name: "Enterprise", price: "Sur Devis", features: ["API sur mesure", "Reporting avancé", "Formation staff", "Account Manager"], color: "bg-black" }
    ]
  },
  finalCTA: {
    title: "Il est temps de passer à la vitesse supérieure.",
    desc: "Rejoignez la révolution financière conversationnelle. Pas de formulaires, pas d'attente.",
    button: "Commencer l'aventure",
    imageAlt: "Aperçu de l'interface"
  }
};
