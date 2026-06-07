import { useState } from "react";
import { SectionWrapper } from "../Elements";
import { InternshipProdiCard } from "../Fragments";

/* ── PDF Viewer Modal ──────────────────────────────────── */
function CatalogModal({ url, onClose }) {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 md:p-6"
            style={{
                zIndex: 9999,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)",
                animation: "catalogFadeIn 0.2s ease",
            }}
            onClick={onClose}
        >
            <style>{`
                @keyframes catalogFadeIn { from{opacity:0} to{opacity:1} }
                @keyframes catalogSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
            `}</style>

            <div
                className="relative w-full max-w-7xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                style={{
                    maxHeight: "95vh",
                    animation: "catalogSlideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* ── Window title bar ──────────────────── */}
                <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-[#6B1B1B] to-[#a03420]">
                    <div className="flex items-center gap-3">
                        {/* Traffic-light dots */}
                        <div className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-red-400/80 border border-red-500/30" />
                            <span className="w-3 h-3 rounded-full bg-yellow-400/80 border border-yellow-500/30" />
                            <span className="w-3 h-3 rounded-full bg-green-400/80 border border-green-500/30" />
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                            <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-sm font-semibold text-white/90 truncate">
                                Katalog Mahasiswa Magang
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-medium transition-colors"
                            title="Buka di tab baru"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Buka
                        </a>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Tutup"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ── Embedded PDF ──────────────────────── */}
                <div className="flex-1 bg-gray-100" style={{ minHeight: "80vh" }}>
                    <iframe
                        src={url}
                        title="Katalog Mahasiswa Magang"
                        className="w-full h-full border-0"
                        style={{ minHeight: "80vh" }}
                    />
                </div>
            </div>
        </div>
    );
}

/* ── Main Component ────────────────────────────────────── */
export function InternshipProdiGrid({ prodiList, catalogUrl }) {
    const [showCatalog, setShowCatalog] = useState(false);

    return (
        <>
            <section className="py-8">
                <SectionWrapper>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                            Statistik Tiap Program Studi
                        </h2>
                        {catalogUrl && (
                            <button
                                onClick={() => setShowCatalog(true)}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6B1B1B] text-white text-sm font-semibold hover:bg-[#7d2222] transition-colors shadow-sm hover:shadow-md shrink-0 cursor-pointer"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Katalog Mahasiswa
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {prodiList.map((prodi, index) => (
                            <InternshipProdiCard
                                key={index}
                                name={prodi.name}
                                kub={prodi.kub}
                                nonKub={prodi.nonKub}
                                bumn={prodi.bumn}
                            />
                        ))}
                    </div>
                </SectionWrapper>
            </section>

            {showCatalog && catalogUrl && (
                <CatalogModal
                    url={catalogUrl}
                    onClose={() => setShowCatalog(false)}
                />
            )}
        </>
    );
}
