'use client'

import { Lock, ShieldCheck, Folder, X } from 'lucide-react'
import { JSX, useState, useEffect } from 'react'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  gradient: string
}

export default function Projects(): JSX.Element {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null)
      }
    }

    if (selectedProject) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedProject])

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
      description: 'A Document Tracking System for the National Food Authority, enhancing workflow efficiency and improving document management across departments.',
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
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`bg-linear-to-br ${project.gradient} border border-foreground/10 rounded-lg p-6 hover-glow group overflow-hidden relative text-left transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50`}
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-300"></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <Folder className="text-primary group-hover:text-accent transition-colors" size={28} />
                  <span className="text-xs font-mono text-foreground/40">Click to open</span>
                </div>

                <div className="space-y-4 grow">
                  <h3 className="text-xl font-bold text-primary group-hover:neon-glow-primary transition-all">
                    {project.title}
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 2 && (
                      <span className="px-3 py-1 text-xs font-semibold bg-accent/20 text-accent rounded-full border border-accent/20">
                        +{project.technologies.length - 2} more
                      </span>
                    )}
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
            </button>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-300"
            onClick={() => setSelectedProject(null)}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div
              className="pointer-events-auto max-w-2xl w-full bg-gradient-to-br from-card to-card/80 border border-foreground/20 rounded-2xl p-8 shadow-2xl animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 hover:bg-foreground/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label="Close modal"
              >
                <X size={24} className="text-foreground/60 hover:text-foreground" />
              </button>

              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Folder className="text-primary" size={32} />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-primary mb-2 neon-glow-primary">
                    {selectedProject.title}
                  </h2>
                  <p className="text-foreground/50 text-sm">Project Details</p>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-2">Description</h3>
                  <p className="text-foreground/80 leading-relaxed text-base">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 text-sm font-semibold bg-primary/20 text-primary rounded-full border border-primary/30 hover:bg-primary/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Section */}
                <div className="pt-6 border-t border-foreground/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock size={16} className="text-foreground/50" />
                      <span className="text-sm text-foreground/60 font-mono">Private Access</span>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded border border-secondary/40 bg-secondary/10 text-secondary">NDA Protected</span>
                  </div>
                </div>
              </div>

              {/* Close Instructions */}
              <div className="mt-6 text-center">
                <p className="text-xs text-foreground/40">Press ESC or click outside to close</p>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
