import { ServiceCardMolecule } from '@/components/molecules/service-card-molecule';
import { Service } from '@/lib/data/services';

interface ServiceGridOrganismProps {
  services: Service[];
}

export function ServiceGridOrganism({ services }: ServiceGridOrganismProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => (
        <ServiceCardMolecule key={service.id} service={service} />
      ))}
    </div>
  );
}