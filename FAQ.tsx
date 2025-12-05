
import React, { useState } from 'react';
import { MOCK_FAQS } from './data';
import { PageView } from './types';

interface FAQProps {
  setPage?: (page: PageView) => void;
}

export default function FAQ({ setPage }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = MOCK_FAQS.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-brand-surface py-16 border-b border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-400 mb-8">Have questions? We're here to help.</p>
          <div className="max-w-2xl mx-auto relative">
             <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
             <input 
                type="text" 
                placeholder="Search for answers..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-brand-black border border-white/10 rounded-full py-3 pl-12 pr-4 text-white focus:border-brand-gold focus:outline-none transition-colors"
             />
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
               {filteredFAQs.map((faq, index) => (
                 <div key={faq.id} className="bg-brand-surface border border-white/5 rounded-lg overflow-hidden transition-all hover:border-brand-gold/30">
                    <button 
                       onClick={() => toggleFAQ(index)}
                       className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                    >
                       <div>
                          <span className="text-xs text-brand-gold uppercase font-bold tracking-wider mb-1 block">{faq.category}</span>
                          <span className="text-lg font-bold text-white">{faq.question}</span>
                       </div>
                       <i className={`fa-solid fa-chevron-down text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}></i>
                    </button>
                    <div 
                       className={`px-6 text-gray-400 leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                       {faq.answer}
                    </div>
                 </div>
               ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <i className="fa-regular fa-face-frown text-4xl text-gray-600 mb-4"></i>
              <h3 className="text-white font-bold mb-2">No results found</h3>
              <p className="text-gray-500">Try adjusting your search terms.</p>
            </div>
          )}

          {/* Contact CTA */}
          <div className="mt-16 text-center bg-brand-dark p-8 rounded-xl border border-white/10">
             <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
             <p className="text-gray-400 mb-6">Can't find the answer you're looking for? Please chat to our friendly team.</p>
             <button 
                onClick={() => setPage && setPage('contact')}
                className="bg-brand-gold text-black font-bold py-3 px-8 rounded hover:bg-brand-gold-light transition-colors"
             >
                Contact Support
             </button>
          </div>
        </div>
      </section>
    </div>
  );
}
