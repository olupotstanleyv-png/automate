import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product, Order, SiteSettings, SupportTicket, ServiceBooking, PublicTeamMember, Vehicle, StaffMember } from './types';
import { MOCK_ORDERS, MOCK_TICKETS, MOCK_SERVICE_BOOKINGS, MOCK_PUBLIC_TEAM, PRODUCTS, MOCK_FLEET, MOCK_STAFF } from './data';

// --- Cart Context ---
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children?: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

// --- Wishlist Context ---
interface WishlistContextType {
  wishlist: string[]; // Stores Product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children?: ReactNode }) => {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};

// --- Order Context ---
interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children?: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrder, deleteOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within an OrderProvider');
  return context;
};

// --- Settings Context ---
interface SettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children?: ReactNode }) => {
  const [settings, setSettings] = useState<SiteSettings>({
    name: 'Car Automate',
    logoUrl: '',
    setupWizardCompleted: false,
    general: {
      storeAddress: '123 Tech Drive, Silicon Valley',
      supportEmail: 'support@carautomate.inc',
      supportPhone: '+1 (555) 123-4567',
      country: 'US',
      currency: 'USD',
      timezone: 'PST'
    },
    tax: {
        enabled: true,
        pricesIncludeTax: false,
        taxBasedOn: 'shipping',
        rates: [],
        classes: ["Standard"]
    },
    shipping: {
        zones: [],
        options: {}
    },
    payments: {
        methods: []
    },
    emails: {
        senderName: 'Car Automate',
        senderEmail: 'no-reply@carautomate.inc',
        notifications: {
          newOrder: true,
          cancelledOrder: true,
          refund: true
        }
    },
    socialAccounts: []
  });

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({
        ...prev,
        ...newSettings,
        general: { ...prev.general, ...(newSettings.general || {}) },
        tax: { ...prev.tax, ...(newSettings.tax || {}) },
        shipping: { ...prev.shipping, ...(newSettings.shipping || {}) },
        payments: { ...prev.payments, ...(newSettings.payments || {}) },
        emails: { ...prev.emails, ...(newSettings.emails || {}) }
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within a SettingsProvider');
  return context;
};

// --- Contact/Support Context ---
interface ContactContextType {
    tickets: SupportTicket[];
    addTicket: (ticket: SupportTicket) => void;
    updateTicket: (id: string, updates: Partial<SupportTicket>) => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider = ({ children }: { children?: ReactNode }) => {
    const [tickets, setTickets] = useState<SupportTicket[]>(MOCK_TICKETS);

    const addTicket = (ticket: SupportTicket) => {
        setTickets(prev => [ticket, ...prev]);
    };

    const updateTicket = (id: string, updates: Partial<SupportTicket>) => {
        setTickets(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    };

    return (
        <ContactContext.Provider value={{ tickets, addTicket, updateTicket }}>
            {children}
        </ContactContext.Provider>
    );
};

export const useContact = () => {
    const context = useContext(ContactContext);
    if (!context) throw new Error('useContact must be used within a ContactProvider');
    return context;
};

// --- Team Context ---
interface TeamContextType {
    teamMembers: PublicTeamMember[];
    addTeamMember: (member: PublicTeamMember) => void;
    updateTeamMember: (id: string, updates: Partial<PublicTeamMember>) => void;
    deleteTeamMember: (id: string) => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider = ({ children }: { children?: ReactNode }) => {
    const [teamMembers, setTeamMembers] = useState<PublicTeamMember[]>(MOCK_PUBLIC_TEAM);

    const addTeamMember = (member: PublicTeamMember) => {
        setTeamMembers(prev => [...prev, member]);
    };

    const updateTeamMember = (id: string, updates: Partial<PublicTeamMember>) => {
        setTeamMembers(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
    };

    const deleteTeamMember = (id: string) => {
        setTeamMembers(prev => prev.filter(m => m.id !== id));
    };

    return (
        <TeamContext.Provider value={{ teamMembers, addTeamMember, updateTeamMember, deleteTeamMember }}>
            {children}
        </TeamContext.Provider>
    );
};

export const useTeam = () => {
    const context = useContext(TeamContext);
    if (!context) throw new Error('useTeam must be used within a TeamProvider');
    return context;
};

// --- Service Booking Context ---
interface ServiceBookingContextType {
    bookings: ServiceBooking[];
    addBooking: (booking: ServiceBooking) => void;
}

const ServiceBookingContext = createContext<ServiceBookingContextType | undefined>(undefined);

export const ServiceBookingProvider = ({ children }: { children?: ReactNode }) => {
    const [bookings, setBookings] = useState<ServiceBooking[]>(MOCK_SERVICE_BOOKINGS);

    const addBooking = (booking: ServiceBooking) => {
        setBookings(prev => [booking, ...prev]);
    };

    return (
        <ServiceBookingContext.Provider value={{ bookings, addBooking }}>
            {children}
        </ServiceBookingContext.Provider>
    );
};

export const useServiceBooking = () => {
    const context = useContext(ServiceBookingContext);
    if (!context) throw new Error('useServiceBooking must be used within a ServiceBookingProvider');
    return context;
};

// --- Product Context ---
interface ProductContextType {
    products: Product[];
    addProduct: (product: Product) => void;
    updateProduct: (id: string, updates: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children?: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>(PRODUCTS);

    const addProduct = (product: Product) => {
        setProducts(prev => [...prev, product]);
    };

    const updateProduct = (id: string, updates: Partial<Product>) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    const deleteProduct = (id: string) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) throw new Error('useProducts must be used within a ProductProvider');
    return context;
};

// --- Fleet Context ---
interface FleetContextType {
    fleet: Vehicle[];
    addVehicle: (vehicle: Vehicle) => void;
    updateVehicle: (id: string, updates: Partial<Vehicle>) => void;
    deleteVehicle: (id: string) => void;
}

const FleetContext = createContext<FleetContextType | undefined>(undefined);

export const FleetProvider = ({ children }: { children?: ReactNode }) => {
    const [fleet, setFleet] = useState<Vehicle[]>(MOCK_FLEET);

    const addVehicle = (vehicle: Vehicle) => {
        setFleet(prev => [...prev, vehicle]);
    };

    const updateVehicle = (id: string, updates: Partial<Vehicle>) => {
        setFleet(prev => prev.map(v => v.id === id ? { ...v, ...updates } : v));
    };

    const deleteVehicle = (id: string) => {
        setFleet(prev => prev.filter(v => v.id !== id));
    };

    return (
        <FleetContext.Provider value={{ fleet, addVehicle, updateVehicle, deleteVehicle }}>
            {children}
        </FleetContext.Provider>
    );
};

export const useFleet = () => {
    const context = useContext(FleetContext);
    if (!context) throw new Error('useFleet must be used within a FleetProvider');
    return context;
};

// --- Staff Context ---
interface StaffContextType {
    staff: StaffMember[];
    addStaff: (member: StaffMember) => void;
    updateStaff: (id: string, updates: Partial<StaffMember>) => void;
    deleteStaff: (id: string) => void;
}

const StaffContext = createContext<StaffContextType | undefined>(undefined);

export const StaffProvider = ({ children }: { children?: ReactNode }) => {
    const [staff, setStaff] = useState<StaffMember[]>(MOCK_STAFF);

    const addStaff = (member: StaffMember) => {
        setStaff(prev => [...prev, member]);
    };

    const updateStaff = (id: string, updates: Partial<StaffMember>) => {
        setStaff(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    };

    const deleteStaff = (id: string) => {
        setStaff(prev => prev.filter(s => s.id !== id));
    };

    return (
        <StaffContext.Provider value={{ staff, addStaff, updateStaff, deleteStaff }}>
            {children}
        </StaffContext.Provider>
    );
};

export const useStaff = () => {
    const context = useContext(StaffContext);
    if (!context) throw new Error('useStaff must be used within a StaffProvider');
    return context;
};

// --- Customer Notification Context ---
interface NotificationData {
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface CustomerNotificationContextType {
  notifications: NotificationData[];
  addNotification: (notification: NotificationData) => void;
}

const CustomerNotificationContext = createContext<CustomerNotificationContextType | undefined>(undefined);

export const CustomerNotificationProvider = ({ children }: { children?: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const addNotification = (notification: NotificationData) => {
    setNotifications(prev => [...prev, notification]);
    // Auto dismiss after 3 seconds
    setTimeout(() => {
        setNotifications(prev => prev.filter(n => n !== notification));
    }, 3000);
  };

  return (
    <CustomerNotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
          {notifications.map((n, i) => (
              <div key={i} className={`pointer-events-auto min-w-[300px] p-4 rounded-lg shadow-2xl border border-white/10 text-white animate-fade-in-up flex items-start gap-3 backdrop-blur-md ${
                  n.type === 'success' ? 'bg-green-900/90' : 
                  n.type === 'error' ? 'bg-red-900/90' : 
                  n.type === 'warning' ? 'bg-yellow-900/90' : 'bg-brand-surface/90'
              }`}>
                  <div className={`mt-0.5 ${
                      n.type === 'success' ? 'text-green-400' : 
                      n.type === 'error' ? 'text-red-400' : 
                      n.type === 'warning' ? 'text-yellow-400' : 'text-blue-400'
                  }`}>
                      <i className={`fa-solid ${
                          n.type === 'success' ? 'fa-circle-check' : 
                          n.type === 'error' ? 'fa-circle-xmark' : 
                          n.type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-info'
                      }`}></i>
                  </div>
                  <div>
                      <h4 className="font-bold text-sm">{n.title}</h4>
                      <p className="text-xs text-gray-300 mt-1">{n.message}</p>
                  </div>
              </div>
          ))}
      </div>
    </CustomerNotificationContext.Provider>
  );
};

export const useCustomerNotification = () => {
  const context = useContext(CustomerNotificationContext);
  if (!context) throw new Error('useCustomerNotification must be used within a CustomerNotificationProvider');
  return context;
};