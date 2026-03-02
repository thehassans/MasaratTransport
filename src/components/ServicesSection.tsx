"use client";

import { Package, Zap, Truck, Thermometer, FileCheck, MapPin } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const services = [
  {
    icon: Package,
    titleKey: "services.cargo.title",
    descKey: "services.cargo.desc",
    accent: "#C9A84C",
  },
  {
    icon: Zap,
    titleKey: "services.express.title",
    descKey: "services.express.desc",
    accent: "#E8C96A",
  },
  {
    icon: Truck,
    titleKey: "services.heavy.title",
    descKey: "services.heavy.desc",
    accent: "#C9A84C",
  },
  {
    icon: Thermometer,
    titleKey: "services.cold.title",
    descKey: "services.cold.desc",
    accent: "#E8C96A",
  },
  {
    icon: FileCheck,
    titleKey: "services.customs.title",
    descKey: "services.customs.desc",
    accent: "#C9A84C",
  },
  {
    icon: MapPin,
    titleKey: "services.tracking.title",
    descKey: "services.tracking.desc",
    accent: "#E8C96A",
  },
];

export default function ServicesSection() {
  const { t } = useLang();

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-[#080808] overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C9A84C]/3 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase">
              What We Offer
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            {t("services.title")}
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">{t("services.sub")}</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className="group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 hover:border-[#C9A84C]/30 hover:bg-white/[0.06] transition-all duration-500 cursor-default overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                {/* Number */}
                <div className="absolute top-5 right-5 text-white/[0.04] text-5xl font-black select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Icon */}
                <div className="relative mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 group-hover:bg-[#C9A84C]/20 flex items-center justify-center transition-all duration-300 border border-[#C9A84C]/20">
                    <Icon className="w-5 h-5 text-[#C9A84C]" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-white font-bold text-lg mb-3 group-hover:text-[#E8C96A] transition-colors duration-300">
                  {t(service.titleKey)}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{t(service.descKey)}</p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/0 to-transparent group-hover:via-[#C9A84C]/60 transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
