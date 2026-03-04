import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Masarat Transportation — Kingdom's Premier Logistics Network",
  description:
    "Masarat Transportation delivers cargo across Saudi Arabia with precision, safety, and unmatched reliability using our Sitara fleet.",
  keywords: "transportation, logistics, cargo, Saudi Arabia, Sitara, شحن, نقل",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-[#FAFAF8] text-[#111111]`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
