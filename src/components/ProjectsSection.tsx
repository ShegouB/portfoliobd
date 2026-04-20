'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, ProjectCategory } from '@/types';

const CATEGORIES: ProjectCategory[] = [
  'Tous', 'Intelligence Artificielle', 'Bio-informatique', 'IoT / Embarqué', 'Web Full-Stack',
];

const catStyle: Record<string, { label: string; border: string; text: string; bg: string }> = {
  'Intelligence Artificielle': { label: 'IA', border: 'border-cyan', text: 'text-cyan', bg: 'bg-cyan/10' },
  'Bio-informatique': { label: 'Bio', border: 'border-purple', text: 'text-purple', bg: 'bg-purple/10' },
  'IoT / Embarqué': { label: 'IoT', border: 'border-amber', text: 'text-amber', bg: 'bg-amber/10' },
  'Web Full-Stack': { label: 'Web', border: 'border-green', text: 'text-green', bg: 'bg-green/10' },
};

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const style = catStyle[p.category] ?? catStyle['Web Full-Stack'];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`group relative bg-navy2 border border-border rounded-lg p-5 hover:border-cyan/50 transition-all duration-300 card-glow overflow-hidden flex flex-col`}
    >
      {/* Top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${style.bg} opacity-0 group-hover:opacity-100 transition-opacity`}
        style={{ background: style.text === 'text-cyan' ? '#00E5FF' : style.text === 'text-green' ? '#00FF88' : style.text === 'text-amber' ? '#FFD86B' : '#C878FF' }}
      />

      {/* Category badge */}
      <p className={`font-mono text-xs uppercase tracking-widest mb-3 ${style.text}`}>{p.category}</p>

      <h3 className="font-bold text-sm leading-snug mb-2 text-text-main">{p.title}</h3>
      <p className="text-xs text-muted leading-relaxed mb-3 flex-1">{p.description}</p>

      {p.metric && (
        <p className={`font-mono text-xs mb-3 ${style.text}`}>↗ {p.metric}</p>
      )}

      {/* Tags */}
      {p.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.tags.slice(0, 4).map((t) => (
            <span key={t} className="font-mono text-xs px-2 py-0.5 bg-navy3 border border-border text-muted rounded-sm">
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Links */}
      <div className="flex gap-2">
        {p.githubUrl && (
          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
            className="font-mono text-xs px-3 py-1.5 border border-border text-muted hover:border-cyan hover:text-cyan rounded-sm transition-colors">
            GitHub →
          </a>
        )}
        {p.demoUrl && (
          <a href={p.demoUrl} target="_blank" rel="noopener noreferrer"
            className="font-mono text-xs px-3 py-1.5 border border-border text-muted hover:border-green hover:text-green rounded-sm transition-colors">
            Demo →
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<ProjectCategory>('Tous');

  const filtered = active === 'Tous' ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-24 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="font-mono text-xs text-green tracking-widest uppercase mb-3">// 02. Projets & R&D</p>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-3">
          Ce que j&apos;ai{' '}
          <span className="text-green">construit</span>
        </h2>
        <div className="w-10 h-0.5 bg-green mb-8" />
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`font-mono text-xs px-4 py-1.5 rounded-sm border transition-all ${
              active === cat
                ? 'border-cyan text-cyan bg-cyan/10'
                : 'border-border text-muted hover:border-cyan/50 hover:text-cyan/70'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-muted font-mono text-sm text-center py-16">Aucun projet dans cette catégorie.</p>
      )}
    </section>
  );
}
