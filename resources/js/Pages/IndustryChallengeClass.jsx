import KubTalk from "./KubTalk";

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
};

export default function IndustryChallengeClass(props) {
    return <KubTalk {...props} pageContent={PAGE_CONTENT} />;
}
