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

export const revalidate = 60;

export default async function Home() {
  const [projects, blogPosts] = await Promise.all([
    getProjects(),
    getBlogPosts(),
  ]);

  return (
    <main className="relative min-h-screen bg-navy selection:bg-purple/30 selection:text-white">
      <ParticlesBackground />
      <Navbar />
      
      <div className="relative z-10">
        <HeroSection />
        
        {/* Sections avec ID pour la navigation */}
        <div id="about"><AboutSection /></div>
        <div id="projects"><ProjectsSection projects={projects} /></div>
        <div id="experience"><ExperienceSection /></div>
        
        {/* Section Blog : On l'affiche toujours si on a des posts (Notion ou Fallback) */}
        <div id="blog">
          {blogPosts.length > 0 && <BlogSection posts={blogPosts} />}
        </div>
        
        <div id="contact"><ContactSection /></div>
        
        <Footer />
      </div>
    </main>
  );
}