import React from "react";
import { usePage } from "@inertiajs/react";

/**
 * Atom: NavLink
 * A single navigation link with hover effects and active state for the navbar.
 * Active link uses gold (#F5A623) text + underline from the design system.
 */
export function NavLink({ href, children }) {
    const { url } = usePage();
    // Active when the current URL starts with the href,
    // but "/" only matches exactly to avoid marking all pages as home.
    const isActive =
        href !== "/" && href !== "#" ? url.startsWith(href) : url === href;

    return (
        <a
            href={href}
            className={`flex items-center px-3 lg:px-5 text-base font-medium transition-all duration-300 border-b-2 ${
                isActive
                    ? "text-[#F5A623] border-[#F5A623] bg-black/20"
                    : "text-white/85 border-transparent hover:text-white hover:bg-black/20"
            }`}
        >
            {children}
        </a>
    );
}
