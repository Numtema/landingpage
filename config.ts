
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
    card: "rounded-[2rem] sm:rounded-[3rem]",
    button: "rounded-2xl"
  },
  spacing: {
    section: "py-16 sm:py-24 md:py-32 lg:py-40",
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    cardPadding: "p-6 sm:p-8 md:p-10 lg:p-12"
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
      { name: 'Comment ça marche', href: '#comment' },
      { name: 'Tarifs', href: '#tarifs' },
      { name: 'Aide', href: '#aide' }
    ],
    cta: "WhatsApp"
  },
  hero: {
    badge: "Simplifiez votre quotidien financier 🚀",
    titlePart1: "L'argent voyage",
    titlePart2: "par message.",
    description: "Pas d'application. Pas de complexité. Envoyez, recevez et gérez vos tontines directement sur WhatsApp, Telegram ou par SMS.",
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
        desc: "Inutile d'encombrer votre téléphone. Tout se passe sur vos messageries.", 
        icon: "smartphone" 
      },
      { 
        title: "Paiements SMS", 
        desc: "Même sans internet, Tara reste à vos côtés via le protocole SMS.", 
        icon: "zap" 
      },
      { 
        title: "Sécurité Maximale", 
        desc: "Protocoles de chiffrement bancaire et validation multi-facteurs.", 
        icon: "shield" 
      }
    ]
  },
  payments: {
    title: "Encaissez partout.",
    subtitle: '"Toutes les méthodes que vos clients adorent, en un seul endroit."',
    methods: [
      { id: "tara", name: "TARA", desc: "Payez et collectez via Tara partout.", color: "bg-white" },
      { id: "orange", name: "ORANGE MONEY", desc: "Transactions sécurisées OM.", color: "bg-[#FFF9F5]" },
      { id: "mtn", name: "MTN MOMO", desc: "Envoyez et recevez via MTN.", color: "bg-[#FFFFF2]" },
      { id: "paypal", name: "PAYPAL", desc: "Paiements mondiaux sécurisés.", color: "bg-[#F0F7FF]" },
      { id: "visa", name: "VISA", desc: "Réseau mondial de paiement.", color: "bg-[#1A3683]", dark: true },
      { id: "mastercard", name: "MASTERCARD", desc: "Solutions sans frontières.", color: "bg-[#7E1D1D]", dark: true },
      { id: "google", name: "GOOGLE PAY", desc: "Paiement sans contact.", color: "bg-[#F3F4F6]" },
      { id: "amazon", name: "AMAZON PAY", desc: "Simplifiez vos achats.", color: "bg-[#1F2937]", dark: true },
    ]
  },
  pricing: {
    title: "Choisissez votre force.",
    plans: [
      { name: "Perso", price: "Gratuit", features: ["Chatbot standard", "Transferts illimités", "WhatsApp"], color: "bg-white" },
      { name: "Business", price: "30.000", features: ["Dashboard complet", "QR Codes custom", "Multi-comptes"], color: "bg-[#FF4D00]", popular: true },
      { name: "Enterprise", price: "Sur Devis", features: ["API sur mesure", "Reporting avancé", "Formation staff"], color: "bg-black" }
    ]
  }
};
