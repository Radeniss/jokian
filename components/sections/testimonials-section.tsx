import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Mahasiswa S1',
    content: 'Pelayanan sangat memuaskan! Skripsi saya selesai tepat waktu dan kualitasnya luar biasa.',
    rating: 5
  },
  {
    name: 'Ahmad R.',
    role: 'Siswa SMA',
    content: 'Website untuk tugas sekolah dibuat dengan sangat profesional. Terima kasih TaskPro!',
    rating: 5
  },
  {
    name: 'Diana K.',
    role: 'Mahasiswa S2',
    content: 'Video presentasi tesis saya diedit dengan sangat baik. Hasilnya melampaui ekspektasi.',
    rating: 5
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Apa Kata Mereka?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Testimoni dari klien yang telah mempercayakan tugas mereka kepada kami
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border-2 hover:border-blue-200 transition-colors">
              <CardContent className="p-6 space-y-4">
                {/* Stars */}
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
                
                {/* Author */}
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}