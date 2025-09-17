import { ServiceSelectionSection } from '@/components/order/service-selection-section';

export default function OrderPage() {
  return (
    <>
      <div className="pt-20 pb-12 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Pesan Layanan
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pilih layanan yang Anda butuhkan dan isi detail pemesanan. 
            Kami akan memproses pesanan Anda dengan cepat dan profesional.
          </p>
        </div>
      </div>
      <ServiceSelectionSection />
    </>
  );
}