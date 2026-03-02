"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function CTASection() {
  const { t, lang } = useLang();

  return (
    <section className="relative py-24 sm:py-32 bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/8 via-transparent to-[#C9A84C]/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A84C]/8 rounded-full blur-[180px]" />
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

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
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

        <p className="text-white/40 text-lg max-w-2xl mx-auto mb-12">
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
            href="tel:+966500000000"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/15 bg-white/5 text-white font-semibold text-sm tracking-wide hover:border-[#C9A84C]/40 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
          >
            <Phone size={16} className="text-[#C9A84C]" />
            <span>{lang === "ar" ? "اتصل بنا" : "Call Us Now"}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
