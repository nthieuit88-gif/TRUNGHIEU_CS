import { useCartStore } from '../store/useCartStore';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Cart() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const total = getTotal();
  const discount = total > 5000000 ? 50000 : 0; // Simple discount logic
  const finalTotal = Math.max(0, total - discount);

  if (items.length === 0) {
    return (
      <section className="py-20 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center px-6 bg-slate-50">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-3xl font-bold mb-4 text-slate-900">Giỏ hàng của bạn đang trống</h2>
        <p className="text-slate-500 mb-8 max-w-md">Hãy khám phá các sản phẩm và dịch vụ công nghệ tuyệt vời của chúng tôi để thêm vào giỏ hàng nhé.</p>
        <Link to="/phan-mem" className="px-8 py-4 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/30">
          Tiếp tục mua sắm
        </Link>
      </section>
    );
  }

  return (
    <section className="py-12 max-w-5xl mx-auto px-6 min-h-[calc(100vh-80px)] bg-slate-50">
      <h2 className="text-4xl font-bold mb-8 text-slate-900">Giỏ Hàng Của Bạn</h2>
      
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-6"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl">
                {item.name.includes('Phần mềm') ? '💻' : item.name.includes('Thiết kế') ? '🌐' : '🛠️'}
              </div>
              
              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-xl font-bold mb-1 text-slate-900">{item.name}</h3>
                <p className="text-purple-600 font-medium">{formatPrice(item.price)}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center bg-slate-100 rounded-full p-1">
                  <button 
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-slate-500 hover:text-slate-900 transition-all"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium text-slate-900">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-slate-500 hover:text-slate-900 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <button 
                  onClick={() => removeItem(item.id)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                  title="Xóa sản phẩm"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg shadow-slate-200/50 sticky top-24">
            <h3 className="text-2xl font-bold mb-6 text-slate-900">Tổng đơn hàng</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Tạm tính:</span>
                <span className="font-medium text-slate-900">{formatPrice(total)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Giảm giá:</span>
                  <span className="font-medium">-{formatPrice(discount)}</span>
                </div>
              )}
            </div>
            
            <div className="h-px bg-slate-100 my-6"></div>
            
            <div className="flex justify-between text-2xl font-bold mb-8 text-slate-900">
              <span>Tổng cộng:</span>
              <span className="text-purple-600">{formatPrice(finalTotal)}</span>
            </div>
            
            <button 
              onClick={() => {
                alert('Cảm ơn bạn đã đặt hàng! Chúng tôi sẽ liên hệ sớm nhất.');
                clearCart();
              }}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              Thanh Toán Ngay
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
