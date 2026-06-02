import React from "react";
import { SectionWrapper } from "../Elements";
import { DonutChart } from "../Fragments";
export function DonutSummarySection({ kub, nonKub }) {
    return (
        <section className="py-4">
            <SectionWrapper>
                <DonutChart kub={kub} nonKub={nonKub} />
            </SectionWrapper>
        </section>
    );
}
