import { usePage } from "@inertiajs/react";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { PageHeroBanner } from "./PageHeroBanner";

export function PublicLayout({
    children,
    hero,
    heroSlot,
    rootClassName = "min-h-screen bg-white font-sans antialiased",
    showFooter = true,
}) {
    const { navLinks = [], footerLinks = [] } = usePage().props;

    return (
        <div className={rootClassName}>
            <Navbar links={navLinks} />

            {heroSlot}

            {!heroSlot && hero && (
                <PageHeroBanner
                    title={hero.title}
                    subtitle={hero.subtitle}
                    backgroundImage={hero.backgroundImage}
                />
            )}

            {children}

            {showFooter && <Footer linkColumns={footerLinks} />}
        </div>
    );
}
