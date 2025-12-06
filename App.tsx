

import React, { useState } from 'react';
import Navbar from './Navbar';
import Chatbot from './Chatbot';
import Home from './Home';
import Shop from './Shop';
import Services from './Services';
import Admin from './Admin';
import Wishlist from './Wishlist';
import Checkout, { OrderSuccess } from './Checkout';
import Contact from './Contact';
import About from './About';
import FAQ from './FAQ';
import Team from './Team';
import Blog from './Blog';
import { PageView, Order } from './types';
import { CartProvider, useCart, WishlistProvider, OrderProvider, SettingsProvider, ContactProvider, ServiceBookingProvider, useSettings, TeamProvider, CustomerNotificationProvider, FleetProvider, ProductProvider, StaffProvider } from './store';

// Cart Component inline for simplicity as it's small or can be expanded
const CartPage = ({ setPage }: { setPage: (p: PageView) => void }) => {
  const { cart, removeFromCart, clearCart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="inline-block p-6 rounded-full bg-brand-surface mb-4">
           <i className="fa-solid fa-cart-shopping text-4xl text-gray-600"></i>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
        <p className="text-gray-500">Looks like you haven't added any items yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold text-white mb-8 border-l-4 border-brand-gold pl-4">Your Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-brand-surface p-4 rounded-lg border border-white/5 flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded bg-brand-dark" />
              <div className="flex-1">
                <h3 className="text-white font-bold">{item.name}</h3>
                <p className="text-brand-gold text-sm">${item.price}</p>
                <div className="text-gray-500 text-xs mt-1">Quantity: {item.quantity}</div>
              </div>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-gray-500 hover:text-red-500 transition-colors px-3 py-2"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          ))}
          <button onClick={clearCart} className="text-sm text-gray-500 hover:text-white underline">Clear Cart</button>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-brand-surface p-6 rounded-lg border border-white/5 sticky top-24">
            <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>${cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between text-white font-bold text-lg">
                <span>Total</span>
                <span>${cartTotal.toLocaleString()}</span>
              </div>
            </div>
            
            <button 
              onClick={() => setPage('checkout')}
              className="w-full bg-brand-gold text-brand-black font-bold py-3 rounded hover:bg-brand-gold-light transition-colors mb-3 flex items-center justify-center gap-2"
            >
              Secure Checkout <i className="fa-solid fa-lock text-xs"></i>
            </button>
            <div className="flex justify-center gap-3 text-2xl text-gray-500 mt-4">
               <i className="fa-brands fa-cc-visa"></i>
               <i className="fa-brands fa-cc-mastercard"></i>
               <i className="fa-brands fa-cc-paypal"></i>
               <i className="fa-brands fa-apple-pay"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainContent = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const { settings } = useSettings(); // Access settings for Footer

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage('shop');
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-black text-gray-200">
      <Navbar currentPage={currentPage} setPage={setCurrentPage} onSearch={handleSearch} />
      
      <main className="flex-grow">
        {currentPage === 'home' && <Home setPage={setCurrentPage} />}
        {currentPage === 'shop' && <Shop searchQuery={searchQuery} />}
        {currentPage === 'services' && <Services setPage={setCurrentPage} />}
        {currentPage === 'team' && <Team />}
        {currentPage === 'blog' && <Blog setPage={setCurrentPage} />}
        {currentPage === 'admin' && <Admin />}
        {currentPage === 'cart' && <CartPage setPage={setCurrentPage} />}
        {currentPage === 'checkout' && <Checkout setPage={setCurrentPage} setLastOrder={setLastOrder} />}
        {currentPage === 'order-success' && <OrderSuccess order={lastOrder} setPage={setCurrentPage} />}
        {currentPage === 'wishlist' && <Wishlist />}
        {currentPage === 'contact' && <Contact setPage={setCurrentPage} />}
        {currentPage === 'about' && <About setPage={setCurrentPage} />}
        {currentPage === 'faq' && <FAQ setPage={setCurrentPage} />}
      </main>

      <footer className="bg-brand-surface border-t border-white/5 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">{settings.name}</h4>
              <p className="text-gray-500 text-sm">Your trusted partner in automotive technology and repair.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="text-gray-500 text-sm space-y-2">
                <li onClick={() => setCurrentPage('shop')} className="cursor-pointer hover:text-brand-gold">Shop</li>
                <li onClick={() => setCurrentPage('services')} className="cursor-pointer hover:text-brand-gold">Services</li>
                <li onClick={() => setCurrentPage('contact')} className="cursor-pointer hover:text-brand-gold">Contact</li>
                <li onClick={() => setCurrentPage('faq')} className="cursor-pointer hover:text-brand-gold">FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="text-gray-500 text-sm space-y-2">
                <li><i className="fa-solid fa-location-dot w-5"></i> {settings.general.storeAddress || '123 Tech Drive'}</li>
                <li><i className="fa-solid fa-envelope w-5"></i> {settings.general.supportEmail || 'support@carautomate.inc'}</li>
                <li><i className="fa-solid fa-phone w-5"></i> {settings.general.supportPhone || '+1 (555) 123-4567'}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-brand-gold"><i className="fa-brands fa-facebook"></i></a>
                <a href="#" className="text-gray-500 hover:text-brand-gold"><i className="fa-brands fa-twitter"></i></a>
                <a href="#" className="text-gray-500 hover:text-brand-gold"><i className="fa-brands fa-youtube"></i></a>
                <a href="#" className="text-gray-500 hover:text-brand-gold"><i className="fa-brands fa-tiktok"></i></a>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-600 text-xs border-t border-white/5 pt-8">
            © 2024 {settings.name}. All rights reserved.
          </div>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <OrderProvider>
          <SettingsProvider>
            <ContactProvider>
              <ServiceBookingProvider>
                <TeamProvider>
                  <CustomerNotificationProvider>
                    <FleetProvider>
                      <ProductProvider>
                        <StaffProvider>
                          <MainContent />
                        </StaffProvider>
                      </ProductProvider>
                    </FleetProvider>
                  </CustomerNotificationProvider>
                </TeamProvider>
              </ServiceBookingProvider>
            </ContactProvider>
          </SettingsProvider>
        </OrderProvider>
      </WishlistProvider>
    </CartProvider>
  );
}