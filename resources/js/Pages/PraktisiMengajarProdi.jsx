import { Link } from "@inertiajs/react";
import { BookOpen, Users, Percent, ArrowLeft } from "lucide-react";

import Seo from "@/Components/Seo";
import {
    PublicLayout,
    InfoCard,
} from "@/Components/Layouts";
import { SectionWrapper } from "@/Components/Elements";

export default function PraktisiMengajarProdi({ slug, detail, aboutDescription = "", bannerImage = "/assets/praktisi-mengajar.png" }) {
    if (!detail) {
        return <ProdiNotFound slug={slug} />;
    }

    const { name, stats, semesters } = detail;

    return (
        <>
            <Seo
                title={`${name} - Praktisi Mengajar`}
                description={`Lihat mata kuliah dan keterlibatan praktisi industri pada program studi ${name} Universitas Bakrie.`}
                image={bannerImage}
            />

            <PublicLayout
                rootClassName="min-h-screen bg-[#f8f8f8] font-sans antialiased"
                hero={{
                    title: name,
                    subtitle: "Menampilkan data dan statistik praktisi yang mengajar di tiap program studi",
                    backgroundImage: bannerImage,
                }}
            >
                <SectionWrapper className="pt-6">
                    <Link
                        href="/practitioner-teaching"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#802324] hover:text-[#5d1111] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali ke daftar program studi
                    </Link>
                </SectionWrapper>

                <section className="pt-6 pb-10">
                    <SectionWrapper>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">
                            Statistik
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <StatCard label="Mata Kuliah" value={stats.mataKuliah} icon={BookOpen} />
                            <StatCard label="Praktisi" value={stats.praktisi} icon={Users} />
                            <StatCard label="% Praktisi" value={stats.praktisiPct} suffix="%" icon={Percent} />
                        </div>
                    </SectionWrapper>
                </section>

                <section className="pb-16">
                    <SectionWrapper>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">
                            Praktisi Mengajar di Tiap Mata Kuliah
                        </h2>
                        <div className="flex flex-col gap-4">
                            {semesters.map((sem) => (
                                <SemesterCard key={sem.title} semester={sem} />
                            ))}
                        </div>
                    </SectionWrapper>
                </section>

                <InfoCard title="Keterangan lainnya" description={aboutDescription} />
            </PublicLayout>
        </>
    );
}

function StatCard({ label, value, suffix, icon: Icon }) {
    return (
        <div className="bg-[#802324] text-white rounded-xl px-5 py-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-col">
                <span className="text-xs md:text-sm text-white/70 mb-1">{label}</span>
                <span className="text-3xl md:text-4xl font-bold leading-none">
                    {value}
                    {suffix && (
                        <span className="text-base font-medium ml-0.5 align-baseline">
                            {suffix}
                        </span>
                    )}
                </span>
            </div>
            <Icon className="w-9 h-9 text-white/85 shrink-0" strokeWidth={1.75} />
        </div>
    );
}

function SemesterCard({ semester }) {
    const { title, praktisiCount, courses } = semester;
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-[#ea580c] text-white px-5 py-3 flex items-center justify-between">
                <span className="text-base md:text-lg font-semibold">{title}</span>
                <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl md:text-3xl font-bold leading-none">
                        {praktisiCount}
                    </span>
                    <span className="text-[10px] md:text-xs uppercase tracking-wider opacity-85">
                        praktisi
                    </span>
                </div>
            </div>
            <div className="px-5 py-5">
                <div className="flex flex-wrap gap-2">
                    {courses.map((course, i) => (
                        <CoursePill key={i} course={course} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function CoursePill({ course }) {
    const base =
        "inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs md:text-sm whitespace-normal break-words text-center max-w-full transition-colors duration-200";
    const styles = course.praktisi
        ? "bg-[#ea580c] text-white font-medium shadow-sm"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200";
    return <span className={`${base} ${styles}`}>{course.name}</span>;
}

function ProdiNotFound({ slug }) {
    return (
        <>
            <Seo
                title="Program Studi tidak ditemukan"
                description="Program studi yang diminta tidak tersedia."
                noIndex
            />
            <PublicLayout rootClassName="min-h-screen bg-[#f8f8f8] font-sans antialiased flex flex-col">
                <div className="flex-1 flex items-center justify-center px-4 py-24">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 max-w-md text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-3">
                            Program Studi tidak ditemukan
                        </h1>
                        <p className="text-sm text-gray-500 mb-6">
                            Slug{" "}
                            <code className="px-1.5 py-0.5 bg-gray-100 rounded text-[#802324]">
                                {slug}
                            </code>{" "}
                            tidak terdaftar.
                        </p>
                        <Link
                            href="/practitioner-teaching"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#802324] text-white text-sm font-semibold hover:bg-[#5d1111] transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Kembali
                        </Link>
                    </div>
                </div>
            </PublicLayout>
        </>
    );
}
