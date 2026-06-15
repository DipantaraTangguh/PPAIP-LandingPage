import { IndustryShowcasePage } from "@/Components/Layouts/IndustryShowcasePage";

const PAGE_CONTENT = {
    title: "KUB Talk",
    seoDescription:
        "Ikuti dokumentasi KUB Talk Universitas Bakrie, forum yang mempertemukan mahasiswa dengan pemimpin dan praktisi industri.",
    heroSubtitle:
        "Kolaborasi eksklusif dengan pemimpin industri nasional untuk mempersiapkan mahasiswa menjadi profesional masa depan.",
    sessionLabel: "Sesi KUB Talk",
    showcaseLabel: "KUB Talk Showcase",
    galleryTitle: "Sesi KUB Talk",
    galleryDescription:
        "Rangkaian talk inspiratif yang menghubungkan mahasiswa dengan pemimpin industri terkemuka.",
    emptyMessage: "Belum ada dokumentasi KUB Talk",
};

export default function KubTalk({
    bannerImage = "/assets/kub-talk-3.jpg",
    ...props
}) {
    return (
        <IndustryShowcasePage
            {...props}
            bannerImage={bannerImage}
            pageContent={PAGE_CONTENT}
        />
    );
}
