import { useState } from "react";
import { Link } from "@inertiajs/react";
import {
    BookOpen,
    Users,
    Percent,
    ArrowLeft,
    X,
    Award,
    Briefcase,
    Quote,
    Sparkles,
    Rocket,
    Building2,
} from "lucide-react";

import Modal from "@/Components/Modal";
import Seo from "@/Components/Seo";
import { PublicLayout, InfoCard } from "@/Components/Layouts";
import { SectionWrapper } from "@/Components/Elements";

export default function PractitionerTeachingMajor({
    slug,
    detail,
    aboutDescription = "",
    bannerImage = "/assets/praktisi-mengajar.png",
}) {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedPblCourse, setSelectedPblCourse] = useState(null);

    if (!detail) {
        return <ProdiNotFound slug={slug} />;
    }

    const { name, stats, semesters } = detail;

    return (
        <>
            <Seo
                title={`${name} - Kemitraan dan Pembelajaran Berbasis Proyek`}
                description={`Lihat mata kuliah dan keterlibatan praktisi industri pada program studi ${name} Universitas Bakrie.`}
                image={bannerImage}
            />

            <PublicLayout
                rootClassName="min-h-screen bg-surface-muted font-sans antialiased"
                hero={{
                    title: name,
                    subtitle:
                        "Menampilkan data dan statistik praktisi yang mengajar di tiap program studi",
                    backgroundImage: bannerImage,
                }}
            >
                <SectionWrapper className="pt-6">
                    <Link
                        href="/practitioner-teaching"
                        className="inline-flex items-center gap-2 text-sm font-medium text-brand-dark hover:text-brand-deep transition-colors"
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
                            <StatCard
                                label="Mata Kuliah"
                                value={stats.mataKuliah}
                                icon={BookOpen}
                            />
                            <StatCard
                                label="Praktisi"
                                value={stats.praktisi}
                                icon={Users}
                            />
                            <StatCard
                                label="% Praktisi"
                                value={stats.praktisiPct}
                                suffix="%"
                                icon={Percent}
                            />
                        </div>
                    </SectionWrapper>
                </section>

                <section className="pb-16">
                    <SectionWrapper>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                            Kemitraan dan Pembelajaran Berbasis Proyek di Tiap
                            Mata Kuliah
                        </h2>
                        <div className="flex flex-wrap items-center gap-4 mb-5">
                            <span className="inline-flex items-center gap-2 text-xs md:text-sm text-gray-600">
                                <span className="h-2.5 w-2.5 rounded-full bg-brand-orange" />
                                Praktisi Mengajar
                            </span>
                            <span className="inline-flex items-center gap-2 text-xs md:text-sm text-gray-600">
                                <span className="h-2.5 w-2.5 rounded-full bg-sky-600" />
                                Project Based Learning
                            </span>
                        </div>
                        <div className="flex flex-col gap-4">
                            {semesters.map((sem) => (
                                <SemesterCard
                                    key={sem.title}
                                    semester={sem}
                                    onSelectPractitioner={setSelectedCourse}
                                    onSelectPbl={setSelectedPblCourse}
                                />
                            ))}
                        </div>
                    </SectionWrapper>
                </section>

                <InfoCard
                    title="Keterangan lainnya"
                    description={aboutDescription}
                />
            </PublicLayout>

            <PractitionerProfileModal
                course={selectedCourse}
                onClose={() => setSelectedCourse(null)}
            />
            <PblProjectModal
                course={selectedPblCourse}
                onClose={() => setSelectedPblCourse(null)}
            />
        </>
    );
}

function StatCard({ label, value, suffix, icon: Icon }) {
    return (
        <div className="bg-brand-dark text-white rounded-xl px-5 py-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-col">
                <span className="text-xs md:text-sm text-white/70 mb-1">
                    {label}
                </span>
                <span className="text-3xl md:text-4xl font-bold leading-none">
                    {value}
                    {suffix && (
                        <span className="text-base font-medium ml-0.5 align-baseline">
                            {suffix}
                        </span>
                    )}
                </span>
            </div>
            <Icon
                className="w-9 h-9 text-white/85 shrink-0"
                strokeWidth={1.75}
            />
        </div>
    );
}

function SemesterCard({ semester, onSelectPractitioner, onSelectPbl }) {
    const { title, praktisiCount, courses } = semester;
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-brand-orange text-white px-5 py-3 flex items-center justify-between">
                <span className="text-base md:text-lg font-semibold">
                    {title}
                </span>
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
                        <CoursePill
                            key={i}
                            course={course}
                            onSelectPractitioner={onSelectPractitioner}
                            onSelectPbl={onSelectPbl}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function CoursePill({ course, onSelectPractitioner, onSelectPbl }) {
    const base =
        "inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs md:text-sm whitespace-normal break-words text-center max-w-full transition-colors duration-200";

    if (course.praktisi) {
        return (
            <button
                type="button"
                onClick={() => onSelectPractitioner(course)}
                className={`${base} bg-brand-orange text-white font-medium shadow-sm hover:bg-brand-rust focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2`}
                aria-label={`Lihat profil praktisi untuk ${course.name}`}
            >
                {course.name}
            </button>
        );
    }

    if (course.pbl) {
        return (
            <button
                type="button"
                onClick={() => onSelectPbl(course)}
                className={`${base} bg-sky-600 text-white font-medium shadow-sm hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2`}
                aria-label={`Lihat detail proyek PBL untuk ${course.name}`}
            >
                {course.name}
            </button>
        );
    }

    return (
        <span className={`${base} bg-gray-100 text-gray-700 hover:bg-gray-200`}>
            {course.name}
        </span>
    );
}

const MODAL_THEMES = {
    gold: {
        blobOne: "bg-brand-gold/25",
        blobTwo: "bg-brand-copper/25",
        topBar: "from-brand-gold via-brand-copper to-brand-gold",
        closeButton:
            "hover:bg-brand-dark hover:text-white focus-visible:ring-brand-gold",
        panelWash:
            "bg-[radial-gradient(circle_at_20%_20%,rgba(245,178,58,0.22),transparent_34%),linear-gradient(145deg,rgba(128,35,36,0.74),rgba(15,23,42,0.18))]",
        eyebrow: "text-brand-gold",
        photoGlow: "from-brand-gold/45 via-white/10 to-brand-copper/35",
        photoFallback:
            "bg-linear-to-br from-brand-cream via-white to-brand-gold/35 text-brand-dark",
        insight: "text-brand-gold",
        corner: "bg-brand-cream/80",
        badge: "bg-brand-dark/8 text-brand-dark",
        fieldAccent: "brand",
        noteBox:
            "border-brand-dark/10 bg-linear-to-br from-brand-cream/75 via-white to-white",
        noteIcon: "bg-brand-dark text-brand-gold",
        noteLabel: "text-brand-dark/55",
        tags: [
            "bg-brand-dark text-white",
            "border border-brand-copper/35 bg-brand-copper/10 text-brand-dark",
            "border border-brand-gold/45 bg-brand-gold/15 text-brand-dark",
        ],
    },
    sky: {
        blobOne: "bg-sky-400/25",
        blobTwo: "bg-sky-600/25",
        topBar: "from-sky-400 via-sky-600 to-sky-400",
        closeButton:
            "hover:bg-sky-600 hover:text-white focus-visible:ring-sky-500",
        panelWash:
            "bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.22),transparent_34%),linear-gradient(145deg,rgba(3,105,161,0.74),rgba(15,23,42,0.18))]",
        eyebrow: "text-sky-300",
        photoGlow: "from-sky-400/45 via-white/10 to-sky-600/35",
        photoFallback:
            "bg-linear-to-br from-sky-50 via-white to-sky-200/60 text-sky-700",
        insight: "text-sky-300",
        corner: "bg-sky-50",
        badge: "bg-sky-600/10 text-sky-700",
        fieldAccent: "sky",
        noteBox: "border-sky-100 bg-linear-to-br from-sky-50/75 via-white to-white",
        noteIcon: "bg-sky-600 text-white",
        noteLabel: "text-sky-700/70",
        tags: [
            "bg-sky-700 text-white",
            "border border-sky-300 bg-sky-50 text-sky-700",
            "border border-sky-200 bg-sky-100/60 text-sky-700",
        ],
    },
};

function CourseDetailModal({ course, onClose, theme, view }) {
    const EyebrowIcon = view.eyebrowIcon;
    const BadgeIcon = view.badgeIcon;
    const initial = view.headline.trim().charAt(0).toUpperCase() || "P";

    return (
        <Modal show={Boolean(course)} onClose={onClose} maxWidth="4xl">
            <div className="relative overflow-hidden bg-brand-night text-white">
                <div
                    className={`pointer-events-none absolute -left-24 -top-28 h-72 w-72 rounded-full blur-3xl ${theme.blobOne}`}
                />
                <div
                    className={`pointer-events-none absolute -bottom-32 right-8 h-80 w-80 rounded-full blur-3xl ${theme.blobTwo}`}
                />
                <div
                    className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r ${theme.topBar}`}
                />

                <button
                    type="button"
                    onClick={onClose}
                    className={`absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-dark/10 bg-white text-brand-dark shadow-[0_14px_35px_rgba(15,23,42,0.22)] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${theme.closeButton}`}
                    aria-label={view.closeLabel}
                >
                    <X className="h-5.5 w-5.5" strokeWidth={2.4} />
                </button>

                <div className="relative grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="relative min-h-90 overflow-hidden p-6 sm:p-8">
                        <div className={`absolute inset-0 ${theme.panelWash}`} />
                        <div className="relative flex h-full flex-col justify-between gap-6">
                            <div
                                className={`inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-md ${theme.eyebrow}`}
                            >
                                <EyebrowIcon className="h-3.5 w-3.5" />
                                {view.eyebrowLabel}
                            </div>

                            <div className="relative mx-auto w-full max-w-77.5">
                                <div
                                    className={`absolute -inset-3 rounded-4xl bg-linear-to-br blur-xl ${theme.photoGlow}`}
                                />
                                <div className="relative overflow-hidden rounded-[1.8rem] border border-white/18 bg-white/12 p-2 shadow-2xl backdrop-blur-md">
                                    {view.photo ? (
                                        <img
                                            src={view.photo}
                                            alt={view.photoAlt}
                                            loading="lazy"
                                            decoding="async"
                                            className="aspect-4/5 w-full rounded-[1.4rem] object-cover"
                                        />
                                    ) : (
                                        <div
                                            className={`flex aspect-4/5 w-full items-center justify-center rounded-[1.4rem] text-8xl font-black ${theme.photoFallback}`}
                                        >
                                            {initial}
                                        </div>
                                    )}
                                    <div className="absolute inset-x-2 bottom-2 rounded-b-[1.4rem] bg-linear-to-t from-brand-night/85 to-transparent px-5 pb-5 pt-16">
                                        <p
                                            className={`text-xs font-semibold uppercase tracking-[0.22em] ${theme.insight}`}
                                        >
                                            {view.insightLabel}
                                        </p>
                                        <p className="mt-1 text-sm text-white/80">
                                            {view.insightText}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-white/14 bg-white/8 p-4 backdrop-blur-md">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                                    Mata Kuliah
                                </p>
                                <p className="mt-1 text-base font-bold leading-snug text-white">
                                    {course?.name || view.courseFallback}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative bg-white px-6 py-8 text-gray-900 sm:px-8 lg:px-10">
                        <div
                            className={`pointer-events-none absolute right-0 top-0 h-36 w-36 rounded-bl-full ${theme.corner}`}
                        />
                        <div className="relative">
                            <p
                                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${theme.badge}`}
                            >
                                <BadgeIcon className="h-3.5 w-3.5" />
                                {view.badgeLabel}
                            </p>

                            <h3 className="mt-5 pr-10 text-3xl font-black leading-tight text-brand-night sm:text-4xl">
                                {view.headline}
                            </h3>
                            <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-500">
                                {view.lede}
                            </p>

                            <div className="mt-7 grid gap-4 sm:grid-cols-2">
                                {view.fields.map((field) => (
                                    <ProfileField
                                        key={field.label}
                                        icon={field.icon}
                                        label={field.label}
                                        value={field.value}
                                        accent={theme.fieldAccent}
                                    />
                                ))}
                            </div>

                            <div
                                className={`mt-6 rounded-[1.4rem] border p-5 shadow-sm ${theme.noteBox}`}
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${theme.noteIcon}`}
                                    >
                                        <Quote className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p
                                            className={`text-xs font-semibold uppercase tracking-[0.18em] ${theme.noteLabel}`}
                                        >
                                            {view.noteLabel}
                                        </p>
                                        <p className="mt-2 text-sm leading-relaxed text-gray-700">
                                            {view.noteText}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {view.tags.map((tag, i) => (
                                    <span
                                        key={tag}
                                        className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${theme.tags[i]}`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

function PractitionerProfileModal({ course, onClose }) {
    const practitioner = course?.practitioner ?? {};
    const displayName = practitioner.name || "Profil praktisi belum tersedia";

    return (
        <CourseDetailModal
            course={course}
            onClose={onClose}
            theme={MODAL_THEMES.gold}
            view={{
                closeLabel: "Tutup popup profil praktisi",
                eyebrowIcon: Sparkles,
                eyebrowLabel: "Dosen Praktisi",
                photo: practitioner.photo,
                photoAlt: `Foto ${displayName}`,
                insightLabel: "Industry Insight",
                insightText: "Membawa konteks real business langsung ke kelas.",
                courseFallback: "Mata kuliah praktisi",
                badgeIcon: Award,
                badgeLabel: "Profil Praktisi",
                headline: displayName,
                lede: "Praktisi industri yang membantu mahasiswa melihat teori sebagai skill nyata, bukan sekadar materi kelas.",
                fields: [
                    {
                        icon: Briefcase,
                        label: "Bidang",
                        value: practitioner.field || "Bidang belum diisi",
                    },
                    {
                        icon: Award,
                        label: "Pengalaman",
                        value:
                            practitioner.experience || "Pengalaman belum diisi",
                    },
                ],
                noteLabel: "Bio Singkat",
                noteText:
                    practitioner.bio ||
                    "Data bio praktisi untuk mata kuliah ini belum tersedia. Silakan lengkapi melalui admin Filament.",
                tags: ["Real Case", "Industry Mentoring", "Applied Learning"],
            }}
        />
    );
}

function PblProjectModal({ course, onClose }) {
    const project = course?.project ?? {};
    const title = project.title || "Detail proyek belum tersedia";

    return (
        <CourseDetailModal
            course={course}
            onClose={onClose}
            theme={MODAL_THEMES.sky}
            view={{
                closeLabel: "Tutup popup detail proyek PBL",
                eyebrowIcon: Rocket,
                eyebrowLabel: "Project Based Learning",
                photo: project.photo,
                photoAlt: `Foto proyek ${title}`,
                insightLabel: "Project Insight",
                insightText: "Belajar lewat proyek nyata bersama mitra industri.",
                courseFallback: "Mata kuliah PBL",
                badgeIcon: Rocket,
                badgeLabel: "Profil Proyek",
                headline: title,
                lede: "Proyek berbasis kolaborasi industri yang membawa mahasiswa langsung menyelesaikan tantangan nyata.",
                fields: [
                    {
                        icon: Building2,
                        label: "Mitra Industri",
                        value: project.partner || "Mitra industri belum diisi",
                    },
                    {
                        icon: Award,
                        label: "Fokus Proyek",
                        value: project.focus || "Fokus proyek belum diisi",
                    },
                ],
                noteLabel: "Deskripsi Proyek",
                noteText:
                    project.description ||
                    "Deskripsi proyek untuk mata kuliah ini belum tersedia. Silakan lengkapi melalui admin Filament.",
                tags: [
                    "Real Project",
                    "Industry Partner",
                    "Project Based Learning",
                ],
            }}
        />
    );
}

function ProfileField({ icon: Icon, label, value, accent = "brand" }) {
    const iconClass =
        accent === "sky"
            ? "bg-sky-600/10 text-sky-700"
            : "bg-brand-dark/8 text-brand-dark";

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div
                className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full ${iconClass}`}
            >
                <Icon className="h-5 w-5" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                {label}
            </p>
            <p className="mt-2 text-sm font-bold leading-relaxed text-gray-900">
                {value}
            </p>
        </div>
    );
}

function ProdiNotFound({ slug }) {
    return (
        <>
            <Seo
                title="Program Studi tidak ditemukan"
                description="Program studi yang diminta tidak tersedia."
                noIndex
            />
            <PublicLayout rootClassName="min-h-screen bg-surface-muted font-sans antialiased flex flex-col">
                <div className="flex-1 flex items-center justify-center px-4 py-24">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 max-w-md text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-3">
                            Program Studi tidak ditemukan
                        </h1>
                        <p className="text-sm text-gray-500 mb-6">
                            Slug{" "}
                            <code className="px-1.5 py-0.5 bg-gray-100 rounded text-brand-dark">
                                {slug}
                            </code>{" "}
                            tidak terdaftar.
                        </p>
                        <Link
                            href="/practitioner-teaching"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-dark text-white text-sm font-semibold hover:bg-brand-deep transition-colors"
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
