import { ContactSection } from '@/components/contact/contact-section';

export default function ContactPage() {
  return (
    <>
      <div className="pt-20 pb-12 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Hubungi Kami
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ada pertanyaan atau butuh konsultasi? Jangan ragu untuk menghubungi tim profesional kami. 
            Kami siap membantu Anda 24/7.
          </p>
        </div>
      </div>
      <ContactSection />
    </>
  );
}