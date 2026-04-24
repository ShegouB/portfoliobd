'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const roles =[
  'Biochimiste 🧬',
  'Développeur IA 🤖',
  'Tech Entrepreneur 🚀',
  'Ingénieur IoT ⚡',
  'Data Scientist 📊',
];

const stats =[
  { value: '94.74%', label: 'Précision IA\n(Oncologie)' },
  { value: '803e', label: 'Monde Kaggle\n(NeurIPS 2025)' },
  { value: '30+', label: 'Plateformes web\ndéployées' },
];

function useTypewriter(words: string[], typingSpeed = 90, deletingSpeed = 45, pauseMs = 1600) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const[isDeleting, setIsDeleting] = useState(false);

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
  },[text, isDeleting, wordIdx, words, typingSpeed, deletingSpeed, pauseMs]);

  return text;
}

export default function HeroSection() {
  const typed = useTypewriter(roles);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 max-w-6xl mx-auto overflow-hidden">
      {/* Lueur d'arrière-plan type Figma */}
      <div className="absolute top-1/3 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-purple/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        {/* === PARTIE GAUCHE : TEXTE === */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Tag Localisation */}
          <p className="font-mono text-xs text-purple tracking-widest mb-6 uppercase opacity-90 border border-purple/30 inline-block px-4 py-1.5 rounded-full bg-purple/10">
            📍 Cotonou, Bénin 🇧🇯
          </p>

          {/* Nom */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">
            Boris <br />
            <span className="gradient-text">Djagou</span>
          </h1>

          {/* Typewriter */}
          <div className="text-xl md:text-2xl font-bold text-muted mb-6 h-8">
            <span className="text-white">{typed}</span>
            <span className="animate-pulse text-purple">|</span>
          </div>

          {/* Description */}
          <p className="text-muted text-base leading-relaxed max-w-lg mb-10">
            Professionnel pluridisciplinaire combinant la rigueur de la{' '}
            <strong className="text-white">biochimie</strong> avec la puissance de l&apos;
            <strong className="text-purple">Intelligence Artificielle</strong>, du{' '}
            <strong className="text-white">développement Full-Stack</strong> et de l&apos;
            <strong className="text-purple">IoT embarqué</strong>. Certifié Empretec, je transforme la science en impact réel.
          </p>

          {/* CTA Buttons (Les 3 boutons sont de retour !) */}
          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="#projects"
              className="px-6 py-3 bg-purple text-white font-bold text-sm rounded-full hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
            >
              Voir mes Projets
            </a>
            
            <a
              href="https://github.com/ShegouB"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-purple/50 text-purple font-bold text-sm rounded-full hover:bg-purple/10 transition-colors"
            >
              GitHub @ShegouB
            </a>

            {/* Bouton Télécharger CV (Nécessite le fichier CV_Boris_DJAGOU.pdf dans le dossier public) */}
            <a
              href="/CV_Boris_DJAGOU.pdf"
              download="CV_Boris_DJAGOU.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-border text-white font-bold text-sm rounded-full hover:border-purple hover:text-purple transition-all bg-navy2/50 backdrop-blur-sm flex items-center gap-2"
            >
              Télécharger CV
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </a>
          </div>

          {/* Stats Intégrées */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border/50">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <div className="font-mono text-xl md:text-3xl font-bold text-purple">{s.value}</div>
                <div className="text-[10px] md:text-xs text-muted mt-1 leading-relaxed whitespace-pre-line uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* === PARTIE DROITE : PHOTO === */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end mt-12 lg:mt-0"
        >
          {/* Anneau pointillé animé en rotation */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full border-2 border-dashed border-purple/30 animate-[spin_20s_linear_infinite]"></div>
          
          {/* Anneau glow interne */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[370px] md:h-[370px] rounded-full border border-purple/10 shadow-[inset_0_0_50px_rgba(168,85,247,0.1)] pointer-events-none"></div>

          {/* Conteneur de l'image (Nécessite profile.jpg dans public/) */}
          <div className="relative w-[260px] h-[260px] md:w-[350px] md:h-[350px] rounded-full overflow-hidden border-4 border-navy shadow-[0_0_40px_rgba(168,85,247,0.25)] z-10 bg-navy3 flex items-center justify-center">
            <img 
              src="/profile.jpg" 
              alt="Profil de Boris Djagou" 
              className="object-cover w-full h-full object-center hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                // Fallback si l'image n'est pas encore ajoutée
                (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Boris+Djagou&background=160A2A&color=A855F7&size=400';
              }}
            />
          </div>
          
          {/* Badge flottant style Figma */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-4 -left-4 md:left-4 bg-navy2/80 backdrop-blur-md border border-purple/30 px-5 py-3 rounded-2xl shadow-xl z-20 flex items-center gap-4 card-glow"
          >
            <div className="w-10 h-10 rounded-full bg-purple/20 flex items-center justify-center text-xl">
              🚀
            </div>
            <div>
              <p className="text-sm font-bold text-white">Top 803 Mondial</p>
              <p className="text-[10px] font-mono text-purple uppercase tracking-wider">Kaggle NeurIPS '25</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 hover:opacity-100 transition-opacity"
      >
        <span className="font-mono text-[10px] text-white uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-purple to-transparent" />
      </motion.div>
    </section>
  );
}