'use client'

import { JSX, useRef, useState, useEffect } from 'react'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  year: string
}

export default function Projects(): JSX.Element {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [dotPosition, setDotPosition] = useState(0)

  const projects: Project[] = [
    {
      id: 1,
      year: '2026',
      title: 'VELORA',
      description: 'A mobile app for cyclists to track rides, AI Chats, and connect with a community of riders. Built with Flutter and Firebase for seamless cross-platform performance.',
      technologies: ['Flutter', 'Firebase', 'Figma'],
    },
    {
      id: 2,
      year: '2025',
      title: 'DOCUMENT TRACKING SYSTEM',
      description: 'A comprehensive Document Tracking System for the National Food Authority, enhancing workflow efficiency and improving document management across departments.',
      technologies: ['Vue.js', 'MySQL', 'Laravel', 'Tailwind CSS'],
    },
    {
      id: 3,
      year: '2024',
      title: 'NETWORK MANAGEMENT',
      description: 'A web-based tool for monitoring and managing network devices, providing real-time insights, alerts, and comprehensive network analytics.',
      technologies: ['PHP', 'JavaScript', 'CSS', 'MySQL'],
    },
    {
      id: 4,
      year: '2024',
      title: 'RICIENCY',
      description: 'A construction management tool for tracking projects, materials, and labor. Streamlines project workflows with real-time collaboration features.',
      technologies: ['React', 'Expo', 'Firebase', 'TypeScript'],
    },
  ]

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      const progress = scrollWidth > clientWidth ? (scrollLeft / (scrollWidth - clientWidth)) * 100 : 0
      setScrollProgress(progress)
      
      // Calculate dot position (0-3 for 4 projects)
      const dotPos = (progress / 100) * 3
      setDotPosition(dotPos)
    }
  }

  return (
    <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-full mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-sm font-mono uppercase tracking-widest text-foreground/50 mb-4">Journey</p>
          <h2 className="text-5xl lg:text-6xl font-black tracking-tighter mb-4">
            <span className="block">EXPERIENCE</span>
            <span className="block text-foreground/60">&</span>
            <span className="block">GROWTH</span>
          </h2>
        </div>

        {/* Horizontal Timeline Container */}
        <div className="flex gap-12 items-start relative">
          {/* Timeline Indicator - Left Side (Hidden on mobile) */}
          <div className="hidden lg:flex flex-col items-center pt-8 min-w-max">
            <div className="relative h-96">
              {/* Vertical line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-foreground/40 via-foreground/20 to-transparent"></div>
              
              {/* Filled dot at scroll position */}
              <div 
                className="absolute left-1/2 -translate-x-1/2 transition-all duration-300 ease-out"
                style={{ top: `${(dotPosition / 3) * 100}%` }}
              >
                <div className="w-3 h-3 bg-foreground rounded-full shadow-lg"></div>
              </div>
              
              {/* Empty dots for each project */}
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute left-1/2 -translate-x-1/2 transition-all duration-300"
                  style={{ top: `${(i / 3) * 100}%` }}
                >
                  <div className="w-2 h-2 border border-foreground/40 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Scrollable Projects Container */}
          <div className="flex-1 overflow-hidden">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex gap-8 overflow-x-auto pb-8 scroll-smooth snap-x snap-mandatory"
              style={{
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex-shrink-0 w-full sm:w-96 lg:w-96 snap-start"
                >
                  {/* Project Card */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10 hover:bg-white/10 transition-colors duration-300 h-full flex flex-col group backdrop-blur-sm">
                    {/* Year Badge - Top Right */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1"></div>
                      <div className="px-4 py-2 bg-foreground text-background font-black text-lg rounded-lg">
                        {project.year}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 gap-6">
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-black tracking-tighter leading-tight mb-4 group-hover:text-foreground/80 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-foreground/70 text-sm lg:text-base leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 pt-4 mt-auto">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-semibold bg-foreground/10 text-foreground/80 rounded-full border border-foreground/20 hover:bg-foreground/20 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Progress Bar */}
            <div className="mt-8 px-0">
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-foreground rounded-full transition-all duration-300"
                  style={{ width: `${scrollProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
