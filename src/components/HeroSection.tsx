"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const stats = [
  { key: "hero.stat1", value: "50K+", delay: 0 },
  { key: "hero.stat2", value: "120+", delay: 100 },
  { key: "hero.stat3", value: "500+", delay: 200 },
  { key: "hero.stat4", value: "15+", delay: 300 },
];

export default function HeroSection() {
  const { t, lang } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const show = () => setVideoLoaded(true);

    video.addEventListener("canplay", show);
    video.addEventListener("loadedmetadata", show);
    video.load();
    video.play().catch(() => {});

    // fallback: show after 2s regardless
    const timer = setTimeout(show, 2000);
    return () => {
      video.removeEventListener("canplay", show);
      video.removeEventListener("loadedmetadata", show);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-50" : "opacity-0"
          }`}
          poster="/images/hero-poster.webp"
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.webm" type="video/webm; codecs=vp9" />
        </video>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/40" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 z-0 hero-grid" />

      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#C9A84C]/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#C9A84C]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className={`max-w-4xl ${lang === "ar" ? "text-right" : "text-left"}`}>
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 mb-8 animate-fade-in`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
            <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase">
              {lang === "ar" ? "شبكة النقل الرائدة" : "Saudi Arabia's #1 Logistics Network"}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-black leading-[1.05] mb-6">
            <span className="block text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
              {t("hero.tagline")}
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] via-[#E8C96A] to-[#C9A84C] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mt-1">
              {t("hero.tagline2")}
            </span>
          </h1>

          {/* Sub */}
          <p className="text-white/50 text-base sm:text-lg max-w-2xl leading-relaxed mb-10">
            {t("hero.sub")}
          </p>

          {/* CTAs */}
          <div className={`flex flex-wrap gap-4 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
            <Link
              href="/contact"
              className="group relative overflow-hidden inline-flex items-center gap-3 px-7 py-4 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] text-[#050505] font-bold text-sm tracking-wide hover:shadow-2xl hover:shadow-[#C9A84C]/30 transition-all duration-300"
            >
              <span>{t("hero.cta1")}</span>
              <ArrowRight
                size={16}
                className={`transition-transform duration-300 group-hover:translate-x-1 ${lang === "ar" ? "rotate-180" : ""}`}
              />
              <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </Link>

            <a
              href="#fleet"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full border border-white/15 bg-white/5 text-white font-semibold text-sm tracking-wide hover:border-[#C9A84C]/40 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#C9A84C]/50 transition-colors duration-300">
                <Play size={12} className="text-[#C9A84C] ml-0.5" />
              </div>
              <span>{t("hero.cta2")}</span>
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px mt-20 bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#050505] hover:bg-[#0d0d0d] transition-colors duration-300 p-6 sm:p-8 text-center group"
            >
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#E8C96A] to-[#C9A84C] mb-2 group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-white/35 text-xs font-medium tracking-wider uppercase">
                {t(stat.key)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[#C9A84C] animate-bounce mt-1" />
        </div>
      </div>
    </section>
  );
}
