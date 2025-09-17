import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ServiceGridOrganism } from '@/components/organisms/service-grid-organism';
import { services } from '@/lib/data/services';

export function ServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Layanan Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami menyediakan berbagai layanan profesional untuk membantu menyelesaikan 
            semua kebutuhan tugas dan proyek Anda.
          </p>
        </div>

        {/* Services Grid */}
        <ServiceGridOrganism services={services} />

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/layanan">Lihat Semua Layanan</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}