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
import { Code, Calculator, Clock, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const websiteTypes = [
  { value: 'landing', label: 'Landing Page', basePrice: 500000 },
  { value: 'portfolio', label: 'Portfolio Website', basePrice: 750000 },
  { value: 'company', label: 'Company Profile', basePrice: 1000000 },
  { value: 'ecommerce', label: 'E-commerce', basePrice: 2000000 },
  { value: 'blog', label: 'Blog/News Website', basePrice: 800000 },
  { value: 'dashboard', label: 'Admin Dashboard', basePrice: 1500000 },
  { value: 'webapp', label: 'Web Application', basePrice: 3000000 },
  { value: 'custom', label: 'Custom Website', basePrice: 1200000 }
];

const complexityLevels = [
  { value: 'simple', label: 'Simple (1-3 halaman)', multiplier: 1.0 },
  { value: 'medium', label: 'Medium (4-10 halaman)', multiplier: 1.5 },
  { value: 'complex', label: 'Complex (11-20 halaman)', multiplier: 2.2 },
  { value: 'enterprise', label: 'Enterprise (20+ halaman)', multiplier: 3.5 }
];

const additionalFeatures = [
  { id: 'responsive', label: 'Responsive Design', price: 200000 },
  { id: 'cms', label: 'Content Management System', price: 500000 },
  { id: 'seo', label: 'SEO Optimization', price: 300000 },
  { id: 'analytics', label: 'Google Analytics Integration', price: 100000 },
  { id: 'payment', label: 'Payment Gateway', price: 750000 },
  { id: 'multilingual', label: 'Multi-language Support', price: 400000 },
  { id: 'api', label: 'API Integration', price: 600000 },
  { id: 'hosting', label: 'Hosting Setup (1 tahun)', price: 500000 }
];

const technologies = [
  'HTML/CSS/JavaScript',
  'React/Next.js',
  'Vue.js/Nuxt.js',
  'WordPress',
  'Laravel/PHP',
  'Node.js/Express',
  'Python/Django',
  'Database (MySQL/PostgreSQL/MongoDB)'
];

export function WebsiteOrderForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    websiteType: '',
    complexity: '',
    deadline: '',
    urgency: 'normal',
    title: '',
    description: '',
    features: '',
    techPreference: '',
    designReference: '',
    additionalFeatures: [] as string[],
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });

  const calculatePrice = () => {
    const websiteType = websiteTypes.find(t => t.value === formData.websiteType);
    const complexity = complexityLevels.find(c => c.value === formData.complexity);
    
    if (!websiteType || !complexity) return 0;

    let basePrice = websiteType.basePrice * complexity.multiplier;
    
    // Add additional features
    const additionalPrice = formData.additionalFeatures.reduce((total, featureId) => {
      const feature = additionalFeatures.find(f => f.id === featureId);
      return total + (feature?.price || 0);
    }, 0);
    
    basePrice += additionalPrice;
    
    // Urgency multiplier
    if (formData.urgency === 'urgent') basePrice *= 1.3;
    if (formData.urgency === 'express') basePrice *= 1.8;
    
    return Math.round(basePrice);
  };

  const handleAdditionalFeatureChange = (featureId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      additionalFeatures: checked 
        ? [...prev.additionalFeatures, featureId]
        : prev.additionalFeatures.filter(id => id !== featureId)
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
      service: 'website'
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
                  <Code className="h-5 w-5" />
                  <span>Detail Pemesanan Website</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Website Type */}
                  <div className="space-y-2">
                    <Label htmlFor="websiteType">Jenis Website *</Label>
                    <Select 
                      value={formData.websiteType} 
                      onValueChange={(value) => setFormData({...formData, websiteType: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis website" />
                      </SelectTrigger>
                      <SelectContent>
                        {websiteTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label} - Rp {type.basePrice.toLocaleString('id-ID')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Complexity */}
                  <div className="space-y-2">
                    <Label htmlFor="complexity">Tingkat Kompleksitas *</Label>
                    <Select 
                      value={formData.complexity} 
                      onValueChange={(value) => setFormData({...formData, complexity: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tingkat kompleksitas" />
                      </SelectTrigger>
                      <SelectContent>
                        {complexityLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Additional Features */}
                  <div className="space-y-3">
                    <Label>Fitur Tambahan</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {additionalFeatures.map((feature) => (
                        <div key={feature.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={feature.id}
                            checked={formData.additionalFeatures.includes(feature.id)}
                            onCheckedChange={(checked) => 
                              handleAdditionalFeatureChange(feature.id, checked as boolean)
                            }
                          />
                          <Label htmlFor={feature.id} className="text-sm">
                            {feature.label} (+Rp {feature.price.toLocaleString('id-ID')})
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technology Preference */}
                  <div className="space-y-2">
                    <Label htmlFor="techPreference">Preferensi Teknologi</Label>
                    <Select 
                      value={formData.techPreference} 
                      onValueChange={(value) => setFormData({...formData, techPreference: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih teknologi (opsional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {technologies.map((tech) => (
                          <SelectItem key={tech} value={tech}>
                            {tech}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                        <Label htmlFor="urgent">Mendesak (+30% harga)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express">Express (+80% harga)</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Nama/Judul Website *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Masukkan nama atau judul website"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi & Tujuan Website *</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Jelaskan tujuan website, target audience, dan fitur yang diinginkan"
                      rows={4}
                      required
                    />
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <Label htmlFor="features">Fitur Khusus yang Diinginkan</Label>
                    <Textarea
                      value={formData.features}
                      onChange={(e) => setFormData({...formData, features: e.target.value})}
                      placeholder="Contoh: sistem login, search function, contact form, gallery, dll."
                      rows={3}
                    />
                  </div>

                  {/* Design Reference */}
                  <div className="space-y-2">
                    <Label htmlFor="designReference">Referensi Desain</Label>
                    <Textarea
                      value={formData.designReference}
                      onChange={(e) => setFormData({...formData, designReference: e.target.value})}
                      placeholder="Cantumkan link website yang Anda sukai sebagai referensi desain"
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

                  <Button type="submit" className="w-full" size="lg" disabled={!formData.websiteType || !formData.complexity}>
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
                {formData.websiteType && formData.complexity ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Jenis Website:</span>
                        <span>{websiteTypes.find(t => t.value === formData.websiteType)?.label}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Kompleksitas:</span>
                        <span>{complexityLevels.find(c => c.value === formData.complexity)?.label}</span>
                      </div>
                      {formData.additionalFeatures.length > 0 && (
                        <div className="text-sm">
                          <span>Fitur Tambahan:</span>
                          <ul className="mt-1 ml-4">
                            {formData.additionalFeatures.map(featureId => {
                              const feature = additionalFeatures.find(f => f.id === featureId);
                              return (
                                <li key={featureId} className="text-xs text-gray-600">
                                  • {feature?.label}
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
                    Pilih jenis website dan kompleksitas untuk melihat estimasi harga
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Materi & Konten</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>Siapkan materi berikut:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Logo & brand assets</li>
                    <li>Konten teks</li>
                    <li>Foto/gambar berkualitas tinggi</li>
                    <li>Referensi desain (opsional)</li>
                  </ul>
                  <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                    <strong>Info:</strong> Tim kami akan membantu menyiapkan konten jika diperlukan
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
                    <span>Planning & wireframe</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">2</span>
                    <span>Design mockup</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">3</span>
                    <span>Development</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">4</span>
                    <span>Testing & deployment</span>
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