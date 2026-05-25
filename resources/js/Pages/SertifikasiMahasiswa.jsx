import React, { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import {
    Briefcase,
    Monitor,
    MessageSquare,
    Home,
    Server,
    Code2,
    Layers,
    Shield,
    FlaskConical,
} from "lucide-react";
import { Navbar, PageHeroBanner, InfoCard, Footer } from "@/Components/Layouts";
import { SectionWrapper } from "@/Components/Elements";

const PRODI_ICONS = {
    "Manajemen": Briefcase,
    "Akuntansi": Monitor,
    "Ilmu Komunikasi": MessageSquare,
    "Teknik Sipil": Home,
    "Sistem Informasi": Server,
    "Teknik Informatika": Code2,
    "Teknik Industri": Layers,
    "Teknik Lingkungan": Shield,
    "Ilmu & Teknologi Pangan": FlaskConical,
};

function ProdiCard({ prodi, onClick }) {
    const available = prodi.certifications.filter(c => c.available).length;
    const total = prodi.certifications.length;
    const Icon = PRODI_ICONS[prodi.name] || Briefcase;

    return (
        <button
            type="button"
            onClick={onClick}
            className="group w-full text-left bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#802324]/30 hover:-translate-y-0.5 transition-all duration-200 flex flex-col p-7 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#802324]/40"
        >
            <Icon className="w-8 h-8 mb-5 text-[#802324]" strokeWidth={2} aria-hidden="true" />

            <h3 className="text-[22px] font-bold leading-tight text-gray-900 mb-5">
                {prodi.name}
            </h3>

            <div className="mt-auto flex items-center gap-3 flex-wrap">
                {available > 0 && (
                    <span
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: "#d1fae5", color: "#065f46" }}
                    >
                        {available} Tersedia
                    </span>
                )}
                <span className="text-sm text-gray-500">{total} sertifikasi</span>
            </div>
        </button>
    );
}

function CertificationRow({ cert, index }) {
    return (
        <div
            className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200"
            style={{ animation: `slideUp 0.4s ease ${index * 60}ms both` }}
        >
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 shrink-0">{index + 1}</div>
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 break-words">{cert.title}</p>
                {cert.issuer && (
                    <span className="mt-1 inline-block text-[11px] font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{cert.issuer}</span>
                )}
            </div>
            <div className="shrink-0 sm:pl-4">
                {cert.available ? (
                    <a
                        href={cert.registerUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 hover:shadow-md transition-all duration-200"
                        style={{ background: "linear-gradient(135deg,#802324,#ea580c)" }}
                    >
                        Daftar
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5-5 5M6 12h12"/></svg>
                    </a>
                ) : (
                    <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-50 text-amber-700 text-sm font-semibold border border-amber-100">⏳ Segera Hadir</span>
                )}
            </div>
        </div>
    );
}

function Modal({ prodi, onClose }) {
    useEffect(() => {
        if (!prodi) return;
        const fn = e => e.key === "Escape" && onClose();
        document.addEventListener("keydown", fn);
        document.body.style.overflow = "hidden";
        return () => { document.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
    }, [prodi, onClose]);

    if (!prodi) return null;
    const available = prodi.certifications.filter(c => c.available).length;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 9999, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", animation: "fadeIn 0.2s ease" }}
            onClick={onClose}
        >
            <div
                className="relative w-full bg-[#F7F7F8] rounded-3xl overflow-hidden flex flex-col"
                style={{ maxWidth: 660, maxHeight: "88vh", boxShadow: "0 24px 64px rgba(0,0,0,0.3)", animation: "popIn 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
                onClick={e => e.stopPropagation()}
            >
                <div className="relative shrink-0 px-5 sm:px-8 py-6 sm:py-9 text-white overflow-hidden" style={{ background: "linear-gradient(135deg,#802324 0%,#a83a26 55%,#ea580c 100%)" }}>
                    <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
                    <p className="text-white/60 text-[11px] font-bold uppercase tracking-widest mb-1.5">Program Studi</p>
                    <h2 className="text-2xl sm:text-3xl font-black break-words pr-12">{prodi.name}</h2>
                    <div className="flex flex-wrap gap-2.5 mt-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(255,255,255,0.15)" }}>{prodi.certifications.length} Total</span>
                        {available > 0 && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold text-emerald-200" style={{ background: "rgba(16,185,129,0.2)" }}>
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />{available} Tersedia
                            </span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 cursor-pointer"
                        style={{ background: "rgba(0,0,0,0.2)" }}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-3">
                    {prodi.certifications.length > 0
                        ? prodi.certifications.map((cert, i) => <CertificationRow key={i} cert={cert} index={i} />)
                        : <div className="py-16 text-center text-gray-400"><p className="text-5xl mb-3">📋</p><p className="font-semibold">Belum ada sertifikasi</p></div>
                    }
                </div>

                <div className="shrink-0 px-6 py-3.5 bg-white border-t border-gray-200 text-center text-xs text-gray-400">
                    Klik <strong className="text-[#802324]">Daftar</strong> untuk mendaftar sertifikasi yang tersedia
                </div>
            </div>
        </div>
    );
}

export default function SertifikasiMahasiswa({ prodiCertifications = [], aboutDescription = "" }) {
    const { navLinks = [], footerLinks = [] } = usePage().props;
    const [selected, setSelected] = useState(null);

    const totalCerts = prodiCertifications.reduce((s, p) => s + p.certifications.length, 0);
    const availableCerts = prodiCertifications.reduce((s, p) => s + p.certifications.filter(c => c.available).length, 0);

    return (
        <>
            <Head title="Sertifikasi Mahasiswa - PPAIP Universitas Bakrie" />
            <style>{`
                @keyframes fadeIn { from{opacity:0} to{opacity:1} }
                @keyframes popIn { from{opacity:0;transform:scale(0.93) translateY(12px)} to{opacity:1;transform:scale(1) translateY(0)} }
                @keyframes slideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
            `}</style>

            <div className="min-h-screen bg-[#f5f5f5]">
                <Navbar links={navLinks} />
                <PageHeroBanner
                    title="Sertifikasi Mahasiswa"
                    subtitle="Temukan dan ikuti program sertifikasi profesional sesuai program studi Anda."
                    backgroundImage="/assets/internship-mandiri.png"
                />

                <section className="relative z-10 -mt-10 mb-16 px-4">
                    <SectionWrapper>
                        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm">
                            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">
                                {[
                                    { val: prodiCertifications.length, label: "Program Studi" },
                                    { val: totalCerts, label: "Total Sertifikasi" },
                                    { val: availableCerts, label: "Tersedia Saat Ini", green: true },
                                ].map(({ val, label, green }) => (
                                    <div key={label} className="flex-1 flex flex-col items-center py-7 px-4">
                                        <span className="text-4xl font-black" style={{ color: green ? "#16a34a" : "#802324" }}>{val}</span>
                                        <span className="mt-1.5 text-xs font-bold uppercase tracking-widest text-gray-400">{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SectionWrapper>
                </section>

                <section className="pb-24">
                    <SectionWrapper>
                        <div className="text-center mb-12">
                            <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest text-[#802324] bg-gray-100 border border-gray-200 mb-6">
                                Sertifikasi Mahasiswa
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                                Pilih Program Studi
                            </h2>
                            <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
                                Klik pada kartu program studi untuk melihat sertifikasi yang tersedia dan cara pendaftarannya.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {prodiCertifications.map((prodi, i) => (
                                <ProdiCard key={i} prodi={prodi} onClick={() => setSelected(prodi)} />
                            ))}
                        </div>
                    </SectionWrapper>
                </section>

                <InfoCard title="Tentang Sertifikasi" description={aboutDescription} />
                <Footer linkColumns={footerLinks} />
            </div>

            <Modal prodi={selected} onClose={() => setSelected(null)} />
        </>
    );
}
