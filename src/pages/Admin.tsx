import { useState, useEffect } from 'react';
import { useProductStore, Product } from '../store/useProductStore';
import { useAdminStore } from '../store/useAdminStore';
import { Plus, Edit, Trash2, ShieldAlert } from 'lucide-react';
import { ProductModal } from '../components/ProductModal';
import { useNavigate } from 'react-router-dom';

export function Admin() {
  const { products, deleteProduct } = useProductStore();
  const { isAdminMode } = useAdminStore();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!isAdminMode) {
      // Optional: Redirect to home if not admin
      // navigate('/');
    }
  }, [isAdminMode, navigate]);

  if (!isAdminMode) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Truy Cập Bị Từ Chối</h2>
        <p className="text-slate-500 max-w-md">
          Bạn cần bật chế độ Quản trị viên (Admin Mode) ở dưới chân trang (Footer) và nhập mật khẩu để truy cập trang này.
        </p>
      </div>
    );
  }

  const handleOpenModal = (product?: Product) => {
    setEditingProduct(product || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      deleteProduct(id);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <section className="py-12 bg-slate-50 min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Quản Lý Sản Phẩm</h2>
          <button
            onClick={() => handleOpenModal()}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/30"
          >
            <Plus className="w-5 h-5" />
            Thêm Sản Phẩm
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 font-semibold text-slate-600">Icon</th>
                  <th className="p-4 font-semibold text-slate-600">Tên Sản Phẩm</th>
                  <th className="p-4 font-semibold text-slate-600">Danh Mục</th>
                  <th className="p-4 font-semibold text-slate-600">Giá</th>
                  <th className="p-4 font-semibold text-slate-600">Mô Tả</th>
                  <th className="p-4 font-semibold text-slate-600 text-right">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-2xl">{product.icon}</td>
                    <td className="p-4 font-medium text-slate-900">{product.name}</td>
                    <td className="p-4 text-slate-500 capitalize">
                      {product.category === 'software' ? 'Phần mềm' : product.category === 'web' ? 'Web Design' : 'App Tool'}
                    </td>
                    <td className="p-4 text-purple-600 font-medium">{formatPrice(product.price)}</td>
                    <td className="p-4 text-slate-500 max-w-xs truncate">{product.desc}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Sửa"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={editingProduct}
        />
      )}
    </section>
  );
}
