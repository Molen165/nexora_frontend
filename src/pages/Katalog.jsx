import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Sparkles, LogOut, Search, Star, ShieldCheck } from 'lucide-react';

export default function Katalog() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Semua', 'Custom Laser', 'Thermal Hot/Cold', 'Sport Edition', 'Slim Series'];

  const products = [
    {
      id: 1,
      name: 'NEXORA Custom Engrave 500ml',
      category: 'Custom Laser',
      price: 'Rp 249.000',
      originalPrice: 'Rp 299.000',
      rating: 4.9,
      sold: '1.2k',
      badge: 'Bestseller',
      desc: 'Bebas ukir nama/logo dengan teknologi laser presisi tinggi.'
    },
    {
      id: 2,
      name: 'NEXORA Thermal Master 750ml',
      category: 'Thermal Hot/Cold',
      price: 'Rp 310.000',
      originalPrice: 'Rp 350.000',
      rating: 4.8,
      sold: '850',
      badge: 'Tahan 24 Jam',
      desc: 'Double-wall vacuum insulation. Dingin & panas tahan seharian.'
    },
    {
      id: 3,
      name: 'NEXORA Active Sport Hydrate 1L',
      category: 'Sport Edition',
      price: 'Rp 275.000',
      originalPrice: 'Rp 320.000',
      rating: 4.7,
      sold: '530',
      badge: 'Tahan Banting',
      desc: 'Kapasitas besar 1 Liter, kokoh, dan pegangan ergonomis.'
    },
    {
      id: 4,
      name: 'NEXORA Slim Minimalist 400ml',
      category: 'Slim Series',
      price: 'Rp 199.000',
      originalPrice: 'Rp 239.000',
      rating: 4.9,
      sold: '2.1k',
      badge: 'Ringan',
      desc: 'Desain elegan super ramping, muat di tas kerja maupun cup holder.'
    }
  ];

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#111827] text-white flex flex-col font-sans">
      
      {/* 1. NAVBAR HEADER */}
      <header className="sticky top-0 z-50 bg-[#1F2937] border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/catalog')}>
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
              N
            </div>
            <span className="font-extrabold text-lg tracking-wider text-white">NEXORA</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input 
                type="text"
                placeholder="Cari tumbler favorit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#111827] border border-gray-700 text-xs rounded-xl pl-9 pr-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/checkout')}
              className="relative p-2.5 bg-[#111827] border border-gray-700 rounded-xl hover:border-blue-500 cursor-pointer">
              <ShoppingBag className="w-4 h-4 text-gray-300" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">1</span>
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="flex items-center gap-1.5 text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-2 rounded-xl hover:bg-red-500/20 cursor-pointer">
              <LogOut className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-4 py-6 flex-1 space-y-8 w-full">
        
        {/* HERO BANNER */}
        <section className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-[#1F2937] border border-blue-500/30 p-6 md:p-8 shadow-2xl">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Promo Launching NEXORA
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Ukir Nama & Logo Suka-Suka di Tumbler Premium
            </h1>
            <p className="text-xs text-gray-300">
              Gaya hidup sehat dengan sentuhan personalisasi. Stainless Steel 316 Food Grade.
            </p>
            <button 
              onClick={() => navigate('/checkout')}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-xl text-xs transition cursor-pointer">
              Pesan Custom Sekarang
            </button>
          </div>
        </section>

        {/* CATEGORY FILTER */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">Katalog Koleksi Tumbler</h2>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap border cursor-pointer ${
                  selectedCategory === cat 
                    ? 'bg-blue-600 border-blue-500 text-white' 
                    : 'bg-[#1F2937] border-gray-800 text-gray-400 hover:text-white'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* PRODUCT GRID */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProducts.map((item) => (
            <div 
              key={item.id} 
              className="bg-[#1F2937] border border-gray-800 rounded-2xl p-4 flex flex-col justify-between">
              
              <div>
                {/* Visual Box */}
                <div className="w-full h-36 rounded-xl bg-gradient-to-br from-blue-900 to-gray-900 relative flex items-center justify-center border border-gray-700/50 mb-3">
                  <ShoppingBag className="w-10 h-10 text-blue-400/40" />
                  <span className="absolute top-2 left-2 bg-blue-600/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">
                    {item.badge}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
                  <span className="text-blue-400 font-medium">{item.category}</span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-3 h-3 fill-yellow-400" />
                    <span className="text-gray-200 font-bold">{item.rating}</span>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-white">{item.name}</h3>
                <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">{item.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-500 line-through">{item.originalPrice}</p>
                  <p className="text-xs font-extrabold text-emerald-400">{item.price}</p>
                </div>
                <button 
                  onClick={() => navigate('/checkout', { state: { product: item } })}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-xl font-medium cursor-pointer flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Beli
                </button>
              </div>

            </div>
          ))}
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 bg-[#1F2937]/50 py-4 mt-8 text-center text-xs text-gray-500">
        <p>© 2026 NEXORA Tumbler Project. All rights reserved.</p>
      </footer>

    </div>
  );
}