import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PenTool, Video, Camera, Code, Palette, Clock, Star } from 'lucide-react';
import { services } from '@/lib/data/services';

export function ServiceSelectionSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 relative">
                {service.popular && (
                  <div className="absolute -top-3 left-4 z-10">
                    <Badge className="bg-orange-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-200 transition-colors">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <p className="text-gray-600">{service.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Pricing */}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">
                      Rp {service.startingPrice.toLocaleString('id-ID')}
                    </div>
                    <div className="text-sm text-gray-500">mulai dari</div>
                  </div>

                  {/* Timeframe */}
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{service.timeframe}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button className="w-full group-hover:bg-blue-700" size="lg" asChild>
                    <Link href={`/pesan/${service.id}`}>
                      Pilih Layanan
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center space-y-4 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900">Butuh layanan khusus?</h3>
          <p className="text-gray-600">
            Jika Anda membutuhkan layanan yang tidak tercantum di atas, 
            jangan ragu untuk menghubungi kami untuk konsultasi gratis.
          </p>
          <Button variant="outline" asChild>
            <Link href="/kontak">Konsultasi Gratis</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}