'use client'

import { Folder, Lock, ShieldCheck } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { JSX, useState } from 'react'
import BorderGlow from '../BorderGlow'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  gradient: string
}

export default function Projects(): JSX.Element {
  const [isFolderOpen, setIsFolderOpen] = useState(false)

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

        <div className="mb-6 md:hidden">
          <motion.button
            type="button"
            onClick={() => setIsFolderOpen((open) => !open)}
            aria-expanded={isFolderOpen}
            whileTap={{ scale: 0.98 }}
            animate={isFolderOpen ? { boxShadow: '0 40px 90px rgba(59,130,246,0.18)' } : { boxShadow: '0 30px 60px rgba(15,23,42,0.35)' }}
            transition={{ duration: 0.25 }}
            className="w-full rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md px-4 py-4 shadow-2xl text-left"
          >
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary shadow-[0_0_20px_rgba(34,197,94,0.35)] text-black">
                <Folder size={20} />
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-primary/60">Project Folder</p>
                <p className="mt-1 text-xl font-black tracking-tight text-white uppercase italic">Open the full project list</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-white/60">
              {isFolderOpen ? 'Tap again to collapse' : `${projects.length} projects ready to explore`}
            </div>
          </motion.button>
        </div>

        <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <BorderGlow
              key={project.id}
              className="w-full h-full"
              borderRadius={32}
              glowRadius={90}
              glowIntensity={0.9}
              colors={['rgba(0,255,136,0.25)', 'rgba(0,212,255,0.18)', 'rgba(255,255,255,0.05)']}
              backgroundColor="rgba(15,23,42,0.95)"
            >
              <div className="relative z-10 flex min-h-95 flex-col justify-between rounded-[inherit] p-6 transition-transform duration-300 hover:-translate-y-1 hover:bg-slate-900/90">
                <div className="space-y-5 grow">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-primary transition-all">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-semibold bg-white/5 text-foreground rounded-full border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-foreground/40">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
                    <Lock size={12} />
                    <span>Private Access</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/10 bg-white/5">NDA</span>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {isFolderOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <motion.div
                className="flex gap-4 overflow-x-auto pb-4 pl-4 pr-2 snap-x snap-mandatory touch-pan-x"
                whileTap={{ cursor: 'grabbing' }}
              >
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="shrink-0 w-[85vw] min-h-95 rounded-[28px] snap-start"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <BorderGlow
                      className="w-full h-full"
                      borderRadius={32}
                      glowRadius={90}
                      glowIntensity={0.9}
                      colors={['rgba(0,255,136,0.25)', 'rgba(0,212,255,0.18)', 'rgba(255,255,255,0.05)']}
                      backgroundColor="rgba(15,23,42,0.95)"
                    >
                      <div className="relative z-10 flex min-h-95 flex-col justify-between rounded-[inherit] p-6 transition-transform duration-300 hover:-translate-y-1 hover:bg-slate-900/90">
                        <div className="space-y-5 grow">
                          <div className="space-y-3">
                            <h3 className="text-xl font-bold text-primary transition-all">
                              {project.title}
                            </h3>
                            <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{project.description}</p>
                          </div>

                          <div className="flex flex-wrap gap-2 pt-2">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 text-xs font-semibold bg-white/5 text-foreground rounded-full border border-white/10"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-foreground/40">
                          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
                            <Lock size={12} />
                            <span>Private Access</span>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/10 bg-white/5">NDA</span>
                        </div>
                      </div>
                    </BorderGlow>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}