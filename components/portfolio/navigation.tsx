'use client'

import { JSX, useState } from 'react'
import { Menu, X } from 'lucide-react'
import GooeyNav from '../GooeyNav'

export default function Navigation(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b neon-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="shrink-0">
            <a 
              href="https://music.youtube.com/watch?v=qs3u9BPRyHg&list=RDAMVM6VVqFnleUVc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <div className="text-2xl font-bold neon-glow-primary">DRIX</div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <GooeyNav items={navItems} particleCount={10} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-foreground/80 hover:text-primary p-2 transition-colors relative z-60"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Updated with Gradient and Blur */}
        {isOpen && (
          <div className="md:hidden border-t border-white/5 py-4 
            absolute left-0 right-0 top-20 shadow-2xl
            bg-linear-to-b from-background/95 via-background/90 to-background/80 
            backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-300"
          >
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className="block px-6 py-4 text-lg text-foreground/80 hover:text-primary hover:bg-white/5 transition-all" 
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}