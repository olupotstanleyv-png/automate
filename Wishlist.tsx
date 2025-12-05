import React from 'react';
import { useWishlist, useCart } from './store';
import { PRODUCTS } from './data';
import { Product } from './types';

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Filter products that are in the wishlist
  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="inline-block p-6 rounded-full bg-brand-surface mb-6 border border-white/5">
           <i className="fa-regular fa-heart text-4xl text-gray-600"></i>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Save items you love here to easily find them later. Browse our shop to find the best car parts and accessories.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold text-white mb-8 border-l-4 border-brand-gold pl-4">My Wishlist</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistProducts.map((product) => (
          <div key={product.id} className="bg-brand-surface rounded-lg overflow-hidden border border-white/5 group hover:border-brand-gold/30 transition-all">
            <div className="relative h-48">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-2 right-2 bg-black/60 hover:bg-brand-black text-white p-2 rounded-full transition-colors"
                title="Remove from wishlist"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                 <h3 className="text-lg font-bold text-white truncate pr-2">{product.name}</h3>
                 <span className="text-brand-gold font-bold">${product.price.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                <button 
                    onClick={() => {
                        addToCart(product);
                    }}
                    className="flex-1 bg-white hover:bg-brand-gold text-brand-black font-bold py-2 px-4 rounded text-sm transition-colors flex items-center justify-center gap-2"
                >
                    <i className="fa-solid fa-cart-plus"></i> Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}