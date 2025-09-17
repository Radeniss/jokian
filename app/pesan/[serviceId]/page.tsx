import { notFound } from 'next/navigation';
import { WritingOrderForm } from '@/components/order/writing-order-form';
import { VideoEditingOrderForm } from '@/components/order/video-editing-order-form';
import { PhotoEditingOrderForm } from '@/components/order/photo-editing-order-form';
import { WebsiteOrderForm } from '@/components/order/website-order-form';
import { FigmaDesignOrderForm } from '@/components/order/figma-design-order-form';
import { services, getServiceById } from '@/lib/data/services';

interface OrderPageProps {
  params: {
    serviceId: string;
  };
}

export async function generateStaticParams() {
  return services.map((service) => ({
    serviceId: service.id,
  }));
}

const serviceComponents = {
  'penulisan': WritingOrderForm,
  'editing-video': VideoEditingOrderForm,
  'editing-foto': PhotoEditingOrderForm,
  'website': WebsiteOrderForm,
  'desain': FigmaDesignOrderForm,
};

export default function OrderPage({ params }: OrderPageProps) {
  const service = getServiceById(params.serviceId);
  
  if (!service) {
    notFound();
  }

  const OrderFormComponent = serviceComponents[params.serviceId as keyof typeof serviceComponents];
  
  if (!OrderFormComponent) {
    notFound();
  }

  return (
    <>
      <div className="pt-20 pb-12 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {service.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Isi detail pemesanan untuk layanan {service.title.toLowerCase()}. Pastikan informasi 
            yang Anda berikan lengkap dan akurat.
          </p>
        </div>
      </div>
      <OrderFormComponent />
    </>
  );
}