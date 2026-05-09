'use client'

import { ArrowRight, X, Award, AlertTriangle, Eye, ZoomIn, Loader2 } from 'lucide-react'
import { Dispatch, JSX, SetStateAction, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TrueFocus from '../TrueFocus'
import OrbitImages from '../OrbitImages'

interface HeroProps {
  showPortfolioWarning: boolean
  setShowPortfolioWarning: Dispatch<SetStateAction<boolean>>
}

export default function Hero({ showPortfolioWarning, setShowPortfolioWarning }: HeroProps): JSX.Element {
  const [showCerts, setShowCerts] = useState(false);
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const [isAccessLoading, setIsAccessLoading] = useState(false);

  useEffect(() => {
    if (showCerts || showPortfolioWarning || selectedCert) {
      document.body.setAttribute('data-modal-open', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.removeAttribute('data-modal-open');
      document.body.style.overflow = 'unset';
    }
    return () => { 
      document.body.removeAttribute('data-modal-open');
      document.body.style.overflow = 'unset';
    };
  }, [showCerts, showPortfolioWarning, selectedCert]);

  const techIcons = [
    "/cropped_circle_image.png",
    "/cropped_circle_image (1).png",
    "/cropped_circle_image (2).png",
    "/cropped_circle_image (3).png",
  ];

  const myCertificates = [
    { title: "Introduction to ChatGPT API", issuer: "Simplilearn", src: "/10162567_Introduction_to_ChatGPT_API_9872069_page-0001.jpg" },
    { title: "Introduction to Cyber Security", issuer: "Simplilearn", src: "/10162567_Introduction_to_Cyber_Security_9870079_page-0001.jpg" },
    { title: "Introduction to Python", issuer: "Sololearn", src: "/Introduction to Python_certificate.jpg" },
    { title: "Introduction to SQL", issuer: "Sololearn", src: "/Introduction to SQL_certificate.jpg" },
    { title: "Machine Learning for Beginners", issuer: "Sololearn", src: "/Machine Learning for Beginners_certificate.jpg" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* --- HERO CONTENT --- */}
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-8 items-center">
        <div className="z-20 space-y-8">
          <div className="space-y-4">
            <p className="text-primary text-sm font-bold tracking-[0.3em] uppercase text-center md:text-left">Welcome to my portfolio</p>
            <div className="relative flex justify-center md:justify-start">
              <TrueFocus 
                sentence="Audric Suarez"
                manualMode={false}
                blurAmount={5}
                borderColor="var(--primary)" 
                animationDuration={0.8}
                pauseBetweenAnimations={1}
              />
            </div>
            <p className="text-xl text-foreground/80 font-medium leading-tight text-center md:text-left">
               Junior Full-Stack Developer | UI/UX Enthusiast
            </p>
          </div>

          <p className="text-foreground/60 text-lg max-w-md leading-relaxed text-center md:text-left mx-auto md:mx-0">
            “You should enjoy the little detours. Because that’s where you’ll find the things more important than what you want.” <span className="text-accent italic font-medium">— Ging Freecss (Hunter x Hunter)</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button 
              onClick={() => {
                setShowCerts(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group relative px-8 py-4 bg-primary text-background font-black rounded-2xl hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] inline-flex items-center gap-3 w-full sm:w-fit justify-center transition-all active:scale-95 uppercase italic tracking-wider"
            >
              <span>View Achievements</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-[10px] font-mono text-foreground/50 uppercase tracking-[0.2em]">
                Status: Still Breathin'
              </span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex relative w-full items-center justify-center">
          <OrbitImages images={techIcons} shape="circle" radius={250} rotation={-12} duration={30} itemSize={180} responsive={true} showPath={true} pathColor="rgba(34, 197, 94, 0.4)" pathWidth={1} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
        </div>
      </div>

      {/* --- REIMAGINED CERTIFICATE MODAL --- */}
      <AnimatePresence>
        {showCerts && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-2xl"
            onClick={() => setShowCerts(false)}
          >
            <motion.div 
              initial={{ y: 50, scale: 0.9, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 50, scale: 0.9, opacity: 0 }}
              className="relative bg-[#0c0c0c] border border-white/10 p-6 md:p-8 rounded-[2.5rem] max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                    <Award className="text-primary" size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase italic">Certifications</h2>
                    <p className="text-primary/50 font-mono text-xs mt-0.5 tracking-widest">BADGES: {myCertificates.length}</p>
                  </div>
                </div>
                <button onClick={() => setShowCerts(false)} className="p-3 bg-white/5 border border-white/10 rounded-xl text-white hover:text-primary hover:bg-white/10 transition-all shrink-0">
                  <X size={20} />
                </button>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {myCertificates.map((cert, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: i * 0.1 } }}
                    whileHover={{ y: -5 }}
                    className="group bg-white/3 border border-white/5 rounded-3xl p-4 hover:border-primary/40 hover:bg-white/6 transition-all duration-500"
                  >
                    <div 
                      className="relative overflow-hidden rounded-2xl aspect-4/3 bg-black cursor-zoom-in"
                      onClick={() => setSelectedCert(cert.src)}
                    >
                      <img src={cert.src} alt={cert.title} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                      <div className="absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="text-white" size={32} />
                      </div>
                    </div>
                    <div className="mt-4 space-y-1">
                      <h3 className="text-white font-black text-base leading-tight uppercase tracking-tight group-hover:text-primary transition-colors">{cert.title}</h3>
                      <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em] italic">{cert.issuer}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FULLSCREEN IMAGE PREVIEW --- */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-10001 bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
          >
             <button className="absolute top-8 right-8 p-4 text-white hover:text-primary"><X size={32}/></button>
             <motion.img 
              initial={{ scale: 0.8 }} animate={{ scale: 1 }}
              src={selectedCert} className="max-w-full max-h-full rounded-lg shadow-2xl" 
             />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SYSTEM BRIEFING MODAL --- */}
      <AnimatePresence>
        {showPortfolioWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-10000 flex items-center justify-center p-4 bg-black/98 backdrop-blur-3xl"
          >
            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="bg-[#080808] border border-white/5 p-10 rounded-[3rem] max-w-lg w-full text-center shadow-2xl"
            >
            <div className="mb-8 flex justify-center">
                <div className="p-5 bg-primary/5 rounded-full border border-primary/20 animate-pulse">
                    <AlertTriangle className="text-primary" size={48} />
                </div>
            </div>
            <h2 className="text-4xl font-black text-white mb-6 tracking-tighter uppercase italic">System Briefing</h2>
            <div className="space-y-6 mb-10">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-start gap-4 text-left">
                    <Eye className="text-primary shrink-0 mt-1" size={24} />
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Visual Sensitivity</h4>
                        <p className="text-white/40 text-xs leading-relaxed">Site uses high-contrast neon effects and motion.</p>
                    </div>
                </div>
            </div>
            <button
              onClick={() => {
                setIsAccessLoading(true)
                window.setTimeout(() => {
                  setShowPortfolioWarning(false)
                  setIsAccessLoading(false)
                }, 1300)
              }}
              disabled={isAccessLoading}
              className="w-full py-5 bg-primary text-black font-black rounded-2xl hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all uppercase tracking-widest disabled:cursor-not-allowed disabled:bg-primary/70"
            >
              <div className="inline-flex items-center justify-center gap-3">
                {isAccessLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <span>Initialize Access</span>
                )}
                {isAccessLoading ? <span>Loading...</span> : null}
              </div>
            </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}