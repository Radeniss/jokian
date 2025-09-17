import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaskPro - Layanan Joki Tugas Profesional',
  description: 'Layanan profesional untuk penulisan, editing video, editing foto, dan pembuatan website. Melayani berbagai tingkatan dari SD hingga Magister.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <TooltipProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}