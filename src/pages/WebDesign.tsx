import { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import { useProductStore, Product } from '../store/useProductStore';
import { useAdminStore } from '../store/useAdminStore';
import { ShoppingCart, Edit } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProductModal } from '../components/ProductModal';

export function WebDesign() {
  const addItem = useCartStore(state => state.addItem);
  const products = useProductStore(state => state.products).filter(p => p.category === 'web');
  const { isAdminMode } = useAdminStore();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <section className="py-16 bg-slate-50 min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-slate-900">Thiết Kế Website Chuyên Nghiệp</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((pkg, index) => (
            <motion.div 
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-3xl p-8 border ${index === 1 ? 'border-purple-500 shadow-xl shadow-purple-500/20 relative' : 'border-slate-200'} hover:border-purple-400 hover:shadow-lg transition-all flex flex-col group relative`}
            >
              {isAdminMode && (
                <button
                  onClick={() => setEditingProduct(pkg)}
                  className="absolute top-4 right-4 p-2 bg-white text-blue-600 rounded-full shadow-md hover:bg-blue-50 transition-colors z-20 opacity-0 group-hover:opacity-100"
                  title="Chỉnh sửa"
                >
                  <Edit className="w-4 h-4" />
                </button>
              )}
              {index === 1 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                  Phổ biến nhất
                </div>
              )}
              <div className="h-48 mb-6 rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center">
                {pkg.image ? (
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-6xl">{pkg.icon}</div>
                )}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-center text-slate-900">{pkg.name}</h3>
              <p className="text-slate-500 mb-6 text-center h-12">{pkg.desc}</p>
              
              {pkg.features && (
                <ul className="space-y-3 mb-8 flex-grow">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-600">
                      <span className="text-green-500">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto">
                <p className="text-3xl font-bold text-purple-600 mb-6 text-center">{formatPrice(pkg.price)}</p>
                <button 
                  onClick={() => addItem({ id: pkg.id, name: `Thiết kế web: ${pkg.name}`, price: pkg.price, quantity: 1 })}
                  className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${index === 1 ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/30' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Đăng ký ngay
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {editingProduct && (
        <ProductModal
          isOpen={!!editingProduct}
          onClose={() => setEditingProduct(null)}
          product={editingProduct}
          defaultCategory="web"
        />
      )}
    </section>
  );
}
