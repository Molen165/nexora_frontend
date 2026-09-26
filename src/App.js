import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Katalog from './pages/Katalog';
import DashboardAdmin from './pages/DashboardAdmin';
import Pembayaran from './pages/Pembayaran';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/catalog" element={<Katalog />} />
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/checkout" element={<Pembayaran />} />
        {/* Fallback jika ada URL asal yang tidak dikenal */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}