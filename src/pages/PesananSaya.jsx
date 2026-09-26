import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Sudah diperbaiki dari 'react-router-down'
import { ArrowLeft, Package, Truck, CheckCircle2, Clock } from 'lucide-react'; // <-- ChevronRight yang tidak terpakai sudah dihapus

export default function PesananSaya() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('semua');

  // Dummy Data Pesanan
  const sampleOrders = [
    {
      id: 'NEX-892102',
      date: '26 Sep 2026',
      status: 'dikemas',
      items: [
        {
          name: 'NEXORA Digital Temperature 500ml',
          color: 'Black Matte',
          customText: 'Maulana - Custom Laser',
          qty: 1,
          price: 189000,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT3gXFjgePascoBxuWomIWjUECBxXawzkCEq6JSg9kIw&s=10'
        }
      ],
      totalPrice: 189000
    },
    {
      id: 'NEX-781920',
      date: '24 Sep 2026',
      status: 'dikirim',
      courier: 'JNE Express (RE102938472ID)',
      items: [
        {
          name: 'NEXORA Sport Hydrate 1L',
          color: 'Ocean Blue',
          customText: 'Tanpa Ukir Laser',
          qty: 2,
          price: 175000,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTw7q1ew6R2X12H1Sb1AmOntyBv2a9qMCNYZWaz64f4w&s=10'
        }
      ],
      totalPrice: 350000
    },
    {
      id: 'NEX-561230',
      date: '18 Sep 2026',
      status: 'selesai',
      items: [
        {
          name: 'NEXORA Vacuum Insulated 750ml',
          color: 'Silver Metallic',
          customText: 'NEXORA VIP',
          qty: 1,
          price: 229000,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ6feWzO_XQvxAuZEzbpJlGNDqRejZBig8vrgxh52LXg&s'
        }
      ],
      totalPrice: 229000
    }
  ];

  // Filter pesanan sesuai tab
  const filteredOrders = sampleOrders.filter((order) => {
    if (activeTab === 'semua') return true;
    return order.status === activeTab;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'dikemas':
        return (
          <span className="flex items-center gap-1.5 text-amber-400 bg-amber-500/10 border border-amber-500/20 text-[11px] font-bold px-2.5 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5" />
            Dikemas
          </span>
        );
      case 'dikirim':
        return (
          <span className="flex items-center gap-1.5 text-blue-400 bg-blue-500/10 border border-blue-500/20 text-[11px] font-bold px-2.5 py-1 rounded-lg">
            <Truck className="w-3.5 h-3.5" />
            Dalam Pengiriman
          </span>
        );
      case 'selesai':
        return (
          <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-bold px-2.5 py-1 rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Selesai
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 font-sans pb-16">
      {/* Navbar Header */}
      <nav className="bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/catalog')} 
              className="p-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-base font-extrabold text-white">Pesanan Saya</h1>
          </div>

          <button 
            onClick={() => navigate('/catalog')} 
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Belanja Lagi
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 pt-6 space-y-6">
        
        {/* TAB FILTER STATUS */}
        <div className="flex items-center justify-between bg-slate-900/80 p-1.5 border border-slate-800/80 rounded-2xl gap-1">
          {[
            { key: 'semua', label: 'Semua' },
            { key: 'dikemas', label: 'Dikemas' },
            { key: 'dikirim', label: 'Dikirim' },
            { key: 'selesai', label: 'Selesai' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition text-center ${
                activeTab === tab.key
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* DAFTAR PESANAN */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 border border-slate-800/80 rounded-3xl space-y-3">
            <Package className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400">Tidak ada pesanan dalam kategori ini.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div 
                key={order.id} 
                className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-4 hover:border-slate-700 transition"
              >
                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-white">{order.id}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[11px] text-slate-400">{order.date}</span>
                  </div>
                  {getStatusBadge(order.status)}
                </div>

                {/* Items List */}
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover bg-slate-950 rounded-xl border border-slate-800"
                    />
                    <div className="space-y-1 flex-1">
                      <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1">{item.name}</h3>
                      <p className="text-[11px] text-slate-400">
                        Warna: <span className="text-slate-300">{item.color}</span> | Ukir: <span className="text-indigo-400">{item.customText}</span>
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-bold text-slate-400">{item.qty}x</span>
                        <span className="text-xs font-bold text-white">Rp {item.price.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Tracking Info (Jika sedang dikirim) */}
                {order.status === 'dikirim' && (
                  <div className="bg-indigo-500/5 border border-indigo-500/20 p-3 rounded-xl flex items-center justify-between text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-indigo-400" />
                      <span>{order.courier}</span>
                    </div>
                    <span className="text-[10px] text-indigo-400 font-bold">Lacak</span>
                  </div>
                )}

                {/* Footer Pesanan & Total */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Total Pesanan</span>
                  <span className="text-sm font-extrabold text-indigo-400">
                    Rp {order.totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}