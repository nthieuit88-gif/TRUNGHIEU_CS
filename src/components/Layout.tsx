import { Link, Outlet, useLocation } from 'react-router-dom';
import { ShoppingCart, LogIn } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useAdminStore } from '../store/useAdminStore';
import { FooterCompact } from './FooterCompact';

export function Layout() {
  const cartItemsCount = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));
  const { isAdminMode, toggleAdminMode } = useAdminStore();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Trang chủ' },
    { path: '/phan-mem', label: 'Mua bán phần mềm' },
    { path: '/thiet-ke-website', label: 'Thiết kế website' },
    { path: '/app-tools', label: 'App Tools Web' },
    { path: '/gio-hang', label: 'Giỏ hàng' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-purple-500/20">
              TC
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              TRUNGHIEU_<span className="text-purple-600">CS</span>
            </h1>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`transition-colors ${location.pathname === link.path ? 'text-purple-600 font-bold' : 'hover:text-purple-600'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-6">
            <Link to="/gio-hang" className="relative flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button className="px-6 py-2 bg-slate-900 text-white rounded-2xl font-semibold hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/30 transition-all">
              Đăng nhập
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-slate-50">
        <Outlet />
      </main>

      <FooterCompact />
    </div>
  );
}
