import React, { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import { Navbar, PageHeroBanner, Footer } from "@/Components/Layouts";

function GalleryCard({ image, title, desc }) {
    return (
        <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <img
                src={image}
                alt={title}
                className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:translate-y-2 sm:group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-bold text-base leading-tight mb-1">
                    {title}
                </h3>
                <p className="text-white/80 text-xs leading-relaxed opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 sm:delay-75">
                    {desc}
                </p>
            </div>
        </div>
    );
}

export default function KubTalk({ gallery = [] }) {
    const { navLinks = [], footerLinks = [] } = usePage().props;
    const [lightbox, setLightbox] = useState(null);

    return (
        <>
            <Head title="KUB Talk - PPAIP Universitas Bakrie" />

            <div className="min-h-screen bg-white font-sans antialiased">
                <Navbar links={navLinks} />

                <PageHeroBanner
                    title="KUB Talk"
                    subtitle="Serangkaian talk inspiratif yang menghubungkan mahasiswa dengan pemimpin industri"
                    backgroundImage="/assets/kub-talk-1.jpg"
                />

                <section className="py-12 md:py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-8 md:mb-10">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#802324] to-[#ea580c]">
                                    KUB Talk
                                </span>{" "}
                                <span className="text-gray-400 font-normal text-base sm:text-xl block sm:inline">
                                    — Documentation
                                </span>
                            </h2>
                            <p className="mt-2 text-gray-500 text-sm">
                                Serangkaian talk inspiratif yang menghubungkan
                                mahasiswa dengan pemimpin industri
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {gallery.map((item, index) => (
                                <div key={index} onClick={() => setLightbox(index)}>
                                    <GalleryCard
                                        image={item.image}
                                        title={item.title}
                                        desc={item.desc}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {lightbox !== null && gallery[lightbox] && (
                    <div
                        className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
                        onClick={() => setLightbox(null)}
                    >
                        <div
                            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={gallery[lightbox].image}
                                alt={gallery[lightbox].title}
                                className="w-full max-h-[65vh] object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-900">
                                    {gallery[lightbox].title}
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {gallery[lightbox].desc}
                                </p>
                            </div>

                            <button
                                onClick={() => setLightbox(null)}
                                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 cursor-pointer transition-colors"
                                aria-label="Close"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {lightbox > 0 && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 cursor-pointer transition-colors"
                                    aria-label="Previous"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                            )}
                            {lightbox < gallery.length - 1 && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 cursor-pointer transition-colors"
                                    aria-label="Next"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                )}

                <Footer linkColumns={footerLinks} />
            </div>
        </>
    );
}
