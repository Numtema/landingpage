
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  MessageSquare, 
  Smartphone, 
  Globe, 
  Store, 
  CheckCircle2, 
  ArrowRight,
  ChevronDown,
  CreditCard,
  Zap,
  TrendingUp,
  ShieldCheck,
  SmartphoneNfc,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { LOGO, COLORS } from './constants';
import { PricingPlan, FAQItem } from './types';

// --- Professional Brand Icons (Custom SVGs) ---
const BrandIcons = {
  Tara: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L4 9L12 22L20 9L12 2Z" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M4 9H20" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 2L8 9L12 22L16 9L12 2Z" stroke="#3B82F6" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  ),
  Orange: () => (
    <div className="w-10 h-10 rounded-full bg-[#FF7900] shadow-[0_0_15px_rgba(255,121,0,0.4)]" />
  ),
  MTN: () => (
    <div className="w-10 h-10 rounded-full bg-[#FFCC00] shadow-[0_0_15px_rgba(255,204,0,0.4)]" />
  ),
  PayPal: () => (
    <div className="w-10 h-10 bg-[#003087] rounded-lg flex items-center justify-center text-white font-black text-xl italic shadow-lg">P</div>
  ),
  Visa: () => (
    <div className="w-14 h-8 bg-white/10 rounded border border-white/20 flex flex-col justify-center px-2">
      <div className="h-1 w-full bg-[#f7b600] rounded-full mb-1"></div>
      <div className="text-[10px] font-black italic tracking-tighter text-white">VISA</div>
    </div>
  ),
  Mastercard: () => (
    <div className="flex -space-x-4">
      <div className="w-8 h-8 rounded-full bg-[#EB001B]"></div>
      <div className="w-8 h-8 rounded-full bg-[#F79E1B] opacity-80"></div>
    </div>
  ),
  GooglePay: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="20" height="12" rx="2" fill="#5F6368" fillOpacity="0.1" stroke="#5F6368" strokeWidth="2"/>
      <circle cx="7" cy="12" r="2" fill="#4285F4"/>
      <circle cx="12" cy="12" r="2" fill="#EA4335"/>
      <circle cx="17" cy="12" r="2" fill="#FBBC05"/>
    </svg>
  ),
  AmazonPay: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 10L12 6L19 10V14L12 18L5 14V10Z" fill="white" fillOpacity="0.1" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M5 10L12 14L19 10" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M12 14V18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
};

// --- Shared Animations ---
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

// --- Custom Components ---

const Marquee = () => {
  const items = ["TRANSFERTS INSTANTANÉS", "TONTINES DIGITALES", "PAIEMENTS MARCHANDS", "ZÉRO APPLICATION", "SÉCURITÉ BANCAIRE", "WHATSAPP & TELEGRAM"];
  return (
    <div className="py-6 bg-black overflow-hidden whitespace-nowrap border-y border-white/10">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="inline-block"
      >
        {Array(4).fill(items).flat().map((item, i) => (
          <span key={i} className="text-white/30 text-xs font-black mx-8 tracking-[0.3em] uppercase">
            {item} <span className="text-[#FF4D00] ml-4">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { name: 'Accueil', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'Comment ça marche', href: '#comment' },
    { name: 'À propos', href: '#propos' },
    { name: 'FAQ', href: '#aide' }
  ];

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none"
      >
        <div className="glass-dark nav-pill h-16 md:h-20 w-full max-w-6xl rounded-full flex items-center justify-between px-4 md:px-8 pointer-events-auto">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF4D00] rounded-full flex items-center justify-center text-white font-black text-xl">t</div>
            <div className="hidden sm:block text-white font-black text-xl tracking-tighter">tara.</div>
          </div>

          {/* Center: Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-[13px] font-bold tracking-tight transition-colors hover:text-[#FF4D00] ${idx === 0 ? 'text-white' : 'text-gray-400'}`}
              >
                {link.name}
                {idx === 0 && <motion.div layoutId="underline" className="h-0.5 bg-[#FF4D00] w-full mt-0.5 rounded-full" />}
              </a>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex w-10 h-10 rounded-full border border-white/10 items-center justify-center text-[#FF4D00] hover:bg-white/5 transition-colors">
              <Phone size={18} />
            </button>
            <div className="h-8 w-[1px] bg-white/10 hidden sm:block mx-2"></div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#FF4D00] text-white px-5 md:px-7 h-10 md:h-12 rounded-full flex items-center gap-2 text-[13px] font-black uppercase tracking-widest shadow-lg shadow-orange-500/20"
            >
              <MessageSquare size={16} />
              <span className="hidden md:inline">WhatsApp</span>
            </motion.button>
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-[#0A0A0A] z-[60] flex flex-col p-10 text-white"
          >
            <div className="flex justify-between items-center mb-20">
              <div className="text-3xl font-black">tara<span className="text-[#FF4D00]">.</span></div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-4 bg-white/5 rounded-full"><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map(link => (
                <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-5xl font-black tracking-tighter hover:text-[#FF4D00] transition-colors">{link.name}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  
  return (
    <section className="relative pt-60 pb-32 px-6 overflow-hidden bg-[#fff]">
      <motion.div style={{ y: y1 }} className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[120px] -z-10" />
      <motion.div style={{ y: y1 }} className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-[100px] -z-10" />

      <div className="max-w-5xl mx-auto text-center relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 bg-[#FF4D00]/5 text-[#FF4D00] px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-12 border border-[#FF4D00]/10"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF4D00] animate-pulse" />
          Simplifiez votre quotidien financier 🚀
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="text-6xl md:text-[6.5rem] font-[900] mb-10 leading-[0.95] tracking-[-0.04em] text-[#0A0A0A]"
        >
          L'argent voyage <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] to-[#FF8A00] italic">par message.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          Pas d'application. Pas de complexité. Envoyez, recevez et gérez vos tontines directement sur WhatsApp, Telegram ou par SMS.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.button 
            whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto bg-[#FF4D00] text-white px-14 py-6 rounded-[2rem] font-black text-xl shadow-[0_30px_60px_rgba(255,77,0,0.3)]"
          >
            Essayer Tara
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto bg-white text-black border-2 border-gray-100 px-14 py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all"
          >
            <MessageSquare size={24} className="text-[#075E54]" /> WhatsApp
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

const PaymentMethods = () => {
  const methods = [
    { name: "TARA", desc: "Payez et collectez via Tara partout dans le monde.", color: "bg-white", icon: <BrandIcons.Tara />, textColor: "text-gray-500" },
    { name: "ORANGE MONEY", desc: "Transactions sécurisées au Cameroun & Afrique.", color: "bg-[#FFF9F5]", icon: <BrandIcons.Orange />, textColor: "text-gray-500" },
    { name: "MTN MOMO", desc: "Envoyez et recevez facilement via MTN.", color: "bg-[#FFFFF2]", icon: <BrandIcons.MTN />, textColor: "text-gray-500" },
    { name: "PAYPAL", desc: "Acceptez les paiements mondiaux sécurisés.", color: "bg-[#F0F7FF]", icon: <BrandIcons.PayPal />, textColor: "text-gray-500" },
    { name: "VISA", desc: "Connecté au réseau mondial de paiement.", color: "bg-[#1A3683]", icon: <BrandIcons.Visa />, textColor: "text-white/70" },
    { name: "MASTERCARD", desc: "Solutions de paiement sans frontières.", color: "bg-[#7E1D1D]", icon: <BrandIcons.Mastercard />, textColor: "text-white/70" },
    { name: "GOOGLE PAY", desc: "Paiement sans contact en un clic.", color: "bg-[#F3F4F6]", icon: <BrandIcons.GooglePay />, textColor: "text-gray-500" },
    { name: "AMAZON PAY", desc: "Simplifiez vos achats en ligne.", color: "bg-[#1F2937]", icon: <BrandIcons.AmazonPay />, textColor: "text-gray-400" },
  ];

  return (
    <section className="py-32 bg-white px-6" id="services">
      <div className="max-w-7xl mx-auto text-center mb-24">
        <motion.h2 {...fadeInUp} className="text-5xl md:text-6xl font-black mb-8 tracking-tighter">Encaissez partout.</motion.h2>
        <motion.p {...fadeInUp} className="text-xl text-gray-400 font-bold italic">"Toutes les méthodes que vos clients adorent, en un seul endroit."</motion.p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {methods.map((m, i) => (
          <motion.div 
            key={i} 
            {...fadeInUp}
            whileHover={{ y: -12, scale: 1.02 }}
            className={`${m.color} p-12 rounded-[3.5rem] flex flex-col items-center text-center shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100/10 min-h-[360px] justify-center group`}
          >
             <div className="mb-10 group-hover:scale-110 transition-transform duration-500">{m.icon}</div>
             <h4 className={`font-black text-xl mb-6 tracking-tighter uppercase ${m.textColor.includes('white') ? 'text-white' : 'text-black'}`}>{m.name}</h4>
             <p className={`text-sm font-bold leading-relaxed ${m.textColor}`}>
               {m.desc}
             </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const BusinessDashboard = () => (
  <section className="py-32 bg-[#F9FAFB] px-6" id="comment">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
      <motion.div {...fadeInUp}>
        <span className="text-[#FF4D00] font-black uppercase tracking-widest text-xs mb-6 block">Interface Marchande</span>
        <h2 className="text-5xl md:text-6xl font-[900] mb-8 leading-tight tracking-tighter">
          Gérez votre business <br /> du bout des doigts.
        </h2>
        <p className="text-xl text-gray-500 font-medium mb-12 leading-relaxed">
          Un tableau de bord épuré pour suivre chaque vente, chaque client et chaque tontine en temps réel. Pas besoin d'être un expert.
        </p>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <TrendingUp size={32} className="text-green-500 mb-4" />
            <p className="text-3xl font-black">15.4M</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Volume Mensuel</p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <Zap size={32} className="text-orange-500 mb-4" />
            <p className="text-3xl font-black">1,240</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Transactions</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}
        className="relative"
      >
        <div className="absolute -inset-10 bg-[#FF4D00]/5 rounded-full blur-[120px]" />
        <img 
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000" 
          alt="Dashboard Preview" 
          className="rounded-[3rem] shadow-2xl relative z-10 border-[1px] border-gray-200"
        />
      </motion.div>
    </div>
  </section>
);

const FeaturesGrid = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1]);
  
  return (
    <motion.section style={{ scale }} className="py-32 px-6 bg-black text-white rounded-[4rem] mx-4 md:mx-10 my-20 overflow-hidden relative" id="propos">
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#FF4D00]/20 rounded-full blur-[150px]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Pourquoi Tara ?</h2>
          <p className="text-xl text-gray-400 font-bold italic">"L'Afrique mérite le meilleur de la technologie financière."</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            { t: "Zéro Application", d: "Inutile d'encombrer votre téléphone. Tout se passe sur vos messageries.", i: <Smartphone size={40} className="text-[#FF4D00]" /> },
            { t: "Paiements SMS", d: "Même sans internet, Tara reste à vos côtés via le protocole SMS.", i: <Zap size={40} className="text-yellow-400" /> },
            { t: "Sécurité Maximale", d: "Protocoles de chiffrement bancaire et validation multi-facteurs.", i: <ShieldCheck size={40} className="text-blue-400" /> }
          ].map((f, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="mb-10">{f.i}</div>
              <h3 className="text-3xl font-black mb-6 tracking-tight">{f.t}</h3>
              <p className="text-gray-400 font-medium leading-relaxed">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const ComparisonSection = () => (
  <section className="py-32 bg-white px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h2 className="text-5xl md:text-6xl font-black mb-10 tracking-tighter">Avant vs Après Tara</h2>
        <div className="w-24 h-2 bg-[#FF4D00] mx-auto rounded-full" />
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          className="bg-red-50/50 p-16 rounded-[4rem] border border-red-100"
        >
          <div className="flex items-center gap-4 mb-12 text-red-500">
            <X size={32} strokeWidth={3} />
            <h3 className="text-3xl font-black uppercase tracking-widest">Avant</h3>
          </div>
          <ul className="space-y-8">
            {["Files d'attentes interminables", "Frais de retraits cachés", "Gestion tontine manuelle à risque", "Pas de suivi en temps réel"].map((t, i) => (
              <li key={i} className="flex items-center gap-6 text-xl font-bold text-gray-700">
                <span className="w-2 h-2 rounded-full bg-red-400" /> {t}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
          className="bg-green-50/50 p-16 rounded-[4rem] border border-green-100 shadow-2xl shadow-green-500/5"
        >
          <div className="flex items-center gap-4 mb-12 text-green-500">
            <CheckCircle2 size={32} strokeWidth={3} />
            <h3 className="text-3xl font-black uppercase tracking-widest">Après</h3>
          </div>
          <ul className="space-y-8">
            {["Tout se fait en 2 secondes", "Transparence totale des frais", "Tontines sécurisées par IA", "Alertes instantanées WhatsApp"].map((t, i) => (
              <li key={i} className="flex items-center gap-6 text-xl font-[900] text-gray-800">
                <CheckCircle2 size={24} className="text-green-500" /> {t}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  </section>
);

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const plans = [
    { name: "Perso", price: "Gratuit", feat: ["Chatbot standard", "Transferts illimités", "WhatsApp", "Support mail"], c: "bg-white" },
    { name: "Business", price: isAnnual ? "22.500" : "30.000", feat: ["Dashboard complet", "QR Codes custom", "Multi-comptes", "Support 24/7"], c: "bg-[#FF4D00] text-white", p: true },
    { name: "Enterprise", price: "Sur Devis", feat: ["API sur mesure", "Formation staff", "Reporting avancé", "Chargé de compte"], c: "bg-black text-white" }
  ];

  return (
    <section className="py-32 bg-[#F9FAFB] px-6" id="tarifs">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-black mb-12 tracking-tighter">Choisissez votre force.</h2>
          <div className="flex items-center justify-center gap-6">
            <span className={`text-sm font-black uppercase ${!isAnnual ? 'text-black' : 'text-gray-300'}`}>Mensuel</span>
            <button onClick={() => setIsAnnual(!isAnnual)} className="w-16 h-8 bg-gray-200 rounded-full p-1">
              <motion.div animate={{ x: isAnnual ? 32 : 0 }} className="w-6 h-6 bg-white rounded-full shadow-sm" />
            </button>
            <span className={`text-sm font-black uppercase ${isAnnual ? 'text-black' : 'text-gray-300'}`}>Annuel <span className="text-[#FF4D00]">-25%</span></span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <motion.div key={i} whileHover={{ y: -20 }} className={`${p.c} p-14 rounded-[4rem] shadow-xl relative overflow-hidden transition-all duration-500`}>
              {p.p && <div className="absolute top-0 right-14 -translate-y-1/2 bg-black text-white px-6 py-2 rounded-full text-[10px] font-black uppercase">Plus Populaire</div>}
              <h3 className="text-xs font-black uppercase tracking-[0.3em] opacity-50 mb-8">{p.name}</h3>
              <div className="text-5xl font-black mb-12 tracking-tighter">
                {p.price}{typeof p.price === 'string' && !p.price.includes('XAF') ? '' : <span className="text-xs ml-2">XAF/m</span>}
              </div>
              <ul className="space-y-6 mb-16">
                {p.feat.map((f, j) => (
                  <li key={j} className="flex items-center gap-4 text-sm font-black tracking-tight">
                    <CheckCircle2 size={20} className={p.p ? "text-white" : "text-green-500"} /> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-6 rounded-3xl font-black text-lg transition-all ${p.p ? 'bg-white text-[#FF4D00]' : 'bg-black text-white hover:bg-gray-900'}`}>Commencer</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [active, setActive] = useState<number | null>(null);
  const faqs = [
    { q: "Comment envoyer de l'argent via WhatsApp ?", a: "Démarrez simplement une conversation avec notre chatbot officiel et tapez 'Envoyer'." },
    { q: "Dois-je télécharger une application ?", a: "Absolument pas. Tara est une solution 100% conversationnelle intégrée à vos messageries préférées." },
    { q: "Est-ce disponible hors-connexion ?", a: "Oui, via notre service SMS dédié, vous pouvez effectuer des transactions même sans internet." },
    { q: "Quels sont les frais ?", a: "Pour les particuliers, c'est gratuit. Pour les entreprises, les frais varient de 2.5% à 10% selon le forfait choisi." }
  ];

  return (
    <section className="py-32 bg-white px-6" id="aide">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black mb-6">Questions ?</h2>
          <p className="text-xl text-gray-400 font-bold italic">"Trouvez toutes les réponses."</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-2 border-gray-50 rounded-[2rem] overflow-hidden transition-all hover:border-gray-100">
              <button 
                onClick={() => setActive(active === i ? null : i)}
                className="w-full p-8 flex items-center justify-between text-left group"
              >
                <span className="text-xl font-black text-gray-800 group-hover:text-[#FF4D00] transition-colors">{faq.q}</span>
                <motion.div animate={{ rotate: active === i ? 180 : 0 }}>
                  <ChevronDown size={24} className="text-gray-300" />
                </motion.div>
              </button>
              <AnimatePresence>
                {active === i && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="bg-gray-50/50"
                  >
                    <p className="p-8 pt-0 text-gray-500 font-bold leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-black text-white pt-32 pb-16 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-20 mb-32">
        <div className="col-span-1">
          <div className="text-4xl font-black mb-10">tara<span className="text-[#FF4D00]">.</span></div>
          <p className="text-gray-500 font-bold text-sm leading-relaxed mb-10 italic">"L'argent ne dort jamais, Tara non plus."</p>
          <div className="flex gap-4">
            {['FB', 'IG', 'LI'].map(s => <div key={s} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black hover:bg-[#FF4D00] cursor-pointer transition-all">{s}</div>)}
          </div>
        </div>
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 mb-10">Solutions</h4>
          <ul className="space-y-4 text-sm font-black text-gray-400">
            {['Paiements', 'Tontines', 'Transferts', 'Marchands'].map(l => <li key={l} className="hover:text-white cursor-pointer transition-colors tracking-widest">{l}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 mb-10">Support</h4>
          <ul className="space-y-4 text-sm font-black text-gray-400">
            {['Aide', 'Sécurité', 'Confidentialité', 'Conditions'].map(l => <li key={l} className="hover:text-white cursor-pointer transition-colors tracking-widest">{l}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 mb-10">Contact</h4>
          <p className="text-white font-black text-lg mb-4">hello@dikalo.co</p>
          <p className="text-gray-500 font-bold mb-10">+237 650 07 43 89</p>
          <button className="bg-[#FF4D00] text-white w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-orange-500/20">Canal WhatsApp</button>
        </div>
      </div>
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black text-gray-600 tracking-[0.5em] uppercase">
        <p>© 2025 TARA MONEY INC.</p>
        <p>REPRENONS LE CONTRÔLE.</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Marquee />
      <FeaturesGrid />
      <BusinessDashboard />
      <PaymentMethods />
      <ComparisonSection />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}
