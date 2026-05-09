'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import Hero from '@/components/portfolio/hero'
import About from '@/components/portfolio/about'
import Carousel from '@/components/portfolio/carousel'
import Projects from '@/components/portfolio/projects'
import Experience from '@/components/portfolio/experience'
import Navigation from '@/components/portfolio/navigation'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showPortfolioWarning, setShowPortfolioWarning] = useState(true)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-black">
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-20 animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10">
        <AnimatePresence>
          {!showPortfolioWarning && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              <Navigation />
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          {isLoaded && (
            <motion.div className="flex flex-col" initial="hidden" animate="visible">
              <motion.section id="home" className="scroll-mt-24" variants={sectionVariants} whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                <Hero showPortfolioWarning={showPortfolioWarning} setShowPortfolioWarning={setShowPortfolioWarning} />
              </motion.section>

              <motion.section id="about" className="scroll-mt-24" variants={sectionVariants} whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                <About />
              </motion.section>

              <motion.div variants={sectionVariants} whileInView="visible" viewport={{ once: true }}>
                <Carousel />
              </motion.div>

              <motion.section id="projects" className="scroll-mt-24" variants={sectionVariants} whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                <Projects />
              </motion.section>

              <motion.section id="experience" className="scroll-mt-24" variants={sectionVariants} whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                <Experience />
              </motion.section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}