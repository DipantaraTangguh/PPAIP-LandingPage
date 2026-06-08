import { usePage } from "@inertiajs/react";

export function NavLink({ href, children }) {
    const { url } = usePage();
    // Home harus exact match, kalau pakai startsWith semua page ikut aktif.
    const isActive =
        href !== "/" && href !== "#" ? url.startsWith(href) : url === href;

    const isExternal = href?.startsWith("http://") || href?.startsWith("https://");

    return (
        <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className={`flex items-center px-3 lg:px-5 text-base font-medium transition-all duration-300 border-b-2 ${
                isActive
                    ? "text-brand-gold border-brand-gold bg-black/20"
                    : "text-white/85 border-transparent hover:text-white hover:bg-black/20"
            }`}
        >
            {children}
        </a>
    );
}
