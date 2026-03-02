"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Lang = "en" | "ar";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations: Record<string, Record<string, string>> = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.fleet": "Fleet",
    "nav.partners": "Partners",
    "nav.contact": "Contact Us",
    "nav.getQuote": "Get a Quote",
    // Hero
    "hero.tagline": "Kingdom's Premier",
    "hero.tagline2": "Transportation Network",
    "hero.sub": "Delivering cargo across Saudi Arabia with precision, safety, and unmatched reliability using our Sitara fleet.",
    "hero.cta1": "Request Shipment",
    "hero.cta2": "Explore Fleet",
    "hero.stat1": "Deliveries",
    "hero.stat2": "Cities Covered",
    "hero.stat3": "Fleet Vehicles",
    "hero.stat4": "Years Experience",
    // Services
    "services.title": "Our Services",
    "services.sub": "Comprehensive logistics solutions tailored for the Kingdom's demands",
    "services.cargo.title": "Cargo Transportation",
    "services.cargo.desc": "Full-truck and part-truck loads handled with care across all Saudi regions.",
    "services.express.title": "Express Delivery",
    "services.express.desc": "Time-critical shipments delivered within guaranteed windows.",
    "services.heavy.title": "Heavy Haulage",
    "services.heavy.desc": "Specialized transport for oversized and overweight cargo with permits.",
    "services.cold.title": "Cold Chain Logistics",
    "services.cold.desc": "Temperature-controlled transport ensuring product integrity.",
    "services.customs.title": "Customs Clearance",
    "services.customs.desc": "End-to-end customs documentation and clearance support.",
    "services.tracking.title": "Live Tracking",
    "services.tracking.desc": "Real-time GPS tracking and updates throughout every journey.",
    // Fleet
    "fleet.title": "Our Sitara Fleet",
    "fleet.sub": "State-of-the-art vehicles engineered for performance and reliability",
    "fleet.vehicle1": "Sitara Heavy Hauler",
    "fleet.vehicle1.desc": "40-ton capacity for large industrial cargo",
    "fleet.vehicle2": "Sitara Express Van",
    "fleet.vehicle2.desc": "Fast urban delivery across city centers",
    "fleet.vehicle3": "Sitara Refrigerated Truck",
    "fleet.vehicle3.desc": "Cold chain certified transport",
    "fleet.vehicle4": "Sitara Flatbed",
    "fleet.vehicle4.desc": "Open-deck transport for machinery & steel",
    // Partners
    "partners.title": "Our Trusted Partners",
    "partners.sub": "Collaborating with industry leaders across the Kingdom",
    // Contact
    "contact.title": "Get In Touch",
    "contact.sub": "Ready to move your cargo? Our team is available 24/7.",
    "contact.name": "Full Name",
    "contact.email": "Email Address",
    "contact.phone": "Phone Number",
    "contact.company": "Company (Optional)",
    "contact.service": "Service Required",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.success": "Message sent successfully! We'll be in touch soon.",
    "contact.error": "Something went wrong. Please try again.",
    "contact.select": "Select a service",
    // Footer
    "footer.rights": "All rights reserved.",
    "footer.company": "Masarat Transportation Co.",
    "footer.services": "Services",
    "footer.company_label": "Company",
    "footer.about": "About Us",
    "footer.careers": "Careers",
    "footer.news": "News & Updates",
    "footer.followUs": "Follow Us",
    "footer.contact": "Contact",
  },
  ar: {
    // Nav
    "nav.home": "الرئيسية",
    "nav.services": "خدماتنا",
    "nav.fleet": "أسطولنا",
    "nav.partners": "شركاؤنا",
    "nav.contact": "تواصل معنا",
    "nav.getQuote": "احصل على عرض",
    // Hero
    "hero.tagline": "الشبكة الرائدة للنقل",
    "hero.tagline2": "في المملكة العربية السعودية",
    "hero.sub": "نوصل البضائع عبر المملكة بدقة وأمان وموثوقية لا مثيل لها باستخدام أسطول سيتارا.",
    "hero.cta1": "طلب شحنة",
    "hero.cta2": "استكشف الأسطول",
    "hero.stat1": "عملية توصيل",
    "hero.stat2": "مدينة مغطاة",
    "hero.stat3": "مركبة في الأسطول",
    "hero.stat4": "سنوات خبرة",
    // Services
    "services.title": "خدماتنا",
    "services.sub": "حلول لوجستية شاملة مصممة لمتطلبات المملكة",
    "services.cargo.title": "نقل البضائع",
    "services.cargo.desc": "حمولات كاملة وجزئية يتم التعامل معها بعناية في جميع مناطق المملكة.",
    "services.express.title": "التوصيل السريع",
    "services.express.desc": "شحنات حرجة يتم تسليمها ضمن نوافذ زمنية مضمونة.",
    "services.heavy.title": "نقل الأحمال الثقيلة",
    "services.heavy.desc": "نقل متخصص للبضائع ذات الأحجام والأوزان الزائدة مع التصاريح اللازمة.",
    "services.cold.title": "لوجستيات السلسلة الباردة",
    "services.cold.desc": "نقل بتحكم في درجة الحرارة لضمان سلامة المنتج.",
    "services.customs.title": "التخليص الجمركي",
    "services.customs.desc": "دعم متكامل لوثائق وتخليص الجمارك.",
    "services.tracking.title": "التتبع المباشر",
    "services.tracking.desc": "تتبع GPS في الوقت الفعلي وتحديثات طوال كل رحلة.",
    // Fleet
    "fleet.title": "أسطول سيتارا",
    "fleet.sub": "مركبات متطورة مصممة للأداء والموثوقية",
    "fleet.vehicle1": "سيتارا للأحمال الثقيلة",
    "fleet.vehicle1.desc": "طاقة استيعابية 40 طناً للبضائع الصناعية الكبيرة",
    "fleet.vehicle2": "سيتارا إكسبرس",
    "fleet.vehicle2.desc": "توصيل حضري سريع عبر المراكز المدنية",
    "fleet.vehicle3": "سيتارا المبرد",
    "fleet.vehicle3.desc": "نقل معتمد بالسلسلة الباردة",
    "fleet.vehicle4": "سيتارا المسطحة",
    "fleet.vehicle4.desc": "نقل مفتوح للآلات والصلب",
    // Partners
    "partners.title": "شركاؤنا الموثوقون",
    "partners.sub": "نتعاون مع رواد الصناعة في جميع أنحاء المملكة",
    // Contact
    "contact.title": "تواصل معنا",
    "contact.sub": "مستعد لنقل بضاعتك؟ فريقنا متاح على مدار الساعة.",
    "contact.name": "الاسم الكامل",
    "contact.email": "البريد الإلكتروني",
    "contact.phone": "رقم الهاتف",
    "contact.company": "الشركة (اختياري)",
    "contact.service": "الخدمة المطلوبة",
    "contact.message": "الرسالة",
    "contact.send": "إرسال الرسالة",
    "contact.sending": "جارٍ الإرسال...",
    "contact.success": "تم إرسال الرسالة بنجاح! سنتواصل معك قريباً.",
    "contact.error": "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    "contact.select": "اختر خدمة",
    // Footer
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.company": "شركة مسارات للنقل",
    "footer.services": "الخدمات",
    "footer.company_label": "الشركة",
    "footer.about": "من نحن",
    "footer.careers": "الوظائف",
    "footer.news": "أخبار وتحديثات",
    "footer.followUs": "تابعنا",
    "footer.contact": "التواصل",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("masarat_lang") as Lang;
    if (saved === "ar" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("masarat_lang", l);
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = l;
  };

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string) => translations[lang][key] ?? translations["en"][key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir: lang === "ar" ? "rtl" : "ltr" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
