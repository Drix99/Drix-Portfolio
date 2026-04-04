'use client'

import { Lock, ShieldCheck } from 'lucide-react'
import { JSX, useRef, useEffect, useState } from 'react'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  year: string
  position: 'top' | 'bottom'
  gradient: string
}

export default function Projects(): JSX.Element {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isScrollable, setIsScrollable] = useState(false)

  const projects: Project[] = [
    {
      id: 1,
      title: 'Web Fundamentals',
      description: 'Started my coding journey by exploring web fundamentals. Mastered the core basics of HTML, CSS, and JavaScript, bringing concepts to life by building small, interactive projects.',
      technologies: [],
      year: '2022',
      position: 'bottom',
      gradient: 'from-primary/20 to-accent/20',
    },
    {
      id: 2,
      title: 'Freelance Developer',
      description: 'Started taking on freelance opportunities alongside developing complex school projects. Gained hands-on experience in delivering real-world solutions and managing client requirements.',
      technologies: [],
      year: '2024',
      position: 'bottom',
      gradient: 'from-accent/20 to-secondary/20',
    },
    {
      id: 3,
      title: 'Full-Stack Developer',
      description: 'Focused on full-stack development, building complete, end-to-end applications. Integrated robust backend architectures with seamless, responsive frontends for various projects.',
      technologies: [],
      year: '2025',
      position: 'top',
      gradient: 'from-secondary/20 to-primary/20',
    },
    {
      id: 4,
      title: 'Solo Full-Stack Developer',
      description: 'Architecting complex web applications using the MERN stack and Tailwind CSS v4. Delivering premium, fully responsive digital experiences with advanced GSAP animations and scalable ES module-based architecture.',
      technologies: [],
      year: '2026',
      position: 'bottom',
      gradient: 'from-primary/20 to-secondary/20',
    },
    {
      id: 5,
      title: 'MERN Stack Exploration',
      description: 'Dived deep into modern web technologies. Explored and built scalable projects using MongoDB, Express.js, React, and Node.js, establishing a strong foundation in backend architecture.',
      technologies: [],
      year: '2025',
      position: 'top',
      gradient: 'from-secondary/20 to-accent/20',
    },
  ]

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        setIsScrollable(
          scrollContainerRef.current.scrollWidth > scrollContainerRef.current.clientWidth
        )
      }
    }
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full mx-auto">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-widest text-foreground/50 mb-2 block">Journey</span>
          <h2 className="text-4xl font-bold neon-glow-secondary">Experience & Growth</h2>
        </div>

        {/* Privacy & Confidentiality Notice */}
        <div className="max-w-2xl mx-auto mb-12 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <ShieldCheck className="text-primary shrink-0 mt-1" size={20} />
            <p className="text-sm text-foreground/60 leading-relaxed">
              <span className="text-primary font-bold">Privacy Note:</span> Source code and live links for these projects are restricted. Most were developed for government agencies or private clients and contain proprietary logic that cannot be made public.
            </p>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Scroll hint */}
          {isScrollable && (
            <div className="absolute bottom-0 right-0 text-xs text-foreground/40 mb-8 pointer-events-none">
              Scroll horizontally →
            </div>
          )}

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide pb-8"
          >
            <div className="min-w-min px-12 py-12">
              {/* Timeline line and dots container */}
              <div className="relative h-96">
                {/* Center line */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-foreground/20 transform -translate-y-1/2"></div>

                {/* Projects positioned above and below timeline */}
                <div className="relative h-full">
                  {projects.map((project, index) => {
                    const isTop = project.position === 'top'
                    const isActive = index === 2 // Highlight the 3rd project (2026)

                    return (
                      <div
                        key={project.id}
                        className="absolute w-80"
                        style={{
                          left: `${index * 400}px`,
                          top: isTop ? '0' : 'auto',
                          bottom: !isTop ? '0' : 'auto',
                        }}
                      >
                        {/* Connecting line */}
                        <div
                          className={`absolute left-1/2 w-px ${
                            isTop ? 'top-full h-12' : 'bottom-full h-12'
                          } bg-foreground/20 transform -translate-x-1/2`}
                        ></div>

                        {/* Timeline dot */}
                        <div
                          className={`absolute left-1/2 top-1/2 w-4 h-4 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all ${
                            isActive
                              ? 'bg-foreground border-foreground scale-150'
                              : 'bg-background border-foreground/30 hover:border-foreground/60'
                          }`}
                        ></div>

                        {/* Project Card */}
                        <div
                          className={`mt-16 px-6 py-6 border border-foreground/10 rounded-lg backdrop-blur-sm ${project.gradient} group hover:border-foreground/20 transition-all`}
                        >
                          <div className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-2">
                            {project.year}
                          </div>
                          <h3 className="text-xl font-black uppercase text-foreground mb-3 group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-foreground/70 text-sm leading-relaxed line-clamp-4">
                            {project.description}
                          </p>

                          <div className="mt-4 pt-4 border-t border-foreground/10 flex items-center gap-2 text-foreground/30">
                            <Lock size={12} />
                            <span className="text-xs font-mono uppercase tracking-widest">NDA</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
