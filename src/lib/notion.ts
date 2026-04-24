import { Client } from '@notionhq/client';
import { Project, BlogPost } from '@/types';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// ─────────────────────────────────────────────────────────────
//  PROJETS
// ─────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_PROJECTS_DB_ID!,
      filter: { property: 'Status', select: { equals: 'Published' } },
      sorts: [{ property: 'Date', direction: 'descending' }],
    });

    return response.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        title: props.Name?.title?.[0]?.plain_text ?? 'Sans titre',
        description: props.Description?.rich_text?.[0]?.plain_text ?? '',
        category: props.Category?.select?.name ?? 'Web',
        tags: props.Tags?.multi_select?.map((t: any) => t.name) ?? [],
        metric: props.Metric?.rich_text?.[0]?.plain_text ?? '',
        githubUrl: props.GitHub?.url ?? '',
        demoUrl: props.Demo?.url ?? '',
        imageUrl: props.Image?.files?.[0]?.file?.url ?? props.Image?.files?.[0]?.external?.url ?? '',
        featured: props.Featured?.checkbox ?? false,
        date: props.Date?.date?.start ?? new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error('Erreur Notion (projets):', error);
    return FALLBACK_PROJECTS;
  }
}

// ─────────────────────────────────────────────────────────────
//  BLOG
// ─────────────────────────────────────────────────────────────

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!process.env.NOTION_BLOG_DB_ID) return FALLBACK_BLOG;

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_BLOG_DB_ID!,
      filter: { property: 'Status', select: { equals: 'Published' } },
      sorts: [{ property: 'Date', direction: 'descending' }],
    });

    if (response.results.length === 0) return FALLBACK_BLOG;

    return response.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        title: props.Name?.title?.[0]?.plain_text ?? 'Sans titre',
        excerpt: props.Excerpt?.rich_text?.[0]?.plain_text ?? '',
        date: props.Date?.date?.start ?? new Date().toISOString(),
        readTime: props.ReadTime?.rich_text?.[0]?.plain_text ?? '5 min',
        tags: props.Tags?.multi_select?.map((t: any) => t.name) ?? [],
        slug: props.Slug?.rich_text?.[0]?.plain_text ?? page.id,
      };
    });
  } catch (error) {
    console.error('Erreur Notion (blog):', error);
    return FALLBACK_BLOG;
  }
}

// ─────────────────────────────────────────────────────────────
//  FALLBACKS (Données par défaut pour que le design soit tjs beau)
// ─────────────────────────────────────────────────────────────

const FALLBACK_PROJECTS: Project[] = [
  {
    id: '1', title: 'IA Oncologie Mammaire', category: 'IA',
    description: 'Modèle de Deep Learning classifiant les tumeurs avec 94.74% de précision.',
    tags: ['TensorFlow', 'Python', 'CNN'], metric: '94.74% Précision',
    githubUrl: 'https://github.com/ShegouB', featured: true, date: '2025-01-01',
  },
  {
    id: '2', title: 'Smart Road IoT', category: 'Iot',
    description: 'Architecture embarquée pour la détection automatisée des excès de vitesse.',
    tags: ['C++', 'Arduino', 'Cloud'], metric: 'Idéathon C3E',
    githubUrl: 'https://github.com/ShegouB', featured: true, date: '2025-02-01',
  }
];

const FALLBACK_BLOG: BlogPost[] = [
  {
    id: 'b1', title: 'IA et Génomique : Le futur de la médecine',
    excerpt: 'Comment les modèles de langage et le Deep Learning révolutionnent l\'analyse de l\'ADN.',
    date: '2025-03-15', readTime: '6 min', tags: ['Bioinfo', 'IA'], slug: 'ia-genomique'
  },
  {
    id: 'b2', title: 'Pourquoi le Code Golf a changé ma vision du Python',
    excerpt: 'Retour sur ma compétition NeurIPS 2025 et les techniques de compression de code.',
    date: '2025-03-10', readTime: '4 min', tags: ['Python', 'Kaggle'], slug: 'code-golf-python'
  }
];