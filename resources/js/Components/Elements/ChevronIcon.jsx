import { ChevronDown } from "lucide-react";
export function ChevronIcon({ isOpen }) {
    return (
        <ChevronDown
            className={`w-5 h-5 text-brand-dark shrink-0 ml-4 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
            }`}
            strokeWidth={2.5}
        />
    );
}
