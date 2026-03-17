"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  LogOut, Users, Settings, Eye, Trash2, CheckCircle,
  MessageSquare, Phone, Mail, Building2, Calendar,
  Save, Instagram, Facebook, ToggleLeft, ToggleRight, Shield,
  Truck, Video, Upload, Plus, X, AlertCircle, Loader2,
} from "lucide-react";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}

interface SocialLink {
  platform: string;
  url: string;
  enabled: boolean;
}

interface FleetItem {
  id: string;
  filename: string;
  tag: string;
  uploadedAt: string;
}

interface SiteSettings {
  phone1: string;
  phone2: string;
  email: string;
  address: string;
  addressAr: string;
  footerTagline: string;
  footerTaglineAr: string;
  heroTaglineEn: string;
  heroTagline2En: string;
  heroSubEn: string;
  heroTaglineAr: string;
  heroTagline2Ar: string;
  heroSubAr: string;
  statDeliveriesValue: string;
  statCitiesValue: string;
  statFleetValue: string;
  statYearsValue: string;
  socialLinks: SocialLink[];
}

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const WAIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26C.16 5.335 4.595.001 10.05.001c2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const platformIcons: Record<string, React.ReactNode> = {
  instagram: <Instagram className="w-4 h-4" />,
  whatsapp: <WAIcon />,
  facebook: <Facebook className="w-4 h-4" />,
  tiktok: <TikTokIcon />,
  twitter: <XIcon />,
};
const platformLabels: Record<string, string> = {
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  facebook: "Facebook",
  tiktok: "TikTok",
  twitter: "X (Twitter)",
};
const statusColors = {
  new: "bg-blue-50 text-blue-600 border-blue-200",
  read: "bg-amber-50 text-amber-600 border-amber-200",
  replied: "bg-green-50 text-green-600 border-green-200",
};

const inputClass =
  "w-full bg-[#F4F2ED] border border-[#E0DBD3] rounded-xl px-4 py-3 text-[#111111] placeholder-[#BBBBBB] focus:outline-none focus:border-[#C9A84C]/60 focus:bg-white transition-all duration-300 text-sm";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"contacts" | "settings" | "fleet" | "banner">("contacts");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fleet state
  const [fleetItems, setFleetItems] = useState<FleetItem[]>([]);
  const [fleetTag, setFleetTag] = useState("");
  const [fleetFile, setFleetFile] = useState<File | null>(null);
  const [fleetUploading, setFleetUploading] = useState(false);
  const [fleetMsg, setFleetMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Banner state
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerUploading, setBannerUploading] = useState(false);
  const [bannerMsg, setBannerMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) { setAuthed(true); } 
    else { setLoginError("Invalid password."); }
  };

  const loadData = async () => {
    const [cRes, sRes, fRes] = await Promise.all([
      fetch("/api/contact"),
      fetch("/api/settings"),
      fetch("/api/fleet"),
    ]);
    if (cRes.ok) setContacts(await cRes.json());
    if (sRes.ok) setSettings(await sRes.json());
    if (fRes.ok) setFleetItems(await fRes.json());
  };

  const uploadFleetCar = async () => {
    if (!fleetFile || !fleetTag.trim()) {
      setFleetMsg({ type: "error", text: "Please select an image and enter a tag (e.g. 40T)." });
      return;
    }
    setFleetUploading(true);
    setFleetMsg(null);
    try {
      const fd = new FormData();
      fd.append("image", fleetFile);
      fd.append("tag", fleetTag.trim());
      const res = await fetch("/api/admin/fleet", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) {
        setFleetItems((p) => [...p, data.item]);
        setFleetFile(null);
        setFleetTag("");
        setFleetMsg({ type: "success", text: "Fleet car added and converted to WebP!" });
      } else {
        setFleetMsg({ type: "error", text: data.error || "Upload failed." });
      }
    } catch {
      setFleetMsg({ type: "error", text: "Network error. Please try again." });
    } finally {
      setFleetUploading(false);
    }
  };

  const deleteFleetCar = async (id: string) => {
    const res = await fetch("/api/admin/fleet", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setFleetItems((p) => p.filter((f) => f.id !== id));
  };

  const uploadBannerVideo = async () => {
    if (!bannerFile) {
      setBannerMsg({ type: "error", text: "Please select a video file." });
      return;
    }
    setBannerUploading(true);
    setBannerMsg(null);
    try {
      const fd = new FormData();
      fd.append("video", bannerFile);
      const res = await fetch("/api/admin/banner", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) {
        setBannerFile(null);
        setBannerMsg({ type: "success", text: data.message || "Banner video updated!" });
      } else {
        setBannerMsg({ type: "error", text: data.error || "Upload failed." });
      }
    } catch {
      setBannerMsg({ type: "error", text: "Network error. Please try again." });
    } finally {
      setBannerUploading(false);
    }
  };

  useEffect(() => { if (authed) loadData(); }, [authed]);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/contact/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setContacts((p) => p.map((c) => c._id === id ? { ...c, status: status as Contact["status"] } : c));
    if (selectedContact?._id === id) setSelectedContact((p) => p ? { ...p, status: status as Contact["status"] } : null);
  };

  const deleteContact = async (id: string) => {
    await fetch(`/api/contact/${id}`, { method: "DELETE" });
    setContacts((p) => p.filter((c) => c._id !== id));
    if (selectedContact?._id === id) setSelectedContact(null);
  };

  const saveSettings = async () => {
    if (!settings) return;
    setSaving(true);
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    if (res.ok) { setSettingsSaved(true); setTimeout(() => setSettingsSaved(false), 3000); }
    setSaving(false);
  };

  const updateSocial = (platform: string, field: "url" | "enabled", value: string | boolean) => {
    setSettings((p) => p ? {
      ...p,
      socialLinks: p.socialLinks.map((s) => s.platform === platform ? { ...s, [field]: value } : s),
    } : p);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#F4F2ED] flex items-center justify-center px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A84C]/8 rounded-full blur-[150px]" />
        </div>
        <div className="w-full max-w-md">
          <div className="relative bg-white border border-[#E8E3DB] rounded-2xl p-8 shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent rounded-t-2xl" />
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#C9A84C]" />
              </div>
              <div>
                <div className="text-[#111111] font-bold">Admin Panel</div>
                <div className="text-[#AAAAAA] text-xs">Masarat Transportation</div>
              </div>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[#888888] text-xs font-medium uppercase tracking-wider mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className={inputClass}
                  autoFocus
                />
                {loginError && <p className="text-red-500 text-xs mt-2">{loginError}</p>}
              </div>
              <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] text-[#050505] font-bold text-sm hover:shadow-lg transition-all duration-300">
                Access Admin Panel
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F2ED] text-[#111111] flex">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 bottom-0 w-60 bg-white border-r border-[#E8E3DB] flex flex-col z-40 shadow-sm">
        <div className="p-5 border-b border-[#E8E3DB]">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C] to-[#8B6914] rounded-lg rotate-45" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-black text-sm z-10">م</span>
              </div>
            </div>
            <div>
              <div className="text-[#111111] font-bold text-sm">MASARAT</div>
              <div className="text-[#C9A84C] text-[9px] tracking-widest">ADMIN PANEL</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: "contacts" as const, icon: Users, label: "Contact Submissions", badge: contacts.filter((c) => c.status === "new").length },
            { id: "settings" as const, icon: Settings, label: "Site Settings", badge: 0 },
            { id: "fleet" as const, icon: Truck, label: "Fleet Management", badge: 0 },
            { id: "banner" as const, icon: Video, label: "Banner Video", badge: 0 },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id ? "bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20" : "text-[#888888] hover:text-[#111111] hover:bg-[#F4F2ED]"
                }`}>
                <Icon size={16} />
                {item.label}
                {item.badge > 0 && (
                  <span className="ml-auto bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-[#E8E3DB]">
          <button onClick={async () => { await fetch("/api/admin/login", { method: "DELETE" }); setAuthed(false); }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[#AAAAAA] hover:text-red-500 hover:bg-red-50 text-sm transition-all duration-200">
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="ml-60 flex-1 p-8">
        {/* CONTACTS TAB */}
        {activeTab === "contacts" && (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-black text-[#111111] mb-1">Contact Submissions</h1>
              <p className="text-[#888888] text-sm">{contacts.length} total submissions</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-2 space-y-3 max-h-[75vh] overflow-y-auto pr-1">
                {contacts.length === 0 ? (
                  <div className="text-center py-16 text-[#CCCCCC]">
                    <MessageSquare className="w-8 h-8 mx-auto mb-3 opacity-40" />
                    <p>No submissions yet</p>
                  </div>
                ) : contacts.map((c) => (
                  <div key={c._id}
                    onClick={() => { setSelectedContact(c); if (c.status === "new") updateStatus(c._id, "read"); }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      selectedContact?._id === c._id
                        ? "border-[#C9A84C]/40 bg-[#C9A84C]/5"
                        : "border-[#E8E3DB] bg-white hover:border-[#C9A84C]/30 hover:shadow-sm"
                    }`}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="font-semibold text-sm text-[#111111]">{c.name}</div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusColors[c.status]}`}>{c.status}</span>
                    </div>
                    <div className="text-[#888888] text-xs mb-0.5">{c.service}</div>
                    <div className="text-[#AAAAAA] text-xs">{new Date(c.createdAt).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-3">
                {selectedContact ? (
                  <div className="relative bg-white border border-[#E8E3DB] rounded-2xl p-6 shadow-sm">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent rounded-t-2xl" />
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-[#111111] mb-1">{selectedContact.name}</h2>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColors[selectedContact.status]}`}>{selectedContact.status}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => updateStatus(selectedContact._id, "replied")}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs hover:bg-green-500/20 transition-colors">
                          <CheckCircle size={12} /> Mark Replied
                        </button>
                        <button onClick={() => deleteContact(selectedContact._id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs hover:bg-red-500/20 transition-colors">
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      {[
                        { icon: Mail, label: "Email", value: selectedContact.email },
                        { icon: Phone, label: "Phone", value: selectedContact.phone },
                        { icon: Building2, label: "Company", value: selectedContact.company || "—" },
                        { icon: Calendar, label: "Date", value: new Date(selectedContact.createdAt).toLocaleString() },
                      ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <div key={i} className="bg-[#F4F2ED] rounded-xl p-3 border border-[#E8E3DB]">
                            <div className="flex items-center gap-1.5 mb-1">
                              <Icon className="w-3 h-3 text-[#C9A84C]" />
                              <span className="text-[#AAAAAA] text-[10px] uppercase tracking-wider">{item.label}</span>
                            </div>
                            <div className="text-[#111111] text-sm font-medium truncate">{item.value}</div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mb-4">
                      <div className="text-[#AAAAAA] text-xs uppercase tracking-wider mb-2">Service</div>
                      <span className="px-3 py-1 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] text-sm font-medium">{selectedContact.service}</span>
                    </div>
                    <div>
                      <div className="text-[#AAAAAA] text-xs uppercase tracking-wider mb-2">Message</div>
                      <div className="bg-[#F4F2ED] rounded-xl p-4 border border-[#E8E3DB] text-[#555555] text-sm leading-relaxed">{selectedContact.message}</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-24 text-center">
                    <div><Eye className="w-8 h-8 text-[#CCCCCC] mx-auto mb-3" /><p className="text-[#BBBBBB] text-sm">Select a submission to view details</p></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-black text-[#111111] mb-1">Site Settings</h1>
                <p className="text-[#888888] text-sm">Edit contact info, hero text, stats, footer &amp; social links</p>
              </div>
              <button onClick={saveSettings} disabled={saving || !settings}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] text-[#050505] font-bold text-sm hover:shadow-lg transition-all duration-300 disabled:opacity-60">
                {settingsSaved ? <><CheckCircle size={15} /> Saved!</> : saving ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : <><Save size={15} /> Save Changes</>}
              </button>
            </div>

            {!settings ? (
              <div className="flex items-center justify-center py-32">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-[#C9A84C] mx-auto mb-3" />
                  <p className="text-[#888888] text-sm">Loading settings...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* ── Contact Information ── */}
                <div className="bg-white border border-[#E8E3DB] rounded-2xl p-6 shadow-sm">
                  <h3 className="text-[#111111] font-semibold text-sm mb-5 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#C9A84C]" /> Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#888888] text-xs uppercase tracking-wider mb-2">Phone 1 (Primary)</label>
                      <input type="text" value={settings.phone1}
                        onChange={(e) => setSettings((p) => p ? { ...p, phone1: e.target.value } : p)}
                        className={inputClass} placeholder="+966 55 548 5326" />
                    </div>
                    <div>
                      <label className="block text-[#888888] text-xs uppercase tracking-wider mb-2">Phone 2 (Secondary)</label>
                      <input type="text" value={settings.phone2}
                        onChange={(e) => setSettings((p) => p ? { ...p, phone2: e.target.value } : p)}
                        className={inputClass} placeholder="+966 59 272 7115" />
                    </div>
                    <div>
                      <label className="block text-[#888888] text-xs uppercase tracking-wider mb-2">Email Address</label>
                      <input type="email" value={settings.email}
                        onChange={(e) => setSettings((p) => p ? { ...p, email: e.target.value } : p)}
                        className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-[#888888] text-xs uppercase tracking-wider mb-2">Footer Tagline (English)</label>
                      <input type="text" value={settings.footerTagline}
                        onChange={(e) => setSettings((p) => p ? { ...p, footerTagline: e.target.value } : p)}
                        className={inputClass} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[#888888] text-xs uppercase tracking-wider mb-2">Address (English)</label>
                      <textarea rows={2} value={settings.address}
                        onChange={(e) => setSettings((p) => p ? { ...p, address: e.target.value } : p)}
                        className={`${inputClass} resize-none`} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[#888888] text-xs uppercase tracking-wider mb-2">Address (Arabic)</label>
                      <textarea rows={2} dir="rtl" value={settings.addressAr}
                        onChange={(e) => setSettings((p) => p ? { ...p, addressAr: e.target.value } : p)}
                        className={`${inputClass} resize-none`} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[#888888] text-xs uppercase tracking-wider mb-2">Footer Tagline (Arabic)</label>
                      <input type="text" dir="rtl" value={settings.footerTaglineAr}
                        onChange={(e) => setSettings((p) => p ? { ...p, footerTaglineAr: e.target.value } : p)}
                        className={inputClass} />
                    </div>
                  </div>
                </div>

                {/* ── Hero Section ── */}
                <div className="bg-white border border-[#E8E3DB] rounded-2xl p-6 shadow-sm">
                  <h3 className="text-[#111111] font-semibold text-sm mb-5 flex items-center gap-2">
                    <Video className="w-4 h-4 text-[#C9A84C]" /> Hero Section Text
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#888888] text-xs uppercase tracking-wider mb-2">Heading Line 1 (English)</label>
                      <input type="text" value={settings.heroTaglineEn}
                        onChange={(e) => setSettings((p) => p ? { ...p, heroTaglineEn: e.target.value } : p)}
                        className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-[#888888] text-xs uppercase tracking-wider mb-2">Heading Line 2 — Gold (English)</label>
                      <input type="text" value={settings.heroTagline2En}
                        onChange={(e) => setSettings((p) => p ? { ...p, heroTagline2En: e.target.value } : p)}
                        className={inputClass} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[#888888] text-xs uppercase tracking-wider mb-2">Sub-heading (English)</label>
                      <textarea rows={2} value={settings.heroSubEn}
                        onChange={(e) => setSettings((p) => p ? { ...p, heroSubEn: e.target.value } : p)}
                        className={`${inputClass} resize-none`} />
                    </div>
                    <div>
                      <label className="block text-[#888888] text-xs uppercase tracking-wider mb-2">Heading Line 1 (Arabic)</label>
                      <input type="text" dir="rtl" value={settings.heroTaglineAr}
                        onChange={(e) => setSettings((p) => p ? { ...p, heroTaglineAr: e.target.value } : p)}
                        className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-[#888888] text-xs uppercase tracking-wider mb-2">Heading Line 2 — Gold (Arabic)</label>
                      <input type="text" dir="rtl" value={settings.heroTagline2Ar}
                        onChange={(e) => setSettings((p) => p ? { ...p, heroTagline2Ar: e.target.value } : p)}
                        className={inputClass} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[#888888] text-xs uppercase tracking-wider mb-2">Sub-heading (Arabic)</label>
                      <textarea rows={2} dir="rtl" value={settings.heroSubAr}
                        onChange={(e) => setSettings((p) => p ? { ...p, heroSubAr: e.target.value } : p)}
                        className={`${inputClass} resize-none`} />
                    </div>
                  </div>
                </div>

                {/* ── Hero Stats ── */}
                <div className="bg-white border border-[#E8E3DB] rounded-2xl p-6 shadow-sm">
                  <h3 className="text-[#111111] font-semibold text-sm mb-5 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#C9A84C]" /> Hero Statistics
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {([
                      { label: "Deliveries Value", key: "statDeliveriesValue" as const },
                      { label: "Cities Value", key: "statCitiesValue" as const },
                      { label: "Fleet Value", key: "statFleetValue" as const },
                      { label: "Years Value", key: "statYearsValue" as const },
                    ]).map((f) => (
                      <div key={f.key} className="bg-[#F4F2ED] border border-[#E8E3DB] rounded-xl p-4 text-center">
                        <div className="text-2xl font-black text-[#C9A84C] mb-2">{settings[f.key]}</div>
                        <label className="block text-[#888888] text-[10px] uppercase tracking-wider mb-2">{f.label}</label>
                        <input type="text" value={settings[f.key]}
                          onChange={(e) => setSettings((p) => p ? { ...p, [f.key]: e.target.value } : p)}
                          className="w-full bg-white border border-[#E0DBD3] rounded-lg px-3 py-1.5 text-[#111111] text-sm text-center focus:outline-none focus:border-[#C9A84C]/60 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Social Links ── */}
                <div className="bg-white border border-[#E8E3DB] rounded-2xl p-6 shadow-sm">
                  <h3 className="text-[#111111] font-semibold text-sm mb-5 flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-[#C9A84C]" /> Social Media Links
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {settings.socialLinks.map((social) => (
                      <div key={social.platform}
                        className={`p-4 rounded-xl border transition-all duration-200 ${social.enabled ? "border-[#E8E3DB] bg-[#FAFAF8]" : "border-[#F0EDE8] bg-[#FAFAF8] opacity-50"}`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[#C9A84C]">{platformIcons[social.platform]}</span>
                            <span className="text-[#111111] text-sm font-medium">{platformLabels[social.platform]}</span>
                          </div>
                          <button onClick={() => updateSocial(social.platform, "enabled", !social.enabled)}
                            className="text-[#BBBBBB] hover:text-[#C9A84C] transition-colors">
                            {social.enabled ? <ToggleRight className="w-5 h-5 text-[#C9A84C]" /> : <ToggleLeft className="w-5 h-5" />}
                          </button>
                        </div>
                        <input type="url" value={social.url} disabled={!social.enabled}
                          onChange={(e) => updateSocial(social.platform, "url", e.target.value)}
                          placeholder={`https://${social.platform}.com/...`}
                          className="w-full bg-[#F4F2ED] border border-[#E0DBD3] rounded-lg px-3 py-2 text-[#555555] placeholder-[#CCCCCC] text-xs focus:outline-none focus:border-[#C9A84C]/40 transition-all disabled:opacity-40" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* FLEET TAB */}
        {activeTab === "fleet" && (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-black text-[#111111] mb-1">Fleet Management</h1>
              <p className="text-[#888888] text-sm">Upload fleet car images — automatically converted to WebP</p>
            </div>

            {/* Upload Form */}
            <div className="bg-white border border-[#E8E3DB] rounded-2xl p-6 mb-6 shadow-sm">
              <h3 className="text-[#111111] font-semibold text-sm mb-5 flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#C9A84C]" /> Add Fleet Car
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-[#888888] text-xs uppercase tracking-wider mb-2">Tag (e.g. 40T, EXPRESS)</label>
                  <input
                    type="text"
                    value={fleetTag}
                    onChange={(e) => setFleetTag(e.target.value)}
                    placeholder="40T"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-[#888888] text-xs uppercase tracking-wider mb-2">Car Image (JPG / PNG / WebP)</label>
                  <label className="flex items-center gap-3 w-full bg-[#F4F2ED] border border-[#E0DBD3] rounded-xl px-4 py-3 cursor-pointer hover:border-[#C9A84C]/40 hover:bg-white transition-all duration-200">
                    <Upload className="w-4 h-4 text-[#C9A84C] shrink-0" />
                    <span className="text-sm text-[#888888] truncate">
                      {fleetFile ? fleetFile.name : "Choose image..."}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setFleetFile(e.target.files?.[0] ?? null)}
                    />
                  </label>
                </div>
                <button
                  onClick={uploadFleetCar}
                  disabled={fleetUploading}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] text-[#050505] font-bold text-sm hover:shadow-lg transition-all duration-300 disabled:opacity-60"
                >
                  {fleetUploading ? <><Loader2 size={15} className="animate-spin" /> Converting...</> : <><Upload size={15} /> Upload & Convert</>}
                </button>
              </div>
              {fleetMsg && (
                <div className={`mt-4 flex items-center gap-2 px-4 py-3 rounded-xl text-sm ${fleetMsg.type === "success" ? "bg-green-500/10 border border-green-500/20 text-green-400" : "bg-red-500/10 border border-red-500/20 text-red-400"}`}>
                  {fleetMsg.type === "success" ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                  {fleetMsg.text}
                </div>
              )}
            </div>

            {/* Fleet Grid */}
            <div className="bg-white border border-[#E8E3DB] rounded-2xl p-6 shadow-sm">
              <h3 className="text-[#111111] font-semibold text-sm mb-5 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#C9A84C]" /> Current Fleet ({fleetItems.length} cars)
              </h3>
              {fleetItems.length === 0 ? (
                <div className="text-center py-12 text-[#CCCCCC]">
                  <Truck className="w-8 h-8 mx-auto mb-3 opacity-40" />
                  <p>No fleet cars yet. Upload one above.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {fleetItems.map((item) => (
                    <div key={item.id} className="group relative rounded-xl overflow-hidden border border-[#E8E3DB] bg-white">
                      <div className="relative h-32 bg-[#F4F2ED]">
                        <Image
                          src={`/images/fleet/${item.filename}`}
                          alt={item.tag}
                          fill
                          className="object-cover"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.2"; }}
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#C9A84C] rounded text-[#050505] text-[9px] font-black tracking-widest">
                          {item.tag}
                        </div>
                        <button
                          onClick={() => deleteFleetCar(item.id)}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-500"
                        >
                          <X size={10} />
                        </button>
                      </div>
                      <div className="px-2 py-1.5">
                        <p className="text-[#888888] text-[10px] truncate">{item.filename}</p>
                        <p className="text-[#BBBBBB] text-[9px]">{item.uploadedAt ? new Date(item.uploadedAt).toLocaleDateString() : "Static"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* BANNER VIDEO TAB */}
        {activeTab === "banner" && (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-black text-[#111111] mb-1">Banner Video</h1>
              <p className="text-[#888888] text-sm">Replace the hero background video — automatically converted to WebM (VP9)</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current video preview */}
              <div className="bg-white border border-[#E8E3DB] rounded-2xl p-6 shadow-sm">
                <h3 className="text-[#111111] font-semibold text-sm mb-4 flex items-center gap-2">
                  <Video className="w-4 h-4 text-[#C9A84C]" /> Current Banner Video
                </h3>
                <div className="rounded-xl overflow-hidden border border-[#E8E3DB] bg-[#F4F2ED]">
                  <video
                    src="/videos/hero.webm"
                    controls
                    muted
                    className="w-full max-h-52 object-cover"
                    poster="/images/hero-poster.webp"
                  />
                </div>
                <p className="text-[#AAAAAA] text-xs mt-3">File: <span className="text-[#888888] font-mono">public/videos/hero.webm</span></p>
              </div>

              {/* Upload form */}
              <div className="bg-white border border-[#E8E3DB] rounded-2xl p-6 shadow-sm">
                <h3 className="text-[#111111] font-semibold text-sm mb-4 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#C9A84C]" /> Upload New Video
                </h3>

                <div className="space-y-4">
                  <div className="p-3 rounded-xl border border-[#C9A84C]/20 bg-[#C9A84C]/5">
                    <p className="text-[#C9A84C] text-xs font-semibold mb-1">Conversion Info</p>
                    <ul className="text-[#888888] text-xs space-y-0.5">
                      <li>• Accepts: MP4, MOV, AVI, MKV, WebM</li>
                      <li>• Output: WebM with VP9 + Opus audio</li>
                      <li>• Also generates new hero poster (WebP)</li>
                      <li>• Conversion may take 1–5 min for large files</li>
                    </ul>
                  </div>

                  <div>
                    <label className="block text-[#888888] text-xs uppercase tracking-wider mb-2">Video File</label>
                    <label className="flex items-center gap-3 w-full bg-[#F4F2ED] border border-[#E0DBD3] rounded-xl px-4 py-3 cursor-pointer hover:border-[#C9A84C]/40 hover:bg-white transition-all duration-200">
                      <Video className="w-4 h-4 text-[#C9A84C] shrink-0" />
                      <span className="text-sm text-[#888888] truncate">
                        {bannerFile ? bannerFile.name : "Choose video file..."}
                      </span>
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={(e) => setBannerFile(e.target.files?.[0] ?? null)}
                      />
                    </label>
                    {bannerFile && (
                      <p className="text-[#AAAAAA] text-xs mt-1.5">
                        Size: {(bannerFile.size / 1024 / 1024).toFixed(1)} MB
                      </p>
                    )}
                  </div>

                  <button
                    onClick={uploadBannerVideo}
                    disabled={bannerUploading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] text-[#050505] font-bold text-sm hover:shadow-lg transition-all duration-300 disabled:opacity-60"
                  >
                    {bannerUploading
                      ? <><Loader2 size={15} className="animate-spin" /> Converting to WebM... (please wait)</>
                      : <><Upload size={15} /> Upload &amp; Convert to WebM</>
                    }
                  </button>

                  {bannerMsg && (
                    <div className={`flex items-start gap-2 px-4 py-3 rounded-xl text-sm ${bannerMsg.type === "success" ? "bg-green-500/10 border border-green-500/20 text-green-400" : "bg-red-500/10 border border-red-500/20 text-red-400"}`}>
                      {bannerMsg.type === "success" ? <CheckCircle size={14} className="mt-0.5 shrink-0" /> : <AlertCircle size={14} className="mt-0.5 shrink-0" />}
                      {bannerMsg.text}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
