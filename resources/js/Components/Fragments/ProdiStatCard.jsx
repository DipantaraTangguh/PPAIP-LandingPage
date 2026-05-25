import React from "react";
import { Link } from "@inertiajs/react";

/**
 * Molecule: ProdiStatCard
 * Displays a program studi name with a graduation cap icon and practitioner count badge.
 * Clickable when an `href` is provided — navigates to the prodi detail page.
 */
export function ProdiStatCard({ name, count, variant = "orange", href }) {
    const badgeColors =
        variant === "orange"
            ? "bg-[#ea580c] text-white"
            : "bg-[#802324] text-white";

    const iconColors =
        variant === "orange" ? "text-[#ea580c]" : "text-[#802324]";

    const content = (
        <>
            <div className="flex items-center gap-4">
                {/* Graduation Cap Icon */}
                <div
                    className={`w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center ${iconColors}`}
                >
                    <svg
                        className="w-7 h-7"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                    </svg>
                </div>

                {/* Program Name */}
                <span className="text-sm md:text-base font-medium text-gray-800">
                    {name}
                </span>
            </div>

            {/* Count Badge */}
            <div
                className={`flex flex-col items-center justify-center rounded-lg px-4 py-2 min-w-15 ${badgeColors}`}
            >
                <span className="text-xl font-bold leading-tight">{count}</span>
                <span className="text-[10px] opacity-80">Praktisi</span>
            </div>
        </>
    );

    const baseClasses =
        "flex items-center justify-between bg-white border border-gray-200 rounded-xl px-5 py-4 hover:shadow-md hover:border-[#802324]/30 transition-all duration-300 cursor-pointer";

    if (href) {
        return (
            <Link href={href} className={baseClasses}>
                {content}
            </Link>
        );
    }

    return <div className={baseClasses}>{content}</div>;
}
