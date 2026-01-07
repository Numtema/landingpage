
import React, { useState } from 'react';
import { 
  Menu, X, MessageSquare, Smartphone, Zap, ShieldCheck, Phone, CheckCircle2,
  Instagram, Twitter, Linkedin, Facebook, ArrowRight, Bell, MessageCircle, Send, UserRound
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { THEME, CONTENT } from './config';

// --- Animation Variants ---
const anim = {
  pulse: {
    scale: [1, 1.03, 1],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
  },
  rubberBand: {
    scaleX: [1, 1.15, 0.85, 1.1, 0.95, 1.05, 1],
    scaleY: [1, 0.85, 1.15, 0.95, 1.05, 0.95, 1],
    transition: { duration: 0.7 }
  },
  tada: {
    scale: [1, 0.95, 1.05, 1.05, 1.05, 1],
    rotate: [0, -2, 2, -2, 2, 0],
    transition: { duration: 0.6 }
  },
  backInUp: {
    initial: { y: 60, scale: 0.9, opacity: 0 },
    animate: { y: 0, scale: 1, opacity: 1 },
    transition: { type: "spring", damping: 20, stiffness: 100 }
  },
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10%" },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  zoomIn: {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { type: "spring", damping: 15, stiffness: 80 }
  }
};

// --- Brand Icons ---
const BrandIcons = {
  tara: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-blue-500">
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
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white">
          <path d="M5 10L12 6L19 10V14L12 18L5 14V10Z" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M5 10L12 14L19 10" strokeWidth="2" strokeLinejoin="round"/>
       </svg>
    </div>
  )
};

// --- Support Components ---
const SupportButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="fixed bottom-8 right-8 w-16 h-16 bg-[#FF4D00] rounded-full flex items-center justify-center text-white shadow-xl shadow-orange-500/30 hover:scale-110 transition-all active:scale-95 z-[90] group border-4 border-white"
    aria-label="Ouvrir le support"
  >
    <Bell size={32} className="group-hover:animate-bounce" />
    <span className="absolute right-20 bg-white text-gray-900 px-4 py-2 rounded-xl text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-gray-100">
      Besoin d'aide ?
    </span>
  </button>
);

const SupportMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  const tc = THEME.colors.support;
  const content = CONTENT.support;

  const options = [
    {
      name: 'Mbuntu',
      icon: (
        <div className="w-8 h-8 bg-[#FF4D00] rounded-full flex items-center justify-center text-white font-bold text-xs italic">
          M
        </div>
      ),
      bgColor: tc.mbuntu.bg,
      textColor: tc.mbuntu.text,
      iconBg: 'bg-white shadow-md'
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-7 h-7 text-[#25D366] fill-[#25D366]/10" />,
      bgColor: tc.whatsapp.bg,
      textColor: tc.whatsapp.text,
      iconBg: 'bg-white shadow-md'
    },
    {
      name: 'Telegram',
      icon: <Send className="w-7 h-7 text-[#0088CC] fill-[#0088CC]/10" />,
      bgColor: tc.telegram.bg,
      textColor: tc.telegram.text,
      iconBg: 'bg-white shadow-md'
    },
    {
      name: 'Appelez-nous',
      icon: <Phone className="w-7 h-7 text-[#00A859] fill-[#00A859]/10" />,
      bgColor: tc.calls.bg,
      textColor: tc.calls.text,
      iconBg: 'bg-white shadow-md'
    },
    {
      name: 'Appelez Agent assistant',
      icon: <UserRound className="w-7 h-7 text-[#FF4D00] fill-[#FF4D00]/10" />,
      bgColor: tc.agent.bg,
      textColor: tc.agent.text,
      iconBg: 'bg-white shadow-md'
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" 
        onClick={onClose} 
      />
      
      <motion.div 
        initial={{ y: '100%' }} 
        animate={{ y: 0 }} 
        exit={{ y: '100%' }}
        className="relative w-full max-w-lg bg-[#F9F9F9] rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div style={{ backgroundColor: THEME.colors.primary }} className="p-7 text-white relative">
          <button onClick={onClose} className="absolute top-7 right-7 hover:bg-white/20 p-1.5 rounded-full transition-all active:scale-90">
            <X size={26} strokeWidth={2.5} />
          </button>
          <h2 className="text-2xl font-black tracking-tight">{content.headerTitle}</h2>
          <p className="text-[15px] opacity-90 mt-0.5 font-bold tracking-tight">{content.headerSub}</p>
        </div>

        {/* Options */}
        <div className="p-8 md:p-10 pb-12">
          <h3 className="text-[1.85rem] leading-[1.1] font-black text-[#111111] mb-10 max-w-[90%] tracking-tighter">
            {content.mainQuestion}
          </h3>

          <div className="space-y-4 flex flex-col">
            {options.map((option) => (
              <button
                key={option.name}
                style={{ backgroundColor: option.bgColor }}
                className="w-full hover:brightness-95 active:scale-[0.98] transition-all flex items-center gap-5 p-5 rounded-[2rem] shadow-sm border border-black/5 text-left group"
              >
                <div className={`w-14 h-14 flex items-center justify-center rounded-full ${option.iconBg} shrink-0`}>
                  {option.icon}
                </div>
                <span className="text-2xl font-black tracking-tighter" style={{ color: option.textColor }}>
                  {option.name}
                </span>
              </button>
            ))}
          </div>

          <footer className="mt-12 text-center px-4">
            <p className="text-[13px] italic text-gray-400 font-black leading-relaxed">
              {content.availability}
            </p>
          </footer>
        </div>
      </motion.div>
    </div>
  );
};

// --- Components ---
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
            <a key={link.name} href={link.href} className={`text-[13px] font-bold transition-colors hover:text-[#FF4D00] ${idx === 0 ? 'text-white' : 'text-gray-400'}`}>{link.name}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2 md:gap-4">
          <motion.button whileHover={anim.rubberBand} className="bg-[#FF4D00] text-white px-5 md:px-7 h-10 md:h-12 rounded-full flex items-center gap-2 text-[11px] md:text-[13px] font-black uppercase tracking-widest shadow-lg">
            <MessageSquare size={14} /> {CONTENT.navbar.cta}
          </motion.button>
          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden flex w-10 h-10 items-center justify-center text-white"><Menu size={24} /></button>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} className="fixed inset-0 bg-[#0A0A0A] z-[60] flex flex-col p-8 text-white pointer-events-auto">
            <div className="flex justify-between items-center mb-16"><div className="text-3xl font-black">tara<span className="text-[#FF4D00]">.</span></div><button onClick={() => setMobileMenuOpen(false)} className="p-3 bg-white/5 rounded-full"><X size={32} /></button></div>
            <div className="flex flex-col gap-6">{CONTENT.navbar.links.map(link => (<motion.a initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-4xl font-black tracking-tighter hover:text-[#FF4D00] transition-colors">{link.name}</motion.a>))}</div>
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
        <motion.div variants={anim.backInUp} initial="initial" animate="animate" className="inline-block"><motion.div animate={anim.pulse} className="inline-flex items-center gap-2 bg-[#FF4D00]/5 text-[#FF4D00] px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-8 sm:mb-12 border border-[#FF4D00]/10">{CONTENT.hero.badge}</motion.div></motion.div>
        <motion.h1 variants={anim.fadeInUp} initial="initial" whileInView="whileInView" className={`${THEME.typography.hero} font-[900] mb-6 sm:mb-10 leading-[1] md:leading-[0.95] tracking-[-0.04em]`}>{CONTENT.hero.titlePart1} <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] to-[#FF8A00] italic">{CONTENT.hero.titlePart2}</span></motion.h1>
        <motion.p variants={anim.fadeInUp} initial="initial" whileInView="whileInView" transition={{ delay: 0.1 }} className={`${THEME.typography.body} text-gray-400 mb-10 sm:mb-16 max-w-3xl mx-auto font-medium px-2 sm:px-0`}>{CONTENT.hero.description}</motion.p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <motion.button variants={anim.zoomIn} initial="initial" whileInView="whileInView" whileHover={anim.rubberBand} className="w-full sm:w-auto bg-[#FF4D00] text-white px-10 sm:px-14 py-4 sm:py-6 rounded-[1.5rem] sm:rounded-[2rem] font-black text-lg sm:text-xl shadow-lg shadow-orange-500/30">{CONTENT.hero.primaryCTA}</motion.button>
          <motion.button variants={anim.zoomIn} initial="initial" whileInView="whileInView" transition={{ delay: 0.1 }} whileHover={anim.tada} className="w-full sm:w-auto bg-white text-black border-2 border-gray-100 px-10 sm:px-14 py-4 sm:py-6 rounded-[1.5rem] sm:rounded-[2rem] font-black text-lg sm:text-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"><MessageSquare size={24} className="text-[#075E54]" /> {CONTENT.hero.secondaryCTA}</motion.button>
        </div>
      </div>
    </section>
  );
};

const Marquee = () => (
  <div className="py-4 sm:py-6 bg-black overflow-hidden whitespace-nowrap border-y border-white/10">
    <motion.div animate={{ x: [0, -1000] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="inline-block">{Array(6).fill(CONTENT.marquee).flat().map((item, i) => (<span key={i} className="text-white/30 text-[10px] sm:text-xs font-black mx-6 sm:mx-8 tracking-[0.3em] uppercase">{item} <span className="text-[#FF4D00] ml-3 sm:ml-4">•</span></span>))}</motion.div>
  </div>
);

const Features = () => (
  <section className={THEME.spacing.section} id="propos">
    <div className={THEME.spacing.container}>
      <div className="text-center mb-12 sm:mb-24"><motion.h2 variants={anim.fadeInUp} initial="initial" whileInView="whileInView" className={`${THEME.typography.h2} font-black mb-4 sm:mb-6 tracking-tighter`}>{CONTENT.features.title}</motion.h2><motion.p variants={anim.fadeInUp} initial="initial" whileInView="whileInView" transition={{ delay: 0.1 }} className="text-lg sm:text-xl text-gray-400 font-bold italic">{CONTENT.features.subtitle}</motion.p></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-12">
        {CONTENT.features.items.map((f, i) => (
          <motion.div key={i} variants={anim.fadeInUp} initial="initial" whileInView="whileInView" transition={{ delay: i * 0.1 }} whileHover={{ y: -8 }} className={`${THEME.spacing.cardPadding} ${THEME.radius.card} bg-gray-50 border border-gray-100 flex flex-col items-center md:items-start text-center md:text-left group`}>
            <motion.div whileHover={anim.tada} className="mb-6 sm:mb-10 text-[#FF4D00]">{f.icon === 'smartphone' && <Smartphone size={40} />}{f.icon === 'zap' && <Zap size={40} />}{f.icon === 'shield' && <ShieldCheck size={40} />}</motion.div>
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
      <div className="text-center mb-12 sm:mb-24"><motion.h2 variants={anim.fadeInUp} initial="initial" whileInView="whileInView" className={`${THEME.typography.h2} font-black mb-4 sm:mb-8 tracking-tighter`}>{CONTENT.payments.title}</motion.h2></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {CONTENT.payments.methods.map((m, i) => (
          <motion.div key={m.id} variants={anim.zoomIn} initial="initial" whileInView="whileInView" transition={{ delay: i * 0.05 }} whileHover={{ y: -5, scale: 1.02 }} className={`${m.color} ${THEME.spacing.cardPadding} ${THEME.radius.card} flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all border border-gray-100/10 min-h-[280px] sm:min-h-[360px] justify-center group`}>
            <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} className="mb-6 sm:mb-10 group-hover:scale-110 transition-transform duration-300">{BrandIcons[m.id as keyof typeof BrandIcons] ? BrandIcons[m.id as keyof typeof BrandIcons]() : '💎'}</motion.div>
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
      <div className="text-center mb-12 sm:mb-24"><motion.h2 variants={anim.fadeInUp} initial="initial" whileInView="whileInView" className={`${THEME.typography.h2} font-black tracking-tighter`}>{CONTENT.pricing.title}</motion.h2></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-md lg:max-w-none mx-auto lg:mx-0">
        {CONTENT.pricing.plans.map((p, i) => {
          // Robust dark background detection
          const isDarkBg = p.color === 'bg-black' || p.color === 'bg-[#FF4D00]';
          const textColor = isDarkBg ? 'text-white' : 'text-[#0A0A0A]';
          const featureIconColor = isDarkBg ? 'text-white' : 'text-[#22C55E]';
          const buttonBg = isDarkBg ? 'bg-white' : 'bg-black';
          const buttonText = isDarkBg ? 'text-[#FF4D00]' : 'text-white';

          return (
            <motion.div 
              key={i} 
              variants={anim.zoomIn} 
              initial="initial" 
              whileInView="whileInView" 
              transition={{ delay: i * 0.1 }} 
              whileHover={{ y: -12 }} 
              className={`${p.color} ${textColor} ${p.popular ? 'scale-100 lg:scale-105 ring-4 ring-[#FF4D00]/20' : ''} ${THEME.spacing.cardPadding} ${THEME.radius.card} shadow-2xl relative overflow-hidden transition-all duration-500`}
            >
              {p.popular && <motion.div animate={anim.pulse} className="absolute top-0 right-10 -translate-y-1/2 bg-[#0A0A0A] text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-black uppercase">Populaire</motion.div>}
              <h3 className={`text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] ${isDarkBg ? 'opacity-70' : 'opacity-40'} mb-6 sm:mb-8`}>{p.name}</h3>
              <div className="text-4xl sm:text-6xl font-black mb-8 sm:mb-12 tracking-tighter">{p.price}</div>
              <ul className="space-y-4 sm:space-y-6 mb-10 sm:mb-16">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 sm:gap-4 text-xs sm:text-base font-black tracking-tight leading-tight">
                    <CheckCircle2 size={20} className={featureIconColor} /> 
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <motion.button 
                whileHover={anim.rubberBand} 
                whileTap={{ scale: 0.95 }} 
                className={`w-full py-5 sm:py-7 ${THEME.radius.button} font-black text-lg sm:text-xl transition-all ${buttonBg} ${buttonText} hover:shadow-xl`}
              >
                Choisir
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
    <div className={THEME.spacing.container}>
      <motion.div 
        variants={anim.fadeInUp} initial="initial" whileInView="whileInView"
        className="bg-[#0A0A0A] rounded-[3rem] md:rounded-[5rem] p-10 sm:p-24 text-white relative overflow-hidden flex flex-col lg:flex-row items-center gap-20 group"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,#FF4D00_0%,transparent_50%)] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,#FF4D00_0%,transparent_50%)] opacity-10 pointer-events-none" />
        
        <div className="flex-1 text-center lg:text-left relative z-10">
          <h2 className="text-4xl sm:text-7xl font-black mb-8 leading-[0.95] tracking-tighter">
            {CONTENT.finalCTA.title}
          </h2>
          <p className="text-lg sm:text-2xl text-gray-400 font-bold mb-12 max-w-xl italic">
            {CONTENT.finalCTA.desc}
          </p>
          <motion.button 
            whileHover={{ scale: 1.05, x: 10 }}
            className="bg-[#FF4D00] text-white px-12 py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 group mx-auto lg:mx-0 shadow-[0_20px_60px_rgba(255,77,0,0.3)]"
          >
            {CONTENT.finalCTA.button}
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </div>

        <div className="flex-1 relative w-full max-w-[500px] aspect-square">
          {/* Abstract 3D Illustration Area */}
          <motion.div 
            animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full relative"
          >
             <div className="absolute inset-0 bg-gradient-to-tr from-[#FF4D00] to-orange-300 rounded-[4rem] blur-[100px] opacity-20 animate-pulse" />
             <div className="w-full h-full bg-[#111111] rounded-[4rem] border border-white/10 shadow-2xl p-8 flex flex-col gap-6 backdrop-blur-3xl overflow-hidden relative">
                <div className="absolute top-4 right-4 text-white/5 font-black text-9xl pointer-events-none uppercase">Tara</div>
                <div className="flex justify-between items-center relative z-10">
                   <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                   </div>
                   <div className="w-24 h-4 bg-white/10 rounded-full" />
                </div>
                <div className="mt-10 space-y-6 relative z-10">
                   <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                      <div className="w-1/2 h-3 bg-white/20 rounded-full mb-4" />
                      <div className="flex items-end justify-between">
                         <div className="text-3xl font-black tracking-tighter">150.000 FCFA</div>
                         <div className="text-[#FF4D00] font-black text-xs uppercase tracking-widest">Envoyé</div>
                      </div>
                   </div>
                   <div className="p-6 bg-[#FF4D00] rounded-3xl shadow-xl shadow-orange-500/20">
                      <div className="flex items-center gap-4 mb-4">
                         <div className="w-10 h-10 bg-white/20 rounded-full" />
                         <div className="w-1/3 h-2 bg-white/30 rounded-full" />
                      </div>
                      <div className="text-xl font-black">Transfert reçu avec succès !</div>
                   </div>
                </div>
                <div className="mt-auto flex justify-center">
                   <div className="w-1/2 h-2 bg-white/5 rounded-full" />
                </div>
             </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#0A0A0A] text-white pt-32 pb-16 px-6 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF4D00]/20 to-transparent" />
    <div className={THEME.spacing.container}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-20 mb-32">
        <div className="lg:col-span-2">
          <div className="text-5xl font-black mb-10 flex items-center gap-2">
            tara<span className="text-[#FF4D00]">.</span>
          </div>
          <p className="text-gray-400 text-xl font-bold mb-12 max-w-sm leading-relaxed italic">
            {CONTENT.footer.description}
          </p>
          <div className="flex gap-6">
             {[Instagram, Twitter, Linkedin, Facebook].map((Icon, idx) => (
               <motion.a 
                 key={idx} href="#" whileHover={{ scale: 1.2, rotate: 10 }}
                 className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#FF4D00] transition-all duration-300"
               >
                 <Icon size={24} />
               </motion.a>
             ))}
          </div>
        </div>

        {CONTENT.footer.columns.map((col, idx) => (
          <div key={idx}>
            <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-10 text-white/40">{col.title}</h4>
            <ul className="space-y-6">
              {col.links.map((link, lIdx) => (
                <li key={lIdx}>
                  <a href={link.href} className="text-gray-400 text-lg font-bold hover:text-white hover:translate-x-2 transition-all inline-block">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-[11px] font-black text-gray-700 tracking-[0.5em] uppercase">
          © 2025 TARA MONEY INC. REPRENONS LE CONTRÔLE.
        </div>
        <div className="flex gap-10 text-[11px] font-black text-gray-500 tracking-widest uppercase">
          <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
          <a href="#" className="hover:text-white transition-colors">Conditions Générales</a>
          <a href="#" className="hover:text-white transition-colors">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white selection:bg-[#FF4D00] selection:text-white antialiased overflow-x-hidden">
      <Navbar />
      <Hero />
      <Marquee />
      <Features />
      <PaymentMethods />
      <Pricing />
      <FinalCTA />
      <Footer />
      <SupportButton onClick={() => setIsSupportOpen(true)} />
      <AnimatePresence>
        {isSupportOpen && <SupportMenu isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
