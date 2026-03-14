import { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import { useProductStore, Product } from '../store/useProductStore';
import { useAdminStore } from '../store/useAdminStore';
import { ShoppingCart, Edit } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProductModal } from '../components/ProductModal';

export function Software() {
  const addItem = useCartStore(state => state.addItem);
  const products = useProductStore(state => state.products).filter(p => p.category === 'software');
  const { isAdminMode } = useAdminStore();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <section className="py-16 bg-slate-50 min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-slate-900">Mua Bán Công Nghệ Phần Mềm</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10 transition-all flex flex-col h-full relative group"
            >
              {isAdminMode && (
                <button
                  onClick={() => setEditingProduct(product)}
                  className="absolute top-4 right-4 p-2 bg-white text-blue-600 rounded-full shadow-md hover:bg-blue-50 transition-colors z-10 opacity-0 group-hover:opacity-100"
                  title="Chỉnh sửa"
                >
                  <Edit className="w-4 h-4" />
                </button>
              )}
              <div className="h-48 mb-4 rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-6xl">{product.icon}</div>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">{product.name}</h3>
              <p className="text-slate-500 mb-6 flex-grow">{product.desc}</p>
              <div className="mt-auto">
                <p className="text-2xl font-bold text-purple-600 mb-4">{formatPrice(product.price)}</p>
                <button 
                  onClick={() => addItem({ id: product.id, name: product.name, price: product.price, quantity: 1 })}
                  className="w-full py-3 bg-slate-100 hover:bg-purple-600 hover:text-white text-slate-900 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Thêm vào giỏ
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
          defaultCategory="software"
        />
      )}
    </section>
  );
}
