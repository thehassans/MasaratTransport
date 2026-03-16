"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useLang } from "@/context/LanguageContext";

interface FleetItem {
  id: string;
  filename: string;
  tag: string;
  uploadedAt: string;
}

const STATIC_FALLBACK: FleetItem[] = [
  { id: "fleet1", filename: "fleet1.png", tag: "40T", uploadedAt: "" },
  { id: "fleet2", filename: "fleet2.png", tag: "EXPRESS", uploadedAt: "" },
];

export default function FleetSection() {
  const { t } = useLang();
  const [fleet, setFleet] = useState<FleetItem[]>(STATIC_FALLBACK);

  useEffect(() => {
    fetch("/api/fleet")
      .then((r) => r.json())
      .then((data: FleetItem[]) => { if (data.length > 0) setFleet(data); })
      .catch(() => {});
  }, []);

  return (
    <section id="fleet" className="relative py-24 sm:py-32 bg-[#FAFAF8] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#C9A84C]/8 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-[#C9A84C]/6 rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase">
              Sitara Fleet
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-[#111111] mb-4">{t("fleet.title")}</h2>
          <p className="text-[#777777] text-lg max-w-2xl mx-auto">{t("fleet.sub")}</p>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {fleet.map((vehicle) => (
            <div
              key={vehicle.id}
              className="group relative rounded-2xl overflow-hidden bg-white border border-[#E8E3DB] hover:border-[#C9A84C]/40 hover:shadow-lg hover:shadow-[#C9A84C]/8 transition-all duration-500 cursor-default"
            >
              {/* Image container */}
              <div className="relative h-52 overflow-hidden bg-[#F0EDE8]">
                <Image
                  src={`/images/fleet/${vehicle.filename}`}
                  alt={vehicle.tag}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 z-10"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAF8]/80 via-transparent to-transparent" />
                {/* Tag */}
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#C9A84C] rounded-md text-[#050505] text-[10px] font-black tracking-widest z-20">
                  {vehicle.tag}
                </div>
              </div>

              {/* Bottom gold line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/0 to-transparent group-hover:via-[#C9A84C]/60 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
