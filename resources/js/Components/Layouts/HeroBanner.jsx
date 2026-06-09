export function HeroBanner() {
    return (
        <section className="relative h-105 md:h-120 overflow-hidden">
            <img
                src="/assets/hero-image.png"
                alt=""
                aria-hidden="true"
                fetchpriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-r from-brand-dark/85 via-brand-dark/60 to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-full">
                <div>
                    <h1
                        className="notranslate text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold italic text-white leading-[1.1] tracking-tight"
                        style={{
                            textShadow:
                                "0 0 30px rgba(255,255,255,0.15), 0 0 60px rgba(255,255,255,0.08)",
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
