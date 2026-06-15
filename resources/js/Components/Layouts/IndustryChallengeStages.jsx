import {
    ArrowDown,
    ArrowRight,
    Handshake,
    Lightbulb,
    Megaphone,
} from "lucide-react";

const STAGE_ICONS = {
    Handshake,
    Lightbulb,
    Megaphone,
};

export function IndustryChallengeStages({ stages }) {
    if (!stages?.length) return null;

    return (
        <section className="relative overflow-hidden bg-linear-to-b from-white via-brand-dark/5 to-white py-14 sm:py-16 md:py-20">
            <div
                aria-hidden="true"
                className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-brand-primary/8 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-brand-gold/12 blur-3xl"
            />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
                    <span className="inline-flex rounded-full bg-brand-primary/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-brand-primary">
                        Peta Program
                    </span>
                    <h2 className="mt-5 text-3xl font-black tracking-tight text-brand-heading sm:text-4xl md:text-5xl">
                        Dari Tantangan Nyata ke Peluang Industri
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-brand-body-muted sm:text-base">
                        Industry Challange Class adalah program yang menjembatani Mahasiswa untuk mendapatkan peluang Kerja Praktik / Magang di Industri Kelompok Usaha Bakrie.
                    </p>
                </div>

                <div className="relative grid gap-8 lg:grid-cols-3 lg:gap-6">
                    <div
                        aria-hidden="true"
                        className="absolute left-[12%] right-[12%] top-16 hidden h-px bg-linear-to-r from-brand-orange via-brand-primary to-brand-gold lg:block"
                    />

                    {stages.map((stage, index) => {
                        const Icon = STAGE_ICONS[stage.icon] || Lightbulb;
                        const isLast = index === stages.length - 1;

                        return (
                            <div
                                key={stage.number}
                                className="relative animate-slide-up"
                                style={{
                                    "--animation-delay": `${index * 110}ms`,
                                }}
                            >
                                <article
                                    className="group relative h-full overflow-hidden rounded-[1.75rem] border bg-white p-6 shadow-[0_18px_55px_rgba(70,20,20,0.09)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_26px_70px_rgba(70,20,20,0.16)] sm:p-7"
                                    style={{ borderColor: `${stage.color}30` }}
                                >
                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-x-0 top-0 h-1.5"
                                        style={{ backgroundColor: stage.color }}
                                    />
                                    <span
                                        aria-hidden="true"
                                        className="absolute right-5 top-3 text-7xl font-black leading-none opacity-[0.06]"
                                        style={{ color: stage.color }}
                                    >
                                        {stage.number}
                                    </span>

                                    <div className="relative flex items-center gap-4">
                                        <div
                                            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 bg-white shadow-sm transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105"
                                            style={{
                                                borderColor: stage.color,
                                                color: stage.color,
                                            }}
                                        >
                                            <Icon className="h-8 w-8" strokeWidth={2.2} />
                                        </div>
                                        <div>
                                            <p
                                                className="text-xs font-black uppercase tracking-[0.2em]"
                                                style={{ color: stage.color }}
                                            >
                                                Tahap {stage.number}
                                            </p>
                                            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-gray-400">
                                                {stage.phase}
                                            </p>
                                        </div>
                                    </div>

                                    <h3 className="relative mt-7 text-2xl font-black leading-tight text-brand-heading sm:text-3xl">
                                        {stage.title}
                                    </h3>
                                    <p
                                        className="mt-4 text-sm font-bold italic leading-6"
                                        style={{ color: stage.color }}
                                    >
                                        {stage.subtitle}
                                    </p>
                                    <div
                                        className="my-5 h-0.5 w-full rounded-full opacity-80"
                                        style={{ backgroundColor: stage.color }}
                                    />
                                    <p className="text-sm leading-7 text-gray-600">
                                        {stage.description}
                                    </p>
                                </article>

                                {!isLast && (
                                    <>
                                        <div
                                            aria-hidden="true"
                                            className="absolute -bottom-6 left-1/2 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-brand-dark/10 bg-white text-brand-primary shadow-md lg:hidden"
                                        >
                                            <ArrowDown className="h-4 w-4" strokeWidth={2.5} />
                                        </div>
                                        <div
                                            aria-hidden="true"
                                            className="absolute -right-7 top-12 z-20 hidden h-9 w-9 items-center justify-center rounded-full border border-brand-dark/10 bg-white text-brand-primary shadow-md lg:flex"
                                        >
                                            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
