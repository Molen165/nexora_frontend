import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, ShoppingBag } from 'lucide-react';

export default function Katalog({ products, cartCount, onAddToCart }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Tumbler Suhu', 'Stainless Steel', 'Sport Edition', 'Kapasitas Besar'];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 font-sans flex flex-col justify-between">
      
      <div>
        {/* HEADER / NAVBAR */}
        <nav className="bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            
            {/* Logo NEXORA */}
            <div 
              className="flex items-center gap-2.5 cursor-pointer" 
              onClick={() => navigate('/catalog')}
            >
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/30">
                N
              </div>
              <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                NEXORA
              </span>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5" />
              <input 
                type="text"
                placeholder="Cari tumbler favoritmu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            {/* Action Icons: Pesanan Saya, Cart & Profile */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Tombol Pesanan Saya (SUDAH DIPERBAIKI DENGAN NAVIGATE) */}
              <button 
                onClick={() => navigate('/pesanan-saya')}
                className="p-2.5 bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl transition text-slate-300 flex items-center gap-2 hover:text-indigo-400"
                title="Pesanan Saya"
              >
                <ShoppingBag className="w-4 h-4 text-indigo-400" />
                <span className="hidden sm:inline text-xs font-bold">Pesanan Saya</span>
              </button>

              {/* Tombol Keranjang */}
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

              {/* Tombol Profile */}
              <button
                onClick={() => navigate('/profile')}
                className="p-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition text-slate-300 flex items-center justify-center"
              >
                <User className="w-4 h-4" />
              </button>

            </div>
          </div>
        </nav>

        {/* Banner Katalog */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="bg-gradient-to-r from-indigo-900/40 via-slate-900 to-slate-900 border border-slate-800/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-2 max-w-xl z-10">
              <span className="text-[10px] font-extrabold tracking-widest text-indigo-400 uppercase bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                Katalog Resmi
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Jika Besok Kau Mencariku, Cari aku Di Rasa Sesalmu. ADIOS
              </h1>
              <p className="text-xs text-slate-400 leading-relaxed">
                Semua produk gratis engrave laser custom nama & bergaransi retur 100%.
              </p>
            </div>
          </div>
        </div>

        {/* Filter & Search Mobile */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-4">
          <div className="md:hidden relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input 
              type="text"
              placeholder="Cari tumbler..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Produk */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/40 border border-slate-800/80 rounded-3xl">
              <p className="text-xs text-slate-400">Produk tidak ditemukan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="bg-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition duration-300 group cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-square bg-slate-950 relative overflow-hidden">
                      <span className="absolute top-2.5 left-2.5 z-10 bg-indigo-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md shadow">
                        {p.badge}
                      </span>
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>

                    <div className="p-4 space-y-2">
                      <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block">
                        {p.category}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1 group-hover:text-indigo-300 transition">
                        {p.name}
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs sm:text-sm font-extrabold text-indigo-400">
                          Rp {p.price.toLocaleString('id-ID')}
                        </span>
                        <span className="text-[10px] text-slate-500 line-through">
                          Rp {p.originalPrice.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart({
                          ...p,
                          selectedColor: p.colors[0],
                          customText: 'Tanpa Ukir Laser',
                          qty: 1
                        });
                      }}
                      className="w-full py-2 bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 border border-slate-700 hover:border-indigo-500"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      + Keranjang
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}