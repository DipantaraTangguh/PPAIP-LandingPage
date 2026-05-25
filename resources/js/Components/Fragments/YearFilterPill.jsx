import React from "react";

/**
 * Molecule: YearFilterPill
 * A single year pill button for filtering data.
 */
export function YearFilterPill({ year, isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`px-6 py-2 rounded-full text-sm font-medium text-white cursor-pointer transition-all duration-200 ${
                isActive
                    ? "bg-[#5d1111] shadow-md"
                    : "bg-[#802324] hover:bg-[#5d1111]"
            }`}
        >
            {year}
        </button>
    );
}
