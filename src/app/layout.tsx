import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Boris Djagou',
  description: 'Portfolio de Boris Djagou : expertise en Intelligence Artificielle, Bio-informatique, développement Full-Stack et IoT embarqué. Cotonou, Bénin.',
  keywords: ['Boris Djagou', 'Bio-informatique', 'Intelligence Artificielle', 'Full-Stack', 'IoT', 'Bénin', 'Data Science'],
  authors: [{ name: 'Boris Djagou', url: 'https://github.com/ShegouB' }],
  openGraph: {
    title: 'Boris Djagou — Portfolio',
    description: 'Bio-informaticien · Data Scientist · Tech Entrepreneur',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Boris Djagou Portfolio',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boris Djagou — Portfolio',
    description: 'Bio-informaticien · Data Scientist · Tech Entrepreneur',
  },
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="bg-navy text-text-main antialiased">{children}</body>
    </html>
  );
}
