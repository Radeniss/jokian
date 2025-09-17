import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Layanan Joki Tugas{' '}
                <span className="text-blue-600">Profesional</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl">
                Solusi lengkap untuk semua kebutuhan tugas akademik dan digital Anda. 
                Dari SD hingga Magister, kami siap membantu dengan kualitas terbaik.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Penulisan Akademik',
                'Editing Video & Foto',
                'Pembuatan Website',
                'Desain Figma'
              ].map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group" asChild>
                <Link href="/pesan">
                  Pesan Sekarang
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/portofolio">Lihat Portofolio</Link>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-8 text-white">
              <div className="space-y-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">✨ Tim Profesional</h3>
                  <p className="text-sm opacity-90">4 ahli berpengalaman siap membantu</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">⚡ Pengerjaan Cepat</h3>
                  <p className="text-sm opacity-90">Deadline ketat? Kami siap!</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">🎯 Kualitas Terjamin</h3>
                  <p className="text-sm opacity-90">100% original dan berkualitas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}