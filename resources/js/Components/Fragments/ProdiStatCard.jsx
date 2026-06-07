import { Link } from "@inertiajs/react";
import { GraduationCap } from "lucide-react";
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
                <div
                    className={`w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center ${iconColors}`}
                >
                    <GraduationCap className="w-7 h-7" />
                </div>
                <span className="text-sm md:text-base font-medium text-gray-800">
                    {name}
                </span>
            </div>
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
