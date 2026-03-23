'use client'

import { useState, useEffect, JSX, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselSlide {
  id: number
  title: string
  description: string
  gradient: string
}

export default function Carousel(): JSX.Element {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const slides: CarouselSlide[] = [
    {
      id: 1,
      title: 'Internship at National Food Authority',
      description: 'We Developed a Document Tracking System for the National Food Authority to streamline inter-departmental workflows and improve record management efficiency.',
      gradient: 'from-primary to-accent',
    },
    {
      id: 2,
      title: 'Stay Tuned',
      description: 'More exciting projects coming soon!',
      gradient: 'from-accent to-secondary',
    },
    {
      id: 3,
      title: 'Stay Tuned',
      description: 'More exciting projects coming soon!',
      gradient: 'from-secondary to-primary',
    },
    {
      id: 4,
      title: 'Stay Tuned',
      description: 'More exciting projects coming soon!',
      gradient: 'from-primary to-secondary',
    },
  ]

  useEffect(() => {
    if (!isAutoPlay) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlay, slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlay(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const distance = touchStartX.current - touchEndX.current
    if (distance > 50) nextSlide()
    if (distance < -50) prevSlide()
    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold neon-glow-primary mb-12 text-center">Featured Work</h2>

        <div
          className="relative h-112.5 md:h-96 rounded-xl overflow-hidden group touch-pan-y"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slides */}
          <div className="relative w-full h-full">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className={`w-full h-full bg-linear-to-br ${slide.gradient} p-8 md:p-12 flex flex-col justify-center relative overflow-hidden`}>
                  <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>

                  <div className="relative z-10">
                    <h3 className="text-3xl md:text-5xl font-bold text-background mb-4 leading-tight">
                      {slide.title}
                    </h3>
                    <p className="text-lg md:text-xl text-background/90 max-w-2xl">
                      {slide.description}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-xl border-2 border-white/20 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons - Hidden on Mobile, Visible on Desktop Hover */}
          <button
            onClick={prevSlide}
            className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 hover:bg-primary text-white hover:text-background transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 hover:bg-primary text-white hover:text-background transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => { setCurrentSlide(index); setIsAutoPlay(false); }}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white w-8 shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'bg-white/50 hover:bg-white/75 w-3'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}