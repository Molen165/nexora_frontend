import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Logika simulasi login tanpa backend
    if (email === 'admin@nexora.id') {
      navigate('/admin');
    } else {
      navigate('/catalog');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#111827]">
      <div className="w-full max-w-sm bg-[#1F2937] border border-gray-800 p-6 rounded-3xl shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-600/20 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-blue-500/30">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">NEXORA</h2>
          <p className="text-xs text-gray-400 mt-1">Masuk untuk Memulai Demo Frontend</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@gmail.com atau admin@nexora.id"
              className="w-full bg-[#111827] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              required 
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Kata Sandi</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#111827] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl text-sm transition cursor-pointer">
            Masuk ke Aplikasi
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-gray-800 text-[11px] text-gray-400 space-y-1">
          <p>• Ketik email bebas → Langsung ke <b>Katalog Produk</b></p>
          <p>• Ketik <span className="text-blue-400">admin@nexora.id</span> → Langsung ke <b>Dashboard Admin</b></p>
        </div>
      </div>
    </div>
  );
}