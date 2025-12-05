import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product, Order, SiteSettings, SupportTicket, ServiceBooking, PublicTeamMember } from './types';
import { MOCK_ORDERS, MOCK_TICKETS, MOCK_SERVICE_BOOKINGS, MOCK_PUBLIC_TEAM } from './data';

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
