import mongoose, { Document, Schema } from "mongoose";

export interface ISocialLink {
  platform: string;
  url: string;
  enabled: boolean;
}

export interface ISiteSettings extends Document {
  phone: string;
  email: string;
  address: string;
  addressAr: string;
  socialLinks: ISocialLink[];
  footerTagline: string;
  footerTaglineAr: string;
}

const SocialLinkSchema = new Schema<ISocialLink>({
  platform: { type: String, required: true },
  url: { type: String, default: "" },
  enabled: { type: Boolean, default: true },
});

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    phone: { type: String, default: "+966 50 000 0000" },
    email: { type: String, default: "info@masarat.sa" },
    address: { type: String, default: "Riyadh, Saudi Arabia" },
    addressAr: { type: String, default: "الرياض، المملكة العربية السعودية" },
    socialLinks: {
      type: [SocialLinkSchema],
      default: [
        { platform: "instagram", url: "https://instagram.com/masarat", enabled: true },
        { platform: "whatsapp", url: "https://wa.me/966500000000", enabled: true },
        { platform: "facebook", url: "https://facebook.com/masarat", enabled: true },
        { platform: "tiktok", url: "https://tiktok.com/@masarat", enabled: true },
        { platform: "twitter", url: "https://x.com/masarat", enabled: true },
      ],
    },
    footerTagline: { type: String, default: "Delivering Excellence Across the Kingdom" },
    footerTaglineAr: { type: String, default: "نوصل التميز في جميع أنحاء المملكة" },
  },
  { timestamps: true }
);

export default mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
