import { WritingOrderForm } from '@/components/order/writing-order-form';

export default function WritingOrderPage() {
  return (
    <>
      <div className="pt-20 pb-12 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Joki Penulisan
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Isi detail pemesanan untuk layanan joki penulisan. Pastikan informasi 
            yang Anda berikan lengkap dan akurat.
          </p>
        </div>
      </div>
      <WritingOrderForm />
    </>
  );
}