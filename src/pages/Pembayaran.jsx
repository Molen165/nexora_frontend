import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, CreditCard, ShieldCheck, CheckCircle2, Sparkles, MapPin, Type } from 'lucide-react';

export default function Pembayaran() {
  const navigate = useNavigate();
  const location = useLocation();

  // Mengambil data produk jika dikirim dari katalog
  const product = location.state?.product || {
    name: 'NEXORA Custom Engrave 500ml',
    price: 'Rp 249.000',
    category: 'Custom Laser'
  };

  const [customText, setCustomText] = useState('');
  const [selectedColor, setSelectedColor] = useState('Midnight Black');
  const [paymentMethod, setPaymentMethod] = useState('qris');
  const [isSuccess, setIsSuccess] = useState(false);

  const colors = ['Midnight Black', 'Electric Blue', 'Silver Metallic', 'Forest Green'];

  const handleProcessPayment = (e) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#111827] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#1F2937] border border-gray-800 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold">Pesanan Berhasil!</h2>
          <p className="text-xs text-gray-400">
            Terima kasih! Tumbler <span className="text-blue-400 font-semibold">{product.name}</span> dengan grafir nama <span className="text-emerald-400 font-semibold">"{customText || 'NEXORA'}"</span> sedang diproses.
          </p>
          <div className="pt-4 space-y-2">
            <button 
              onClick={() => navigate('/catalog')}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl text-xs transition cursor-pointer">
              Kembali ke Katalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111827] text-white font-sans flex flex-col">
      {/* HEADER NAVBAR */}
      <header className="bg-[#1F2937] border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => navigate('/catalog')}
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition cursor-pointer">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog
          </button>
          <span className="font-bold text-sm tracking-wide">Checkout & Custom Tumbler</span>
          <div className="w-16"></div>
        </div>
      </header>

      {/* MAIN FORM */}
      <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: FORM DETAILS */}
        <div className="md:col-span-2 space-y-6">
          
          {/* 1. CUSTOMIZATION PANEL */}
          <section className="bg-[#1F2937] border border-gray-800 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-bold flex items-center gap-2 text-blue-400">
              <Sparkles className="w-4 h-4" /> 1. Kustomisasi Tumbler Kamu
            </h2>

            <div>
              <label className="text-xs text-gray-400 block mb-1.5">Pilih Warna Tumbler</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-2 rounded-xl text-[11px] font-medium border text-center transition cursor-pointer ${
                      selectedColor === color 
                        ? 'bg-blue-600/20 border-blue-500 text-blue-300' 
                        : 'bg-[#111827] border-gray-800 text-gray-400 hover:text-white'
                    }`}>
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-1.5 flex items-center gap-1">
                <Type className="w-3.5 h-3.5 text-blue-400" /> Teks Ukir Nama / Logo (Laser Engrave)
              </label>
              <input 
                type="text"
                placeholder="Contoh: Alex Sanders / NEXORA 2026"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full bg-[#111827] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <p className="text-[10px] text-gray-500 mt-1">*Maksimal 20 karakter, hasil presisi laser tahan selamanya.</p>
            </div>
          </section>

          {/* 2. SHIPPING ADDRESS */}
          <section className="bg-[#1F2937] border border-gray-800 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-bold flex items-center gap-2 text-blue-400">
              <MapPin className="w-4 h-4" /> 2. Alamat Pengiriman
            </h2>

            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Nama Lengkap Penerima" 
                defaultValue="Maolena"
                className="w-full bg-[#111827] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <input 
                type="text" 
                placeholder="Nomor WhatsApp/HP" 
                defaultValue="081234567890"
                className="w-full bg-[#111827] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <textarea 
                placeholder="Alamat Lengkap (Jalan, No. Rumah, Kecamatan, Kota)" 
                rows="3"
                defaultValue="Jl. Sudirman No. 45, Jakarta Selatan"
                className="w-full bg-[#111827] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>
          </section>

          {/* 3. PAYMENT METHOD */}
          <section className="bg-[#1F2937] border border-gray-800 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-bold flex items-center gap-2 text-blue-400">
              <CreditCard className="w-4 h-4" /> 3. Metode Pembayaran
            </h2>

            <div className="space-y-2">
              {[
                { id: 'qris', label: 'QRIS (Gopay, OVO, Dana, ShopeePay)', desc: 'Instan & Bebas Biaya Admin' },
                { id: 'bank', label: 'Bank Transfer (BCA, Mandiri, BNI)', desc: 'Konfirmasi otomatis' }
              ].map((method) => (
                <label 
                  key={method.id} 
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                    paymentMethod === method.id 
                      ? 'bg-blue-600/10 border-blue-500' 
                      : 'bg-[#111827] border-gray-800'
                  }`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                    className="mt-0.5 accent-blue-600"
                  />
                  <div>
                    <p className="text-xs font-bold text-white">{method.label}</p>
                    <p className="text-[10px] text-gray-400">{method.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY */}
        <div className="space-y-4">
          <div className="bg-[#1F2937] border border-gray-800 rounded-2xl p-5 space-y-4 sticky top-20">
            <h2 className="text-sm font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-blue-500" /> Ringkasan Pesanan
            </h2>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">{product.name}</span>
                <span className="font-bold text-white">{product.price}</span>
              </div>
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>Warna:</span>
                <span className="text-blue-400 font-medium">{selectedColor}</span>
              </div>
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>Grafir Nama:</span>
                <span className="text-emerald-400 font-medium">{customText || '(Tanpa Custom)'}</span>
              </div>
              <div className="flex justify-between text-xs pt-2 border-t border-gray-800">
                <span className="text-gray-400">Ongkos Kirim</span>
                <span className="text-emerald-400 font-bold">GRATIS</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-800 flex justify-between items-end">
              <div>
                <p className="text-[10px] text-gray-400">Total Pembayaran</p>
                <p className="text-lg font-extrabold text-emerald-400">{product.price}</p>
              </div>
            </div>

            <button 
              onClick={handleProcessPayment}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-xs transition shadow-lg shadow-blue-600/30 cursor-pointer flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Bayar Sekarang
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}