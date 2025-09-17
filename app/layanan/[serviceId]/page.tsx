import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, DollarSign, CheckCircle } from 'lucide-react';
import { services, getServiceById } from '@/lib/data/services';

interface ServiceDetailPageProps {
  params: {
    serviceId: string;
  };
}

export async function generateStaticParams() {
  return services.map((service) => ({
    serviceId: service.id,
  }));
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = getServiceById(params.serviceId);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <>
      {/* Hero Section */}
      <div className="pt-20 pb-12 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Icon className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {service.title}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              {service.description}
            </p>
            
            {/* Quick Info */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center space-x-2 text-gray-600">
                <DollarSign className="h-5 w-5" />
                <span>Mulai dari Rp {service.startingPrice.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-5 w-5" />
                <span>Pengerjaan {service.timeframe}</span>
              </div>
              {service.popular && (
                <Badge className="bg-orange-500 text-white">
                  Populer
                </Badge>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group" asChild>
                <Link href={`/pesan/${service.id}`}>
                  Pesan Sekarang
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/kontak">Konsultasi Gratis</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Service Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Tentang Layanan Ini</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {service.fullDescription}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Yang Kami Tawarkan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Proses Pengerjaan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Konsultasi & Briefing</h4>
                          <p className="text-gray-600 text-sm">Diskusi detail kebutuhan dan ekspektasi Anda</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Pembayaran DP</h4>
                          <p className="text-gray-600 text-sm">Pembayaran down payment 20% untuk memulai pengerjaan</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Pengerjaan</h4>
                          <p className="text-gray-600 text-sm">Tim profesional kami mengerjakan proyek sesuai timeline</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                          4
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Review & Revisi</h4>
                          <p className="text-gray-600 text-sm">Anda dapat meminta revisi sesuai kebutuhan</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                          5
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Selesai & Pelunasan</h4>
                          <p className="text-gray-600 text-sm">Pengiriman hasil final dan pelunasan pembayaran</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle>Informasi Harga</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">
                        Rp {service.startingPrice.toLocaleString('id-ID')}
                      </div>
                      <div className="text-sm text-gray-500">mulai dari</div>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Waktu Pengerjaan:</span>
                        <span className="font-medium">{service.timeframe}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">DP Required:</span>
                        <span className="font-medium">20%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Revisi:</span>
                        <span className="font-medium">2x Gratis</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Garansi:</span>
                        <span className="font-medium">7 Hari</span>
                      </div>
                    </div>

                    <Button className="w-full" size="lg" asChild>
                      <Link href={`/pesan/${service.id}`}>
                        Pesan Sekarang
                      </Link>
                    </Button>
                    
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/kontak">
                        Konsultasi Gratis
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Butuh Bantuan?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <p className="text-gray-600">
                      Tim customer service kami siap membantu Anda 24/7.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">WhatsApp:</span>
                        <span className="font-medium">+62 812 3456 7890</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">Email:</span>
                        <span className="font-medium">info@taskpro.com</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Layanan Lainnya
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services
                .filter(s => s.id !== service.id)
                .slice(0, 4)
                .map((relatedService) => {
                  const RelatedIcon = relatedService.icon;
                  return (
                    <Card key={relatedService.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                            <RelatedIcon className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">{relatedService.title}</h3>
                            <p className="text-gray-600 text-sm mb-3">{relatedService.description}</p>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={relatedService.href}>Lihat Detail</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}