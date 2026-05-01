'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Terminal, Code, Briefcase, Mail, Download, X } from 'lucide-react'

const navLinks = [
  { name: 'Projects', href: '#projects', icon: <Code size={18} /> },
  { name: 'Experience', href: '#experience', icon: <Briefcase size={18} /> },
  { name: 'Contact', href: '#contact', icon: <Mail size={18} /> },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  // Watch for modal state to hide navbar
  useEffect(() => {
    const handleModalState = () => {
      setIsVisible(!document.body.hasAttribute('data-modal-open'))
    }
    const observer = new MutationObserver(handleModalState)
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-modal-open'] })
    return () => observer.disconnect()
  }, [])

  const downloadResume = () => {
    const link = document.createElement('a')
    link.href = '/audric-suarez-resume.pdf'
    link.download = 'Audric-Suarez-Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const drawerVariants: Variants = {
    closed: { x: '110%', transition: { type: 'spring', damping: 30, stiffness: 300 } },
    opened: { x: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } }
  }

  return (
    <>
      <nav className={`fixed top-6 left-0 w-full z-40 px-6 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none invisible'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
          
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl shadow-2xl">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.4)]">
              <Terminal size={18} className="text-black" />
            </div>
            <span className="text-lg font-black tracking-tighter text-white uppercase italic">Drix</span>
          </motion.div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-1 bg-black/40 backdrop-blur-md border border-white/10 p-1.5 rounded-2xl shadow-2xl">
            {navLinks.map((link) => (
              <motion.a key={link.name} href={link.href} whileHover={{ y: -2 }} className="px-4 py-2 rounded-xl text-sm font-bold text-white/70 hover:text-primary transition-all">
                {link.name}
              </motion.a>
            ))}
            <motion.button onClick={downloadResume} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="ml-2 bg-primary text-black px-4 py-2 rounded-xl text-xs font-black uppercase flex items-center gap-2">
              <Download size={14} /> Resume
            </motion.button>
          </div>

          {/* MOBILE HAMBURGER */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(true)}
              className="w-14 h-14 flex flex-col gap-1.5 items-end justify-center bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl pr-4"
            >
              <span className="w-6 h-0.5 bg-primary rounded-full"></span>
              <span className="w-4 h-0.5 bg-primary/60 rounded-full"></span>
              <span className="w-6 h-0.5 bg-primary rounded-full"></span>
            </motion.button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-45" />
            <motion.div variants={drawerVariants} initial="closed" animate="opened" exit="closed" className="fixed top-4 bottom-4 right-4 w-72 bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 z-50 rounded-[2.5rem] p-8 flex flex-col shadow-2xl overflow-hidden">
              
              <div className="flex justify-between items-center mb-10">
                <span className="text-[10px] font-mono text-primary/60 tracking-[0.4em] uppercase">Navigation</span>
                <motion.button whileTap={{ scale: 0.8, rotate: 90 }} onClick={() => setMobileMenuOpen(false)} className="p-3 bg-white/5 border border-white/10 rounded-2xl text-white hover:text-primary">
                  <X size={20} />
                </motion.button>
              </div>

              <div className="flex flex-col gap-3">
                {navLinks.map((link, i) => (
                  <motion.a 
                    key={link.name} 
                    href={link.href} 
                    initial={{ x: 20, opacity: 0 }} 
                    animate={{ x: 0, opacity: 1, transition: { delay: i * 0.1 } }} 
                    whileTap={{ scale: 0.98, x: 5 }} 
                    onClick={() => setTimeout(() => setMobileMenuOpen(false), 200)} 
                    className="flex items-center justify-between p-5 bg-white/5 hover:bg-primary/10 border border-white/5 rounded-3xl group transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-primary/40 group-hover:text-primary">{link.icon}</span>
                      <span className="text-lg font-black text-white uppercase">{link.name}</span>
                    </div>
                  </motion.a>
                ))}

                <motion.button 
                  onClick={downloadResume}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: navLinks.length * 0.1 } }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 flex items-center justify-center gap-3 p-5 bg-primary text-black rounded-3xl shadow-[0_0_30px_rgba(34,197,94,0.2)]"
                >
                  <Download size={20} />
                  <span className="text-lg font-black uppercase italic">Resume</span>
                </motion.button>
              </div>

              <div className="mt-auto pt-8">
                <p className="text-[10px] font-mono text-white/20 text-center uppercase tracking-widest">
                  © 2026 Portfolio ni Drix
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
