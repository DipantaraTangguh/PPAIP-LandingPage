export function PageHeroBanner({ title, subtitle, backgroundImage }) {
    return (
        <section className="relative min-h-70 sm:min-h-85 md:min-h-100 py-12 overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${backgroundImage}')` }}
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center min-h-64 sm:min-h-79 md:min-h-94 text-center">
                <h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold italic text-white leading-[1.1] tracking-tight wrap-break-word"
                    style={{
                        textShadow:
                            "0 0 30px rgba(255,255,255,0.15), 0 0 60px rgba(255,255,255,0.08)",
                    }}
                >
                    {title}
                </h1>
                {subtitle && (
                    <p className="mt-3 sm:mt-4 text-white/80 text-xs sm:text-sm md:text-base max-w-xl px-2">
                        {subtitle}
                    </p>
                )}
            </div>
        </section>
    );
}
