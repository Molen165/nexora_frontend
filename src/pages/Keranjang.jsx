import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function Keranjang({ cartItems, setCartItems, setCheckoutItems }) {
  const navigate = useNavigate();
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  // Checkbox toggle per item
  const toggleSelect = (cartItemId) => {
    setSelectedItemIds((prev) => 
      prev.includes(cartItemId)
        ? prev.filter(id => id !== cartItemId)
        : [...prev, cartItemId]
    );
  };

  // Toggle Checkbox Select All
  const toggleSelectAll = () => {
    if (selectedItemIds.length === cartItems.length) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(cartItems.map(i => i.cartItemId));
    }
  };

  // Update QTY di keranjang
  const updateQty = (cartItemId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const currentQty = Number(item.qty) || 1;
        const newQty = currentQty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  // Hapus item dari keranjang
  const removeItem = (cartItemId) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
    setSelectedItemIds(prev => prev.filter(id => id !== cartItemId));
  };

  // Hitung total harga item yang dicentang
  const selectedCartItems = cartItems.filter(item => selectedItemIds.includes(item.cartItemId));
  const totalPrice = selectedCartItems.reduce((acc, curr) => acc + (Number(curr.price) * Number(curr.qty)), 0);

  const handleProceedToCheckout = () => {
    if (selectedCartItems.length === 0) return;
    setCheckoutItems(selectedCartItems);
    navigate('/pembayaran');
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 font-sans pb-28">
      {/* Top Navbar Header */}
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

          {/* Judul & Tombol Kembali (Navigasi ke Halaman Sebelumnya) */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs font-semibold text-slate-400 border-r border-slate-800 pr-3">
              Keranjang ({cartItems.length})
            </span>
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
          </div>

        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 pt-6">
        <h1 className="text-lg font-extrabold text-white mb-4 sm:hidden">
          Keranjang Saya ({cartItems.length})
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/60 border border-slate-800/80 rounded-3xl">
            <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-xs">Keranjang belanjaanmu masih kosong.</p>
            <button onClick={() => navigate('/catalog')} className="mt-4 px-6 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30">
              Mulai Belanja
            </button>
          </div>
        ) : (
          <>
            {/* Select All Bar */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 mb-4 flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-slate-300">
                <input 
                  type="checkbox" 
                  checked={selectedItemIds.length === cartItems.length && cartItems.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded accent-indigo-600 cursor-pointer"
                />
                Pilih Semua ({cartItems.length})
              </label>
            </div>

            {/* List Produk Keranjang */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex gap-4 items-center">
                  <input 
                    type="checkbox" 
                    checked={selectedItemIds.includes(item.cartItemId)}
                    onChange={() => toggleSelect(item.cartItemId)}
                    className="w-4 h-4 rounded accent-indigo-600 cursor-pointer"
                  />

                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl bg-slate-950" />

                  <div className="flex-1">
                    <h3 className="text-xs font-bold text-white line-clamp-1">{item.name}</h3>
                    
                    {/* Detail Opsi Warna & Custom */}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-3 h-3 rounded-full border border-slate-700" style={{ backgroundColor: item.selectedColor }} />
                      <span className="text-[11px] text-slate-400">Laser: <strong className="text-slate-200">{item.customText}</strong></span>
                    </div>

                    <p className="text-xs font-extrabold text-indigo-400 mt-2">
                      Rp {Number(item.price).toLocaleString('id-ID')}
                    </p>
                  </div>

                  {/* QTY & Delete */}
                  <div className="flex flex-col items-end justify-between h-20">
                    <button onClick={() => removeItem(item.cartItemId)} className="text-slate-500 hover:text-rose-400 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                      <button onClick={() => updateQty(item.cartItemId, -1)} className="text-slate-400 hover:text-white"><Minus className="w-3 h-3" /></button>
                      <span className="text-xs font-bold text-white px-1">{item.qty}</span>
                      <button onClick={() => updateQty(item.cartItemId, 1)} className="text-slate-400 hover:text-white"><Plus className="w-3 h-3" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Floating Bottom Bar Checkout */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#0f172a]/90 backdrop-blur-md border-t border-slate-800/80 p-4 z-40">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400">Total Pembayaran ({selectedCartItems.length} item):</p>
              <p className="text-base font-extrabold text-indigo-400">Rp {totalPrice.toLocaleString('id-ID')}</p>
            </div>

            <button 
              onClick={handleProceedToCheckout}
              disabled={selectedCartItems.length === 0}
              className={`px-6 py-3 rounded-xl font-bold text-xs transition ${
                selectedCartItems.length > 0 
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Checkout ({selectedCartItems.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}