import React from "react";
import { SectionWrapper } from "../Elements";
import { InternshipProdiCard } from "../Fragments";
export function InternshipProdiGrid({ prodiList }) {
    return (
        <section className="py-8">
            <SectionWrapper>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                    Statistik Tiap Program Studi
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {prodiList.map((prodi, index) => (
                        <InternshipProdiCard
                            key={index}
                            name={prodi.name}
                            kub={prodi.kub}
                            nonKub={prodi.nonKub}
                        />
                    ))}
                </div>
            </SectionWrapper>
        </section>
    );
}
