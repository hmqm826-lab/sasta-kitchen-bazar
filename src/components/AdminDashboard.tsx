import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, Order } from '../types';
import {
  X,
  Plus,
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
  Edit,
  Trash2,
  CheckCircle,
  Truck,
  Clock,
  PhoneCall,
  Search,
  Filter,
  DollarSign,
  AlertCircle,
  RefreshCcw,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    products,
    categories,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    resetDefaultData,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'stats' | 'orders' | 'products' | 'customers'>('orders');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [productSearch, setProductSearch] = useState('');

  // Add / Edit Product Modal state
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productFormData, setProductFormData] = useState({
    name: '',
    urduName: '',
    category: 'Kitchen Gadgets',
    originalPrice: 1999,
    price: 1299,
    discountPercentage: 35,
    rating: 4.8,
    reviewCount: 15,
    image: '',
    description: '',
    highlights: 'Easy to clean\nHigh durability\nBPA Free food grade',
    stockCount: 50,
    inStock: true,
    isBestSeller: false,
    isHotDeal: false,
    isNewArrival: true,
  });

  if (!isAdminOpen) return null;

  // Statistics
  const totalRevenue = orders.reduce((sum, o) => (o.status !== 'Cancelled' ? sum + o.total : sum), 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const deliveredOrdersCount = orders.filter((o) => o.status === 'Delivered').length;
  const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      const matchId = o.id.toLowerCase().includes(q);
      const matchName = o.customerName.toLowerCase().includes(q);
      const matchPhone = o.customerPhone.includes(q);
      const matchCity = o.city.toLowerCase().includes(q);
      if (!matchId && !matchName && !matchPhone && !matchCity) return false;
    }
    return true;
  });

  // Filtered products
  const filteredProducts = products.filter((p) => {
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenAddProduct = () => {
    setIsEditingProduct(true);
    setEditingProductId(null);
    setProductFormData({
      name: '',
      urduName: '',
      category: 'Kitchen Gadgets',
      originalPrice: 1999,
      price: 1299,
      discountPercentage: 35,
      rating: 4.8,
      reviewCount: 20,
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=700&q=80',
      description: 'Durable household kitchen essential engineered for convenience and efficiency.',
      highlights: 'Heavy duty construction\nDishwasher safe\n100% genuine quality',
      stockCount: 40,
      inStock: true,
      isBestSeller: false,
      isHotDeal: true,
      isNewArrival: true,
    });
  };

  const handleOpenEditProduct = (prod: Product) => {
    setIsEditingProduct(true);
    setEditingProductId(prod.id);
    setProductFormData({
      name: prod.name,
      urduName: prod.urduName || '',
      category: prod.category,
      originalPrice: prod.originalPrice,
      price: prod.price,
      discountPercentage: prod.discountPercentage,
      rating: prod.rating,
      reviewCount: prod.reviewCount,
      image: prod.image,
      description: prod.description,
      highlights: (prod.highlights || []).join('\n'),
      stockCount: prod.stockCount,
      inStock: prod.inStock,
      isBestSeller: !!prod.isBestSeller,
      isHotDeal: !!prod.isHotDeal,
      isNewArrival: !!prod.isNewArrival,
    });
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productFormData.name.trim() || !productFormData.image.trim()) {
      showToast('Validation Error', 'Product name and image are required.', 'error');
      return;
    }

    const highlightsArray = productFormData.highlights
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const calcDiscount =
      productFormData.originalPrice > productFormData.price
        ? Math.round(
            ((productFormData.originalPrice - productFormData.price) /
              productFormData.originalPrice) *
              100
          )
        : 0;

    if (editingProductId) {
      const existing = products.find((p) => p.id === editingProductId);
      if (existing) {
        updateProduct({
          ...existing,
          name: productFormData.name,
          urduName: productFormData.urduName || undefined,
          category: productFormData.category,
          originalPrice: Number(productFormData.originalPrice),
          price: Number(productFormData.price),
          discountPercentage: calcDiscount || productFormData.discountPercentage,
          rating: productFormData.rating,
          reviewCount: productFormData.reviewCount,
          image: productFormData.image,
          description: productFormData.description,
          highlights: highlightsArray,
          stockCount: Number(productFormData.stockCount),
          inStock: Number(productFormData.stockCount) > 0,
          isBestSeller: productFormData.isBestSeller,
          isHotDeal: productFormData.isHotDeal,
          isNewArrival: productFormData.isNewArrival,
        });
      }
    } else {
      addProduct({
        name: productFormData.name,
        urduName: productFormData.urduName || undefined,
        category: productFormData.category,
        originalPrice: Number(productFormData.originalPrice),
        price: Number(productFormData.price),
        discountPercentage: calcDiscount,
        rating: 4.8,
        reviewCount: 1,
        image: productFormData.image,
        gallery: [productFormData.image],
        description: productFormData.description,
        highlights: highlightsArray,
        stockCount: Number(productFormData.stockCount),
        inStock: Number(productFormData.stockCount) > 0,
        isBestSeller: productFormData.isBestSeller,
        isHotDeal: productFormData.isHotDeal,
        isNewArrival: productFormData.isNewArrival,
        tags: [productFormData.category.toLowerCase(), 'new'],
      });
    }

    setIsEditingProduct(false);
  };

  const openCustomerWhatsApp = (phone: string, orderId: string, name: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const intlPhone = cleanPhone.startsWith('0') ? '92' + cleanPhone.slice(1) : cleanPhone;
    const msg = encodeURIComponent(
      `Assalam-o-Alaikum ${name}! Sasta Kitchen Bazar se call/message kar rahay hain aapke order #${orderId} ke hawalay se. Kya aap available hain?`
    );
    window.open(`https://wa.me/${intlPhone}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div
        className="relative bg-white rounded-3xl max-w-6xl w-full shadow-2xl border border-stone-200 overflow-hidden my-4 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Admin Header */}
        <div className="p-4 sm:p-6 bg-[#173D30] text-white flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5A623] text-[#173D30] flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black font-heading">
                  Sasta Kitchen Bazar Store Manager
                </h2>
                <span className="bg-emerald-700 text-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Admin Portal
                </span>
              </div>
              <p className="text-xs text-stone-200">
                Live inventory, customer orders & sales performance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetDefaultData}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-800/80 hover:bg-emerald-800 text-xs font-semibold text-emerald-200 transition"
              title="Reset products and sample orders"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
              aria-label="Close admin dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="bg-stone-50 border-b border-stone-200 px-4 sm:px-6 flex items-center justify-between text-xs font-bold overflow-x-auto">
          <div className="flex gap-2 py-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
                activeTab === 'orders'
                  ? 'bg-[#173D30] text-white shadow-xs'
                  : 'text-stone-700 hover:bg-stone-200'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Customer Orders ({orders.length})</span>
              {pendingOrdersCount > 0 && (
                <span className="bg-amber-400 text-[#173D30] font-black text-[10px] px-1.5 py-0.2 rounded-full">
                  {pendingOrdersCount} new
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
                activeTab === 'products'
                  ? 'bg-[#173D30] text-white shadow-xs'
                  : 'text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products Catalog ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
                activeTab === 'stats'
                  ? 'bg-[#173D30] text-white shadow-xs'
                  : 'text-stone-700 hover:bg-stone-200'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Sales Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
                activeTab === 'customers'
                  ? 'bg-[#173D30] text-white shadow-xs'
                  : 'text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Customer Directory</span>
            </button>
          </div>

          {activeTab === 'products' && (
            <button
              onClick={handleOpenAddProduct}
              className="px-3.5 py-1.5 bg-[#F5A623] hover:bg-[#e09315] text-[#173D30] font-black rounded-xl transition flex items-center gap-1 text-xs shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          )}
        </div>

        {/* Tab 1: Orders Management */}
        {activeTab === 'orders' && (
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
            {/* Filter and search bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="relative flex-1 max-w-sm">
                <input
                  type="text"
                  placeholder="Search by order ID, name, phone, city..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-1 focus:ring-[#173D30]"
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-stone-500" />
                <span className="text-xs font-bold text-stone-500">Status:</span>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-xl font-semibold text-stone-800"
                >
                  <option value="all">All Statuses ({orders.length})</option>
                  <option value="Pending">Pending Verification</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Shipped">Dispatched / Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-100 text-stone-700 uppercase font-bold text-[11px] border-b border-stone-200">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer & Phone</th>
                      <th className="p-3">City & Address</th>
                      <th className="p-3">Ordered Items</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Update Status</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-stone-50/80 transition">
                          <td className="p-3 font-mono font-bold text-[#173D30]">
                            {order.id}
                            <span className="block text-[10px] text-stone-400 font-normal">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="p-3">
                            <p className="font-bold text-stone-900">{order.customerName}</p>
                            <p className="text-[11px] text-emerald-800 font-semibold">{order.customerPhone}</p>
                            {order.customerEmail && (
                              <p className="text-[10px] text-stone-400">{order.customerEmail}</p>
                            )}
                          </td>
                          <td className="p-3 max-w-[200px]">
                            <p className="font-bold text-stone-800">{order.city}</p>
                            <p className="text-[11px] text-stone-500 line-clamp-2" title={order.address}>
                              {order.address}
                            </p>
                            {order.notes && (
                              <p className="text-[10px] text-amber-700 italic mt-0.5">"{order.notes}"</p>
                            )}
                          </td>
                          <td className="p-3">
                            <ul className="space-y-1">
                              {order.items.map((item, i) => (
                                <li key={i} className="text-[11px] flex items-center gap-1.5">
                                  <span className="w-4 h-4 rounded bg-stone-200 font-bold flex items-center justify-center text-[10px]">
                                    {item.quantity}
                                  </span>
                                  <span className="line-clamp-1 max-w-[150px]">{item.product.name}</span>
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="p-3">
                            <p className="font-black text-[#173D30] text-sm">
                              Rs. {order.total.toLocaleString()}
                            </p>
                            <span className="text-[10px] uppercase font-bold text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                              {order.paymentMethod}
                            </span>
                          </td>
                          <td className="p-3">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                order.status === 'Delivered'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : order.status === 'Shipped'
                                  ? 'bg-blue-100 text-blue-800'
                                  : order.status === 'Confirmed'
                                  ? 'bg-indigo-100 text-indigo-800'
                                  : order.status === 'Cancelled'
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-amber-100 text-amber-900 animate-pulse'
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <select
                              value={order.status}
                              onChange={(e) =>
                                updateOrderStatus(order.id, e.target.value as Order['status'])
                              }
                              className="px-2 py-1 text-xs border border-stone-300 rounded-lg bg-stone-50 font-semibold"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() =>
                                openCustomerWhatsApp(order.customerPhone, order.id, order.customerName)
                              }
                              className="p-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg transition"
                              title="Message customer on WhatsApp"
                            >
                              <PhoneCall className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-stone-400">
                          No customer orders match your search or filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Products Catalog Management */}
        {activeTab === 'products' && (
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="relative flex-1 max-w-sm">
                <input
                  type="text"
                  placeholder="Search products by title, sku, category..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              </div>
              <p className="text-xs text-stone-500">
                Total Products: <b className="text-stone-900">{products.length}</b> listed
              </p>
            </div>

            <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-100 text-stone-700 uppercase font-bold text-[11px] border-b border-stone-200">
                    <tr>
                      <th className="p-3">Item</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Sale Price</th>
                      <th className="p-3">Original Price</th>
                      <th className="p-3">Discount</th>
                      <th className="p-3">Stock Count</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {filteredProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-stone-50 transition">
                        <td className="p-3 flex items-center gap-2.5">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-10 h-10 object-cover rounded-lg border border-stone-200 flex-shrink-0"
                          />
                          <div>
                            <p className="font-bold text-stone-900 line-clamp-1">{prod.name}</p>
                            <p className="text-[10px] text-stone-400">ID: {prod.id}</p>
                          </div>
                        </td>
                        <td className="p-3 font-semibold text-stone-600">{prod.category}</td>
                        <td className="p-3 font-black text-[#173D30]">Rs. {prod.price.toLocaleString()}</td>
                        <td className="p-3 text-stone-400 line-through">Rs. {prod.originalPrice.toLocaleString()}</td>
                        <td className="p-3">
                          <span className="bg-rose-100 text-rose-800 font-bold px-1.5 py-0.5 rounded text-[10px]">
                            -{prod.discountPercentage}%
                          </span>
                        </td>
                        <td className="p-3 font-bold">{prod.stockCount} units</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              prod.inStock
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {prod.inStock ? 'Active' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditProduct(prod)}
                              className="p-1.5 hover:bg-stone-200 text-stone-700 rounded-lg transition"
                              title="Edit product"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete ${prod.name}?`)) {
                                  deleteProduct(prod.id);
                                }
                              }}
                              className="p-1.5 hover:bg-rose-100 text-rose-600 rounded-lg transition"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
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
        )}

        {/* Tab 3: Sales Overview */}
        {activeTab === 'stats' && (
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Total Store Revenue
                </span>
                <p className="text-2xl sm:text-3xl font-black text-[#173D30] font-heading mt-1">
                  Rs. {totalRevenue.toLocaleString()}
                </p>
                <p className="text-[11px] text-stone-500 mt-1">Across all confirmed & delivered orders</p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                  Total Orders Placed
                </span>
                <p className="text-2xl sm:text-3xl font-black text-amber-900 font-heading mt-1">
                  {orders.length}
                </p>
                <p className="text-[11px] text-stone-500 mt-1">{pendingOrdersCount} pending verbal verification</p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Average Order Value
                </span>
                <p className="text-2xl sm:text-3xl font-black text-stone-900 font-heading mt-1">
                  Rs. {avgOrderValue.toLocaleString()}
                </p>
                <p className="text-[11px] text-stone-500 mt-1">Average cart ticket size</p>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200">
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                  Delivered Parcels
                </span>
                <p className="text-2xl sm:text-3xl font-black text-blue-900 font-heading mt-1">
                  {deliveredOrdersCount}
                </p>
                <p className="text-[11px] text-stone-500 mt-1">100% Cash collected via courier</p>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="p-5 rounded-2xl bg-stone-100 border border-stone-200">
              <h3 className="font-bold text-stone-900 text-sm mb-2">Store Operation Guidelines:</h3>
              <ul className="text-xs text-stone-600 space-y-1 list-disc list-inside">
                <li>Call or WhatsApp every new customer within 30 minutes to confirm address and prevent COD returns (RTO).</li>
                <li>Ensure all electronic gadgets (water pump, coffee frother, egg boiler) are tested before parcel packing.</li>
                <li>Free shipping is automatically applied on orders above Rs. 2,999 to encourage larger basket sizes.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 4: Customer Directory */}
        {activeTab === 'customers' && (
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
            <h3 className="font-bold text-sm text-stone-900">Registered Customer List</h3>
            <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-100 text-stone-700 uppercase font-bold text-[11px]">
                  <tr>
                    <th className="p-3">Customer Name</th>
                    <th className="p-3">Phone / WhatsApp</th>
                    <th className="p-3">City</th>
                    <th className="p-3">Total Spend</th>
                    <th className="p-3 text-right">Connect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-stone-50">
                      <td className="p-3 font-bold text-stone-900">{o.customerName}</td>
                      <td className="p-3 text-emerald-800 font-semibold">{o.customerPhone}</td>
                      <td className="p-3">{o.city}</td>
                      <td className="p-3 font-bold text-[#173D30]">Rs. {o.total.toLocaleString()}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => openCustomerWhatsApp(o.customerPhone, o.id, o.customerName)}
                          className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg font-semibold inline-flex items-center gap-1"
                        >
                          <PhoneCall className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add / Edit Product Modal */}
        {isEditingProduct && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
                <h3 className="font-black text-[#173D30] text-base font-heading">
                  {editingProductId ? 'Edit Product Details' : 'Add New Kitchen Product'}
                </h3>
                <button
                  onClick={() => setIsEditingProduct(false)}
                  className="p-1 hover:bg-stone-100 rounded-full"
                >
                  <X className="w-5 h-5 text-stone-500" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Product Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={productFormData.name}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Product Name in Urdu (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 14 ان 1 سبزی کٹر"
                    value={productFormData.urduName}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, urduName: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Category *
                    </label>
                    <select
                      value={productFormData.category}
                      onChange={(e) =>
                        setProductFormData({ ...productFormData, category: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Stock Count *
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={productFormData.stockCount}
                      onChange={(e) =>
                        setProductFormData({
                          ...productFormData,
                          stockCount: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Discounted Price (PKR) *
                    </label>
                    <input
                      type="number"
                      required
                      value={productFormData.price}
                      onChange={(e) =>
                        setProductFormData({
                          ...productFormData,
                          price: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Original / Market Price (PKR) *
                    </label>
                    <input
                      type="number"
                      required
                      value={productFormData.originalPrice}
                      onChange={(e) =>
                        setProductFormData({
                          ...productFormData,
                          originalPrice: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={productFormData.image}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, image: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                  />
                  {productFormData.image && (
                    <img
                      src={productFormData.image}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-lg border mt-2"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Product Description
                  </label>
                  <textarea
                    rows={2}
                    value={productFormData.description}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Key Features / Highlights (one per line)
                  </label>
                  <textarea
                    rows={3}
                    value={productFormData.highlights}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, highlights: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>

                {/* Badges toggles */}
                <div className="flex flex-wrap gap-4 pt-1">
                  <label className="flex items-center gap-1.5 text-xs text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productFormData.isBestSeller}
                      onChange={(e) =>
                        setProductFormData({ ...productFormData, isBestSeller: e.target.checked })
                      }
                    />
                    <span>Best Seller</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productFormData.isHotDeal}
                      onChange={(e) =>
                        setProductFormData({ ...productFormData, isHotDeal: e.target.checked })
                      }
                    />
                    <span>Hot Flash Deal</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productFormData.isNewArrival}
                      onChange={(e) =>
                        setProductFormData({ ...productFormData, isNewArrival: e.target.checked })
                      }
                    />
                    <span>New Arrival</span>
                  </label>
                </div>

                <div className="flex gap-2 pt-3 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setIsEditingProduct(false)}
                    className="flex-1 py-2.5 bg-stone-100 text-stone-700 font-bold text-xs rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#173D30] text-white font-bold text-xs rounded-xl"
                  >
                    {editingProductId ? 'Save Changes' : 'Publish Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
