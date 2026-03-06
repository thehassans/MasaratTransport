"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Phone, Mail, MapPin, Twitter } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

interface SocialLink {
  platform: string;
  url: string;
  enabled: boolean;
}

interface Settings {
  phone: string;
  email: string;
  address: string;
  addressAr: string;
  socialLinks: SocialLink[];
  footerTagline: string;
  footerTaglineAr: string;
}

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialIcons: Record<string, React.ReactNode> = {
  instagram: <Instagram className="w-5 h-5" />,
  whatsapp: <WhatsAppIcon />,
  facebook: <Facebook className="w-5 h-5" />,
  tiktok: <TikTokIcon />,
  twitter: <XIcon />,
};

const socialColors: Record<string, string> = {
  instagram: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500",
  whatsapp: "hover:bg-green-600",
  facebook: "hover:bg-blue-600",
  tiktok: "hover:bg-black",
  twitter: "hover:bg-[#1DA1F2]",
};

export default function Footer() {
  const { t, lang } = useLang();
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then(setSettings)
      .catch(() => {});
  }, []);

  const enabledSocials = settings?.socialLinks?.filter((s) => s.enabled) ?? [];

  return (
    <footer className="relative bg-[#F4F2ED] border-t border-[#E8E3DB] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C9A84C]/6 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C9A84C]/4 rounded-full blur-[150px] pointer-events-none" />

      {/* Top gold accent line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <Image
                src="/images/masarat-logo.png"
                alt="Masarat Transportation"
                width={280}
                height={112}
                className="h-28 w-auto object-contain"
              />
            </div>
            <p className="text-[#777777] text-sm leading-relaxed mb-6">
              {lang === "ar" ? settings?.footerTaglineAr : settings?.footerTagline}
            </p>
            {/* Social Links */}
            <div className="flex flex-wrap gap-2">
              {enabledSocials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-xl border border-[#E8E3DB] flex items-center justify-center text-[#888888] hover:text-white hover:border-transparent transition-all duration-300 ${socialColors[social.platform] ?? "hover:bg-[#333333]"}`}
                  aria-label={social.platform}
                >
                  {socialIcons[social.platform]}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#111111] font-semibold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-[#C9A84C]" />
              {t("footer.services")}
            </h4>
            <ul className="space-y-3">
              {[
                { label: t("services.cargo.title"), href: "/#services" },
                { label: t("services.express.title"), href: "/#services" },
                { label: t("services.heavy.title"), href: "/#services" },
                { label: t("services.cold.title"), href: "/#services" },
                { label: t("services.customs.title"), href: "/#services" },
                { label: t("services.tracking.title"), href: "/#services" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[#777777] hover:text-[#C9A84C] transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-[1px] bg-[#C9A84C] transition-all duration-300" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[#111111] font-semibold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-[#C9A84C]" />
              {t("footer.company_label")}
            </h4>
            <ul className="space-y-3">
              {[
                { label: t("footer.about"), href: "/" },
                { label: t("footer.careers"), href: "/contact" },
                { label: t("footer.news"), href: "/" },
                { label: t("nav.contact"), href: "/contact" },
                { label: lang === "ar" ? "وثائق الشركة" : "Documents", href: "/documents" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[#777777] hover:text-[#C9A84C] transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-[1px] bg-[#C9A84C] transition-all duration-300" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#111111] font-semibold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-[#C9A84C]" />
              {t("footer.contact")}
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+966592727115"
                  className="flex items-start gap-3 text-[#555555] hover:text-[#C9A84C] transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/10 group-hover:bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <Phone className="w-4 h-4 text-[#C9A84C]" />
                  </div>
                  <span className="text-sm pt-1.5">+966 59 272 7115</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+966555485326"
                  className="flex items-start gap-3 text-[#555555] hover:text-[#C9A84C] transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/10 group-hover:bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <Phone className="w-4 h-4 text-[#C9A84C]" />
                  </div>
                  <span className="text-sm pt-1.5">+966 55 548 5326</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:sales@masarattransport.com"
                  className="flex items-start gap-3 text-[#555555] hover:text-[#C9A84C] transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/10 group-hover:bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <Mail className="w-4 h-4 text-[#C9A84C]" />
                  </div>
                  <span className="text-sm pt-1.5 break-all">sales@masarattransport.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-[#555555]">
                  <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#C9A84C]" />
                  </div>
                  <span className="text-sm leading-relaxed">
                    {lang === "ar"
                      ? "مبنى رقم 8774، شارع الأمير عبدالعزيز بن مساعد بن جلوي، رقم فرعي 2949، حي السليمانية، الرمز البريدي 12234"
                      : "Building No 8774, Prince Abdulaziz Ibn Mussaed Ibn Jalawi, Secondary No 2949, Al Sulaimaniyah Dist., Postal Code 12234"}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#E8E3DB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#AAAAAA] text-xs">
            © {new Date().getFullYear()} {t("footer.company")}. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-1">
            <span className="text-[#BBBBBB] text-xs">Crafted with</span>
            <span className="text-[#C9A84C] text-xs mx-1">♦</span>
            <span className="text-[#BBBBBB] text-xs">in Saudi Arabia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
