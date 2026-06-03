import React, { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar, PageHeroBanner, Footer } from "@/Components/Layouts";

/* ─────────────────────────────────────────────────────────
   PARTNER LOGO MARQUEE
   Scrolling strip of unique company logos/names for credibility.
───────────────────────────────────────────────────────── */
function PartnerMarquee({ gallery }) {
    const companies = [];
    const seen = new Set();
    gallery.forEach((item) => {
        const name = item.companyName;
        const logo = item.companyLogo;
        if (name && logo && !seen.has(name)) {
            seen.add(name);
            companies.push({ name, logo });
        }
    });

    if (companies.length === 0) return null;

    // Ensure enough items to comfortably fill the viewport
    const MIN_ITEMS = 10;
    const repeatCount = Math.max(1, Math.ceil(MIN_ITEMS / companies.length));
    const logoSet = Array.from({ length: repeatCount }, () => companies).flat();
    const duration = logoSet.length * 3;

    // Render one "track" of logos
    const Track = () => (
        <div
            className="flex shrink-0 items-center gap-16 animate-marquee"
            style={{ animationDuration: `${duration}s` }}
        >
            {logoSet.map((c, i) => (
                <div key={i} className="shrink-0 px-4">
                    <img
                        src={c.logo}
                        alt={c.name}
                        className="h-16 w-auto object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    />
                </div>
            ))}
        </div>
    );

    return (
        <section className="py-10 bg-white border-b border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                <p className="text-center text-sm md:text-base font-bold uppercase tracking-widest text-gray-400">
                    Didukung oleh Mitra Industri
                </p>
            </div>
            <div className="relative flex gap-16">
                <Track />
                <Track />
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────────────────
   STATS BAR
───────────────────────────────────────────────────────── */
function StatsBar({ stats }) {
    const items = [
        { value: stats.totalCompanies || 0, label: "Perusahaan Mitra", color: "#6B1B1B" },
        { value: stats.totalSessions || 0, label: "Sesi KUB Talk", color: "#6B1B1B" },
        { value: stats.totalStudents || "500+", label: "Mahasiswa Terlibat", color: "#16a34a" },
    ];

    return (
        <section className="relative z-10 -mt-10 mb-16 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    {items.map(({ value, label, color }) => (
                        <div key={label} className="flex-1 flex flex-col items-center py-7 px-4">
                            <span className="text-4xl font-black" style={{ color }}>{value}</span>
                            <span className="mt-1.5 text-xs font-bold uppercase tracking-widest text-gray-400">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────────────────
   TALK CARD — Rich card with company identity
───────────────────────────────────────────────────────── */
function TalkCard({ item, onClick }) {
    return (
        <div
            onClick={onClick}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
        >
            {/* Image */}
            <div className="relative overflow-hidden">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {item.eventDate && (
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-[11px] font-bold">
                        {item.eventDate}
                    </span>
                )}
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col flex-1">
                {/* Company Identity — the star of each card */}
                {item.companyName && (
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                        {item.companyLogo ? (
                            <img src={item.companyLogo} alt={item.companyName} className="h-8 w-auto object-contain shrink-0" />
                        ) : (
                            <div className="w-9 h-9 rounded-lg bg-[#6B1B1B]/10 flex items-center justify-center shrink-0">
                                <span className="text-[#6B1B1B] text-sm font-black">{item.companyName.charAt(0)}</span>
                            </div>
                        )}
                        <span className="text-sm font-bold text-gray-700 truncate">{item.companyName}</span>
                    </div>
                )}

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2 group-hover:text-[#6B1B1B] transition-colors">
                    {item.title}
                </h3>

                {/* Description */}
                {item.desc && (
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2 flex-1">
                        {item.desc}
                    </p>
                )}

                {/* Speaker */}
                {item.speakerName && (
                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-500">
                                {item.speakerName.split(" ").map(w => w[0]).join("").slice(0, 2)}
                            </span>
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">{item.speakerName}</p>
                            {item.speakerTitle && (
                                <p className="text-[11px] text-gray-400 truncate">{item.speakerTitle}</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────────────────────── */
function CTABanner() {
    return (
        <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #6B1B1B 0%, #a03420 55%, #C4571A 100%)" }}>
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }} />
            <div className="absolute bottom-0 -left-16 w-60 h-60 rounded-full" style={{ background: "rgba(255,255,255,0.04)" }} />
            <div className="relative max-w-3xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                    Bergabunglah dengan KUB Talk Berikutnya
                </h2>
                <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl mx-auto">
                    Jadilah bagian dari diskusi eksklusif bersama pemimpin industri terkemuka Indonesia.
                </p>
                <a
                    href="#"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#6B1B1B] font-bold text-sm hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
                >
                    Hubungi Kami
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5-5 5M6 12h12" />
                    </svg>
                </a>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────────────────
   LIGHTBOX MODAL (refreshed)
───────────────────────────────────────────────────────── */
function Lightbox({ gallery, index, onClose, onPrev, onNext }) {
    if (index === null || !gallery[index]) return null;
    const item = gallery[index];

    return (
        <div
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 9999, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", animation: "fadeIn 0.2s ease" }}
            onClick={onClose}
        >
            <div
                className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
                style={{ maxHeight: "90vh", animation: "popIn 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
                onClick={(e) => e.stopPropagation()}
            >
                <img src={item.image} alt={item.title} className="w-full max-h-[60vh] object-cover" />

                <div className="p-6">
                    {/* Company row */}
                    {item.companyName && (
                        <div className="flex items-center gap-3 mb-3">
                            {item.companyLogo ? (
                                <img src={item.companyLogo} alt={item.companyName} className="h-6 w-auto object-contain" />
                            ) : (
                                <div className="w-7 h-7 rounded-md bg-[#6B1B1B]/10 flex items-center justify-center">
                                    <span className="text-[#6B1B1B] text-xs font-black">{item.companyName.charAt(0)}</span>
                                </div>
                            )}
                            <span className="text-sm font-bold text-gray-600">{item.companyName}</span>
                            {item.eventDate && (
                                <span className="ml-auto text-xs text-gray-400">{item.eventDate}</span>
                            )}
                        </div>
                    )}

                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                    {item.desc && <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.desc}</p>}

                    {item.speakerName && (
                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <span className="text-xs font-bold text-gray-500">
                                    {item.speakerName.split(" ").map(w => w[0]).join("").slice(0, 2)}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-800">{item.speakerName}</p>
                                {item.speakerTitle && <p className="text-[11px] text-gray-400">{item.speakerTitle}</p>}
                            </div>
                        </div>
                    )}
                </div>

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center cursor-pointer transition-colors"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" strokeWidth={2} />
                </button>

                {/* Prev / Next */}
                {index > 0 && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onPrev(); }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center cursor-pointer transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
                    </button>
                )}
                {index < gallery.length - 1 && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onNext(); }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center cursor-pointer transition-colors"
                    >
                        <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
                    </button>
                )}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────── */
export default function KubTalk({
    gallery = [],
    bannerImage = "/assets/kub-talk-1.jpg",
    stats = {},
}) {
    const { navLinks = [], footerLinks = [] } = usePage().props;
    const [lightbox, setLightbox] = useState(null);

    return (
        <>
            <Head title="KUB Talk - PPAIP Universitas Bakrie" />
            <style>{`
                @keyframes fadeIn { from{opacity:0} to{opacity:1} }
                @keyframes popIn { from{opacity:0;transform:scale(0.93) translateY(12px)} to{opacity:1;transform:scale(1) translateY(0)} }
                @keyframes marquee { 0%{transform:translate3d(0,0,0)} 100%{transform:translate3d(-100%,0,0)} }
                .animate-marquee { animation: marquee 30s linear infinite; will-change:transform; }
                .animate-marquee:hover, .relative:hover .animate-marquee { animation-play-state: paused; }
            `}</style>

            <div className="min-h-screen bg-[#F4F5F7] font-sans antialiased">
                <Navbar links={navLinks} />

                <PageHeroBanner
                    title="KUB Talk"
                    subtitle="Kolaborasi eksklusif dengan pemimpin industri nasional untuk mempersiapkan mahasiswa menjadi profesional masa depan."
                    backgroundImage={bannerImage}
                />

                {/* Stats Strip */}
                <StatsBar stats={stats} />

                {/* Partner Logo Marquee */}
                <PartnerMarquee gallery={gallery} />

                {/* Main Gallery Grid */}
                <section className="py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#6B1B1B] bg-[#6B1B1B]/10 mb-5">
                                Dokumentasi
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                                Sesi KUB Talk
                            </h2>
                            <p className="mt-4 text-base text-gray-500 max-w-lg mx-auto">
                                Rangkaian talk inspiratif yang menghubungkan mahasiswa dengan pemimpin industri terkemuka.
                            </p>
                        </div>

                        {gallery.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {gallery.map((item, index) => (
                                    <TalkCard
                                        key={index}
                                        item={item}
                                        onClick={() => setLightbox(index)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 text-gray-400">
                                <p className="text-5xl mb-3">📋</p>
                                <p className="font-semibold">Belum ada dokumentasi KUB Talk</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA */}
                <CTABanner />
                <Footer linkColumns={footerLinks} />
            </div>

            {/* Lightbox */}
            <Lightbox
                gallery={gallery}
                index={lightbox}
                onClose={() => setLightbox(null)}
                onPrev={() => setLightbox(Math.max(0, lightbox - 1))}
                onNext={() => setLightbox(Math.min(gallery.length - 1, lightbox + 1))}
            />
        </>
    );
}
