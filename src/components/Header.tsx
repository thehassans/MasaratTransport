"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function Header() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/#services", label: t("nav.services") },
    { href: "/#fleet", label: t("nav.fleet") },
    { href: "/#partners", label: t("nav.partners") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl shadow-black/50 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-24 w-auto">
              <Image
                src="/images/logo.webp"
                alt="Masarat Transportation"
                width={240}
                height={96}
                className="h-24 w-auto object-contain transition-opacity duration-300 group-hover:opacity-90"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#C9A84C] group-hover:w-3/4 transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 hover:border-[#C9A84C]/50 text-white/60 hover:text-[#C9A84C] transition-all duration-300 text-sm font-medium"
            >
              <Globe size={14} />
              <span>{lang === "en" ? "العربية" : "English"}</span>
            </button>

            <Link
              href="/contact"
              className="relative overflow-hidden px-5 py-2 rounded-full text-sm font-semibold text-[#0a0a0a] bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] hover:shadow-lg hover:shadow-[#C9A84C]/30 transition-all duration-300 group"
            >
              <span className="relative z-10">{t("nav.getQuote")}</span>
              <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        } bg-[#0a0a0a]/98 backdrop-blur-xl border-t border-white/5`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-3 border-t border-white/10 mt-2">
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/20 text-white/60 text-sm"
            >
              <Globe size={14} />
              {lang === "en" ? "العربية" : "English"}
            </button>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="px-5 py-2 rounded-full text-sm font-semibold text-[#0a0a0a] bg-gradient-to-r from-[#C9A84C] to-[#E8C96A]"
            >
              {t("nav.getQuote")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
