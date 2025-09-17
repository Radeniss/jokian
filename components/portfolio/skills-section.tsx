import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const skillCategories = [
  {
    title: 'Programming & Development',
    skills: [
      { name: 'JavaScript/TypeScript', level: 95 },
      { name: 'React/Next.js', level: 90 },
      { name: 'Node.js', level: 88 },
      { name: 'Python', level: 85 },
      { name: 'SQL/Database', level: 82 },
      { name: 'MongoDB/NoSQL', level: 78 }
    ]
  },
  {
    title: 'Content & Writing',
    skills: [
      { name: 'Academic Writing', level: 95 },
      { name: 'Research & Analysis', level: 92 },
      { name: 'Content Strategy', level: 88 },
      { name: 'Editing & Proofreading', level: 90 },
      { name: 'SEO Writing', level: 85 },
      { name: 'Technical Documentation', level: 83 }
    ]
  },
  {
    title: 'Design & Visual',
    skills: [
      { name: 'Adobe Photoshop', level: 92 },
      { name: 'Adobe Premiere Pro', level: 90 },
      { name: 'After Effects', level: 85 },
      { name: 'Figma/UI Design', level: 88 },
      { name: 'Lightroom', level: 87 },
      { name: 'Motion Graphics', level: 80 }
    ]
  },
  {
    title: 'Data Science & ML',
    skills: [
      { name: 'Machine Learning', level: 88 },
      { name: 'Data Analysis', level: 90 },
      { name: 'TensorFlow/PyTorch', level: 82 },
      { name: 'Pandas/NumPy', level: 85 },
      { name: 'Statistical Analysis', level: 87 },
      { name: 'Data Visualization', level: 83 }
    ]
  }
];

export function SkillsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Keahlian Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tim kami menguasai berbagai teknologi dan tools terdepan untuk memberikan 
            hasil terbaik dalam setiap project yang dikerjakan.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <Card key={category.title} className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}