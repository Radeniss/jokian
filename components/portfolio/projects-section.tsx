import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'E-Learning Platform',
    category: 'Website Development',
    description: 'Platform pembelajaran online lengkap dengan sistem manajemen konten, quiz interaktif, dan tracking progress siswa.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    client: 'Universitas ABC',
    image: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    title: 'Tesis: Analisis Sentimen Media Sosial',
    category: 'Academic Writing',
    description: 'Penelitian komprehensif tentang analisis sentimen menggunakan machine learning dengan dataset Twitter Indonesia.',
    technologies: ['Research', 'Data Analysis', 'Academic Writing', 'Methodology'],
    client: 'Mahasiswa S2 Informatika',
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    title: 'Video Profil Perusahaan',
    category: 'Video Editing',
    description: 'Video profil perusahaan dengan motion graphics, color grading profesional, dan storytelling yang menarik.',
    technologies: ['Premiere Pro', 'After Effects', 'Color Grading', 'Motion Graphics'],
    client: 'PT. Digital Solutions',
    image: 'https://images.pexels.com/photos/3987066/pexels-photo-3987066.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    title: 'UI/UX Mobile Banking App',
    category: 'Figma Design',
    description: 'Desain antarmuka aplikasi mobile banking dengan fokus pada user experience dan kemudahan penggunaan.',
    technologies: ['Figma', 'UI/UX Design', 'Prototyping', 'Design System'],
    client: 'Bank Digital XYZ',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    title: 'Product Photography Enhancement',
    category: 'Photo Editing',
    description: 'Enhancement dan retouching foto produk untuk e-commerce dengan background removal dan color correction.',
    technologies: ['Photoshop', 'Lightroom', 'Color Correction', 'Retouching'],
    client: 'Fashion Brand ABC',
    image: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    title: 'Machine Learning Model untuk Prediksi Harga',
    category: 'Data Science',
    description: 'Implementasi model machine learning untuk prediksi harga saham menggunakan berbagai algoritma dan teknik feature engineering.',
    technologies: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn'],
    client: 'Startup Fintech',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

const categoryColors = {
  'Website Development': 'bg-blue-100 text-blue-800',
  'Academic Writing': 'bg-green-100 text-green-800',
  'Video Editing': 'bg-purple-100 text-purple-800',
  'Figma Design': 'bg-pink-100 text-pink-800',
  'Photo Editing': 'bg-orange-100 text-orange-800',
  'Data Science': 'bg-yellow-100 text-yellow-800'
};

export function ProjectsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Project Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Berikut adalah beberapa project yang telah kami kerjakan dengan hasil 
            yang memuaskan klien dan memenuhi standar profesional.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.title} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Project Image */}
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className={categoryColors[project.category as keyof typeof categoryColors]}>
                    {project.category}
                  </Badge>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                  {project.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">{project.description}</p>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900 text-sm">Klien: {project.client}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}