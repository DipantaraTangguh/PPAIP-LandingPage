import { IndustryShowcasePage } from "@/Components/Layouts/IndustryShowcasePage";
import { IndustryChallengeStages } from "@/Components/Layouts/IndustryChallengeStages";

const PAGE_CONTENT = {
    title: "Industry Challenge Class",
    seoDescription:
        "Temukan dokumentasi Industry Challenge Class Universitas Bakrie, kelas kolaboratif yang membawa tantangan nyata industri ke dalam pembelajaran.",
    heroSubtitle:
        "Kelas kolaboratif bersama mitra industri untuk membangun solusi atas tantangan bisnis yang nyata.",
    sessionLabel: "Challenge Classes",
    showcaseLabel: "Industry Challenge Showcase",
    galleryTitle: "Industry Challenge Class",
    galleryDescription:
        "Rangkaian kelas berbasis kasus nyata yang mempertemukan mahasiswa dengan tantangan dan praktisi industri.",
    emptyMessage: "Belum ada dokumentasi Industry Challenge Class",
    hideStats: true,
};

const PROGRAM_STAGES = [
    {
        number: "01",
        phase: "Understand",
        icon: "Megaphone",
        color: "#E97824",
        title: "Industry Briefing",
        subtitle: "Pemaparan Tantangan atau kasus nyata oleh Praktisi Industri",
        description:
            "Perusahaan mitra memaparkan profil bisnis, kebutuhan talenta, dan tantangan riil / kasus nyata yang relevan dengan program studi mahasiswa.",
    },
    {
        number: "02",
        phase: "Create",
        icon: "Lightbulb",
        color: "#C9362D",
        title: "Student Presentation",
        subtitle: "Proposal Solusi Mahasiswa",
        description:
            "Mahasiswa mempresentasikan proposal solusi yang diajukan di depan praktisi untuk menerima feedback sebagai evaluasi tahap awal.",
    },
    {
        number: "03",
        phase: "Opportunity",
        icon: "Handshake",
        color: "#EAAF39",
        title: "Final Decision",
        subtitle: "Seleksi Magang Tahap Akhir",
        description:
            "Mahasiswa dengan proposal terbaik akan mendapatkan golden ticket untuk kerja praktik / magang sesuai dengan kuota yang tersedia.",
    },
];

export default function IndustryChallengeClass({
    bannerImage = "/assets/kub-talk-3.jpg",
    ...props
}) {
    return (
        <IndustryShowcasePage
            {...props}
            bannerImage={bannerImage}
            pageContent={PAGE_CONTENT}
            stagesSlot={<IndustryChallengeStages stages={PROGRAM_STAGES} />}
        />
    );
}
