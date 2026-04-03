'use client'

import { JSX, useState } from 'react'
import { Menu, X, Code2, FileText, Mail } from 'lucide-react'

export default function Navigation(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'PROJECTS', href: '#projects', icon: <Code2 size={16} /> },
    { label: 'RESUME', href: '#resume', icon: <FileText size={16} /> },
    { label: 'CONTACT', href: '#contact', icon: <Mail size={16} />, isButton: true },
  ]

  return (
    <nav className="fixed top-8 left-0 right-0 z-50 flex justify-center px-4">
      {/* Main Pill Container 
          Using your --border and --background variables 
      */}
      <div className="flex items-center bg-card/90 backdrop-blur-xl px-2 py-2 rounded-full border border-border shadow-2xl shadow-black/50">
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] font-bold tracking-[0.15em] transition-all duration-300
                ${item.isButton 
                  ? 'bg-primary text-primary-foreground hover:brightness-110 shadow-[0_0_15px_rgba(0,255,136,0.4)]' 
                  : 'text-muted-foreground hover:text-primary'
                }`}
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center px-2">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-foreground p-2 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="absolute top-20 left-4 right-4 bg-card/95 backdrop-blur-2xl rounded-3xl p-3 border border-border shadow-2xl md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-bold tracking-widest
                  ${item.isButton ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-white/5 hover:text-primary'}`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}