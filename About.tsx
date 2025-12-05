
import React from 'react';
import { PageView } from './types';
import { ABOUT_MILESTONES, ABOUT_TEAM, ABOUT_AWARDS } from './data';

interface AboutProps {
  setPage?: (page: PageView) => void;
}

export default function About({ setPage }: AboutProps) {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-24 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/90 to-transparent"></div>
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2070&auto=format&fit=crop" 
            alt="Car Automate Workshop" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h4 className="text-brand-gold font-bold tracking-widest uppercase mb-4">Who We Are</h4>
            <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
              Revolutionizing the <span className="text-brand-gold">Automotive Experience</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              At Car Automate Inc, we bridge the gap between traditional mechanics and futuristic technology. 
              We believe every vehicle has the potential to be smarter, safer, and more exciting to drive.
            </p>
            <div className="flex gap-4">
               <button onClick={() => setPage && setPage('contact')} className="bg-brand-gold text-black font-bold py-3 px-8 rounded hover:bg-brand-gold-light transition-colors">
                  Contact Us
               </button>
               <button onClick={() => setPage && setPage('services')} className="border border-white/20 text-white font-bold py-3 px-8 rounded hover:bg-white/5 transition-colors">
                  Our Services
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-brand-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-brand-surface p-8 rounded-xl border border-white/5 hover:border-brand-gold/30 transition-colors">
              <div className="w-14 h-14 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold text-2xl mb-6">
                <i className="fa-solid fa-bullseye"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-400 leading-relaxed">
                To provide accessible, high-tech automotive solutions that enhance safety and performance for drivers worldwide.
              </p>
            </div>

            <div className="bg-brand-surface p-8 rounded-xl border border-white/5 hover:border-brand-gold/30 transition-colors">
              <div className="w-14 h-14 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold text-2xl mb-6">
                <i className="fa-solid fa-eye"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-400 leading-relaxed">
                A world where vehicle maintenance is proactive, automation is standard, and driving is pure joy.
              </p>
            </div>

            <div className="bg-brand-surface p-8 rounded-xl border border-white/5 hover:border-brand-gold/30 transition-colors">
              <div className="w-14 h-14 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold text-2xl mb-6">
                <i className="fa-solid fa-gem"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Our Values</h3>
              <p className="text-gray-400 leading-relaxed">
                Innovation, Transparency, and Integrity. We treat every car as if it were our own.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-brand-dark border-y border-white/5">
         <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-16 text-center">Our Journey</h2>
            <div className="max-w-4xl mx-auto relative">
               {/* Vertical Line */}
               <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-gold/20 -translate-x-1/2"></div>
               
               <div className="space-y-12">
                  {ABOUT_MILESTONES.map((milestone, idx) => (
                     <div key={idx} className={`flex flex-col md:flex-row items-center gap-8 relative ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                        {/* Dot */}
                        <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-brand-gold rounded-full -translate-x-1/2 border-4 border-brand-black z-10"></div>
                        
                        {/* Content */}
                        <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 text-left'}`}>
                           <span className="text-brand-gold font-bold text-xl block mb-2">{milestone.year}</span>
                           <h3 className="text-white font-bold text-lg mb-2">{milestone.title}</h3>
                           <p className="text-gray-400 text-sm">{milestone.description}</p>
                        </div>
                        <div className="w-full md:w-1/2 hidden md:block"></div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-brand-black">
        <div className="container mx-auto px-4">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Meet The Team</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">The brilliant minds powering Car Automate Inc.</p>
           </div>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ABOUT_TEAM.map(member => (
                 <div key={member.id} className="group bg-brand-surface rounded-xl overflow-hidden border border-white/5 hover:border-brand-gold/30 transition-all">
                    <div className="h-64 overflow-hidden relative">
                       <div className="absolute inset-0 bg-brand-gold/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay"></div>
                       <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="p-6 text-center">
                       <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                       <p className="text-brand-gold text-sm font-medium mb-4 uppercase tracking-wide">{member.role}</p>
                       <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                       <div className="flex justify-center gap-4 mt-6">
                          <a href="#" className="text-gray-500 hover:text-brand-gold"><i className="fa-brands fa-linkedin"></i></a>
                          <a href="#" className="text-gray-500 hover:text-brand-gold"><i className="fa-brands fa-twitter"></i></a>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* Awards & Certifications */}
      <section className="py-20 bg-brand-surface border-t border-white/5">
         <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-12">Awards & Recognition</h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
               {ABOUT_AWARDS.map(award => (
                  <div key={award.id} className="flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
                     <div className="w-20 h-20 bg-brand-dark rounded-full flex items-center justify-center text-brand-gold text-3xl mb-4 border border-white/10">
                        <i className={`fa-solid ${award.icon}`}></i>
                     </div>
                     <h3 className="text-white font-bold text-sm">{award.title}</h3>
                     <p className="text-xs text-gray-500">{award.issuer} • {award.year}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-brand-gold/10 to-transparent">
         <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to work with us?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
               Whether you need a simple tune-up or a complete automation overhaul, our team is ready to help.
            </p>
            <button onClick={() => setPage && setPage('contact')} className="bg-brand-gold text-black font-bold py-3 px-10 rounded-full hover:bg-brand-gold-light transition-all shadow-lg shadow-brand-gold/20">
               Get in Touch
            </button>
         </div>
      </section>
    </div>
  );
}
