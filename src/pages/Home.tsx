import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Code, Cpu, Globe, ShieldCheck, Zap, BarChart } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';

export function Home() {
  const { products } = useProductStore();
  const softwareProducts = products.filter(p => p.category === 'software').slice(0, 3);
  const webProducts = products.filter(p => p.category === 'web').slice(0, 3);
  const toolProducts = products.filter(p => p.category === 'tool').slice(0, 3);

  const formatPrice = (price: number | undefined) => {
    if (typeof price !== 'number') return 'Liên hệ';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const renderProductBanner = (title: string, products: any[], link: string) => (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
        <Link to={link} className="text-purple-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">
          Xem tất cả <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {products && products.length > 0 ? products.map(product => (
          <div key={product.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col">
            <div className="w-full h-48 mb-4 rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
              {product.image ? (
                <img src={product.image} alt={product.name || 'Product'} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="text-6xl">{product.icon || '📦'}</div>
              )}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name || 'Sản phẩm'}</h3>
            <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-grow">{product.desc || ''}</p>
            <div className="text-purple-600 font-bold text-lg mt-auto">{formatPrice(product.price)}</div>
          </div>
        )) : (
          <p className="text-slate-500">Chưa có sản phẩm nào.</p>
        )}
      </div>
    </section>
  );

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-slate-600">Sẵn sàng phục vụ 24/7</span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Giải Pháp <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Công Nghệ Số
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Nâng tầm doanh nghiệp của bạn với các giải pháp phần mềm, thiết kế website và công cụ tự động hóa hàng đầu từ TRUNGHIEU_CS.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link 
                to="/phan-mem" 
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/20"
              >
                Khám Phá Ngay <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/thiet-ke-website" 
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
              >
                Tư Vấn Miễn Phí
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-sm font-medium">Bảo mật tuyệt đối</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-medium">Tốc độ cao</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[500px] w-full hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-[3rem] backdrop-blur-3xl border border-white/50"></div>
            <div className="absolute inset-4 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-purple-500/20 bg-white/50 group">
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop" 
                alt="Technology Abstract" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            
            {/* Floating Cards */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-12 top-1/4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <Code className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Code Quality</p>
                <p className="text-sm font-bold text-slate-900">Clean & Fast</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-8 bottom-1/3 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                <BarChart className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Growth</p>
                <p className="text-sm font-bold text-slate-900">+150% Traffic</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="bg-slate-900 py-8 overflow-hidden rotate-1 scale-105 border-y-4 border-purple-500">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-16 text-white/20 font-black text-6xl uppercase tracking-tighter"
        >
          {Array(10).fill("TRUNGHIEU_CS").map((text, i) => (
            <span key={i} className="hover:text-white transition-colors duration-300 cursor-default">{text}</span>
          ))}
        </motion.div>
      </div>

      {/* Product Banners */}
      {renderProductBanner("Mua bán phần mềm", softwareProducts, "/phan-mem")}
      {renderProductBanner("Thiết kế Web", webProducts, "/thiet-ke-website")}
      {renderProductBanner("App tool", toolProducts, "/app-tools")}

      {/* Bento Grid Services */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-16 text-center"
        >
          <motion.span variants={itemVariants} className="text-purple-600 font-bold tracking-wider uppercase text-sm mb-2 block">SẢN PHẨM & DỊCH VỤ CHUYÊN NGHIỆP</motion.span>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Hệ Sinh Thái Số Đẳng Cấp</motion.h2>
          <motion.p variants={itemVariants} className="text-slate-500 max-w-3xl mx-auto text-lg leading-relaxed">
            TRUNGHIEU_CS tự hào mang đến những giải pháp công nghệ tinh hoa nhất: 
            <span className="text-slate-900 font-medium"> Phần mềm quản lý vận hành</span>, 
            <span className="text-slate-900 font-medium"> Website thương hiệu chuẩn SEO</span> và 
            <span className="text-slate-900 font-medium"> Tool Marketing tự động hóa</span>. 
            Được phát triển bởi đội ngũ chuyên gia hàng đầu, cam kết chất lượng vượt trội và hiệu quả tức thì cho doanh nghiệp của bạn.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* Card 1: Software (Large - Spans 2 cols) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-[2rem] p-8 text-white relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-all duration-500"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-2">Kho Phần Mềm & Bản Quyền Số 1</h3>
                <p className="text-blue-100 max-w-lg text-lg">
                  Hệ thống phần mềm quản lý bán hàng, kế toán, nhân sự chuyên sâu. Cung cấp License chính hãng Windows, Office, Adobe bảo hành trọn đời.
                </p>
              </div>
              <Link to="/phan-mem" className="self-start px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center gap-2 mt-6">
                Xem Danh Sách <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Web Design (Tall - Spans 1 col, 2 rows) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:row-span-2 bg-white rounded-[2rem] p-8 border border-slate-200 hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/10 transition-all group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-50/50"></div>
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-slate-900 leading-tight">Thiết Kế Website Chuẩn SEO</h3>
              <p className="text-slate-500 mb-8 text-base">
                Kiến tạo website thương hiệu độc quyền, tối ưu UI/UX, tốc độ tải trang siêu tốc. Tích hợp thanh toán, quản lý đơn hàng thông minh giúp bùng nổ doanh số.
              </p>
              
              <div className="flex-1 bg-slate-100 rounded-2xl mb-8 overflow-hidden relative border border-slate-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 bg-white rounded-xl shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-500 border border-slate-100"></div>
                  <div className="absolute w-3/4 h-3/4 bg-purple-100 rounded-xl shadow-lg transform -rotate-6 -z-10 group-hover:rotate-0 transition-transform duration-500"></div>
                </div>
              </div>

              <Link to="/thiet-ke-website" className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                Báo Giá Ngay <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card 3: App Tools (Medium) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-[2rem] p-8 border border-slate-200 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                <Zap className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full uppercase tracking-wide">Best Seller</span>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-slate-900">Bộ Công Cụ Marketing Automation</h3>
            <p className="text-slate-500 mb-6">Tự động hóa quy trình kinh doanh, tăng trưởng doanh số đột phá với các Tool Facebook, Zalo độc quyền.</p>
            <Link to="/app-tools" className="text-emerald-600 font-bold hover:gap-2 transition-all flex items-center gap-1">
              Khám phá ngay <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Card 4: Stats/Trust (Medium) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="relative z-10 flex flex-col justify-center h-full text-center">
              <h3 className="text-5xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">100%</h3>
              <p className="text-slate-400 font-medium mb-6 text-lg">Khách Hàng Hài Lòng</p>
              <div className="flex justify-center -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-xs font-bold">
                    <span className="text-[10px]">User</span>
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-purple-600 flex items-center justify-center text-xs font-bold">
                  5k+
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Featured Products Banner */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold mb-6 shadow-lg shadow-orange-500/20">
                  🔥 HOT DEAL THÁNG NÀY
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Combo Khởi Nghiệp <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    All-in-One
                  </span>
                </h2>
                <p className="text-slate-300 text-lg mb-8 max-w-md">
                  Sở hữu ngay trọn bộ Website bán hàng chuyên nghiệp + Phần mềm quản lý kho + Tool Marketing tự động.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/thiet-ke-website"
                    className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                  >
                    Xem Chi Tiết <ArrowRight className="w-5 h-5" />
                  </Link>
                  <div className="flex items-center gap-4 px-6 py-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <div className="text-right">
                      <p className="text-xs text-slate-400 line-through">15.000.000đ</p>
                      <p className="text-xl font-bold text-green-400">9.990.000đ</p>
                    </div>
                    <div className="w-px h-8 bg-white/10"></div>
                    <p className="text-sm text-slate-300 font-medium">Tiết kiệm 35%</p>
                  </div>
                </div>
              </div>

              {/* Product Showcase Visual */}
              <div className="relative h-[400px] w-full">
                {/* Card 1: Website */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="absolute top-0 right-0 w-3/4 aspect-video bg-white rounded-xl shadow-2xl shadow-black/50 overflow-hidden border border-slate-700 z-10 transform rotate-3 hover:rotate-0 transition-transform duration-500"
                >
                  <div className="h-6 bg-slate-100 border-b border-slate-200 flex items-center px-3 gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className="p-4 bg-slate-50 h-full flex items-center justify-center">
                    <Globe className="w-16 h-16 text-blue-500 opacity-50" />
                  </div>
                </motion.div>

                {/* Card 2: Software */}
                <motion.div 
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 20, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute top-20 left-0 w-2/3 aspect-video bg-slate-800 rounded-xl shadow-2xl shadow-black/50 overflow-hidden border border-slate-600 z-20 transform -rotate-6 hover:rotate-0 transition-transform duration-500"
                >
                  <div className="p-4 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                        <BarChart className="w-5 h-5 text-white" />
                      </div>
                      <div className="h-2 w-20 bg-slate-600 rounded-full"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-slate-700 rounded-full"></div>
                      <div className="h-2 w-3/4 bg-slate-700 rounded-full"></div>
                      <div className="h-2 w-1/2 bg-slate-700 rounded-full"></div>
                    </div>
                  </div>
                </motion.div>

                {/* Card 3: Mobile App */}
                <motion.div 
                  initial={{ y: 60, opacity: 0 }}
                  whileInView={{ y: 40, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-0 right-12 w-48 h-80 bg-black rounded-[2rem] border-4 border-slate-700 shadow-2xl shadow-black/50 z-30 transform rotate-12 hover:rotate-0 transition-transform duration-500"
                >
                  <div className="h-full w-full bg-slate-900 rounded-[1.7rem] overflow-hidden relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-xl"></div>
                    <div className="p-4 mt-8 flex flex-col items-center justify-center h-full text-slate-700">
                      <Zap className="w-12 h-12 mb-2" />
                      <span className="text-xs font-bold">App Tools</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
