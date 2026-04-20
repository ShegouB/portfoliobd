import { Client } from '@notionhq/client';
import { Project, BlogPost } from '@/types';

// Initialisation du client Notion (côté serveur uniquement)
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// ─────────────────────────────────────────────────────────────
//  PROJETS
// ─────────────────────────────────────────────────────────────

/**
 * Récupère tous les projets depuis la base de données Notion.
 * Structure attendue dans Notion :
 *   - Titre      : colonne "Name" (title)
 *   - Description: colonne "Description" (rich_text)
 *   - Catégorie  : colonne "Category" (select)
 *   - Tags       : colonne "Tags" (multi_select)
 *   - Métrique   : colonne "Metric" (rich_text) — ex: "94.74% précision"
 *   - GitHub     : colonne "GitHub" (url)
 *   - Demo       : colonne "Demo" (url)
 *   - Image      : colonne "Image" (files)
 *   - Mis en avant: colonne "Featured" (checkbox)
 *   - Date       : colonne "Date" (date)
 */
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
        category: props.Category?.select?.name ?? 'Web Full-Stack',
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
    // Retourne les projets statiques en fallback
    return FALLBACK_PROJECTS;
  }
}

// ─────────────────────────────────────────────────────────────
//  BLOG
// ─────────────────────────────────────────────────────────────

/**
 * Récupère les articles de blog depuis Notion.
 * Structure attendue :
 *   - Titre    : "Name" (title)
 *   - Extrait  : "Excerpt" (rich_text)
 *   - Date     : "Date" (date)
 *   - Temps    : "ReadTime" (rich_text) — ex: "5 min"
 *   - Tags     : "Tags" (multi_select)
 *   - Slug     : "Slug" (rich_text)
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!process.env.NOTION_BLOG_DB_ID) return [];

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_BLOG_DB_ID!,
      filter: { property: 'Status', select: { equals: 'Published' } },
      sorts: [{ property: 'Date', direction: 'descending' }],
    });

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
    return [];
  }
}

// ─────────────────────────────────────────────────────────────
//  FALLBACK — données statiques si Notion est indisponible
// ─────────────────────────────────────────────────────────────
const FALLBACK_PROJECTS: Project[] = [
  {
    id: '1', title: 'Détection de tumeurs mammaires', category: 'Intelligence Artificielle',
    description: 'Réseau de neurones Deep Learning pour la classification d\'images de tumeurs malignes du sein.',
    tags: ['TensorFlow', 'Deep Learning', 'Computer Vision'], metric: 'Précision : 94.74%',
    githubUrl: 'https://github.com/ShegouB', featured: true, date: '2024-06-01',
  },
  {
    id: '2', title: 'Prédiction sous-types de cancer', category: 'Bio-informatique',
    description: 'Ingénierie sur 10 000 variables (5 000 gènes + 5 000 interrupteurs ADN) pour isoler 30 biomarqueurs.',
    tags: ['Python', 'Génomique', 'ML'], metric: 'Précision : 86.14%',
    githubUrl: 'https://github.com/ShegouB', featured: true, date: '2024-09-01',
  },
  {
    id: '3', title: 'SmartPuce — Smart Road', category: 'IoT / Embarqué',
    description: 'Puce IoT automobile pour détection automatisée des excès de vitesse en temps réel.',
    tags: ['ESP32', 'GPS', 'GSM/4G', 'Cloud'], metric: 'Idéathon C3E UAC',
    githubUrl: 'https://github.com/ShegouB', featured: true, date: '2024-03-01',
  },
  {
    id: '4', title: 'HealthAI', category: 'Intelligence Artificielle',
    description: 'Assistant médical décisionnel basé sur Langflow, Streamlit et Python.',
    tags: ['Langflow', 'Streamlit', 'Python'], githubUrl: 'https://github.com/ShegouB',
    featured: false, date: '2024-11-01',
  },
  {
    id: '5', title: 'NUMENERGIA', category: 'Web Full-Stack',
    description: 'Application mobile de simulation géolocalisée d\'énergie.',
    tags: ['TypeScript', 'Expo', 'React Native'], githubUrl: 'https://github.com/ShegouB',
    featured: false, date: '2025-01-01',
  },
  {
    id: '6', title: 'Gestionnaire de Projets', category: 'Web Full-Stack',
    description: 'Plateforme collaborative avec génération de diagrammes de Gantt.',
    tags: ['Python', 'SQLite', 'Gantt'], githubUrl: 'https://github.com/ShegouB',
    featured: false, date: '2024-08-01',
  },
];
