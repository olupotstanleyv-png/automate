import React, { useState } from 'react';
import { MOCK_GALLERY_IMAGES } from './data';
import { GalleryItem } from './types';

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Showroom', 'Workshop', 'Events', 'Restorations'];

  const filteredImages = filter === 'All' 
    ? MOCK_GALLERY_IMAGES 
    : MOCK_GALLERY_IMAGES.filter(img => img.category === filter);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-brand-dark py-20 border-b border-white/5 relative overflow-hidden">
         {/* Background pattern/image */}
         <div className="absolute inset-0 opacity-20">
            <img src="https://images.unsplash.com/photo-1493238792015-1a778432ffe9?q=80&w=2071&auto=format&fit=crop" className="w-full h-full object-cover" alt="Gallery BG" />
         </div>
         <div className="absolute inset-0 bg-gradient-to-t from-brand-black to-transparent"></div>
         
         <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-5xl font-extrabold text-white mb-6">Our <span className="text-brand-gold">Gallery</span></h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
               Explore our latest projects, events, and showroom masterpieces. Visual proof of our passion for automotive excellence.
            </p>
         </div>
      </section>

      <div className="container mx-auto px-4 py-12">
         {/* Filter Tabs */}
         <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(cat => (
               <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${
                     filter === cat 
                     ? 'bg-brand-gold text-brand-black border-brand-gold shadow-lg shadow-brand-gold/20' 
                     : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
               >
                  {cat}
               </button>
            ))}
         </div>

         {/* Image Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map(item => (
               <div 
                  key={item.id} 
                  className="group relative h-72 rounded-xl overflow-hidden cursor-pointer border border-white/5 bg-brand-surface"
                  onClick={() => setSelectedImage(item)}
               >
                  <img 
                     src={item.image} 
                     alt={item.title} 
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <div className="absolute bottom-0 left-0 p-6 w-full">
                        <span className="text-brand-gold text-xs font-bold uppercase tracking-wider mb-1 block">{item.category}</span>
                        <h3 className="text-white font-bold text-lg">{item.title}</h3>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
         <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
         >
            <button 
               className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
               onClick={() => setSelectedImage(null)}
            >
               <i className="fa-solid fa-xmark text-3xl"></i>
            </button>

            <div className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
               <div className="relative w-full h-auto max-h-[80vh] rounded-lg overflow-hidden shadow-2xl border border-white/10">
                  <img 
                     src={selectedImage.image} 
                     alt={selectedImage.title} 
                     className="w-full h-full object-contain bg-black"
                  />
               </div>
               <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h2>
                  <p className="text-gray-400">{selectedImage.description}</p>
                  <span className="inline-block mt-3 px-3 py-1 bg-brand-gold/10 text-brand-gold border border-brand-gold/20 rounded text-xs uppercase tracking-widest font-bold">
                     {selectedImage.category}
                  </span>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}