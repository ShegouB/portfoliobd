import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import ReactMarkdown from 'react-markdown';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

// Interface pour typage correct avec Next.js 15
interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  // 1. Déballer les params (Obligatoire en Next.js 15+)
  const { slug } = await params;

  // 2. Chercher l'article dans Notion via son slug
  const response = await notion.databases.query({
    database_id: process.env.NOTION_BLOG_DB_ID!,
    filter: { property: 'Slug', rich_text: { equals: slug } },
  });

  const page = response.results[0] as any;

  if (!page) {
    return (
      <main className="bg-navy min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-2xl font-bold mb-4">Article introuvable</h1>
          <Link href="/" className="text-purple hover:underline font-mono">← Retour à l'accueil</Link>
        </div>
      </main>
    );
  }

  // 3. Récupérer le contenu Markdown
  const mdblocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdblocks);

  const title = page.properties.Name.title[0].plain_text;
  const date = page.properties.Date.date.start;
  const readTime = page.properties.ReadTime?.rich_text[0]?.plain_text || "5 min";

  return (
    <main className="bg-navy min-h-screen">
      <Navbar />
      
      {/* Header de l'article */}
      <header className="relative pt-40 pb-16 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.15)_0%,_transparent_70%)] pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <Link href="/#blog" className="font-mono text-xs text-purple hover:text-white transition-colors mb-8 inline-block">
            ← RETOUR AU JOURNAL
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] bg-purple/10 text-purple border border-purple/20 px-3 py-1 rounded-full uppercase tracking-widest">
              {readTime} de lecture
            </span>
            <span className="text-muted text-xs font-mono">
              {new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-8">
            {title}
          </h1>
          
          <div className="w-20 h-1 bg-purple rounded-full"></div>
        </div>
      </header>

      {/* Contenu de l'article */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          {/* Style "prose" pour le markdown (nécessite @tailwindcss/typography) */}
          <div className="prose prose-invert prose-purple prose-headings:font-syne prose-headings:font-bold prose-p:text-muted prose-p:leading-relaxed prose-strong:text-white prose-code:text-purple prose-code:bg-purple/10 prose-code:px-1 prose-code:rounded prose-img:rounded-3xl max-w-none">
            <ReactMarkdown>{mdString.parent}</ReactMarkdown>
          </div>
          
          {/* Footer de l'article */}
          <div className="mt-20 pt-10 border-t border-border flex flex-col items-center">
            <p className="text-muted text-sm mb-6 font-mono text-center">Merci de m'avoir lu ! Envie d'en discuter ?</p>
            <Link href="/#contact" className="px-8 py-4 bg-navy2 border border-purple/50 text-white rounded-full hover:bg-purple transition-all font-bold text-sm">
              Me contacter →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
