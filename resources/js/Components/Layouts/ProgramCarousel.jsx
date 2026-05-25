import React, { useState, useEffect, useRef, useCallback } from "react";
import { CarouselDot, SectionWrapper } from "../Elements";
import { ProgramCard } from "../Fragments";

// ============================================================
// Organism: ProgramCarousel
// ============================================================
const AUTO_SLIDE_INTERVAL = 3000;

// Responsive visible-card count: 1 (mobile) / 2 (sm) / 3 (md+)
function useVisibleCards() {
    const [count, setCount] = useState(() => {
        if (typeof window === "undefined") return 3;
        if (window.innerWidth >= 768) return 3;
        if (window.innerWidth >= 640) return 2;
        return 1;
    });

    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            setCount(w >= 768 ? 3 : w >= 640 ? 2 : 1);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return count;
}

export function ProgramCarousel({ programs }) {
    const visibleCards = useVisibleCards();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);

    const maxSlide = Math.max(0, programs.length - visibleCards);

    // Clamp currentSlide if visibleCards grows past current position
    useEffect(() => {
        setCurrentSlide((prev) => Math.min(prev, maxSlide));
    }, [maxSlide]);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, [maxSlide]);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
    }, [maxSlide]);

    useEffect(() => {
        if (!isPaused) {
            intervalRef.current = setInterval(nextSlide, AUTO_SLIDE_INTERVAL);
        }
        return () => clearInterval(intervalRef.current);
    }, [isPaused, nextSlide]);

    const slideOffset = currentSlide * (100 / visibleCards);

    return (
        <section className="pb-16">
            <SectionWrapper className="">
                <div
                    className="relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Carousel Track */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${slideOffset}%)`,
                            }}
                        >
                            {programs.map((program, index) => (
                                <div
                                    key={index}
                                    className="shrink-0"
                                    style={{ width: `${100 / visibleCards}%` }}
                                >
                                    <ProgramCard
                                        name={program.name}
                                        image={program.image}
                                        link={program.link}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Prev / Next floating arrows */}
                    {maxSlide > 0 && (
                        <>
                            <button
                                type="button"
                                onClick={prevSlide}
                                aria-label="Previous slide"
                                className="absolute top-1/2 left-2 sm:-left-4 md:-left-6 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 text-[#802324] shadow-lg ring-1 ring-black/5 backdrop-blur transition hover:bg-[#802324] hover:text-white hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#802324]"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.78 15.53a.75.75 0 0 1-1.06 0L6.47 10.28a.75.75 0 0 1 0-1.06l5.25-5.25a.75.75 0 1 1 1.06 1.06L8.06 9.75l4.72 4.72a.75.75 0 0 1 0 1.06Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={nextSlide}
                                aria-label="Next slide"
                                className="absolute top-1/2 right-2 sm:-right-4 md:-right-6 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 text-[#802324] shadow-lg ring-1 ring-black/5 backdrop-blur transition hover:bg-[#802324] hover:text-white hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#802324]"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.22 4.47a.75.75 0 0 1 1.06 0l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 1 1-1.06-1.06l4.72-4.72-4.72-4.72a.75.75 0 0 1 0-1.06Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </>
                    )}

                    {/* Dots */}
                    <div className="flex items-center justify-center gap-2 mt-8">
                        {Array.from({ length: maxSlide + 1 }).map((_, i) => (
                            <CarouselDot
                                key={i}
                                isActive={currentSlide === i}
                                onClick={() => setCurrentSlide(i)}
                            />
                        ))}
                    </div>
                </div>
            </SectionWrapper>
        </section>
    );
}
