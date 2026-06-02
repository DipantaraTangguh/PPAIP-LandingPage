import React from "react";
import { SectionWrapper } from "../Elements";
import { YearFilterPill } from "../Fragments";
export function YearFilter({ years, activeYear, onYearChange }) {
    return (
        <section className="pt-6 pb-4">
            <SectionWrapper>
                <div className="flex flex-row flex-wrap gap-2">
                    {years.map((year) => (
                        <YearFilterPill
                            key={year}
                            year={year}
                            isActive={year === activeYear}
                            onClick={() => onYearChange(year)}
                        />
                    ))}
                </div>
            </SectionWrapper>
        </section>
    );
}
