import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Service } from '@/lib/data/services';

interface ServiceCardMoleculeProps {
  service: Service;
}

export function ServiceCardMolecule({ service }: ServiceCardMoleculeProps) {
  const Icon = service.icon;

  return (
        <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200 cursor-pointer h-full">
          <CardHeader>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
              <Icon className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-xl">{service.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-gray-600 mb-4">{service.description}</p>
            <ul className="space-y-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-center text-sm text-gray-500">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full group-hover:bg-blue-50" asChild>
              <Link href={service.href}>Pelajari Lebih Lanjut</Link>
            </Button>
          </CardFooter>
        </Card>
  );
}