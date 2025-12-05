
import React from 'react';
import { PageView } from './types';

interface BlogProps {
  setPage: (page: PageView) => void;
}

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Future of Autonomous Driving",
    excerpt: "How AI is reshaping the automotive industry and what it means for your daily commute. We explore level 5 autonomy and beyond.",
    image: "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=2100&auto=format&fit=crop",
    date: "May 25, 2024",
    category: "Technology",
    author: "Elena Rodriguez"
  },
  {
    id: 2,
    title: "Top 5 EV Maintenance Tips",
    excerpt: "Electric vehicles require different care than ICE cars. Here are the essential maintenance tips to prolong your battery life.",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop",
    date: "May 20, 2024",
    category: "Maintenance",
    author: "Marcus Johnson"
  },
  {
    id: 3,
    title: "Understanding ECU Remapping",
    excerpt: "Unlock the hidden potential of your engine. A comprehensive guide to safe and effective performance tuning.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2070&auto=format&fit=crop",
    date: "May 15, 2024",
    category: "Performance",
    author: "David Chen"
  },
  {
    id: 4,
    title: "Luxury Interior Mods for 2024",
    excerpt: "From ambient lighting to smart seats, discover the trending interior modifications that define luxury this year.",
    image: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=2069&auto=format&fit=crop",
    date: "May 10, 2024",
    category: "Customization",
    author: "Sarah Jones"
  },
  {
    id: 5,
    title: "Safety Systems 101",
    excerpt: "ADAS, LIDAR, and Radar. We break down the acronyms and explain how modern safety systems protect you.",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
    date: "May 05, 2024",
    category: "Safety",
    author: "David Chen"
  }
];

const CATEGORIES = ["All", "Technology", "Maintenance", "Performance", "Customization", "Safety"];

export default function Blog({ setPage }: BlogProps) {
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filteredPosts = activeCategory === "All" 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === activeCategory);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-20 bg-brand-dark overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0 opacity-30">
           <img 
             src="https://images.unsplash.com/photo-1493238792015-1a778432ffe9?q=80&w=2071&auto=format&fit=crop"
             alt="Blog Background" 
             className="w-full h-full object-cover"
           />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
           <h4 className="text-brand-gold font-bold tracking-widest uppercase mb-4">Insights & News</h4>
           <h1 className="text-5xl font-extrabold text-white mb-6">The <span className="text-brand-gold">Auto Pulse</span></h1>
           <p className="text-gray-300 max-w-2xl mx-auto text-lg">
             Stay updated with the latest trends in automotive technology, maintenance guides, and company news.
           </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORIES.map(cat => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${
                        activeCategory === cat 
                        ? 'bg-brand-gold text-brand-black border-brand-gold' 
                        : 'bg-brand-surface text-gray-400 border-white/5 hover:border-white/20 hover:text-white'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
                <div key={post.id} className="bg-brand-surface rounded-xl overflow-hidden border border-white/5 hover:border-brand-gold/30 transition-all group cursor-pointer hover:-translate-y-2">
                    <div className="h-56 overflow-hidden relative">
                        <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4 bg-brand-black/80 backdrop-blur-sm text-brand-gold text-xs font-bold px-3 py-1 rounded border border-brand-gold/20">
                            {post.category}
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                            <span><i className="fa-regular fa-calendar mr-1"></i>{post.date}</span>
                            <span>•</span>
                            <span><i className="fa-regular fa-user mr-1"></i>{post.author}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors">{post.title}</h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                        <button className="text-brand-gold text-sm font-bold hover:underline flex items-center gap-1">
                            Read Article <i className="fa-solid fa-arrow-right text-xs"></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20 bg-brand-surface border border-white/10 rounded-2xl p-10 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-[80px]"></div>
             <div className="relative z-10">
                 <h2 className="text-2xl font-bold text-white mb-4">Subscribe to our Newsletter</h2>
                 <p className="text-gray-400 mb-8 max-w-lg mx-auto">Get the latest articles, tutorials, and exclusive offers sent directly to your inbox.</p>
                 <div className="flex max-w-md mx-auto gap-2">
                     <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="flex-1 bg-brand-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none"
                     />
                     <button className="bg-brand-gold text-black font-bold px-6 py-3 rounded-lg hover:bg-brand-gold-light transition-colors">
                        Subscribe
                     </button>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
}
