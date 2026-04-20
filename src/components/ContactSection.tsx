'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { ContactFormData } from '@/types';

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/borisdjagou' },
  { label: 'GitHub', href: 'https://github.com/ShegouB' },
  { label: 'Email', href: 'mailto:djagouboris@gmail.com' },
  { label: 'Facebook', href: 'https://facebook.com/Borisdja2.0' },
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
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="font-mono text-xs text-green tracking-widest uppercase mb-3">// 05. Contact</p>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-3">
          Travaillons <span className="text-green">ensemble</span>
        </h2>
        <div className="w-10 h-0.5 bg-green mb-10" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Gauche : info */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-muted text-sm leading-relaxed mb-8">
            Recruteur, partenaire R&amp;D, investisseur ou collaborateur ? Je suis ouvert à toutes les opportunités
            qui allient <strong className="text-text-main">science, technologie et impact réel</strong>.
          </p>
          <div className="space-y-3 mb-8">
            <div>
              <p className="font-mono text-xs text-muted uppercase tracking-wider mb-1">Email</p>
              <a href="mailto:djagouboris@gmail.com" className="font-mono text-sm text-cyan hover:underline">
                djagouboris@gmail.com
              </a>
            </div>
            <div>
              <p className="font-mono text-xs text-muted uppercase tracking-wider mb-1">Téléphone</p>
              <p className="font-mono text-sm text-text-main">+229 01 46 21 24 30</p>
            </div>
            <div>
              <p className="font-mono text-xs text-muted uppercase tracking-wider mb-1">Localisation</p>
              <p className="font-mono text-sm text-text-main">Cotonou, Bénin 🇧🇯</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="font-mono text-xs px-4 py-2 border border-border text-muted hover:border-green hover:text-green rounded-sm transition-colors"
              >
                {s.label} →
              </a>
            ))}
          </div>
        </motion.div>

        {/* Droite : formulaire */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-xs text-muted uppercase tracking-wider block mb-1.5">Nom</label>
                <input
                  type="text" name="name" value={form.name} onChange={handleChange} required
                  placeholder="Boris Djagou"
                  className="w-full bg-navy2 border border-border rounded-sm px-3 py-2.5 text-sm text-text-main placeholder-muted/40 focus:outline-none focus:border-cyan transition-colors font-mono"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-muted uppercase tracking-wider block mb-1.5">Email</label>
                <input
                  type="email" name="email" value={form.email} onChange={handleChange} required
                  placeholder="vous@exemple.com"
                  className="w-full bg-navy2 border border-border rounded-sm px-3 py-2.5 text-sm text-text-main placeholder-muted/40 focus:outline-none focus:border-cyan transition-colors font-mono"
                />
              </div>
            </div>
            <div>
              <label className="font-mono text-xs text-muted uppercase tracking-wider block mb-1.5">Sujet</label>
              <input
                type="text" name="subject" value={form.subject} onChange={handleChange} required
                placeholder="Proposition de collaboration"
                className="w-full bg-navy2 border border-border rounded-sm px-3 py-2.5 text-sm text-text-main placeholder-muted/40 focus:outline-none focus:border-cyan transition-colors font-mono"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-muted uppercase tracking-wider block mb-1.5">Message</label>
              <textarea
                name="message" value={form.message} onChange={handleChange} required rows={5}
                placeholder="Décrivez votre projet ou opportunité..."
                className="w-full bg-navy2 border border-border rounded-sm px-3 py-2.5 text-sm text-text-main placeholder-muted/40 focus:outline-none focus:border-cyan transition-colors font-mono resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-3 bg-cyan text-navy font-bold text-sm rounded-sm hover:opacity-85 transition-opacity disabled:opacity-50 font-syne"
            >
              {status === 'sending' ? 'Envoi en cours...' : 'Envoyer le message →'}
            </button>

            {status === 'success' && (
              <p className="font-mono text-xs text-green text-center">
                ✓ Message envoyé ! Je vous répondrai sous 24h.
              </p>
            )}
            {status === 'error' && (
              <p className="font-mono text-xs text-red-400 text-center">
                ✗ Erreur lors de l&apos;envoi. Écrivez directement à djagouboris@gmail.com
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
