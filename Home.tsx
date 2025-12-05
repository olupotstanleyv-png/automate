
import React from 'react';
import { PageView } from './types';
import { useTeam } from './store';

interface HomeProps {
  setPage: (page: PageView) => void;
}

export default function Home({ setPage }: HomeProps) {
  const { teamMembers } = useTeam();
  // Get 3 random or top team members for preview
  const previewTeam = teamMembers.filter(m => m.status === 'Active').slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop" 
            alt="Luxury Car Dashboard" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-2xl">
            <h2 className="text-brand-gold font-bold tracking-widest text-sm uppercase mb-4">The Future of Driving</h2>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Your Trusted Partner in <span className="gold-gradient-text">Automotive Technology</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-xl">
              From advanced automation kits to expert repair services and premium vehicle sales. Experience the next generation of car maintenance and customization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setPage('shop')}
                className="px-8 py-4 bg-brand-gold text-brand-black font-bold uppercase tracking-wider hover:bg-brand-gold-light transition-all rounded"
              >
                Shop Products
              </button>
              <button 
                onClick={() => setPage('services')}
                className="px-8 py-4 border border-brand-gold text-brand-gold font-bold uppercase tracking-wider hover:bg-brand-gold/10 transition-all rounded"
              >
                Book Service
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-brand-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-brand-surface p-8 rounded-lg border border-white/5 hover:border-brand-gold/30 transition-all group">
              <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-gold/20 transition-colors">
                <i className="fa-solid fa-microchip text-brand-gold text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Car Automation</h3>
              <p className="text-gray-400">Cutting-edge parts and accessories to upgrade your vehicle's intelligence and performance.</p>
            </div>

            <div className="bg-brand-surface p-8 rounded-lg border border-white/5 hover:border-brand-gold/30 transition-all group">
              <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-gold/20 transition-colors">
                <i className="fa-solid fa-wrench text-brand-gold text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Expert Repairs</h3>
              <p className="text-gray-400">Certified technicians specializing in both mechanical repairs and software diagnostics.</p>
            </div>

            <div className="bg-brand-surface p-8 rounded-lg border border-white/5 hover:border-brand-gold/30 transition-all group">
              <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-gold/20 transition-colors">
                <i className="fa-solid fa-car text-brand-gold text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Vehicle Sales</h3>
              <p className="text-gray-400">Browse our curated selection of high-performance and automated vehicles for sale.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Preview */}
      <section className="py-20 bg-brand-dark border-y border-white/5">
         <div className="container mx-auto px-4">
             <div className="flex justify-between items-end mb-12">
                 <div>
                     <h2 className="text-brand-gold font-bold tracking-widest text-sm uppercase mb-3">Our Experts</h2>
                     <h2 className="text-3xl font-extrabold text-white">Meet The Team</h2>
                 </div>
                 <button onClick={() => setPage('team')} className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
                     View All <i className="fa-solid fa-arrow-right"></i>
                 </button>
             </div>
             
             <div className="grid md:grid-cols-3 gap-8">
                 {previewTeam.map(member => (
                     <div key={member.id} className="group cursor-pointer" onClick={() => setPage('team')}>
                         <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                             <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                             <div className="absolute inset-0 bg-brand-gold/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         </div>
                         <h3 className="text-xl font-bold text-white group-hover:text-brand-gold transition-colors">{member.name}</h3>
                         <p className="text-sm text-gray-500 uppercase tracking-wide">{member.role}</p>
                     </div>
                 ))}
             </div>
         </div>
      </section>

      {/* AUTOMOTIVE TECH WORKFLOW SECTION */}
      <section className="py-24 bg-brand-black relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
           <div className="absolute top-10 left-10 w-64 h-64 bg-brand-gold rounded-full blur-[128px]"></div>
           <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-gold rounded-full blur-[128px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-brand-gold font-bold tracking-widest text-sm uppercase mb-3">Operational Excellence</h2>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">Your Trusted Partner in Automotive Tech</h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
               We combine transparency, automation, and expert care to deliver a seamless repair and service experience. 
               From booking to handover, every step is optimized for your peace of mind.
            </p>
          </div>

          <div className="space-y-12">
              
              {/* Phase 1: Booking & Intake */}
              <div className="bg-brand-surface border border-white/5 rounded-2xl p-8 md:p-10 hover:border-brand-gold/20 transition-all relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold/50"></div>
                  <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                     <span className="w-12 h-12 rounded-full bg-brand-gold text-brand-black flex items-center justify-center text-xl font-bold">1</span>
                     Booking & Intake
                  </h3>
                  <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                      <div className="relative pl-6 border-l-2 border-white/10 group-hover:border-brand-gold/50 transition-colors">
                          <h4 className="text-brand-gold font-bold mb-2 text-lg">Service Inquiry</h4>
                          <p className="text-sm text-gray-400 leading-relaxed">
                            Booking via App or Web. System validates vehicle details (VIN, Make) and generates a unique Ticket ID instantly.
                          </p>
                      </div>
                      <div className="relative pl-6 border-l-2 border-white/10 group-hover:border-brand-gold/50 transition-colors">
                          <h4 className="text-brand-gold font-bold mb-2 text-lg">Confirmation</h4>
                          <p className="text-sm text-gray-400 leading-relaxed">
                            Instant admin approval. Optional prepayment via PayPal or Mobile Money. Real-time updates via WhatsApp/SMS.
                          </p>
                      </div>
                      <div className="relative pl-6 border-l-2 border-white/10 group-hover:border-brand-gold/50 transition-colors">
                          <h4 className="text-brand-gold font-bold mb-2 text-lg">Vehicle Drop-off</h4>
                          <p className="text-sm text-gray-400 leading-relaxed">
                            Digital condition logging upon arrival. Photos and initial diagnostics are uploaded to your account immediately.
                          </p>
                      </div>
                  </div>
              </div>

              {/* Phase 2: Expert Execution */}
              <div className="bg-brand-surface border border-white/5 rounded-2xl p-8 md:p-10 hover:border-blue-500/30 transition-all relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50"></div>
                  <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                     <span className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">2</span>
                     Expert Execution
                  </h3>
                  <div className="grid md:grid-cols-4 gap-8">
                      <div className="relative pl-6 border-l-2 border-white/10 group-hover:border-blue-500/50 transition-colors">
                          <h4 className="text-blue-400 font-bold mb-2 text-lg">Smart Diagnostics</h4>
                          <p className="text-sm text-gray-400 leading-relaxed">
                            AI-assisted system checks identify issues. Cost estimates and repair plans are auto-generated for your approval.
                          </p>
                      </div>
                      <div className="relative pl-6 border-l-2 border-white/10 group-hover:border-blue-500/50 transition-colors">
                          <h4 className="text-blue-400 font-bold mb-2 text-lg">Parts Management</h4>
                          <p className="text-sm text-gray-400 leading-relaxed">
                            Automated inventory checks reserve specific parts for your job, preventing delays and ensuring compatibility.
                          </p>
                      </div>
                      <div className="relative pl-6 border-l-2 border-white/10 group-hover:border-blue-500/50 transition-colors">
                          <h4 className="text-blue-400 font-bold mb-2 text-lg">Precision Repair</h4>
                          <p className="text-sm text-gray-400 leading-relaxed">
                            Certified technicians perform work. Labor hours and tasks are logged in real-time for full transparency.
                          </p>
                      </div>
                      <div className="relative pl-6 border-l-2 border-white/10 group-hover:border-blue-500/50 transition-colors">
                          <h4 className="text-blue-400 font-bold mb-2 text-lg">Quality Control</h4>
                          <p className="text-sm text-gray-400 leading-relaxed">
                            Rigorous post-repair testing and supervisor inspection. Photos of completed work uploaded before handover.
                          </p>
                      </div>
                  </div>
              </div>

              {/* Phase 3: Completion & Care */}
              <div className="bg-brand-surface border border-white/5 rounded-2xl p-8 md:p-10 hover:border-green-500/30 transition-all relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-500/50"></div>
                  <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                     <span className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold">3</span>
                     Completion & Care
                  </h3>
                  <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                      <div className="relative pl-6 border-l-2 border-white/10 group-hover:border-green-500/50 transition-colors">
                          <h4 className="text-green-400 font-bold mb-2 text-lg">Notification & Pay</h4>
                          <p className="text-sm text-gray-400 leading-relaxed">
                             Receive final service report and detailed invoice. Pay securely online or at the counter before pickup.
                          </p>
                      </div>
                      <div className="relative pl-6 border-l-2 border-white/10 group-hover:border-green-500/50 transition-colors">
                          <h4 className="text-green-400 font-bold mb-2 text-lg">Vehicle Handover</h4>
                          <p className="text-sm text-gray-400 leading-relaxed">
                             Vehicle returned clean with full service history documentation. You confirm satisfaction before leaving.
                          </p>
                      </div>
                      <div className="relative pl-6 border-l-2 border-white/10 group-hover:border-green-500/50 transition-colors">
                          <h4 className="text-green-400 font-bold mb-2 text-lg">Feedback & Loyalty</h4>
                          <p className="text-sm text-gray-400 leading-relaxed">
                             Automated post-service survey. Earn loyalty points for future discounts and receive smart maintenance reminders.
                          </p>
                      </div>
                  </div>
              </div>

              {/* Admin Foundation */}
              <div className="bg-gradient-to-r from-brand-black to-brand-surface border border-white/10 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg relative overflow-hidden">
                 <div className="absolute right-0 top-0 bottom-0 w-32 bg-brand-gold/5 blur-xl"></div>
                 <div className="flex items-center gap-6 z-10">
                    <div className="w-16 h-16 bg-brand-dark/50 rounded-full flex items-center justify-center text-brand-gold text-2xl border border-white/10">
                        <i className="fa-solid fa-chart-pie"></i>
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-xl mb-1">Powered by Advanced Analytics</h4>
                        <p className="text-sm text-gray-400 max-w-lg">
                           Step 11: We use data to track technician productivity, inventory usage, and customer satisfaction, ensuring continuous operational improvement.
                        </p>
                    </div>
                 </div>
                 <button onClick={() => setPage('about')} className="text-brand-gold hover:text-white font-bold text-sm border-b border-brand-gold hover:border-white transition-all pb-1 z-10">
                    Learn about our Technology <i className="fa-solid fa-arrow-right ml-2"></i>
                 </button>
              </div>

          </div>

        </div>
      </section>

      {/* Integrated Features (Summary) */}
      <section className="py-20 bg-brand-black border-t border-white/5">
        <div className="container mx-auto px-4">
           <div className="grid md:grid-cols-3 gap-6">
             <div className="bg-brand-surface p-6 rounded-lg border border-white/10 hover:border-brand-gold/50 transition-colors text-center">
                <i className="fa-solid fa-comments text-3xl text-brand-gold mb-4"></i>
                <h4 className="text-white font-bold mb-2">Integrated Communication</h4>
                <p className="text-sm text-gray-400">Automated notifications and chat support for seamless updates.</p>
             </div>
             <div className="bg-brand-surface p-6 rounded-lg border border-white/10 hover:border-brand-gold/50 transition-colors text-center">
                <i className="fa-solid fa-robot text-3xl text-brand-gold mb-4"></i>
                <h4 className="text-white font-bold mb-2">AI Automation</h4>
                <p className="text-sm text-gray-400">Predictive maintenance and repetitive task automation.</p>
             </div>
             <div className="bg-brand-surface p-6 rounded-lg border border-white/10 hover:border-brand-gold/50 transition-colors text-center">
                <i className="fa-solid fa-scale-balanced text-3xl text-brand-gold mb-4"></i>
                <h4 className="text-white font-bold mb-2">Compliance Ready</h4>
                <p className="text-sm text-gray-400">Built-in checks for privacy, payments, and document validity.</p>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
}
