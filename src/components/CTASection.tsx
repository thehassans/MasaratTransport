"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, FileText, Shield, MapPin } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function CTASection() {
  const { t, lang } = useLang();

  return (
    <section className="relative py-24 sm:py-32 bg-[#F4F2ED] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/6 via-transparent to-[#C9A84C]/3" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A84C]/8 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-[#C9A84C]/20 to-[#E8C96A]/20 rounded-full blur-xl" />
          <div className="relative border border-[#C9A84C]/30 bg-[#C9A84C]/10 px-4 py-2 rounded-full">
            <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase">
              {lang === "ar" ? "ابدأ الآن" : "Ready to Ship?"}
            </span>
          </div>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#111111] mb-6 leading-tight">
          {lang === "ar" ? (
            <>
              ابدأ شحنتك{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] to-[#E8C96A]">
                اليوم
              </span>
            </>
          ) : (
            <>
              Move Your Cargo{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] to-[#E8C96A]">
                With Confidence
              </span>
            </>
          )}
        </h2>

        <p className="text-[#777777] text-lg max-w-2xl mx-auto mb-12">
          {lang === "ar"
            ? "تواصل مع فريقنا المتخصص للحصول على عرض مخصص لاحتياجاتك اللوجستية."
            : "Contact our expert team for a custom quote tailored to your logistics needs."}
        </p>

        <div className={`flex flex-wrap gap-4 justify-center ${lang === "ar" ? "flex-row-reverse" : ""}`}>
          <Link
            href="/contact"
            className="group relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] text-[#050505] font-bold text-sm tracking-wide hover:shadow-2xl hover:shadow-[#C9A84C]/30 transition-all duration-300"
          >
            <span>{t("nav.getQuote")}</span>
            <ArrowRight size={16} className={`transition-transform duration-300 group-hover:translate-x-1 ${lang === "ar" ? "rotate-180" : ""}`} />
            <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </Link>
          <a
            href="tel:+966592727115"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#E8E3DB] bg-white text-[#333333] font-semibold text-sm tracking-wide hover:border-[#C9A84C]/50 hover:bg-[#FAFAF8] transition-all duration-300 shadow-sm"
          >
            <Phone size={16} className="text-[#C9A84C]" />
            <span>{lang === "ar" ? "اتصل بنا" : "Call Us Now"}</span>
          </a>
        </div>

        {/* Documents strip */}
        <div className="mt-16 pt-12 border-t border-[#E8E3DB]/60">
          <p className="text-[#AAAAAA] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            {lang === "ar" ? "وثائق معتمدة" : "Verified Business Documents"}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { img: "/images/documents/logistics-register-1.jpg", icon: <FileText className="w-3.5 h-3.5" />, label: lang === "ar" ? "سجل اللوجستيه 1" : "Logistics Register 1" },
              { img: "/images/documents/logistics-register-2.jpg", icon: <FileText className="w-3.5 h-3.5" />, label: lang === "ar" ? "سجل اللوجستيه 2" : "Logistics Register 2" },
              { img: "/images/documents/logistics-register-3.jpg", icon: <FileText className="w-3.5 h-3.5" />, label: lang === "ar" ? "سجل اللوجستيه 3" : "Logistics Register 3" },
              { img: "/images/documents/license-1.jpg", icon: <Shield className="w-3.5 h-3.5" />, label: lang === "ar" ? "الترخيص التجاري" : "Business License" },
              { img: "/images/documents/national-address.png", icon: <MapPin className="w-3.5 h-3.5" />, label: lang === "ar" ? "العنوان الوطني" : "National Address" },
            ].map((doc, i) => (
              <Link
                key={i}
                href="/documents"
                className="group flex flex-col items-center gap-2 cursor-pointer"
              >
                <div className="relative w-20 h-24 rounded-xl overflow-hidden border border-[#E8E3DB] bg-white group-hover:border-[#C9A84C]/40 group-hover:shadow-lg group-hover:shadow-[#C9A84C]/10 transition-all duration-300">
                  <Image
                    src={doc.img}
                    alt={doc.label}
                    fill
                    className="object-contain p-1.5 group-hover:scale-105 transition-transform duration-400"
                  />
                  <div className="absolute inset-0 bg-[#C9A84C]/0 group-hover:bg-[#C9A84C]/5 transition-all duration-300" />
                </div>
                <span className="flex items-center gap-1 text-[#AAAAAA] group-hover:text-[#C9A84C] text-[10px] font-medium transition-colors duration-300">
                  {doc.icon}
                  {doc.label}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/documents"
              className="inline-flex items-center gap-2 text-[#C9A84C] text-sm font-semibold hover:underline underline-offset-4 transition-all duration-200"
            >
              {lang === "ar" ? "عرض جميع الوثائق" : "View all documents"}
              <ArrowRight size={14} className={lang === "ar" ? "rotate-180" : ""} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
