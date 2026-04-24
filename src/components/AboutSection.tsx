'use client';
import { motion } from 'framer-motion';

// Définition de tes stacks avec niveaux de progression
const skills =[
  { name: 'Machine Learning / Deep Learning', level: 92 },
  { name: 'Python (Data Science & Backend)', level: 90 },
  { name: 'Bio-informatique & Génomique', level: 85 },
  { name: 'Web Full-Stack (React, Node, Django)', level: 80 },
  { name: 'IoT & Embarqué (Arduino, ESP32)', level: 75 },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto relative">
      {/* En-tête de section */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-mono text-xs text-purple tracking-widest uppercase mb-3">// 01. À propos</p>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12">
          De la <span className="text-purple">théorie</span> à la pratique
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* === PARTIE GAUCHE : BIO & FORMATION (Carte Glassmorphism) === */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-navy2 p-8 rounded-3xl border border-border card-glow relative overflow-hidden shadow-2xl"
        >
          {/* Lueur d'arrière-plan de la carte */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple/10 rounded-bl-full blur-3xl pointer-events-none"></div>
          
          <h3 className="text-2xl font-bold mb-6 text-white">Profil Hybride</h3>
          
          <p className="text-muted leading-relaxed text-sm mb-4 relative z-10">
            Récemment diplômé en <strong className="text-white">Biochimie & Biologie Moléculaire</strong> à
            l&apos;Université d&apos;Abomey-Calavi, j&apos;ai construit un profil rare : celui d&apos;un scientifique
            devenu ingénieur logiciel et entrepreneur.
          </p>
          <p className="text-muted leading-relaxed text-sm mb-4 relative z-10">
            De la modélisation 3D de protéines à l&apos;architecture de systèmes IoT, en passant par le Deep Learning
            appliqué à l&apos;oncologie prédictive, je cultive une approche{' '}
            <strong className="text-purple">algorithmique et scientifique</strong> de tous les défis.
          </p>
          <p className="text-muted leading-relaxed text-sm mb-8 relative z-10">
            Fondateur de la communauté RSV (30+ plateformes web déployées), Lead chez Igbega X, et classé{' '}
            <strong className="text-white">803e mondial sur Kaggle NeurIPS 2025</strong>.
          </p>

          {/* Formation (Timeline épurée) */}
          <div className="space-y-4 relative z-10">
            <p className="font-mono text-xs text-purple tracking-wider uppercase border-b border-border/50 pb-2 inline-block">Parcours Académique</p>
            <div className="border-l-2 border-purple pl-4 relative">
              <div className="absolute w-2 h-2 bg-purple rounded-full -left-[5px] top-1.5 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
              <p className="text-sm font-bold text-white">Licence Pro — Biochimie & Biologie Moléculaire</p>
              <p className="font-mono text-[10px] text-muted mt-1 uppercase tracking-wider">FAST / UAC · 2024–2025</p>
            </div>
            <div className="border-l-2 border-border pl-4 relative">
              <div className="absolute w-2 h-2 bg-border rounded-full -left-[5px] top-1.5"></div>
              <p className="text-sm font-bold text-white/80">Licence — Sciences de la Vie et de la Terre</p>
              <p className="font-mono text-[10px] text-muted mt-1 uppercase tracking-wider">FAST / UAC · 2021–2024</p>
            </div>
          </div>
        </motion.div>

        {/* === PARTIE DROITE : BARRES DE PROGRESSION (Stacks) === */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8 mt-4 md:mt-0"
        >
          <h3 className="text-2xl font-bold text-white mb-2">Expertise Technique</h3>
          <p className="text-sm text-muted mb-8">Évaluation de ma maîtrise sur les différentes stacks technologiques.</p>

          <div className="space-y-7">
            {skills.map((skill, index) => (
              <div key={index} className="group">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-mono text-xs text-white tracking-wide">{skill.name}</span>
                  <span className="font-mono text-xs text-purple font-bold">{skill.level}%</span>
                </div>
                {/* Conteneur de la barre */}
                <div className="w-full bg-navy3 rounded-full h-2.5 overflow-hidden border border-border/50">
                  {/* Remplissage de la barre animé */}
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="h-full rounded-full bg-gradient-to-r from-purple to-[#E9D5FF] relative group-hover:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-shadow duration-300"
                  >
                    {/* Reflet lumineux sur la barre */}
                    <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/30 blur-[3px]"></div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

          {/* Outils secondaires (Tags minimalistes en bas) */}
          <div className="pt-8 mt-8 border-t border-border/50">
            <p className="font-mono text-xs text-muted tracking-wider uppercase mb-4">Outils & Environnements</p>
            <div className="flex flex-wrap gap-2">
              {['Git/GitHub', 'Linux (Ubuntu)', 'PostgreSQL', 'Firebase', 'Streamlit', 'ROS'].map((tool) => (
                <span key={tool} className="font-mono text-[10px] px-3 py-1.5 rounded-md bg-navy3 border border-border text-muted hover:text-white hover:border-purple/50 transition-colors cursor-default">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}