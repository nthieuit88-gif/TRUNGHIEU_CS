import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAdminStore } from '../store/useAdminStore';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';

export function Footer3D() {
  const { isAdminMode, toggleAdminMode } = useAdminStore();
  
  // Text to display on the rolling banner
  const bannerText = "MỘT SẢN PHẨM NGUYỄN TRUNG HIẾU _ CS 0916499.916";
  const repeatedText = Array(4).fill(bannerText).join(" • ");

  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden pt-20 pb-10">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-500/10 via-transparent to-transparent blur-3xl"></div>
      </div>

      {/* 3D Rolling Banner */}
      <div className="relative w-full h-32 flex items-center justify-center [perspective:1000px] mb-12 overflow-hidden">
        <div className="relative w-full max-w-4xl h-16 [transform-style:preserve-3d]">
          <motion.div
            animate={{ rotateX: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-full h-full absolute inset-0 [transform-style:preserve-3d]"
          >
            {/* Front Face */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-600/90 to-purple-600/90 border border-white/10 backdrop-blur-sm [transform:translateZ(32px)]">
              <span className="text-lg font-bold tracking-wider whitespace-nowrap text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                {bannerText}
              </span>
            </div>
            
            {/* Top Face */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-purple-600/90 to-pink-600/90 border border-white/10 backdrop-blur-sm [transform:rotateX(90deg)_translateZ(32px)]">
              <span className="text-lg font-bold tracking-wider whitespace-nowrap text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                {bannerText}
              </span>
            </div>

            {/* Back Face */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-pink-600/90 to-red-600/90 border border-white/10 backdrop-blur-sm [transform:rotateX(180deg)_translateZ(32px)]">
              <span className="text-lg font-bold tracking-wider whitespace-nowrap text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                {bannerText}
              </span>
            </div>

            {/* Bottom Face */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-red-600/90 to-blue-600/90 border border-white/10 backdrop-blur-sm [transform:rotateX(270deg)_translateZ(32px)]">
              <span className="text-lg font-bold tracking-wider whitespace-nowrap text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                {bannerText}
              </span>
            </div>
          </motion.div>
        </div>
        
        {/* Reflection/Glow */}
        <div className="absolute bottom-0 w-full h-10 bg-purple-500/20 blur-xl rounded-[100%]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>

      {/* Content & Controls */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            TRUNGHIEU_CS
          </h3>
          <p className="text-slate-400 text-sm">© 2026 All Rights Reserved</p>
        </div>

        <div className="flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-xl hover:bg-white/10 transition-all">
          <Link 
            to="/admin" 
            className="text-xs font-medium text-slate-300 hover:text-white hover:scale-105 transition-all flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Admin Panel
          </Link>
          <div className="w-px h-4 bg-white/10"></div>
          <button 
            onClick={toggleAdminMode}
            className={`text-xs font-medium transition-all flex items-center gap-2 hover:scale-105 ${isAdminMode ? 'text-green-400' : 'text-slate-300 hover:text-white'}`}
          >
            <span className={`w-2 h-2 rounded-full ${isAdminMode ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`}></span>
            {isAdminMode ? 'Admin Mode: ON' : 'Enable Admin Mode'}
          </button>
        </div>
      </div>
    </footer>
  );
}
