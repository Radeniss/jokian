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
import { Video, Calculator, Clock, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const videoTypes = [
  { value: 'presentasi', label: 'Video Presentasi', basePrice: 75000 },
  { value: 'dokumentasi', label: 'Video Dokumentasi', basePrice: 100000 },
  { value: 'tutorial', label: 'Video Tutorial', basePrice: 125000 },
  { value: 'promosi', label: 'Video Promosi', basePrice: 150000 },
  { value: 'wedding', label: 'Video Wedding', basePrice: 200000 },
  { value: 'event', label: 'Video Event', basePrice: 175000 },
  { value: 'music', label: 'Music Video', basePrice: 250000 },
  { value: 'corporate', label: 'Video Corporate', basePrice: 300000 }
];

const videoLengths = [
  { value: '1-3', label: '1-3 menit', multiplier: 1.0 },
  { value: '3-5', label: '3-5 menit', multiplier: 1.3 },
  { value: '5-10', label: '5-10 menit', multiplier: 1.8 },
  { value: '10-15', label: '10-15 menit', multiplier: 2.5 },
  { value: '15-30', label: '15-30 menit', multiplier: 3.5 },
  { value: '30+', label: '30+ menit', multiplier: 5.0 }
];

const additionalServices = [
  { id: 'color_grading', label: 'Color Grading Profesional', price: 50000 },
  { id: 'motion_graphics', label: 'Motion Graphics', price: 75000 },
  { id: 'sound_design', label: 'Sound Design & Mixing', price: 60000 },
  { id: 'subtitles', label: 'Subtitle/Caption', price: 25000 },
  { id: 'intro_outro', label: 'Intro/Outro Custom', price: 40000 },
  { id: 'green_screen', label: 'Green Screen Effect', price: 80000 }
];

export function VideoEditingOrderForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    videoType: '',
    videoLength: '',
    deadline: '',
    urgency: 'normal',
    title: '',
    description: '',
    style: '',
    rawFootage: '',
    additionalServices: [] as string[],
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });

  const calculatePrice = () => {
    const videoType = videoTypes.find(t => t.value === formData.videoType);
    const videoLength = videoLengths.find(l => l.value === formData.videoLength);
    
    if (!videoType || !videoLength) return 0;

    let basePrice = videoType.basePrice * videoLength.multiplier;
    
    // Add additional services
    const additionalPrice = formData.additionalServices.reduce((total, serviceId) => {
      const service = additionalServices.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
    
    basePrice += additionalPrice;
    
    // Urgency multiplier
    if (formData.urgency === 'urgent') basePrice *= 1.5;
    if (formData.urgency === 'express') basePrice *= 2;
    
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
      service: 'editing-video'
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
                  <Video className="h-5 w-5" />
                  <span>Detail Pemesanan Video Editing</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Video Type */}
                  <div className="space-y-2">
                    <Label htmlFor="videoType">Jenis Video *</Label>
                    <Select 
                      value={formData.videoType} 
                      onValueChange={(value) => setFormData({...formData, videoType: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis video" />
                      </SelectTrigger>
                      <SelectContent>
                        {videoTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label} - Rp {type.basePrice.toLocaleString('id-ID')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Video Length */}
                  <div className="space-y-2">
                    <Label htmlFor="videoLength">Durasi Video *</Label>
                    <Select 
                      value={formData.videoLength} 
                      onValueChange={(value) => setFormData({...formData, videoLength: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih durasi video" />
                      </SelectTrigger>
                      <SelectContent>
                        {videoLengths.map((length) => (
                          <SelectItem key={length.value} value={length.value}>
                            {length.label}
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
                        <Label htmlFor="urgent">Mendesak (+50% harga)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express">Express (+100% harga)</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Judul/Tema Video *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Masukkan judul atau tema video"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi & Konsep Video *</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Jelaskan konsep, alur cerita, mood yang diinginkan, dan detail lainnya"
                      rows={4}
                      required
                    />
                  </div>

                  {/* Style */}
                  <div className="space-y-2">
                    <Label htmlFor="style">Gaya/Style yang Diinginkan</Label>
                    <Textarea
                      value={formData.style}
                      onChange={(e) => setFormData({...formData, style: e.target.value})}
                      placeholder="Contoh: cinematic, modern, vintage, minimalis, dll."
                      rows={2}
                    />
                  </div>

                  {/* Raw Footage */}
                  <div className="space-y-2">
                    <Label htmlFor="rawFootage">Link Raw Footage/Material *</Label>
                    <Textarea
                      value={formData.rawFootage}
                      onChange={(e) => setFormData({...formData, rawFootage: e.target.value})}
                      placeholder="Cantumkan link Google Drive, Dropbox, atau WeTransfer yang berisi raw footage"
                      rows={3}
                      required
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

                  <Button type="submit" className="w-full" size="lg" disabled={!formData.videoType || !formData.videoLength}>
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
                {formData.videoType && formData.videoLength ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Jenis Video:</span>
                        <span>{videoTypes.find(t => t.value === formData.videoType)?.label}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Durasi:</span>
                        <span>{videoLengths.find(l => l.value === formData.videoLength)?.label}</span>
                      </div>
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
                    Pilih jenis dan durasi video untuk melihat estimasi harga
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Upload Raw Footage</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>Upload raw footage Anda ke:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Google Drive (recommended)</li>
                    <li>Dropbox</li>
                    <li>WeTransfer</li>
                    <li>OneDrive</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2">
                    Pastikan file dapat diakses dan berikan link di form.
                  </p>
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
                    <span>Review raw footage & briefing</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">2</span>
                    <span>Rough cut & preview</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">3</span>
                    <span>Fine cut & effects</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">4</span>
                    <span>Final delivery</span>
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