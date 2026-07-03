'use client'

import { ArrowRight, X, Award, ZoomIn } from 'lucide-react'
import { JSX, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TrueFocus from '../TrueFocus'
import OrbitImages from '../OrbitImages'

export default function Hero(): JSX.Element {
  const [showCerts, setShowCerts] = useState(false);
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const [activeCertIndex, setActiveCertIndex] = useState(0);
  const certsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const shouldLock = showCerts || selectedCert;
    const htmlStyle = document.documentElement.style;
    const bodyStyle = document.body.style;

    if (shouldLock) {
      document.body.setAttribute('data-modal-open', 'true');
      htmlStyle.overflow = 'hidden';
      bodyStyle.overflow = 'hidden';
      bodyStyle.height = '100%';
    } else {
      document.body.removeAttribute('data-modal-open');
      htmlStyle.overflow = '';
      bodyStyle.overflow = '';
      bodyStyle.height = '';
    }

    return () => {
      document.body.removeAttribute('data-modal-open');
      htmlStyle.overflow = '';
      bodyStyle.overflow = '';
      bodyStyle.height = '';
    };
  }, [showCerts, selectedCert]);

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
                borderColor="var(--primary)" 
              />
            </div>
            <p className="text-xl text-foreground/80 font-medium leading-tight text-center md:text-left">
               Software Developer | UI Enthusiast
            </p>
          </div>

          <p className="text-foreground/60 text-lg max-w-md leading-relaxed text-center md:text-left mx-auto md:mx-0">
            "You should enjoy the little detours. Because that's where you'll find the things more important than what you want." <span className="text-accent italic font-medium">— Ging Freecss (Hunter x Hunter)</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button 
              onClick={() => {
                setActiveCertIndex(0);
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
              className="relative bg-[#0c0c0c] border border-white/10 p-6 md:p-8 rounded-[2.5rem] max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
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

              {/* Slides */}
              <div
                ref={certsContainerRef}
                className="mt-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory scroll-smooth"
                onScroll={() => {
                  if (!certsContainerRef.current) return
                  const index = Math.round(
                    certsContainerRef.current.scrollLeft /
                      certsContainerRef.current.clientWidth,
                  )
                  setActiveCertIndex(index)
                }}
              >
                <div className="flex gap-6 pb-4">
                  {myCertificates.map((cert, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05 } }}
                      whileHover={{ y: -5 }}
                      className="snap-center min-w-full shrink-0"
                    >
                      <div className="group bg-white/3 border border-white/5 rounded-3xl p-4 hover:border-primary/40 hover:bg-white/6 transition-all duration-500">
                        <div
                          className="relative overflow-hidden rounded-2xl aspect-4/3 bg-black cursor-zoom-in"
                          onClick={() => setSelectedCert(cert.src)}
                        >
                          <img
                            src={cert.src}
                            alt={cert.title}
                            className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ZoomIn className="text-white" size={32} />
                          </div>
                        </div>
                        <div className="mt-4 space-y-1">
                          <h3 className="text-white font-black text-base leading-tight uppercase tracking-tight group-hover:text-primary transition-colors">
                            {cert.title}
                          </h3>
                          <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em] italic">
                            {cert.issuer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex items-center justify-center gap-2 pt-3">
                {myCertificates.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!certsContainerRef.current) return
                      certsContainerRef.current.scrollTo({
                        left: idx * certsContainerRef.current.clientWidth,
                        behavior: 'smooth',
                      })
                      setActiveCertIndex(idx)
                    }}
                    aria-label={`Go to achievement ${idx + 1}`}
                    className={`relative transition-all duration-300 ${
                      activeCertIndex === idx ? 'w-10' : 'w-3'
                    }`}
                  >
                    <span
                      className={`block h-3 rounded-full transition-colors duration-300 ${
                        activeCertIndex === idx
                          ? 'bg-white shadow-[0_6px_20px_rgba(255,255,255,0.12)]'
                          : 'bg-white/40'
                      }`}
                    />
                  </button>
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

    </section>
  )
}