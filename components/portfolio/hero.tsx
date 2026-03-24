'use client'

import { ArrowRight, X, Award } from 'lucide-react'
import { JSX, useState, useEffect } from 'react'
import TrueFocus from '../TrueFocus'
import OrbitImages from '../OrbitImages'

export default function Hero(): JSX.Element {
  const [showCerts, setShowCerts] = useState(false);

  useEffect(() => {
    if (showCerts) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showCerts]);

  const techIcons = [
    "/images.jpeg",
    "/IMG_20240919_100353_1774257687966.jpg",
    "/IMG_20241222_140257_1774257686734.jpg",
    "/IMG_20250714_165554_1774257684859.jpg",
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
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left Column - Text */}
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
               Humble Full-Stack Developer | UI/UX Enthusiast
            </p>
          </div>

          <p className="text-foreground/60 text-lg max-w-md leading-relaxed text-center md:text-left mx-auto md:mx-0">
            Trying to debug life and Dota at the same time. <span className="text-accent italic font-medium">Spoiler: both crash often.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button 
              onClick={() => setShowCerts(true)}
              className="group relative px-8 py-3 bg-primary text-background font-bold rounded-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] inline-flex items-center gap-2 w-full sm:w-fit justify-center transition-all active:scale-95"
            >
              <span>View my Certificates</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-fit">
              <a 
                href="https://www.linkedin.com/in/audric-suarez-938403375/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border-2 border-accent text-accent font-semibold rounded-lg hover-glow-accent transition-all duration-300 w-full sm:w-fit text-center active:scale-95"
              >
                Get in Touch
              </a>

              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 shrink-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-[10px] font-mono text-foreground/50 uppercase tracking-widest">
                  Status: Still Breathin'
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Orbit */}
        <div className="hidden md:flex relative w-full items-center justify-center overflow-visible">
          <OrbitImages
            images={techIcons}
            shape="circle"
            radius={250}  
            rotation={-12} 
            duration={30}
            itemSize={180} 
            responsive={true}
            showPath={true}
            pathColor="rgba(34, 197, 94, 0.4)" 
            pathWidth={1}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCerts && (
        <div 
          className="fixed inset-0 z-9999 flex items-center justify-center p-4 transition-all duration-300 animate-in fade-in"
          style={{ 
            background: 'radial-gradient(circle at center, rgba(34, 197, 94, 0.12) 0%, rgba(0, 0, 0, 0.9) 100%)',
            backdropFilter: 'blur(16px)' 
          }} 
          onClick={() => setShowCerts(false)}
        >
          <div 
            className="relative bg-linear-to-br from-background/95 via-background/90 to-background/95 border border-white/10 p-6 md:p-10 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 slide-in-from-bottom-10 duration-500
            /* Hide Scrollbar */
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Glow Accents */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

            {/* Close Button */}
            <button 
              onClick={() => setShowCerts(false)}
              className="sticky top-0 float-right p-2 text-foreground/40 hover:text-primary hover:rotate-90 transition-all duration-300 z-50 bg-white/5 rounded-full backdrop-blur-md border border-white/10"
            >
              <X size={28} />
            </button>
            
            <div className="mb-10 text-center md:text-left flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                <Award className="text-primary" size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">Technical Certifications</h2>
                <p className="text-foreground/40 text-sm font-mono mt-1">
                  <span className="text-primary/60">ACHIEVEMENTS_UNLOCKED:</span> {myCertificates.length}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCertificates.map((cert, index) => (
                <div 
                  key={index} 
                  className="group relative flex flex-col gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-black aspect-4/3 shadow-inner relative">
                    <img 
                      src={cert.src} 
                      alt={cert.title} 
                      className="object-contain w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-white font-bold text-base group-hover:text-primary transition-colors leading-tight">
                      {cert.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-foreground/40 text-[10px] font-bold uppercase tracking-widest italic">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}