'use client'

import { ArrowUp, Briefcase, Calendar } from 'lucide-react'
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
      if (isModalOpen) {
        // Hide button when modal opens
        setShowScrollTop(false);
      } else {
        // Restore button visibility based on scroll position when modal closes
        setShowScrollTop(window.scrollY > 400);
      }
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
              className="w-full"
              borderRadius={24}
              glowRadius={120}
              glowIntensity={1}
              colors={['rgba(0,255,136,0.35)', 'rgba(0,212,255,0.22)', 'rgba(255,255,255,0.05)']}
              backgroundColor="rgba(10,14,39,0.92)"
            >
              <div className="relative z-10 p-6 md:p-8 rounded-[inherit]">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="mt-1 p-2 rounded-lg bg-primary/20 border border-primary/30 transition-colors shrink-0">
                        <Briefcase className="text-primary" size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold text-accent transition-colors leading-tight">
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

        <AnimatePresence>
          {showScrollTop && (
            <motion.div className="mt-8 flex justify-center w-full">
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToTop}
                className="group inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-[0.35em] transition duration-300 hover:text-white"
              >
                <span className="transition-colors duration-300 group-hover:text-white">Back to top</span>
                <ArrowUp className="transition-colors duration-300 group-hover:text-white" size={14} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}