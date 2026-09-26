import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Plus, Minus, Star, CheckCircle2 } from 'lucide-react';

export default function DetailProduk({ products, onAddToCart, setCheckoutItems, cartCount }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === parseInt(id));

  const [selectedColor, setSelectedColor] = useState(product ? product.colors[0] : '');
  const [customText, setCustomText] = useState('');
  const [qty, setQty] = useState(1);
  const [showToast, setShowToast] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0b1120] text-white flex flex-col items-center justify-center p-4">
        <p className="text-slate-400 mb-4 text-xs">Produk tidak ditemukan.</p>
        <button onClick={() => navigate('/catalog')} className="px-5 py-2 bg-indigo-600 rounded-xl text-xs font-bold">
          Kembali ke Katalog
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      selectedColor,
      customText: customText.trim() || 'Tanpa Ukir Laser',
      qty
    });

    // Tampilkan notifikasi singkat tanpa pindah halaman
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  const handleBuyNow = () => {
    const buyItem = {
      ...product,
      selectedColor,
      customText: customText.trim() || 'Tanpa Ukir Laser',
      qty
    };
    setCheckoutItems([buyItem]);
    navigate('/pembayaran');
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 font-sans pb-16 relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-emerald-500 text-white px-4 py-3 rounded-2xl shadow-2xl border border-emerald-400/40 flex items-center gap-2.5 animate-bounce text-xs font-bold">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span>Produk berhasil ditambahkan ke keranjang!</span>
        </div>
      )}

      {/* Top Navbar (Samain Persis dengan Header Katalog) */}
      <nav className="bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo NEXORA (Klik untuk Balik ke Katalog) */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/catalog')}>
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/30">
              N
            </div>
            <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              NEXORA
            </span>
          </div>

          {/* Tombol Kembali & Keranjang */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/catalog')} 
              className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Katalog</span>
            </button>

            <button 
              onClick={() => navigate('/cart')}
              className="relative p-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition text-slate-300"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0b1120]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Detail Content */}
      <div className="max-w-5xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8">
          {/* Gambar Produk */}
          <div className="aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 relative">
            <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow">
              {product.badge}
            </span>
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Form Pilihan Produk */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="text-indigo-400 font-semibold uppercase">{product.category}</span>
                <div className="flex items-center gap-1 text-amber-400 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-500">({product.sold} Terjual)</span>
                </div>
              </div>

              <h1 className="text-2xl font-extrabold text-white">{product.name}</h1>

              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl font-black text-indigo-400">
                  Rp {product.price.toLocaleString('id-ID')}
                </span>
                <span className="text-xs text-slate-500 line-through">
                  Rp {product.originalPrice.toLocaleString('id-ID')}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800/80">
                {product.fullDesc}
              </p>
            </div>

            {/* Opsi Warna */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">Pilih Warna Tumbler:</label>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-9 h-9 rounded-full border-2 transition ${
                      selectedColor === color ? 'border-indigo-500 scale-110 shadow-lg shadow-indigo-500/50' : 'border-slate-800'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Input Laser Custom */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">Teks Ukir Laser (Opsional):</label>
              <input 
                type="text" 
                placeholder="Contoh: Maulana 165"
                maxLength={20}
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition"
              />
              <p className="text-[10px] text-slate-500">Maksimal 20 karakter.</p>
            </div>

            {/* Atur QTY */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-slate-300">Jumlah:</span>
              <div className="flex items-center gap-3 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-slate-400 hover:text-white"><Minus className="w-4 h-4" /></button>
                <span className="text-xs font-bold text-white px-2">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="text-slate-400 hover:text-white"><Plus className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                onClick={handleAddToCart}
                className="py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 border border-slate-700"
              >
                <ShoppingCart className="w-4 h-4" />
                + Keranjang
              </button>
              <button 
                onClick={handleBuyNow}
                className="py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-indigo-600/30"
              >
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}