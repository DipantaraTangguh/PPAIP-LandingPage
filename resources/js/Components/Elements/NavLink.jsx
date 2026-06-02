import React from "react";
import { usePage } from "@inertiajs/react";

export function NavLink({ href, children }) {
    const { url } = usePage();
    // Home harus exact match, kalau pakai startsWith semua page ikut aktif.
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
