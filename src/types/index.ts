// Types pour les projets Notion
export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Intelligence Artificielle' | 'Bio-informatique' | 'IoT / Embarqué' | 'Web Full-Stack';
  tags: string[];
  metric?: string;       // Ex: "Précision : 94.74%"
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  featured: boolean;
  date: string;
}

// Types pour les articles de blog
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
}

// Catégories de projets
export type ProjectCategory =
  | 'Tous'
  | 'Intelligence Artificielle'
  | 'Bio-informatique'
  | 'IoT / Embarqué'
  | 'Web Full-Stack';

// Props du formulaire de contact
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
