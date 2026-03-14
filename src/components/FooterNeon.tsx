import { Link } from 'react-router-dom';
import { useAdminStore } from '../store/useAdminStore';
import { motion } from 'framer-motion';
import { Shield, ShieldAlert, Cpu } from 'lucide-react';

export function FooterNeon() {
  const { isAdminMode, toggleAdminMode } = useAdminStore();
  const text = "MỘT SẢN PHẨM NGUYỄN TRUNG HIẾU _ CS 0916499.916";

  return (
    <footer className="bg-black text-white pt-24 pb-8 overflow-hidden relative border-t border-slate-800">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      {/* Glowing Top Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_20px_2px_rgba(6,182,212,0.6)]"></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center gap-10 mb-20">
        
        {/* Admin Controls - Cyberpunk Style */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-black ring-1 ring-slate-800 rounded-xl px-8 py-4 flex items-center gap-8">
            <Link 
              to="/admin" 
              className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-cyan-400 transition-colors uppercase tracking-wider"
            >
              <Shield className="w-4 h-4" />
              Admin Panel
            </Link>
            
            <div className="w-px h-6 bg-slate-800"></div>
            
            <button 
              onClick={toggleAdminMode}
              className={`flex items-center gap-2 text-sm font-bold transition-colors uppercase tracking-wider ${isAdminMode ? 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'text-slate-300 hover:text-pink-400'}`}
            >
              {isAdminMode ? <ShieldAlert className="w-4 h-4 animate-pulse" /> : <Cpu className="w-4 h-4" />}
              {isAdminMode ? 'Admin Mode: ACTIVE' : 'Enable Admin Mode'}
            </button>
          </div>
        </div>
      </div>

      {/* Angled Marquee Banner */}
      <div className="relative w-[110%] -left-[5%] rotate-[-2deg] bg-slate-900 border-y border-slate-800 py-6 shadow-2xl overflow-hidden group">
        {/* Background Glow inside banner */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-pink-900/20"></div>
        
        {/* Scanline effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_2px,#000_3px)] bg-[size:100%_4px] opacity-20 pointer-events-none"></div>

        <div className="flex whitespace-nowrap">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex gap-16 items-center"
          >
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-slate-600 opacity-30 group-hover:opacity-100 group-hover:from-cyan-400 group-hover:via-purple-400 group-hover:to-pink-400 transition-all duration-500">
                  {text}
                </span>
                <span className="text-2xl text-slate-700">★</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
      <div className="text-center mt-12 text-slate-600 text-xs relative z-10 font-mono">
        SYSTEM_STATUS: ONLINE • © 2026 TECHMARKET_VN • SECURE_CONNECTION
      </div>
    </footer>
  );
}
