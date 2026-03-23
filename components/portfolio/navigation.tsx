'use client'

import { JSX, useState } from 'react'
import { Menu, X } from 'lucide-react'
import GooeyNav from '..//GooeyNav'

export default function Navigation(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
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
              href="https://www.youtube.com/shorts/GQNW1IlvhcY" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <div className="text-2xl font-bold neon-glow-primary">DRIX</div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="md:block">
            <GooeyNav items={navItems} particleCount={10} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground/80">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-white/5 py-4 bg-[#030712]">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="block px-4 py-2 text-foreground/80 hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}