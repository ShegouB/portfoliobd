'use client';
import { motion } from 'framer-motion';

const experiences = [
  {
    role: 'Lead Formation & Recherche / Tech Entrepreneur',
    org: 'Igbega X',
    date: '2023 – Présent',
    color: '#00E5FF',
    desc: 'Conception et animation de programmes de recherche avancés en Python, IA et Bio-informatique. Pilotage de la modélisation 3D de protéines et exploration de nouveaux paradigmes de simulation numérique. Injection de méthodes entrepreneuriales dans les processus de recherche.',
  },
  {
    role: 'Fondateur & Lead — Communauté RSV',
    org: 'Réussir Sa Vie (RSV)',
    date: 'Oct. 2024 – Oct. 2025',
    color: '#00FF88',
    desc: 'Structuration d\'une communauté d\'ingénierie via Discord & Google Workspace. Pôle Web : 30+ plateformes web déployées (React, Vue, Node, Django). Pôle IA : ateliers Deep Learning, NLP, Computer Vision. Pôle Langues : anglais technique.',
  },
  {
    role: 'Stage — Ingénierie Qualité & Éco-innovation',
    org: 'AMDA SARL',
    date: 'Déc. 2025 – Fév. 2026',
    color: '#FFD86B',
    desc: 'Transformation agroalimentaire et contrôle rigoureux des paramètres physico-chimiques (°Brix, pH). Implémentation des processus industriels selon les normes HACCP et méthode FIFO pour la gestion des stocks.',
  },
  {
    role: 'Stages Académiques — Recherche Laboratoire',
    org: 'Lab. Biologie Cellulaire (UAC) & Lab. BioIvov',
    date: 'Mars 2024 – Juil. 2025',
    color: '#C878FF',
    desc: 'Extraction d\'huiles essentielles (hydrodistillation), évaluation de l\'activité antioxydante (DPPH, IC50), spectrophotométrie. Diagnostic clinique (cytométrie, réfractométrie), analyse membranaire, identification fongique et parasitaire.',
  },
];

const certifications = [
  { icon: '🏆', type: 'Compétition', title: 'Google Code Golf NeurIPS 2025 (Kaggle)', detail: '803e mondial / 1 400+ participants · 312 problèmes résolus' },
  { icon: '📜', type: 'Certification', title: 'Empretec / CNUCED', detail: '10 Comportements de l\'Entrepreneur — ADPME Bénin 2026' },
  { icon: '🤖', type: 'Certification', title: 'Kaggle / FORCE-N', detail: 'Machine Learning, Python, IA pour Tous' },
  { icon: '🔬', type: 'Certification', title: 'Sécurité Alimentaire HACCP', detail: 'AFD / UM6P / AUF — Normes industrielles internationales' },
  { icon: '⚡', type: 'Événement', title: 'Arduino Days 2024 & 2025', detail: 'Sèmè City Open Park — Hardware/software hybride' },
  { icon: '📋', type: 'Certification', title: 'Gestion de Projet Agile', detail: 'OpenClassrooms' },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="font-mono text-xs text-green tracking-widest uppercase mb-3">// 03. Expérience & Leadership</p>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-3">
          Mon <span className="text-cyan">parcours</span>
        </h2>
        <div className="w-10 h-0.5 bg-cyan mb-10" />
      </motion.div>

      {/* Timeline */}
      <div className="space-y-4 mb-16">
        {experiences.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-navy2 border border-border rounded-lg p-5"
            style={{ borderLeft: `3px solid ${e.color}` }}
          >
            <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
              <span className="font-bold text-sm text-text-main">{e.role}</span>
              <span className="font-mono text-xs text-muted shrink-0">{e.date}</span>
            </div>
            <p className="font-mono text-xs mb-3" style={{ color: e.color }}>{e.org}</p>
            <p className="text-xs text-muted leading-relaxed">{e.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Certifications */}
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="font-mono text-xs text-green tracking-widest uppercase mb-5">// Certifications & Compétitions</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {certifications.map((c, i) => (
            <div key={i} className="bg-navy2 border border-border rounded-lg p-4">
              <p className="font-mono text-xs text-muted uppercase tracking-wider mb-2">
                {c.icon} {c.type}
              </p>
              <h4 className="text-sm font-semibold text-text-main mb-1">{c.title}</h4>
              <p className="text-xs text-muted leading-relaxed">{c.detail}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
