'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const contactInfo = [
  {
    icon: Phone,
    title: 'Telepon & WhatsApp',
    details: ['+62 812 3456 7890', '+62 813 9876 5432'],
    description: 'Tersedia 24/7 untuk konsultasi cepat'
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['info@taskpro.com', 'support@taskpro.com'],
    description: 'Respons dalam 2-4 jam kerja'
  },
  {
    icon: MapPin,
    title: 'Lokasi',
    details: ['Jakarta Pusat', 'Indonesia'],
    description: 'Melayani seluruh Indonesia'
  },
  {
    icon: Clock,
    title: 'Jam Operasional',
    details: ['Senin-Minggu: 24 Jam', 'Konsultasi: Kapan Saja'],
    description: 'Tim support siaga untuk Anda'
  }
];

export function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Pesan berhasil dikirim!",
        description: "Terima kasih atas pesan Anda. Tim kami akan menghubungi Anda segera.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Informasi Kontak
              </h2>
              <p className="text-gray-600 mb-8">
                Hubungi kami melalui berbagai channel yang tersedia. Tim profesional kami 
                siap memberikan konsultasi gratis untuk kebutuhan proyek Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <Card key={info.title} className="border-2 hover:border-blue-200 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-semibold text-gray-900">{info.title}</h3>
                          {info.details.map((detail, index) => (
                            <p key={index} className="text-sm text-gray-700">{detail}</p>
                          ))}
                          <p className="text-xs text-gray-500">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Kontak Cepat</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1" variant="default" asChild>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
                <Button className="flex-1" variant="outline" asChild>
                  <a href="mailto:info@taskpro.com">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Kirim Pesan</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor WhatsApp *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="08123456789"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subjek *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="Konsultasi layanan, pertanyaan harga, dll."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Jelaskan kebutuhan atau pertanyaan Anda dengan detail..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      'Mengirim...'
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Kirim Pesan
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Dengan mengirim pesan ini, Anda setuju dengan kebijakan privasi kami 
                    dan menyetujui untuk dihubungi oleh tim TaskPro.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}