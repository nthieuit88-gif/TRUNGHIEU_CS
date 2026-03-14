import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  category: 'software' | 'web' | 'tool';
  name: string;
  price: number;
  desc: string;
  icon: string;
  image?: string;
  features?: string[];
}

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductsByCategory: (category: 'software' | 'web' | 'tool') => Product[];
}

const INITIAL_PRODUCTS: Product[] = [
  // Software
  { id: 'sw1', category: 'software', name: 'Phần mềm Quản lý Bán hàng', price: 1500000, desc: 'Quản lý kho, doanh thu, khách hàng hiệu quả.', icon: '📊' },
  { id: 'sw2', category: 'software', name: 'Phần mềm Kế toán Pro', price: 2500000, desc: 'Giải pháp kế toán toàn diện cho doanh nghiệp.', icon: '💰' },
  { id: 'sw3', category: 'software', name: 'Công cụ SEO Master', price: 800000, desc: 'Tối ưu hóa website, phân tích từ khóa.', icon: '🚀' },
  { id: 'sw4', category: 'software', name: 'Phần mềm Quản lý Nhân sự', price: 1800000, desc: 'Chấm công, tính lương, quản lý hồ sơ.', icon: '👥' },
  { id: 'sw5', category: 'software', name: 'Phần mềm Quản lý Khách sạn', price: 3500000, desc: 'Quản lý đặt phòng, check-in/out, dịch vụ phòng.', icon: '🏨' },
  { id: 'sw6', category: 'software', name: 'Phần mềm Quản lý Phòng Gym', price: 2200000, desc: 'Quản lý hội viên, gói tập, điểm danh vân tay.', icon: '💪' },
  { id: 'sw7', category: 'software', name: 'Phần mềm Quản lý Gara Ô tô', price: 2800000, desc: 'Quản lý lịch hẹn, phụ tùng, công nợ khách hàng.', icon: '🚗' },
  { id: 'sw8', category: 'software', name: 'Phần mềm Cafe/Trà sữa POS', price: 1200000, desc: 'Order tại bàn, in hóa đơn, quản lý nguyên liệu.', icon: '☕' },
  
  // Web Design
  { id: 'web1', category: 'web', name: 'Gói Cơ Bản', price: 2990000, desc: 'Website giới thiệu công ty, landing page đơn giản.', icon: '🌐', features: ['Giao diện chuẩn SEO', 'Tương thích di động', 'Bảo hành 1 năm'] },
  { id: 'web2', category: 'web', name: 'Gói Bán Hàng', price: 5990000, desc: 'Website thương mại điện tử, tích hợp thanh toán.', icon: '🛒', features: ['Giỏ hàng nâng cao', 'Tích hợp VNPay/Momo', 'Quản lý đơn hàng'] },
  { id: 'web3', category: 'web', name: 'Gói Doanh Nghiệp', price: 12990000, desc: 'Hệ thống website phức tạp, thiết kế độc quyền.', icon: '🏢', features: ['Thiết kế UI/UX riêng', 'Tối ưu tốc độ cao', 'Hỗ trợ 24/7'] },
  { id: 'web4', category: 'web', name: 'Gói Web Tin Tức', price: 8500000, desc: 'Trang tin tức, tạp chí điện tử, blog cá nhân.', icon: '📰', features: ['CMS quản lý bài viết', 'Phân quyền tác giả', 'Tối ưu Google News'] },
  { id: 'web5', category: 'web', name: 'Gói Bất Động Sản', price: 15000000, desc: 'Sàn giao dịch BĐS, đăng tin, bản đồ quy hoạch.', icon: '🏠', features: ['Tìm kiếm nâng cao', 'Bản đồ tích hợp', 'Quản lý môi giới'] },
  { id: 'web6', category: 'web', name: 'Gói Web Giáo Dục', price: 18000000, desc: 'Hệ thống E-learning, bán khóa học online.', icon: '🎓', features: ['Học trực tuyến', 'Thi trắc nghiệm', 'Cấp chứng chỉ'] },
  { id: 'web7', category: 'web', name: 'Gói Web Du Lịch', price: 10500000, desc: 'Đặt tour, khách sạn, vé máy bay trực tuyến.', icon: '✈️', features: ['Booking engine', 'Thanh toán quốc tế', 'Đa ngôn ngữ'] },

  // Tools
  { id: 'tool1', category: 'tool', name: 'Tool Auto Post Facebook', price: 500000, desc: 'Tự động đăng bài lên nhiều group, fanpage.', icon: '📱' },
  { id: 'tool2', category: 'tool', name: 'Công cụ Lọc Data Khách Hàng', price: 750000, desc: 'Trích xuất email, số điện thoại từ website.', icon: '🔍' },
  { id: 'tool3', category: 'tool', name: 'Bot Telegram Quản Lý', price: 300000, desc: 'Bot tự động trả lời, quản lý nhóm Telegram.', icon: '🤖' },
  { id: 'tool4', category: 'tool', name: 'Tool Tăng Tương Tác', price: 450000, desc: 'Tăng like, share, comment tự động an toàn.', icon: '❤️' },
  { id: 'tool5', category: 'tool', name: 'Tool Seeding Comment', price: 600000, desc: 'Tự động bình luận điều hướng dư luận.', icon: '💬' },
  { id: 'tool6', category: 'tool', name: 'Tool Quét UID Facebook', price: 350000, desc: 'Lấy danh sách UID thành viên nhóm, tương tác.', icon: '🆔' },
  { id: 'tool7', category: 'tool', name: 'Tool Auto Kết Bạn Zalo', price: 550000, desc: 'Gửi lời mời kết bạn tự động theo danh sách SĐT.', icon: '📞' },
  { id: 'tool8', category: 'tool', name: 'Tool Spam Tin Nhắn Fanpage', price: 900000, desc: 'Gửi tin nhắn hàng loạt cho khách hàng cũ.', icon: '📩' },
];

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: INITIAL_PRODUCTS,
      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      updateProduct: (id, updatedProduct) => set((state) => ({
        products: state.products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)),
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      })),
      getProductsByCategory: (category) => get().products.filter((p) => p.category === category),
    }),
    {
      name: 'product-storage',
    }
  )
);
