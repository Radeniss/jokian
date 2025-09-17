import { AboutUsSection } from '@/components/portfolio/about-us-section';
import { ProjectsSection } from '@/components/portfolio/projects-section';
import { SkillsSection } from '@/components/portfolio/skills-section';

export default function PortfolioPage() {
  return (
    <>
      <div className="pt-20 pb-12 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Portofolio Kami
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kenali tim profesional kami dan lihat hasil kerja berkualitas tinggi 
            yang telah kami selesaikan untuk berbagai klien.
          </p>
        </div>
      </div>
      <AboutUsSection />
      <ProjectsSection />
      <SkillsSection />
    </>
  );
}