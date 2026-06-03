import React from "react";
export function YearFilterPill({ year, isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`px-6 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 ${
                isActive
                    ? "bg-[#F5A623] text-[#5d1111] shadow-md ring-2 ring-[#802324]/20 scale-105"
                    : "bg-[#802324] text-white hover:bg-[#5d1111]"
            }`}
            aria-pressed={isActive}
        >
            {year}
        </button>
    );
}
