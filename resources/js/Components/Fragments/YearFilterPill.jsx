export function YearFilterPill({ year, isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`px-6 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 ${
                isActive
                    ? "bg-brand-gold text-brand-deep shadow-md ring-2 ring-brand-dark/20 scale-105"
                    : "bg-brand-dark text-white hover:bg-brand-deep"
            }`}
            aria-pressed={isActive}
        >
            {year}
        </button>
    );
}
