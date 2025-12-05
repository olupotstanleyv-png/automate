
import React, { useState, useEffect } from 'react';
import { useTeam } from './store';
import { PublicTeamMember } from './types';

export default function Team() {
  const { teamMembers } = useTeam();
  const [activeDepartment, setActiveDepartment] = useState<string>('All');
  const [selectedMember, setSelectedMember] = useState<PublicTeamMember | null>(null);

  const departments = ['All', 'Management', 'Engineering', 'Service', 'Sales', 'Support'];
  
  // Filter active members only
  const publicMembers = teamMembers.filter(m => m.status === 'Active');
  
  const filteredMembers = activeDepartment === 'All' 
    ? publicMembers 
    : publicMembers.filter(m => m.department === activeDepartment);

  const featuredMember = publicMembers.find(m => m.isFeatured);

  // Close modal when clicking escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedMember(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="animate-fade-in pb-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-brand-dark overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
             src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop"
             alt="Team meeting" 
             className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Meet The <span className="text-brand-gold">Innovators</span></h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Our team of engineers, technicians, and visionaries is dedicated to transforming the way you drive.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        
        {/* Spotlight Section */}
        {featuredMember && (
          <div className="mb-20 bg-gradient-to-r from-brand-surface to-brand-black rounded-2xl overflow-hidden border border-brand-gold/20 shadow-xl relative group">
             <div className="absolute top-0 left-0 p-4 z-10">
                 <span className="bg-brand-gold text-brand-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-2 shadow-lg animate-pulse-slow">
                    <i className="fa-solid fa-star"></i> Spotlight
                 </span>
             </div>
             <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-auto relative overflow-hidden">
                    <img 
                        src={featuredMember.image} 
                        alt={featuredMember.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-brand-gold/10 mix-blend-overlay"></div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-white mb-2">{featuredMember.name}</h2>
                    <p className="text-brand-gold font-medium uppercase tracking-widest text-sm mb-6">{featuredMember.role}</p>
                    <p className="text-gray-300 leading-relaxed mb-8 text-lg">{featuredMember.bio}</p>
                    
                    <div className="flex flex-wrap gap-3 mb-8">
                        {featuredMember.yearsOfExperience !== undefined && (
                            <span className="bg-brand-gold/10 border border-brand-gold/30 px-3 py-1 rounded text-xs text-brand-gold flex items-center gap-2 font-bold">
                                <i className="fa-solid fa-clock-rotate-left"></i> {featuredMember.yearsOfExperience}+ Years Exp
                            </span>
                        )}
                        {featuredMember.certifications?.map((cert, idx) => (
                            <span key={idx} className="bg-white/5 border border-white/10 px-3 py-1 rounded text-xs text-gray-400 flex items-center gap-2">
                                <i className="fa-solid fa-certificate text-brand-gold"></i> {cert}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        {featuredMember.socialLinks.linkedin && (
                            <a href={featuredMember.socialLinks.linkedin} className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#0077b5] hover:text-white flex items-center justify-center transition-all text-gray-400">
                                <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                        )}
                        {featuredMember.socialLinks.twitter && (
                            <a href={featuredMember.socialLinks.twitter} className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#1DA1F2] hover:text-white flex items-center justify-center transition-all text-gray-400">
                                <i className="fa-brands fa-twitter"></i>
                            </a>
                        )}
                        {featuredMember.socialLinks.email && (
                            <a href={`mailto:${featuredMember.socialLinks.email}`} className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-gold hover:text-black flex items-center justify-center transition-all text-gray-400">
                                <i className="fa-solid fa-envelope"></i>
                            </a>
                        )}
                        <button onClick={() => setSelectedMember(featuredMember)} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded transition-colors ml-auto">
                           View Profile
                        </button>
                    </div>
                </div>
             </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
            {departments.map(dept => (
                <button
                    key={dept}
                    onClick={() => setActiveDepartment(dept)}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                        activeDepartment === dept 
                        ? 'bg-brand-gold text-brand-black shadow-lg shadow-brand-gold/20' 
                        : 'bg-brand-surface text-gray-400 hover:bg-white/10'
                    }`}
                >
                    {dept}
                </button>
            ))}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMembers.map(member => (
                <div 
                    key={member.id} 
                    className="bg-brand-surface rounded-xl overflow-hidden border border-white/5 hover:border-brand-gold/50 transition-all duration-300 group cursor-pointer hover:-translate-y-2 shadow-lg hover:shadow-brand-gold/10 flex flex-col h-full"
                    onClick={() => setSelectedMember(member)}
                >
                    <div className="h-64 relative overflow-hidden shrink-0">
                        <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent opacity-80"></div>
                        
                        {/* Overlay Badges */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2 items-end z-10">
                            {member.isFeatured && (
                                <span className="bg-brand-gold text-brand-black text-[10px] uppercase font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1">
                                    <i className="fa-solid fa-star"></i> Featured
                                </span>
                            )}
                            {member.yearsOfExperience !== undefined && (
                                <span className="bg-brand-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10 shadow-lg flex items-center gap-1">
                                    <i className="fa-solid fa-clock-rotate-left text-brand-gold"></i>
                                    {member.yearsOfExperience}+ Years
                                </span>
                            )}
                        </div>

                        <div className="absolute bottom-0 left-0 p-6">
                            <h3 className="text-xl font-bold text-white group-hover:text-brand-gold transition-colors">{member.name}</h3>
                            <p className="text-sm text-gray-400">{member.role}</p>
                        </div>
                    </div>
                    <div className="p-6 pt-2 flex flex-col flex-1">
                        <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-1">{member.bio}</p>
                        
                        {/* Social Links on Card */}
                        <div className="flex gap-3 mb-4 pl-1" onClick={(e) => e.stopPropagation()}>
                            {member.socialLinks?.linkedin && (
                                <a 
                                    href={member.socialLinks.linkedin} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-gray-500 hover:text-[#0077b5] transition-colors"
                                    title="LinkedIn"
                                >
                                    <i className="fa-brands fa-linkedin text-lg"></i>
                                </a>
                            )}
                            {member.socialLinks?.twitter && (
                                <a 
                                    href={member.socialLinks.twitter} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-gray-500 hover:text-[#1DA1F2] transition-colors"
                                    title="Twitter"
                                >
                                    <i className="fa-brands fa-twitter text-lg"></i>
                                </a>
                            )}
                            {member.socialLinks?.email && (
                                <a 
                                    href={`mailto:${member.socialLinks.email}`} 
                                    className="text-gray-500 hover:text-brand-gold transition-colors"
                                    title="Email"
                                >
                                    <i className="fa-solid fa-envelope text-lg"></i>
                                </a>
                            )}
                        </div>

                        <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                            <span className="text-xs text-gray-500 font-mono uppercase bg-white/5 px-2 py-1 rounded">{member.department}</span>
                            <span className="text-brand-gold text-sm hover:underline flex items-center gap-1">
                                View Profile <i className="fa-solid fa-arrow-right text-xs"></i>
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        {filteredMembers.length === 0 && (
            <div className="text-center py-20 bg-brand-surface rounded-xl border border-dashed border-white/10">
                <i className="fa-solid fa-users-slash text-4xl text-gray-600 mb-4"></i>
                <h3 className="text-xl font-bold text-white mb-2">No team members found</h3>
                <p className="text-gray-400">Try selecting a different department.</p>
            </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedMember && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={(e) => {
               if (e.target === e.currentTarget) setSelectedMember(null);
            }}
          >
              <div className="bg-brand-surface w-full max-w-4xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
                  
                  {/* Image Side */}
                  <div className="w-full md:w-2/5 h-64 md:h-auto relative">
                      <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent md:bg-gradient-to-r"></div>
                  </div>

                  {/* Content Side */}
                  <div className="w-full md:w-3/5 p-8 overflow-y-auto custom-scrollbar relative">
                      <button 
                        onClick={() => setSelectedMember(null)}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors z-20"
                      >
                          <i className="fa-solid fa-xmark"></i>
                      </button>

                      <div className="mb-6">
                          <h2 className="text-3xl font-bold text-white mb-1">{selectedMember.name}</h2>
                          <p className="text-brand-gold text-lg">{selectedMember.role}</p>
                          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-500">
                              <span className="bg-brand-dark px-2 py-1 rounded border border-white/5 font-bold uppercase tracking-wider">{selectedMember.department}</span>
                              {selectedMember.isFeatured && <span className="text-brand-gold flex items-center gap-1"><i className="fa-solid fa-star"></i> Featured</span>}
                              {selectedMember.yearsOfExperience !== undefined && (
                                <span className="bg-brand-surface border border-brand-gold/30 text-brand-gold px-2 py-1 rounded text-xs font-bold border-blue-500/20 flex items-center gap-1">
                                   <i className="fa-solid fa-clock-rotate-left"></i> {selectedMember.yearsOfExperience}+ Years Exp
                                </span>
                              )}
                          </div>
                      </div>

                      <div className="space-y-6">
                          <div>
                              <h4 className="text-white font-bold mb-2 border-b border-white/5 pb-1 uppercase text-xs tracking-wider text-gray-500">About</h4>
                              <p className="text-gray-300 leading-relaxed text-sm">{selectedMember.bio}</p>
                          </div>

                          {selectedMember.specializations && selectedMember.specializations.length > 0 && selectedMember.specializations[0] !== "" && (
                             <div>
                                <h4 className="text-white font-bold mb-2 border-b border-white/5 pb-1 uppercase text-xs tracking-wider text-gray-500">Specializations</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedMember.specializations.map((spec, idx) => (
                                        <span key={idx} className="bg-purple-500/10 text-purple-300 px-3 py-1 rounded text-xs border border-purple-500/20">
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                             </div>
                          )}

                          {selectedMember.certifications && selectedMember.certifications.length > 0 && selectedMember.certifications[0] !== "" && (
                             <div>
                                <h4 className="text-white font-bold mb-2 border-b border-white/5 pb-1 uppercase text-xs tracking-wider text-gray-500">Certifications & Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedMember.certifications.map((cert, idx) => (
                                        <span key={idx} className="bg-brand-gold/10 text-brand-gold px-3 py-1 rounded text-xs border border-brand-gold/20">
                                            {cert}
                                        </span>
                                    ))}
                                </div>
                             </div>
                          )}

                          <div className="mt-8 pt-6 border-t border-white/10">
                              <h4 className="text-white font-bold mb-3 uppercase text-xs tracking-wider text-gray-500">Connect</h4>
                              <div className="flex flex-wrap gap-4">
                                  {selectedMember.socialLinks.email && (
                                      <a href={`mailto:${selectedMember.socialLinks.email}`} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm bg-white/5 px-3 py-2 rounded hover:bg-white/10">
                                          <i className="fa-solid fa-envelope text-brand-gold"></i> Email
                                      </a>
                                  )}
                                  {selectedMember.socialLinks.linkedin && (
                                      <a href={selectedMember.socialLinks.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-[#0077b5] transition-colors text-sm bg-white/5 px-3 py-2 rounded hover:bg-white/10">
                                          <i className="fa-brands fa-linkedin"></i> LinkedIn
                                      </a>
                                  )}
                                  {selectedMember.socialLinks.twitter && (
                                      <a href={selectedMember.socialLinks.twitter} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-[#1DA1F2] transition-colors text-sm bg-white/5 px-3 py-2 rounded hover:bg-white/10">
                                          <i className="fa-brands fa-twitter"></i> Twitter
                                      </a>
                                  )}
                                  {selectedMember.portfolioLink && (
                                      <a href={selectedMember.portfolioLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-brand-gold transition-colors text-sm bg-white/5 px-3 py-2 rounded hover:bg-white/10">
                                          <i className="fa-solid fa-briefcase"></i> View Portfolio
                                      </a>
                                  )}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}
