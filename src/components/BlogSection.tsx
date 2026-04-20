'use client';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types';

export default function BlogSection({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;

  return (
    <section id="blog" className="py-24 px-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="font-mono text-xs text-green tracking-widest uppercase mb-3">// 04. Journal de Bord</p>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-3">
          Mes <span className="text-purple">réflexions</span>
        </h2>
        <div className="w-10 h-0.5 bg-purple mb-10" />
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, i) => (
          <motion.a
            key={post.id}
            href={`/blog/${post.slug}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="block bg-navy2 border border-border rounded-lg p-5 hover:border-purple/50 transition-all group card-glow"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-muted">
                {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              <span className="font-mono text-xs text-muted">{post.readTime} lecture</span>
            </div>
            <h3 className="font-bold text-sm text-text-main leading-snug mb-2 group-hover:text-purple transition-colors">
              {post.title}
            </h3>
            <p className="text-xs text-muted leading-relaxed mb-3">{post.excerpt}</p>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <span key={t} className="font-mono text-xs px-2 py-0.5 bg-purple/10 text-purple border border-purple/25 rounded-sm">
                  {t}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
