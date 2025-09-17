'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Wallet, Smartphone, Copy, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const paymentMethods = [
  {
    id: 'bank_transfer',
    name: 'Transfer Bank',
    icon: CreditCard,
    description: 'BCA, BNI, BRI, Mandiri',
    details: {
      BCA: '1234567890',
      BNI: '0987654321',
      BRI: '5555666677',
      Mandiri: '1111222233'
    }
  },
  {
    id: 'e_wallet',
    name: 'E-Wallet',
    icon: Wallet,
    description: 'GoPay, OVO, DANA, ShopeePay',
    details: {
      GoPay: '081234567890',
      OVO: '081234567890',
      DANA: '081234567890',
      ShopeePay: '081234567890'
    }
  },
  {
    id: 'qris',
    name: 'QRIS',
    icon: Smartphone,
    description: 'Scan QR Code untuk pembayaran',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=QRIS_PAYMENT_TASKPRO'
  }
];

export default function PaymentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [orderData, setOrderData] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  useEffect(() => {
    const storedOrderData = sessionStorage.getItem('orderData');
    if (!storedOrderData) {
      router.push('/pesan');
      return;
    }
    setOrderData(JSON.parse(storedOrderData));
  }, [router]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Berhasil disalin",
      description: "Nomor rekening telah disalin ke clipboard.",
    });
  };

  const handlePaymentConfirmation = () => {
    setPaymentConfirmed(true);
    
    // Simulate order processing
    setTimeout(() => {
      toast({
        title: "Pembayaran berhasil dikonfirmasi",
        description: "Pesanan Anda sedang diproses. Kami akan menghubungi Anda segera.",
      });
      
      // Clear order data and redirect
      sessionStorage.removeItem('orderData');
      router.push('/');
    }, 2000);
  };

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Memuat data pesanan...</h2>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pembayaran</h1>
            <p className="text-gray-600">Selesaikan pembayaran DP untuk memulai pengerjaan</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Ringkasan Pesanan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Layanan:</span>
                      <span className="capitalize">{orderData.service}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Jenis Tugas:</span>
                      <span className="capitalize">{orderData.taskType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Halaman:</span>
                      <span>{orderData.pages}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tingkat:</span>
                      <span className="uppercase">{orderData.educationLevel}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Urgensi:</span>
                      <Badge variant={orderData.urgency === 'express' ? 'destructive' : orderData.urgency === 'urgent' ? 'default' : 'secondary'}>
                        {orderData.urgency}
                      </Badge>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Harga:</span>
                      <span className="font-semibold">Rp {orderData.totalPrice.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-orange-600">
                      <span>DP (20%):</span>
                      <span className="font-bold">Rp {orderData.downPayment.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Sisa:</span>
                      <span>Rp {(orderData.totalPrice - orderData.downPayment).toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Methods */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Pilih Metode Pembayaran</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Payment Method Selection */}
                  <div className="space-y-4">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <div
                          key={method.id}
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedPayment === method.id 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedPayment(method.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className="h-6 w-6 text-blue-600" />
                            <div>
                              <h3 className="font-semibold">{method.name}</h3>
                              <p className="text-sm text-gray-600">{method.description}</p>
                            </div>
                          </div>

                          {/* Payment Details */}
                          {selectedPayment === method.id && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              {method.details && (
                                <div className="space-y-3">
                                  <p className="text-sm font-medium text-gray-900">Detail Pembayaran:</p>
                                  {Object.entries(method.details).map(([bank, number]) => (
                                    <div key={bank} className="flex items-center justify-between bg-white p-3 rounded border">
                                      <div>
                                        <span className="font-medium">{bank}</span>
                                        <div className="text-sm text-gray-600">a.n. TaskPro Indonesia</div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <span className="font-mono text-sm">{number}</span>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => copyToClipboard(number as string)}
                                        >
                                          <Copy className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {method.qrCode && (
                                <div className="text-center">
                                  <p className="text-sm font-medium text-gray-900 mb-4">Scan QR Code:</p>
                                  <img 
                                    src={method.qrCode} 
                                    alt="QR Code" 
                                    className="mx-auto border rounded-lg"
                                  />
                                </div>
                              )}

                              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                                <p className="text-sm text-yellow-800">
                                  <strong>Jumlah yang harus dibayar: Rp {orderData.downPayment.toLocaleString('id-ID')}</strong>
                                </p>
                                <p className="text-xs text-yellow-700 mt-1">
                                  Pastikan jumlah yang Anda transfer sesuai dengan nominal di atas.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Confirmation Button */}
                  {selectedPayment && (
                    <div className="border-t pt-6">
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">Langkah selanjutnya:</h4>
                          <ol className="text-sm text-blue-800 space-y-1">
                            <li>1. Lakukan pembayaran DP sebesar Rp {orderData.downPayment.toLocaleString('id-ID')}</li>
                            <li>2. Simpan bukti pembayaran</li>
                            <li>3. Klik tombol "Konfirmasi Pembayaran" di bawah</li>
                            <li>4. Kirim bukti pembayaran via WhatsApp: 081234567890</li>
                          </ol>
                        </div>
                        
                        <Button 
                          className="w-full" 
                          size="lg" 
                          onClick={handlePaymentConfirmation}
                          disabled={paymentConfirmed}
                        >
                          {paymentConfirmed ? (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Pembayaran Dikonfirmasi
                            </>
                          ) : (
                            'Konfirmasi Pembayaran'
                          )}
                        </Button>
                        
                        <p className="text-xs text-gray-600 text-center">
                          Setelah pembayaran dikonfirmasi, tim kami akan menghubungi Anda dalam 1x24 jam.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}