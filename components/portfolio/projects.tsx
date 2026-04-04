'use client'

import { Lock, ShieldCheck } from 'lucide-react'
import { JSX, useRef } from 'react'

interface Project {
  id: number
  title: string
  description: string
  year: string
}

export default function Projects(): JSX.Element {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const projects: Project[] = [
    {
      id: 1,
      title: 'Web Fundamentals',
      description: 'Started my coding journey by exploring web fundamentals. Mastered the core basics of HTML, CSS, and JavaScript, bringing concepts to life by building small, interactive projects.',
      year: '2022',
    },
    {
      id: 2,
      title: 'Freelance Developer',
      description: 'Started taking on freelance opportunities alongside developing complex school projects. Gained hands-on experience in delivering real-world solutions and managing client requirements.',
      year: '2024',
    },
    {
      id: 3,
      title: 'Full-Stack Developer',
      description: 'Focused on full-stack development, building complete, end-to-end applications. Integrated robust backend architectures with seamless, responsive frontends for various projects.',
      year: '2025',
    },
    {
      id: 4,
      title: 'Solo Full-Stack Developer',
      description: 'Architecting complex web applications using the MERN stack and Tailwind CSS v4. Delivering premium, fully responsive digital experiences with advanced GSAP animations and scalable ES module-based architecture.',
      year: '2026',
    },
    {
      id: 5,
      title: 'MERN Stack Exploration',
      description: 'Dived deep into modern web technologies. Explored and built scalable projects using MongoDB, Express.js, React, and Node.js, establishing a strong foundation in backend architecture.',
      year: '2025',
    },
  ]

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-foreground/50 mb-2 block">Journey</span>
          <h2 className="text-4xl font-bold">Experience & Growth</h2>
        </div>

        {/* Privacy & Confidentiality Notice */}
        <div className="max-w-2xl mx-auto mb-16 p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <ShieldCheck className="text-primary shrink-0 mt-1" size={20} />
            <p className="text-sm text-foreground/60 leading-relaxed">
              <span className="text-primary font-bold">Privacy Note:</span> Source code and live links for these projects are restricted. Most were developed for government agencies or private clients and contain proprietary logic that cannot be made public.
            </p>
          </div>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative pt-20">
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide"
          >
            <div className="inline-flex gap-8 px-8 pb-8 min-w-min">
              {/* Timeline Line with Dots */}
              <div className="absolute top-0 left-0 right-0 h-12 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent"></div>
                
                {/* Timeline Dots */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex gap-8 px-8">
                  {projects.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === 3
                          ? 'bg-foreground scale-150'
                          : 'bg-foreground/40'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Project Cards */}
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="w-96 flex-shrink-0 pt-16 pb-4"
                >
                  <div className="h-full rounded-lg border border-foreground/20 bg-white/5 backdrop-blur-sm p-6 hover:border-foreground/40 transition-colors group">
                    <div className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-2">
                      {project.year}
                    </div>
                    <h3 className="text-lg font-black uppercase text-foreground mb-3">
                      {project.title}
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed line-clamp-4">
                      {project.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-foreground/10 flex items-center gap-2 text-foreground/40">
                      <Lock size={12} />
                      <span className="text-xs uppercase tracking-widest">NDA</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Hint */}
          <div className="text-right text-xs text-foreground/40 mt-6 pr-8">
            Scroll horizontally →
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
