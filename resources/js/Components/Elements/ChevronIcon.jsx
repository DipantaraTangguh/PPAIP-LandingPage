import React from "react";
import { ChevronDown } from "lucide-react";

/**
 * Atom: ChevronIcon
 * An animated chevron/arrow icon for accordions.
 */
export function ChevronIcon({ isOpen }) {
    return (
        <ChevronDown
            className={`w-5 h-5 text-[#802324] shrink-0 ml-4 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
            }`}
            strokeWidth={2.5}
        />
    );
}
