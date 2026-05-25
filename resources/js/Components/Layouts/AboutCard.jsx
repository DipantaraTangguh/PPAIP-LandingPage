import React from "react";
import { SectionWrapper } from "../Elements";

// ============================================================
// Organism: AboutCard
// ============================================================
export function AboutCard({ description }) {
    return (
        <section className="relative z-20 -mt-20 sm:-mt-24 md:-mt-24 pb-12">
            <SectionWrapper>
                <div className="bg-white rounded-2xl shadow-xl shadow-black/8 p-6 sm:p-8 md:p-10">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center">
                        <div className="md:w-2/5 shrink-0 md:pl-5 py-1">
                            <h2 className="text-2xl md:text-3xl font-extrabold leading-tight text-transparent bg-clip-text bg-linear-to-r from-[#802324] to-[#ea580c]">
                                PPAIP Universitas Bakrie
                            </h2>
                        </div>

                        <div className="md:w-3/5">
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed text-justify">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </section>
    );
}
