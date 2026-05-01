'use client'

import { ArrowUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isModalOpen = document.body.hasAttribute('data-modal-open')
      setShowScrollTop(window.scrollY > 400 && !isModalOpen)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleModalState = () => {
      const isModalOpen = document.body.hasAttribute('data-modal-open')
      setShowScrollTop((prev) => prev && !isModalOpen)
    }
    const observer = new MutationObserver(handleModalState)
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-modal-open'],
    })
    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-10 md:bottom-8 right-6 md:right-8 z-50 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-black/60 backdrop-blur-xl border border-primary/30 text-primary rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:border-primary/60 transition-colors"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
