'use client';
import { useState, useEffect } from 'react';

const links =[
  { label: 'À propos', href: '#about' },
  { label: 'Projets', href: '#projects' },
  { label: 'Expérience', href: '#experience' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Détecter le scroll pour appliquer l'effet Glassmorphism
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  },[]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-navy/80 backdrop-blur-xl border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.1)]' 
        : 'bg-transparent py-2'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#" className="font-mono text-lg font-bold text-white hover:text-purple transition-colors">
          &lt;ShegouB <span className="text-purple">/</span>&gt;
        </a>

        {/* Liens Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative font-mono text-[11px] text-muted hover:text-white transition-colors uppercase tracking-widest group"
            >
              {l.label}
              {/* Petit point violet qui apparaît au survol */}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </a>
          ))}
          
          {/* Bouton CV (Assure-toi que CV_Boris_DJAGOU.pdf est dans le dossier public) */}
          <a
            href="/CV_Boris_DJAGOU.pdf"
            download="CV_Boris_DJAGOU.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs px-5 py-2.5 border border-purple/50 text-white rounded-full hover:bg-purple hover:border-purple transition-all shadow-[0_0_10px_rgba(168,85,247,0)] hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center gap-2"
          >
            <span>CV</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </a>
        </div>

        {/* Menu Burger Mobile */}
        <button
          className="md:hidden text-white hover:text-purple transition-colors p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className="w-6 flex flex-col gap-1.5 items-end">
            <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'w-0 opacity-0' : 'w-4'}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`} />
          </div>
        </button>
      </div>

      {/* Menu Mobile Déroulant */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-navy/95 backdrop-blur-xl border-b border-border overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-mono text-sm text-muted hover:text-purple hover:translate-x-2 transition-all uppercase tracking-widest"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/CV_Boris_DJAGOU.pdf"
            download="CV_Boris_DJAGOU.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="font-mono text-sm text-white bg-purple/20 border border-purple/50 rounded-lg px-4 py-3 text-center mt-2 hover:bg-purple transition-colors"
          >
            Télécharger mon CV ↓
          </a>
        </div>
      </div>
    </nav>
  );
}