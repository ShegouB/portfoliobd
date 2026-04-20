'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const roles = [
  'Biochimiste 🧬',
  'Développeur IA 🤖',
  'Tech Entrepreneur 🚀',
  'Chercheur IoT ⚡',
  'Data Scientist 📊',
];

const stats = [
  { value: '94.74%', label: 'Précision modèle IA\noncologie (Deep Learning)' },
  { value: '803e', label: 'Classement mondial\nKaggle NeurIPS 2025' },
  { value: '30+', label: 'Plateformes web\ndéployées (RSV)' },
];

function useTypewriter(words: string[], typingSpeed = 90, deletingSpeed = 45, pauseMs = 1600) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setIsDeleting(true), pauseMs);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setIsDeleting(false);
          setWordIdx((i) => (i + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIdx, words, typingSpeed, deletingSpeed, pauseMs]);

  return text;
}

export default function HeroSection() {
  const typed = useTypewriter(roles);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20 pb-16 max-w-5xl mx-auto">
      {/* Tag */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-mono text-xs text-green tracking-widest mb-5 uppercase opacity-85"
      >
        // Basé à Cotonou, Bénin 🇧🇯
      </motion.p>

      {/* Nom */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-5xl md:text-7xl font-extrabold leading-none mb-3"
      >
        Boris{' '}
        <span className="gradient-text">Djagou</span>
      </motion.h1>

      {/* Typewriter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="text-xl md:text-2xl font-bold text-muted mb-8 h-8"
      >
        Je suis &nbsp;
        <span className="text-cyan">{typed}</span>
        <span className="animate-blink text-cyan">_</span>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="text-muted text-base leading-relaxed max-w-xl mb-10"
      >
        Professionnel pluridisciplinaire combinant la rigueur de la{' '}
        <strong className="text-text-main">biochimie</strong> avec la puissance de l&apos;
        <strong className="text-cyan">Intelligence Artificielle</strong>, du{' '}
        <strong className="text-green">développement Full-Stack</strong> et de l&apos;
        <strong className="text-amber">IoT embarqué</strong>. Certifié Empretec, je transforme la science en impact réel.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="flex flex-wrap gap-4 mb-16"
      >
        <a
          href="#projects"
          className="px-6 py-3 bg-cyan text-navy font-bold text-sm rounded hover:opacity-85 transition-opacity"
        >
          Voir mes Projets
        </a>
        <a
          href="https://github.com/ShegouB"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border border-cyan text-cyan font-bold text-sm rounded hover:bg-cyan/10 transition-colors"
        >
          GitHub @ShegouB
        </a>
        <a
          href="/CV_Boris_DJAGOU.pdf"
          download
          className="px-6 py-3 border border-border text-muted font-bold text-sm rounded hover:border-muted transition-colors"
        >
          Télécharger CV ↓
        </a>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-3 gap-6 pt-8 border-t border-border"
      >
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 + i * 0.1 }}
          >
            <div className="font-mono text-2xl md:text-3xl font-bold text-cyan">{s.value}</div>
            <div className="text-xs text-muted mt-1 leading-relaxed whitespace-pre-line">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-30"
      >
        <span className="font-mono text-xs text-muted">scroll</span>
        <div className="w-px h-8 bg-muted" />
      </motion.div>
    </section>
  );
}
