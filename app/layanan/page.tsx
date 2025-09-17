import { ServiceGridOrganism } from '@/components/organisms/service-grid-organism';
import { services } from '@/lib/data/services';

export default function ServicesPage() {
  return (
    <>
      <div className="pt-20 pb-12 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Layanan Kami
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami menyediakan berbagai layanan profesional untuk membantu menyelesaikan 
            semua kebutuhan tugas dan proyek Anda dengan kualitas terbaik.
          </p>
        </div>
      </div>
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceGridOrganism services={services} />
        </div>
      </section>
    </>
  );
}