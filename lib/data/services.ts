import { PenTool, Video, Camera, Code, Palette } from 'lucide-react';

export interface Service {
  id: string;
  icon: any;
  title: string;
  description: string;
  fullDescription: string;
  startingPrice: number;
  timeframe: string;
  popular: boolean;
  features: string[];
  href: string;
}

export const services: Service[] = [
  {
    id: 'penulisan',
    icon: PenTool,
    title: 'Joki Penulisan',
    description: 'Makalah, skripsi, tesis, dan berbagai tugas penulisan akademik dari SD hingga Magister.',
    fullDescription: 'Kami menyediakan layanan penulisan akademik yang komprehensif untuk berbagai tingkatan, dari sekolah dasar hingga magister. Tim penulis profesional kami memiliki pengalaman luas dalam membuat berbagai jenis tulisan ilmiah seperti esai, makalah, laporan penelitian, skripsi, tesis, dan disertasi. Setiap tulisan dibuat dengan standar akademik yang tinggi, menggunakan referensi dari sumber terpercaya, dan dijamin 100% original tanpa plagiarisme. Kami juga menyediakan layanan editing dan proofreading untuk memastikan kualitas terbaik.',
    startingPrice: 15000,
    timeframe: '1-7 hari',
    popular: true,
    features: ['Esai & Artikel', 'Makalah & Laporan', 'Skripsi & Tesis', 'Review Jurnal'],
    href: '/pesan/penulisan'
  },
  {
    id: 'editing-video',
    icon: Video,
    title: 'Editing Video',
    description: 'Editing video profesional untuk presentasi, dokumentasi, atau konten multimedia.',
    fullDescription: 'Layanan editing video profesional menggunakan software terdepan seperti Adobe Premiere Pro, After Effects, dan DaVinci Resolve. Kami menangani berbagai jenis proyek video mulai dari video presentasi akademik, dokumentasi penelitian, video profil, hingga konten multimedia interaktif. Tim editor berpengalaman kami mampu menghasilkan video berkualitas tinggi dengan color grading yang tepat, motion graphics yang menarik, dan audio mixing yang jernih. Setiap project disesuaikan dengan kebutuhan dan preferensi klien.',
    startingPrice: 50000,
    timeframe: '2-5 hari',
    popular: false,
    features: ['Video Presentasi', 'Dokumentasi', 'Motion Graphics', 'Color Grading'],
    href: '/pesan/editing-video'
  },
  {
    id: 'editing-foto',
    icon: Camera,
    title: 'Editing Foto',
    description: 'Retouching dan editing foto untuk kebutuhan akademik maupun personal.',
    fullDescription: 'Layanan editing foto profesional menggunakan Adobe Photoshop dan Lightroom untuk berbagai kebutuhan. Kami menyediakan jasa retouching foto, background removal, color correction, image enhancement, dan manipulasi foto kreatif. Tim editor foto kami berpengalaman dalam menangani foto produk, portrait, landscape, dan foto dokumentasi akademik. Setiap hasil editing dijamin berkualitas tinggi dengan resolusi yang sesuai kebutuhan, baik untuk keperluan digital maupun cetak.',
    startingPrice: 25000,
    timeframe: '1-3 hari',
    popular: false,
    features: ['Photo Retouching', 'Background Removal', 'Color Correction', 'Image Enhancement'],
    href: '/pesan/editing-foto'
  },
  {
    id: 'website',
    icon: Code,
    title: 'Pembuatan Website',
    description: 'Pengembangan website front-end dan back-end sesuai kebutuhan Anda.',
    fullDescription: 'Layanan pengembangan website lengkap dari konsep hingga deployment. Tim developer kami menguasai teknologi modern seperti React, Next.js, Node.js, Python, dan berbagai database. Kami mengembangkan website responsif, user-friendly, dan SEO-optimized untuk berbagai keperluan seperti portfolio, e-commerce, sistem informasi, dan aplikasi web custom. Setiap project dilengkapi dengan dokumentasi lengkap, testing, dan support maintenance. Kami juga menyediakan layanan hosting dan domain setup.',
    startingPrice: 200000,
    timeframe: '3-14 hari',
    popular: true,
    features: ['Frontend Development', 'Backend Development', 'Database Design', 'API Integration'],
    href: '/pesan/website'
  },
  {
    id: 'desain',
    icon: Palette,
    title: 'Desain Figma',
    description: 'Desain UI/UX profesional menggunakan Figma untuk berbagai kebutuhan.',
    fullDescription: 'Layanan desain UI/UX profesional menggunakan Figma untuk menciptakan antarmuka yang menarik dan user-friendly. Tim designer kami berpengalaman dalam membuat wireframe, prototype interaktif, design system, dan mockup high-fidelity. Kami menangani berbagai jenis project seperti mobile app design, web design, dashboard design, dan branding identity. Setiap desain dibuat dengan mempertimbangkan user experience, accessibility, dan tren desain terkini. Hasil akhir berupa file Figma yang rapi dan siap untuk development.',
    startingPrice: 100000,
    timeframe: '2-7 hari',
    popular: false,
    features: ['UI/UX Design', 'Prototype', 'Wireframing', 'Design System'],
    href: '/pesan/desain'
  }
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};