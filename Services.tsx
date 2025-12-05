
import React from 'react';
import { PageView } from './types';

interface ServicesProps {
  setPage?: (page: PageView) => void;
}

const SERVICES = [
  {
    id: 's1',
    name: 'Full Diagnostic',
    price: 150,
    duration: '2 Hours',
    description: 'Complete system analysis using state-of-the-art AI diagnostic tools.',
    icon: 'fa-laptop-code'
  },
  {
    id: 's2',
    name: 'Automation Installation',
    price: 500,
    duration: '1 Day',
    description: 'Professional installation of autopilot kits, sensors, and smart modules.',
    icon: 'fa-robot'
  },
  {
    id: 's3',
    name: 'ECU Remapping',
    price: 800,
    duration: '4 Hours',
    description: 'Performance tuning to optimize engine output and fuel efficiency.',
    icon: 'fa-gauge-high'
  },
  {
    id: 's4',
    name: 'General Maintenance',
    price: 200,
    duration: 'Variable',
    description: 'Oil change, brake inspection, and general vehicle health check.',
    icon: 'fa-screwdriver-wrench'
  }
];

export default function Services({ setPage }: ServicesProps) {
  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
       <h1 className="text-4xl font-bold text-white mb-4 border-l-4 border-brand-gold pl-4">Our Services</h1>
       <p className="text-gray-400 mb-12 max-w-2xl">
         Expert care for your vehicle. We combine traditional mechanics with modern software engineering.
       </p>

       <div className="grid md:grid-cols-2 gap-8">
         {SERVICES.map((service) => (
           <div key={service.id} className="bg-brand-surface p-8 rounded-xl border border-white/5 flex gap-6 hover:border-brand-gold/30 transition-all">
             <div className="shrink-0">
               <div className="w-16 h-16 bg-brand-dark rounded-lg flex items-center justify-center border border-brand-gold/20 text-brand-gold text-2xl">
                 <i className={`fa-solid ${service.icon}`}></i>
               </div>
             </div>
             <div className="flex-1">
               <div className="flex justify-between items-start mb-2">
                 <h3 className="text-xl font-bold text-white">{service.name}</h3>
                 <span className="text-brand-gold font-bold">${service.price}</span>
               </div>
               <p className="text-sm text-gray-500 mb-3"><i className="fa-regular fa-clock mr-2"></i>{service.duration}</p>
               <p className="text-gray-300 mb-6">{service.description}</p>
               <button 
                  onClick={() => setPage && setPage('contact')}
                  className="text-sm font-bold text-white bg-brand-gold/10 px-4 py-2 rounded hover:bg-brand-gold hover:text-brand-black transition-colors w-full md:w-auto"
               >
                 Book Appointment
               </button>
             </div>
           </div>
         ))}
       </div>

       {/* Booking CTA */}
       <div className="mt-16 bg-gradient-to-r from-brand-surface to-brand-dark p-10 rounded-2xl border border-brand-gold/20 text-center">
         <h2 className="text-2xl font-bold text-white mb-4">Need Custom Automation Work?</h2>
         <p className="text-gray-400 mb-6">Contact our specialists for bespoke vehicle modifications.</p>
         <button className="bg-brand-whatsapp hover:bg-brand-whatsapp-dark text-white font-bold py-3 px-8 rounded-full transition-colors flex items-center mx-auto gap-2">
           <i className="fa-brands fa-whatsapp text-xl"></i> Chat on WhatsApp
         </button>
       </div>
    </div>
  );
}
