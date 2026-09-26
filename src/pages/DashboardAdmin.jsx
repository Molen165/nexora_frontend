import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Users, DollarSign, Package, LogOut, 
  Search, CheckCircle, Clock, Truck, Sparkles, Filter 
} from 'lucide-react';

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');

  // Mock Data Pesanan Masuk
  const [orders, setOrders] = useState([
    {
      id: 'NX-8921',
      customer: 'Maolena',
      product: 'NEXORA Custom Engrave 500ml',
      color: 'Midnight Black',
      customText: 'Maolena / NEXORA 2026',
      total: 'Rp 249.000',
      status: 'Diproses',
      date: '26 Sep 2026'
    },
    {
      id: 'NX-8920',
      customer: 'Budi Santoso',
      product: 'NEXORA Thermal Master 750ml',
      color: 'Electric Blue',
      customText: 'Budi S. - Leader',
      total: 'Rp 310.000',
      status: 'Dikirim',
      date: '25 Sep 2026'
    },
    {
      id: 'NX-8919',
      customer: 'Siti Rahma',
      product: 'NEXORA Slim Minimalist 400ml',
      color: 'Silver Metallic',
      customText: 'Siti & Ahmad',
      total: 'Rp 199.000',
      status: 'Selesai',
      date: '24 Sep 2026'
    }
  ]);

  // Handler Ubah Status Pesanan
  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'Semua' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#111827] text-white font-sans flex flex-col">
      
      {/* 1. HEADER ADMIN */}
      <header className="bg-[#1F2937] border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
              N
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-wider block">NEXORA ADMIN</span>
              <span className="text-[10px] text-blue-400 font-medium">Dashboard Pengelolaan Pesanan</span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/login')}
            className="flex items-center gap-1.5 text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-xl hover:bg-red-500/20 transition cursor-pointer">
            <LogOut className="w-3.5 h-3.5" /> Keluar Admin
          </button>
        </div>
      </header>

      {/* 2. MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full space-y-6">
        
        {/* METRICS STATISTIK */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#1F2937] border border-gray-800 p-4 rounded-2xl flex items-center gap-3">
            <div className="p-3 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-gray-400">Total Penjualan</p>
              <p className="text-lg font-bold text-white">Rp 12.450.000</p>
            </div>
          </div>

          <div className="bg-[#1F2937] border border-gray-800 p-4 rounded-2xl flex items-center gap-3">
            <div className="p-3 bg-purple-600/20 text-purple-400 rounded-xl border border-purple-500/30">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-gray-400">Total Pesanan</p>
              <p className="text-lg font-bold text-white">48 Transaksi</p>
            </div>
          </div>

          <div className="bg-[#1F2937] border border-gray-800 p-4 rounded-2xl flex items-center gap-3">
            <div className="p-3 bg-yellow-600/20 text-yellow-400 rounded-xl border border-yellow-500/30">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-gray-400">Perlu Diproses</p>
              <p className="text-lg font-bold text-yellow-400">5 Pesanan</p>
            </div>
          </div>

          <div className="bg-[#1F2937] border border-gray-800 p-4 rounded-2xl flex items-center gap-3">
            <div className="p-3 bg-emerald-600/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-gray-400">Tumbler Terjual</p>
              <p className="text-lg font-bold text-emerald-400">142 Pcs</p>
            </div>
          </div>
        </div>

        {/* CONTROLS & FILTER */}
        <div className="bg-[#1F2937] border border-gray-800 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari ID Pesanan / Nama..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111827] border border-gray-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Status:
            </span>
            {['Semua', 'Diproses', 'Dikirim', 'Selesai'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition ${
                  filterStatus === status 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-[#111827] border border-gray-800 text-gray-400 hover:text-white'
                }`}>
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* TABEL PESANAN */}
        <div className="bg-[#1F2937] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-[#111827] text-gray-400 uppercase font-semibold text-[10px] tracking-wider border-b border-gray-800">
                <tr>
                  <th className="p-4">ID Pesanan</th>
                  <th className="p-4">Pelanggan</th>
                  <th className="p-4">Detail Tumbler</th>
                  <th className="p-4">Teks Ukir Laser</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Aksi Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#111827]/50 transition">
                    <td className="p-4 font-bold text-blue-400">{order.id}</td>
                    <td className="p-4">
                      <p className="font-bold text-white">{order.customer}</p>
                      <p className="text-[10px] text-gray-500">{order.date}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-white">{order.product}</p>
                      <p className="text-[10px] text-gray-400">Warna: {order.color}</p>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-lg font-mono text-[11px]">
                        <Sparkles className="w-3 h-3" /> "{order.customText}"
                      </span>
                    </td>
                    <td className="p-4 font-bold text-white">{order.total}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        order.status === 'Diproses' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                        order.status === 'Dikirim' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="bg-[#111827] border border-gray-700 text-xs rounded-lg px-2 py-1 text-white focus:outline-none focus:border-blue-500 cursor-pointer">
                        <option value="Diproses">Diproses</option>
                        <option value="Dikirim">Dikirim</option>
                        <option value="Selesai">Selesai</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}