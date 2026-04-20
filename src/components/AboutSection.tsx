'use client';
import { motion } from 'framer-motion';

const skillGroups = [
  {
    label: 'IA & Data Science',
    color: 'cyan',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP', 'Computer Vision', 'Langflow', 'Pandas', 'NumPy'],
  },
  {
    label: 'Web & Mobile Full-Stack',
    color: 'green',
    skills: ['React.js', 'Vue.js', 'Next.js', 'Node.js', 'Django', 'TypeScript', 'PostgreSQL', 'Firebase', 'Streamlit'],
  },
  {
    label: 'IoT & Embarqué',
    color: 'amber',
    skills: ['Arduino', 'ESP32', 'Raspberry Pi', 'ROS', 'MicroPython', 'MQTT', 'C/C++', 'GPIO'],
  },
  {
    label: 'Sciences Biomédicales',
    color: 'purple',
    skills: ['Bio-informatique', 'Génomique', 'HACCP', 'Spectrophotométrie', 'Biomarqueurs', 'Cytométrie', 'DPPH'],
  },
];

const tagClasses: Record<string, string> = {
  cyan: 'bg-cyan/10 text-cyan border border-cyan/25',
  green: 'bg-green/10 text-green border border-green/25',
  amber: 'bg-amber/10 text-amber border border-amber/25',
  purple: 'bg-purple/10 text-purple border border-purple/25',
};

const labelClasses: Record<string, string> = {
  cyan: 'text-cyan', green: 'text-green', amber: 'text-amber', purple: 'text-purple',
};

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-mono text-xs text-green tracking-widest uppercase mb-3">// 01. À propos</p>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-3">
          Labo → Code →{' '}
          <span className="text-cyan">Entreprise</span>
        </h2>
        <div className="w-10 h-0.5 bg-cyan mb-10" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-muted leading-relaxed text-sm mb-4">
            Récemment diplômé en <strong className="text-text-main">Biochimie & Biologie Moléculaire</strong> à
            l&apos;Université d&apos;Abomey-Calavi, j&apos;ai construit un profil rare : celui d&apos;un scientifique
            devenu ingénieur logiciel et entrepreneur.
          </p>
          <p className="text-muted leading-relaxed text-sm mb-4">
            De la modélisation 3D de protéines à l&apos;architecture de systèmes IoT, en passant par le Deep Learning
            appliqué à l&apos;oncologie prédictive, je cultive une approche{' '}
            <strong className="text-text-main">algorithmique et scientifique</strong> de tous les défis.
          </p>
          <p className="text-muted leading-relaxed text-sm mb-6">
            Fondateur de la communauté RSV (30+ plateformes web déployées), Lead chez Igbega X, classé{' '}
            <strong className="text-cyan">803e mondial sur Kaggle NeurIPS 2025</strong> — je ne sépare jamais la
            théorie de la pratique.
          </p>

          {/* Formation */}
          <div className="space-y-3">
            <p className="font-mono text-xs text-green tracking-wider uppercase">Formation</p>
            <div className="border-l-2 border-cyan pl-4">
              <p className="text-sm font-semibold">Licence Pro — Biochimie & Biologie Moléculaire</p>
              <p className="font-mono text-xs text-muted">FAST / UAC · 2024–2025</p>
            </div>
            <div className="border-l-2 border-border pl-4">
              <p className="text-sm font-semibold">Licence — Sciences de la Vie et de la Terre</p>
              <p className="font-mono text-xs text-muted">FAST / UAC · 2021–2024</p>
            </div>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-5"
        >
          {skillGroups.map((g, i) => (
            <div key={i}>
              <p className={`font-mono text-xs tracking-wider uppercase mb-2 ${labelClasses[g.color]}`}>
                {g.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <span key={s} className={`font-mono text-xs px-2.5 py-1 rounded-sm ${tagClasses[g.color]}`}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
