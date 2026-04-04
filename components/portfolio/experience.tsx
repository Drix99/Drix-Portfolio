'use client'

import { Briefcase, Calendar, ArrowUp } from 'lucide-react'
import { JSX, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BorderGlow from '../BorderGlow';
import Contact from './contact';

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
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isModalOpen = document.body.hasAttribute('data-modal-open');
      setShowScrollTop(window.scrollY > 400 && !isModalOpen);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleModalState = () => {
      const isModalOpen = document.body.hasAttribute('data-modal-open');
      setShowScrollTop((prev) => prev && !isModalOpen);
    };
    const observer = new MutationObserver(handleModalState);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-modal-open'] });
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const experiences: ExperienceItem[] = [
    {
      id: 1,
      company: 'National Food Authority',
      role: 'Junior Full-Stack Developer',
      period: 'Jun 16, 2025 - Sept 17, 2025',
      description: 'We Developed a Document Tracking System for the National Food Authority to streamline inter-departmental workflows and improve record management efficiency.',
      achievements: [
        'Received a certificate of completion for our work',
        'Experienced office workflows and team collaboration',
        'Gained experience in client needs assessment',
      ],
      technologies: ['Vue.js', 'MySQL', 'Laravel', 'Github', 'Tailwind CSS'],
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative text-left">
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
              <div className="p-6 md:p-8 group cursor-default bg-black/40 backdrop-blur-xl rounded-[15px] relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
                <div className="relative z-10 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="mt-1 p-2 rounded-lg bg-primary/20 border border-primary/30 group-hover:border-primary/60 transition-colors shrink-0">
                        <Briefcase className="text-primary" size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold text-accent group-hover:text-primary transition-colors leading-tight">
                          {experience.role}
                        </h3>
                        <p className="text-foreground/70 font-medium">{experience.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-foreground/50 text-sm pl-14 sm:pl-0">
                      <Calendar size={16} />
                      <span>{experience.period}</span>
                    </div>
                  </div>
                  <p className="text-foreground/70 italic border-l-2 border-primary/30 pl-4 py-1">
                    {experience.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    {experience.achievements.map((achievement, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/5 backdrop-blur-sm">
                        <p className="text-sm text-foreground/70">{achievement}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-4">
                    {experience.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full border border-primary/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>

        <Contact />

        {/* --- BACK TO TOP BUTTON --- */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="fixed bottom-10 md:bottom-8 right-6 md:right-8 z-100 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-black/60 backdrop-blur-xl border border-primary/30 text-primary rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.3)]"
            >
              <ArrowUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}