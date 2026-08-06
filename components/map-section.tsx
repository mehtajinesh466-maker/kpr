"use client";

import { useState } from "react";
import { MapPin, Phone, Clock, Sparkles } from "lucide-react";

export function MapSection() {
  const [activeTab, setActiveTab] = useState<"mylapore" | "pallikaranai">("mylapore");

  const locations = {
    mylapore: {
      title: "Mylapore Head Office",
      address: "Near Amma Hotel, Alamelu Mangapuram, Mylapore, Chennai - 600004",
      phone: "+91 99419 87881",
      hours: "Mon - Sun: 9:00 AM - 8:00 PM",
      mapUrl: "https://maps.google.com/maps?q=KPR%20Chess%20Academy,%20Alamelu%20Mangapuram,%20Mylapore,%20Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed"
    },
    pallikaranai: {
      title: "Pallikaranai Branch",
      address: "No-10, Balaji Dental Clinic, Rajesh Nagar, 4th Cross Street, Pallikaranai, Chennai - 600100",
      phone: "+91 99419 87881",
      hours: "Mon - Sun: 9:00 AM - 8:00 PM",
      mapUrl: "https://maps.google.com/maps?q=KPR%20Chess%20Academy,%20Rajesh%20Nagar,%204th%20Cross%20Street,%20Pallikaranai,%20Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed"
    }
  };

  const activeLoc = locations[activeTab];

  return (
    <section className="py-20 px-6 bg-white overflow-hidden font-sans border-t border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7A0C0C]/10 border border-[#7A0C0C]/20 mb-4">
            <Sparkles size={14} className="text-[#7A0C0C]" />
            <span className="text-xs font-bold text-[#7A0C0C] uppercase tracking-wider">Locate Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none uppercase mb-4">
            Our <span className="text-[#7A0C0C]">Headquarters</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base font-medium">
            Visit our primary training centers. Choose a location below to view details and get directions.
          </p>
        </div>

        {/* Location Switcher Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab("mylapore")}
            className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
              activeTab === "mylapore"
                ? "bg-[#7A0C0C] text-[#FFB800] shadow-lg shadow-red-950/20"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Mylapore H.Q.
          </button>
          <button
            onClick={() => setActiveTab("pallikaranai")}
            className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
              activeTab === "pallikaranai"
                ? "bg-[#7A0C0C] text-[#FFB800] shadow-lg shadow-red-950/20"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Pallikaranai Center
          </button>
        </div>

        {/* Map & details card container */}
        <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-xl">
          {/* Details Column */}
          <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight border-b-2 border-[#7A0C0C] pb-2 w-fit">
                {activeLoc.title}
              </h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#7A0C0C]/10 border border-[#7A0C0C]/20 flex items-center justify-center text-[#7A0C0C] shrink-0 mt-1">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Address</h4>
                    <p className="text-sm font-bold text-slate-700 mt-1 leading-relaxed">{activeLoc.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#7A0C0C]/10 border border-[#7A0C0C]/20 flex items-center justify-center text-[#7A0C0C] shrink-0 mt-1">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Phone</h4>
                    <p className="text-sm font-bold text-slate-700 mt-1">{activeLoc.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#7A0C0C]/10 border border-[#7A0C0C]/20 flex items-center justify-center text-[#7A0C0C] shrink-0 mt-1">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Working Hours</h4>
                    <p className="text-sm font-bold text-slate-700 mt-1">{activeLoc.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              KPR Chess Academy Chennai
            </div>
          </div>

          {/* Map iframe Column */}
          <div className="lg:col-span-7 h-[350px] lg:h-[450px] relative w-full bg-slate-200">
            <iframe
              src={activeLoc.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
