'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { ContactFormData } from '@/types';

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/borisdjagou', },
  { label: 'GitHub', href: 'https://github.com/ShegouB', },
  { label: 'Facebook', href: 'https://facebook.com/Borisdja2.0', },
];

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactSection() {
  const [form, setForm] = useState<ContactFormData>({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          to_email: 'djagouboris@gmail.com',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-6xl mx-auto relative">
      {/* Glow de fond pour le coin inférieur gauche */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple/5 rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 24 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
        className="mb-16"
      >
        <p className="font-mono text-xs text-purple tracking-widest uppercase mb-3">Contact</p>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Travaillons <span className="text-purple">ensemble</span>
        </h2>
        <div className="w-12 h-1 bg-purple rounded-full" />
      </motion.div>

      <div className="grid md:grid-cols-12 gap-12 items-start">
        {/* === GAUCHE : INFOS DE CONTACT === */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-5 lg:col-span-4"
        >
          <p className="text-muted text-sm leading-relaxed mb-10">
            Recruteur, partenaire R&amp;D ou futur collaborateur ? Je suis ouvert aux opportunités alliant 
            <strong className="text-white"> science</strong> et <strong className="text-purple">technologie</strong>.
          </p>

          <div className="space-y-6 mb-10">
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-lg bg-navy2 border border-border flex items-center justify-center text-purple group-hover:border-purple/50 transition-colors">
                📧
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted uppercase tracking-wider">Email</p>
                <a href="mailto:djagouboris@gmail.com" className="text-sm text-white hover:text-purple transition-colors font-semibold">
                  djagouboris@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-lg bg-navy2 border border-border flex items-center justify-center text-purple group-hover:border-purple/50 transition-colors">
                📞
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted uppercase tracking-wider">Téléphone</p>
                <p className="text-sm text-white font-semibold">+229 01 46 21 24 30</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-lg bg-navy2 border border-border flex items-center justify-center text-purple group-hover:border-purple/50 transition-colors">
                📍
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted uppercase tracking-wider">Localisation</p>
                <p className="text-sm text-white font-semibold">Cotonou, Bénin 🇧🇯</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-[11px] px-4 py-2.5 bg-navy2 border border-border text-muted hover:border-purple/50 hover:text-white rounded-xl transition-all card-glow"
              >
                <span>{s.icon}</span>
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* === DROITE : FORMULAIRE PREMIUM === */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-7 lg:col-span-8 bg-navy2/50 backdrop-blur-sm border border-border p-8 rounded-3xl shadow-2xl relative overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-mono text-[10px] text-muted uppercase tracking-widest ml-1">Nom Complet</label>
                <input
                  type="text" name="name" value={form.name} onChange={handleChange} required
                  placeholder="Ex: Jean Dupont"
                  className="w-full bg-navy border border-border rounded-xl px-4 py-3.5 text-sm text-white placeholder-muted/30 focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple/30 transition-all font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] text-muted uppercase tracking-widest ml-1">Email</label>
                <input
                  type="email" name="email" value={form.email} onChange={handleChange} required
                  placeholder="Ex: jean@exemple.com"
                  className="w-full bg-navy border border-border rounded-xl px-4 py-3.5 text-sm text-white placeholder-muted/30 focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple/30 transition-all font-mono"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="font-mono text-[10px] text-muted uppercase tracking-widest ml-1">Sujet</label>
              <input
                type="text" name="subject" value={form.subject} onChange={handleChange} required
                placeholder="Objet de votre message"
                className="w-full bg-navy border border-border rounded-xl px-4 py-3.5 text-sm text-white placeholder-muted/30 focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple/30 transition-all font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] text-muted uppercase tracking-widest ml-1">Message</label>
              <textarea
                name="message" value={form.message} onChange={handleChange} required rows={5}
                placeholder="Comment puis-je vous aider ?"
                className="w-full bg-navy border border-border rounded-xl px-4 py-3.5 text-sm text-white placeholder-muted/30 focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple/30 transition-all font-mono resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="group relative w-full py-4 bg-purple text-white font-bold rounded-xl overflow-hidden transition-all hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative flex items-center justify-center gap-2 text-sm uppercase tracking-widest">
                {status === 'sending' ? '🚀 Transmission...' : 'Envoyer le message'}
                {status === 'idle' && <span>→</span>}
              </span>
            </button>

            {/* Notifications de statut */}
            {status === 'success' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-xs text-green text-center bg-green/10 py-2 rounded-lg border border-green/20">
                ✓ Message transmis avec succès ! Je reviens vers vous rapidement.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-xs text-red-400 text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                ✗ Échec de l'envoi. Veuillez réessayer ou utiliser l'email direct.
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
