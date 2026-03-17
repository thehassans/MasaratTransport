import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export const runtime = "nodejs";

const DATA_DIR = path.join(process.cwd(), "public", "data");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

const DEFAULT_SETTINGS = {
  phone1: "+966 55 548 5326",
  phone2: "+966 59 272 7115",
  email: "sales@masarattransport.com",
  address: "Building No 8774, Prince Abdulaziz Ibn Mussaed Ibn Jalawi, Secondary No 2949, Al Sulaimaniyah Dist., Postal Code 12234, Riyadh, Kingdom of Saudi Arabia",
  addressAr: "\u0645\u0628\u0646\u0649 \u0631\u0642\u0645 8774\u060c \u0634\u0627\u0631\u0639 \u0627\u0644\u0623\u0645\u064a\u0631 \u0639\u0628\u062f\u0627\u0644\u0639\u0632\u064a\u0632 \u0628\u0646 \u0645\u0633\u0627\u0639\u062f \u0628\u0646 \u062c\u0644\u0648\u064a\u060c \u0631\u0642\u0645 \u0641\u0631\u0639\u064a 2949\u060c \u062d\u064a \u0627\u0644\u0633\u0644\u064a\u0645\u0627\u0646\u064a\u0629\u060c \u0627\u0644\u0631\u0645\u0632 \u0627\u0644\u0628\u0631\u064a\u062f\u064a 12234\u060c \u0627\u0644\u0631\u064a\u0627\u0636\u060c \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629",
  footerTagline: "Delivering Excellence Across the Kingdom",
  footerTaglineAr: "\u0646\u0648\u0635\u0644 \u0627\u0644\u062a\u0645\u064a\u0632 \u0641\u064a \u062c\u0645\u064a\u0639 \u0623\u0646\u062d\u0627\u0621 \u0627\u0644\u0645\u0645\u0644\u0643\u0629",
  heroTaglineEn: "Kingdom's Premier",
  heroTagline2En: "Transportation Network",
  heroSubEn: "Delivering cargo across Saudi Arabia with precision, safety, and unmatched reliability using our Sitara fleet.",
  heroTaglineAr: "\u0634\u0628\u0643\u0629 \u0627\u0644\u0646\u0642\u0644",
  heroTagline2Ar: "\u0627\u0644\u0631\u0627\u0626\u062f\u0629 \u0641\u064a \u0627\u0644\u0645\u0645\u0644\u0643\u0629",
  heroSubAr: "\u0646\u0642\u0644 \u0627\u0644\u0628\u0636\u0627\u0626\u0639 \u0639\u0628\u0631 \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629 \u0628\u062f\u0642\u0629 \u0648\u0623\u0645\u0627\u0646 \u0648\u0645\u0648\u062b\u0648\u0642\u064a\u0629 \u0644\u0627 \u0645\u062b\u064a\u0644 \u0644\u0647\u0627.",
  statDeliveriesValue: "50K+",
  statCitiesValue: "50+",
  statFleetValue: "100+",
  statYearsValue: "10+",
  socialLinks: [
    { platform: "instagram", url: "https://instagram.com/masarat", enabled: true },
    { platform: "whatsapp", url: "https://wa.me/966555485326", enabled: true },
    { platform: "facebook", url: "https://facebook.com/masarat", enabled: true },
    { platform: "tiktok", url: "https://tiktok.com/@masarat", enabled: true },
    { platform: "twitter", url: "https://x.com/masarat", enabled: true },
  ],
};

async function readSettings() {
  try {
    const content = await readFile(SETTINGS_FILE, "utf-8");
    return { ...DEFAULT_SETTINGS, ...JSON.parse(content) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export async function GET() {
  const settings = await readSettings();
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const current = await readSettings();
    const updated = { ...current, ...body };
    if (!existsSync(DATA_DIR)) await mkdir(DATA_DIR, { recursive: true });
    await writeFile(SETTINGS_FILE, JSON.stringify(updated, null, 2), "utf-8");
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Save failed: " + (err as Error).message }, { status: 500 });
  }
}
