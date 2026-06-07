import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, SectionWrapper } from "../Elements";

function GoogleTranslateSwitch() {
    const [activeLang, setActiveLang] = useState(() => {
        // Google simpan bahasa di cookie, jadi toggle harus ikut state terakhir user.
        if (typeof document !== "undefined") {
            const match = document.cookie.match(/googtrans=\/[^/]+\/(\w+)/);
            if (match && match[1] === "en") return "en";
        }
        return "id";
    });

    // Widget Google tetap dipasang hidden karena API translate-nya numpang dari situ.
    useEffect(() => {
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "id",
                    includedLanguages: "en",
                    autoDisplay: false,
                },
                "google_translate_element_hidden",
            );
        };

        if (!document.getElementById("google-translate-script")) {
            const script = document.createElement("script");
            script.id = "google-translate-script";
            script.src =
                "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    const switchTo = (lang) => {
        if (lang === activeLang) return;

        if (lang === "en") {
            // Google Translate cuma expose select native, jadi kita trigger manual.
            const combo = document.querySelector(".goog-te-combo");
            if (combo) {
                combo.value = "en";
                combo.dispatchEvent(new Event("change"));
                setActiveLang("en");
                window.dispatchEvent(
                    new CustomEvent("googleTranslateChange", { detail: "en" }),
                );
            }
        } else {
            // Balik ID paling stabil dengan bersihin cookie lalu reload source page.
            document.cookie =
                "googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            document.cookie = `googtrans=;path=/;domain=${window.location.hostname};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
            document.cookie = `googtrans=;path=/;domain=.${window.location.hostname};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
            setActiveLang("id");
            window.dispatchEvent(
                new CustomEvent("googleTranslateChange", { detail: "id" }),
            );
            window.location.reload();
        }
    };

    return (
        <>
            {/* Jangan display:none, select Google masih perlu kebaca script. */}
            <div
                id="google_translate_element_hidden"
                style={{
                    position: "absolute",
                    top: "-9999px",
                    left: "-9999px",
                }}
            />

            <div className="flex items-center gap-1.5 ml-3 px-1 py-1 rounded-full bg-white/15 select-none notranslate">
                <button
                    onClick={() => switchTo("id")}
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-300 ${
                        activeLang === "id"
                            ? "bg-white text-[#802324]"
                            : "text-white/70 hover:text-white"
                    }`}
                >
                    ID
                </button>
                <button
                    onClick={() => switchTo("en")}
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-300 ${
                        activeLang === "en"
                            ? "bg-white text-[#802324]"
                            : "text-white/70 hover:text-white"
                    }`}
                >
                    EN
                </button>
            </div>
        </>
    );
}

export function Navbar({ links }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    // Route berubah, drawer mobile ikut ditutup biar gak nyangkut di page baru.
    useEffect(() => {
        const close = () => setMobileOpen(false);
        window.addEventListener("popstate", close);
        return () => window.removeEventListener("popstate", close);
    }, []);

    // Drawer mobile pakai body lock supaya konten belakang gak ikut geser.
    useEffect(() => {
        if (mobileOpen) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = prev;
            };
        }
    }, [mobileOpen]);

    return (
        <nav className="bg-[#6B1B1B] relative">
            <SectionWrapper className="flex items-stretch justify-between min-h-14">
                <a
                    href="/"
                    className="flex items-center gap-3 py-3 hover:opacity-90 transition-opacity"
                >
                    <img
                        src="/assets/logo-bakrie.png"
                        alt="Universitas Bakrie Logo"
                        className="h-9 w-auto"
                    />
                </a>

                <div className="hidden md:flex items-stretch gap-1">
                    {links.map((link) => (
                        <NavLink key={link.label} href={link.href}>
                            {link.label}
                        </NavLink>
                    ))}
                    <div className="flex items-center">
                        <GoogleTranslateSwitch />
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => setMobileOpen((v) => !v)}
                    className="md:hidden flex items-center justify-center w-11 h-11 my-auto rounded-lg text-white hover:bg-black/20 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
                    aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? (
                        <X className="w-6 h-6" strokeWidth={2} />
                    ) : (
                        <Menu className="w-6 h-6" strokeWidth={2} />
                    )}
                </button>
            </SectionWrapper>

            {mobileOpen && (
                <div className="md:hidden absolute left-0 right-0 top-full z-40 bg-[#6B1B1B] border-t border-white/10 shadow-lg">
                    <div className="px-4 py-3 flex flex-col">
                        {links.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="px-3 py-3 text-base font-medium text-white/90 rounded-lg hover:bg-black/20 hover:text-[#F5A623] transition-colors duration-200"
                            >
                                {link.label}
                            </a>
                        ))}
                        <div className="mt-2 pt-3 border-t border-white/10 flex justify-start">
                            <GoogleTranslateSwitch />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
