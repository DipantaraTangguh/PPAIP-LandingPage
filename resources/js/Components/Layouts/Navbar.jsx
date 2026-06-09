import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, SectionWrapper } from "../Elements";

const TRANSLATE_ELEMENT_ID = "google_translate_element_hidden";
const TRANSLATE_SCRIPT_ID = "google-translate-script";
const TRANSLATE_TIMEOUT = 8000;

let translateWidgetPromise;

function currentLanguage() {
    const match = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/);

    return match?.[1] === "en" ? "en" : "id";
}

function waitForTranslateCombo() {
    const combo = document.querySelector(".goog-te-combo");
    if (combo) return Promise.resolve(combo);

    return new Promise((resolve, reject) => {
        const observer = new MutationObserver(() => {
            const nextCombo = document.querySelector(".goog-te-combo");
            if (!nextCombo) return;

            window.clearTimeout(timeout);
            observer.disconnect();
            resolve(nextCombo);
        });
        const timeout = window.setTimeout(() => {
            observer.disconnect();
            reject(new Error("Google Translate tidak siap tepat waktu."));
        }, TRANSLATE_TIMEOUT);

        observer.observe(document.body, { childList: true, subtree: true });
    });
}

function ensureTranslateWidget() {
    const combo = document.querySelector(".goog-te-combo");
    if (combo) return Promise.resolve(combo);

    if (translateWidgetPromise) {
        const previousWidgetPromise = translateWidgetPromise;

        translateWidgetPromise = previousWidgetPromise.then((previousCombo) => {
            if (previousCombo?.isConnected) return previousCombo;

            translateWidgetPromise = undefined;
            return ensureTranslateWidget();
        });

        return translateWidgetPromise;
    }

    translateWidgetPromise = new Promise((resolve, reject) => {
        let initialized = false;
        let settled = false;
        let timeout;

        const succeed = (nextCombo) => {
            if (settled) return;

            settled = true;
            window.clearTimeout(timeout);
            resolve(nextCombo);
        };

        const fail = (error) => {
            if (settled) return;

            settled = true;
            window.clearTimeout(timeout);
            reject(error);
        };

        const initialize = () => {
            if (initialized) return;

            const host = document.getElementById(TRANSLATE_ELEMENT_ID);
            const TranslateElement = window.google?.translate?.TranslateElement;
            if (!host || !TranslateElement) return;

            initialized = true;

            try {
                new TranslateElement(
                    {
                        pageLanguage: "id",
                        includedLanguages: "en",
                        autoDisplay: false,
                    },
                    TRANSLATE_ELEMENT_ID,
                );
                waitForTranslateCombo().then(succeed).catch(fail);
            } catch (error) {
                fail(error);
            }
        };

        timeout = window.setTimeout(
            () => fail(new Error("Google Translate tidak merespons.")),
            TRANSLATE_TIMEOUT,
        );

        window.googleTranslateElementInit = initialize;

        const existingScript = document.getElementById(TRANSLATE_SCRIPT_ID);
        if (existingScript) {
            initialize();
            existingScript.addEventListener(
                "error",
                () => fail(new Error("Google Translate gagal dimuat.")),
                { once: true },
            );
            return;
        }

        const script = document.createElement("script");
        script.id = TRANSLATE_SCRIPT_ID;
        script.src =
            "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        script.addEventListener(
            "error",
            () => fail(new Error("Google Translate gagal dimuat.")),
            { once: true },
        );
        document.body.appendChild(script);

        initialize();
    }).catch((error) => {
        translateWidgetPromise = undefined;
        throw error;
    });

    return translateWidgetPromise;
}

function clearTranslateCookie() {
    const expired = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
    const hostname = window.location.hostname;

    document.cookie = `googtrans=;path=/;${expired};SameSite=Lax`;

    if (hostname) {
        document.cookie = `googtrans=;path=/;domain=${hostname};${expired};SameSite=Lax`;
        document.cookie = `googtrans=;path=/;domain=.${hostname};${expired};SameSite=Lax`;
    }
}

export function GoogleTranslateSwitch({
    activeLang,
    isSwitching,
    status,
    onSelect,
}) {
    const unavailable = status === "error";

    return (
        <div
            className="flex items-center gap-1.5 ml-3 px-1 py-1 rounded-full bg-white/15 select-none notranslate"
            aria-label="Pilih bahasa"
            aria-busy={isSwitching}
            title={
                unavailable
                    ? "Layanan terjemahan sedang tidak tersedia"
                    : undefined
            }
        >
            <button
                type="button"
                onClick={() => onSelect("id")}
                aria-pressed={activeLang === "id"}
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-300 ${
                    activeLang === "id"
                        ? "bg-white text-brand-dark"
                        : "text-white/70 hover:text-white"
                }`}
            >
                ID
            </button>
            <button
                type="button"
                onClick={() => onSelect("en")}
                aria-pressed={activeLang === "en"}
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-300 ${
                    activeLang === "en"
                        ? "bg-white text-brand-dark"
                        : "text-white/70 hover:text-white"
                }`}
            >
                EN
            </button>
            <span className="sr-only" role="status" aria-live="polite">
                {isSwitching
                    ? "Sedang mengganti bahasa"
                    : unavailable
                      ? "Layanan terjemahan sedang tidak tersedia"
                      : `Bahasa aktif: ${activeLang.toUpperCase()}`}
            </span>
        </div>
    );
}

export function Navbar({ links }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeLang, setActiveLang] = useState(currentLanguage);
    const [translateStatus, setTranslateStatus] = useState("loading");
    const [isSwitching, setIsSwitching] = useState(false);

    useEffect(() => {
        let mounted = true;

        ensureTranslateWidget()
            .then(() => {
                if (mounted) setTranslateStatus("ready");
            })
            .catch(() => {
                if (mounted) setTranslateStatus("error");
            });

        return () => {
            mounted = false;
        };
    }, []);

    const switchLanguage = async (language) => {
        if (language === activeLang || isSwitching) return;

        setIsSwitching(true);
        setTranslateStatus("loading");

        try {
            if (language === "id") {
                clearTranslateCookie();
                setActiveLang("id");
                window.dispatchEvent(
                    new CustomEvent("googleTranslateChange", { detail: "id" }),
                );
                window.location.reload();
                return;
            }

            const combo = await ensureTranslateWidget();
            combo.value = "en";
            combo.dispatchEvent(new Event("change", { bubbles: true }));
            setActiveLang("en");
            setTranslateStatus("ready");
            window.dispatchEvent(
                new CustomEvent("googleTranslateChange", { detail: "en" }),
            );
        } catch {
            setTranslateStatus("error");
        } finally {
            setIsSwitching(false);
        }
    };

    const languageSwitchProps = {
        activeLang,
        isSwitching,
        status: translateStatus,
        onSelect: switchLanguage,
    };

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
        <nav className="bg-brand-primary relative">
            {/* Satu host cukup; desktop dan mobile share instance Google yang sama. */}
            <div
                id={TRANSLATE_ELEMENT_ID}
                className="google-translate-host"
                aria-hidden="true"
            />

            <SectionWrapper className="flex items-stretch justify-between min-h-14">
                <a
                    href="/"
                    className="flex items-center gap-3 py-3 hover:opacity-90 transition-opacity"
                >
                    <img
                        src="/assets/logo-bakrie.png"
                        alt="Universitas Bakrie Logo"
                        decoding="async"
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
                        <GoogleTranslateSwitch {...languageSwitchProps} />
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => setMobileOpen((v) => !v)}
                    className="md:hidden flex items-center justify-center w-11 h-11 my-auto rounded-lg text-white hover:bg-black/20 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
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
                <div className="md:hidden absolute left-0 right-0 top-full z-40 bg-brand-primary border-t border-white/10 shadow-lg">
                    <div className="px-4 py-3 flex flex-col">
                        {links.map((link) => {
                            const isExternal = link.href?.startsWith("http://") || link.href?.startsWith("https://");
                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target={isExternal ? "_blank" : undefined}
                                    rel={isExternal ? "noopener noreferrer" : undefined}
                                    onClick={() => setMobileOpen(false)}
                                    className="px-3 py-3 text-base font-medium text-white/90 rounded-lg hover:bg-black/20 hover:text-brand-gold transition-colors duration-200"
                                >
                                    {link.label}
                                </a>
                            );
                        })}
                        <div className="mt-2 pt-3 border-t border-white/10 flex justify-start">
                            <GoogleTranslateSwitch {...languageSwitchProps} />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
