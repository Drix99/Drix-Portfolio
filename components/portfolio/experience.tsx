'use client'

import { Briefcase, Calendar } from 'lucide-react'
import { JSX } from 'react'
import BorderGlow from '../BorderGlow';

interface ExperienceItem {
  id: number
  company: string
  role: string
  period: string
  description: string
  achievements: string[]
  technologies: string[]
}

export default function Experience(): JSX.Element {
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      company: 'National Food Authority',
      role: 'Junior Full-Stack Developer',
      period: 'Jun 16, 2025 - Sept 17, 2025',
      description: 'We Developed a Document Tracking System for the National Food Authority to streamline inter-departmental workflows and improve record management efficiency.',
      achievements: [
        'Received a certificate of appreciation for our work',
        'Experienced office workflows and team collaboration',
        'Gained experience in client needs assessment',
      ],
      technologies: ['Vue.js', 'MySQL', 'Laravel', 'Github', 'Tailwind CSS'],
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold neon-glow-secondary mb-4 text-center">Work Experience</h2>
        <p className="text-center text-foreground/60 mb-16 max-w-2xl mx-auto">
          My professional journey building innovative solutions and growing as a developer.
        </p>

        <div className="space-y-12">
          {experiences.map((experience) => (
            <BorderGlow
              key={experience.id}
              className="p-px" 
              borderRadius={16}
              glowColor="34 197 94" 
              colors={['#22c55e', '#10b981', '#4ade80']} 
              backgroundColor="transparent"
              glowIntensity={1}
            >
              {/* Inner card with Glassmorphism */}
              <div className="p-6 md:p-8 group cursor-default bg-black/40 backdrop-blur-xl rounded-[15px] relative overflow-hidden">
                
                {/* Background Accents */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>

                <div className="relative z-10 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="mt-1 p-2 rounded-lg bg-primary/20 border border-primary/30 group-hover:border-primary/60 transition-colors shrink-0">
                        <Briefcase className="text-primary" size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold text-accent group-hover:text-primary transition-colors wrap-break-word leading-tight">
                          {experience.role}
                        </h3>
                        <p className="text-foreground/70 font-medium">{experience.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-foreground/50 text-sm pl-14 sm:pl-0">
                      <Calendar size={16} className="shrink-0" />
                      <span className="whitespace-nowrap">{experience.period}</span>
                    </div>
                  </div>

                  {/* FIXED: Removed parentheses from description */}
                  <p className="text-foreground/70 leading-relaxed italic border-l-2 border-primary/30 pl-4 py-1">
                    {experience.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    {experience.achievements.map((achievement, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-white/5 border border-white/5 group-hover:border-primary/20 transition-all backdrop-blur-sm"
                      >
                        <p className="text-sm text-foreground/70 group-hover:text-foreground/90">{achievement}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>

        {/* Contact Section */}
        <div id="contact" className="mt-20 text-center p-8 rounded-2xl bg-white/5 border border-accent/20 relative overflow-hidden backdrop-blur-md">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-accent/10 rounded-full blur-[80px]"></div>
          
          <h3 className="text-3xl font-bold text-accent mb-4 tracking-tight">Ready to Work Together?</h3>
          <p className="text-foreground/70 mb-8 max-w-xl mx-auto text-lg">
            Whether it's a new project or just a 1v1 midlane only, my inbox is always open.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=audric.suarez.bscs2022@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-primary text-background font-bold rounded-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-300 w-full sm:w-fit text-center"
            >
              Send Email
            </a>
            <a
              href="https://www.linkedin.com/in/audric-suarez-938403375/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-all duration-300 w-full sm:w-fit text-center"
            >
              Connect on LinkedIn
            </a>
          </div>

          <p className="mt-6 text-[10px] font-mono text-foreground/30 uppercase tracking-[0.3em]">
            Average Response Time: &lt; 24 Hours
          </p>
        </div>
      </div>
    </section>
  )
}