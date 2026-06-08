import { useCallback, useEffect, useRef, useState } from "react";
import { usePage } from "@inertiajs/react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import {
    ArrowUpRight,
    Building2,
    CalendarDays,
    Camera,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    X,
} from "lucide-react";
import { Navbar, PageHeroBanner, Footer } from "@/Components/Layouts";
import Seo from "@/Components/Seo";

function MarqueeTrack({ duration, logoSet }) {
    return (
        <div
            className="flex shrink-0 items-center gap-16 animate-marquee"
            style={{ animationDuration: `${duration}s` }}
        >
            {logoSet.map((company, index) => (
                <div key={index} className="shrink-0 px-4">
                    <img
                        src={company.logo}
                        alt={company.name}
                        loading="lazy"
                        decoding="async"
                        className="h-16 w-auto object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    />
                </div>
            ))}
        </div>
    );
}

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

    // Biar marquee tetap penuh walau logo mitranya masih sedikit.
    const MIN_ITEMS = 10;
    const repeatCount = Math.max(1, Math.ceil(MIN_ITEMS / companies.length));
    const logoSet = Array.from({ length: repeatCount }, () => companies).flat();
    const duration = logoSet.length * 3;

    return (
        <section className="py-6 bg-white border-b border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                <p className="text-center text-sm md:text-base font-bold uppercase tracking-widest text-gray-400">
                    Didukung oleh Mitra Industri
                </p>
            </div>
            <div className="relative flex gap-16">
                <MarqueeTrack duration={duration} logoSet={logoSet} />
                <MarqueeTrack duration={duration} logoSet={logoSet} />
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
        <section className="relative z-10 -mt-10 mb-6 px-4">
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
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = item.images || [];

    const handlePrev = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const currentImage = images[currentImageIndex] || "/assets/kub-talk-1.jpg";

    return (
        <div
            className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[1.75rem] border border-[#f4d8b8] bg-white shadow-[0_18px_60px_rgba(107,27,27,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-[#f6b756] hover:shadow-[0_28px_90px_rgba(107,27,27,0.18)] focus-within:ring-4 focus-within:ring-[#F5A623]/60"
        >
            <button
                type="button"
                onClick={onClick}
                aria-haspopup="dialog"
                aria-label={`Buka detail ${item.title}`}
                className="absolute inset-0 z-10 rounded-[1.75rem] focus:outline-none"
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#6B1B1B] via-[#F5A623] to-[#C4571A]" />
            <div className="pointer-events-none absolute -right-16 -top-20 h-44 w-44 rounded-full bg-[#F5A623]/20 blur-3xl transition-opacity duration-500 group-hover:opacity-90" />

            <div className="relative flex h-60 items-center justify-center overflow-hidden bg-[#210b0b]">
                <img
                    src={currentImage}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#190606]/75 via-[#190606]/8 to-[#190606]/35" />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 25% 10%, rgba(245,166,35,.28), transparent 32%)" }} />

                <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-white shadow-lg backdrop-blur-md">
                    <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
                    Industry Session
                </div>

                {item.eventDate && (
                    <span className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-sm">
                        <CalendarDays className="h-3.5 w-3.5 text-[#F5A623]" />
                        {item.eventDate}
                    </span>
                )}

                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-1.5 text-xs font-bold text-[#6B1B1B] shadow-lg backdrop-blur">
                        <Camera className="h-3.5 w-3.5" />
                        {images.length || 1} Foto
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5A623] text-[#3a0d0d] shadow-lg transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                        <ArrowUpRight className="h-5 w-5" strokeWidth={2.6} />
                    </span>
                </div>

                {images.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={handlePrev}
                            aria-label={`Foto sebelumnya untuk ${item.title}`}
                            className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#3a0d0d] opacity-0 shadow-md transition-all duration-300 hover:scale-105 hover:bg-white group-hover:opacity-100"
                        >
                            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            aria-label={`Foto berikutnya untuk ${item.title}`}
                            className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#3a0d0d] opacity-0 shadow-md transition-all duration-300 hover:scale-105 hover:bg-white group-hover:opacity-100"
                        >
                            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
                        </button>

                        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentImageIndex(idx);
                                    }}
                                    aria-label={`Tampilkan foto ${idx + 1} dari ${item.title}`}
                                    aria-pressed={idx === currentImageIndex}
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                        idx === currentImageIndex ? "bg-white scale-125 w-3" : "bg-white/50 hover:bg-white/80"
                                    }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className="relative p-5 flex flex-col flex-1">
                {item.companyName && (
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                        {item.companyLogo ? (
                            <img
                                src={item.companyLogo}
                                alt={item.companyName}
                                loading="lazy"
                                decoding="async"
                                className="h-8 w-auto object-contain shrink-0"
                            />
                        ) : (
                            <div className="w-9 h-9 rounded-lg bg-[#6B1B1B]/10 flex items-center justify-center shrink-0">
                                <span className="text-[#6B1B1B] text-sm font-black">{item.companyName.charAt(0)}</span>
                            </div>
                        )}
                        <span className="text-sm font-bold text-gray-700 truncate">{item.companyName}</span>
                    </div>
                )}

                <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2 group-hover:text-[#6B1B1B] transition-colors">
                    {item.title}
                </h3>

                {item.desc && (
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2 flex-1">
                        {item.desc}
                    </p>
                )}

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
function Lightbox({ gallery, index, onClose }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const item = index === null ? null : gallery[index];
    const images = item?.images || [];
    const isOpen = index !== null;
    const focusTrapRef = useFocusTrap(isOpen);

    useEffect(() => {
        if (!item) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") onClose();
            if (event.key === "ArrowLeft" && images.length > 1) {
                setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
            }
            if (event.key === "ArrowRight" && images.length > 1) {
                setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [images.length, item, onClose]);

    if (!item) return null;

    const handlePrev = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const currentImage = images[currentImageIndex] || "/assets/kub-talk-1.jpg";
    const imageProgress = images.length > 0 ? ((currentImageIndex + 1) / images.length) * 100 : 100;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center p-3 md:p-6"
            style={{
                zIndex: 9999,
                background: "radial-gradient(circle at 20% 12%, rgba(245,166,35,.22), transparent 28%), radial-gradient(circle at 78% 0%, rgba(196,87,26,.2), transparent 26%), rgba(18, 5, 5, 0.78)",
                backdropFilter: "blur(16px)",
                animation: "fadeIn 0.22s ease",
            }}
            onClick={onClose}
        >
            <div
                ref={focusTrapRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="kub-talk-dialog-title"
                className="relative grid w-full max-w-6xl overflow-y-auto rounded-[2rem] border border-white/18 bg-[#120505] shadow-[0_40px_140px_rgba(0,0,0,0.55)] md:grid-cols-[1.35fr_.85fr] md:overflow-hidden"
                style={{ maxHeight: "92vh", animation: "kubModalRise 0.45s cubic-bezier(0.16,1,0.3,1)" }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="pointer-events-none absolute -left-20 -top-28 h-72 w-72 rounded-full bg-[#F5A623]/25 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-28 right-10 h-80 w-80 rounded-full bg-[#C4571A]/20 blur-3xl" />
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />

                <div className="relative flex min-h-[42vh] items-center justify-center overflow-hidden bg-[#210b0b] md:min-h-[76vh]">
                    <img
                        key={currentImage}
                        src={currentImage}
                        alt={item.title}
                        decoding="async"
                        className="h-full max-h-[48vh] w-full object-contain md:max-h-[76vh]"
                        style={{ animation: "kubPhotoReveal 0.55s ease both" }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#120505]/70 via-transparent to-[#120505]/30" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#120505] to-transparent" />

                    <div className="absolute left-5 top-5 z-20 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#F5A623]/35 bg-[#F5A623]/18 px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#ffe1a3] shadow-lg backdrop-blur-md">
                            <Sparkles className="h-3.5 w-3.5" />
                            KUB Talk Showcase
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/12 px-3.5 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md">
                            <Camera className="h-3.5 w-3.5 text-[#F5A623]" />
                            {currentImageIndex + 1} / {images.length || 1}
                        </span>
                    </div>

                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="absolute left-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/12 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-x-1 hover:bg-[#F5A623] hover:text-[#3a0d0d]"
                                aria-label="Foto sebelumnya"
                            >
                                <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="absolute right-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/12 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:translate-x-1 hover:bg-[#F5A623] hover:text-[#3a0d0d]"
                                aria-label="Foto berikutnya"
                            >
                                <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
                            </button>

                            <div className="absolute bottom-6 left-6 right-6 z-20">
                                <div className="h-1.5 overflow-hidden rounded-full bg-white/14">
                                    <div
                                        role="progressbar"
                                        aria-label="Posisi foto"
                                        aria-valuemin={1}
                                        aria-valuemax={images.length}
                                        aria-valuenow={currentImageIndex + 1}
                                        className="h-full rounded-full bg-gradient-to-r from-[#F5A623] to-[#fff0b8] transition-all duration-500"
                                        style={{ width: `${imageProgress}%` }}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="relative flex min-h-0 flex-col overflow-y-auto bg-[linear-gradient(160deg,#fff8ee_0%,#ffffff_46%,#fff4de_100%)] p-5 md:p-7">
                    <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-[#F5A623]/20" />
                    <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                            {item.eventDate && (
                                <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#7a4030]">
                                    <CalendarDays className="h-4 w-4 text-[#C4571A]" />
                                    {item.eventDate}
                                </p>
                            )}
                        </div>
                    </div>

                    {item.companyName && (
                        <div className="mb-5 flex items-center gap-3 rounded-2xl border border-[#f0d6b2] bg-white/80 p-3 shadow-sm backdrop-blur">
                            {item.companyLogo ? (
                                <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                                    <img
                                        src={item.companyLogo}
                                        alt={item.companyName}
                                        decoding="async"
                                        className="max-h-8 w-auto object-contain"
                                    />
                                </div>
                            ) : (
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#6B1B1B]/10">
                                    <Building2 className="h-5 w-5 text-[#6B1B1B]" />
                                </div>
                            )}
                            <div className="min-w-0">
                                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#C4571A]">Mitra Industri</p>
                                <p className="truncate text-base font-black text-[#301010]">{item.companyName}</p>
                            </div>
                        </div>
                    )}

                    <h3
                        id="kub-talk-dialog-title"
                        className="text-2xl font-black leading-tight text-[#240b0b] md:text-3xl"
                    >
                        {item.title}
                    </h3>
                    {item.desc && <p className="mt-3 text-sm leading-7 text-[#6f554d]">{item.desc}</p>}

                    {item.speakerName && (
                        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#240b0b] p-4 text-white shadow-[0_18px_40px_rgba(36,11,11,0.18)]">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F5A623]">
                                <span className="text-sm font-black text-[#3a0d0d]">
                                    {item.speakerName.split(" ").map(w => w[0]).join("").slice(0, 2)}
                                </span>
                            </div>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-black">{item.speakerName}</p>
                                {item.speakerTitle && <p className="truncate text-xs text-white/58">{item.speakerTitle}</p>}
                            </div>
                        </div>
                    )}

                    {images.length > 1 && (
                        <div className="mt-5 min-h-0">
                            <div className="mb-3 flex items-center justify-between">
                                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#7a4030]">Photo Highlights</p>
                                <p className="text-xs font-bold text-[#C4571A]">{images.length} dokumentasi</p>
                            </div>
                            <div className="flex max-h-24 gap-2 overflow-x-auto pb-1 pr-1">
                                {images.map((image, idx) => (
                                    <button
                                        key={`${image}-${idx}`}
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentImageIndex(idx);
                                        }}
                                        className={`relative h-20 w-24 shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                                            idx === currentImageIndex
                                                ? "border-[#F5A623] shadow-[0_10px_28px_rgba(245,166,35,.28)]"
                                                : "border-white opacity-70 hover:opacity-100"
                                        }`}
                                        aria-label={`Lihat foto ${idx + 1}`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${item.title} ${idx + 1}`}
                                            loading="lazy"
                                            decoding="async"
                                            className="h-full w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    autoFocus
                    className="absolute right-4 top-4 z-30 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/35 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:bg-[#F5A623] hover:text-[#3a0d0d]"
                    aria-label="Tutup detail KUB Talk"
                >
                    <X className="w-5 h-5" strokeWidth={2} />
                </button>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────── */
export default function KubTalk({
    gallery = [],
    bannerImage = "/assets/kub-talk-3.jpg",
    stats = {},
}) {
    const { navLinks = [], footerLinks = [] } = usePage().props;
    const [lightbox, setLightbox] = useState(null);
    const lightboxTriggerRef = useRef(null);

    const openLightbox = useCallback((index, event) => {
        lightboxTriggerRef.current = event.currentTarget;
        setLightbox(index);
    }, []);

    const closeLightbox = useCallback(() => {
        setLightbox(null);
        window.requestAnimationFrame(() => lightboxTriggerRef.current?.focus());
    }, []);

    return (
        <>
            <Seo
                title="KUB Talk"
                description="Ikuti dokumentasi KUB Talk Universitas Bakrie, forum yang mempertemukan mahasiswa dengan pemimpin dan praktisi industri."
                image={bannerImage}
            />
            <style>{`
                @keyframes fadeIn { from{opacity:0} to{opacity:1} }
                @keyframes popIn { from{opacity:0;transform:scale(0.93) translateY(12px)} to{opacity:1;transform:scale(1) translateY(0)} }
                @keyframes kubModalRise { from{opacity:0;transform:translateY(24px) scale(.96)} to{opacity:1;transform:translateY(0) scale(1)} }
                @keyframes kubPhotoReveal { from{opacity:0;transform:scale(1.04);filter:saturate(.82) contrast(.95)} to{opacity:1;transform:scale(1);filter:saturate(1) contrast(1)} }
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
                <section className="py-8 md:py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-8">
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
                                        onClick={(event) => openLightbox(index, event)}
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
                key={lightbox ?? "closed"}
                gallery={gallery}
                index={lightbox}
                onClose={closeLightbox}
            />
        </>
    );
}
