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
import { Camera, Calculator, Clock, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const editingTypes = [
  { value: 'basic', label: 'Basic Editing', basePrice: 15000 },
  { value: 'retouching', label: 'Photo Retouching', basePrice: 25000 },
  { value: 'restoration', label: 'Photo Restoration', basePrice: 35000 },
  { value: 'manipulation', label: 'Photo Manipulation', basePrice: 50000 },
  { value: 'product', label: 'Product Photography Edit', basePrice: 30000 },
  { value: 'portrait', label: 'Portrait Enhancement', basePrice: 40000 },
  { value: 'wedding', label: 'Wedding Photo Edit', basePrice: 20000 },
  { value: 'real_estate', label: 'Real Estate Photo Edit', basePrice: 25000 }
];

const photoQuantities = [
  { value: '1-5', label: '1-5 foto', multiplier: 1.0 },
  { value: '6-10', label: '6-10 foto', multiplier: 0.9 },
  { value: '11-25', label: '11-25 foto', multiplier: 0.8 },
  { value: '26-50', label: '26-50 foto', multiplier: 0.7 },
  { value: '51-100', label: '51-100 foto', multiplier: 0.6 },
  { value: '100+', label: '100+ foto', multiplier: 0.5 }
];

const additionalServices = [
  { id: 'background_removal', label: 'Background Removal', price: 10000 },
  { id: 'color_correction', label: 'Color Correction', price: 8000 },
  { id: 'skin_smoothing', label: 'Skin Smoothing', price: 12000 },
  { id: 'object_removal', label: 'Object Removal', price: 15000 },
  { id: 'watermark_removal', label: 'Watermark Removal', price: 20000 },
  { id: 'hdr_effect', label: 'HDR Effect', price: 18000 },
  { id: 'vintage_filter', label: 'Vintage/Film Filter', price: 10000 },
  { id: 'shadow_reflection', label: 'Shadow & Reflection', price: 25000 }
];

export function PhotoEditingOrderForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    editingType: '',
    photoQuantity: '',
    deadline: '',
    urgency: 'normal',
    title: '',
    description: '',
    style: '',
    photoLinks: '',
    additionalServices: [] as string[],
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });

  const calculatePrice = () => {
    const editingType = editingTypes.find(t => t.value === formData.editingType);
    const photoQuantity = photoQuantities.find(q => q.value === formData.photoQuantity);
    
    if (!editingType || !photoQuantity) return 0;

    // Calculate base price based on quantity
    let baseQuantity = 1;
    if (formData.photoQuantity === '6-10') baseQuantity = 8;
    else if (formData.photoQuantity === '11-25') baseQuantity = 18;
    else if (formData.photoQuantity === '26-50') baseQuantity = 38;
    else if (formData.photoQuantity === '51-100') baseQuantity = 75;
    else if (formData.photoQuantity === '100+') baseQuantity = 150;
    else baseQuantity = 3; // 1-5 photos average

    let basePrice = editingType.basePrice * baseQuantity * photoQuantity.multiplier;
    
    // Add additional services per photo
    const additionalPrice = formData.additionalServices.reduce((total, serviceId) => {
      const service = additionalServices.find(s => s.id === serviceId);
      return total + ((service?.price || 0) * baseQuantity);
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
      service: 'editing-foto'
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
                  <Camera className="h-5 w-5" />
                  <span>Detail Pemesanan Photo Editing</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Editing Type */}
                  <div className="space-y-2">
                    <Label htmlFor="editingType">Jenis Editing *</Label>
                    <Select 
                      value={formData.editingType} 
                      onValueChange={(value) => setFormData({...formData, editingType: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis editing" />
                      </SelectTrigger>
                      <SelectContent>
                        {editingTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label} - Rp {type.basePrice.toLocaleString('id-ID')}/foto
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Photo Quantity */}
                  <div className="space-y-2">
                    <Label htmlFor="photoQuantity">Jumlah Foto *</Label>
                    <Select 
                      value={formData.photoQuantity} 
                      onValueChange={(value) => setFormData({...formData, photoQuantity: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jumlah foto" />
                      </SelectTrigger>
                      <SelectContent>
                        {photoQuantities.map((quantity) => (
                          <SelectItem key={quantity.value} value={quantity.value}>
                            {quantity.label} {quantity.multiplier < 1 && `(Diskon ${Math.round((1 - quantity.multiplier) * 100)}%)`}
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
                            {service.label} (+Rp {service.price.toLocaleString('id-ID')}/foto)
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
                    <Label htmlFor="title">Judul/Tema Project *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Masukkan judul atau tema project"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi & Instruksi Editing *</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Jelaskan detail editing yang diinginkan, area fokus, dan instruksi khusus"
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
                      placeholder="Contoh: natural, dramatic, vintage, bright & airy, moody, dll."
                      rows={2}
                    />
                  </div>

                  {/* Photo Links */}
                  <div className="space-y-2">
                    <Label htmlFor="photoLinks">Link Foto Original *</Label>
                    <Textarea
                      value={formData.photoLinks}
                      onChange={(e) => setFormData({...formData, photoLinks: e.target.value})}
                      placeholder="Cantumkan link Google Drive, Dropbox, atau WeTransfer yang berisi foto original"
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

                  <Button type="submit" className="w-full" size="lg" disabled={!formData.editingType || !formData.photoQuantity}>
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
                {formData.editingType && formData.photoQuantity ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Jenis Editing:</span>
                        <span>{editingTypes.find(t => t.value === formData.editingType)?.label}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Jumlah Foto:</span>
                        <span>{photoQuantities.find(q => q.value === formData.photoQuantity)?.label}</span>
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
                    Pilih jenis editing dan jumlah foto untuk melihat estimasi harga
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Upload Foto</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>Upload foto original Anda ke:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Google Drive (recommended)</li>
                    <li>Dropbox</li>
                    <li>WeTransfer</li>
                    <li>OneDrive</li>
                  </ul>
                  <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
                    <strong>Tips:</strong> Upload foto dengan resolusi tinggi untuk hasil terbaik
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
                    <span>Review foto & briefing</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">2</span>
                    <span>Proses editing</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">3</span>
                    <span>Quality check & preview</span>
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