import React from "react";

/**
 * Atom: ChevronIcon
 * An animated chevron/arrow icon for accordions.
 */
export function ChevronIcon({ isOpen }) {
    return (
        <svg
            className={`w-5 h-5 text-[#802324] shrink-0 ml-4 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
        >
            <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
            />
        </svg>
    );
}
