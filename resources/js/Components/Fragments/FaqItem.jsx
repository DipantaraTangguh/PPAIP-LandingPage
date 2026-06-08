import { ChevronIcon } from "../Elements";
export function FaqItem({ question, answer, isOpen, onToggle }) {
    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300">
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark/30"
            >
                <span className="text-sm md:text-base text-gray-700 font-bold">
                    {question}
                </span>
                <ChevronIcon isOpen={isOpen} />
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="px-6 pb-4 text-sm text-gray-500 leading-relaxed">
                    {answer}
                </div>
            </div>
        </div>
    );
}
