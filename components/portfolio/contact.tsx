'use client'

import { AlertCircle, Terminal, User, Mail, MessageSquare, Send, CheckCircle2, X } from 'lucide-react'
import { JSX, FormEvent, useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'

export default function Contact(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (isModalOpen) {
      document.body.setAttribute('data-modal-open', 'true')
      document.body.style.overflow = 'hidden'
    } else {
      document.body.removeAttribute('data-modal-open')
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.removeAttribute('data-modal-open')
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSending(true)
    setErrorMessage(null)

    const SERVICE_ID = 'service_9tx02vf'
    const TEMPLATE_ID = 'template_u2skwm8'
    const PUBLIC_KEY = 'OosIK7AEL3K8Zl_xT'

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current!, PUBLIC_KEY)
      .then(() => {
        setIsSent(true)
        setTimeout(() => {
          setIsModalOpen(false)
          setIsSent(false)
        }, 3000)
      })
      .catch((err) => {
        console.error('EmailJS Error:', err)
        setErrorMessage('Failed to send. Please check your dashboard settings.')
      })
      .finally(() => {
        setIsSending(false)
      })
  }

  return (
    <>
      <div id="contact" className="mt-20 text-center p-8 rounded-2xl bg-white/5 border border-accent/20 relative overflow-hidden backdrop-blur-md">
        <h3 className="text-3xl font-bold text-accent mb-4 tracking-tight">Ready to Work Together?</h3>
        <p className="text-foreground/70 mb-8 max-w-xl mx-auto text-lg">
          Whether it's a new project or just a 1v1 midlane only, my inbox is always open.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 bg-primary text-black font-black rounded-xl hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] transition-all uppercase italic w-full sm:w-fit"
          >
            Send Email
          </button>
          <a
            href="https://www.linkedin.com/in/audric-suarez-938403375/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border-2 border-accent text-accent font-semibold rounded-xl hover:bg-accent/10 transition-all w-full sm:w-fit text-center"
          >
            Connect on LinkedIn
          </a>
        </div>
        <p className="mt-6 text-[10px] font-mono text-foreground/30 uppercase tracking-[0.3em]">
            Average Response Time: &lt; 24 Hours
          </p>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
            />

            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 w-full md:inset-auto md:top-[55%] md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-auto z-50"
            >
              <div className="bg-[#0c0c0c] border-t md:border border-white/10 rounded-t-[2.5rem] md:rounded-2xl p-6 md:p-8 shadow-2xl relative md:w-96 h-full md:h-auto">
                <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-8 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white hover:text-primary transition-all z-20 cursor-pointer"
                  type="button"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>

                {isSent ? (
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="py-20 flex flex-col items-center text-center space-y-4">
                    <CheckCircle2 size={64} className="text-primary mb-4" />
                    <h4 className="text-3xl font-black text-white italic uppercase">Signal Sent</h4>
                    <p className="text-white/40 font-mono text-xs uppercase tracking-widest">Message processed successfully.</p>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                        <Terminal className="text-primary" size={24} />
                      </div>
                      <div>
                        <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">New_Inquiry</h4>
                        <p className="text-primary/60 font-mono text-[10px] uppercase tracking-[0.3em]">Direct_Channel: Established</p>
                      </div>
                    </div>

                    <form ref={formRef} onSubmit={handleSendEmail} className="space-y-4">
                      <input type="hidden" name="title" value="Portfolio" />
                      <input type="hidden" name="subject" value="Contact Form Submission" />

                      {errorMessage && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-xs font-bold uppercase italic">
                          <AlertCircle size={18} /> {errorMessage}
                        </div>
                      )}

                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={16} />
                        <input name="user_name" required type="text" placeholder="NAME_IDENTIFIER" className="w-full bg-white/3 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-mono text-sm focus:border-primary/50 focus:outline-none transition-all placeholder:text-white/10" />
                      </div>

                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={16} />
                        <input name="user_email" required type="email" placeholder="EMAIL_ADDRESS" className="w-full bg-white/3 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-mono text-sm focus:border-primary/50 focus:outline-none transition-all placeholder:text-white/10" />
                      </div>

                      <div className="relative group">
                        <MessageSquare className="absolute left-4 top-5 text-white/20 group-focus-within:text-primary transition-colors" size={16} />
                        <textarea name="message" required rows={4} placeholder="TRANSMIT_MESSAGE_DATA..." className="w-full bg-white/3 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-mono text-sm focus:border-primary/50 focus:outline-none resize-none transition-all placeholder:text-white/10" />
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        disabled={isSending}
                        className="w-full py-5 bg-primary text-black font-black rounded-2xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(34,197,94,0.3)] disabled:opacity-50 uppercase italic tracking-widest mt-4"
                      >
                        {isSending ? <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" /> : (
                          <>
                            <Send size={18} />
                            <span>Initialize Send</span>
                          </>
                        )}
                      </motion.button>
                    </form>
                    <p className="text-center text-[10px] font-mono text-white/20 mt-8 tracking-widest uppercase italic">Secure Encryption Enabled</p>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
