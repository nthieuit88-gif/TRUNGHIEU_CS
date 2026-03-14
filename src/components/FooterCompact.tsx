import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminStore } from '../store/useAdminStore';
import { motion } from 'framer-motion';
import { Settings, Shield } from 'lucide-react';
import { AdminLoginModal } from './AdminLoginModal';

export function FooterCompact() {
  const { isAdminMode, toggleAdminMode } = useAdminStore();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const text = "MỘT SẢN PHẨM NGUYỄN TRUNG HIẾU _ CS 0916499.916";

  const handleToggleAdmin = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (isAdminMode) {
      // Đang bật -> Tắt
      if (window.confirm("Bạn có chắc chắn muốn tắt chế độ Admin?")) {
        toggleAdminMode();
      }
      return;
    }
    
    // Đang tắt -> Bật: Mở modal đăng nhập
    setIsLoginModalOpen(true);
  };

  const handleLoginSuccess = () => {
    toggleAdminMode();
    // alert("Đã bật chế độ Admin thành công!"); // Có thể bỏ alert nếu muốn trải nghiệm mượt hơn
  };

  return (
    <>
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          
          {/* Left: Copyright */}
          <div className="flex items-center gap-2 shrink-0">
              <span className="font-bold text-slate-200">TRUNGHIEU_CS</span>
              <span>© 2026</span>
          </div>

          {/* Center: Scrolling Text (Subtle) */}
          <div className="flex-1 overflow-hidden max-w-lg mx-4 select-none hidden sm:block">
              <motion.div 
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="flex gap-8 whitespace-nowrap"
              >
                  {[...Array(4)].map((_, i) => (
                      <span key={i} className="font-bold text-white">{text}</span>
                  ))}
              </motion.div>
          </div>

          {/* Right: Admin Controls */}
          <div className="flex items-center gap-4 shrink-0">
              <Link to="/admin" className="hover:text-white transition-colors flex items-center gap-1">
                  <Settings className="w-3 h-3" /> Panel
              </Link>
              <div className="w-px h-3 bg-slate-700"></div>
              <button 
                  onClick={handleToggleAdmin}
                  className={`flex items-center gap-1 transition-colors ${isAdminMode ? 'text-green-400 font-bold' : 'hover:text-white'}`}
              >
                  <Shield className="w-3 h-3" />
                  {isAdminMode ? 'Mode: ON' : 'Mode: OFF'}
              </button>
          </div>
        </div>
      </footer>

      <AdminLoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLogin={handleLoginSuccess} 
      />
    </>
  );
}
