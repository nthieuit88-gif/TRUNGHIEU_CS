import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Save } from 'lucide-react';
import { useProductStore, Product } from '../store/useProductStore';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  defaultCategory?: 'software' | 'web' | 'tool';
}

export function ProductModal({ isOpen, onClose, product, defaultCategory = 'software' }: ProductModalProps) {
  const { addProduct, updateProduct } = useProductStore();
  const [formData, setFormData] = useState<Partial<Product>>({
    category: defaultCategory,
    name: '',
    price: 0,
    desc: '',
    icon: '',
    image: '',
    features: [],
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        category: defaultCategory,
        name: '',
        price: 0,
        desc: '',
        icon: '',
        image: '',
        features: [],
      });
    }
  }, [product, defaultCategory, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      updateProduct(product.id, formData);
    } else {
      addProduct({
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
      } as Product);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h3 className="text-2xl font-bold mb-6 text-slate-900">
          {product ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tên Sản Phẩm</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                placeholder="Nhập tên sản phẩm..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Danh Mục</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-white"
              >
                <option value="software">Phần mềm</option>
                <option value="web">Thiết kế Web</option>
                <option value="tool">App Tool</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Giá (VNĐ)</label>
              <input
                type="number"
                required
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Icon (Emoji)</label>
              <input
                type="text"
                required
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                placeholder="Ví dụ: 🚀, 💻, 🌐"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Ảnh Đại Diện</label>
            <div className="space-y-3">
              <input
                type="text"
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                placeholder="Dán link ảnh (URL)..."
              />
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-500">Hoặc tải ảnh từ máy:</span>
                <label className="cursor-pointer px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors">
                  Chọn ảnh
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData({ ...formData, image: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>
              {formData.image && (
                <div className="mt-2 relative w-full h-32 bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-contain" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: '' })}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    title="Xóa ảnh"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Mô Tả</label>
            <textarea
              required
              rows={3}
              value={formData.desc}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
              placeholder="Mô tả ngắn về sản phẩm..."
            />
          </div>

          {formData.category === 'web' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tính Năng (Mỗi dòng một tính năng)</label>
              <textarea
                rows={4}
                value={formData.features?.join('\n')}
                onChange={(e) => setFormData({ ...formData, features: e.target.value.split('\n') })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                placeholder="Giao diện chuẩn SEO&#10;Tương thích di động&#10;Bảo hành 1 năm"
              />
            </div>
          )}

          <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/30"
            >
              <Save className="w-5 h-5" />
              Lưu Thay Đổi
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
