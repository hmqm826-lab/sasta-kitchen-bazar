import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, ToastMessage } from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';
import { CATEGORIES } from '../data/categories';
import confetti from 'canvas-confetti';

interface StoreContextType {
  products: Product[];
  categories: typeof CATEGORIES;
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProduct: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  lastOrder: Order | null;
  setLastOrder: (order: Order | null) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  
  // Cart Actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  buyNow: (product: Product) => void;
  
  // Wishlist
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Coupons
  couponCode: string;
  discountAmount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  
  // Cart Calculations
  cartSubtotal: number;
  shippingFee: number;
  cartTotal: number;
  freeShippingThreshold: number;
  
  // Order & Admin
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  resetDefaultData: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 2999;
const STANDARD_SHIPPING_FEE = 199;

const SAMPLE_ORDERS: Order[] = [];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products from localStorage or initial
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('skb_products_v1');
      if (saved) return JSON.parse(saved).filter((p: Product) => !/^skb-(0[1-9]|1[0-6])$/.test(p.id));
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRODUCTS;
  });

  // Load cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('skb_cart_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Load wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('skb_wishlist_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Load orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('skb_orders_v1');
      if (saved) return JSON.parse(saved).filter((o: Order) => !['SKB-92841', 'SKB-92842', 'SKB-92843'].includes(o.id));
    } catch (e) {
      console.error(e);
    }
    return SAMPLE_ORDERS;
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Coupon state
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // Sync products to local storage
  useEffect(() => {
    try {
      localStorage.setItem('skb_products_v1', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('skb_cart_v1', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync wishlist to local storage
  useEffect(() => {
    try {
      localStorage.setItem('skb_wishlist_v1', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Sync orders to local storage
  useEffect(() => {
    try {
      localStorage.setItem('skb_orders_v1', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const showToast = (title: string, message: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast('Added to Cart! 🛒', `${product.name} (Qty: ${quantity}) added.`);
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    if (item) {
      showToast('Removed', `${item.product.name} removed from your cart.`, 'info');
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const buyNow = (product: Product) => {
    // Add to cart if not already
    const exists = cart.some((item) => item.product.id === product.id);
    if (!exists) {
      setCart((prev) => [...prev, { product, quantity: 1 }]);
    }
    setIsCheckoutOpen(true);
    if (selectedProduct) {
      setSelectedProduct(null);
    }
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Wishlist', 'Item removed from your wishlist.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist ❤️', 'Added to your favorites list.');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const shippingFee = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const applyCoupon = (code: string) => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'SASTA10') {
      setCouponCode('SASTA10');
      setDiscountPercent(10);
      showToast('Coupon Applied! 🎉', '10% discount applied to your order.');
      return true;
    }
    if (formatted === 'WELCOME5') {
      setCouponCode('WELCOME5');
      setDiscountPercent(5);
      showToast('Welcome Coupon! 🎉', '5% discount applied.');
      return true;
    }
    showToast('Invalid Coupon', 'Please enter a valid promo code like SASTA10.', 'error');
    return false;
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercent(0);
    showToast('Coupon Removed', 'Discount removed.', 'info');
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `SKB-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      status: 'Pending',
    };

    // Update stock counts
    setProducts((prev) =>
      prev.map((prod) => {
        const orderedItem = newOrder.items.find((item) => item.product.id === prod.id);
        if (orderedItem) {
          const newStock = Math.max(0, prod.stockCount - orderedItem.quantity);
          return {
            ...prod,
            stockCount: newStock,
            inStock: newStock > 0,
          };
        }
        return prod;
      })
    );

    // Save order
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setLastOrder(newOrder);
    setIsCheckoutOpen(false);

    // Confetti celebration
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#173D30', '#F5A623', '#235846', '#ffffff'],
      });
    } catch (e) {
      console.error(e);
    }

    showToast('Order Placed Successfully! 🇵🇰', `Your order #${newOrder.id} has been received.`);
    return newOrder;
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    showToast('Order Deleted', `Order #${orderId} removed.`, 'warning');
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast('Order Updated', `Order #${orderId} status changed to ${status}.`, 'info');
  };

  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...prodData,
      id: `skb-${Date.now().toString().slice(-4)}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast('Product Added 📦', `${newProduct.name} is now listed in store.`);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    showToast('Product Updated', `${updated.name} details saved.`);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product Deleted', 'Product has been removed from store catalog.', 'warning');
  };

  const resetDefaultData = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(SAMPLE_ORDERS);
    localStorage.removeItem('skb_products_v1');
    localStorage.removeItem('skb_orders_v1');
    showToast('Reset Complete', 'Default products and sample orders reloaded.', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories: CATEGORIES,
        cart,
        wishlist,
        orders,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        selectedProduct,
        openProductModal,
        closeProductModal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastOrder,
        setLastOrder,
        isAdminOpen,
        setIsAdminOpen,
        toasts,
        showToast,
        removeToast,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        buyNow,
        toggleWishlist,
        isInWishlist,
        couponCode,
        discountAmount,
        applyCoupon,
        removeCoupon,
        cartSubtotal,
        shippingFee,
        cartTotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        createOrder,
        updateOrderStatus,\n        deleteOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        resetDefaultData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
