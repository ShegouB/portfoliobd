import { getProjects, getBlogPosts } from '@/lib/notion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';

// Revalidation ISR : le site se met à jour toutes les 60 secondes
// depuis Notion sans redéploiement
export const revalidate = 60;

export default async function Home() {
  // Fetch côté serveur (SSR/ISR) — données fraiches depuis Notion
  const [projects, blogPosts] = await Promise.all([
    getProjects(),
    getBlogPosts(),
  ]);

  return (
    <main className="relative min-h-screen bg-navy">
      <ParticlesBackground />
      <Navbar />
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection projects={projects} />
        <ExperienceSection />
        {blogPosts.length > 0 && <BlogSection posts={blogPosts} />}
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
