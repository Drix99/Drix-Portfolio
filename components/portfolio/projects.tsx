'use client'

import { Lock, ShieldCheck } from 'lucide-react'
import { JSX } from 'react'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  gradient: string
}

export default function Projects(): JSX.Element {
  const projects: Project[] = [
    {
      id: 1,
      title: 'Velora',
      description: 'A mobile app for cyclists to track rides, AI Chats, and connect with a community of riders.',
      technologies: ['Flutter', 'Firebase', 'Figma'],
      gradient: 'from-primary/20 to-accent/20',
    },
    {
      id: 2,
      title: 'Document Tracking System',
      description: 'Developed a Document Tracking System for the National Food Authority to streamline inter-departmental workflows and improve record management efficiency.',
      technologies: ['Vue.js', 'MySQL', 'Laravel', 'Tailwind CSS'],
      gradient: 'from-accent/20 to-secondary/20',
    },
    {
      id: 3,
      title: 'Network Management System',
      description: 'A web-based tool for monitoring and managing network devices, providing real-time insights and alerts.',
      technologies: ['PHP', 'JavaScript', 'CSS', 'MySQL'],
      gradient: 'from-secondary/20 to-primary/20',
    },
    {
      id: 4,
      title: 'RiCement',
      description: 'A construction management tool for tracking projects, materials, and labor.',
      technologies: ['React', 'Expo', 'Firebase', 'TypeScript'],
      gradient: 'from-primary/20 to-secondary/20',
    },
  ]

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`bg-linear-to-br ${project.gradient} border border-foreground/10 rounded-lg p-6 hover-glow group overflow-hidden relative`}
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-300"></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="space-y-4 grow">
                  <h3 className="text-xl font-bold text-primary group-hover:neon-glow-primary transition-all">
                    {project.title}
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">{project.description}</p>

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

                {/* Footer replacing the old links */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-foreground/30">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
                    <Lock size={12} />
                    <span>Private Access</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-white/10">NDA</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}