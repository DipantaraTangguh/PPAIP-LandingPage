import { SectionWrapper } from "../Elements";
import { DonutChart } from "../Fragments";
export function DonutSummarySection({ kub, nonKub, bumn }) {
    return (
        <section className="py-4">
            <SectionWrapper>
                <DonutChart kub={kub} nonKub={nonKub} bumn={bumn} />
            </SectionWrapper>
        </section>
    );
}
