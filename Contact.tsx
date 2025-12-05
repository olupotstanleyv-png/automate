
import React, { useState } from 'react';
import { PageView, SupportTicket } from './types';
import { useContact } from './store';

interface ContactProps {
  setPage: (page: PageView) => void;
}

export default function Contact({ setPage }: ContactProps) {
  const { addTicket } = useContact();
  const [formData, setFormData] = useState({
     name: '',
     email: '',
     phone: '',
     subject: '',
     message: '',
     category: 'Inquiry'
  });
  const [submitted, setSubmitted] = useState<string | null>(null); // Stores Ticket ID
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     if(!formData.name || !formData.email || !formData.message) return;
     
     setLoading(true);
     // Simulate network delay
     await new Promise(r => setTimeout(r, 1500));
     
     const newTicket: SupportTicket = {
         id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
         customerName: formData.name,
         email: formData.email,
         phone: formData.phone,
         subject: formData.subject || 'No Subject',
         message: formData.message,
         status: 'Open',
         priority: 'Medium',
         category: formData.category as any,
         createdAt: new Date().toISOString(),
         replies: []
     };
     
     addTicket(newTicket);
     setSubmitted(newTicket.id);
     setLoading(false);
  };

  if (submitted) {
     return (
        <div className="container mx-auto px-4 py-20 animate-fade-in text-center max-w-2xl">
           <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-3xl text-black mx-auto mb-6">
              <i className="fa-solid fa-check"></i>
           </div>
           <h1 className="text-3xl font-bold text-white mb-4">Message Sent!</h1>
           <p className="text-gray-400 mb-6">
              Thank you for contacting us. We have received your inquiry and created a support ticket.
           </p>
           <div className="bg-brand-surface p-6 rounded-lg border border-white/5 inline-block text-left mb-8">
              <div className="text-sm text-gray-500 uppercase mb-1">Ticket Reference ID</div>
              <div className="text-2xl font-mono text-brand-gold font-bold">{submitted}</div>
              <p className="text-xs text-gray-500 mt-2">Please save this ID for future correspondence.</p>
           </div>
           <div>
              <button 
                 onClick={() => setPage('home')}
                 className="bg-brand-gold text-brand-black font-bold py-3 px-8 rounded hover:bg-brand-gold-light transition-colors"
              >
                 Return Home
              </button>
           </div>
        </div>
     );
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <h1 className="text-4xl font-bold text-white mb-8 border-l-4 border-brand-gold pl-4">Contact Us</h1>
      
      <div className="grid lg:grid-cols-2 gap-12">
         {/* Contact Info Side */}
         <div>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
               Have a question about our products, services, or your order? Our support team is here to assist you 24/7. Fill out the form or reach us via the channels below.
            </p>
            
            <div className="grid gap-6">
               <div className="bg-brand-surface p-6 rounded-xl border border-white/5 flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-dark rounded-full flex items-center justify-center text-brand-gold text-xl shrink-0">
                     <i className="fa-solid fa-phone"></i>
                  </div>
                  <div>
                     <h3 className="text-white font-bold text-lg mb-1">Phone Support</h3>
                     <p className="text-gray-400">+1 (555) 123-4567</p>
                     <p className="text-xs text-gray-500 mt-1">Mon-Fri 9am-6pm PST</p>
                  </div>
               </div>

               <div className="bg-brand-surface p-6 rounded-xl border border-white/5 flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-dark rounded-full flex items-center justify-center text-brand-gold text-xl shrink-0">
                     <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div>
                     <h3 className="text-white font-bold text-lg mb-1">Email</h3>
                     <p className="text-gray-400">support@carautomate.inc</p>
                     <p className="text-xs text-gray-500 mt-1">Responses within 24 hours</p>
                  </div>
               </div>

               <div className="bg-brand-surface p-6 rounded-xl border border-white/5 flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-dark rounded-full flex items-center justify-center text-brand-gold text-xl shrink-0">
                     <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                     <h3 className="text-white font-bold text-lg mb-1">Headquarters</h3>
                     <p className="text-gray-400">123 Tech Drive, Silicon Valley, CA 94000</p>
                  </div>
               </div>
            </div>
            
            <div className="mt-10">
               <h3 className="text-white font-bold mb-4">Follow Us</h3>
               <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded bg-white/5 hover:bg-brand-gold hover:text-black flex items-center justify-center transition-colors text-gray-400"><i className="fa-brands fa-facebook-f"></i></a>
                  <a href="#" className="w-10 h-10 rounded bg-white/5 hover:bg-brand-gold hover:text-black flex items-center justify-center transition-colors text-gray-400"><i className="fa-brands fa-twitter"></i></a>
                  <a href="#" className="w-10 h-10 rounded bg-white/5 hover:bg-brand-gold hover:text-black flex items-center justify-center transition-colors text-gray-400"><i className="fa-brands fa-instagram"></i></a>
                  <a href="#" className="w-10 h-10 rounded bg-white/5 hover:bg-brand-gold hover:text-black flex items-center justify-center transition-colors text-gray-400"><i className="fa-brands fa-linkedin-in"></i></a>
               </div>
            </div>
         </div>

         {/* Form Side */}
         <div className="bg-brand-surface p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="block text-xs text-gray-500 uppercase mb-1">Name *</label>
                     <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-brand-dark border border-white/10 rounded p-3 text-white focus:border-brand-gold focus:outline-none transition-colors"
                        placeholder="John Doe"
                     />
                  </div>
                  <div>
                     <label className="block text-xs text-gray-500 uppercase mb-1">Phone</label>
                     <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-brand-dark border border-white/10 rounded p-3 text-white focus:border-brand-gold focus:outline-none transition-colors"
                        placeholder="+1 (555)..."
                     />
                  </div>
               </div>

               <div>
                  <label className="block text-xs text-gray-500 uppercase mb-1">Email *</label>
                  <input 
                     type="email" 
                     required
                     value={formData.email}
                     onChange={e => setFormData({...formData, email: e.target.value})}
                     className="w-full bg-brand-dark border border-white/10 rounded p-3 text-white focus:border-brand-gold focus:outline-none transition-colors"
                     placeholder="john@example.com"
                  />
               </div>

               <div>
                  <label className="block text-xs text-gray-500 uppercase mb-1">Category</label>
                  <select 
                     value={formData.category}
                     onChange={e => setFormData({...formData, category: e.target.value})}
                     className="w-full bg-brand-dark border border-white/10 rounded p-3 text-white focus:border-brand-gold focus:outline-none transition-colors"
                  >
                     <option value="Inquiry">General Inquiry</option>
                     <option value="Support">Technical Support</option>
                     <option value="Sales">Sales & Orders</option>
                     <option value="Complaint">Complaint</option>
                     <option value="Feedback">Feedback</option>
                  </select>
               </div>

               <div>
                  <label className="block text-xs text-gray-500 uppercase mb-1">Subject</label>
                  <input 
                     type="text" 
                     value={formData.subject}
                     onChange={e => setFormData({...formData, subject: e.target.value})}
                     className="w-full bg-brand-dark border border-white/10 rounded p-3 text-white focus:border-brand-gold focus:outline-none transition-colors"
                     placeholder="How can we help?"
                  />
               </div>

               <div>
                  <label className="block text-xs text-gray-500 uppercase mb-1">Message *</label>
                  <textarea 
                     rows={5}
                     required
                     value={formData.message}
                     onChange={e => setFormData({...formData, message: e.target.value})}
                     className="w-full bg-brand-dark border border-white/10 rounded p-3 text-white focus:border-brand-gold focus:outline-none transition-colors resize-none"
                     placeholder="Describe your issue or question..."
                  />
               </div>

               <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-gold text-brand-black font-bold py-4 rounded hover:bg-brand-gold-light transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
               >
                  {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-paper-plane"></i>}
                  {loading ? 'Sending...' : 'Send Message'}
               </button>
            </form>
         </div>
      </div>
    </div>
  );
}