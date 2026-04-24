import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, CarouselDot, SectionWrapper } from '../atoms';
import { ProgramCard, FaqItem } from '../molecules';

// ============================================================
// Organism: Navbar
// ============================================================
export function Navbar({ links }) {
  return (
    <nav className="bg-[#6B1B1B]">
      <SectionWrapper className="flex items-stretch justify-between min-h-[56px]">
        <div className="flex items-center gap-3 py-3">
          <img
            src="/assets/logo-bakrie.png"
            alt="Universitas Bakrie Logo"
            className="h-9 w-auto"
          />
          <span className="text-white text-sm font-medium tracking-wide hidden sm:inline">
            PPAIP Universitas Bakrie
          </span>
        </div>

        <div className="flex items-stretch gap-1">
          {links.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>
      </SectionWrapper>
    </nav>
  );
}

// ============================================================
// Organism: HeroBanner
// ============================================================
export function HeroBanner() {
  return (
    <section className="relative h-[420px] md:h-[480px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/hero-image.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#6B1B1B]/85 via-[#6B1B1B]/60 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex items-center h-full">
        <div className="pb-24">
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold italic text-white leading-[1.1] tracking-tight"
            style={{
              textShadow:
                '0 0 30px rgba(255,255,255,0.15), 0 0 60px rgba(255,255,255,0.08)',
            }}
          >
            Experience
            <br />
            The Real Things
          </h1>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Organism: AboutCard
// ============================================================
export function AboutCard({ description }) {
  return (
    <section className="relative z-20 -mt-28 md:-mt-24 pb-12">
      <SectionWrapper>
        <div className="bg-white rounded-2xl shadow-xl shadow-black/8 p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
            <div className="md:w-2/5 flex-shrink-0 pl-5 py-1">
              <h2 className="text-2xl md:text-3xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#6B1B1B] to-[#C4571A]">
                PPAIP Universitas Bakrie
              </h2>
            </div>

            <div className="md:w-3/5">
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}

// ============================================================
// Organism: ProgramCarousel
// ============================================================
const VISIBLE_CARDS = 3;
const AUTO_SLIDE_INTERVAL = 3000;

export function ProgramCarousel({ programs }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const maxSlide = programs.length - VISIBLE_CARDS;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  }, [maxSlide]);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(nextSlide, AUTO_SLIDE_INTERVAL);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, nextSlide]);

  const slideOffset = currentSlide * (100 / VISIBLE_CARDS);

  return (
    <section className="pb-16">
      <SectionWrapper
        className=""
      >
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Carousel Track */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${slideOffset}%)` }}
            >
              {programs.map((program, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{ width: `${100 / VISIBLE_CARDS}%` }}
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

// ============================================================
// Organism: FaqSection
// ============================================================
export function FaqSection({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="pb-16">
      <SectionWrapper className="space-y-4">
        {items.map((item, index) => (
          <FaqItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </SectionWrapper>
    </section>
  );
}

// ============================================================
// Organism: Footer
// ============================================================
export function Footer({ linkColumns }) {
  return (
    <footer className="bg-[#6B1B1B]">
      <SectionWrapper className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="flex items-start">
            <img
              src="/assets/logo-bakrie.png"
              alt="Universitas Bakrie Logo"
              className="h-14 w-auto opacity-90"
            />
          </div>

          {linkColumns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3">
              {column.items.map((linkText, linkIndex) => (
                <a
                  key={linkIndex}
                  href="#"
                  className="text-white/80 text-sm hover:text-yellow-300 transition-colors duration-200"
                >
                  {linkText}
                </a>
              ))}
            </div>
          ))}
        </div>
      </SectionWrapper>

      <div className="border-t border-white/10">
        <SectionWrapper className="py-4">
          <p className="text-center text-white/50 text-xs">
            Copyright 2025, Bakrie University
          </p>
        </SectionWrapper>
      </div>
    </footer>
  );
}
