

import React, { useState, useEffect, useRef } from 'react';
import { PageView } from './types';
import { useCart, useWishlist, useSettings } from './store';
import { PRODUCTS } from './data';

interface NavbarProps {
  currentPage: PageView;
  setPage: (page: PageView) => void;
  onSearch: (query: string) => void;
}

export default function Navbar({ currentPage, setPage, onSearch }: NavbarProps) {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { settings } = useSettings();
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter products for the dropdown
  const filteredProducts = searchValue.trim() 
    ? PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchValue.toLowerCase()) || 
        p.description.toLowerCase().includes(searchValue.toLowerCase())
      ).slice(0, 5) // Limit to 5 results
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
    setIsFocused(false);
    setIsMobileMenuOpen(false);
  };

  const handleSelectProduct = (productName: string) => {
    setSearchValue(productName);
    onSearch(productName);
    setIsFocused(false);
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (page: PageView) => {
      setPage(page);
      setIsMobileMenuOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-brand-black/95 backdrop-blur-md border-b border-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center gap-4">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer" 
            onClick={() => handleNavClick('home')}
          >
            {settings.logoUrl ? (
                <img src={settings.logoUrl} alt="Logo" className="h-8 w-auto mr-2 rounded" />
            ) : (
                <i className="fa-solid fa-bolt text-brand-gold text-2xl mr-2"></i>
            )}
            <span className="font-bold text-xl tracking-wider text-white hidden sm:block">
              {settings.name.toUpperCase()}
            </span>
            <span className="font-bold text-xl tracking-wider text-white sm:hidden">
              {settings.name.substring(0, 2).toUpperCase()}
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl px-2 md:px-8" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative group w-full">
              <input
                type="text"
                placeholder="Search for parts, cars, or services..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                className="w-full bg-brand-surface text-gray-200 text-sm rounded-md py-2 pl-4 pr-10 border border-gray-700 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all"
              />
              <button 
                type="submit"
                className="absolute right-0 top-0 h-full w-10 bg-brand-gold/10 hover:bg-brand-gold text-brand-gold hover:text-brand-black transition-colors flex items-center justify-center rounded-r-md"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>

              {/* Search Dropdown Popup */}
              {isFocused && searchValue.trim().length > 0 && filteredProducts.length > 0 && (
                <div className="absolute top-full mt-2 left-0 w-full bg-brand-surface border border-brand-gold/20 rounded-lg shadow-2xl overflow-hidden z-50 animate-fade-in">
                  <div className="py-2">
                    <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">Products</div>
                    {filteredProducts.map(product => (
                      <div 
                        key={product.id}
                        onMouseDown={() => handleSelectProduct(product.name)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 last:border-0"
                      >
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-10 h-10 object-cover rounded bg-brand-dark"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-gray-200 truncate">{product.name}</div>
                          <div className="text-xs text-brand-gold">${product.price.toLocaleString()}</div>
                        </div>
                        <i className="fa-solid fa-chevron-right text-gray-600 text-xs"></i>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4 sm:space-x-6 shrink-0">
             {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              <button onClick={() => setPage('shop')} className={`text-sm font-medium hover:text-brand-gold transition-colors ${currentPage === 'shop' ? 'text-brand-gold' : 'text-gray-300'}`}>Shop</button>
              <button onClick={() => setPage('services')} className={`text-sm font-medium hover:text-brand-gold transition-colors ${currentPage === 'services' ? 'text-brand-gold' : 'text-gray-300'}`}>Services</button>
              <button onClick={() => setPage('team')} className={`text-sm font-medium hover:text-brand-gold transition-colors ${currentPage === 'team' ? 'text-brand-gold' : 'text-gray-300'}`}>Our Team</button>
              <button onClick={() => setPage('blog')} className={`text-sm font-medium hover:text-brand-gold transition-colors ${currentPage === 'blog' ? 'text-brand-gold' : 'text-gray-300'}`}>Blog</button>
              <button onClick={() => setPage('about')} className={`text-sm font-medium hover:text-brand-gold transition-colors ${currentPage === 'about' ? 'text-brand-gold' : 'text-gray-300'}`}>About</button>
              <button onClick={() => setPage('faq')} className={`text-sm font-medium hover:text-brand-gold transition-colors ${currentPage === 'faq' ? 'text-brand-gold' : 'text-gray-300'}`}>FAQ</button>
            </div>

            <button 
              onClick={() => setPage('admin')}
              className="hidden md:block px-3 py-1 text-[10px] font-semibold uppercase tracking-wide border border-brand-gold/30 text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all rounded"
            >
              Admin
            </button>
            
            {/* Wishlist Button */}
            <button 
              onClick={() => setPage('wishlist')}
              className="relative text-gray-300 hover:text-brand-gold transition-colors"
            >
              <i className={`${wishlistCount > 0 ? 'fa-solid text-brand-gold' : 'fa-regular'} fa-heart text-xl`}></i>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-surface border border-brand-gold text-brand-gold text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button 
              onClick={() => setPage('cart')}
              className="relative text-gray-300 hover:text-brand-gold transition-colors"
            >
              <i className="fa-solid fa-cart-shopping text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button 
                className="lg:hidden text-gray-300 hover:text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

       {/* Mobile Menu Dropdown */}
       {isMobileMenuOpen && (
        <div className="lg:hidden bg-brand-surface border-b border-white/5 animate-fade-in-down absolute w-full left-0 z-40 shadow-2xl">
            <div className="px-4 pt-2 pb-4 space-y-1">
                {[
                    { id: 'home', label: 'Home' },
                    { id: 'shop', label: 'Shop' },
                    { id: 'services', label: 'Services' },
                    { id: 'team', label: 'Our Team' },
                    { id: 'blog', label: 'Blog' },
                    { id: 'about', label: 'About' },
                    { id: 'faq', label: 'FAQ' },
                    { id: 'contact', label: 'Contact' },
                    { id: 'admin', label: 'Admin Console' }
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id as PageView)}
                        className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors ${
                            currentPage === item.id 
                            ? 'bg-brand-gold/10 text-brand-gold' 
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
      )}
    </nav>
  );
}
