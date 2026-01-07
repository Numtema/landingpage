
import React, { useState } from 'react';
import { 
  Menu, X, MessageSquare, Smartphone, Zap, TrendingUp, ShieldCheck, Phone, ChevronDown, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { THEME, CONTENT } from './config';

// --- Vector Brand Components ---
const BrandIcons = {
  tara: () => (
    <svg width="40" height="40" md-width="48" md-height="48" viewBox="0 0 24 24" fill="none" className="text-blue-500">
      <path d="M12 2L4 9L12 22L20 9L12 2Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M4 9H20M12 2L8 9L12 22L16 9L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  ),
  orange: () => (
    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FF7900] rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 overflow-hidden">
      <div className="w-8 h-8 bg-black/10 rounded-sm transform rotate-12" />
    </div>
  ),
  mtn: () => (
    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FFCC00] rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
      <div className="w-8 h-4 bg-black/10 rounded-full" />
    </div>
  ),
  paypal: () => (
    <div className="w-12 h-8 md:w-14 md:h-10 bg-[#003087] rounded-lg flex items-center justify-center text-white font-black italic text-lg md:text-xl">P</div>
  ),
  visa: () => (
    <div className="w-14 h-8 md:w-16 md:h-10 bg-white/10 rounded flex flex-col justify-center px-2 border border-white/20">
      <div className="h-0.5 md:h-1 w-full bg-[#f7b600] rounded-full mb-1"></div>
      <div className="text-[8px] md:text-[10px] font-black italic text-white uppercase tracking-tighter">VISA</div>
    </div>
  ),
  mastercard: () => (
    <div className="flex -space-x-4 md:-space-x-5">
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#EB001B] opacity-90"></div>
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#F79E1B] opacity-90"></div>
    </div>
  ),
  google: () => (
    <div className="w-12 h-8 md:w-14 md:h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
      <span className="font-bold text-gray-500 text-xs md:text-sm">G Pay</span>
    </div>
  ),
  amazon: () => (
    <div className="w-12 h-8 md:w-14 md:h-10 flex items-center justify-center">
       <svg width="24" height="24" md-width="32" md-height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white">
          <path d="M5 10L12 6L19 10V14L12 18L5 14V10Z" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M5 10L12 14L19 10" strokeWidth="2" strokeLinejoin="round"/>
       </svg>
    </div>
  )
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-30px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 150);
  });

  return (
    <motion.header
      animate={hidden ? { y: -120, opacity: 0 } : { y: 0, opacity: 1 }}
      className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-6 pointer-events-none"
    >
      <div className="glass-dark h-16 md:h-20 w-full max-w-6xl rounded-full flex items-center justify-between px-6 md:px-8 pointer-events-auto shadow-2xl">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-[#FF4D00] rounded-full flex items-center justify-center text-white font-black text-lg md:text-xl">t</div>
          <div className="text-white font-black text-lg md:text-xl tracking-tighter">{CONTENT.brand.name}</div>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {CONTENT.navbar.links.map((link, idx) => (
            <a key={link.name} href={link.href} className={`text-[13px] font-bold transition-colors hover:text-[#FF4D00] ${idx === 0 ? 'text-white' : 'text-gray-400'}`}>
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="hidden sm:flex w-10 h-10 rounded-full border border-white/10 items-center justify-center text-[#FF4D00] hover:bg-white/5 transition-colors">
            <Phone size={18} />
          </button>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            className="bg-[#FF4D00] text-white px-5 md:px-7 h-10 md:h-12 rounded-full flex items-center gap-2 text-[11px] md:text-[13px] font-black uppercase tracking-widest shadow-lg shadow-orange-500/20"
          >
            <MessageSquare size={14} className="md:size-4" /> {CONTENT.navbar.cta}
          </motion.button>
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden flex w-10 h-10 items-center justify-center text-white"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-[#0A0A0A] z-[60] flex flex-col p-8 text-white pointer-events-auto"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="text-3xl font-black">tara<span className="text-[#FF4D00]">.</span></div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-3 bg-white/5 rounded-full"><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-6">
              {CONTENT.navbar.links.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-black tracking-tighter hover:text-[#FF4D00] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="mt-auto pt-10 border-t border-white/10 text-gray-500 text-sm font-bold">
              © 2025 TARA MONEY INC.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const yTranslate = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section className="relative pt-32 sm:pt-48 md:pt-60 pb-20 md:pb-32 px-4 md:px-6 overflow-hidden bg-white">
      <motion.div style={{ y: yTranslate }} className="absolute top-20 right-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-orange-100/40 rounded-full blur-[80px] sm:blur-[120px] -z-10" />
      <div className="max-w-5xl mx-auto text-center relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="inline-flex items-center gap-2 bg-[#FF4D00]/5 text-[#FF4D00] px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-8 sm:mb-12 border border-[#FF4D00]/10"
        >
           {CONTENT.hero.badge}
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          className={`${THEME.typography.hero} font-[900] mb-6 sm:mb-10 leading-[1] md:leading-[0.95] tracking-[-0.04em]`}
        >
          {CONTENT.hero.titlePart1} <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] to-[#FF8A00] italic">
            {CONTENT.hero.titlePart2}
          </span>
        </motion.h1>
        <motion.p className={`${THEME.typography.body} text-gray-400 mb-10 sm:mb-16 max-w-3xl mx-auto font-medium px-2 sm:px-0`}>
          {CONTENT.hero.description}
        </motion.p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            className="w-full sm:w-auto bg-[#FF4D00] text-white px-10 sm:px-14 py-4 sm:py-6 rounded-[1.5rem] sm:rounded-[2rem] font-black text-lg sm:text-xl shadow-[0_20px_40px_rgba(255,77,0,0.2)] md:shadow-[0_30px_60px_rgba(255,77,0,0.3)]"
          >
            {CONTENT.hero.primaryCTA}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            className="w-full sm:w-auto bg-white text-black border-2 border-gray-100 px-10 sm:px-14 py-4 sm:py-6 rounded-[1.5rem] sm:rounded-[2rem] font-black text-lg sm:text-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
          >
            <MessageSquare size={24} className="text-[#075E54]" /> {CONTENT.hero.secondaryCTA}
          </motion.button>
        </div>
      </div>
    </section>
  );
};

const Marquee = () => (
  <div className="py-4 sm:py-6 bg-black overflow-hidden whitespace-nowrap border-y border-white/10">
    <motion.div 
      animate={{ x: [0, -1000] }} 
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }} 
      className="inline-block"
    >
      {Array(6).fill(CONTENT.marquee).flat().map((item, i) => (
        <span key={i} className="text-white/30 text-[10px] sm:text-xs font-black mx-6 sm:mx-8 tracking-[0.3em] uppercase">
          {item} <span className="text-[#FF4D00] ml-3 sm:ml-4">•</span>
        </span>
      ))}
    </motion.div>
  </div>
);

const Features = () => (
  <section className={THEME.spacing.section} id="propos">
    <div className={THEME.spacing.container}>
      <div className="text-center mb-12 sm:mb-24">
        <h2 className={`${THEME.typography.h2} font-black mb-4 sm:mb-6 tracking-tighter`}>{CONTENT.features.title}</h2>
        <p className="text-lg sm:text-xl text-gray-400 font-bold italic">{CONTENT.features.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-12">
        {CONTENT.features.items.map((f, i) => (
          <motion.div 
            key={i} {...fadeInUp} 
            whileHover={{ y: -8 }} 
            className={`${THEME.spacing.cardPadding} ${THEME.radius.card} bg-gray-50 border border-gray-100 flex flex-col items-center md:items-start text-center md:text-left`}
          >
            <div className="mb-6 sm:mb-10 text-[#FF4D00]">
              {f.icon === 'smartphone' && <Smartphone size={32} md-size={40} />}
              {f.icon === 'zap' && <Zap size={32} md-size={40} />}
              {f.icon === 'shield' && <ShieldCheck size={32} md-size={40} />}
            </div>
            <h3 className={`${THEME.typography.h3} font-black mb-4 tracking-tight`}>{f.title}</h3>
            <p className="text-sm sm:text-base text-gray-500 font-medium leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const PaymentMethods = () => (
  <section className={`bg-white ${THEME.spacing.section}`} id="services">
    <div className={THEME.spacing.container}>
      <div className="text-center mb-12 sm:mb-24">
        <motion.h2 {...fadeInUp} className={`${THEME.typography.h2} font-black mb-4 sm:mb-8 tracking-tighter`}>{CONTENT.payments.title}</motion.h2>
        <motion.p {...fadeInUp} className="text-lg sm:text-xl text-gray-400 font-bold italic">{CONTENT.payments.subtitle}</motion.p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {CONTENT.payments.methods.map((m) => (
          <motion.div 
            key={m.id} {...fadeInUp} 
            whileHover={{ y: -8, scale: 1.01 }}
            className={`${m.color} ${THEME.spacing.cardPadding} ${THEME.radius.card} flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all border border-gray-100/10 min-h-[280px] sm:min-h-[360px] justify-center group`}
          >
            <div className="mb-6 sm:mb-10 group-hover:scale-110 transition-transform duration-300">
               {BrandIcons[m.id as keyof typeof BrandIcons] ? BrandIcons[m.id as keyof typeof BrandIcons]() : '💎'}
            </div>
            <h4 className={`font-black text-lg sm:text-xl mb-4 tracking-tighter uppercase ${m.dark ? 'text-white' : 'text-black'}`}>{m.name}</h4>
            <p className={`text-xs sm:text-sm font-bold leading-relaxed ${m.dark ? 'text-white/60' : 'text-gray-500'}`}>{m.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section className={`bg-gray-50 ${THEME.spacing.section}`} id="tarifs">
    <div className={THEME.spacing.container}>
      <div className="text-center mb-12 sm:mb-24">
        <h2 className={`${THEME.typography.h2} font-black tracking-tighter`}>{CONTENT.pricing.title}</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-md lg:max-w-none mx-auto lg:mx-0">
        {CONTENT.pricing.plans.map((p, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -12 }} 
            className={`${p.color} ${p.popular ? 'text-white scale-100 lg:scale-105 ring-4 ring-[#FF4D00]/20' : 'text-black'} ${THEME.spacing.cardPadding} ${THEME.radius.card} shadow-xl relative overflow-hidden transition-all duration-500`}
          >
            {p.popular && (
              <div className="absolute top-0 right-10 -translate-y-1/2 bg-[#0A0A0A] text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-black uppercase">
                Populaire
              </div>
            )}
            <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-widest opacity-50 mb-6 sm:mb-8">{p.name}</h3>
            <div className="text-4xl sm:text-5xl font-black mb-8 sm:mb-12 tracking-tighter">{p.price}</div>
            <ul className="space-y-4 sm:space-y-6 mb-10 sm:mb-16">
              {p.features.map((f, j) => (
                <li key={j} className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-black tracking-tight">
                  <CheckCircle2 size={18} className={p.popular ? "text-white" : "text-green-500"} /> {f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-4 sm:py-6 ${THEME.radius.button} font-black text-base sm:text-lg transition-all active:scale-95 ${p.popular ? 'bg-white text-[#FF4D00]' : 'bg-black text-white hover:bg-gray-900'}`}>
              Choisir
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-[#FF4D00] selection:text-white antialiased overflow-x-hidden">
      <Navbar />
      <Hero />
      <Marquee />
      <Features />
      <PaymentMethods />
      <Pricing />
      <footer className="bg-black text-white pt-20 sm:pt-40 pb-10 sm:pb-20 px-4 sm:px-6">
        <div className={THEME.spacing.container}>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-black mb-6 sm:mb-10">tara<span className="text-[#FF4D00]">.</span></div>
            <p className="text-gray-500 font-bold mb-12 sm:mb-20 italic text-sm sm:text-base">{CONTENT.brand.tagline}</p>
            <div className="pt-8 sm:pt-12 border-t border-white/5 text-[8px] sm:text-[10px] font-black text-gray-600 tracking-[0.3em] sm:tracking-[0.5em] uppercase">
              © 2025 TARA MONEY INC. REPRENONS LE CONTRÔLE.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
