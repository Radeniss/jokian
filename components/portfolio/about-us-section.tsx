import { Card, CardContent } from '@/components/ui/card';
import { Code, PenTool, Camera, Brain } from 'lucide-react';

const teamMembers = [
  {
    name: 'Alex Chen',
    role: 'Full-Stack Developer',
    icon: Code,
    description: 'Spesialis pengembangan website dengan pengalaman 5+ tahun dalam React, Node.js, dan database management.',
    skills: ['React/Next.js', 'Node.js', 'Python', 'Database Design']
  },
  {
    name: 'Maya Sari',
    role: 'Content Writer & Academic Specialist',
    icon: PenTool,
    description: 'Ahli penulisan akademik dengan latar belakang pendidikan S2. Berpengalaman menangani berbagai jenis tulisan ilmiah.',
    skills: ['Academic Writing', 'Research', 'Content Strategy', 'Editing & Proofreading']
  },
  {
    name: 'Rio Pratama',
    role: 'Visual Content Creator',
    icon: Camera,
    description: 'Profesional editing foto dan video dengan keahlian dalam Adobe Creative Suite dan motion graphics.',
    skills: ['Adobe Premiere Pro', 'After Effects', 'Photoshop', 'Motion Graphics']
  },
  {
    name: 'Dr. Lisa Wang',
    role: 'Data Scientist & ML Engineer',
    icon: Brain,
    description: 'PhD dalam Computer Science dengan spesialisasi machine learning dan data analysis untuk proyek-proyek advanced.',
    skills: ['Machine Learning', 'Python/R', 'Data Analysis', 'AI Solutions']
  }
];

export function AboutUsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Tentang Tim Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Kami adalah tim profesional yang terdiri dari 4 ahli berpengalaman dengan 
            keahlian berbeda. Setiap anggota tim memiliki track record yang terbukti 
            dalam bidangnya masing-masing.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member) => {
            const Icon = member.icon;
            return (
              <Card key={member.name} className="border-2 hover:border-blue-200 transition-colors group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                        <p className="text-blue-600 font-medium">{member.role}</p>
                      </div>
                      <p className="text-gray-600 text-sm">{member.description}</p>
                      <div className="space-y-2">
                        <p className="font-medium text-gray-900 text-sm">Keahlian:</p>
                        <div className="flex flex-wrap gap-2">
                          {member.skills.map((skill) => (
                            <span 
                              key={skill}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}