'use client'

import { JSX } from 'react'

export default function About(): JSX.Element {
  const skills = [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'SQL', 'PostgreSQL', 'MongoDB'] },
    { category: 'Tools', items: ['Git', 'Docker', 'VS Code', 'Figma', 'Vercel'] },
  ]

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-bold tracking-[0.3em] uppercase mb-4">Get to know me</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">About Me</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Bio */}
          <div className="space-y-6">
            <p className="text-foreground/70 text-lg leading-relaxed">
              I'm a passionate full-stack developer with a keen interest in creating beautiful, functional user experiences. 
              With a background in both frontend and backend development, I bring a holistic approach to solving complex problems.
            </p>
            
            <p className="text-foreground/70 text-lg leading-relaxed">
              My journey in tech started with curiosity and has grown into a commitment to continuous learning. 
              I enjoy turning ideas into reality and collaborating with teams to build products that make a difference.
            </p>

            <p className="text-foreground/70 text-lg leading-relaxed">
              When I'm not coding, you can find me gaming, exploring new technologies, or contributing to open-source projects. 
              I'm always excited about new challenges and opportunities to grow as a developer.
            </p>
          </div>

          {/* Right Column - Quick Facts */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-4">Current Focus</h3>
              <p className="text-foreground/70">
                Building scalable full-stack applications with modern technologies and best practices.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-4">Philosophy</h3>
              <p className="text-foreground/70">
                Clean code, user-centered design, and continuous improvement drive my development process.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-4">Open to</h3>
              <p className="text-foreground/70">
                Freelance projects, collaborations, and full-time opportunities that challenge and inspire.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-white mb-12 text-center">Technical Skills</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <div 
                key={index}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all duration-300"
              >
                <h4 className="text-xl font-bold text-primary mb-6">{skillGroup.category}</h4>
                <ul className="space-y-3">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <li key={skillIndex} className="text-foreground/70 flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
