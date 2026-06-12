import { SectionWrapper } from "../Elements";

export function AboutCard({ description }) {
    return (
        <section className="relative overflow-hidden bg-linear-to-b from-brand-dark/8 via-white to-white py-10 sm:py-12 md:py-14">
            <div
                aria-hidden="true"
                className="absolute -left-20 top-0 h-52 w-52 rounded-full bg-brand-primary/12 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-chart-bumn/7 blur-3xl"
            />

            <SectionWrapper className="relative">
                <div className="overflow-hidden rounded-2xl border border-brand-dark/15 bg-linear-to-br from-white via-white to-brand-dark/6 shadow-[0_16px_45px_rgba(70,20,20,0.10)]">
                    <div className="relative p-7 sm:p-9 md:p-10">
                        <p className="relative text-sm leading-7 text-brand-body-muted sm:text-base sm:leading-8 md:px-5 md:text-left">
                            {description}
                        </p>
                    </div>
                </div>
            </SectionWrapper>
        </section>
    );
}
