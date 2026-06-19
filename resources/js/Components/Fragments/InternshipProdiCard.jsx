export function InternshipProdiCard({
    name,
    kub,
    nonKub,
    bumn,
    catalogStartPage,
    onClick,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group w-full rounded-xl border border-gray-200 bg-white p-5 text-left cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-card-hover hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            aria-label={`Buka katalog ${name}`}
        >
            <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-sm text-gray-800">
                    {name}
                </span>
                <span className="flex items-center gap-2 text-gray-400 transition-colors group-hover:text-brand-primary">
                    {catalogStartPage && (
                        <span className="hidden rounded-full bg-brand-cream px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-primary sm:inline-flex">
                            Katalog
                        </span>
                    )}
                    <span className="text-lg transition-transform group-hover:translate-x-1">
                        ›
                    </span>
                </span>
            </div>
            <div className="w-full h-3 flex rounded-full overflow-hidden mb-3">
                <div
                    className="bg-chart-kub transition-all duration-500"
                    style={{ width: `${kub}%` }}
                />
                <div
                    className="bg-chart-non-kub transition-all duration-500"
                    style={{ width: `${nonKub}%` }}
                />
                <div
                    className="bg-chart-bumn transition-all duration-500"
                    style={{ width: `${bumn}%` }}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-chart-kub rounded-sm" />
                    <span className="font-medium text-gray-700">{kub} %</span>
                    <span className="text-gray-400 ml-1 notranslate" translate="no">KUB</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-chart-non-kub rounded-sm" />
                    <span className="font-medium text-gray-700">
                        {nonKub} %
                    </span>
                    <span className="text-gray-400 ml-1 notranslate" translate="no">External</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-chart-bumn rounded-sm" />
                    <span className="font-medium text-gray-700">{bumn} %</span>
                    <span className="text-gray-400 ml-1 notranslate" translate="no">BUMN</span>
                </div>
            </div>
        </button>
    );
}
