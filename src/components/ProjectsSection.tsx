'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types';

// On mappe les ID exacts de Notion avec de beaux labels pour l'interface
const CATEGORIES =[
  { id: 'Tous', label: 'Tous' },
  { id: 'IA', label: 'Intelligence Artificielle' },
  { id: 'Bioinformatics', label: 'Bio-informatique' },
  { id: 'IoT', label: 'IoT & Embarqué' },
  { id: 'Web', label: 'Web Full-Stack' },
];

function ProjectCard({ p, index }: { p: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative bg-navy2 border border-border rounded-2xl overflow-hidden hover:border-purple/50 transition-all duration-500 card-glow flex flex-col shadow-lg"
    >
      {/* Design type Figma: Zone supérieure abstraite pour remplacer l'image */}
      <div className="h-32 bg-navy3 relative overflow-hidden flex items-center justify-center border-b border-border/50">
         {/* Effet de lueur radiale interne */}
         <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple via-navy to-navy group-hover:opacity-50 transition-opacity duration-500"></div>
         <h3 className="font-extrabold text-xl md:text-2xl text-white/90 z-10 text-center px-4 font-syne tracking-wide group-hover:scale-105 transition-transform duration-500">
           {p.title}
         </h3>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        {/* Badge Catégorie */}
        <div className="mb-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-purple bg-purple/10 border border-purple/20 px-3 py-1.5 rounded-full inline-block">
            {CATEGORIES.find(c => c.id.toLowerCase() === p.category?.toLowerCase())?.label || p.category}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-sm text-muted leading-relaxed mb-6 flex-1">
          {p.description}
        </p>

        {/* Métrique / Résultat (ex: 94% précision) */}
        {p.metric && (
          <p className="font-mono text-xs mb-5 text-white font-semibold flex items-center gap-2 bg-navy3/50 w-fit px-3 py-1.5 rounded-lg border border-border">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple"></span>
            </span>
            {p.metric}
          </p>
        )}

        {/* Tags des technologies */}
        {p.tags && p.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {p.tags.slice(0, 4).map((t) => (
              <span key={t} className="font-mono text-[10px] px-2.5 py-1.5 bg-navy3 border border-border text-muted rounded-md group-hover:border-purple/30 transition-colors">
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Boutons d'action (GitHub / Demo) */}
        <div className="flex gap-3 mt-auto pt-5 border-t border-border/50">
          {p.githubUrl && (
            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 font-mono text-xs px-4 py-2.5 bg-navy3 border border-border text-white hover:bg-purple hover:border-purple rounded-xl transition-all text-center flex items-center justify-center gap-2">
              <span>Code source</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
            </a>
          )}
          {p.demoUrl && (
            <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 font-mono text-xs px-4 py-2.5 bg-purple text-white hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] rounded-xl transition-all text-center flex items-center justify-center gap-2">
              <span>Live Demo</span>
              <span className="text-lg leading-none">↗</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>('Tous');

  // Le filtre compare maintenant l'identifiant Notion exact, en ignorant la casse
  const filtered = active === 'Tous' 
    ? projects 
    : projects.filter((p) => p.category?.toLowerCase().trim() === active.toLowerCase());

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="font-mono text-xs text-purple tracking-widest uppercase mb-3">Projets & Recherche &Développement</p>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-10">
          Featured <span className="text-purple">Projects</span>
        </h2>
      </motion.div>

      {/* Barre de Filtres */}
      <div className="flex flex-wrap gap-3 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`font-mono text-xs px-5 py-2.5 rounded-full border transition-all duration-300 ${
              active === cat.id
                ? 'border-purple text-white bg-purple/20 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'border-border text-muted hover:border-purple/50 hover:text-white bg-navy2'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grille des projets */}
      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Message si aucun projet (design amélioré) */}
      {filtered.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="w-full py-20 mt-8 flex flex-col items-center justify-center bg-navy2/50 rounded-3xl border border-border border-dashed"
        >
          <span className="text-4xl mb-4">🔍</span>
          <p className="text-white font-bold mb-2">Aucun projet trouvé</p>
          <p className="text-muted font-mono text-xs">Je n'ai pas encore publié de projet dans cette catégorie.</p>
        </motion.div>
      )}
    </section>
  );
}
