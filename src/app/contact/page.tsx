"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLang } from "@/context/LanguageContext";
import { Send, Phone, Mail, MapPin, CheckCircle } from "lucide-react";

const services = [
  { en: "Cargo Transportation", ar: "نقل البضائع" },
  { en: "Express Delivery", ar: "التوصيل السريع" },
  { en: "Heavy Haulage", ar: "نقل الأحمال الثقيلة" },
  { en: "Cold Chain Logistics", ar: "لوجستيات السلسلة الباردة" },
  { en: "Customs Clearance", ar: "التخليص الجمركي" },
  { en: "Live Tracking", ar: "التتبع المباشر" },
];

export default function ContactPage() {
  const { t, lang } = useLang();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", company: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-[#FAFAF8] border border-[#E8E3DB] rounded-xl px-4 py-3.5 text-[#111111] placeholder-[#BBBBBB] focus:outline-none focus:border-[#C9A84C]/60 focus:bg-white transition-all duration-300 text-sm";

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A84C]/8 rounded-full blur-[200px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase">
              {lang === "ar" ? "تواصل معنا" : "Contact Us"}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#111111] mb-4">
            {t("contact.title")}
          </h1>
          <p className="text-[#777777] text-lg max-w-2xl mx-auto">{t("contact.sub")}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info Cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {[
              {
                icon: Phone,
                label: lang === "ar" ? "اتصل بنا" : "Call Us",
                value: "+966 53 445 4300",
                href: "tel:+966534454300",
                sub: lang === "ar" ? "متاح 24/7" : "Available 24/7",
              },
              {
                icon: Mail,
                label: lang === "ar" ? "راسلنا" : "Email Us",
                value: "info@masarat.sa",
                href: "mailto:info@masarat.sa",
                sub: lang === "ar" ? "نرد خلال ساعة" : "We reply within 1 hour",
              },
              {
                icon: MapPin,
                label: lang === "ar" ? "موقعنا" : "Our Location",
                value: lang === "ar" ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia",
                href: "#",
                sub: lang === "ar" ? "المقر الرئيسي" : "Headquarters",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <a
                  key={i}
                  href={item.href}
                  className="group flex items-start gap-4 p-5 rounded-2xl border border-[#E8E3DB] bg-white hover:border-[#C9A84C]/40 hover:shadow-sm transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 group-hover:bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 border border-[#C9A84C]/15">
                    <Icon className="w-5 h-5 text-[#C9A84C]" />
                  </div>
                  <div>
                    <div className="text-[#888888] text-xs font-medium uppercase tracking-wider mb-1">
                      {item.label}
                    </div>
                    <div className="text-[#111111] font-semibold text-sm mb-0.5">{item.value}</div>
                    <div className="text-[#AAAAAA] text-xs">{item.sub}</div>
                  </div>
                </a>
              );
            })}

            {/* Decorative card */}
            <div className="flex-1 rounded-2xl border border-[#C9A84C]/20 bg-gradient-to-br from-[#C9A84C]/6 to-[#FAFAF8] p-6 mt-2">
              <div className="text-[#C9A84C] font-bold text-lg mb-2">
                {lang === "ar" ? "لماذا مسارات؟" : "Why Masarat?"}
              </div>
              <ul className="space-y-2.5">
                {(lang === "ar"
                  ? [
                      "أسطول سيتارا المعتمد",
                      "تتبع مباشر 24/7",
                      "تغطية شاملة للمملكة",
                      "فريق خبراء متخصص",
                    ]
                  : [
                      "Certified Sitara fleet",
                      "24/7 real-time tracking",
                      "Full Kingdom coverage",
                      "Expert dedicated team",
                    ]
                ).map((point, i) => (
                  <li key={i} className="flex items-center gap-2 text-[#666666] text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="relative bg-white border border-[#E8E3DB] rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent rounded-t-2xl" />

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/25 flex items-center justify-center mb-5">
                    <CheckCircle className="w-8 h-8 text-[#C9A84C]" />
                  </div>
                  <h3 className="text-[#111111] font-bold text-xl mb-3">
                    {lang === "ar" ? "تم الإرسال بنجاح!" : "Message Sent!"}
                  </h3>
                  <p className="text-[#777777] text-sm max-w-xs">{t("contact.success")}</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 px-5 py-2 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] text-sm hover:bg-[#C9A84C]/10 transition-colors duration-300"
                  >
                    {lang === "ar" ? "إرسال رسالة أخرى" : "Send Another"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#888888] text-xs font-medium uppercase tracking-wider mb-2">
                        {t("contact.name")} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder={lang === "ar" ? "محمد أحمد" : "John Smith"}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-[#888888] text-xs font-medium uppercase tracking-wider mb-2">
                        {t("contact.phone")} *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+966 5X XXX XXXX"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#888888] text-xs font-medium uppercase tracking-wider mb-2">
                        {t("contact.email")} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-[#888888] text-xs font-medium uppercase tracking-wider mb-2">
                        {t("contact.company")}
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder={lang === "ar" ? "اسم الشركة" : "Your Company"}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#888888] text-xs font-medium uppercase tracking-wider mb-2">
                      {t("contact.service")} *
                    </label>
                    <select
                      name="service"
                      required
                      title={t("contact.service")}
                      value={form.service}
                      onChange={handleChange}
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="" className="bg-white">
                        {t("contact.select")}
                      </option>
                      {services.map((s) => (
                        <option key={s.en} value={s.en} className="bg-white">
                          {lang === "ar" ? s.ar : s.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#888888] text-xs font-medium uppercase tracking-wider mb-2">
                      {t("contact.message")} *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder={
                        lang === "ar"
                          ? "اكتب تفاصيل طلبك هنا..."
                          : "Tell us about your shipment requirements..."
                      }
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-500 text-sm">{t("contact.error")}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group relative overflow-hidden w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] text-[#050505] font-bold text-sm tracking-wide hover:shadow-2xl hover:shadow-[#C9A84C]/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        {t("contact.sending")}
                      </span>
                    ) : (
                      <>
                        <Send size={16} />
                        {t("contact.send")}
                      </>
                    )}
                    <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
