"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLang } from "@/context/LanguageContext";
import { X, ZoomIn, Shield, FileText, MapPin } from "lucide-react";

const documents = [
  {
    id: "logistics-1",
    titleEn: "Logistics Register",
    titleAr: "سجل اللوجستيه",
    subtitleEn: "Page 1 of 3",
    subtitleAr: "صفحة ١ من ٣",
    image: "/images/documents/logistics-register-1.jpg",
    category: "register",
  },
  {
    id: "logistics-2",
    titleEn: "Logistics Register",
    titleAr: "سجل اللوجستيه",
    subtitleEn: "Page 2 of 3",
    subtitleAr: "صفحة ٢ من ٣",
    image: "/images/documents/logistics-register-2.jpg",
    category: "register",
  },
  {
    id: "logistics-3",
    titleEn: "Logistics Register",
    titleAr: "سجل اللوجستيه",
    subtitleEn: "Page 3 of 3",
    subtitleAr: "صفحة ٣ من ٣",
    image: "/images/documents/logistics-register-3.jpg",
    category: "register",
  },
  {
    id: "license-1",
    titleEn: "Business License",
    titleAr: "الترخيص التجاري",
    subtitleEn: "Official License",
    subtitleAr: "الترخيص الرسمي",
    image: "/images/documents/license-1.jpg",
    category: "license",
  },
  {
    id: "national-address",
    titleEn: "National Address",
    titleAr: "العنوان الوطني",
    subtitleEn: "Verified Address",
    subtitleAr: "العنوان المعتمد",
    image: "/images/documents/national-address.png",
    category: "address",
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  register: <FileText className="w-4 h-4" />,
  license: <Shield className="w-4 h-4" />,
  address: <MapPin className="w-4 h-4" />,
};

const categoryColors: Record<string, string> = {
  register: "bg-blue-50 text-blue-600 border-blue-100",
  license: "bg-emerald-50 text-emerald-600 border-emerald-100",
  address: "bg-amber-50 text-amber-600 border-amber-100",
};

export default function DocumentsPage() {
  const { lang } = useLang();
  const [active, setActive] = useState<string | null>(null);

  const activeDoc = documents.find((d) => d.id === active);

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A84C]/6 rounded-full blur-[220px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase">
              {lang === "ar" ? "الوثائق الرسمية" : "Official Documents"}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#111111] mb-4">
            {lang === "ar" ? "وثائق الشركة" : "Business Documents"}
          </h1>
          <p className="text-[#777777] text-lg max-w-2xl mx-auto">
            {lang === "ar"
              ? "تحقق من تراخيصنا الرسمية وسجلاتنا التجارية المعتمدة"
              : "Verified licenses, commercial registrations and official certifications"}
          </p>
        </div>
      </section>

      {/* Trust bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: <Shield className="w-5 h-5 text-[#C9A84C]" />,
              en: "Government Certified",
              ar: "معتمد حكومياً",
            },
            {
              icon: <FileText className="w-5 h-5 text-[#C9A84C]" />,
              en: "Logistics Registered",
              ar: "مسجل لوجستياً",
            },
            {
              icon: <MapPin className="w-5 h-5 text-[#C9A84C]" />,
              en: "Verified National Address",
              ar: "عنوان وطني موثق",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#E8E3DB]"
            >
              <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/8 border border-[#C9A84C]/15 flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <span className="text-[#333333] font-semibold text-sm">
                {lang === "ar" ? item.ar : item.en}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Documents Grid */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setActive(doc.id)}
              className="group relative bg-white border border-[#E8E3DB] rounded-2xl overflow-hidden hover:border-[#C9A84C]/40 hover:shadow-xl hover:shadow-[#C9A84C]/8 transition-all duration-400 cursor-pointer"
            >
              {/* Top accent */}
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C9A84C]/0 to-transparent group-hover:via-[#C9A84C]/50 transition-all duration-500" />

              {/* Document preview */}
              <div className="relative h-64 bg-[#F4F2ED] overflow-hidden">
                <Image
                  src={doc.image}
                  alt={lang === "ar" ? doc.titleAr : doc.titleEn}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#111111]/0 group-hover:bg-[#111111]/10 transition-all duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/0 group-hover:bg-white/90 flex items-center justify-center transition-all duration-300 scale-50 group-hover:scale-100">
                    <ZoomIn className="w-5 h-5 text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                {/* Category badge */}
                <div className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${categoryColors[doc.category]}`}>
                  {categoryIcons[doc.category]}
                  {lang === "ar" ? doc.titleAr : doc.titleEn}
                </div>
              </div>

              {/* Card content */}
              <div className="p-5">
                <h3 className="text-[#111111] font-bold text-base mb-1 group-hover:text-[#C9A84C] transition-colors duration-300">
                  {lang === "ar" ? doc.titleAr : doc.titleEn}
                </h3>
                <p className="text-[#AAAAAA] text-xs">
                  {lang === "ar" ? doc.subtitleAr : doc.subtitleEn}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-[#C9A84C] text-xs font-semibold">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>{lang === "ar" ? "عرض بالحجم الكامل" : "View full size"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {active && activeDoc && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative bg-white rounded-2xl overflow-hidden shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E3DB] flex-shrink-0">
              <div>
                <h3 className="text-[#111111] font-bold text-base">
                  {lang === "ar" ? activeDoc.titleAr : activeDoc.titleEn}
                </h3>
                <p className="text-[#AAAAAA] text-xs mt-0.5">
                  {lang === "ar" ? activeDoc.subtitleAr : activeDoc.subtitleEn}
                </p>
              </div>
              <button
                onClick={() => setActive(null)}
                className="w-9 h-9 rounded-xl border border-[#E8E3DB] flex items-center justify-center text-[#888888] hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* Lightbox image */}
            <div className="relative flex-1 min-h-0 bg-[#F4F2ED] overflow-auto">
              <div className="relative w-full" style={{ minHeight: "500px" }}>
                <Image
                  src={activeDoc.image}
                  alt={lang === "ar" ? activeDoc.titleAr : activeDoc.titleEn}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
