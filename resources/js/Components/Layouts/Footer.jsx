import React from "react";
import { SectionWrapper } from "../Elements";

function FooterWave() {
    const WAVELENGTH = 176;
    const BASE_X = -176; // Offset satu wave biar loop animasi gak kelihatan putus.

    const layers = [
        { className: "layer-back", y: 0, fill: "rgba(245,166,35,0.3)" },
        { className: "layer-mid1", y: 3, fill: "rgba(128,35,36,0.5)" },
        { className: "layer-mid2", y: 5, fill: "rgba(128,35,36,0.7)" },
        { className: "layer-front", y: 7, fill: "#5d1111" },
    ];

    return (
        <div className="relative w-full overflow-hidden leading-0 -mb-px">
            <style>{`
        @keyframes footerWaveFlow {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(${WAVELENGTH}px, 0, 0); }
        }
        .footer-wave-parallax {
          animation-name: footerWaveFlow;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
        }
        .footer-wave-parallax.layer-back  { animation-duration: 22s; }
        .footer-wave-parallax.layer-mid1  { animation-duration: 18s; }
        .footer-wave-parallax.layer-mid2  { animation-duration: 14s; }
        .footer-wave-parallax.layer-front { animation-duration: 10s; }
      `}</style>
            <svg
                className="relative block w-full h-20 sm:h-27.5 md:h-35"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28"
                preserveAspectRatio="none"
            >
                <defs>
                    <path
                        id="footer-wave-path"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    />
                </defs>

                {layers.map(({ className, y, fill }) => (
                    <g
                        key={className}
                        className={`footer-wave-parallax ${className}`}
                    >
                        {/* Tiga tile bikin wave tetap nyambung pas animasi jalan. */}
                        <use
                            xlinkHref="#footer-wave-path"
                            x={BASE_X}
                            y={y}
                            fill={fill}
                        />
                        <use
                            xlinkHref="#footer-wave-path"
                            x={BASE_X + WAVELENGTH}
                            y={y}
                            fill={fill}
                        />
                        <use
                            xlinkHref="#footer-wave-path"
                            x={BASE_X + WAVELENGTH * 2}
                            y={y}
                            fill={fill}
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
}

export function Footer({ linkColumns }) {
    return (
        <footer className="relative">
            <FooterWave />

            <div className="bg-[#5d1111]">
                <SectionWrapper className="py-10 md:py-14">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start sm:col-span-2 md:col-span-1">
                            <img
                                src="/assets/logo-bakrie.png"
                                alt="Universitas Bakrie Logo"
                                className="h-12 sm:h-14 w-auto opacity-90"
                            />
                        </div>

                        {linkColumns.map((column, colIndex) => (
                            <div
                                key={colIndex}
                                className="flex flex-col gap-3 items-center sm:items-start"
                            >
                                {column.items.map((link, linkIndex) => {
                                    const label =
                                        typeof link === "string"
                                            ? link
                                            : link.label;
                                    const url =
                                        typeof link === "string"
                                            ? "#"
                                            : link.url || "#";
                                    return (
                                        <a
                                            key={linkIndex}
                                            href={url}
                                            className="text-white/80 text-sm hover:text-[#F5A623] transition-colors duration-200"
                                        >
                                            {label}
                                        </a>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </SectionWrapper>

                <div className="border-t border-white/10">
                    <SectionWrapper className="py-5">
                        <p className="text-center text-white/50 text-xs">
                            © 2025{" "}
                            <span className="font-bold text-white/70">
                                UPT PPAIP
                            </span>{" "}
                            – Universitas Bakrie. All Rights Reserved.
                        </p>
                    </SectionWrapper>
                </div>
            </div>
        </footer>
    );
}
