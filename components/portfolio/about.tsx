'use client'

import { Code2, Zap, Target, Users } from 'lucide-react'
import { JSX } from 'react'

export default function About(): JSX.Element {
  const skillCategories = [
    {
      category: 'Frontend',
      icon: Code2,
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js', 'Flutter']
    },
    {
      category: 'Backend',
      icon: Zap,
      technologies: ['Node.js', 'PHP', 'Laravel', 'Firebase', 'MySQL', 'REST APIs']
    },
    {
      category: 'Tools & Platforms',
      icon: Target,
      technologies: ['Git/Github', 'Figma', 'Docker', 'VS Code', 'Postman', 'Vercel']
    },
    {
      category: 'Soft Skills',
      icon: Users,
      technologies: ['Problem Solving', 'Team Collaboration', 'UI/UX Design', 'Project Management', 'Documentation', 'Communication']
    }
  ]

  const quickFacts = [
    { label: 'Projects Completed', value: '4' },
    { label: 'Years Experience', value: '2+' },
    { label: 'Technologies', value: '15+' },
    { label: 'Certifications', value: '5' }
  ]

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold neon-glow-secondary mb-4">About Me</h2>
          <p className="text-foreground/60 text-lg max-w-3xl mx-auto">
            Passionate full-stack developer with expertise in modern web technologies, creating intuitive user experiences and robust backend systems.
          </p>
        </div>

        {/* Quick Facts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {quickFacts.map((fact, index) => (
            <div
              key={index}
              className="bg-linear-to-br from-primary/10 to-accent/10 border border-foreground/10 rounded-lg p-6 text-center hover:border-primary/30 hover:bg-primary/15 transition-all duration-300"
            >
              <p className="text-3xl font-bold text-primary mb-2">{fact.value}</p>
              <p className="text-foreground/60 text-sm font-medium">{fact.label}</p>
            </div>
          ))}
        </div>

        {/* Bio Section */}
        <div className="bg-linear-to-br from-background/40 to-background/20 border border-foreground/10 rounded-2xl p-8 md:p-12 mb-20 hover:border-primary/20 transition-all duration-300">
          <h3 className="text-2xl font-bold mb-6 text-primary">My Journey</h3>
          <div className="space-y-4 text-foreground/70 leading-relaxed">
            <p>
              I’m a graduating Computer Science student and an aspiring Full-Stack Developer driven by the challenge of building seamless digital experiences. 
              Over the last 2+ years, I’ve moved beyond the basics to engineer full-scale applications that bridge the gap between robust backends and intuitive frontends.
            </p>
            <p>
              My expertise lies in React and Vue.js for the frontend, powered by Node.js and PHP on the backend, 
              with a growing focus on mobile via Flutter. I’m passionate about clean, maintainable code and love the 'aha!' moment of solving a complex bug.
            </p>
            <p>
              When I’m not in the IDE, I’m usually gaming, exploring new frameworks, 
              or contributing to the open-source community. 
              I’m ready to take my foundation in web development to a team where I can build, learn, and scale.
            </p>
          </div>
        </div>

        {/* Skills Grid */}
        <div>
          <h3 className="text-2xl font-bold mb-10 text-center">Technical Skills</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((skill, index) => {
              const Icon = skill.icon
              return (
                <div
                  key={index}
                  className="bg-linear-to-br from-primary/5 to-accent/5 border border-foreground/10 rounded-xl p-6 hover:border-primary/30 hover:bg-primary/10 group transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                      {skill.category}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full border border-primary/30 hover-glow transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}