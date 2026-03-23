'use client'

import { ExternalLink, Github } from 'lucide-react'
import { JSX } from 'react'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  link: string
  github: string
  gradient: string
}

export default function Projects(): JSX.Element {
  const projects: Project[] = [
    {
      id: 1,
      title: 'Velora',
      description: 'A mobile app for cyclists to track rides, AI Chats, and connect with a community of riders.',
      technologies: ['Flutter', 'Firebase', 'Figma'],
        link: 'https://github.com/1Kuuu/velo',
        github: '#',
      gradient: 'from-primary/20 to-accent/20',
    },
    {
      id: 2,
      title: 'Document Tracking System',
      description: 'We Developed a Document Tracking System for the National Food Authority to streamline inter-departmental workflows and improve record management efficiency.',
      technologies: ['Vue.js', 'MySQL', 'Laravel','Github', 'Tailwind CSS'],
      link: 'https://github.com/andrei5713/DTS',
      github: '#',
      gradient: 'from-accent/20 to-secondary/20',
    },
    {
      id: 3,
      title: 'Network Management System',
      description: 'A web-based tool for monitoring and managing network devices, providing real-time insights and alerts.',
      technologies: ['PHP', 'JavaScript', 'CSS', 'MySQL','Github'],
      link: 'https://github.com/andrei5713/NMS',
      github: '#',
      gradient: 'from-secondary/20 to-primary/20',
    },
  ]

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold neon-glow-secondary mb-4 text-center">Projects</h2>
        <p className="text-center text-foreground/60 mb-16 max-w-2xl mx-auto">
          Explore my recent projects showcasing my expertise in modern web technologies and creative problem-solving.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`bg-linear-to-br ${project.gradient} border border-foreground/10 rounded-lg p-6 hover-glow group overflow-hidden relative`}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-300"></div>

              <div className="relative z-10 space-y-4">
                <h3 className="text-xl font-bold text-primary group-hover:neon-glow-primary transition-all">
                  {project.title}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full border border-primary/30 hover-glow transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-6 border-t border-foreground/10">
                  <a
                    href={project.link}
                    className="flex items-center gap-2 text-accent hover:text-secondary transition-colors text-sm font-semibold group/link"
                  >
                    <span>View Project</span>
                    <ExternalLink size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href={project.github}
                    className="flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors text-sm font-semibold group/link"
                  >
                    <Github size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
