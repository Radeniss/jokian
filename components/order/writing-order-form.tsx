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
import { FileText, Calculator, Clock, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const taskTypes = [
  { value: 'esai', label: 'Esai', basePrice: 15000 },
  { value: 'makalah', label: 'Makalah', basePrice: 20000 },
  { value: 'laporan', label: 'Laporan', basePrice: 18000 },
  { value: 'skripsi', label: 'Skripsi', basePrice: 50000 },
  { value: 'tesis', label: 'Tesis', basePrice: 75000 },
  { value: 'disertasi', label: 'Disertasi', basePrice: 100000 },
  { value: 'artikel', label: 'Artikel Jurnal', basePrice: 30000 },
  { value: 'review', label: 'Review Jurnal', basePrice: 25000 }
];

const educationLevels = [
  { value: 'sd', label: 'SD', multiplier: 0.5 },
  { value: 'smp', label: 'SMP', multiplier: 0.7 },
  { value: 'sma', label: 'SMA', multiplier: 0.8 },
  { value: 's1', label: 'S1', multiplier: 1.0 },
  { value: 's2', label: 'S2', multiplier: 1.5 },
  { value: 's3', label: 'S3', multiplier: 2.0 },
  { value: 'umum', label: 'Umum', multiplier: 1.0 }
];

export function WritingOrderForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    taskType: '',
    educationLevel: '',
    pages: 1,
    chapters: 1,
    deadline: '',
    urgency: 'normal', // normal, urgent, express
    title: '',
    description: '',
    references: '',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });

  const calculatePrice = () => {
    const taskType = taskTypes.find(t => t.value === formData.taskType);
    const educationLevel = educationLevels.find(e => e.value === formData.educationLevel);
    
    if (!taskType || !educationLevel) return 0;

    let basePrice = taskType.basePrice * formData.pages * educationLevel.multiplier;
    
    // Urgency multiplier
    if (formData.urgency === 'urgent') basePrice *= 1.5;
    if (formData.urgency === 'express') basePrice *= 2;
    
    return Math.round(basePrice);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalPrice = calculatePrice();
    const downPayment = Math.round(totalPrice * 0.2);
    
    const orderData = {
      ...formData,
      totalPrice,
      downPayment,
      service: 'penulisan'
    };
    
    // Store order data in session storage
    sessionStorage.setItem('orderData', JSON.stringify(orderData));
    
    toast({
      title: "Pesanan berhasil dibuat",
      description: "Anda akan diarahkan ke halaman pembayaran.",
    });
    
    // Redirect to payment page
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
                  <FileText className="h-5 w-5" />
                  <span>Detail Pemesanan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Task Type */}
                  <div className="space-y-2">
                    <Label htmlFor="taskType">Jenis Tugas *</Label>
                    <Select 
                      value={formData.taskType} 
                      onValueChange={(value) => setFormData({...formData, taskType: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis tugas" />
                      </SelectTrigger>
                      <SelectContent>
                        {taskTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label} - Rp {type.basePrice.toLocaleString('id-ID')}/halaman
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Education Level */}
                  <div className="space-y-2">
                    <Label htmlFor="educationLevel">Tingkat Pendidikan *</Label>
                    <Select 
                      value={formData.educationLevel} 
                      onValueChange={(value) => setFormData({...formData, educationLevel: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tingkat pendidikan" />
                      </SelectTrigger>
                      <SelectContent>
                        {educationLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Pages and Chapters */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pages">Jumlah Halaman *</Label>
                      <Input
                        type="number"
                        min="1"
                        value={formData.pages}
                        onChange={(e) => setFormData({...formData, pages: parseInt(e.target.value) || 1})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="chapters">Jumlah Bab</Label>
                      <Input
                        type="number"
                        min="1"
                        value={formData.chapters}
                        onChange={(e) => setFormData({...formData, chapters: parseInt(e.target.value) || 1})}
                      />
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
                    <Label htmlFor="title">Judul Tugas *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Masukkan judul tugas"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi & Instruksi Khusus *</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Jelaskan detail tugas, format yang diinginkan, dan instruksi khusus lainnya"
                      rows={4}
                      required
                    />
                  </div>

                  {/* References */}
                  <div className="space-y-2">
                    <Label htmlFor="references">Referensi/Sumber (Opsional)</Label>
                    <Textarea
                      value={formData.references}
                      onChange={(e) => setFormData({...formData, references: e.target.value})}
                      placeholder="Cantumkan referensi yang harus digunakan atau link file yang diunggah"
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

                  <Button type="submit" className="w-full" size="lg" disabled={!formData.taskType || !formData.educationLevel}>
                    Lanjut ke Pembayaran
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Price Summary */}
          <div className="space-y-6">
            {/* Price Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5" />
                  <span>Ringkasan Harga</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.taskType && formData.educationLevel ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Jenis Tugas:</span>
                        <span>{taskTypes.find(t => t.value === formData.taskType)?.label}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tingkat:</span>
                        <span>{educationLevels.find(e => e.value === formData.educationLevel)?.label}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Jumlah Halaman:</span>
                        <span>{formData.pages} halaman</span>
                      </div>
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
                    Pilih jenis tugas dan tingkat pendidikan untuk melihat estimasi harga
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Upload Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>File & Referensi</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>Jika Anda memiliki file referensi, silakan upload ke:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Google Drive</li>
                    <li>Dropbox</li>
                    <li>OneDrive</li>
                  </ul>
                  <p>Kemudian cantumkan link-nya di kolom referensi.</p>
                </div>
              </CardContent>
            </Card>

            {/* Process Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Proses Pengerjaan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 space-y-3">
                  <div className="flex items-start space-x-2">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">1</span>
                    <span>Pembayaran DP 20%</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">2</span>
                    <span>Konfirmasi detail tugas</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">3</span>
                    <span>Pengerjaan dimulai</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">4</span>
                    <span>Pengiriman hasil & pelunasan</span>
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