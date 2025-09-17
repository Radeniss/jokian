import { Users, Clock, Shield, Award } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Tim Profesional',
    description: '4 ahli berpengalaman dengan keahlian berbeda siap membantu Anda'
  },
  {
    icon: Clock,
    title: 'Pengerjaan Tepat Waktu',
    description: 'Komitmen tinggi untuk menyelesaikan proyek sesuai deadline yang disepakati'
  },
  {
    icon: Shield,
    title: 'Kualitas Terjamin',
    description: '100% original dan berkualitas tinggi dengan garansi revisi'
  },
  {
    icon: Award,
    title: 'Harga Kompetitif',
    description: 'Harga terjangkau dengan sistem pembayaran fleksibel (DP 20%)'
  }
];

export function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Mengapa Memilih Kami?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami berkomitmen memberikan layanan terbaik dengan standar profesional tinggi
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}