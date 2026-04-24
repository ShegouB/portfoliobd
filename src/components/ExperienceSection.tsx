'use client';
import { motion } from 'framer-motion';

const experiences =[
  {
    role: 'Lead Formation & Recherche / Tech Entrepreneur',
    org: 'Igbega X',
    date: '2023 – Présent',
    color: '#A855F7', // Violet
    desc: 'Conception et animation de programmes de recherche avancés en Python, IA et Bio-informatique. Pilotage de la modélisation 3D de protéines et exploration de nouveaux paradigmes de simulation numérique. Injection de méthodes entrepreneuriales dans les processus de recherche.',
  },
  {
    role: 'Fondateur & Lead — Communauté RSV',
    org: 'Réussir Sa Vie (RSV)',
    date: 'Oct. 2024 – Oct. 2025',
    color: '#D8B4FE', // Lilas clair
    desc: 'Structuration d\'une communauté d\'ingénierie via Discord & Google Workspace. Pôle Web : 30+ plateformes web déployées (React, Vue, Node, Django). Pôle IA : ateliers Deep Learning, NLP, Computer Vision. Pôle Langues : anglais technique.',
  },
  {
    role: 'Stage — Ingénierie Qualité & Éco-innovation',
    org: 'AMDA SARL',
    date: 'Déc. 2025 – Fév. 2026',
    color: '#00E5FF', // Cyan pour contraster
    desc: 'Transformation agroalimentaire et contrôle rigoureux des paramètres physico-chimiques (°Brix, pH). Implémentation des processus industriels selon les normes HACCP et méthode FIFO pour la gestion des stocks.',
  },
  {
    role: 'Stages Académiques — Recherche Laboratoire',
    org: 'Lab. Biologie Cellulaire (UAC) & Lab. BioIvov',
    date: 'Mars 2024 – Juil. 2025',
    color: '#E9D5FF', // Violet très clair
    desc: 'Extraction d\'huiles essentielles (hydrodistillation), évaluation de l\'activité antioxydante (DPPH, IC50), spectrophotométrie. Diagnostic clinique (cytométrie, réfractométrie), analyse membranaire, identification fongique et parasitaire.',
  },
];

// AJOUT DU CHAMP 'url' POUR RENDRE CLIQUABLE
const certifications =[
  { 
    icon: '🏆', 
    type: 'Compétition', 
    title: 'Google Code Golf NeurIPS 2025', 
    detail: '803e mondial / 1 400+ participants',
    url: 'https://www.kaggle.com/' // Lien vers la page Kaggle
  },
  { 
    icon: '📜', 
    type: 'Certification', 
    title: 'Empretec / CNUCED', 
    detail: '10 Comportements de l\'Entrepreneur',
    url: '/certif-empretec.pdf' // Exemple : Place 'certif-empretec.pdf' dans ton dossier 'public'
  },
  { 
    icon: '🤖', 
    type: 'Certification', 
    title: 'Kaggle / FORCE-N', 
    detail: 'Machine Learning, Python, IA pour Tous',
    url: 'https://www.kaggle.com/learn'
  },
  { 
    icon: '🔬', 
    type: 'Certification', 
    title: 'Sécurité Alimentaire HACCP', 
    detail: 'AFD / UM6P / AUF',
    url: '/certif-haccp.pdf' // Place ce PDF dans 'public'
  },
  { 
    icon: '⚡', 
    type: 'Événement', 
    title: 'Arduino Days 2024 & 2025', 
    detail: 'Sèmè City Open Park',
    url: '#' // Laisse '#' si pas de lien
  },
  { 
    icon: '📋', 
    type: 'Certification', 
    title: 'Gestion de Projet Agile', 
    detail: 'OpenClassrooms',
    url: 'https://openclassrooms.com/'
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6 max-w-6xl mx-auto">
      {/* En-tête */}
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="font-mono text-xs text-purple tracking-widest uppercase mb-3">// 03. Expérience & Leadership</p>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12">
          Mon <span className="text-purple">parcours</span>
        </h2>
      </motion.div>

      {/* Grid pour séparer la timeline des certifications */}
      <div className="grid lg:grid-cols-12 gap-12">
        
        {/* === PARTIE GAUCHE : TIMELINE EXPERIENCES === */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-2xl font-bold text-white mb-6">Expériences Professionnelles</h3>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {experiences.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                {/* Icône sur la ligne du temps */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-navy bg-navy2 absolute left-0 md:left-1/2 -translate-x-1/2 z-10 group-hover:scale-110 transition-transform duration-300" style={{ borderColor: '#0B0415' }}>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: e.color }}></div>
                </div>

                {/* Contenu de la carte */}
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-navy2 border border-border p-6 rounded-2xl shadow-xl hover:border-purple/50 card-glow transition-all ml-12 md:ml-0">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-navy3 text-muted">{e.date}</span>
                  </div>
                  <h4 className="font-bold text-lg text-white mb-1">{e.role}</h4>
                  <p className="font-mono text-xs mb-4" style={{ color: e.color }}>{e.org}</p>
                  <p className="text-sm text-muted leading-relaxed">{e.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* === PARTIE DROITE : CERTIFICATIONS CLIQUABLES === */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-bold text-white mb-6">Certifications & Prix</h3>
            
            <div className="grid gap-4">
              {certifications.map((c, i) => (
                <a 
                  key={i} 
                  href={c.url}
                  target={c.url !== '#' ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className={`relative flex items-center gap-4 bg-navy2 border border-border rounded-2xl p-5 overflow-hidden group transition-all duration-300 ${c.url !== '#' ? 'hover:border-purple/50 card-glow cursor-pointer' : 'opacity-80 cursor-default'}`}
                >
                  {/* Effet de brillance au survol */}
                  {c.url !== '#' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple/0 via-purple/5 to-purple/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  )}
                  
                  {/* Icône */}
                  <div className="w-12 h-12 rounded-xl bg-navy3 flex items-center justify-center text-2xl border border-border/50 group-hover:scale-105 transition-transform">
                    {c.icon}
                  </div>
                  
                  {/* Texte */}
                  <div className="flex-1 z-10">
                    <p className="font-mono text-[10px] text-purple tracking-widest uppercase mb-1">{c.type}</p>
                    <h4 className="text-sm font-bold text-white group-hover:text-purple transition-colors mb-0.5">{c.title}</h4>
                    <p className="text-xs text-muted">{c.detail}</p>
                  </div>

                  {/* Flèche de lien sortant (seulement si le lien existe) */}
                  {c.url !== '#' && (
                    <div className="text-muted group-hover:text-purple transition-colors group-hover:translate-x-1 group-hover:-translate-y-1 transform duration-300">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                  )}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}