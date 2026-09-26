import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, LogOut, ShieldCheck, ChevronRight } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    alert('Berhasil Logout!');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 font-sans pb-16">
      {/* Navbar Header */}
      <nav className="bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/catalog')}>
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/30">
              N
            </div>
            <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              NEXORA
            </span>
          </div>

          <button 
            onClick={() => navigate('/catalog')} 
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Katalog</span>
          </button>
        </div>
      </nav>

      {/* Profile Content */}
      <div className="max-w-3xl mx-auto px-4 pt-8 space-y-6">
        
        {/* Card Info User */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 bg-indigo-600/20 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/30 font-bold text-2xl shadow-inner">
            <User className="w-10 h-10" />
          </div>
          <div className="space-y-1.5 text-center sm:text-left flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl font-extrabold text-white">Maulana</h1>
              <span className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-bold px-2 py-0.5 rounded-md">
                Member VIP
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              maulana@nexora.id
            </p>
            <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              +62 812-3456-7890
            </p>
          </div>
        </div>

        {/* Menu Pilihan */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-4 sm:p-6 divide-y divide-slate-800/80">
          <button 
            onClick={() => alert('Halaman Alamat Pengiriman')}
            className="w-full py-3.5 flex items-center justify-between hover:px-2 transition-all rounded-xl hover:bg-slate-800/40"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600/10 text-indigo-400 rounded-xl">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-200">Alamat Pengiriman</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>

          <button 
            onClick={() => alert('Keamanan & Akun')}
            className="w-full py-3.5 flex items-center justify-between hover:px-2 transition-all rounded-xl hover:bg-slate-800/40"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600/10 text-indigo-400 rounded-xl">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-200">Keamanan Akun</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Tombol Logout */}
        <button 
          onClick={handleLogout}
          className="w-full py-3.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-bold rounded-2xl transition flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar dari Akun (Logout)</span>
        </button>

      </div>
    </div>
  );
}