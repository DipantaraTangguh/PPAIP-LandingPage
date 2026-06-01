import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CarouselDot, SectionWrapper } from "../Elements";
import { ProdiStatCard } from "../Fragments";

// ============================================================
// Organism: ProdiStatsGrid
// ============================================================
const CARDS_PER_PAGE = 6;

export function ProdiStatsGrid({ stats }) {
    const totalPages = Math.ceil(stats.length / CARDS_PER_PAGE);
    const [currentPage, setCurrentPage] = useState(0);

    const prevPage = () => {
        setCurrentPage((prev) => (prev <= 0 ? totalPages - 1 : prev - 1));
    };

    const nextPage = () => {
        setCurrentPage((prev) => (prev >= totalPages - 1 ? 0 : prev + 1));
    };

    // Chunk stats into pages of 6
    const pages = [];
    for (let i = 0; i < stats.length; i += CARDS_PER_PAGE) {
        pages.push(stats.slice(i, i + CARDS_PER_PAGE));
    }

    return (
        <section className="py-16">
            <SectionWrapper className="relative">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-[#802324] to-[#ea580c]">
                        Statistik Program Studi
                    </span>
                </h2>

                <div className="relative">
                    {/* Left Arrow */}
                    {totalPages > 1 && (
                        <button
                            onClick={prevPage}
                            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md border border-gray-100 items-center justify-center text-[#802324] hover:bg-gray-50 hover:scale-110 cursor-pointer transition-all focus:outline-none"
                            aria-label="Previous page"
                        >
                            <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
                        </button>
                    )}

                    {/* Carousel Track */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${currentPage * 100}%)`,
                            }}
                        >
                            {pages.map((pageStats, pageIndex) => (
                                <div
                                    key={pageIndex}
                                    className="w-full shrink-0"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {pageStats.map((stat, index) => (
                                            <ProdiStatCard
                                                key={index}
                                                name={stat.name}
                                                count={stat.count}
                                                variant="maroon"
                                                href={stat.href}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Arrow */}
                    {totalPages > 1 && (
                        <button
                            onClick={nextPage}
                            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md border border-gray-100 items-center justify-center text-[#802324] hover:bg-gray-50 hover:scale-110 cursor-pointer transition-all focus:outline-none"
                            aria-label="Next page"
                        >
                            <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
                        </button>
                    )}
                </div>

                {/* Pagination Dots */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <CarouselDot
                                key={i}
                                isActive={currentPage === i}
                                onClick={() => setCurrentPage(i)}
                            />
                        ))}
                    </div>
                )}
            </SectionWrapper>
        </section>
    );
}
