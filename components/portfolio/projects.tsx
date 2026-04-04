'use client'

import { Lock, ShieldCheck } from 'lucide-react'
import { JSX, useRef, useState } from 'react'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  gradient: string
  year: string
}

export default function Projects(): JSX.Element {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  const projects: Project[] = [
    {
      id: 1,
      year: '2026',
      title: 'Velora',
      description: 'A mobile app for cyclists to track rides, AI Chats, and connect with a community of riders.',
      technologies: ['Flutter', 'Firebase', 'Figma'],
      gradient: 'from-primary/20 to-accent/20',
    },
    {
      id: 2,
      year: '2025',
      title: 'Document Tracking System',
      description: 'A Document Tracking System for the National Food Authority, enhancing workflow efficiency and improving document management across departments.',
      technologies: ['Vue.js', 'MySQL', 'Laravel', 'Tailwind CSS'],
      gradient: 'from-accent/20 to-secondary/20',
    },
    {
      id: 3,
      year: '2024',
      title: 'Network Management System',
      description: 'A web-based tool for monitoring and managing network devices, providing real-time insights and alerts.',
      technologies: ['PHP', 'JavaScript', 'CSS', 'MySQL'],
      gradient: 'from-secondary/20 to-primary/20',
    },
    {
      id: 4,
      year: '2024',
      title: 'RiCement',
      description: 'A construction management tool for tracking projects, materials, and labor.',
      technologies: ['React', 'Expo', 'Firebase', 'TypeScript'],
      gradient: 'from-primary/20 to-secondary/20',
    },
  ]

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      const progress = scrollWidth > clientWidth ? (scrollLeft / (scrollWidth - clientWidth)) * 100 : 0
      setScrollProgress(progress)
    }
  }

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold neon-glow-secondary mb-4 text-center">Projects</h2>
        
        {/* Privacy & Confidentiality Notice */}
        <div className="max-w-2xl mx-auto mb-12 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <ShieldCheck className="text-primary shrink-0 mt-1" size={20} />
            <p className="text-sm text-foreground/60 leading-relaxed">
              <span className="text-primary font-bold">Privacy Note:</span> Source code and live links for these projects are restricted. Most were developed for government agencies or private clients and contain proprietary logic that cannot be made public.
            </p>
          </div>
        </div>

        {/* Horizontal Timeline Container */}
        <div className="flex gap-8 items-start relative">
          {/* Timeline Indicator - Left Side */}
          <div className="hidden lg:flex flex-col items-center gap-8 pt-4">
            <div className="text-xs font-mono uppercase tracking-widest text-foreground/40 whitespace-nowrap">Journey</div>
            <div className="h-64 flex flex-col items-center gap-8 relative">
              {/* Vertical line connecting dots */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 to-primary/20"></div>
              
              {/* Animated dot - follows scroll */}
              <div className="relative z-20">
                <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_rgba(var(--primary-rgb),0.6)]"></div>
              </div>
              <div className="relative z-10">
                <div className="w-2.5 h-2.5 border-2 border-primary/40 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Scrollable Projects Container */}
          <div className="flex-1">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
              style={{
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {projects.map((project, idx) => (
                <div
                  key={project.id}
                  className="flex-shrink-0 w-96 h-fit"
                >
                  {/* Year Badge */}
                  <div className="mb-3 inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-lg border border-primary/30">
                    {project.year}
                  </div>

                  {/* Project Card */}
                  <div
                    className={`bg-linear-to-br ${project.gradient} border border-foreground/10 rounded-xl p-6 hover-glow group overflow-hidden relative h-full backdrop-blur-sm`}
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-300"></div>

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="space-y-4 grow">
                        <h3 className="text-2xl font-bold text-primary group-hover:neon-glow-primary transition-all leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-foreground/70 text-sm leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full border border-primary/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-foreground/30">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
                          <Lock size={12} />
                          <span>Private Access</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-white/10">NDA</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="mt-6 px-4">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300"
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
