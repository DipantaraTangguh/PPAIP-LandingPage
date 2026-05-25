import React from "react";

/**
 * Atom: SectionWrapper
 * Consistent max-width container used across all sections.
 */
export function SectionWrapper({ children, className = "" }) {
    return (
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
            {children}
        </div>
    );
}
