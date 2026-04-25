'use client';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types';

export default function BlogSection({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;

  return (
    <section id="blog" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="font-mono text-xs text-purple tracking-widest uppercase mb-3">Journal de Bord</p>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-10">
          Dernières <span className="text-purple">publications</span>
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <motion.a
            key={post.id}
            href={`/blog/${post.slug}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="block group bg-navy2/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-purple/50 transition-all card-glow relative overflow-hidden"
          >
            {/* Petit effet de gradient au survol */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono text-[10px] text-muted uppercase tracking-wider">
                {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              <span className="font-mono text-[10px] text-purple bg-purple/10 px-2 py-0.5 rounded border border-purple/20 tracking-tighter">
                {post.readTime}
              </span>
            </div>

            <h3 className="font-bold text-lg text-white leading-snug mb-3 group-hover:text-purple transition-colors">
              {post.title}
            </h3>
            
            <p className="text-xs text-muted leading-relaxed mb-6 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {post.tags.map((t) => (
                <span key={t} className="font-mono text-[9px] px-2 py-1 bg-navy3 border border-border text-muted rounded-md group-hover:text-purple group-hover:border-purple/30 transition-colors">
                  #{t}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
