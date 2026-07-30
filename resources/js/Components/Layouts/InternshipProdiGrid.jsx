import { useEffect, useMemo, useRef, useState } from "react";
import {
    BookOpen,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    Sparkles,
    X,
} from "lucide-react";
import { SectionWrapper } from "../Elements";
import { InternshipProdiCard } from "../Fragments";

function buildCatalogPageUrl(url, page) {
    if (!page) return null;

    const safeUrl = encodeURI(url);
    const pageNumber = Number(page);
    const separator = safeUrl.includes("#") ? "&" : "#";

    return `${safeUrl}${separator}page=${pageNumber}&toolbar=0&navpanes=0&view=FitH`;
}

function CatalogModal({
    url,
    items,
    activeIndex,
    activeYear,
    onSelect,
    onClose,
}) {
    const dialogRef = useRef(null);
    const activeItem = items[activeIndex] || items[0];
    const hasCatalog = Boolean(activeItem?.catalogStartPage);
    const catalogPageUrl = buildCatalogPageUrl(
        url,
        activeItem?.catalogStartPage,
    );
    const isFirst = activeIndex <= 0;
    const isLast = activeIndex >= items.length - 1;

    useEffect(() => {
        dialogRef.current?.showModal();
    }, []);

    const goPrev = () => {
        if (!isFirst) {
            onSelect(activeIndex - 1);
        }
    };

    const goNext = () => {
        if (!isLast) {
            onSelect(activeIndex + 1);
        }
    };

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            onClick={(e) => e.target === e.currentTarget && onClose()}
            aria-labelledby="student-catalog-title"
            className="relative m-auto open:grid max-h-[95vh] w-full max-w-7xl overflow-hidden rounded-4xl border border-white/15 bg-brand-night p-0 shadow-[0_40px_140px_rgba(0,0,0,0.55)] animate-catalog-slide-up lg:grid-cols-[0.82fr_1.35fr] backdrop:bg-brand-night/80 backdrop:backdrop-blur-xl"
        >
            <div className="relative flex min-h-144 flex-col overflow-hidden bg-linear-to-br from-brand-primary via-brand-deep to-brand-night p-6 text-white sm:p-8">
                <div className="pointer-events-none absolute -left-24 top-8 h-64 w-64 rounded-full bg-brand-gold/18 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full bg-brand-copper/30 blur-3xl" />

                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-5 top-5 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition hover:rotate-90 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-nav-active-gold lg:hidden"
                    aria-label="Tutup katalog"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="relative z-10">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-gold/35 bg-brand-gold/15 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.22em] text-nav-active-gold">
                        <Sparkles className="h-3.5 w-3.5" />
                        Student Catalog Lookbook
                    </div>

                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/55">
                        {activeYear
                            ? `Katalog Magang ${activeYear}`
                            : "Katalog Magang"}
                    </p>
                    <h3
                        id="student-catalog-title"
                        className="text-3xl font-black leading-tight sm:text-4xl"
                    >
                        {activeItem.name}
                    </h3>

                    <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                        <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                            <p className="text-xl font-black">
                                {activeItem.kub}%
                            </p>
                            <p
                                className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/50 notranslate"
                                translate="no"
                            >
                                KUB
                            </p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                            <p className="text-xl font-black">
                                {activeItem.nonKub}%
                            </p>
                            <p
                                className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/50 notranslate"
                                translate="no"
                            >
                                External
                            </p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                            <p className="text-xl font-black">
                                {activeItem.bumn}%
                            </p>
                            <p
                                className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/50 notranslate"
                                translate="no"
                            >
                                BUMN
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 mt-8 flex-1 overflow-y-auto pr-1">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-white/45">
                        Pilih Program Studi
                    </p>
                    <div className="grid gap-2">
                        {items.map((item, index) => {
                            const isActive = index === activeIndex;

                            return (
                                <button
                                    key={item.name}
                                    type="button"
                                    onClick={() => onSelect(index)}
                                    className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all duration-300 ${
                                        isActive
                                            ? "border-nav-active-gold bg-nav-active-gold text-brand-ink shadow-[0_14px_34px_rgba(255,208,90,0.2)]"
                                            : "border-white/10 bg-white/7 text-white/72 hover:border-white/25 hover:bg-white/12 hover:text-white"
                                    }`}
                                >
                                    <span>{item.name}</span>
                                    <span className="text-xs opacity-70">
                                        {item.catalogStartPage
                                            ? `p. ${item.catalogStartPage}`
                                            : "blank"}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="relative z-10 mt-6 flex flex-wrap items-center gap-3">
                    <button
                        type="button"
                        onClick={goPrev}
                        disabled={isFirst}
                        className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/18 disabled:cursor-not-allowed disabled:opacity-35"
                        aria-label="Program studi sebelumnya"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        onClick={goNext}
                        disabled={isLast}
                        className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/18 disabled:cursor-not-allowed disabled:opacity-35"
                        aria-label="Program studi berikutnya"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-black uppercase tracking-[0.14em] text-brand-primary shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-cream"
                    >
                        Download Katalog
                        <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                </div>
            </div>

            <div className="relative flex min-h-136 flex-col bg-[#f8efe3] p-4 sm:p-6">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-5 top-5 z-20 hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-brand-primary/10 bg-white/85 text-brand-primary shadow-lg backdrop-blur transition hover:rotate-90 hover:bg-brand-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold lg:flex"
                    aria-label="Tutup katalog"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="mb-4 flex flex-wrap items-center gap-3 pr-12">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-primary shadow-sm">
                        <BookOpen className="h-4 w-4" />
                        {hasCatalog
                            ? `Page ${activeItem.catalogStartPage}`
                            : "Blank"}
                    </div>
                    <div className="rounded-full border border-brand-card-border bg-brand-cream px-3.5 py-2 text-xs font-semibold text-brand-brown">
                        {hasCatalog
                            ? `Katalog Mahasiswa ${activeItem.name}`
                            : "Katalog belum tersedia"}
                    </div>
                </div>

                <div className="relative flex-1 rounded-[1.6rem] bg-linear-to-br from-white via-brand-cream to-[#ead8c4] p-3 shadow-[inset_0_0_0_1px_rgba(107,27,27,0.08),0_28px_70px_rgba(58,13,13,0.2)]">
                    <div className="pointer-events-none absolute bottom-4 left-1/2 top-4 z-10 hidden w-px bg-linear-to-b from-transparent via-brand-primary/14 to-transparent lg:block" />
                    {hasCatalog ? (
                        <iframe
                            key={`${activeItem.name}-${activeItem.catalogStartPage}`}
                            src={catalogPageUrl}
                            title={`Katalog ${activeItem.name}`}
                            className="h-[72vh] min-h-120 w-full rounded-[1.2rem] border-0 bg-white shadow-[0_18px_50px_rgba(58,13,13,0.12)]"
                            loading="lazy"
                        />
                    ) : (
                        <div className="flex h-[72vh] min-h-120 flex-col items-center justify-center rounded-[1.2rem] border border-dashed border-brand-primary/20 bg-white/72 p-8 text-center shadow-[0_18px_50px_rgba(58,13,13,0.08)]">
                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-cream text-brand-primary">
                                <BookOpen className="h-8 w-8" />
                            </div>
                            <h4 className="text-2xl font-black text-brand-heading">
                                Katalog belum tersedia
                            </h4>
                            <p className="mt-3 max-w-md text-sm leading-6 text-brand-body-muted">
                                Katalog Comingsoon.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </dialog>
    );
}

export function InternshipProdiGrid({ prodiList, catalogUrl, activeYear }) {
    const [selectedCatalogIndex, setSelectedCatalogIndex] = useState(null);
    const catalogItems = useMemo(
        () =>
            prodiList.map((prodi) => {
                const page = Number(prodi.catalogStartPage);

                return {
                    ...prodi,
                    catalogStartPage:
                        Number.isFinite(page) && page > 0 ? page : null,
                };
            }),
        [prodiList],
    );
    const showCatalog = selectedCatalogIndex !== null;
    const firstCatalogIndex = catalogItems.findIndex(
        (item) => item.catalogStartPage,
    );

    const openCatalog = (index = 0) => {
        if (!catalogUrl || catalogItems.length === 0) return;
        setSelectedCatalogIndex(index >= 0 ? index : 0);
    };

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
                                type="button"
                                onClick={() => openCatalog(firstCatalogIndex)}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary text-white text-sm font-semibold hover:bg-brand-hover transition-colors shadow-sm hover:shadow-md shrink-0 cursor-pointer"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    />
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
                                catalogStartPage={prodi.catalogStartPage}
                                onClick={() => openCatalog(index)}
                            />
                        ))}
                    </div>
                </SectionWrapper>
            </section>

            {showCatalog && catalogUrl && (
                <CatalogModal
                    url={catalogUrl}
                    items={catalogItems}
                    activeIndex={selectedCatalogIndex}
                    activeYear={activeYear}
                    onSelect={setSelectedCatalogIndex}
                    onClose={() => setSelectedCatalogIndex(null)}
                />
            )}
        </>
    );
}
