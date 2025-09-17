import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Siap Memulai Proyek Anda?
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Jangan tunggu lagi! Hubungi kami sekarang dan dapatkan solusi terbaik 
              untuk semua kebutuhan tugas Anda.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="group" asChild>
              <Link href="/pesan">
                Pesan Sekarang
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/kontak">
                <MessageCircle className="mr-2 h-4 w-4" />
                Konsultasi Gratis
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}