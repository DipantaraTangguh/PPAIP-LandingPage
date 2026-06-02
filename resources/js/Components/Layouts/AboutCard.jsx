import React from "react";
import { SectionWrapper } from "../Elements";
export function AboutCard({ description }) {
    return (
        <section className="relative z-20 -mt-20 sm:-mt-24 md:-mt-24 pb-12">
            <SectionWrapper>
                <div className="bg-white rounded-2xl shadow-xl shadow-black/8 p-6 sm:p-8 md:p-10">
                    <div className="flex flex-col gap-6 items-start">
                        <div className="w-full">
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
