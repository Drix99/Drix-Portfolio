'use client'

import { Briefcase, Calendar } from 'lucide-react'
import { JSX } from 'react'


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
        'We recieved a certificate of appreciation for our work',
        'Exprienced how the office works and how to work in a team',
        'Gained experience in working with clients and understanding their needs',
      ],
      technologies: ['Vue.js', 'MySQL', 'Laravel','Github', 'Tailwind CSS'],
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold neon-glow-secondary mb-4 text-center">Work Experience</h2>
        <p className="text-center text-foreground/60 mb-16 max-w-2xl mx-auto">
          My professional journey building innovative solutions and growing as a developer.
        </p>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className="group relative neon-border rounded-lg p-6 hover-glow-secondary transition-all duration-300"
            >
              {/* Timeline connector */}
              {index < experiences.length - 1 && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-linear-to-b from-primary to-transparent"></div>
              )}

              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="mt-1 p-2 rounded-lg bg-primary/20 border border-primary/30 group-hover:border-primary/60 transition-colors">
                      <Briefcase className="text-primary" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-accent group-hover:text-primary transition-colors">
                        {experience.role}
                      </h3>
                      <p className="text-foreground/70 font-medium">{experience.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-foreground/50 text-sm whitespace-nowrap">
                    <Calendar size={16} />
                    <span>{experience.period}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-foreground/70 leading-relaxed">{experience.description}</p>

                {/* Achievements */}
                <div className="grid md:grid-cols-3 gap-4 pt-4">
                  {experience.achievements.map((achievement, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-linear-to-br from-primary/5 to-accent/5 border border-primary/10 group-hover:border-primary/30 transition-all"
                    >
                      <p className="text-sm text-foreground/70">{achievement}</p>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {experience.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-semibold bg-secondary/20 text-secondary rounded-full border border-secondary/30 hover:border-secondary/60 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div id="contact" className="mt-20 text-center p-8 rounded-2xl bg-white/5 border border-accent/20 relative overflow-hidden">
          {/* Optional: Subtle background glow for the CTA box */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-accent/10 rounded-full blur-[80px]"></div>
          
          <h3 className="text-3xl font-bold text-accent mb-4 tracking-tight">Ready to Work Together?</h3>
          <p className="text-foreground/70 mb-8 max-w-xl mx-auto text-lg">
            Whether it's a new project or just a 1v1 midlane only, my inbox is always open.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Direct Gmail Link */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=audric.suarez.bscs2022@gmail.com&su=Project%20Inquiry%20-%20Quest%20Start"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-3 bg-primary text-background font-bold rounded-lg hover-glow transition-all duration-300 flex items-center gap-2 w-full sm:w-fit justify-center"
            >
              <span>Send Email</span>
              <span className="text-xs opacity-50 group-hover:opacity-100 transition-opacity">(via Gmail)</span>
            </a>

            {/* Schedule Call / LinkedIn Alternative */}
            <a
              href="https://www.linkedin.com/in/audric-suarez-938403375/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-accent text-accent font-semibold rounded-lg hover-glow-accent transition-all duration-300 w-full sm:w-fit text-center"
            >
              Schedule Call / Connect
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
