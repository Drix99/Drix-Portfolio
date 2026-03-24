'use client'

import { Briefcase, Calendar, X, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { JSX, useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // 1. YOUR WORK EXPERIENCE DATA
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

  // 2. EMAIL SENDING LOGIC
  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setErrorMessage(null);

    // Verified Credentials
    const SERVICE_ID = 'service_9tx02vf'; 
    const TEMPLATE_ID = 'template_u2skwm8'; 
    const PUBLIC_KEY = 'OosIK7AEL3K8Zl_xT'; 

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current!, PUBLIC_KEY)
      .then(() => {
        setIsSent(true);
        // Success feedback: Close modal after 3 seconds
        setTimeout(() => {
          setIsModalOpen(false);
          setIsSent(false);
        }, 3000);
      })
      .catch((err) => {
        console.error('EmailJS Error:', err);
        setErrorMessage("Failed to send. Please check your EmailJS dashboard settings.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative text-left">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold neon-glow-secondary mb-4 text-center">Work Experience</h2>
        <p className="text-center text-foreground/60 mb-16 max-w-2xl mx-auto">
          My professional journey building innovative solutions and growing as a developer.
        </p>

        {/* --- EXPERIENCE LIST --- */}
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

        {/* --- CONTACT SECTION TRIGGER --- */}
        <div id="contact" className="mt-20 text-center p-8 rounded-2xl bg-white/5 border border-accent/20 relative overflow-hidden backdrop-blur-md">
          <h3 className="text-3xl font-bold text-accent mb-4 tracking-tight">Ready to Work Together?</h3>
          <p className="text-foreground/70 mb-8 max-w-xl mx-auto text-lg">
            Whether it's a new project or just a 1v1 midlane only, my inbox is always open.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover-glow transition-all duration-300 w-full sm:w-fit"
            >
              Send Email
            </button>
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

        {/* --- CONTACT MODAL --- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-999 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="w-full max-w-lg bg-card border border-border rounded-xl shadow-[0_0_50px_rgba(0,255,136,0.15)] overflow-hidden animate-in zoom-in-95">
              
              {isSent ? (
                /* Success Screen */
                <div className="p-12 flex flex-col items-center justify-center text-center space-y-4">
                  <CheckCircle2 size={60} className="text-primary animate-bounce" />
                  <h4 className="text-2xl font-bold neon-glow-primary">Message Sent!</h4>
                  <p className="text-muted-foreground">I'll get back to you shortly.</p>
                </div>
              ) : (
                /* The Form */
                <>
                  <div className="px-6 py-5 border-b border-border flex justify-between items-start bg-white/5">
                    <div className="text-left">
                      <h4 className="text-xl font-bold neon-glow-primary leading-tight">Interested in working with me?</h4>
                      <p className="text-xs text-muted-foreground mt-1 font-mono uppercase tracking-widest">Compose an Email</p>
                    </div>
                    <button onClick={() => { setIsModalOpen(false); setErrorMessage(null); }} className="text-muted-foreground hover:text-primary transition-colors">
                      <X size={24} />
                    </button>
                  </div>

                  <form ref={formRef} onSubmit={handleSendEmail} className="p-6 space-y-4 text-left">
                    {/* Error Feedback */}
                    {errorMessage && (
                      <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex items-center gap-3 text-destructive animate-in slide-in-from-top-2">
                        <AlertCircle size={18} className="shrink-0" />
                        <p className="text-xs font-medium">{errorMessage}</p>
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-accent uppercase tracking-wide">From:</label>
                      <input name="user_email" required type="email" placeholder="Your email address" className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:ring-1 focus:ring-primary outline-none transition-all" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-accent uppercase tracking-wide">To:</label>
                      <input disabled value="audric.suarez.bscs2022@gmail.com" className="w-full px-4 py-2 bg-black/40 border border-border rounded-lg text-sm text-muted-foreground cursor-not-allowed" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-accent uppercase tracking-wide">Subject:</label>
                      <input name="subject" required type="text" placeholder="Project Inquiry" className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:ring-1 focus:ring-primary outline-none transition-all" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-accent uppercase tracking-wide">Message:</label>
                      <textarea name="message" required rows={4} placeholder="Your message..." className="w-full px-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:ring-1 focus:ring-primary outline-none resize-none transition-all"></textarea>
                    </div>

                    {/* SEND BUTTON WITH LOADING STATE */}
                    <button 
                      type="submit" 
                      disabled={isSending}
                      className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl flex items-center justify-center gap-3 hover-glow disabled:opacity-50 transition-all duration-300"
                    >
                      {isSending ? (
                        <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Send size={18} />
                      )}
                      {isSending ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}