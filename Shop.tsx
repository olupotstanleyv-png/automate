import React, { useState } from 'react';
import { useCart, useWishlist } from './store';
import { PRODUCTS } from './data';
import { Product } from './types';

interface ShopProps {
  searchQuery?: string;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name-asc';

interface ProductCardProps {
  product: Product;
  addToCart: (p: Product) => void;
}

// Sub-component for individual Product Card to handle image state
const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const isWishlisted = isInWishlist(product.id);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-brand-surface rounded-xl overflow-hidden group hover:shadow-2xl hover:shadow-brand-gold/20 transition-all duration-300 hover:-translate-y-2 border border-white/5 hover:border-brand-gold/30 flex flex-col h-full relative">
      <div className="h-56 overflow-hidden relative group/image">
        {/* Subtle overlay that fades out on hover to make image pop */}
        <div className="absolute inset-0 bg-brand-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
        
        <img 
          src={images[currentImageIndex]} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        
        {/* Wishlist Button - Top Left */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 left-3 z-20 bg-black/40 hover:bg-brand-black backdrop-blur-sm p-2 rounded-full transition-all duration-300 group/btn"
        >
          <i className={`${isWishlisted ? 'fa-solid text-red-500' : 'fa-regular text-white group-hover/btn:text-red-500'} fa-heart text-lg`}></i>
        </button>

        {/* Carousel Controls (only if multiple images) */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-brand-gold hover:text-black text-white p-2 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"
            >
              <i className="fa-solid fa-chevron-left text-xs"></i>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-brand-gold hover:text-black text-white p-2 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"
            >
              <i className="fa-solid fa-chevron-right text-xs"></i>
            </button>
            {/* Dots Indicator */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-20">
               {images.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 w-1.5 rounded-full shadow-sm transition-colors ${idx === currentImageIndex ? 'bg-brand-gold' : 'bg-white/50'}`} 
                  />
               ))}
            </div>
          </>
        )}

        <div className="absolute top-4 right-4 bg-brand-black/90 backdrop-blur-sm text-brand-gold px-3 py-1 rounded text-sm font-bold border border-brand-gold/20 shadow-lg z-20">
          ${product.price.toLocaleString()}
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col relative">
        {/* Subtle background glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <div className="flex justify-between items-center mb-3 relative z-10">
          <span className="text-xs text-brand-gold/80 uppercase tracking-widest font-semibold">{product.category}</span>
          <div className="flex items-center gap-1 text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">
            <i className="fa-solid fa-star text-brand-gold"></i>
            <span>{product.rating}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors relative z-10">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-6 line-clamp-2 flex-1 leading-relaxed relative z-10">{product.description}</p>
        
        <div className="mt-auto relative z-10">
          <button 
            onClick={() => addToCart(product)}
            className="w-full py-3 bg-white hover:bg-brand-gold text-brand-black font-bold text-sm rounded transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wide transform hover:-translate-y-1 shadow-lg hover:shadow-brand-gold/20"
          >
            <i className="fa-solid fa-cart-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Shop({ searchQuery = '' }: ShopProps) {
  const [filter, setFilter] = useState<'all' | 'automation' | 'parts' | 'accessories' | 'cars'>('all');
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const { addToCart } = useCart();

  // 1. Filter
  let products = PRODUCTS.filter(p => {
    const matchesCategory = filter === 'all' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 2. Sort
  products.sort((a, b) => {
    switch (sortOption) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'name-asc': return a.name.localeCompare(b.name);
      default: return 0; // 'featured' - maintain original order or specific logic
    }
  });

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-white border-l-4 border-brand-gold pl-4">Shop</h1>
        {searchQuery && (
          <div className="mt-4 md:mt-0 text-gray-400">
            Results for "<span className="text-brand-gold">{searchQuery}</span>"
          </div>
        )}
      </div>
      
      {/* Controls Bar: Filter & Sort */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-10 gap-6">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {['all', 'automation', 'parts', 'accessories', 'cars'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${
                filter === cat 
                  ? 'bg-brand-gold text-brand-black border-brand-gold' 
                  : 'bg-brand-surface text-gray-400 border-white/5 hover:border-white/20 hover:text-white'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3 self-end xl:self-auto">
            <span className="text-gray-500 text-sm font-medium">Sort by:</span>
            <div className="relative">
                <select 
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="appearance-none bg-brand-surface text-gray-200 text-sm rounded-md px-4 py-2 pr-10 border border-white/10 focus:outline-none focus:border-brand-gold cursor-pointer hover:border-white/30 transition-colors"
                >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="name-asc">Name: A to Z</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-brand-gold">
                  <i className="fa-solid fa-chevron-down text-xs"></i>
                </div>
            </div>
        </div>
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-brand-surface/30 rounded-lg border border-white/5 border-dashed">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
             <i className="fa-solid fa-magnifying-glass text-2xl text-gray-500"></i>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
          <p className="text-gray-400 text-center max-w-md">
            We couldn't find any products matching your current filters. Try adjusting your search or sorting options.
          </p>
          <button 
             onClick={() => { setFilter('all'); setSortOption('featured'); }}
             className="mt-6 text-brand-gold hover:text-white text-sm font-medium underline underline-offset-4"
          >
             Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}