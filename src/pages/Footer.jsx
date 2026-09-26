import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#0f172a] py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xs text-white">
            N
          </div>
          <span className="text-sm font-extrabold tracking-wider text-white">
            NEXORA
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-slate-500 text-center sm:text-left">
          © {new Date().getFullYear()} NEXORA Official Store. Premium Custom Tumbler.
        </p>

      </div>
    </footer>
  );
}