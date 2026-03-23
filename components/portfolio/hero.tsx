'use client'

import { ArrowRight } from 'lucide-react'
import { JSX } from 'react'
import TrueFocus from '..//TrueFocus'
import OrbitImages from '..//OrbitImages'

export default function Hero(): JSX.Element {
  const techIcons = [
    "https://www.citypng.com/public/uploads/preview/hd-dota-2-official-logo-png-701751694788589vbfyq561nz.png", 
    "https://img.icons8.com/color/512/javascript--v1.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZlDp2fH5Gx76m8Cx_y0Y1bREbUMe0Dg0RCQ&s",
    "https://images.seeklogo.com/logo-png/30/2/github-logo-png_seeklogo-304612.png",
    "https://e7.pngegg.com/pngimages/140/948/png-clipart-blue-and-yellow-logo-python-logo-programmer-fierce-python-s-cdr-angle-thumbnail.png",
    "https://img.icons8.com/color/512/typescript.png",
  ];

  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left Column - Text */}
        <div className="z-20 space-y-8">
          <div className="space-y-4">
            <p className="text-primary text-sm font-bold tracking-[0.3em] uppercase">Welcome to my portfolio</p>
            <div className="relative inline-block">
              <TrueFocus 
                sentence="Audric Suarez"
                manualMode={false}
                blurAmount={5}
                borderColor="var(--primary)" 
                animationDuration={0.8}
                pauseBetweenAnimations={1}
              />
            </div>
            <p className="text-xl text-foreground/80 font-medium leading-tight">
              Soon to be a Full-Stack Web Developer | UI/UX Enthusiast
            </p>
          </div>

          <p className="text-foreground/60 text-lg max-w-md leading-relaxed">
            Trying to debug life and Dota at the same time. <span className="text-accent italic font-medium">Spoiler: both crash often.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a 
              href="https://github.com/Drix99"
              target="_blank"
              className="group relative px-8 py-3 bg-primary text-background font-bold rounded-lg hover-glow inline-flex items-center gap-2 w-full sm:w-fit justify-center transition-all active:scale-95">
              <span>View My Work</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-fit">
              <a 
                href="https://www.linkedin.com/in/audric-suarez-938403375/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border-2 border-accent text-accent font-semibold rounded-lg hover-glow-accent transition-all duration-300 w-full sm:w-fit text-center active:scale-95"
              >
                Get in Touch
              </a>

              {/* Dota-Style Status Indicator */}
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 shrink-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-[10px] font-mono text-foreground/50 uppercase tracking-widest">
                  Status: Online
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - The Orbit */}
        <div className="relative w-full flex items-center justify-center overflow-visible">
          <OrbitImages
            images={techIcons}
            shape="ellipse"
            // CALIBRATED SIZE:
            radiusX={380} // Width of the orbit
            radiusY={120} // Height/Depth of the orbit
            rotation={-12} 
            duration={30}
            itemSize={68} 
            responsive={true}
            showPath={true}
            pathColor="rgba(34, 197, 94, 0.4)" 
            pathWidth={1}
          />
          
          {/* Ambient background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
        </div>

      </div>
    </section>
  )
}