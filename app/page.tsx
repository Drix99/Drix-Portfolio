'use client'

import { useEffect, useState } from 'react'
import Hero from '@/components/portfolio/hero'
import Carousel from '@/components/portfolio/carousel'
import Projects from '@/components/portfolio/projects'
import Experience from '@/components/portfolio/experience'
import Navigation from '@/components/portfolio/navigation'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-20 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent rounded-full blur-3xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <Carousel />
        <Projects />
        <Experience />
      </div>
    </div>
  )
}
