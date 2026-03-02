"use client";

import { useState, useEffect } from "react";
import {
  LogOut, Users, Settings, Eye, Trash2, CheckCircle,
  MessageSquare, Phone, Mail, Building2, Calendar,
  Save, Instagram, Facebook, ToggleLeft, ToggleRight, Shield,
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

interface SiteSettings {
  phone: string;
  email: string;
  address: string;
  addressAr: string;
  socialLinks: SocialLink[];
  footerTagline: string;
  footerTaglineAr: string;
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
  new: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  read: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  replied: "bg-green-500/10 text-green-400 border-green-500/20",
};

const inputClass =
  "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/50 transition-all duration-300 text-sm";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"contacts" | "settings">("contacts");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

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
    const [cRes, sRes] = await Promise.all([fetch("/api/contact"), fetch("/api/settings")]);
    if (cRes.ok) setContacts(await cRes.json());
    if (sRes.ok) setSettings(await sRes.json());
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
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A84C]/5 rounded-full blur-[150px]" />
        </div>
        <div className="w-full max-w-md">
          <div className="relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent rounded-t-2xl" />
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#C9A84C]" />
              </div>
              <div>
                <div className="text-white font-bold">Admin Panel</div>
                <div className="text-white/30 text-xs">Masarat Transportation</div>
              </div>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-white/40 text-xs font-medium uppercase tracking-wider mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className={inputClass}
                  autoFocus
                />
                {loginError && <p className="text-red-400 text-xs mt-2">{loginError}</p>}
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
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 bottom-0 w-60 bg-[#080808] border-r border-white/[0.06] flex flex-col z-40">
        <div className="p-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C] to-[#8B6914] rounded-lg rotate-45" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-black text-sm z-10">م</span>
              </div>
            </div>
            <div>
              <div className="text-white font-bold text-sm">MASARAT</div>
              <div className="text-[#C9A84C] text-[9px] tracking-widest">ADMIN PANEL</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: "contacts" as const, icon: Users, label: "Contact Submissions", badge: contacts.filter((c) => c.status === "new").length },
            { id: "settings" as const, icon: Settings, label: "Site Settings", badge: 0 },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id ? "bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20" : "text-white/40 hover:text-white hover:bg-white/5"
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
        <div className="p-4 border-t border-white/[0.06]">
          <button onClick={async () => { await fetch("/api/admin/login", { method: "DELETE" }); setAuthed(false); }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-500/5 text-sm transition-all duration-200">
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
              <h1 className="text-2xl font-black mb-1">Contact Submissions</h1>
              <p className="text-white/30 text-sm">{contacts.length} total submissions</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-2 space-y-3 max-h-[75vh] overflow-y-auto pr-1">
                {contacts.length === 0 ? (
                  <div className="text-center py-16 text-white/20">
                    <MessageSquare className="w-8 h-8 mx-auto mb-3 opacity-30" />
                    <p>No submissions yet</p>
                  </div>
                ) : contacts.map((c) => (
                  <div key={c._id}
                    onClick={() => { setSelectedContact(c); if (c.status === "new") updateStatus(c._id, "read"); }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      selectedContact?._id === c._id
                        ? "border-[#C9A84C]/40 bg-[#C9A84C]/5"
                        : "border-white/[0.06] bg-white/[0.02] hover:border-white/10"
                    }`}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="font-semibold text-sm">{c.name}</div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusColors[c.status]}`}>{c.status}</span>
                    </div>
                    <div className="text-white/40 text-xs mb-0.5">{c.service}</div>
                    <div className="text-white/25 text-xs">{new Date(c.createdAt).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-3">
                {selectedContact ? (
                  <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent rounded-t-2xl" />
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-bold mb-1">{selectedContact.name}</h2>
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
                          <div key={i} className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
                            <div className="flex items-center gap-1.5 mb-1">
                              <Icon className="w-3 h-3 text-[#C9A84C]" />
                              <span className="text-white/30 text-[10px] uppercase tracking-wider">{item.label}</span>
                            </div>
                            <div className="text-white text-sm font-medium truncate">{item.value}</div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mb-4">
                      <div className="text-white/30 text-xs uppercase tracking-wider mb-2">Service</div>
                      <span className="px-3 py-1 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] text-sm font-medium">{selectedContact.service}</span>
                    </div>
                    <div>
                      <div className="text-white/30 text-xs uppercase tracking-wider mb-2">Message</div>
                      <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06] text-white/60 text-sm leading-relaxed">{selectedContact.message}</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-24 text-center">
                    <div><Eye className="w-8 h-8 text-white/10 mx-auto mb-3" /><p className="text-white/20 text-sm">Select a submission to view details</p></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && settings && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-black mb-1">Site Settings</h1>
                <p className="text-white/30 text-sm">Manage footer and contact information</p>
              </div>
              <button onClick={saveSettings} disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] text-[#050505] font-bold text-sm hover:shadow-lg transition-all duration-300 disabled:opacity-60">
                {settingsSaved ? <><CheckCircle size={15} /> Saved!</> : <><Save size={15} /> Save Changes</>}
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact info */}
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                <h3 className="text-white font-semibold text-sm mb-5 flex items-center gap-2"><Phone className="w-4 h-4 text-[#C9A84C]" /> Contact Information</h3>
                <div className="space-y-4">
                  {[
                    { label: "Phone Number", key: "phone" as const, type: "text" },
                    { label: "Email Address", key: "email" as const, type: "email" },
                    { label: "Address (English)", key: "address" as const, type: "text" },
                    { label: "Address (Arabic)", key: "addressAr" as const, type: "text", rtl: true },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-white/30 text-xs uppercase tracking-wider mb-2">{f.label}</label>
                      <input type={f.type} dir={f.rtl ? "rtl" : undefined} value={settings[f.key]}
                        onChange={(e) => setSettings((p) => p ? { ...p, [f.key]: e.target.value } : p)}
                        className={inputClass} />
                    </div>
                  ))}
                </div>
              </div>
              {/* Footer tagline */}
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                <h3 className="text-white font-semibold text-sm mb-5 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-[#C9A84C]" /> Footer Tagline</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/30 text-xs uppercase tracking-wider mb-2">Tagline (English)</label>
                    <textarea rows={3} value={settings.footerTagline}
                      onChange={(e) => setSettings((p) => p ? { ...p, footerTagline: e.target.value } : p)}
                      className={`${inputClass} resize-none`} />
                  </div>
                  <div>
                    <label className="block text-white/30 text-xs uppercase tracking-wider mb-2">Tagline (Arabic)</label>
                    <textarea rows={3} dir="rtl" value={settings.footerTaglineAr}
                      onChange={(e) => setSettings((p) => p ? { ...p, footerTaglineAr: e.target.value } : p)}
                      className={`${inputClass} resize-none`} />
                  </div>
                </div>
              </div>
              {/* Social links */}
              <div className="lg:col-span-2 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                <h3 className="text-white font-semibold text-sm mb-5 flex items-center gap-2"><Instagram className="w-4 h-4 text-[#C9A84C]" /> Social Media Links</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {settings.socialLinks.map((social) => (
                    <div key={social.platform}
                      className={`p-4 rounded-xl border transition-all duration-200 ${social.enabled ? "border-white/10 bg-white/[0.02]" : "border-white/[0.04] opacity-50"}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[#C9A84C]">{platformIcons[social.platform]}</span>
                          <span className="text-white text-sm font-medium">{platformLabels[social.platform]}</span>
                        </div>
                        <button onClick={() => updateSocial(social.platform, "enabled", !social.enabled)}
                          className="text-white/40 hover:text-[#C9A84C] transition-colors">
                          {social.enabled ? <ToggleRight className="w-5 h-5 text-[#C9A84C]" /> : <ToggleLeft className="w-5 h-5" />}
                        </button>
                      </div>
                      <input type="url" value={social.url} disabled={!social.enabled}
                        onChange={(e) => updateSocial(social.platform, "url", e.target.value)}
                        placeholder={`https://${social.platform}.com/...`}
                        className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-white/60 placeholder-white/15 text-xs focus:outline-none focus:border-[#C9A84C]/30 transition-all disabled:opacity-40" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
