'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Palette, Calculator, Clock, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const designTypes = [
  { value: 'mobile_app', label: 'Mobile App UI/UX', basePrice: 750000 },
  { value: 'web_app', label: 'Web App UI/UX', basePrice: 1000000 },
  { value: 'website', label: 'Website Design', basePrice: 600000 },
  { value: 'dashboard', label: 'Dashboard Design', basePrice: 800000 },
  { value: 'landing_page', label: 'Landing Page Design', basePrice: 400000 },
  { value: 'ecommerce', label: 'E-commerce Design', basePrice: 1200000 },
  { value: 'branding', label: 'Brand Identity Design', basePrice: 500000 },
  { value: 'presentation', label: 'Presentation Design', basePrice: 300000 }
];

const screenCounts = [
  { value: '1-5', label: '1-5 screens', multiplier: 1.0 },
  { value: '6-10', label: '6-10 screens', multiplier: 1.8 },
  { value: '11-20', label: '11-20 screens', multiplier: 3.2 },
  { value: '21-30', label: '21-30 screens', multiplier: 4.5 },
  { value: '31-50', label: '31-50 screens', multiplier: 6.5 },
  { value: '50+', label: '50+ screens', multiplier: 9.0 }
];

const additionalServices = [
  { id: 'prototype', label: 'Interactive Prototype', price: 300000 },
  { id: 'design_system', label: 'Design System', price: 500000 },
  { id: 'user_research', label: 'User Research & Analysis', price: 400000 },
  { id: 'wireframe', label: 'Detailed Wireframes', price: 200000 },
  { id: 'animation', label: 'Micro-interactions & Animation', price: 350000 },
  { id: 'responsive', label: 'Responsive Design (Multiple Devices)', price: 250000 },
  { id: 'handoff', label: 'Developer Handoff Package', price: 150000 },
  { id: 'revision', label: 'Extra Revision Rounds (3x)', price: 200000 }
];

const designStyles = [
  'Modern/Minimalist',
  'Material Design',
  'iOS Human Interface',
  'Neumorphism',
  'Glassmorphism',
  'Dark Mode',
  'Colorful/Vibrant',
  'Corporate/Professional'
];

export function FigmaDesignOrderForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    designType: '',
    screenCount: '',
    deadline: '',
    urgency: 'normal',
    title: '',
    description: '',
    targetAudience: '',
    designStyle: '',
    brandGuidelines: '',
    additionalServices: [] as string[],
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });

  const calculatePrice = () => {
    const designType = designTypes.find(t => t.value === formData.designType);
    const screenCount = screenCounts.find(s => s.value === formData.screenCount);
    
    if (!designType || !screenCount) return 0;

    let basePrice = designType.basePrice * screenCount.multiplier;
    
    // Add additional services
    const additionalPrice = formData.additionalServices.reduce((total, serviceId) => {
      const service = additionalServices.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
    
    basePrice += additionalPrice;
    
    // Urgency multiplier
    if (formData.urgency === 'urgent') basePrice *= 1.4;
    if (formData.urgency === 'express') basePrice *= 2.0;
    
    return Math.round(basePrice);
  };

  const handleAdditionalServiceChange = (serviceId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: checked 
        ? [...prev.additionalServices, serviceId]
        : prev.additionalServices.filter(id => id !== serviceId)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalPrice = calculatePrice();
    const downPayment = Math.round(totalPrice * 0.2);
    
    const orderData = {
      ...formData,
      totalPrice,
      downPayment,
      service: 'desain'
    };
    
    sessionStorage.setItem('orderData', JSON.stringify(orderData));
    
    toast({
      title: "Pesanan berhasil dibuat",
      description: "Anda akan diarahkan ke halaman pembayaran.",
    });
    
    router.push('/pesan/pembayaran');
  };

  const totalPrice = calculatePrice();
  const downPayment = Math.round(totalPrice * 0.2);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="h-5 w-5" />
                  <span>Detail Pemesanan Figma Design</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Design Type */}
                  <div className="space-y-2">
                    <Label htmlFor="designType">Jenis Desain *</Label>
                    <Select 
                      value={formData.designType} 
                      onValueChange={(value) => setFormData({...formData, designType: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis desain" />
                      </SelectTrigger>
                      <SelectContent>
                        {designTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label} - Rp {type.basePrice.toLocaleString('id-ID')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Screen Count */}
                  <div className="space-y-2">
                    <Label htmlFor="screenCount">Jumlah Screen/Halaman *</Label>
                    <Select 
                      value={formData.screenCount} 
                      onValueChange={(value) => setFormData({...formData, screenCount: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jumlah screen" />
                      </SelectTrigger>
                      <SelectContent>
                        {screenCounts.map((count) => (
                          <SelectItem key={count.value} value={count.value}>
                            {count.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Design Style */}
                  <div className="space-y-2">
                    <Label htmlFor="designStyle">Gaya Desain yang Diinginkan</Label>
                    <Select 
                      value={formData.designStyle} 
                      onValueChange={(value) => setFormData({...formData, designStyle: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih gaya desain" />
                      </SelectTrigger>
                      <SelectContent>
                        {designStyles.map((style) => (
                          <SelectItem key={style} value={style}>
                            {style}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Additional Services */}
                  <div className="space-y-3">
                    <Label>Layanan Tambahan</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {additionalServices.map((service) => (
                        <div key={service.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={service.id}
                            checked={formData.additionalServices.includes(service.id)}
                            onCheckedChange={(checked) => 
                              handleAdditionalServiceChange(service.id, checked as boolean)
                            }
                          />
                          <Label htmlFor={service.id} className="text-sm">
                            {service.label} (+Rp {service.price.toLocaleString('id-ID')})
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Tenggat Waktu *</Label>
                    <Input
                      type="datetime-local"
                      value={formData.deadline}
                      onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                      required
                    />
                  </div>

                  {/* Urgency */}
                  <div className="space-y-3">
                    <Label>Tingkat Urgensi</Label>
                    <RadioGroup 
                      value={formData.urgency} 
                      onValueChange={(value) => setFormData({...formData, urgency: value})}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="normal" id="normal" />
                        <Label htmlFor="normal">Normal (harga standar)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="urgent" id="urgent" />
                        <Label htmlFor="urgent">Mendesak (+40% harga)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express">Express (+100% harga)</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Nama Project *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Masukkan nama project atau aplikasi"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi Project & Tujuan *</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Jelaskan tujuan project, fitur utama, dan ekspektasi desain"
                      rows={4}
                      required
                    />
                  </div>

                  {/* Target Audience */}
                  <div className="space-y-2">
                    <Label htmlFor="targetAudience">Target Audience *</Label>
                    <Textarea
                      value={formData.targetAudience}
                      onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                      placeholder="Jelaskan target pengguna (usia, profesi, kebiasaan, dll.)"
                      rows={3}
                      required
                    />
                  </div>

                  {/* Brand Guidelines */}
                  <div className="space-y-2">
                    <Label htmlFor="brandGuidelines">Brand Guidelines & Referensi</Label>
                    <Textarea
                      value={formData.brandGuidelines}
                      onChange={(e) => setFormData({...formData, brandGuidelines: e.target.value})}
                      placeholder="Cantumkan link brand guidelines, logo, warna brand, atau referensi desain yang disukai"
                      rows={3}
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Informasi Kontak</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactName">Nama Lengkap *</Label>
                        <Input
                          value={formData.contactName}
                          onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactPhone">Nomor WhatsApp *</Label>
                        <Input
                          value={formData.contactPhone}
                          onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                          placeholder="contoh: 081234567890"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="contactEmail">Email *</Label>
                      <Input
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={!formData.designType || !formData.screenCount}>
                    Lanjut ke Pembayaran
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Price Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5" />
                  <span>Ringkasan Harga</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.designType && formData.screenCount ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Jenis Desain:</span>
                        <span>{designTypes.find(t => t.value === formData.designType)?.label}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Jumlah Screen:</span>
                        <span>{screenCounts.find(s => s.value === formData.screenCount)?.label}</span>
                      </div>
                      {formData.designStyle && (
                        <div className="flex justify-between text-sm">
                          <span>Gaya Desain:</span>
                          <span>{formData.designStyle}</span>
                        </div>
                      )}
                      {formData.additionalServices.length > 0 && (
                        <div className="text-sm">
                          <span>Layanan Tambahan:</span>
                          <ul className="mt-1 ml-4">
                            {formData.additionalServices.map(serviceId => {
                              const service = additionalServices.find(s => s.id === serviceId);
                              return (
                                <li key={serviceId} className="text-xs text-gray-600">
                                  • {service?.label}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span>Urgensi:</span>
                        <span className="capitalize">{formData.urgency}</span>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total Harga:</span>
                        <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between text-sm text-orange-600">
                        <span>DP (20%):</span>
                        <span>Rp {downPayment.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Sisa Pembayaran:</span>
                        <span>Rp {(totalPrice - downPayment).toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500 text-center">
                    Pilih jenis desain dan jumlah screen untuk melihat estimasi harga
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Materi yang Diperlukan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>Siapkan materi berikut:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Logo & brand assets</li>
                    <li>Content/teks untuk setiap screen</li>
                    <li>Foto/gambar yang akan digunakan</li>
                    <li>Referensi desain (jika ada)</li>
                    <li>Wireframe/sketsa (jika ada)</li>
                  </ul>
                  <div className="mt-3 p-2 bg-purple-50 border border-purple-200 rounded text-xs">
                    <strong>Info:</strong> Kami akan membantu menyiapkan konten placeholder jika diperlukan
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Timeline Pengerjaan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 space-y-3">
                  <div className="flex items-start space-x-2">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">1</span>
                    <span>Research & wireframing</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">2</span>
                    <span>UI design & style guide</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">3</span>
                    <span>Prototype & interactions</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">4</span>
                    <span>Final delivery & handoff</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}