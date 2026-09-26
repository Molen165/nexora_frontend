import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Katalog from './pages/Katalog';
import DetailProduk from './pages/DetailProduk';
import Keranjang from './pages/Keranjang';
import Pembayaran from './pages/Pembayaran';
import DashboardAdmin from './pages/DashboardAdmin';
import Profile from './pages/Profile';
import PesananSaya from './pages/PesananSaya'; // <-- IMPORT HALAMAN BARU

// --- KOMPONEN FOOTER SEDERHANA ---
function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#0f172a] py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-md shadow-indigo-600/30">
            N
          </div>
          <span className="text-sm font-extrabold tracking-wider text-white">
            NEXORA
          </span>
        </div>

        {/* Copyright Text */}
        <p className="text-xs text-slate-500 text-center sm:text-left">
          © {new Date().getFullYear()} NEXORA Official Store. Premium Custom Tumbler.
        </p>

      </div>
    </footer>
  );
}

export const PRODUCTS = [
  {
    id: 1,
    name: "NEXORA Digital Temperature 500ml",
    category: "Tumbler Suhu",
    price: 189000,
    originalPrice: 249000,
    rating: 4.9,
    sold: 1420,
    badge: "Bestseller",
    colors: ["#1e293b", "#3b82f6", "#e2e8f0"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT3gXFjgePascoBxuWomIWjUECBxXawzkCEq6JSg9kIw&s=10",
    fullDesc: "Tumbler dengan indikator suhu digital di bagian tutup untuk mengecek suhu minuman secara presisi. Menjaga suhu panas/dingin hingga 12 jam."
  },
  {
    id: 2,
    name: "NEXORA Vacuum Insulated 750ml",
    category: "Stainless Steel",
    price: 229000,
    originalPrice: 299000,
    rating: 4.8,
    sold: 890,
    badge: "Tahan 24 Jam",
    colors: ["#0f172a", "#10b981", "#64748b"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ6feWzO_XQvxAuZEzbpJlGNDqRejZBig8vrgxh52LXg&s",
    fullDesc: "Tumbler stainless steel ganda berkualitas tinggi untuk menjaga ketahanan suhu minuman lebih lama. Cocok untuk kerja maupun perjalanan."
  },
  {
    id: 3,
    name: "NEXORA Sport Hydrate 1L",
    category: "Sport Edition",
    price: 175000,
    originalPrice: 220000,
    rating: 4.9,
    sold: 2100,
    badge: "Laris Manis",
    colors: ["#2563eb", "#dc2626", "#16a34a"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTw7q1ew6R2X12H1Sb1AmOntyBv2a9qMCNYZWaz64f4w&s=10",
    fullDesc: "Botol minum sporty berkapasitas 1 liter dengan bahan kuat anti-bocor, dilengkapi tali fleksibel untuk gym, lari, dan olahraga."
  },
  {
    id: 4,
    name: "NEXORA Slim Classic 400ml",
    category: "Stainless Steel",
    price: 149000,
    originalPrice: 199000,
    rating: 4.7,
    sold: 630,
    badge: "Ramping",
    colors: ["#ec4899", "#8b5cf6", "#f59e0b"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9m-tW2GpbvlSpkKpz-uY1maGuH0zSuOVmzUaUT5qVuw&s=10",
    fullDesc: "Ukuran ramping dan praktis dibawa dalam kantong tas. Dibuat dari bahan stainless steel food grade bebas BPA."
  },
  {
    id: 5,
    name: "NEXORA Executive Wood Grain 600ml",
    category: "Kapasitas Besar",
    price: 289000,
    originalPrice: 350000,
    rating: 5.0,
    sold: 410,
    badge: "Kuat",
    colors: ["#78350f", "#451a03"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP-Cb_SlDfpguZxJdBBWlVjHo_3j94smDTBB8YpEHoNw&s=10",
    fullDesc: "Desain motif kayu kokoh untuk penggunaan harian dan travel. Tahan banting dan menjaga suhu air perjalanan jauh."
  },
  {
    id: 6,
    name: "NEXORA Smart Temp Matte 500ml",
    category: "Tumbler Suhu",
    price: 199000,
    originalPrice: 259000,
    rating: 4.8,
    sold: 980,
    badge: "Baru",
    colors: ["#0284c7", "#475569"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTZJnUjmTyeXPsEWaxq8bXTUXuec-Dh1WS4qMQO3p96g&s=10",
    fullDesc: "Finishing warna matte anti-sidik jari dengan sensor temperatur presisi pada bagian tutup botol."
  },
  {
    id: 7,
    name: "NEXORA Titan Heavy Duty 1.2L",
    category: "Sport Edition",
    price: 249000,
    originalPrice: 310000,
    rating: 4.9,
    sold: 1150,
    badge: "Jumbo",
    colors: ["#15803d", "#1e293b"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO6LLAiXktc8R0SOH3bDUM9KptOZz-E-W2L_BxOB6Gug&s=10",
    fullDesc: "Kapasitas ekstra besar 1.2 Liter dengan pegangan yang kokoh untuk aktivitas outdoor dan latihan fisik berat."
  },
  {
    id: 8,
    name: "NEXORA Black Gold Edition 500ml",
    category: "Kapasitas Besar",
    price: 269000,
    originalPrice: 329000,
    rating: 5.0,
    sold: 760,
    badge: "Travel Ready",
    colors: ["#09090b", "#d97706"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBQMUhGzFHhftnbkoDII7kLEGNz3ht8fEIJADi5RWTdA&s=10",
    fullDesc: "Botol travel dengan filter penyaring stainless steel, cocok untuk menyeduh teh/kopi saat bepergian."
  },
  {
    id: 9,
    name: "NEXORA Urban Active Flask 650ml",
    category: "Sport Edition",
    price: 185000,
    originalPrice: 235000,
    rating: 4.8,
    sold: 840,
    badge: "Populer",
    colors: ["#2563eb", "#0f172a"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKPDZ_9qY-FqSx5V02XhG4TFWRTx1pMfr3-w-aYzQG1w&s=10",
    fullDesc: "Botol minum ergonomis dengan bahan ringan anti-slip, sangat cocok untuk mobilitas perkotaan dan olahraga harian."
  },
  {
    id: 10,
    name: "NEXORA Thermos Classic Steel 800ml",
    category: "Stainless Steel",
    price: 219000,
    originalPrice: 279000,
    rating: 4.9,
    sold: 920,
    badge: "Hot/Cold",
    colors: ["#64748b", "#1e293b"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrp85wLpGF2_dhjlzdRLNW67AZFgshTMPavYZq69-A-Q&s=10",
    fullDesc: "Teknologi double-wall vacuum insulasi super rapet, menjaga es batu tetap utuh hingga lebih dari 20 jam."
  },
  {
    id: 11,
    name: "NEXORA Smart Display Pro 500ml",
    category: "Tumbler Suhu",
    price: 209000,
    originalPrice: 269000,
    rating: 4.9,
    sold: 1300,
    badge: "Terlaris",
    colors: ["#09090b", "#3b82f6"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSPca7TpuaWB9cFjdyhCfCddA6hJIYR752xxMxN7_Ksw&s=10",
    fullDesc: "Layar digital indikator suhu yang tahan air IPX7, menggunakan baterai efisiensi tinggi tanpa perlu sering diisi daya."
  },
  {
    id: 12,
    name: "NEXORA Royal Rose Gold 500ml",
    category: "Kapasitas Besar",
    price: 299000,
    originalPrice: 380000,
    rating: 5.0,
    sold: 510,
    badge: "Praktis",
    colors: ["#fb7185", "#f43f5e"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfSOU-N8j3mKeqlbvYMgDAnoRq2AheJlfWCIYsd8RrrQ&s=10",
    fullDesc: "Tumbler ramping berbahan kuat yang mudah masuk ke kantong tas travel atau cup holder mobil."
  },
  {
    id: 13,
    name: "NEXORA Endurance Sport Bottle 900ml",
    category: "Sport Edition",
    price: 195000,
    originalPrice: 245000,
    rating: 4.8,
    sold: 1050,
    badge: "Tahan Banting",
    colors: ["#16a34a", "#1e293b"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnAk9lJ-XWbp2r1s8_RELqcDBWRwnt73JbxDq_leLnUg&s=10",
    fullDesc: "Material Tritan BPA Free yang kokoh dan tahan benturan. Dilengkapi pengunci cap ganda anti bocor."
  },
  {
    id: 14,
    name: "NEXORA Minimalist Powder Coat 600ml",
    category: "Stainless Steel",
    price: 199000,
    originalPrice: 250000,
    rating: 4.7,
    sold: 670,
    badge: "Anti Gores",
    colors: ["#475569", "#0f172a"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5J21pZ6dOfKU1XW4DspG2_o0myNreOLP-Tusd6gDUPQ&s",
    fullDesc: "Dilapisi powder coating khusus anti gores dan nyaman digenggam tanpa licin."
  },
  {
    id: 15,
    name: "NEXORA Smart Touch White 500ml",
    category: "Tumbler Suhu",
    price: 195000,
    originalPrice: 249000,
    rating: 4.8,
    sold: 880,
    badge: "Baru",
    colors: ["#ffffff", "#cbd5e1"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS63FmcO2P4A07_GjkPqdQPPDpMCjBZdkQGUhOLd1j7fw&s=10",
    fullDesc: "Tampilan serba putih bersih dengan indikator suhu digital yang tajam dan responsif saat disentuh."
  },
  {
    id: 16,
    name: "NEXORA Carbon Fiber Deluxe 500ml",
    category: "Kapasitas Besar",
    price: 310000,
    originalPrice: 399000,
    rating: 5.0,
    sold: 340,
    badge: "Ekstra Ringan",
    colors: ["#18181b", "#27272a"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUuWCoVRsBxuAAuUiE6agB3G7E6Kqvc7c9t3n6zdJ5lw&s=10",
    fullDesc: "Bahan super ringan anti-penyok cocok untuk aktivitas touring, hiking, dan perjalanan jauh."
  },
  {
    id: 17,
    name: "NEXORA Hydro Gym Bottle 1.5L",
    category: "Sport Edition",
    price: 229000,
    originalPrice: 289000,
    rating: 4.9,
    sold: 1400,
    badge: "Ultra Size",
    colors: ["#2563eb", "#15803d"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGusuHGQHgXwPfyEY3T6pc8oWpvNt6m5GDRHQ5Qtjp4w&s=10",
    fullDesc: "Kapasitas super besar 1.5 Liter khusus pencinta olahraga berat dan fitness tanpa khawatir kehabisan air."
  },
  {
    id: 18,
    name: "NEXORA Compact Travel Flask 350ml",
    category: "Stainless Steel",
    price: 139000,
    originalPrice: 179000,
    rating: 4.7,
    sold: 520,
    badge: "Mungil",
    colors: ["#94a3b8", "#f43f5e"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL3qHd974txEocDeq6qlILAV3cjcGvLhmTyRHhniZEVQ&s=10",
    fullDesc: "Ukuran ringkas dan muat di tas kecil maupun cup holder mobil. Praktis dibawa ke mana saja."
  },
  {
    id: 19,
    name: "NEXORA Smart Temp Neon Blue 500ml",
    category: "Tumbler Suhu",
    price: 205000,
    originalPrice: 259000,
    rating: 4.8,
    sold: 710,
    badge: "Pilihan Favorit",
    colors: ["#0284c7", "#0369a1"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCjQktnAIXS7-xDKbxmzI8m-HiXvD6py7-xq4eK1vMSQ&s=10",
    fullDesc: "Warna biru neon metallic modern dengan penunjuk temperatur yang akurat."
  },
  {
    id: 20,
    name: "NEXORA Signature Gold Matte 500ml",
    category: "Kapasitas Besar",
    price: 295000,
    originalPrice: 360000,
    rating: 5.0,
    sold: 620,
    badge: "Anti Baret",
    colors: ["#d97706", "#78350f"],
    image: "https://media.dinomarket.com/docs/imgTD/2026-09/_SMine_8A4CF303BC0ABFD6224D0F32063BFDC2_100926140935_xl.jpg",
    fullDesc: "Bahan SUS 316 dengan struktur ganda tahan karat dan goresan saat dibawa aktivitas luar ruangan."
  }
];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutItems, setCheckoutItems] = useState([]);

  const handleAddToCart = (newItem) => {
    setCartItems((prevItems) => {
      const addQty = Number(newItem.qty) || 1;

      const existingIndex = prevItems.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.selectedColor === newItem.selectedColor &&
          item.customText === newItem.customText
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        const currentQty = Number(updated[existingIndex].qty) || 0;
        updated[existingIndex] = {
          ...updated[existingIndex],
          qty: currentQty + addQty
        };
        return updated;
      } else {
        const uniqueCartId = `${newItem.id}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        return [
          ...prevItems,
          {
            ...newItem,
            qty: addQty,
            cartItemId: uniqueCartId
          }
        ];
      }
    });
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + (Number(curr.qty) || 0), 0);

  return (
    <Router>
      {/* Wrapper fleksibel agar footer menempel rapi di bawah halaman */}
      <div className="min-h-screen bg-[#0b1120] text-slate-100 flex flex-col justify-between">
        
        {/* Routing Utama */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* ROUTE HALAMAN PESANAN SAYA */}
            <Route path="/pesanan-saya" element={<PesananSaya />} />
            
            <Route 
              path="/catalog" 
              element={
                <Katalog 
                  products={PRODUCTS}
                  cartCount={totalCartCount}
                  onAddToCart={handleAddToCart}
                />
              } 
            />

            <Route 
              path="/product/:id" 
              element={
                <DetailProduk 
                  products={PRODUCTS}
                  onAddToCart={handleAddToCart}
                  setCheckoutItems={setCheckoutItems}
                  cartCount={totalCartCount}
                />
              } 
            />
            
            <Route 
              path="/cart" 
              element={
                <Keranjang 
                  cartItems={cartItems} 
                  setCartItems={setCartItems} 
                  setCheckoutItems={setCheckoutItems} 
                />
              } 
            />
            
            <Route 
              path="/pembayaran" 
              element={
                <Pembayaran 
                  checkoutItems={checkoutItems} 
                  setCartItems={setCartItems}
                />
              } 
            />
            
            <Route path="/admin" element={<DashboardAdmin />} />
          </Routes>
        </div>

        {/* Footer ini akan otomatis muncul di seluruh halaman */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;