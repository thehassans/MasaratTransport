"use client";

import Image from "next/image";
import { useLang } from "@/context/LanguageContext";

const partners = [
  { name: "UCIC", logo: "/images/partners/ucic.png" },
  { name: "Al Jaber", logo: "/images/partners/al-jaber.png" },
  { name: "Gulf Cartoon", logo: "/images/partners/gulfcartoon.png" },
  { name: "Green Vision", logo: "/images/partners/greenvision.jpeg" },
];

export default function PartnersSection() {
  const { t } = useLang();

  return (
    <section id="partners" className="relative py-24 bg-[#F4F2ED] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
          <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase">
            Trusted By
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-[#111111] mb-4">{t("partners.title")}</h2>
        <p className="text-[#777777] text-lg max-w-2xl mx-auto">{t("partners.sub")}</p>
      </div>

      {/* Marquee container */}
      <div className="relative overflow-hidden">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#F4F2ED] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#F4F2ED] to-transparent pointer-events-none" />

        {/* Marquee track */}
        <div className="flex gap-6 partners-marquee">
          {[...partners, ...partners, ...partners].map((partner, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-48 h-24 rounded-xl border border-[#E8E3DB] bg-white hover:border-[#C9A84C]/40 hover:shadow-sm transition-all duration-300 flex items-center justify-center px-6 group"
            >
              <div className="relative w-full h-10">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain transition-all duration-300"
                  onError={() => {}}
                />
                {/* Fallback text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[#BBBBBB] text-xs font-semibold tracking-wider group-hover:text-[#888888] transition-colors duration-300">
                    {partner.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
