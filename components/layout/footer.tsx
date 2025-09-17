import Link from 'next/link';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">TaskPro</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Layanan profesional untuk semua kebutuhan tugas akademik dan digital Anda.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Navigasi</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Beranda</Link></li>
              <li><Link href="/layanan" className="text-gray-400 hover:text-white transition-colors">Layanan</Link></li>
              <li><Link href="/portofolio" className="text-gray-400 hover:text-white transition-colors">Portofolio</Link></li>
              <li><Link href="/kontak" className="text-gray-400 hover:text-white transition-colors">Kontak</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Layanan</h3>
            <ul className="space-y-2">
              <li><Link href="/layanan/penulisan" className="text-gray-400 hover:text-white transition-colors">Joki Penulisan</Link></li>
              <li><Link href="/layanan/editing-video" className="text-gray-400 hover:text-white transition-colors">Editing Video</Link></li>
              <li><Link href="/layanan/editing-foto" className="text-gray-400 hover:text-white transition-colors">Editing Foto</Link></li>
              <li><Link href="/layanan/website" className="text-gray-400 hover:text-white transition-colors">Pembuatan Website</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">info@taskpro.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">+62 812 3456 7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 TaskPro. Semua hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}