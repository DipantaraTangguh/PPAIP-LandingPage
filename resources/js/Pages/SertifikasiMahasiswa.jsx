import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
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
    MoveRight,
    Clock3,
    X,
} from "lucide-react";
import { Navbar, PageHeroBanner, InfoCard, Footer } from "@/Components/Layouts";
import { SectionWrapper } from "@/Components/Elements";
import Seo from "@/Components/Seo";

const PRODI_ICONS = {
    Manajemen: Briefcase,
    Akuntansi: Monitor,
    "Ilmu Komunikasi": MessageSquare,
    "Teknik Sipil": Home,
    "Sistem Informasi": Server,
    "Teknik Informatika": Code2,
    "Teknik Industri": Layers,
    "Teknik Lingkungan": Shield,
    "Ilmu & Teknologi Pangan": FlaskConical,
};

function ProdiCard({ prodi, onClick }) {
    const available = prodi.certifications.filter((c) => c.available).length;
    const total = prodi.certifications.length;
    const Icon = PRODI_ICONS[prodi.name] || Briefcase;

    return (
        <button
            type="button"
            onClick={onClick}
            className="group w-full cursor-pointer text-left bg-white rounded-xl border border-gray-200 shadow-[0_1px_0_rgba(15,23,42,0.04)] hover:border-[#802324]/35 hover:shadow-md transition-all duration-200 flex flex-col p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#802324]/30"
        >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#802324]/8 text-[#802324] transition-colors duration-200 group-hover:bg-[#802324] group-hover:text-white">
                <Icon className="w-6 h-6" strokeWidth={2} aria-hidden="true" />
            </div>

            <h3 className="text-xl font-bold leading-tight text-gray-900 mb-5">
                {prodi.name}
            </h3>

            <div className="mt-auto flex items-center gap-3 flex-wrap">
                {available > 0 && (
                    <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                        {available} Tersedia
                    </span>
                )}
                <span className="text-sm text-gray-500">
                    {total} sertifikasi
                </span>
            </div>
        </button>
    );
}

function CertificationRow({ cert, index }) {
    return (
        <div
            className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-[#802324]/25 hover:shadow-sm"
            style={{ animation: `slideUp 0.4s ease ${index * 60}ms both` }}
        >
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 shrink-0">
                {index + 1}
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 wrap-break-word">
                    {cert.title}
                </p>
                {cert.issuer && (
                    <span className="mt-1.5 inline-block rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                        {cert.issuer}
                    </span>
                )}
            </div>
            <div className="shrink-0 sm:pl-4">
                {cert.available ? (
                    <a
                        href={cert.registerUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#802324] px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-[#5d1111] hover:shadow-sm"
                    >
                        Daftar
                        <MoveRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </a>
                ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-700">
                        <Clock3 className="h-4 w-4" strokeWidth={2} />
                        Segera Hadir
                    </span>
                )}
            </div>
        </div>
    );
}

function Modal({ prodi, onClose }) {
    const isOpen = prodi !== null;
    const focusTrapRef = useFocusTrap(isOpen);

    useEffect(() => {
        if (!prodi) return;
        const fn = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", fn);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", fn);
            document.body.style.overflow = "";
        };
    }, [prodi, onClose]);

    if (!prodi) return null;
    const available = prodi.certifications.filter((c) => c.available).length;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{
                zIndex: 9999,
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(6px)",
                animation: "fadeIn 0.2s ease",
            }}
            onClick={onClose}
        >
            <div
                ref={focusTrapRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="certification-modal-title"
                className="relative w-full overflow-hidden rounded-2xl bg-[#f7f4f1] flex flex-col"
                style={{
                    maxWidth: 660,
                    maxHeight: "88vh",
                    boxShadow: "0 22px 60px rgba(15,23,42,0.28)",
                    animation: "popIn 0.28s ease-out",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative shrink-0 overflow-hidden border-b border-[#5d1111]/10 bg-[#802324] px-5 py-6 text-white sm:px-8 sm:py-8">
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/60">
                        Program Studi
                    </p>
                    <h2 id="certification-modal-title" className="pr-12 text-2xl font-extrabold leading-tight wrap-break-word sm:text-3xl">
                        {prodi.name}
                    </h2>
                    <div className="flex flex-wrap gap-2.5 mt-4">
                        <span className="rounded-md bg-white/12 px-3 py-1 text-xs font-semibold ring-1 ring-white/15">
                            {prodi.certifications.length} Total
                        </span>
                        {available > 0 && (
                            <span className="rounded-md bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-100 ring-1 ring-emerald-200/15">
                                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-300" />
                                {available} Tersedia
                            </span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-black/20 text-white transition-all duration-200 hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                        aria-label="Tutup modal"
                    >
                        <X className="w-5 h-5" strokeWidth={2.5} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-3 sm:px-6">
                    {prodi.certifications.length > 0 ? (
                        prodi.certifications.map((cert, i) => (
                            <CertificationRow key={i} cert={cert} index={i} />
                        ))
                    ) : (
                        <div className="py-16 text-center text-gray-400">
                            <p className="font-semibold">
                                Belum ada sertifikasi
                            </p>
                        </div>
                    )}
                </div>

                <div className="shrink-0 border-t border-gray-200 bg-white px-6 py-3.5 text-center text-xs text-gray-500">
                    Klik <strong className="text-[#802324]">Daftar</strong>{" "}
                    untuk mendaftar sertifikasi yang tersedia
                </div>
            </div>
        </div>
    );
}

export default function SertifikasiMahasiswa({
    prodiCertifications = [],
    aboutDescription = "",
    bannerImage = "/assets/internship-mandiri.png",
}) {
    const { navLinks = [], footerLinks = [] } = usePage().props;
    const [selected, setSelected] = useState(null);

    const totalCerts = prodiCertifications.reduce(
        (s, p) => s + p.certifications.length,
        0,
    );
    const availableCerts = prodiCertifications.reduce(
        (s, p) => s + p.certifications.filter((c) => c.available).length,
        0,
    );

    return (
        <>
            <Seo
                title="Sertifikasi Mahasiswa"
                description="Temukan program sertifikasi profesional untuk mahasiswa Universitas Bakrie berdasarkan program studi dan ketersediaan pendaftaran."
                image={bannerImage}
            />
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
                    backgroundImage={bannerImage}
                />

                <section className="relative z-10 -mt-10 mb-16 px-4">
                    <SectionWrapper>
                        <div className="max-w-3xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">
                                {[
                                    {
                                        val: prodiCertifications.length,
                                        label: "Program Studi",
                                    },
                                    {
                                        val: totalCerts,
                                        label: "Total Sertifikasi",
                                    },
                                    {
                                        val: availableCerts,
                                        label: "Tersedia Saat Ini",
                                        green: true,
                                    },
                                ].map(({ val, label, green }) => (
                                    <div
                                        key={label}
                                        className="flex-1 flex flex-col items-center py-7 px-4"
                                    >
                                        <span
                                            className="text-4xl font-extrabold"
                                            style={{
                                                color: green
                                                    ? "#15803d"
                                                    : "#802324",
                                            }}
                                        >
                                            {val}
                                        </span>
                                        <span className="mt-1.5 text-xs font-semibold uppercase tracking-widest text-gray-500">
                                            {label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SectionWrapper>
                </section>

                <section className="pb-24">
                    <SectionWrapper>
                        <div className="text-center mb-12">
                            <span className="inline-block rounded-md border border-gray-200 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#802324] shadow-sm mb-6">
                                Sertifikasi Mahasiswa
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                                Pilih Program Studi
                            </h2>
                            <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
                                Klik pada kartu program studi untuk melihat
                                sertifikasi yang tersedia dan cara
                                pendaftarannya.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {prodiCertifications.map((prodi, i) => (
                                <ProdiCard
                                    key={i}
                                    prodi={prodi}
                                    onClick={() => setSelected(prodi)}
                                />
                            ))}
                        </div>
                    </SectionWrapper>
                </section>

                <InfoCard
                    title="Tentang Sertifikasi"
                    description={aboutDescription}
                />
                <Footer linkColumns={footerLinks} />
            </div>

            <Modal prodi={selected} onClose={() => setSelected(null)} />
        </>
    );
}
