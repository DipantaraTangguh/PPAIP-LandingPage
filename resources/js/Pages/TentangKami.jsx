import { useState } from "react";
import {
    Briefcase,
    GraduationCap,
    Award,
    Mic,
    BookOpen,
    Network,
    Users as UsersIcon,
    Building2,
    Target as TargetIcon,
    Lightbulb,
    Globe,
    Sparkles,
    Target,
    Compass,
    Quote,
} from "lucide-react";

import {
    PublicLayout,
} from "@/Components/Layouts";
import { SectionWrapper } from "@/Components/Elements";
import Seo from "@/Components/Seo";

const ICON_MAP = {
    Briefcase,
    GraduationCap,
    Award,
    Mic,
    BookOpen,
    Network,
    Users: UsersIcon,
    Building2,
    Target: TargetIcon,
    Lightbulb,
    Globe,
    Sparkles,
};

export default function TentangKami({
    aboutIntro = "",
    vision = "",
    mission = [],
    programKerja = [],
    teamMembers = { ketua: null, staff: [] },
    groupPhoto = null,
}) {
    return (
        <>
            <Seo
                title="Tentang Kami"
                description="Kenali visi, misi, tim, dan program kerja UPT PPAIP Universitas Bakrie dalam menghubungkan pembelajaran dengan dunia industri."
                image={groupPhoto?.src || "/assets/bakrie-banner.jpg"}
            />

            <PublicLayout
                rootClassName="min-h-screen bg-[#f8f8f8] font-sans antialiased"
                hero={{
                    title: "Tentang Kami",
                    subtitle: "Mengenal lebih dekat tim, visi, misi, dan program kerja UPT PPAIP Universitas Bakrie.",
                    backgroundImage: groupPhoto?.src || "/assets/bakrie-banner.jpg",
                }}
            >
                <IntroCard description={aboutIntro} />

                <TeamSection
                    ketua={teamMembers?.ketua}
                    staff={teamMembers?.staff || []}
                />

                <VisionMissionSection vision={vision} mission={mission} />

                <ProgramKerjaSection programs={programKerja} />
            </PublicLayout>
        </>
    );
}

function IntroCard({ description }) {
    return (
        <section className="relative z-20 -mt-20 sm:-mt-24 md:-mt-20 pb-12">
            <SectionWrapper>
                <div className="bg-white rounded-2xl shadow-xl shadow-black/8 p-6 sm:p-8 md:p-10">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center">
                        <div className="md:w-2/5 flex-shrink-0 md:pl-5 py-1">
                            <h2 className="text-2xl md:text-3xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#802324] to-[#ea580c]">
                                Mengenal UPT PPAIP
                            </h2>
                        </div>
                        <div className="md:w-3/5">
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed text-justify">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </section>
    );
}

function TeamSection({ ketua, staff }) {
    if (!ketua && (!staff || staff.length === 0)) return null;
    return (
        <section className="pb-16">
            <SectionWrapper>
                <SectionHeading eyebrow="Anggota PPAIP" title="Pimpinan & Staff" />

                {ketua && (
                    <div className="max-w-xl mx-auto mb-8">
                        <TeamCard member={ketua} featured />
                    </div>
                )}

                {staff && staff.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {staff.map((member, i) => (
                            <TeamCard key={i} member={member} />
                        ))}
                    </div>
                )}
            </SectionWrapper>
        </section>
    );
}

function TeamCard({ member, featured = false }) {
    return (
        <article
            className={`group bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col ${
                featured
                    ? "shadow-lg hover:shadow-xl"
                    : "shadow-sm hover:shadow-md"
            } hover:-translate-y-0.5 transition-all duration-300`}
        >
            <div
                className={`relative overflow-hidden bg-gradient-to-br from-[#802324] to-[#5d1111] ${
                    featured ? "aspect-[5/4]" : "aspect-[4/3]"
                }`}
            >
                <SafeImage
                    src={member.photo}
                    fallbackInitials={initials(member.name)}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            <div className="p-5 md:p-6 text-center flex flex-col gap-1.5">
                <h3 className="text-base md:text-lg font-bold text-gray-900">
                    {member.name}
                </h3>
                <span className="inline-block text-[11px] md:text-xs font-semibold uppercase tracking-widest text-[#802324]">
                    {member.role}
                </span>
                {member.bio && (
                    <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                        {member.bio}
                    </p>
                )}
            </div>
        </article>
    );
}

function VisionMissionSection({ vision, mission }) {
    if (!vision && (!mission || mission.length === 0)) return null;
    return (
        <section className="pb-16">
            <SectionWrapper>
                <SectionHeading eyebrow="Arah Kami" title="Visi & Misi" />
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-[#802324] to-[#5d1111] text-white p-6 sm:p-7 md:p-8 shadow-md flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-[#F5A623] text-[#802324] flex items-center justify-center shadow-sm">
                                <Compass className="w-5 h-5" strokeWidth={2.25} />
                            </div>
                            <h3 className="text-xl font-bold">Visi</h3>
                        </div>
                        <Quote className="w-7 h-7 text-[#F5A623]/80 mb-2" strokeWidth={2} />
                        <p className="text-white/90 text-sm md:text-base leading-relaxed">
                            {vision}
                        </p>
                    </div>

                    <div className="lg:col-span-3 rounded-2xl bg-white border border-gray-200 p-6 sm:p-7 md:p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-full bg-[#ea580c]/10 text-[#ea580c] flex items-center justify-center">
                                <Target className="w-5 h-5" strokeWidth={2.25} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Misi</h3>
                        </div>
                        <ol className="space-y-4">
                            {mission.map((item, i) => (
                                <li key={i} className="flex gap-3">
                                    <span className="shrink-0 w-7 h-7 rounded-full bg-[#ea580c] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                                        {i + 1}
                                    </span>
                                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                                        {item}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </SectionWrapper>
        </section>
    );
}

function ProgramKerjaSection({ programs }) {
    if (!programs || programs.length === 0) return null;
    return (
        <section className="pb-20">
            <SectionWrapper>
                <SectionHeading eyebrow="Apa yang Kami Lakukan" title="Program Kerja" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {programs.map((p, i) => (
                        <ProgramCard key={i} program={p} />
                    ))}
                </div>
            </SectionWrapper>
        </section>
    );
}

function ProgramCard({ program }) {
    const Icon = ICON_MAP[program.icon] || Briefcase;
    return (
        <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#802324]/30 hover:-translate-y-0.5 transition-all duration-300 p-6 flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-[#802324]/10 text-[#802324] flex items-center justify-center mb-4 group-hover:bg-[#802324] group-hover:text-white transition-colors duration-300">
                <Icon className="w-6 h-6" strokeWidth={2} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
                {program.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
                {program.description}
            </p>
        </div>
    );
}

function SectionHeading({ eyebrow, title }) {
    return (
        <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest text-[#802324] bg-gray-100 border border-gray-200 mb-4">
                {eyebrow}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                {title}
            </h2>
        </div>
    );
}

function SafeImage({ src, fallbackSrc, fallbackInitials, alt, className }) {
    const [stage, setStage] = useState("primary");

    if (!src || stage === "initials") {
        if (fallbackInitials) {
            return (
                <div
                    className={`flex items-center justify-center bg-gradient-to-br from-[#802324] to-[#5d1111] text-white ${className}`}
                    aria-label={alt}
                    role="img"
                >
                    <span className="text-3xl md:text-5xl font-bold tracking-wide">
                        {fallbackInitials}
                    </span>
                </div>
            );
        }
        return null;
    }

    const currentSrc = stage === "primary" ? src : fallbackSrc;

    return (
        <img
            src={currentSrc}
            alt={alt}
            className={className}
            loading="lazy"
            decoding="async"
            onError={() => {
                if (stage === "primary" && fallbackSrc) {
                    setStage("fallback");
                } else if (fallbackInitials) {
                    setStage("initials");
                }
            }}
        />
    );
}

function initials(name) {
    if (!name) return "";
    return name
        .replace(/\b(Dr|S\.?Kom|S\.?Pd|S\.?T|M\.?M|M\.?T|Ph\.?D)\.?/g, "")
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();
}
